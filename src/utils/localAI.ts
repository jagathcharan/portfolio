/**
 * Portfolio Q&A engine — intent + FAQ matching, works offline on GitHub Pages.
 */

import { fuzzyContains } from './fuzzyMatch';
import { siteKnowledge, suggestedQuestions, type SiteKnowledge } from './siteKnowledge';

export type ChatReply = {
  text: string;
  suggestions: string[];
};

type Intent =
  | 'greeting'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'edge'
  | 'rag'
  | 'vision'
  | 'mlops'
  | 'education'
  | 'certifications'
  | 'contact'
  | 'availability'
  | 'location'
  | 'resume'
  | 'languages'
  | 'salary'
  | 'thanks'
  | 'help'
  | 'general';

const K = siteKnowledge;

function has(msg: string, keys: string[], threshold = 0.72): boolean {
  return fuzzyContains(msg, keys, threshold);
}

function detectIntent(message: string): Intent {
  const m = message.toLowerCase().trim();

  if (has(m, ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'howdy'])) {
    return 'greeting';
  }
  if (has(m, ['thank', 'thanks', 'appreciate', 'helpful', 'awesome', 'great job'])) return 'thanks';
  if (has(m, ['help', 'what can you', 'menu', 'options', 'ask'])) return 'help';
  if (has(m, ['salary', 'ctc', 'compensation', 'package', 'pay', 'lpa'])) return 'salary';
  if (has(m, ['resume', 'cv', 'pdf', 'download resume'])) return 'resume';
  if (has(m, ['language', 'speak', 'telugu', 'kannada', 'hindi', 'tamil', 'english'])) return 'languages';
  if (has(m, ['remote', 'onsite', 'hybrid', 'relocate', 'bengaluru', 'bangalore', 'location', 'where based'])) {
    return 'location';
  }
  if (has(m, ['available', 'hiring', 'opportunity', 'open to', 'recruit', 'hire', 'looking for job', 'notice period'])) {
    return 'availability';
  }
  if (has(m, ['email', 'phone', 'whatsapp', 'contact', 'linkedin', 'github', 'reach', 'get in touch'])) {
    return 'contact';
  }
  if (has(m, ['certification', 'certificate', 'badge', 'coursera', 'udemy', 'gen ai academy'])) {
    return 'certifications';
  }
  if (has(m, ['education', 'degree', 'university', 'college', 'ramaiah', 'btech', 'b.tech', 'studied'])) {
    return 'education';
  }
  if (has(m, ['rag', 'retrieval', 'llm', 'langchain', 'langgraph', 'vector', 'embedding', 'generative'])) {
    return 'rag';
  }
  if (has(m, ['edge', 'jetson', 'raspberry', 'ota', 'tensorrt', 'embedded'])) return 'edge';
  if (has(m, ['face', 'yolo', 'opencv', 'vision', 'pose', 'detection', 'segmentation', 'mediapipe'])) {
    return 'vision';
  }
  if (has(m, ['mlops', 'docker', 'mlflow', 'dvc', 'ci/cd', 'kubernetes', 'deploy'])) return 'mlops';
  if (has(m, ['project', 'built', 'portfolio', 'showcase', 'worked on', 'what did he'])) return 'projects';
  if (has(m, ['experience', 'work', 'job', 'role', 'company', 'amvar', 'achievement', 'career', 'years'])) {
    return 'experience';
  }
  if (has(m, ['skill', 'tech stack', 'technologies', 'tools', 'python', 'fastapi', 'proficient', 'knows'])) {
    return 'skills';
  }
  if (has(m, ['about', 'who is', 'tell me about', 'introduce', 'summary', 'overview', 'jagath', 'vankayala'])) {
    return 'about';
  }

  return 'general';
}

function findProject(message: string) {
  const m = message.toLowerCase();
  return K.projects.find((p) =>
    p.aliases.some((a) => m.includes(a)) || m.includes(p.title.toLowerCase().slice(0, 12))
  );
}

function formatProject(p: (typeof K.projects)[number]): string {
  return `**${p.title}**\n${p.description}\n\n• Role: ${p.role}\n• Impact: ${p.impact}\n• Tech: ${p.tech.join(', ')}\n\nWant another project, or details on Edge AI / RAG?`;
}

function reply(text: string, suggestions: string[]): ChatReply {
  return { text, suggestions };
}

function skillsBlock(skills: SiteKnowledge['skills']): string {
  return [
    `**Languages:** ${skills.languages.join(', ')}`,
    `**ML / DL:** ${skills.ml.join(', ')}`,
    `**Computer Vision:** ${skills.computerVision.join(', ')}`,
    `**Generative AI:** ${skills.generativeAI.join(', ')}`,
    `**Backend / Frontend:** ${skills.backend.join(', ')}`,
    `**Video:** ${skills.video.join(', ')}`,
    `**MLOps & Cloud:** ${skills.mlops.join(', ')}`,
    `**Edge:** ${skills.edge.join(', ')}`,
  ].join('\n');
}

/**
 * Generate a structured Q&A reply for the portfolio assistant.
 */
