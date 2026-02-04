/**
 * AI Service using Hugging Face Inference API (Free)
 * This service provides AI-powered responses based on site content only
 * Falls back to rule-based responses if API is unavailable
 * 
 * API CONFIGURATION:
 * ==================
 * 
 * Option 1: Hugging Face (Current - Free, No API Key Required)
 * - Currently using public models (no authentication needed)
 * - To use private models or increase rate limits, add your Hugging Face token:
 *   const HF_API_TOKEN = import.meta.env.VITE_HF_API_TOKEN || '';
 *   Then add to headers: 'Authorization': `Bearer ${HF_API_TOKEN}`
 * 
 * Option 2: OpenAI API (Requires API Key)
 * - Get API key from: https://platform.openai.com/api-keys
 * - Add to .env file: VITE_OPENAI_API_KEY=your_key_here
 * - Update the generateAIResponse function to use OpenAI
 * 
 * Option 3: Google Gemini API (Free Tier Available)
 * - Get API key from: https://makersuite.google.com/app/apikey
 * - Add to .env file: VITE_GEMINI_API_KEY=your_key_here
 * - Update the generateAIResponse function to use Gemini
 * 
 * Option 4: Anthropic Claude API
 * - Get API key from: https://console.anthropic.com/
 * - Add to .env file: VITE_ANTHROPIC_API_KEY=your_key_here
 */

interface AIPrompt {
  context: string;
  userQuestion: string;
  conversationHistory?: string;
}

// ============================================
// API CONFIGURATION - ADD YOUR API KEYS HERE
// ============================================

// Hugging Face API Token (Optional - for private models or higher rate limits)
// Get from: https://huggingface.co/settings/tokens
const HF_API_TOKEN = import.meta.env.VITE_HF_API_TOKEN || '';

// OpenAI API Key (Optional - if you want to use OpenAI instead)
// Get from: https://platform.openai.com/api-keys
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Google Gemini API Key (Optional - if you want to use Gemini instead)
// Get from: https://makersuite.google.com/app/apikey
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Anthropic Claude API Key (Optional - if you want to use Claude)
// Get from: https://console.anthropic.com/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || '';

// ============================================

// Import OpenAI and Gemini services (they support CORS)
import { useOpenAI } from './openaiService';
import { useGemini } from './geminiService';

/**
 * Generate AI response using AI APIs
 * ⚠️ IMPORTANT: Hugging Face does NOT support CORS - use OpenAI or Gemini instead
 */
