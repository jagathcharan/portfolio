/**
 * Minimal Local AI Service
 * Works entirely in the browser without external APIs
 * Uses semantic matching and context understanding
 * Perfect for GitHub Pages static hosting
 */

import { fuzzyContains, fuzzyMatch, findBestMatch, normalizeWord } from './fuzzyMatch';

interface SiteContent {
  name: string;
  title: string;
  specialization: string;
  skills: any;
  projects: any[];
  achievements: string[];
  education: any;
  certifications: any[];
  [key: string]: any;
}

interface AIContext {
  siteContent: SiteContent;
  conversationHistory: string[];
}

/**
 * Simple keyword-to-intent mapping with weights
 */
const intentKeywords: Record<string, { keywords: string[]; weight: number }> = {
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'what\'s up', 'howdy', 'namaste'],
    weight: 10
  },
  skills: {
    keywords: ['skill', 'expertise', 'capabilities', 'technologies', 'tech stack', 'tools', 'programming', 'proficient', 'knows', 'familiar', 'experienced', 'specializes', 'expert', 'what can'],
    weight: 9
  },
  experience: {
    keywords: ['experience', 'work', 'job', 'position', 'role', 'current', 'company', 'achievement', 'accomplishment', 'career', 'background', 'work history', 'employment', 'years'],
    weight: 9
  },
  projects: {
    keywords: ['project', 'built', 'developed', 'created', 'portfolio', 'work', 'what has', 'what did', 'made', 'worked on', 'showcase'],
    weight: 9
  },
  about: {
    keywords: ['about', 'who is', 'tell me about', 'introduce', 'background', 'info', 'information', 'who', 'what is', 'describe', 'summary', 'overview'],
    weight: 8
  },
  contact: {
    keywords: ['contact', 'email', 'phone', 'reach', 'get in touch', 'connect', 'linkedin', 'github', 'want to contact', 'reach out', 'how to contact'],
    weight: 8
  },
  availability: {
    keywords: ['available', 'hiring', 'job', 'opportunity', 'position', 'open', 'looking', 'interested', 'recruit', 'hire', 'seeking'],
    weight: 8
  },
  education: {
    keywords: ['education', 'degree', 'university', 'college', 'qualification', 'studied', 'graduated', 'alumni', 'bachelor', 'btech'],
    weight: 7
  },
  certifications: {
    keywords: ['certification', 'certified', 'course', 'training', 'learned', 'badge', 'certificate', 'completed'],
    weight: 7
  },
  ai_ml: {
    keywords: ['ai', 'machine learning', 'ml', 'deep learning', 'neural', 'model', 'algorithm', 'computer vision', 'edge ai', 'artificial intelligence'],
    weight: 8
  },
  location: {
    keywords: ['location', 'where', 'remote', 'onsite', 'hybrid', 'relocate', 'bengaluru', 'bangalore', 'india', 'based', 'located'],
    weight: 6
  },
  salary: {
    keywords: ['salary', 'compensation', 'pay', 'rate', 'budget', 'package', 'ctc', 'expected', 'expectation'],
    weight: 5
  }
};

/**
 * Technology-specific keywords
 */
const techKeywords: Record<string, string[]> = {
  python: ['python', 'pythn', 'pytho', 'pyton'],
  opencv: ['opencv', 'openc', 'open cv'],
  yolo: ['yolo', 'yolov4', 'object detection'],
  tensorflow: ['tensorflow', 'tensor flow', 'tensorflo'],
  pytorch: ['pytorch', 'py torch', 'pytor'],
  docker: ['docker', 'dockr', 'dock'],
  aws: ['aws', 'amazon web services'],
  git: ['git', 'github', 'gitlab'],
  linux: ['linux', 'linx'],
  bash: ['bash', 'bas'],
  sql: ['sql', 'sequel'],
  rest: ['rest', 'rest api', 'api'],
};

/**
 * Project-specific keywords
 */
const projectKeywords: Record<string, string[]> = {
  virtual_friend: ['virtual friend', 'calling assistant', 'voice ai', 'rag', 'retrieval', 'conversational ai', 'leema', 'twilio'],
  face_recognition: ['face recognition', 'cnn', 'person identification', 'facial', 'face detection'],
  vqa: ['vqa', 'visual question', 'multimodal', 'image question', 'coco'],
  video_streaming: ['video streaming', 'ffmpeg', 'rtsp', 'webrtc', 'low latency', 'real-time', 'streaming'],
  yolo_detection: ['yolov4', 'yolo', 'object detection', 'streamlit', 'darknet'],
  pharma_etl: ['pharma', 'etl', 'data pipeline', 'power bi', 'dataiku', 'sales', 'reporting'],
};

/**
 * Calculate intent score for a message
 */
