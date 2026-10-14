import { memo, useMemo } from 'react';

function Skills() {
  const skillCategories = useMemo(() => [
    {
      category: 'Languages & Core',
      skills: ['Python', 'SQL', 'Bash', 'TypeScript', 'Data Structures & Algorithms'],
      gradient: 'from-ai-primary to-ai-secondary',
    },
    {
      category: 'ML / Deep Learning',
      skills: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'NumPy', 'Pandas', 'Transformers', 'GANs', 'ONNX', 'TensorRT', 'FP16 Quantization', 'Dataset Curation'],
      gradient: 'from-ai-secondary to-ai-accent',
    },
    {
      category: 'Computer Vision & Edge AI',
      skills: ['OpenCV', 'MediaPipe', 'YOLO (v4/v5/v8)', 'SSD', 'Object Detection', 'Face Recognition', 'Pose Estimation', 'NVIDIA Jetson', 'Raspberry Pi', 'CUDA', 'cuDNN'],
      gradient: 'from-ai-accent to-ai-primary',
    },
    {
      category: 'Generative AI & NLP',
      skills: ['RAG', 'RAG Evaluation', 'LLMs (OpenAI, Hugging Face, LLaMA)', 'LangChain', 'LangGraph', 'pgvector', 'Redis', 'MongoDB Atlas Vector Search', 'Semantic Search', 'Prompt Engineering'],
      gradient: 'from-ai-primary to-ai-accent',
    },
    {
      category: 'Backend & Frontend',
      skills: ['FastAPI', 'Django', 'Flask', 'asyncio', 'REST APIs', 'Swagger/OpenAPI', 'JWT/OAuth', 'Twilio', 'React', 'Next.js', 'Streamlit'],
      gradient: 'from-ai-secondary to-ai-primary',
    },
    {
      category: 'Video Streaming',
      skills: ['FFmpeg', 'H.264/H.265', 'RTSP', 'WebRTC', 'FLV', 'HTTPS Streaming', 'Low-Latency Pipelines'],
      gradient: 'from-ai-accent to-ai-secondary',
    },
    {
      category: 'MLOps, DevOps & Cloud',
      skills: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins', 'MLflow', 'DVC', 'Prometheus', 'Grafana', 'OTA Updates', 'AWS', 'GCP Vertex AI', 'Cloudflare'],
      gradient: 'from-ai-primary to-ai-secondary',
    },
    {
      category: 'Data Engineering',
      skills: ['MySQL', 'PostgreSQL', 'ETL Pipelines', 'Apache Airflow', 'AWS S3', 'Databricks', 'Power BI', 'Label Studio', 'LabelImg'],
      gradient: 'from-ai-secondary to-ai-accent',
    },
    {
      category: 'Security & Architecture',
      skills: ['Encrypted Deployment', 'Tamper Protection', 'Secure Remote Access', 'Modular AI Pipelines', 'Edge Server Deployments'],
      gradient: 'from-ai-accent to-ai-primary',
    },
    {
      category: 'Collaboration',
      skills: ['Agile/Scrum', 'Technical Interviewing', 'Mentoring', 'Client Training', 'Code Review'],
      gradient: 'from-ai-primary to-ai-accent',
    },
  ], []);

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
      <div className="absolute inset-0 ai-grid opacity-[0.04]"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 reveal">
            <p className="section-eyebrow justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Toolkit
            </p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="gradient-text">Technical Skills</span>
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="glass hover-lift rounded-xl sm:rounded-2xl p-4 sm:p-5 group reveal relative overflow-hidden"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${category.gradient} opacity-80`} />
                <div className="mb-3 sm:mb-4">
                  <h3 className={`font-display text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                    {category.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-slate-800/80 text-slate-300 rounded-md text-[10px] sm:text-xs border border-white/5 hover:border-cyan-400/40 hover:text-cyan-200 hover:bg-cyan-500/10 transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Skills);
