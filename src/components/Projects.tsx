import { ExternalLink } from 'lucide-react';
import { memo, useMemo } from 'react';

function Projects() {
  const projects = useMemo(() => [
    {
      title: 'Emotionally Aware Voice Assistant',
      description: 'Built a multilingual, emotionally aware voice assistant with FastAPI and Twilio, using a custom memory model for context retention and real-time interaction.',
      tech: ['FastAPI', 'Twilio', 'NLP', 'Voice AI', 'Memory Model'],
      role: 'Full Stack AI Developer',
      impact: 'Real-time multilingual conversation with persistent context across sessions.',
    },
    {
      title: 'Enterprise RAG Document Search',
      description: 'Production Retrieval-Augmented Generation app with embeddings, vector databases, and semantic ranking for offline enterprise document search across legal and technical domains.',
      tech: ['RAG', 'LLMs', 'pgvector', 'LangChain', 'Embeddings'],
      role: 'ML Engineer',
      impact: 'Offline-capable, multi-language search with domain adaptation.',
    },
    {
      title: 'Custom Face Recognition System',
      description: 'Developed a CNN-based custom face recognition system involving data generation from video splits, annotation, and model training.',
      tech: ['CNN', 'PyTorch', 'OpenCV', 'Computer Vision'],
      role: 'ML Engineer',
      impact: 'Enabled robust single-person identification from real-world footage',
    },
    {
      title: 'Visual Question Answering (VQA) System',
      description: 'Built a multimodal AI model that answers natural language questions based on image content using the COCO dataset.',
      tech: ['CNN', 'LSTM', 'TensorFlow', 'Multimodal AI'],
      role: 'Research & Development',
      impact: 'Combined image processing with NLP for intelligent visual understanding',
    },
    {
      title: 'Real-Time Video Streaming & Analytics',
      description: 'Built a low-latency video streaming pipeline using FFmpeg (H.264/H.265) over RTSP, WebRTC, FLV, and HTTPS with YOLO/OpenCV for live object detection.',
      tech: ['FFmpeg', 'YOLO', 'CUDA', 'TensorRT', 'NVIDIA Jetson'],
      role: 'Senior ML Developer',
      impact: 'Reduced latency by 35% and improved throughput by 40%',
    },
    {
      title: 'YOLOv4 Object Detection Web App',
      description: 'Built a Streamlit app integrating YOLOv4 with Darknet to detect objects in images/videos with bounding box comparison capabilities.',
      tech: ['YOLOv4', 'Streamlit', 'Darknet', 'GPU Optimization'],
      role: 'Full Stack ML Developer',
      impact: 'Real-time object detection with optimized GPU performance',
    },
    {
      title: 'Pharma Sales ETL & Reporting Platform',
      description: 'Built an end-to-end ETL pipeline from AWS S3 to MySQL with DAG scheduling, profiling, and transformation.',
      tech: ['AWS S3', 'MySQL', 'Dataiku', 'Python', 'Power BI'],
      role: 'Data Engineer',
      impact: 'Created comprehensive dashboards with KPIs including market share and territory-wise performance',
    },
  ], []);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950" />
      <div className="absolute inset-0 ai-grid opacity-[0.04]"></div>
      <div className="absolute top-1/3 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-14 reveal">
            <p className="section-eyebrow justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Personal work
            </p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="gradient-text">Personal Projects</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto px-2">
              Independent builds across AI, computer vision, and data systems
            </p>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glass hover-lift rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 group reveal flex flex-col relative overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-3 gap-2">
                  <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-sky-300 transition-colors flex-1">
                    {project.title}
                  </h3>
                  <ExternalLink size={15} className="text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 mt-1" />
                </div>

                <p className="text-slate-400 mb-3 sm:mb-4 leading-relaxed text-[11px] sm:text-xs md:text-sm line-clamp-4 flex-grow">
                  {project.description}
                </p>

                <div className="mb-3 sm:mb-4 space-y-1">
                  <p className="text-[11px] sm:text-xs text-sky-400/90 font-semibold">{project.role}</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">{project.impact}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 sm:pt-4 border-t border-white/5 mt-auto">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-0.5 bg-sky-500/10 text-sky-300 rounded-md text-[10px] sm:text-[11px] font-medium border border-sky-500/20"
                    >
                      {tech}
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

export default memo(Projects);