function calculateIntentScore(message: string, intent: string): number {
  const intentData = intentKeywords[intent];
  if (!intentData) return 0;

  let score = 0;
  const lowerMessage = message.toLowerCase();
  const words = lowerMessage.split(/\s+/);

  // Check for keyword matches (with typo tolerance)
  for (const keyword of intentData.keywords) {
    if (fuzzyContains(lowerMessage, [keyword], 0.7)) {
      score += intentData.weight;
    }
    // Also check individual words
    for (const word of words) {
      if (fuzzyMatch(word, [keyword], 0.7)) {
        score += intentData.weight * 0.5;
      }
    }
  }

  return score;
}

/**
 * Detect the primary intent from user message
 */
export function detectIntent(message: string): { intent: string; score: number } {
  const lowerMessage = message.toLowerCase();
  let bestIntent = { intent: 'general', score: 0 };

  for (const [intent, _] of Object.entries(intentKeywords)) {
    const score = calculateIntentScore(lowerMessage, intent);
    if (score > bestIntent.score) {
      bestIntent = { intent, score };
    }
  }

  return bestIntent;
}

/**
 * Extract technology mentions from message
 */
export function extractTechnologies(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const found: string[] = [];

  for (const [tech, keywords] of Object.entries(techKeywords)) {
    if (fuzzyContains(lowerMessage, keywords, 0.7)) {
      found.push(tech);
    }
  }

  return found;
}

/**
 * Extract project mentions from message
 */
export function extractProjects(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const found: string[] = [];

  for (const [project, keywords] of Object.entries(projectKeywords)) {
    if (fuzzyContains(lowerMessage, keywords, 0.7)) {
      found.push(project);
    }
  }

  return found;
}

/**
 * Generate contextual response using local AI
 */
