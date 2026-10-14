import { memo, useMemo } from 'react';
import { Briefcase, MapPin, Radar } from 'lucide-react';

/** Visible, semantic role targets — helps Google match hiring / role queries. */
function Roles() {
  const roles = useMemo(
    () => [
      {
        title: 'Machine Learning Engineer',
        blurb: 'End-to-end model development, evaluation, and production delivery.',
      },
      {
        title: 'Computer Vision Engineer',
        blurb: 'YOLO, OpenCV, face recognition, pose estimation, video analytics.',
      },
      {
        title: 'Edge AI Engineer',
        blurb: 'NVIDIA Jetson, TensorRT, ONNX, sub-200 ms on-device inference.',
      },
      {
        title: 'Generative AI / RAG Engineer',
        blurb: 'LLMs, LangChain, vector search, enterprise document assistants.',
      },
      {
        title: 'MLOps Engineer',
        blurb: 'Docker, CI/CD, MLflow, DVC, monitoring, secure OTA fleets.',
      },
      {
        title: 'Python / FastAPI Backend',
        blurb: 'APIs, async services, and AI product integrations.',
      },
    ],
    []
  );

  return (
    <section id="roles" className="section-shell py-14 sm:py-20 lg:py-24 relative" aria-labelledby="roles-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#07131f] to-slate-950" />
      <div className="absolute inset-0 ai-grid opacity-[0.045]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 reveal">
            <p className="section-eyebrow justify-center">
              <Radar size={14} className="text-amber-300" />
              Roles I fit
            </p>
            <h2 id="roles-heading" className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="gradient-text">Hiring for these roles?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-1">
              Looking for a <strong className="text-cyan-200 font-semibold">Machine Learning Engineer</strong>,{' '}
              <strong className="text-cyan-200 font-semibold">Computer Vision Engineer</strong>,{' '}
              <strong className="text-teal-200 font-semibold">Edge AI Engineer</strong>, or{' '}
              <strong className="text-amber-200 font-semibold">RAG / MLOps</strong> hire in{' '}
              <span className="inline-flex items-center gap-1 text-slate-200">
                <MapPin size={14} className="text-amber-300" /> Bengaluru
              </span>{' '}
              or remote? Review Jagath Charan&apos;s production track record below.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {roles.map((role, i) => (
              <article
                key={role.title}
                className="glass hover-lift rounded-xl sm:rounded-2xl p-4 sm:p-5 reveal border border-white/5 hover:border-cyan-400/25 relative overflow-hidden"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-amber-300 opacity-70" />
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/30 to-amber-400/20 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={16} className="text-cyan-200" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white leading-snug">
                      {role.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-[13px] mt-1.5 leading-relaxed">
                      {role.blurb}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 sm:mt-8 text-center text-[11px] sm:text-xs text-slate-500 reveal px-2">
            Search terms: Machine Learning Engineer Bengaluru · Computer Vision Engineer India · Edge AI Jetson · RAG Engineer · MLOps Engineer · hire Jagath Charan
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(Roles);
