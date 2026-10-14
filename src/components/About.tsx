import { Brain, Code2, Cpu, Database, Cloud, Shield } from 'lucide-react';
import { memo, useMemo } from 'react';

function About() {
  const domains = useMemo(() => [
    { icon: Brain, name: 'AI/ML Engineering', color: 'text-ai-primary', bgGradient: 'from-ai-primary/20 to-ai-primary/5', description: 'Computer vision, NLP, generative AI & RAG' },
    { icon: Code2, name: 'System Architecture', color: 'text-ai-secondary', bgGradient: 'from-ai-secondary/20 to-ai-secondary/5', description: 'Microservices, APIs & edge-to-cloud design' },
    { icon: Database, name: 'Data Engineering', color: 'text-ai-accent', bgGradient: 'from-ai-accent/20 to-ai-accent/5', description: 'SQL, Databricks, ETL & AWS S3 migrations' },
    { icon: Shield, name: 'Security', color: 'text-ai-primary', bgGradient: 'from-ai-primary/20 to-ai-primary/5', description: 'E2E encryption, tamper protection & fleet security' },
    { icon: Cpu, name: 'Edge Computing', color: 'text-ai-secondary', bgGradient: 'from-ai-secondary/20 to-ai-secondary/5', description: 'NVIDIA Jetson, Raspberry Pi & CUDA optimization' },
    { icon: Cloud, name: 'MLOps & DevOps', color: 'text-ai-accent', bgGradient: 'from-ai-accent/20 to-ai-accent/5', description: 'MLflow, DVC, Docker & GitHub Actions CI/CD' },
  ], []);

  const iconSize = useMemo(() => ({
    base: 28,
    sm: 32,
    lg: 40,
    xl: 48,
  }), []);

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 ai-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 via-transparent to-ai-secondary/10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 reveal">
            <p className="section-eyebrow justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Profile
            </p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 mx-auto rounded-full" />
            <p className="mt-5 max-w-3xl mx-auto text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed px-1">
              Machine Learning Engineer with 17+ months of startup experience building and deploying production AI products across computer vision, Edge AI, RAG, Python backends, and MLOps.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-8 sm:space-y-10 reveal">
              <div className="glass hover-lift rounded-xl sm:rounded-2xl p-5 sm:p-6 group border border-white/10">
                <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Owns the full lifecycle from requirements to deployment, monitoring, and customer support — models, FastAPI services, React front ends, data pipelines, CI/CD, and secure edge architecture.
                </p>
                <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed mt-4">
                  Architected a flagship <span className="text-sky-300 font-semibold">Edge AI Server</span> platform with real-time detection, pose estimation, facial recognition, and audio events — serving <span className="text-sky-300 font-semibold">50+ enterprise clients</span> under 200&nbsp;ms latency across retail, industrial safety, and residential security.
                </p>
                <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed mt-4">
                  Depth in <span className="text-sky-300 font-semibold">computer vision</span>, generative AI (RAG), video streaming, TensorRT optimization, and MLOps (Docker, MLflow, DVC), plus mentoring, technical interviewing, and client demos.
                </p>
              </div>
              <div className="glass hover-lift rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-sky-500/20">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-sky-400 to-indigo-500 rounded-full"></span>
                  Education
                </h3>
                <div className="space-y-1.5">
                  <p className="text-sky-300 font-semibold text-base">Bachelor of Technology (B.Tech), Computer Science and Engineering</p>
                  <p className="text-slate-400 text-sm">M S Ramaiah University of Applied Sciences, Bengaluru</p>
                  <p className="text-slate-500 text-xs">2021 – 2025</p>
                  <ul className="list-disc list-inside text-slate-400 text-xs mt-2 ml-2 space-y-1">
                    <li>Relevant Coursework: Machine Learning, Deep Learning, Computer Vision, Data Structures, Algorithms, Database Systems</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4 reveal">
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-5 text-center lg:text-left">
                <span className="gradient-text">Core Expertise</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
                {domains.map((domain, index) => (
                  <div
                    key={domain.name}
                    className="glass hover-lift rounded-xl p-5 group border border-white/5 hover:border-sky-500/30 relative overflow-hidden"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4">
                      <div className={`relative ${domain.color} flex items-center justify-center`}>
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
                        <span className="font-display block text-base sm:text-lg font-semibold text-white group-hover:text-sky-300 transition-colors duration-300">
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
