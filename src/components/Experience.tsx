import { Briefcase, Calendar } from 'lucide-react';
import { memo, useMemo } from 'react';

function Experience() {
  const achievements = useMemo(() => [
    'Led the development of an in-house Edge AI server product with real-time object recognition, pose estimation, and audio detection capabilities',
    'Built and deployed RAG (Retrieval-Augmented Generation) applications for intelligent knowledge retrieval and conversational AI systems',
    'Developed full-stack AI applications with robust backend APIs (FastAPI, Flask) and modern frontend interfaces (React, Streamlit)',
    'Designed and implemented media controller systems for real-time video streaming with FFmpeg (H.264/H.265), RTSP, WebRTC, and FLV protocols',
    'Built end-to-end face recognition applications with CNN models, including data collection, annotation, training, and production deployment',
    'Developed AI solutions for retail industry including customer behavior analysis, inventory management, and automated checkout systems',
    'Created industrial AI applications for quality control, defect detection, and predictive maintenance in manufacturing environments',
    'Implemented safety management systems using computer vision for workplace monitoring, PPE detection, and compliance tracking',
    'Designed and deployed end-to-end AI pipelines, including data annotation, training (YOLO, CNN), and inference optimization using CUDA/cuDNN',
    'Built and deployed pilot models on Jetson and Raspberry Pi devices, integrating sensors and robotic arms for smart automation use cases',
    'Led cross-functional teams, managed project timelines, and mentored junior developers in AI/ML best practices and agile methodologies',
    'Integrated ML models into scalable APIs and ensured secure deployment with encryption, tamper protection, and device health monitoring',
    'Created remote monitoring and OTA update systems for large-scale edge device fleets',
  ], []);

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="absolute inset-0 ai-grid opacity-3"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/1 via-transparent to-ai-secondary/1"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              <span className="gradient-text">Professional Experience</span>
            </h2>
            <div className="h-0.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent mx-auto rounded-full"></div>
          </div>

          <div className="relative reveal">
            <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 hover-lift border-ai-primary/30">
              <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6 sm:mb-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-ai-primary via-ai-secondary to-ai-accent rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-ai-primary/30 animate-float">
                    <Briefcase size={24} className="sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                    Software Developer (Machine Learning)
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl gradient-text font-semibold mb-2 sm:mb-3">
                    Amvar Data Tech Pvt. Ltd.
                  </p>
                  <div className="flex items-center gap-2 text-slate-400 mb-3 sm:mb-4">
                    <Calendar size={16} className="sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">October 2024 - Present</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-ai-secondary mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 sm:h-5 bg-gradient-to-b from-ai-primary to-ai-secondary rounded-full"></span>
                  Key Achievements:
                </h4>
                <div className="grid gap-2 sm:gap-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex gap-2 sm:gap-3 group hover:bg-ai-primary/5 p-2 rounded-lg transition-all duration-300"
                      style={{ animationDelay: `${index * 0.02}s` }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ai-primary rounded-full group-hover:scale-150 group-hover:bg-ai-secondary transition-all duration-300 shadow-lg shadow-ai-primary/50"></div>
                      </div>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Experience);