export function generateLocalAIResponse(
  message: string,
  conversationHistory: string[] = []
): ChatReply {
  const m = message.toLowerCase().trim();
  const intent = detectIntent(m);
  const projectHit = findProject(m);

  if (projectHit && (intent === 'projects' || intent === 'rag' || intent === 'vision' || intent === 'general')) {
    return reply(formatProject(projectHit), [
      'List all projects',
      'Tell me about Edge AI',
      'How can I contact him?',
    ]);
  }

  switch (intent) {
    case 'greeting':
      return reply(
        `Hi — I'm Jagath's portfolio assistant.\n\nI can answer questions about his **${K.title.split('|')[0].trim()}** background: skills, Edge AI / RAG work, experience at ${K.company}, projects, and how to reach him.\n\nWhat would you like to know?`,
        suggestedQuestions.slice(0, 4)
      );

    case 'help':
      return reply(
        `Ask me things like:\n\n• What does he specialize in?\n• Edge AI / face recognition / RAG projects\n• Current role and achievements\n• Education & certifications\n• Contact / availability\n\nTip: short, specific questions get the best answers.`,
        suggestedQuestions
      );

    case 'about':
      return reply(
        `**${K.name}**\n${K.title}\n\n${K.summary}\n\n• Based in ${K.location}\n• ${K.role} at ${K.company} since ${K.startDate} (${K.tenure})\n• ${K.education.degree} — ${K.education.university}\n\nWant skills, projects, or contact next?`,
        ['What are his top skills?', 'Show key achievements', 'How can I contact him?']
      );

    case 'skills': {
      const techHints: Array<{ keys: string[]; label: string; detail: string }> = [
        {
          keys: ['python'],
          label: 'Python',
          detail: 'Primary language for ML training, FastAPI services, ETL, and edge tooling.',
        },
        {
          keys: ['fastapi'],
          label: 'FastAPI',
          detail: 'Production APIs for RAG apps, voice assistant, and device/model integrations.',
        },
        {
          keys: ['yolo', 'opencv'],
          label: 'YOLO / OpenCV',
          detail: 'Real-time detection, analytics, and video pipelines on Jetson and Pi.',
        },
        {
          keys: ['pytorch', 'tensorflow'],
          label: 'PyTorch / TensorFlow',
          detail: 'Model training, CNNs, and optimization for edge deployment.',
        },
        {
          keys: ['docker', 'mlflow', 'dvc'],
          label: 'MLOps stack',
          detail: 'Docker + CI/CD, MLflow/DVC for versioning; ~50% faster model iteration.',
        },
      ];
      for (const t of techHints) {
        if (has(m, t.keys)) {
          return reply(
            `Yes — **${K.shortName}** works with **${t.label}** extensively.\n\n${t.detail}\n\n${skillsBlock(K.skills)}\n\nWant a related project example?`,
            ['Show related projects', 'Edge AI experience', 'Contact him']
          );
        }
      }
      return reply(
        `${K.shortName}'s core stack:\n\n${skillsBlock(K.skills)}\n\nWhich area should I zoom into?`,
        ['Computer Vision skills', 'RAG / Generative AI', 'MLOps tools']
      );
    }

    case 'experience':
      return reply(
        `**Current role:** ${K.role} at **${K.company}** (${K.startDate} – Present, ${K.tenure}).\n\n**Highlights:**\n${K.highlights.map((h) => `• ${h}`).join('\n')}\n\nSectors: retail analytics, industrial safety (PPE), residential security.\n\nWant Edge AI depth, RAG, or contact info?`,
        ['Edge AI details', 'RAG projects', 'Is he open to opportunities?']
      );

    case 'edge':
      return reply(
        `**Edge AI focus**\n\n• Flagship Edge AI Server: YOLO, pose, face recognition, audio events — **50+ clients**, under **200 ms** latency\n• Hardware: **NVIDIA Jetson**, **Raspberry Pi**, sensors, robotic-arm control\n• Face recognition: **98.5%** accuracy; TensorRT FP16 → **30 FPS** on Jetson Nano\n• Fleet: encrypted deploy + OTA on **200+** devices\n• Inference: CUDA, cuDNN, TensorRT, ONNX → **35%** lower latency, **40%** more throughput\n\nAsk about face recognition, streaming, or security next.`,
        ['Face recognition project', 'Video streaming work', 'How to contact him?']
      );

    case 'rag':
      return reply(
        `**Generative AI / RAG**\n\n• Production RAG for enterprise document search with embeddings, vector DBs, and semantic ranking\n• Offline operation, multilingual, domain-adapted for **legal** and **technical** docs\n• Stack includes LangChain / LangGraph, pgvector / Redis / MongoDB Atlas Vector Search\n• Also built an emotionally aware **voice assistant** (FastAPI + Twilio) with custom memory\n\nWant architecture details or contact for a RAG role?`,
        ['Voice assistant project', 'Full project list', 'Contact Jagath']
      );

    case 'vision':
      return reply(
        `**Computer Vision**\n\nStack: ${K.skills.computerVision.join(', ')}\n\nProduction work includes real-time object detection, PPE/hazard monitoring, intrusion/visitor flows, and offline face recognition (**98.5%**, **30 FPS** on Jetson Nano).\n\nRelated projects: Face Recognition, YOLO web app, VQA, live video analytics.`,
        ['Face recognition project', 'YOLO project', 'Edge AI overview']
      );

    case 'mlops':
      return reply(
        `**MLOps & deployment**\n\n• ${K.skills.mlops.join(', ')}\n• CI/CD with GitHub Actions + Docker for tests, model versioning, deploy validation\n• MLflow + DVC improved iteration velocity by **~50%**\n• Secure E2E encryption, tamper protection, health monitoring, zero-downtime OTA\n\nNeed cloud (AWS/GCP) specifics or contact?`,
        ['Edge device fleet', 'Current role', 'Contact']
      );

    case 'projects': {
      const list = K.projects
        .map((p, i) => `${i + 1}. **${p.title}** — ${p.impact}`)
        .join('\n');
      return reply(
        `Featured projects:\n\n${list}\n\nReply with a project name (or number) for details.`,
        ['Enterprise RAG Document Search', 'Custom Face Recognition System', 'Real-Time Video Streaming & Analytics']
      );
    }

    case 'education':
      return reply(
        `**Education**\n• ${K.education.degree}\n• ${K.education.university}\n• ${K.education.period}\n• Coursework: ${K.education.coursework}\n\nAlso holds Google Gen AI / Vertex badges, MLOps bootcamp, and Andrew Ng ML specialization.`,
        ['Certifications', 'Skills overview', 'Contact']
      );

    case 'certifications':
      return reply(
        `**Certifications**\n${K.certifications.map((c) => `• **${c.name}** (${c.provider}) — ${c.skills}`).join('\n')}`,
        ['Education', 'RAG experience', 'Contact']
      );

    case 'contact':
      return reply(
        `**Contact ${K.shortName}**\n\n• Email: ${K.email}\n• Phone / WhatsApp: ${K.phone}\n• LinkedIn: linkedin.com/in/jagathcharan2004\n• GitHub: github.com/jagathcharan\n• Portfolio: ${K.portfolio}\n\nI can also start a short intro message flow — just say **connect**.`,
        ['Is he available for roles?', 'Send a message', 'WhatsApp link']
      );

    case 'availability':
      return reply(
        `${K.shortName} is **open to opportunities** — full-time roles and consulting — especially around Edge AI, computer vision, RAG/LLM apps, Python backends, and MLOps.\n\nBased in ${K.location}; open to remote / hybrid / Bengaluru onsite.\n\nShare the role briefly, or contact him at ${K.email}.`,
        ['How can I contact him?', 'What are his top skills?', 'Edge AI experience']
      );

    case 'location':
      return reply(
        `${K.shortName} is based in **${K.location}** and open to remote, hybrid, Bengaluru onsite, or relocation for the right role.`,
        ['Availability', 'Contact details', 'Current role']
      );

    case 'resume':
      return reply(
        `You can download the resume from the green **Resume** button on this site (filename: Vankayala_Jagath_Charan_Resume.pdf), or email ${K.email} for the latest copy.`,
        ['Key achievements', 'Skills overview', 'Contact']
      );

    case 'languages':
      return reply(
        `${K.shortName} communicates in: ${K.languages.join('; ')}.\n\nInterests: ${K.interests.join('; ')}.`,
        ['About Jagath', 'Contact']
      );

    case 'salary':
      return reply(
        `Compensation is best discussed directly with ${K.shortName} against the role and market. Reach him at ${K.email} or WhatsApp ${K.phone}.`,
        ['Contact details', 'Availability', 'Experience summary']
      );

    case 'thanks':
      return reply(
        `Glad it helped. Ask anything else about ${K.shortName}'s skills, projects, or availability — or say **connect** to leave a message.`,
        ['Show projects', 'Contact him', "What's his Edge AI work?"]
      );

    default: {
      // Numbered project follow-up
      const num = m.match(/\b([1-7])\b/);
      if (num && conversationHistory.some((h) => h.includes('featured projects') || h.includes('project'))) {
        const idx = Number(num[1]) - 1;
        if (K.projects[idx]) {
          return reply(formatProject(K.projects[idx]), ['List all projects', 'Contact', 'Edge AI']);
        }
      }

      if (has(m, ['connect', 'message', 'reach out', 'talk to him'])) {
        return reply(
          `Great — use the **Contact** section form (Email app / WhatsApp), or write ${K.email}. WhatsApp: ${K.whatsapp}\n\nWant me to outline what to include in your note?`,
          ['What should I say?', 'Availability', 'Resume download']
        );
      }

      return reply(
        `I might need a clearer question. I can cover:\n\n• Skills & tech stack\n• Edge AI, CV, RAG projects\n• Experience at ${K.company}\n• Education & certifications\n• Contact & availability\n\nTry one of the suggestions below.`,
        suggestedQuestions.slice(0, 4)
      );
    }
  }
}

/** Backward-compatible string API used by older call sites. */
export function generateLocalAIResponseText(
  message: string,
  conversationHistory: string[] = []
): string {
  return generateLocalAIResponse(message, conversationHistory).text;
}
