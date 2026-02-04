import { Brain, Code2, Cpu, Database, Cloud } from 'lucide-react';
import { memo, useMemo } from 'react';

function About() {
  const domains = useMemo(() => [
    { icon: Brain, name: 'Computer Vision', color: 'text-ai-primary', bgGradient: 'from-ai-primary/20 to-ai-primary/5', description: "Building smart visual perception systems" },
    { icon: Cpu, name: 'Edge AI', color: 'text-ai-secondary', bgGradient: 'from-ai-secondary/20 to-ai-secondary/5', description: "Deploying intelligence at the device edge" },
    { icon: Code2, name: 'MLOps', color: 'text-ai-accent', bgGradient: 'from-ai-accent/20 to-ai-accent/5', description: "End-to-end ML pipeline automation" },
    { icon: Database, name: 'Data Engineering', color: 'text-ai-primary', bgGradient: 'from-ai-primary/20 to-ai-primary/5', description: "Scalable ETL and distributed data systems" },
    { icon: Cloud, name: 'Generative AI', color: 'text-ai-secondary', bgGradient: 'from-ai-secondary/20 to-ai-secondary/5', description: "LLMs & creative AI-powered solutions" },
    { icon: Cloud, name: 'RAG Application', color: 'text-ai-accent', bgGradient: 'from-ai-accent/20 to-ai-accent/5', description: "Retrieval augmented generation for context-aware bots" },
    { icon: Cpu, name: 'Networking', color: 'text-ai-primary', bgGradient: 'from-ai-primary/20 to-ai-primary/5', description: "Smart, reliable, and secure connectivity" },
    { icon: Database, name: 'Media Engineering', color: 'text-ai-secondary', bgGradient: 'from-ai-secondary/20 to-ai-secondary/5', description: "Optimizing media processing workflows" },
  ], []);

  // Calculate responsive icon sizes for each domain grid card
  const iconSize = useMemo(() => ({
    base: 28,
    sm: 32,
    lg: 40,
    xl: 48,
  }), []);

  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="absolute inset-0 ai-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 via-transparent to-ai-secondary/10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 reveal">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <div className="h-1 w-20 sm:w-24 md:w-32 bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent mx-auto rounded-full" />
            <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg md:text-xl font-medium">
              Bridging ideas and technology to deliver innovative AI solutions for real-world impact.<br />
              My expertise spans Generative AI, Retrieval Augmented Generation (RAG) applications, computer vision, MLOps, media engineering, edge intelligence, and large-scale data engineering.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* About and Education */}
            <div className="space-y-8 sm:space-y-10 reveal">
              {/* Smaller About Card */}
              <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-6 hover-lift group transition-transform duration-200 border border-ai-primary/10 shadow-lg">
                <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed">
                  I’m a passionate <span className="text-ai-primary font-semibold">AI developer & lifelong learner</span> specializing in building robust, scalable, and intelligent applications.<br /><br />
                  I have hands-on experience across the AI spectrum, from <span className="text-ai-secondary font-semibold">Computer Vision</span> and <span className="text-ai-accent font-semibold">Natural Language Processing</span> to deploying ML models in production. My toolkit includes Python, Scikit-learn, TensorFlow, PyTorch, OpenCV, NLTK and a flair for architecting clean, maintainable solutions.<br /><br />
                  <span className="text-ai-accent font-semibold">Generative AI</span> and <span className="text-ai-accent font-semibold">RAG Applications</span> are among my core strengths—enabling context-aware bots and creative, AI-powered problem solving. I've also worked on media engineering for workflow optimization, scalable distributed data systems, and deploying AI models to both cloud and edge environments.
                </p>
                <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed mt-4">
                  I champion clear communication, problem-solving, and collaboration in driving results on high-impact projects—delivering production-grade AI systems for enterprise clients and interdisciplinary teams.
                </p>
              </div>
              {/* Smaller Education Card */}
              <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-6 hover-lift border-ai-secondary/30 shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-ai-primary to-ai-secondary rounded-full"></span>
                  Education
                </h3>
                <div className="space-y-1.5">
                  <p className="text-ai-primary font-semibold text-base">Bachelor of Technology in Computer Science</p>
                  <p className="text-slate-400 text-sm">M S Ramaiah University of Applied Sciences</p>
                  <p className="text-slate-500 text-xs">2021 - 2025 | Bengaluru, India</p>
                  <ul className="list-disc list-inside text-slate-400 text-xs mt-1.5 ml-2">
                    <li>GPA: <span className="text-ai-accent font-semibold">8.96 / 10</span></li>
                    <li>Research: Computer Vision, Deep Learning</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Core Expertise */}
            <div className="space-y-4 reveal">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-5 text-center lg:text-left">
                <span className="gradient-text">Core Expertise</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
                {domains.map((domain, index) => (
                  <div
                    key={domain.name}
                    className="glass rounded-xl p-5 hover-lift group border border-slate-800 hover:border-ai-primary/40 transition-all duration-300 relative overflow-hidden"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`relative ${domain.color} flex items-center justify-center`}>
                        {/* Responsive icon sizing arrangement */}
                        <span className="block">
                          <domain.icon
                            size={iconSize.base}
                            className="
                              w-7 h-7
                              sm:w-8 sm:h-8
                              lg:w-10 lg:h-10
                              xl:w-12 xl:h-12
                              drop-shadow-md
                            "
                          />
                        </span>
                        <div className={`absolute inset-0 bg-gradient-to-br ${domain.bgGradient} rounded-lg blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10`} />
                      </div>
                      <div>
                        <span className="block text-base sm:text-lg font-semibold text-white group-hover:gradient-text transition-all duration-300">
                          {domain.name}
                        </span>
                        <span className="block text-xs text-slate-400 mt-0.5">{domain.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(About);
