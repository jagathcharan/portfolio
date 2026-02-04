import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Mail } from 'lucide-react';
import { generateLocalAIResponse } from '../utils/localAI';
import { fuzzyContains } from '../utils/fuzzyMatch';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface VisitorInfo {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm an AI assistant representing Vankayala Jagath Charan. I can help answer questions about his skills, experience, projects, certifications, or availability. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [contactFlow, setContactFlow] = useState<'idle' | 'asking_name' | 'asking_email' | 'asking_message'>('idle');
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle scroll to minimize chat with optimized throttling
  useEffect(() => {
    if (!isOpen) return; // Only listen when chat is open
    
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollY = window.scrollY;
    let lastUpdateTime = Date.now();
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const now = Date.now();
          const scrollY = window.scrollY;
          const scrollDelta = scrollY - lastScrollY;
          
          // Throttle updates to max once per 100ms
          if (now - lastUpdateTime > 100 || Math.abs(scrollDelta) > 20) {
            lastScrollY = scrollY;
            lastUpdateTime = now;
            
            // Clear any existing timeout
            clearTimeout(scrollTimeout);
            
            // If scrolled down significantly and chat is open, minimize
            if (scrollDelta > 30 && scrollY > 50 && isOpen) {
              scrollTimeout = setTimeout(() => {
                setIsOpen(false);
              }, 600);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Site content knowledge base
  const siteContent = {
    name: "Vankayala Jagath Charan",
    title: "Software Developer | Machine Learning Engineer",
    specialization: "AI & Machine Learning, Computer Vision, Edge AI, RAG-based Applications, and Real-time Video Analytics",
    email: "Jagathcharan2004@gmail.com",
    phone: "+91 9198198123",
    location: "Bengaluru 560057, India",
    company: "Amvar Data Tech Pvt. Ltd.",
    role: "Software Developer (Machine Learning)",
    startDate: "October 2024",
    education: {
      degree: "Bachelor of Technology in Computer Science",
      university: "M S Ramaiah University of Applied Sciences",
      period: "2021 - 2025",
      location: "Bengaluru"
    },
    skills: {
      programming: ["Python", "Bash", "SQL", "Git", "REST APIs", "Linux", "Docker", "CI/CD"],
      computerVision: ["OpenCV", "YOLO", "SSD", "Face Recognition", "Image Segmentation", "Pose Estimation", "TensorFlow", "PyTorch"],
      mlops: ["ONNX", "TensorRT", "NVIDIA Jetson", "Edge AI", "AWS (EC2, Lambda, S3)", "GitHub Actions", "Model Optimization"],
      generativeAI: ["GANs", "RAG", "LLMs (OpenAI, Hugging Face)", "Transformers", "NLTK", "Vertex AI", "Gemini API"],
      video: ["FFmpeg", "H.264/H.265", "RTSP/WebRTC", "Real-time Analytics", "CUDA/cuDNN", "Low-latency Streaming"],
      tools: ["Label Studio", "LabelImg", "Streamlit", "Dataiku", "Power BI", "Agile & Scrum", "Technical Mentoring"]
    },
    projects: [
      {
        title: "AI-Based Calling Assistant (Virtual Friend)",
        description: "Built a voice-based, emotionally aware AI assistant using FastAPI, Twilio, and Leema memory model to provide real-time conversation and multilingual support. Developed by Vankayala Jagath Charan, this RAG (Retrieval-Augmented Generation) application leverages advanced AI techniques to deliver personalized mental wellness and companionship experiences with contextual memory summarization.",
        tech: ["FastAPI", "Twilio", "Leema", "NLP", "Voice AI", "RAG"],
        role: "Full Stack AI Developer",
        impact: "Designed for mental wellness and companionship with contextual memory summarization and personalization. Features RAG architecture for enhanced conversational intelligence and knowledge retrieval."
      },
      {
        title: "Custom Face Recognition System",
        description: "Developed a CNN-based custom face recognition system involving data generation from video splits, annotation, and model training.",
        tech: ["CNN", "PyTorch", "OpenCV", "Computer Vision"],
        role: "ML Engineer",
        impact: "Enabled robust single-person identification from real-world footage"
      },
      {
        title: "Visual Question Answering (VQA) System",
        description: "Built a multimodal AI model that answers natural language questions based on image content using the COCO dataset.",
        tech: ["CNN", "LSTM", "TensorFlow", "Multimodal AI"],
        role: "Research & Development",
        impact: "Combined image processing with NLP for intelligent visual understanding"
      },
      {
        title: "Real-Time Video Streaming & Analytics",
        description: "Built a low-latency video streaming pipeline using FFmpeg (H.264/H.265) over RTSP, WebRTC, FLV, and HTTPS with YOLO/OpenCV for live object detection.",
        tech: ["FFmpeg", "YOLO", "CUDA", "TensorRT", "NVIDIA Jetson"],
        role: "Senior ML Developer",
        impact: "Reduced latency by 35% and improved throughput by 40%"
      },
      {
        title: "YOLOv4 Object Detection Web App",
        description: "Built a Streamlit app integrating YOLOv4 with Darknet to detect objects in images/videos with bounding box comparison capabilities.",
        tech: ["YOLOv4", "Streamlit", "Darknet", "GPU Optimization"],
        role: "Full Stack ML Developer",
        impact: "Real-time object detection with optimized GPU performance"
      },
      {
        title: "Pharma Sales ETL & Reporting Platform",
        description: "Built an end-to-end ETL pipeline from AWS S3 to MySQL with DAG scheduling, profiling, and transformation.",
        tech: ["AWS S3", "MySQL", "Dataiku", "Python", "Power BI"],
        role: "Data Engineer",
        impact: "Created comprehensive dashboards with KPIs including market share and territory-wise performance"
      }
    ],
    achievements: [
      "Led the development of an in-house Edge AI server product with real-time object recognition, pose estimation, and audio detection capabilities",
      "Built and deployed RAG (Retrieval-Augmented Generation) applications for intelligent knowledge retrieval and conversational AI systems",
      "Developed full-stack AI applications with robust backend APIs (FastAPI, Flask) and modern frontend interfaces (React, Streamlit)",
      "Designed and implemented media controller systems for real-time video streaming with FFmpeg (H.264/H.265), RTSP, WebRTC, and FLV protocols",
      "Built end-to-end face recognition applications with CNN models, including data collection, annotation, training, and production deployment",
      "Developed AI solutions for retail industry including customer behavior analysis, inventory management, and automated checkout systems",
      "Created industrial AI applications for quality control, defect detection, and predictive maintenance in manufacturing environments",
      "Implemented safety management systems using computer vision for workplace monitoring, PPE detection, and compliance tracking",
      "Designed and deployed end-to-end AI pipelines, including data annotation, training (YOLO, CNN), and inference optimization using CUDA/cuDNN",
      "Built and deployed pilot models on Jetson and Raspberry Pi devices, integrating sensors and robotic arms for smart automation use cases",
      "Led cross-functional teams, managed project timelines, and mentored junior developers in AI/ML best practices and agile methodologies",
      "Integrated ML models into scalable APIs and ensured secure deployment with encryption, tamper protection, and device health monitoring",
      "Created remote monitoring and OTA update systems for large-scale edge device fleets"
    ],
    certifications: [
      { name: "Completed the Gen AI Academy", provider: "Google", skills: "Vertex AI, Gemini API, Imagen, Streamlit, Multimodal RAG" },
      { name: "Develop GenAI Apps with Gemini and Streamlit", provider: "Google Skill Badge", skills: "Gemini, Streamlit, GenAI Development" },
      { name: "Explore Generative AI with Vertex AI Gemini API", provider: "Google Skill Badge", skills: "Vertex AI, Gemini API, GenAI" },
      { name: "Inspect Rich Documents with Gemini Multimodality", provider: "Google Skill Badge", skills: "Multimodal RAG, Document Analysis" },
      { name: "Build Real World AI Applications with Gemini and Imagen", provider: "Google Skill Badge", skills: "Gemini, Imagen, Production AI" },
      { name: "Prompt Design in Vertex AI", provider: "Google Skill Badge", skills: "Prompt Engineering, Vertex AI" },
      { name: "Machine Learning", provider: "Andrew Ng, Coursera", skills: "ML Fundamentals, Algorithms, Neural Networks" },
      { name: "End-to-End MLOps Bootcamp", provider: "Krish Naik, Udemy", skills: "MLFlow, DVC, Docker, CI/CD, Airflow, SageMaker" },
      { name: "The Complete Python Developer", provider: "Udemy", skills: "Python, Advanced Programming" },
      { name: "Practice Python by Solving 100 Coding Challenges", provider: "Udemy", skills: "Python, Problem Solving" },
      { name: "Blockchain", provider: "Coursera", skills: "Blockchain Fundamentals, Distributed Systems" }
    ],
    languages: ["English", "Telugu", "Kannada", "Tamil", "Hindi"]
  };

  // Enhanced AI Response Generator with fuzzy matching and local AI
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();
    const words = lowerMessage.split(/\s+/);
    
    // Get recent conversation context for better responses
    const recentMessages = messages.slice(-3).map(m => m.text.toLowerCase());
    
    // Use local AI with fuzzy matching for better typo tolerance
    try {
      const localAIResponse = generateLocalAIResponse(userMessage, {
        siteContent,
        conversationHistory: recentMessages
      });
      
      // If local AI provides a good response, use it
      if (localAIResponse && localAIResponse.length > 20) {
        return localAIResponse;
      }
    } catch (error) {
      console.warn('Local AI error, using fallback:', error);
    }
    
    // Fallback to enhanced rule-based with fuzzy matching
    // Greetings - Enhanced with fuzzy matching for typos
    if (fuzzyContains(lowerMessage, ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'good night', 'sup', 'what\'s up', 'howdy', 'namaste', 'hii', 'helloo'], 0.7)) {
      const greetings = [
        `Hello! Nice to meet you. I'm here to help you learn more about ${siteContent.name}'s expertise in ${siteContent.specialization}. What would you like to know?`,
        `Hi there! I can help you learn about ${siteContent.name}'s skills, projects, and experience. How can I assist you today?`,
        `Hello! Welcome! I'm here to answer questions about ${siteContent.name}'s professional background. What interests you most?`
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Skills/Expertise questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['skill', 'expertise', 'what can', 'capabilities', 'technologies', 'tech stack', 'tools', 'programming', 'python', 'opencv', 'yolo', 'tensorflow', 'pytorch', 'what technologies', 'what tools', 'what languages', 'proficient', 'knows', 'familiar', 'experienced in', 'good at', 'specializes', 'expert'], 0.7)) {
      // Check for specific technology mentions
      if (lowerMessage.match(/\b(python|opencv|yolo|tensorflow|pytorch|docker|aws|git|linux|bash|sql|rest|api)\b/)) {
        const tech = lowerMessage.match(/\b(python|opencv|yolo|tensorflow|pytorch|docker|aws|git|linux|bash|sql|rest|api)\b/)?.[0];
        if (tech === 'python' || tech === 'opencv' || tech === 'yolo' || tech === 'tensorflow' || tech === 'pytorch') {
          return `Yes! ${siteContent.name} has extensive experience with ${tech}. He uses it for ${tech === 'python' ? 'building AI/ML applications, APIs, and data pipelines' : tech === 'opencv' ? 'computer vision tasks, image processing, and video analytics' : tech === 'yolo' ? 'real-time object detection and computer vision applications' : 'deep learning model development and training'}. Would you like to know about specific projects using ${tech}?`;
        }
      }
      return `${siteContent.name} specializes in:\n\n• Programming & Frameworks: ${siteContent.skills.programming.join(', ')}\n• Computer Vision & AI: ${siteContent.skills.computerVision.join(', ')}\n• MLOps & Deployment: ${siteContent.skills.mlops.join(', ')}\n• Generative AI & NLP: ${siteContent.skills.generativeAI.join(', ')}\n• Video & Streaming: ${siteContent.skills.video.join(', ')}\n• Tools & Platforms: ${siteContent.skills.tools.join(', ')}\n\nWould you like more details about any specific area?`;
    }

    // Experience questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['experience', 'work', 'job', 'position', 'role', 'current', 'where does', 'company', 'amvar', 'achievement', 'accomplishment', 'experinec', 'exp', 'work experience', 'professional', 'years of experience', 'how long', 'career', 'background', 'work history', 'employment', 'currently working', 'where work'], 0.7)) {
      // Check if asking about years of experience
      if (lowerMessage.match(/\b(years|how long|experience|exp)\b/)) {
        return `${siteContent.name} has been working as a ${siteContent.role} at ${siteContent.company} since ${siteContent.startDate}. He has extensive hands-on experience in AI/ML development, computer vision, and building production-ready applications. His experience includes leading edge AI projects, developing RAG applications, and deploying models to production.`;
      }
      return `${siteContent.name} is currently a ${siteContent.role} at ${siteContent.company} since ${siteContent.startDate}. Key achievements include:\n\n• ${siteContent.achievements[0]}\n• ${siteContent.achievements[1]}\n• ${siteContent.achievements[2]}\n• ${siteContent.achievements[3]}\n\nWould you like to know about specific projects or more achievements?`;
    }

    // Projects questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['project', 'work', 'built', 'developed', 'created', 'portfolio', 'virtual friend', 'face recognition', 'vqa', 'streaming', 'yolo', 'pharma', 'etl', 'projects', 'what projects', 'show projects', 'list projects', 'what has', 'what did', 'built', 'made', 'worked on', 'portfolio', 'showcase'], 0.7)) {
      // Check for specific project mentions
      if (lowerMessage.match(/\b(virtual friend|calling assistant|voice ai|rag|retrieval)\b/)) {
        const p = siteContent.projects[0];
        return `${p.title}\n\n${p.description}\n\nRole: ${p.role}\nImpact: ${p.impact}\nTechnologies: ${p.tech.join(', ')}\n\nThis project demonstrates ${siteContent.name}'s expertise in RAG (Retrieval-Augmented Generation) and conversational AI.`;
      }
      const projectList = siteContent.projects.map((p, i) => 
        `${i + 1}. ${p.title}\n   ${p.description.substring(0, 120)}...\n   Technologies: ${p.tech.slice(0, 4).join(', ')}`
      ).join('\n\n');
      return `Here are ${siteContent.name}'s featured projects:\n\n${projectList}\n\nWould you like detailed information about any specific project?`;
    }

    // About Jagath questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['about', 'who is', 'tell me about', 'jagath', 'vankayala', 'introduce', 'background', 'info', 'information', 'who', 'what is', 'describe', 'summary', 'overview'], 0.7)) {
      return `About ${siteContent.name}:\n\n${siteContent.name} is a ${siteContent.title} specializing in ${siteContent.specialization}.\n\nCurrently working as ${siteContent.role} at ${siteContent.company} since ${siteContent.startDate}.\n\nEducation: ${siteContent.education.degree} from ${siteContent.education.university} (${siteContent.education.period})\n\nLocation: ${siteContent.location}\n\nHe has extensive experience in AI/ML, computer vision, edge AI deployment, and building production-ready applications. Would you like to know more about his skills, projects, or experience?`;
    }

    // Availability/Hiring questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['available', 'hiring', 'job', 'opportunity', 'position', 'open', 'looking', 'interested', 'recruit', 'connect', 'want to connect', 'contact', 'get in touch', 'hire', 'recruiting', 'open to', 'seeking', 'searching for', 'need', 'want', 'looking for', 'position available', 'role', 'vacancy'], 0.7)) {
      if (contactFlow === 'idle') {
        setContactFlow('asking_name');
        return `Great! ${siteContent.name} is open to new opportunities and collaborations. He's particularly interested in roles involving AI/ML, computer vision, edge AI, and RAG applications.\n\nI'd love to help you connect with him. To get started, could you please tell me your name?`;
      }
    }

    // Contact questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['contact', 'email', 'phone', 'reach', 'get in touch', 'connect', 'linkedin', 'github', 'want to contact', 'reach out', 'how to contact', 'contact info', 'contact details', 'email address', 'phone number', 'social media', 'profile'], 0.7)) {
      if (contactFlow === 'idle') {
        if (lowerMessage.match(/\b(email|email address|mail)\b/)) {
          return `You can reach ${siteContent.name} at ${siteContent.email}. Would you like me to help you send a message?`;
        }
        if (lowerMessage.match(/\b(phone|number|call|mobile)\b/)) {
          return `${siteContent.name}'s phone number is ${siteContent.phone}. For professional inquiries, email is preferred: ${siteContent.email}`;
        }
        if (lowerMessage.match(/\b(linkedin|github|social|profile)\b/)) {
          return `I'd be happy to help you connect with ${siteContent.name}! To get started, could you please tell me your name?`;
        }
        setContactFlow('asking_name');
        return `I'd be happy to help you connect with ${siteContent.name}!\n\nEmail: ${siteContent.email}\nPhone: ${siteContent.phone}\n\nOr I can help you send a message. To get started, could you please tell me your name?`;
      }
    }

    // Education questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['education', 'degree', 'university', 'college', 'qualification', 'background', 'ramaiah', 'studied', 'graduated', 'alumni', 'bachelor', 'btech', 'btech', 'cs', 'computer science', 'where studied', 'where graduated'], 0.7)) {
      return `${siteContent.name} holds a ${siteContent.education.degree} from ${siteContent.education.university} (${siteContent.education.period}), ${siteContent.education.location}.\n\nHe has also completed numerous certifications including:\n• Google's Gen AI Academy\n• Machine Learning by Andrew Ng (Coursera)\n• End-to-End MLOps Bootcamp\n• Multiple Google Skill Badges in Generative AI\n\nThese certifications demonstrate his commitment to continuous learning in AI/ML.`;
    }

    // Certifications questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['certification', 'certified', 'course', 'training', 'learned', 'badge', 'google', 'gen ai', 'mlops', 'certificate', 'completed', 'took', 'studied', 'learned', 'courses', 'certifications'], 0.7)) {
      const certList = siteContent.certifications.slice(0, 8).map(c => 
        `• ${c.name} (${c.provider})`
      ).join('\n');
      return `${siteContent.name} has completed several certifications and courses:\n\n${certList}\n\nThese demonstrate his commitment to continuous learning in AI/ML, MLOps, and modern software development practices.`;
    }

    // General AI/ML questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['ai', 'machine learning', 'ml', 'deep learning', 'neural', 'model', 'algorithm', 'computer vision', 'edge ai', 'artificial intelligence', 'neural network', 'cnn', 'lstm', 'transformer', 'yolo', 'opencv'], 0.7)) {
      // Check for specific AI topics
      if (lowerMessage.match(/\b(computer vision|cv|opencv|yolo|object detection|face recognition|image)\b/)) {
        return `${siteContent.name} has extensive expertise in Computer Vision:\n\n• Technologies: ${siteContent.skills.computerVision.join(', ')}\n• Projects: Custom Face Recognition System, YOLOv4 Object Detection, Visual Question Answering\n• Experience: Real-time object detection, pose estimation, image segmentation, and video analytics\n\nHe has built production-ready CV applications using OpenCV, YOLO, and custom CNN models.`;
      }
      if (lowerMessage.match(/\b(rag|retrieval|generative|llm|gpt|gemini|chatbot|conversational)\b/)) {
        return `${siteContent.name} has strong expertise in Generative AI and RAG:\n\n• Technologies: ${siteContent.skills.generativeAI.join(', ')}\n• Key Project: AI-Based Calling Assistant (Virtual Friend) - a RAG-based voice assistant\n• Experience: Building conversational AI, knowledge retrieval systems, and LLM integration\n\nHe's completed Google's Gen AI Academy and multiple certifications in this area.`;
      }
      if (lowerMessage.match(/\b(edge|deployment|mlops|onnx|tensorrt|jetson|production|inference)\b/)) {
        return `${siteContent.name} specializes in MLOps and Edge AI:\n\n• Technologies: ${siteContent.skills.mlops.join(', ')}\n• Experience: Model optimization, ONNX conversion, TensorRT deployment, edge device integration\n• Achievements: Deployed models on NVIDIA Jetson, optimized for low-latency inference\n\nHe has hands-on experience with end-to-end ML pipelines from training to production deployment.`;
      }
      return `${siteContent.name} has deep expertise in AI and Machine Learning:\n\n• Computer Vision: ${siteContent.skills.computerVision.slice(0, 5).join(', ')}\n• Deep Learning: CNNs, LSTMs, Transformers, GANs\n• MLOps: ${siteContent.skills.mlops.slice(0, 5).join(', ')}\n• Edge AI: Deploying models on edge devices like ${siteContent.skills.mlops[2]}\n• Generative AI: ${siteContent.skills.generativeAI.slice(0, 5).join(', ')}\n\nWhat specific aspect interests you?`;
    }

    // Salary/Compensation questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['salary', 'compensation', 'pay', 'rate', 'budget', 'cost', 'package', 'ctc', 'lpa', 'expected', 'expectation', 'remuneration', 'stipend'], 0.7)) {
      return `For compensation and salary discussions, it's best to connect directly with ${siteContent.name}. He's open to discussing competitive packages based on the role, responsibilities, and market standards.\n\nWould you like to share details about the opportunity? I can help you connect with him.`;
    }

    // Location questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['location', 'where', 'remote', 'onsite', 'hybrid', 'relocate', 'bengaluru', 'bangalore', 'india', 'based', 'located', 'work location', 'work from', 'wfh', 'work from home', 'office', 'workplace'], 0.7)) {
      if (lowerMessage.match(/\b(remote|wfh|work from home|work from)\b/)) {
        return `${siteContent.name} is currently based in ${siteContent.location} and is open to remote opportunities. He has experience working remotely and can effectively collaborate across time zones.`;
      }
      if (lowerMessage.match(/\b(onsite|office|hybrid|relocate)\b/)) {
        return `${siteContent.name} is currently based in ${siteContent.location}. He's open to:\n\n• On-site positions in Bengaluru\n• Hybrid work arrangements\n• Relocation for the right opportunity\n\nWhat type of arrangement are you offering?`;
      }
      return `${siteContent.name} is currently based in ${siteContent.location}. He's open to:\n\n• Remote opportunities\n• On-site positions in Bengaluru\n• Hybrid work arrangements\n• Relocation for the right opportunity\n\nWhat type of arrangement are you offering?`;
    }

    // Timeline/Start date questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['when', 'start', 'available', 'timeline', 'notice period', 'join', 'begin', 'joining', 'when can', 'when will', 'availability', 'start date', 'joining date', 'immediate', 'urgent'], 0.7)) {
      if (lowerMessage.match(/\b(immediate|urgent|asap|soon|quick)\b/)) {
        return `${siteContent.name}'s availability depends on the opportunity and notice period requirements. He's currently working at ${siteContent.company}, so there may be a standard notice period. For urgent requirements, please share the details and he'll do his best to accommodate.`;
      }
      return `${siteContent.name}'s availability depends on the opportunity and notice period requirements. He's currently working at ${siteContent.company}, so there may be a standard notice period. For specific timelines, it's best to discuss directly. Would you like to share more about the position?`;
    }

    // Specific project questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['virtual friend', 'calling assistant', 'voice ai', 'rag', 'retrieval', 'conversational ai', 'leema', 'twilio', 'fastapi', 'emotion', 'wellness', 'companion'], 0.7)) {
      const p = siteContent.projects[0];
      return `${p.title}\n\n${p.description}\n\nRole: ${p.role}\nImpact: ${p.impact}\nTechnologies: ${p.tech.join(', ')}\n\nThis project showcases ${siteContent.name}'s expertise in RAG (Retrieval-Augmented Generation), conversational AI, and building production-ready voice applications.`;
    }

    if (fuzzyContains(lowerMessage, ['face recognition', 'cnn', 'person identification', 'facial', 'face detection', 'biometric', 'identity'], 0.7)) {
      const p = siteContent.projects[1];
      return `${p.title}\n\n${p.description}\n\nRole: ${p.role}\nImpact: ${p.impact}\nTechnologies: ${p.tech.join(', ')}\n\nThis project demonstrates ${siteContent.name}'s expertise in computer vision, CNN model development, and end-to-end ML pipeline from data collection to production deployment.`;
    }

    if (fuzzyContains(lowerMessage, ['vqa', 'visual question', 'multimodal', 'image question', 'coco', 'coco dataset', 'vision language'], 0.7)) {
      const p = siteContent.projects[2];
      return `${p.title}\n\n${p.description}\n\nRole: ${p.role}\nImpact: ${p.impact}\nTechnologies: ${p.tech.join(', ')}\n\nThis project showcases ${siteContent.name}'s expertise in multimodal AI, combining computer vision with natural language processing.`;
    }

    if (fuzzyContains(lowerMessage, ['video streaming', 'ffmpeg', 'rtsp', 'webrtc', 'low latency', 'real-time', 'streaming', 'video analytics', 'h.264', 'h.265', 'flv', 'media controller'], 0.7)) {
      const p = siteContent.projects[3];
      return `${p.title}\n\n${p.description}\n\nRole: ${p.role}\nImpact: ${p.impact}\nTechnologies: ${p.tech.join(', ')}\n\nThis project demonstrates ${siteContent.name}'s expertise in real-time video processing, low-latency streaming, and edge AI deployment.`;
    }

    if (fuzzyContains(lowerMessage, ['yolov4', 'yolo', 'object detection', 'streamlit', 'darknet', 'bounding box', 'detection', 'web app'], 0.7)) {
      const p = siteContent.projects[4];
      return `${p.title}\n\n${p.description}\n\nRole: ${p.role}\nImpact: ${p.impact}\nTechnologies: ${p.tech.join(', ')}\n\nThis project showcases ${siteContent.name}'s expertise in object detection, web application development, and GPU optimization.`;
    }

    if (fuzzyContains(lowerMessage, ['pharma', 'etl', 'data pipeline', 'power bi', 'dataiku', 'sales', 'reporting', 'dashboard', 'kpi', 'aws s3', 'mysql', 'dag'], 0.7)) {
      const p = siteContent.projects[5];
      return `${p.title}\n\n${p.description}\n\nRole: ${p.role}\nImpact: ${p.impact}\nTechnologies: ${p.tech.join(', ')}\n\nThis project demonstrates ${siteContent.name}'s expertise in data engineering, ETL pipelines, and business intelligence.`;
    }

    // Resume/CV questions - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['resume', 'cv', 'curriculum vitae', 'download', 'pdf', 'document', 'profile'], 0.7)) {
      return `You can find ${siteContent.name}'s resume and detailed profile information on this website. For the most up-to-date resume, please reach out directly at ${siteContent.email}. Would you like me to help you connect with him?`;
    }

    // Languages/Communication - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['language', 'languages', 'speak', 'communication', 'english', 'telugu', 'kannada', 'tamil', 'hindi', 'multilingual'], 0.7)) {
      return `${siteContent.name} is multilingual and can communicate in: ${siteContent.languages.join(', ')}. This helps him collaborate effectively with diverse teams and clients.`;
    }

    // Company/Current role specific - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['amvar', 'amvar data', 'current company', 'where work', 'employer'], 0.7)) {
      return `${siteContent.name} is currently working as a ${siteContent.role} at ${siteContent.company} since ${siteContent.startDate}. At Amvar Data Tech, he works on AI/ML solutions, computer vision applications, and edge AI deployment.`;
    }

    // Thank you/Appreciation - Enhanced with fuzzy matching
    if (fuzzyContains(lowerMessage, ['thank', 'thanks', 'appreciate', 'grateful', 'helpful', 'nice', 'good', 'great', 'awesome', 'perfect'], 0.7)) {
      const thanks = [
        "You're welcome! I'm glad I could help. Is there anything else you'd like to know about Jagath Charan?",
        "Happy to help! Feel free to ask if you need more information about his skills, projects, or experience.",
        "You're welcome! If you have any other questions, I'm here to help."
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }

    // Default responses - Enhanced with better context awareness
    const defaultResponses = [
      "That's interesting! Could you tell me more about what you're looking for? I can help with information about Jagath Charan's skills, projects, experience, or availability.",
      "I'd be happy to help with that. Could you provide a bit more context? For example, are you asking about his technical skills, projects, work experience, or something else?",
      `${siteContent.name} has extensive experience in AI/ML, computer vision, and building production applications. What specific information would be most helpful?`,
      "Let me know if you'd like details about his skills, projects, experience, certifications, or availability. I'm here to help!",
      "I can help you learn about Jagath Charan's technical skills, projects, work experience, certifications, or discuss potential opportunities. What interests you most?",
      "I'm here to answer questions about Jagath Charan's professional background. You can ask about skills, projects, experience, education, certifications, or how to connect with him.",
    ];

    // Check if it's a question - Enhanced response
    if (lowerMessage.includes('?')) {
      return "That's a great question! I can help you with information about Jagath Charan's:\n\n• Skills & Technologies\n• Projects & Portfolio\n• Work Experience & Achievements\n• Education & Certifications\n• Availability & Contact\n\nCould you be more specific about what you'd like to know? Or would you like me to help you connect with him directly?";
    }

    // Check for follow-up questions based on recent conversation
    if (recentMessages.some(m => m.includes('skill') || m.includes('technology'))) {
      if (lowerMessage.match(/\b(yes|sure|ok|okay|tell me|more|details|specific|which|what)\b/)) {
        return "Great! Which specific skill or technology would you like to know more about? For example:\n\n• Computer Vision (OpenCV, YOLO)\n• Deep Learning (TensorFlow, PyTorch)\n• MLOps & Deployment\n• Generative AI & RAG\n• Video Streaming & Analytics";
      }
    }

    if (recentMessages.some(m => m.includes('project') || m.includes('work'))) {
      if (lowerMessage.match(/\b(yes|sure|ok|okay|tell me|more|details|specific|which|what)\b/)) {
        return "Which project would you like to know more about?\n\n1. AI-Based Calling Assistant (RAG/Voice AI)\n2. Custom Face Recognition System\n3. Visual Question Answering\n4. Real-Time Video Streaming\n5. YOLOv4 Object Detection\n6. Pharma Sales ETL Platform";
      }
    }

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim();
    setInput('');
    setIsTyping(true);

    // Handle contact flow step by step
    if (contactFlow === 'asking_name') {
      setTimeout(() => {
        setVisitorInfo(prev => ({ ...prev, name: userInput }));
        setContactFlow('asking_email');
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Nice to meet you, ${userInput}! Could you please provide your email address?`,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    if (contactFlow === 'asking_email') {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInput)) {
        setTimeout(() => {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `That doesn't look like a valid email address. Could you please provide a valid email? (e.g., yourname@example.com)`,
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          setIsTyping(false);
        }, 1000);
        return;
      }
      
      setTimeout(() => {
        setVisitorInfo(prev => ({ ...prev, email: userInput }));
        setContactFlow('asking_message');
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Thank you! Now, could you please share your message or what you'd like to discuss?`,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    if (contactFlow === 'asking_message') {
      setTimeout(async () => {
        const finalInfo = { ...visitorInfo, message: userInput };
        setVisitorInfo(finalInfo);
        
        // Send email
        const { sendEmail } = await import('../utils/emailService');
        const success = await sendEmail({
          name: finalInfo.name,
          email: finalInfo.email,
          company: finalInfo.company || '',
          message: finalInfo.message,
          title: 'AI Chat Contact Request',
        });

        if (success) {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `Perfect! I've received your information:\n\n• Name: ${finalInfo.name}\n• Email: ${finalInfo.email}\n• Message: ${finalInfo.message}\n\nThank you for reaching out! ${siteContent.name} will contact you shortly. We appreciate your interest!`,
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          
          // Reset contact flow
          setContactFlow('idle');
          setVisitorInfo({ name: '', email: '', company: '', message: '' });
        } else {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `I've received your information, but there was an issue sending the email. Please try contacting ${siteContent.name} directly at ${siteContent.email}. Thank you!`,
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          setContactFlow('idle');
          setVisitorInfo({ name: '', email: '', company: '', message: '' });
        }
        setIsTyping(false);
      }, 1000);
      return;
    }

    // Normal conversation flow - Use enhanced rule-based responses
    setTimeout(() => {
      const aiResponse = generateAIResponse(userInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSendEmail = async () => {
    if (!visitorInfo.email || !visitorInfo.message) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Please provide at least your email and message to continue.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Create conversation summary
    const conversationSummary = messages
      .filter(m => m.sender === 'user')
      .slice(-5) // Last 5 user messages
      .map(m => `Q: ${m.text}`)
      .join('\n');

    // Import and use email service
    const { sendEmail } = await import('../utils/emailService');
    const success = await sendEmail({
      name: visitorInfo.name,
      email: visitorInfo.email,
      company: visitorInfo.company,
      message: visitorInfo.message,
      conversationSummary,
    });

    // Add a message to chat
    const emailMessage: Message = {
      id: Date.now().toString(),
      text: success
        ? `Thank you ${visitorInfo.name || 'for your interest'}! I've prepared an email with your information. The email client should open shortly. If it doesn't, you can reach Jagath Charan directly at Jagathcharan2004@gmail.com. He'll get back to you soon!`
        : `Thank you for your interest! You can reach Jagath Charan directly at Jagathcharan2004@gmail.com. He'll be happy to discuss opportunities with you.`,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, emailMessage]);
    setShowInfoForm(false);
    setVisitorInfo({ name: '', email: '', company: '', message: '' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-6 z-50 flex items-end gap-3 animate-fade-in-up">
        {/* Popup message with suggestions */}
        <div className="bg-slate-800/95 backdrop-blur-sm text-white px-3 py-2.5 rounded-lg shadow-2xl border border-ai-primary/30 max-w-[180px] mb-2 animate-fade-in-up">
          <p className="text-xs font-semibold text-ai-primary mb-1.5">Ask me about:</p>
          <ul className="text-xs text-slate-300 space-y-0.5">
            <li>• Skills & Expertise</li>
            <li>• Projects & Experience</li>
            <li>• AI & RAG Applications</li>
            <li>• Availability</li>
          </ul>
        </div>
        
        {/* Chat button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-ai-primary to-ai-secondary text-white p-3 rounded-full shadow-2xl shadow-ai-primary/50 hover:shadow-ai-primary/70 transition-all duration-300 hover:scale-110 animate-float group flex-shrink-0 relative"
          aria-label="Open AI Chat"
        >
          <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-ai-success rounded-full animate-pulse border-2 border-white"></span>
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-96 max-w-md h-[550px] max-h-[85vh] bg-slate-900 rounded-2xl shadow-2xl border border-ai-primary/30 flex flex-col overflow-hidden ${isOpen ? 'chat-scale-in' : 'chat-scale-out'}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-ai-primary to-ai-secondary p-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
            <p className="text-white/80 text-xs">Ask me anything about Jagath Charan</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="w-7 h-7 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-2.5 ${
                message.sender === 'user'
                  ? 'bg-ai-primary text-white'
                  : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <p className="text-xs whitespace-pre-line">{message.text}</p>
              <p className="text-xs opacity-70 mt-0.5">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.sender === 'user' && (
              <div className="w-7 h-7 bg-ai-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-ai-primary" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-full flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-slate-800 text-slate-200 rounded-lg p-2.5 border border-slate-700">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Info Form */}
      {showInfoForm && (
        <div className="p-3 bg-slate-800 border-t border-slate-700 space-y-2.5">
          <h4 className="text-white font-semibold text-xs flex items-center gap-1.5">
            <Mail size={14} />
            Optional: Share Your Details
          </h4>
          <input
            type="text"
            placeholder="Your Name (Optional)"
            value={visitorInfo.name}
            onChange={(e) => setVisitorInfo({ ...visitorInfo, name: e.target.value })}
            className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-ai-primary"
          />
          <input
            type="email"
            placeholder="Your Email *"
            value={visitorInfo.email}
            onChange={(e) => setVisitorInfo({ ...visitorInfo, email: e.target.value })}
            className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-ai-primary"
            required
          />
          <input
            type="text"
            placeholder="Company/Organization (Optional)"
            value={visitorInfo.company}
            onChange={(e) => setVisitorInfo({ ...visitorInfo, company: e.target.value })}
            className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-ai-primary"
          />
          <textarea
            placeholder="Your Message/Inquiry *"
            value={visitorInfo.message}
            onChange={(e) => setVisitorInfo({ ...visitorInfo, message: e.target.value })}
            rows={3}
            className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-ai-primary resize-none"
            required
          />
          <div className="flex gap-2">
            <button
              onClick={handleSendEmail}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-ai-success to-emerald-600 text-white rounded-lg font-semibold text-xs hover:shadow-lg hover:shadow-ai-success/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1.5"
            >
              <Send size={14} />
              Send Email
            </button>
            <button
              onClick={() => {
                setShowInfoForm(false);
                setVisitorInfo({ name: '', email: '', company: '', message: '' });
              }}
              className="px-3 py-2 bg-slate-700 text-white rounded-lg font-semibold text-xs hover:bg-slate-600 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      {!showInfoForm && (
        <div className="p-3 bg-slate-800 border-t border-slate-700">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type={contactFlow === 'asking_email' ? 'email' : 'text'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                contactFlow === 'asking_name' 
                  ? 'Type your name...' 
                  : contactFlow === 'asking_email'
                  ? 'Type your email address...'
                  : contactFlow === 'asking_message'
                  ? 'Type your message...'
                  : 'Ask about skills, experience, projects...'
              }
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-ai-primary"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-3 py-2 bg-gradient-to-r from-ai-primary to-ai-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-ai-primary/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
