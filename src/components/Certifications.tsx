import { Award, CheckCircle2 } from 'lucide-react';
import { memo, useMemo } from 'react';

function Certifications() {
  const certifications = useMemo(() => [
    {
      name: 'Completed the Gen AI Academy',
      provider: 'Google',
      skills: 'Vertex AI, Gemini API, Imagen, Streamlit, Multimodal RAG',
      gradient: 'from-ai-primary to-ai-secondary',
    },
    {
      name: 'Develop GenAI Apps with Gemini and Streamlit',
      provider: 'Google Skill Badge',
      skills: 'Gemini, Streamlit, GenAI Development',
      gradient: 'from-ai-secondary to-ai-accent',
    },
    {
      name: 'Explore Generative AI with Vertex AI Gemini API',
      provider: 'Google Skill Badge',
      skills: 'Vertex AI, Gemini API, GenAI',
      gradient: 'from-ai-accent to-ai-primary',
    },
    {
      name: 'Inspect Rich Documents with Gemini Multimodality',
      provider: 'Google Skill Badge',
      skills: 'Multimodal RAG, Document Analysis',
      gradient: 'from-ai-primary to-ai-accent',
    },
    {
      name: 'Build Real World AI Applications with Gemini and Imagen',
      provider: 'Google Skill Badge',
      skills: 'Gemini, Imagen, Production AI',
      gradient: 'from-ai-secondary to-ai-primary',
    },
    {
      name: 'Prompt Design in Vertex AI',
      provider: 'Google Skill Badge',
      skills: 'Prompt Engineering, Vertex AI',
      gradient: 'from-ai-accent to-ai-secondary',
    },
    {
      name: 'Machine Learning',
      provider: 'Andrew Ng, Coursera',
      skills: 'ML Fundamentals, Algorithms, Neural Networks',
      gradient: 'from-ai-primary to-ai-secondary',
    },
    {
      name: 'End-to-End MLOps Bootcamp',
      provider: 'Krish Naik, Udemy',
      skills: 'MLFlow, DVC, Docker, CI/CD, Airflow, SageMaker',
      gradient: 'from-ai-secondary to-ai-accent',
    },
    {
      name: 'The Complete Python Developer',
      provider: 'Udemy',
      skills: 'Python, Advanced Programming',
      gradient: 'from-ai-accent to-ai-primary',
    },
    {
      name: 'Practice Python by Solving 100 Coding Challenges',
      provider: 'Udemy',
      skills: 'Python, Problem Solving',
      gradient: 'from-ai-primary to-ai-accent',
    },
    {
      name: 'Blockchain',
      provider: 'Coursera',
      skills: 'Blockchain Fundamentals, Distributed Systems',
      gradient: 'from-ai-secondary to-ai-primary',
    },
  ], []);

  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 ai-grid opacity-3"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/1 via-transparent to-ai-secondary/1"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              <span className="gradient-text">Certifications & Learning</span>
            </h2>
            <div className="h-0.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 hover-lift group reveal"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="flex items-start gap-2.5 sm:gap-3 mb-3">
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${cert.gradient} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-ai-primary/30`}>
                    <Award size={18} className="sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:gradient-text transition-all duration-300 mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-ai-secondary font-semibold">
                      {cert.provider}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 size={12} className="text-ai-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300 leading-relaxed">
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
