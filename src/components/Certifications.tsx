import { Award, CheckCircle2 } from 'lucide-react';
import { memo, useMemo } from 'react';

function Certifications() {
  const certifications = useMemo(() => [
    {
      name: 'Google Gen AI Academy',
      provider: 'Google',
      skills: 'Vertex AI, Gemini API, Imagen, Streamlit, Multimodal RAG',
      gradient: 'from-ai-primary to-ai-secondary',
    },
    {
      name: 'End-to-End MLOps Bootcamp',
      provider: 'Krish Naik, Udemy',
      skills: 'MLflow, DVC, Docker, Airflow, SageMaker, Hugging Face',
      gradient: 'from-ai-secondary to-ai-accent',
    },
    {
      name: 'Machine Learning Specialization',
      provider: 'Andrew Ng, Coursera',
      skills: 'Supervised & Unsupervised Learning, Neural Networks',
      gradient: 'from-ai-accent to-ai-primary',
    },
    {
      name: 'Advanced Python Development',
      provider: 'Udemy',
      skills: '100 Coding Challenges, Complete Python Developer',
      gradient: 'from-ai-primary to-ai-accent',
    },
    {
      name: 'Blockchain Technology',
      provider: 'Coursera',
      skills: 'Distributed Systems, Smart Contracts',
      gradient: 'from-ai-secondary to-ai-primary',
    },
    {
      name: 'Gemini & Streamlit Apps',
      provider: 'Google Cloud Skill Badge',
      skills: 'Gemini, Streamlit, GenAI Development',
      gradient: 'from-ai-accent to-ai-secondary',
    },
    {
      name: 'Vertex AI & Multimodal RAG',
      provider: 'Google Cloud Skill Badge',
      skills: 'Vertex AI, Multimodal RAG, Document Analysis',
      gradient: 'from-ai-primary to-ai-secondary',
    },
    {
      name: 'Imagen & Prompt Design',
      provider: 'Google Cloud Skill Badge',
      skills: 'Imagen, Prompt Engineering, Vertex AI',
      gradient: 'from-ai-secondary to-ai-accent',
    },
  ], []);

  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 ai-grid opacity-[0.04]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 reveal">
            <p className="section-eyebrow justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Credentials
            </p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="gradient-text">Certifications & Learning</span>
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="glass hover-lift rounded-xl sm:rounded-2xl p-4 sm:p-5 group reveal relative overflow-hidden"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${cert.gradient} opacity-60`} />
                <div className="flex items-start gap-3 mb-3">
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br ${cert.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20`}>
                    <Award size={18} className="text-white" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-sky-400 font-semibold">
                      {cert.provider}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 size={12} className="text-sky-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {cert.skills}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Certifications);
