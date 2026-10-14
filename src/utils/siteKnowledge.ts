/** Single source of truth for portfolio chat answers — keep in sync with the resume. */

export const siteKnowledge = {
  name: 'Vankayala Jagath Charan',
  shortName: 'Jagath',
  title:
    'Machine Learning Engineer | Computer Vision & Edge AI | Generative AI (RAG) | Python Backend | MLOps',
  specialization:
    'Computer Vision, Edge AI, Generative AI (RAG), Python/FastAPI backends, MLOps, and real-time video analytics',
  email: 'Jagathcharan2004@gmail.com',
  phone: '+91 9198198123',
  whatsapp: 'https://wa.me/919198198123',
  linkedin: 'https://www.linkedin.com/in/jagathcharan2004/',
  github: 'https://github.com/jagathcharan',
  portfolio: 'https://jagathcharan.github.io/portfolio/',
  location: 'Bengaluru, India',
  company: 'Amvar Data Tech Pvt. Ltd.',
  role: 'Software Developer – Machine Learning',
  startDate: 'October 2024',
  tenure: '17+ months',
  summary:
    'Machine Learning Engineer with 17+ months of startup experience building and deploying production AI products. Owns the full lifecycle from requirements to deployment, monitoring, and customer support across retail, industrial safety, and residential security.',
  education: {
    degree: 'B.Tech, Computer Science and Engineering',
    university: 'M S Ramaiah University of Applied Sciences, Bengaluru',
    period: '2021 – 2025',
    coursework:
      'Machine Learning, Deep Learning, Computer Vision, Data Structures, Algorithms, Database Systems',
  },
  skills: {
    languages: ['Python', 'SQL', 'Bash', 'TypeScript', 'DSA'],
    ml: [
      'TensorFlow',
      'PyTorch',
      'Keras',
      'Scikit-learn',
      'Transformers',
      'ONNX',
      'TensorRT',
      'FP16 Quantization',
    ],
    computerVision: [
      'OpenCV',
      'MediaPipe',
      'YOLO (v4/v5/v8)',
      'SSD',
      'Object Detection',
      'Face Recognition',
      'Pose Estimation',
      'Image Segmentation',
    ],
    generativeAI: [
      'RAG',
      'LangChain',
      'LangGraph',
      'LLMs (OpenAI, Hugging Face, LLaMA)',
      'pgvector',
      'Semantic Search',
      'Prompt Engineering',
    ],
    backend: ['FastAPI', 'Django', 'Flask', 'React', 'Next.js', 'Streamlit', 'JWT/OAuth'],
    video: ['FFmpeg', 'H.264/H.265', 'RTSP', 'WebRTC', 'FLV', 'Low-latency streaming'],
    mlops: [
      'Docker',
      'Kubernetes',
      'MLflow',
      'DVC',
      'GitHub Actions',
      'Prometheus',
      'Grafana',
      'AWS',
      'GCP Vertex AI',
    ],
    edge: ['NVIDIA Jetson', 'Raspberry Pi', 'CUDA', 'cuDNN', 'OTA Updates', 'IoT'],
  },
  highlights: [
    'Edge AI platform serving 50+ enterprise clients at under 200 ms latency',
    'Offline CNN face recognition at 98.5% accuracy; TensorRT FP16 at 30 FPS on Jetson Nano',
    'Production RAG for enterprise document search (legal & technical, multilingual, offline)',
    'Low-latency FFmpeg streaming (RTSP/WebRTC/FLV/HTTPS) under 200 ms end-to-end',
    '35% latency reduction and 40% throughput gain via CUDA, cuDNN, TensorRT, ONNX',
    'Secure encrypted deployment + OTA across 200+ edge devices',
    'MLflow/DVC workflows improved model iteration velocity by 50%',
    'India Electronics Expo & IndiaSoft 2026 demos to 500+ stakeholders',
    '15+ technical interviews; mentored 10+ developers; sprints 15% ahead of schedule',
  ],
  projects: [
    {
      title: 'Emotionally Aware Voice Assistant',
      aliases: ['voice', 'twilio', 'calling', 'assistant', 'virtual friend'],
      description:
        'Multilingual, emotionally aware voice assistant with FastAPI and Twilio, using a custom memory model for context retention.',
      tech: ['FastAPI', 'Twilio', 'NLP', 'Voice AI'],
      role: 'Full Stack AI Developer',
      impact: 'Real-time multilingual conversation with persistent context.',
    },
    {
      title: 'Enterprise RAG Document Search',
      aliases: ['rag', 'document', 'retrieval', 'vector', 'llm', 'langchain'],
      description:
        'Production RAG with embeddings, vector DBs, and semantic ranking for offline enterprise document search across legal and technical domains.',
      tech: ['RAG', 'LLMs', 'pgvector', 'LangChain', 'Embeddings'],
      role: 'ML Engineer',
      impact: 'Offline-capable, multi-language search with domain adaptation.',
    },
    {
      title: 'Custom Face Recognition System',
      aliases: ['face', 'facial', 'cnn', 'recognition', 'biometric'],
      description:
        'Offline CNN face recognition from video-derived datasets with TensorRT FP16 optimization for Jetson Nano.',
      tech: ['CNN', 'PyTorch', 'OpenCV', 'TensorRT'],
      role: 'ML Engineer',
      impact: '98.5% accuracy; 30 FPS on Jetson Nano.',
    },
    {
      title: 'Visual Question Answering (VQA)',
      aliases: ['vqa', 'multimodal', 'coco', 'visual question'],
      description:
        'Multimodal model that answers natural-language questions about image content (COCO).',
      tech: ['CNN', 'LSTM', 'TensorFlow', 'Multimodal AI'],
      role: 'Research & Development',
      impact: 'Combined vision + NLP for visual understanding.',
    },
    {
      title: 'Real-Time Video Streaming & Analytics',
      aliases: ['streaming', 'ffmpeg', 'rtsp', 'webrtc', 'video', 'latency'],
      description:
        'Low-latency FFmpeg pipeline (H.264/H.265) over RTSP, WebRTC, FLV, and HTTPS with live YOLO detection.',
      tech: ['FFmpeg', 'YOLO', 'CUDA', 'TensorRT', 'Jetson'],
      role: 'ML Developer',
      impact: 'Sub-200 ms latency; 35% latency cut, 40% throughput gain.',
    },
    {
      title: 'YOLOv4 Object Detection Web App',
      aliases: ['yolo', 'detection', 'streamlit', 'darknet'],
      description:
        'Streamlit app integrating YOLOv4/Darknet for image and video object detection.',
      tech: ['YOLOv4', 'Streamlit', 'Darknet'],
      role: 'Full Stack ML Developer',
      impact: 'Real-time detection with GPU optimization.',
    },
    {
      title: 'Pharma Sales ETL & Reporting',
      aliases: ['etl', 'pharma', 'power bi', 'airflow', 'pipeline', 'data'],
      description:
        'ETL from AWS S3 to MySQL with Airflow scheduling and Power BI dashboards.',
      tech: ['AWS S3', 'MySQL', 'Airflow', 'Python', 'Power BI'],
      role: 'Data Engineer',
      impact: 'Market share, sales calls, and territory performance reporting.',
    },
  ],
  certifications: [
    {
      name: 'Google Gen AI Academy & Cloud Skill Badges',
      provider: 'Google',
      skills: 'Vertex AI, Gemini API, Imagen, Streamlit, Multimodal RAG',
    },
    {
      name: 'End-to-End MLOps Bootcamp',
      provider: 'Krish Naik, Udemy',
      skills: 'MLflow, DVC, Docker, Airflow, SageMaker, Hugging Face',
    },
    {
      name: 'Machine Learning Specialization',
      provider: 'Andrew Ng, Coursera',
      skills: 'Supervised & unsupervised learning, neural networks',
    },
    {
      name: 'Advanced Python Development',
      provider: 'Udemy',
      skills: 'Production Python patterns and challenges',
    },
  ],
  languages: [
    'English (Professional)',
    'Telugu (Native)',
    'Hindi (Fluent)',
    'Kannada (Fluent)',
    'Tamil (Conversational)',
  ],
  interests: ['Agentic AI Systems & Workflow Automation', 'Edge AI Optimization'],
} as const;

export type SiteKnowledge = typeof siteKnowledge;

export const suggestedQuestions = [
  'What does Jagath specialize in?',
  'Tell me about his Edge AI work',
  'What RAG projects has he built?',
  'What is his current role?',
  'How can I contact him?',
  'Is he open to new opportunities?',
];