export function generateLocalAIResponse(
  message: string,
  context: AIContext
): string {
  const { siteContent, conversationHistory } = context;
  const lowerMessage = message.toLowerCase().trim();
  
  // Detect intent
  const { intent, score } = detectIntent(message);
  
  // Extract specific mentions
  const technologies = extractTechnologies(message);
  const projects = extractProjects(message);

  // Generate response based on intent
  switch (intent) {
    case 'greeting':
      const greetings = [
        `Hello! Nice to meet you. I'm here to help you learn more about ${siteContent.name}'s expertise in ${siteContent.specialization}. What would you like to know?`,
        `Hi there! I can help you learn about ${siteContent.name}'s skills, projects, and experience. How can I assist you today?`,
        `Hello! Welcome! I'm here to answer questions about ${siteContent.name}'s professional background. What interests you most?`
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];

    case 'skills':
      if (technologies.length > 0) {
        const tech = technologies[0];
        const techMap: Record<string, string> = {
          python: 'building AI/ML applications, APIs, and data pipelines',
          opencv: 'computer vision tasks, image processing, and video analytics',
          yolo: 'real-time object detection and computer vision applications',
          tensorflow: 'deep learning model development and training',
          pytorch: 'neural network development and research'
        };
        return `Yes! ${siteContent.name} has extensive experience with ${tech}. He uses it for ${techMap[tech] || 'various AI/ML applications'}. Would you like to know about specific projects using ${tech}?`;
      }
      return `${siteContent.name} specializes in:\n\n• Programming & Frameworks: ${siteContent.skills.programming.join(', ')}\n• Computer Vision & AI: ${siteContent.skills.computerVision.join(', ')}\n• MLOps & Deployment: ${siteContent.skills.mlops.join(', ')}\n• Generative AI & NLP: ${siteContent.skills.generativeAI.join(', ')}\n• Video & Streaming: ${siteContent.skills.video.join(', ')}\n• Tools & Platforms: ${siteContent.skills.tools.join(', ')}\n\nWould you like more details about any specific area?`;

    case 'experience':
      if (fuzzyContains(lowerMessage, ['years', 'how long'], 0.7)) {
        return `${siteContent.name} has been working as a ${siteContent.role} at ${siteContent.company} since ${siteContent.startDate}. He has extensive hands-on experience in AI/ML development, computer vision, and building production-ready applications.`;
      }
      return `${siteContent.name} is currently a ${siteContent.role} at ${siteContent.company} since ${siteContent.startDate}. Key achievements include:\n\n• ${siteContent.achievements[0]}\n• ${siteContent.achievements[1]}\n• ${siteContent.achievements[2]}\n• ${siteContent.achievements[3]}\n\nWould you like to know about specific projects or more achievements?`;

    case 'projects':
      if (projects.length > 0) {
        const projectMap: Record<string, number> = {
          virtual_friend: 0,
          face_recognition: 1,
          vqa: 2,
          video_streaming: 3,
          yolo_detection: 4,
          pharma_etl: 5
        };
        const projectIndex = projectMap[projects[0]];
        if (projectIndex !== undefined && siteContent.projects[projectIndex]) {
          const p = siteContent.projects[projectIndex];
          return `${p.title}\n\n${p.description}\n\nRole: ${p.role}\nImpact: ${p.impact}\nTechnologies: ${p.tech.join(', ')}`;
        }
      }
      const projectList = siteContent.projects.map((p, i) => 
        `${i + 1}. ${p.title}\n   ${p.description.substring(0, 120)}...\n   Technologies: ${p.tech.slice(0, 4).join(', ')}`
      ).join('\n\n');
      return `Here are ${siteContent.name}'s featured projects:\n\n${projectList}\n\nWould you like detailed information about any specific project?`;

    case 'about':
      return `About ${siteContent.name}:\n\n${siteContent.name} is a ${siteContent.title} specializing in ${siteContent.specialization}.\n\nCurrently working as ${siteContent.role} at ${siteContent.company} since ${siteContent.startDate}.\n\nEducation: ${siteContent.education.degree} from ${siteContent.education.university} (${siteContent.education.period})\n\nLocation: ${siteContent.location}\n\nWould you like to know more about his skills, projects, or experience?`;

    case 'contact':
      if (fuzzyContains(lowerMessage, ['email', 'mail'], 0.7)) {
        return `You can reach ${siteContent.name} at ${siteContent.email}. Would you like me to help you send a message?`;
      }
      if (fuzzyContains(lowerMessage, ['phone', 'number', 'call'], 0.7)) {
        return `${siteContent.name}'s phone number is ${siteContent.phone}. For professional inquiries, email is preferred: ${siteContent.email}`;
      }
      return `I'd be happy to help you connect with ${siteContent.name}!\n\nEmail: ${siteContent.email}\nPhone: ${siteContent.phone}\n\nOr I can help you send a message.`;

    case 'availability':
      return `Great! ${siteContent.name} is open to new opportunities and collaborations. He's particularly interested in roles involving AI/ML, computer vision, edge AI, and RAG applications.`;

    case 'education':
      return `${siteContent.name} holds a ${siteContent.education.degree} from ${siteContent.education.university} (${siteContent.education.period}), ${siteContent.education.location}. He has also completed numerous certifications including Google's Gen AI Academy, Machine Learning by Andrew Ng, and MLOps Bootcamp.`;

    case 'certifications':
      const certList = siteContent.certifications.slice(0, 8).map(c => 
        `• ${c.name} (${c.provider})`
      ).join('\n');
      return `${siteContent.name} has completed several certifications:\n\n${certList}\n\nThese demonstrate his commitment to continuous learning in AI/ML.`;

    case 'ai_ml':
      if (fuzzyContains(lowerMessage, ['computer vision', 'cv', 'opencv', 'yolo'], 0.7)) {
        return `${siteContent.name} has extensive expertise in Computer Vision:\n\n• Technologies: ${siteContent.skills.computerVision.join(', ')}\n• Projects: Custom Face Recognition System, YOLOv4 Object Detection, Visual Question Answering\n• Experience: Real-time object detection, pose estimation, image segmentation, and video analytics`;
      }
      if (fuzzyContains(lowerMessage, ['rag', 'retrieval', 'generative', 'llm'], 0.7)) {
        return `${siteContent.name} has strong expertise in Generative AI and RAG:\n\n• Technologies: ${siteContent.skills.generativeAI.join(', ')}\n• Key Project: AI-Based Calling Assistant (Virtual Friend) - a RAG-based voice assistant\n• Experience: Building conversational AI, knowledge retrieval systems, and LLM integration`;
      }
      return `${siteContent.name} has deep expertise in AI and Machine Learning:\n\n• Computer Vision: ${siteContent.skills.computerVision.slice(0, 5).join(', ')}\n• Deep Learning: CNNs, LSTMs, Transformers, GANs\n• MLOps: ${siteContent.skills.mlops.slice(0, 5).join(', ')}\n• Generative AI: ${siteContent.skills.generativeAI.slice(0, 5).join(', ')}\n\nWhat specific aspect interests you?`;

    case 'location':
      if (fuzzyContains(lowerMessage, ['remote', 'wfh'], 0.7)) {
        return `${siteContent.name} is currently based in ${siteContent.location} and is open to remote opportunities. He has experience working remotely and can effectively collaborate across time zones.`;
      }
      return `${siteContent.name} is currently based in ${siteContent.location}. He's open to remote, on-site (Bengaluru), hybrid, or relocation opportunities.`;

    case 'salary':
      return `For compensation and salary discussions, it's best to connect directly with ${siteContent.name}. He's open to discussing competitive packages based on the role and responsibilities.`;

    default:
      // Use context from conversation history
      if (conversationHistory.length > 0) {
        const lastIntent = detectIntent(conversationHistory[conversationHistory.length - 1]);
        if (lastIntent.intent !== 'general') {
          return `I'd be happy to provide more details about that. Could you be more specific? For example, you can ask about ${siteContent.name}'s skills, projects, experience, or how to contact him.`;
        }
      }
      return `I can help you learn about ${siteContent.name}'s technical skills, projects, work experience, certifications, or discuss potential opportunities. What interests you most?`;
  }
}
