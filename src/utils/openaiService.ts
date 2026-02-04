/**
 * OpenAI API Service (Supports CORS - Works from browser)
 */

interface AIPrompt {
  context: string;
  userQuestion: string;
  conversationHistory?: string;
}

export async function useOpenAI(prompt: AIPrompt, apiKey: string): Promise<string | null> {
  try {
    const systemPrompt = `You are an AI assistant representing Vankayala Jagath Charan, a Software Developer and Machine Learning Engineer. 
Your role is to answer questions about Jagath's professional background, skills, experience, projects, and availability.

CRITICAL RULES:
1. ONLY use information from the provided context. Do NOT use any external knowledge.
2. If the question cannot be answered from the context, politely say: "I don't have that specific information in my knowledge base. Please check the website sections or contact Jagath directly."
3. Be friendly, professional, and concise. Keep responses under 200 words unless more detail is specifically requested.
4. When asked about projects, skills, or experience, provide specific details from the context.
5. For RAG-related questions, mention the "AI-Based Calling Assistant (Virtual Friend)" project which uses RAG technology.`;

    const userMessage = `Context about Jagath Charan:
${prompt.context}

${prompt.conversationHistory ? `Previous conversation:\n${prompt.conversationHistory}\n` : ''}

User Question: ${prompt.userQuestion}

Please answer based ONLY on the context provided above.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 250,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim();
    
    if (content && content.length > 10) {
      console.log('✅ OpenAI API Success');
      return content;
    }
    
    return null;
  } catch (error) {
    console.error('❌ OpenAI API error:', error);
    return null;
  }
}