export async function generateAIResponse(prompt: AIPrompt): Promise<string | null> {
  try {
    // Prepare the full context for the AI
    const systemPrompt = `You are an AI assistant representing Vankayala Jagath Charan, a Software Developer and Machine Learning Engineer. 
Your role is to answer questions about Jagath's professional background, skills, experience, projects, and availability.

CRITICAL RULES:
1. ONLY use information from the provided context below. Do NOT use any external knowledge.
2. If the question cannot be answered from the context, politely say: "I don't have that specific information in my knowledge base. Please check the website sections or contact Jagath directly."
3. Be friendly, professional, and concise. Keep responses under 200 words unless more detail is specifically requested.
4. When asked about projects, skills, or experience, provide specific details from the context.
5. For RAG-related questions, mention the "AI-Based Calling Assistant (Virtual Friend)" project which uses RAG technology.`;

    const fullPrompt = `${systemPrompt}

CONTEXT ABOUT JAGATH CHARAN:
${prompt.context}

${prompt.conversationHistory ? `\nPrevious conversation:\n${prompt.conversationHistory}\n` : ''}

User Question: ${prompt.userQuestion}

Assistant Response:`;

    // Try multiple free models in order of preference
    // Note: Hugging Face models may be slow or unavailable - consider using OpenAI/Gemini for production
    const models = [
      'google/flan-t5-large',     // Better instruction following
      'google/flan-t5-base',      // Instruction following
      'microsoft/DialoGPT-medium', // Conversational model
      'distilgpt2',                // Fallback
    ];

    // Priority 1: Try Hugging Face API first (using CORS proxy to bypass browser restrictions)
    console.log('🤖 Trying Hugging Face API (with CORS proxy)...');

    // Default: Use Hugging Face (Free, no API key required)
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add Hugging Face token if available (for private models or higher rate limits)
    if (HF_API_TOKEN) {
      headers['Authorization'] = `Bearer ${HF_API_TOKEN}`;
    }

    // Use CORS proxy to bypass CORS restrictions (for development/testing)
    // Note: For production, use OpenAI/Gemini API instead
    const USE_CORS_PROXY = true; // Set to false to disable proxy
    // Try multiple CORS proxy services as fallback
    const CORS_PROXIES = [
      'https://api.allorigins.win/raw?url=',  // Reliable CORS proxy
      'https://corsproxy.io/?',                // Alternative proxy
    ];
    
    for (const model of models) {
      // Try each CORS proxy if enabled
      const proxiesToTry = USE_CORS_PROXY ? CORS_PROXIES : [null];
      
      for (const proxy of proxiesToTry) {
        try {
          // Use the new router endpoint (api-inference.huggingface.co is deprecated)
          const apiUrl = `https://router.huggingface.co/v1/models/${model}`;
          const fetchUrl = proxy ? `${proxy}${encodeURIComponent(apiUrl)}` : apiUrl;
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout for proxy
          
          const response = await fetch(
            fetchUrl,
            {
              method: 'POST',
              headers: {
                ...headers,
                // CORS proxy may need these headers
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                inputs: fullPrompt,
                parameters: {
                  max_new_tokens: 150,
                  temperature: 0.7,
                  return_full_text: false,
                },
              }),
              signal: controller.signal,
            }
          );
          clearTimeout(timeoutId);

          if (response.ok) {
          const data = await response.json();
          
          // Handle different response formats
          if (Array.isArray(data) && data[0]?.generated_text) {
            const text = data[0].generated_text.trim();
            if (text.length > 10) {
              console.log(`✅ AI API Success (${model} via ${proxy || 'direct'}):`, text.substring(0, 100));
              return text;
            }
          } else if (data.generated_text) {
            const text = data.generated_text.trim();
            if (text.length > 10) {
              console.log(`✅ AI API Success (${model} via ${proxy || 'direct'}):`, text.substring(0, 100));
              return text;
            }
          } else if (typeof data === 'string' && data.length > 10) {
            console.log(`✅ AI API Success (${model} via ${proxy || 'direct'}):`, data.substring(0, 100));
            return data.trim();
          } else {
            console.warn(`⚠️ Model ${model} returned invalid format:`, data);
            // Try next proxy or model
            if (proxy) continue; // Try next proxy
            break; // Try next model
          }
        } else if (response.status === 503) {
          // Model is loading, try next proxy or model
          console.log(`⏳ Model ${model} is loading (503), trying next...`);
          if (proxy) continue; // Try next proxy
          break; // Try next model
        } else {
          const errorText = await response.text().catch(() => 'Unknown error');
          console.warn(`❌ Model ${model} failed (${response.status}) via ${proxy || 'direct'}:`, errorText.substring(0, 200));
          if (proxy) continue; // Try next proxy
          break; // Try next model
        }
        } catch (error: any) {
          if (error.name === 'AbortError') {
            console.warn(`⏰ Model ${model} timed out (15s) via ${proxy || 'direct'}, trying next...`);
          } else if (error.message?.includes('Failed to fetch') || error.message?.includes('CORS')) {
            console.warn(`❌ Model ${model} CORS/network error via ${proxy || 'direct'}:`, error.message);
            // Try next proxy
            if (proxy) continue;
            break; // Try next model
          } else {
            console.warn(`❌ Model ${model} error via ${proxy || 'direct'}:`, error);
            if (proxy) continue;
            break; // Try next model
          }
        }
      }
    }

    // All Hugging Face models failed - try fallback APIs
    console.warn('⚠️ Hugging Face API failed (likely CORS issue). Trying fallback APIs...');
    
    // Fallback 1: Try OpenAI API if available
    if (OPENAI_API_KEY) {
      console.log('🤖 Falling back to OpenAI API (supports CORS)');
      const openaiResult = await useOpenAI(prompt, OPENAI_API_KEY);
      if (openaiResult) return openaiResult;
    }
    
    // Fallback 2: Try Gemini API if available
    if (GEMINI_API_KEY) {
      console.log('🤖 Falling back to Gemini API (supports CORS, free tier)');
      const geminiResult = await useGemini(prompt, GEMINI_API_KEY);
      if (geminiResult) return geminiResult;
    }
    
    // All APIs failed
    if (!OPENAI_API_KEY && !GEMINI_API_KEY) {
      console.error('❌ Hugging Face blocked by CORS. No fallback API keys found.');
      console.error('');
      console.error('💡 QUICK FIX: Add Gemini API key (FREE) to .env file:');
      console.error('   1. Get key: https://makersuite.google.com/app/apikey');
      console.error('   2. Create .env file in project root');
      console.error('   3. Add: VITE_GEMINI_API_KEY=your-key-here');
      console.error('   4. Restart server: npm run dev');
      console.error('');
      console.error('   Alternative: VITE_OPENAI_API_KEY=sk-your-key-here');
    }
    
    return null;
  } catch (error) {
    console.error('AI API Error:', error);
    return null;
  }
}

/**
 * Format site content into a context string for the AI
 */
export function formatSiteContentForAI(siteContent: any): string {
  const context = `
Name: ${siteContent.name}
Title: ${siteContent.title}
Specialization: ${siteContent.specialization}
Location: ${siteContent.location}
Email: ${siteContent.email}
Phone: ${siteContent.phone}

Current Role: ${siteContent.role} at ${siteContent.company} (since ${siteContent.startDate})

Education: ${siteContent.education.degree} from ${siteContent.education.university} (${siteContent.education.period})

Skills:
- Programming: ${siteContent.skills.programming.join(', ')}
- Computer Vision: ${siteContent.skills.computerVision.join(', ')}
- MLOps: ${siteContent.skills.mlops.join(', ')}
- Generative AI: ${siteContent.skills.generativeAI.join(', ')}
- Video & Streaming: ${siteContent.skills.video.join(', ')}
- Tools: ${siteContent.skills.tools.join(', ')}

Key Projects:
${siteContent.projects.map((p: any, i: number) => 
  `${i + 1}. ${p.title}: ${p.description} (Technologies: ${p.tech.join(', ')})`
).join('\n')}

Key Achievements:
${siteContent.achievements.slice(0, 8).map((a: string) => `- ${a}`).join('\n')}

Certifications: ${siteContent.certifications.slice(0, 5).map((c: any) => c.name).join(', ')}
`;

  return context;
}
