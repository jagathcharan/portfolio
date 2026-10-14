import {
  Briefcase,
  Calendar,
  Cpu,
  Database,
  ExternalLink,
  MapPin,
  Network,
  Shield,
  Sparkles,
} from 'lucide-react';
import { memo, useMemo, useState } from 'react';

function Experience() {
  const [active, setActive] = useState(0);

  const stats = useMemo(
    () => [
      { value: '50+', label: 'Enterprise clients' },
      { value: '200+', label: 'Edge devices' },
      { value: '10+', label: 'Developers mentored' },
      { value: '98.5%', label: 'Face-recog accuracy' },
      { value: '3', label: 'Industry sectors' },
      { value: '15%', label: 'Ahead of schedule' },
    ],
    []
  );

  const sectors = useMemo(
    () => ['Retail AI', 'Industrial Safety', 'Residential Security'],
    []
  );

  const sections = useMemo(
    () => [
      {
        title: 'System Design & Leadership',
        short: 'Leadership',
        icon: Network,
        accent: 'from-sky-500 to-blue-600',
        ring: 'ring-sky-400/40',
        items: [
          'Defined the system design and software architecture for a flagship Edge AI Server platform, structuring modular pipelines for real-time object detection, pose estimation, facial recognition, and audio event detection, now serving 50+ enterprise clients.',
          'Led technical hiring for engineering roles, conducting 15+ technical interviews and contributing to team expansion.',
          'Managed and mentored a team of 10+ developers, establishing code review processes and technical training programs.',
          'Drove project planning and sprint execution using Agile methodologies, consistently delivering milestones 15% ahead of schedule.',
          'Served as corporate representative at India Electronics Expo (IEE) and IndiaSoft 2026, presenting product capabilities to 500+ industry stakeholders.',
          'Conducted 20+ technical sales demonstrations and client training sessions, converting prospects into enterprise customers.',
          'Earned multiple performance-based salary increments within 17 months for consistent delivery and leadership contributions.',
        ],
      },
      {
        title: 'Data Engineering & Migration',
        short: 'Data',
        icon: Database,
        accent: 'from-cyan-500 to-sky-600',
        ring: 'ring-cyan-400/40',
        items: [
          'Performed data analysis and end-to-end data migration across SQL databases, Databricks, and AWS S3, supporting enterprise data pipelines feeding downstream AI and analytics systems.',
          'Designed and maintained ETL pipelines (AWS S3 to MySQL) with Airflow DAG scheduling, structuring raw data for analysis and reporting.',
          'Built Power BI dashboards translating migrated and analyzed data into business-facing reporting for sales and operations stakeholders.',
        ],
      },
      {
        title: 'Software & Applications',
        short: 'Software',
        icon: Cpu,
        accent: 'from-blue-500 to-indigo-600',
        ring: 'ring-blue-400/40',
        items: [
          'Built backend services and REST APIs (FastAPI) powering production AI applications, including a RAG knowledge assistant and a real-time voice assistant.',
          'Built modular AI applications across 3 deployment sectors: Retail (customer analytics, theft prevention), Industrial Safety (PPE detection, hazard monitoring), and Residential Security (intrusion detection, visitor management).',
          'Built a secure, cloud-independent remote-access system for on-premise servers, removing public IP exposure across 50+ client deployments.',
          'Created custom annotation tools and automated dataset generation workflows, cutting data preparation time by 60%.',
        ],
      },
      {
        title: 'Security & Deployment',
        short: 'Security',
        icon: Shield,
        accent: 'from-indigo-500 to-violet-600',
        ring: 'ring-indigo-400/40',
        items: [
          'Built CI/CD pipelines using GitHub Actions and Docker, automating testing, model versioning, and deployment validation for every release.',
          'Built a secure deployment framework with end-to-end encryption, tamper protection, and real-time health monitoring across 200+ edge devices.',
          'Implemented security protocols to protect source code and model weights from reverse engineering and unauthorized access.',
          'Delivered an OTA (Over-the-Air) update system enabling zero-downtime model deployment and configuration rollouts across the full 200+ device fleet.',
          'Established MLOps workflows with MLflow and DVC, improving model iteration velocity by 50%.',
        ],
      },
      {
        title: 'AI/ML & Video Systems',
        short: 'AI/ML',
        icon: Sparkles,
        accent: 'from-violet-500 to-fuchsia-600',
        ring: 'ring-violet-400/40',
        items: [
          'Developed an offline CNN face recognition system with 98.5% accuracy on custom video-derived datasets; TensorRT FP16 quantization delivered 30 FPS on Jetson Nano.',
          'Built a production-grade Retrieval-Augmented Generation (RAG) application for enterprise knowledge management, deployed offline across 2 specialized domains (legal, technical) with multilingual support.',
          'Engineered a low-latency video streaming pipeline using FFmpeg (H.264/H.265) across RTSP, WebRTC, FLV, and HTTPS protocols with sub-200ms end-to-end latency.',
          'Optimized inference pipelines using CUDA, cuDNN, TensorRT, and ONNX Runtime, achieving 35% latency reduction and 40% throughput improvement.',
          'Deployed models across 2 edge hardware platforms (NVIDIA Jetson, Raspberry Pi) with sensor integration and robotic-arm control for automated inspection systems.',
        ],
      },
    ],
    []
  );

  const current = sections[active];
  const CurrentIcon = current.icon;

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0a1224] to-slate-950" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[min(1000px,100%)] h-72 bg-sky-500/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/15 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 neural-pattern opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 reveal">
            <p className="section-eyebrow justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Career
            </p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="gradient-text">Professional Experience</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              Edge AI platforms · secure architecture · production delivery
            </p>
          </div>

          {/* Company highlight — split layout */}
          <div className="reveal mb-10 sm:mb-12">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-sky-500/25 bg-slate-900/60 shadow-2xl shadow-sky-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left: role */}
                <div className="relative p-5 sm:p-7 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/40 ring-2 ring-sky-400/20">
                        <Briefcase size={22} className="text-white" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          Current role
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          Highlight
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold gradient-text leading-tight">
                      Amvar Data Tech Pvt. Ltd.
                    </h3>
                    <p className="text-white text-base sm:text-lg font-semibold mt-2">
                      Software Developer – Machine Learning
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-slate-400 text-xs sm:text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} className="text-sky-400" />
                        Oct 2024 – Present
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} className="text-sky-400" />
                        Bengaluru, India
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {sectors.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium bg-slate-950/70 text-sky-200 border border-sky-500/20"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 mt-6">
                    {stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl bg-slate-950/70 border border-white/8 px-2.5 py-2.5 sm:py-3 text-center hover:border-sky-400/40 hover:bg-sky-500/5 transition-all duration-200"
                      >
                        <div className="font-display text-base sm:text-xl text-white font-bold tracking-tight">
                          {s.value}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 leading-snug">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: expo */}
                <a
                  href="https://visionbot.com/india-expo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative min-h-[200px] sm:min-h-[260px] lg:min-h-full block overflow-hidden"
                >
                  <img
                    src="https://visionbot.com/wp-content/uploads/2026/03/visionbot-expo2026-1-1024x458.jpg"
                    alt="India Electronics Expo 2026 — Amvar Data Tech / VisionBot"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent lg:from-slate-950/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <span className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-sky-500/30 text-sky-100 border border-sky-300/30 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
                      Summit highlight
                    </span>
                    <p className="font-display text-white font-bold text-base sm:text-xl leading-snug">
                      India Electronics Expo &amp; IndiaSoft 2026
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-md">
                      Presented Edge AI capabilities to 500+ industry stakeholders
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sky-200 text-xs sm:text-sm font-semibold group-hover:text-white transition-colors">
                      View expo gallery
                      <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Focus areas — tabs + panel */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="h-px flex-grow bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
              <p className="font-display text-[11px] sm:text-xs uppercase tracking-[0.2em] text-sky-400 font-semibold shrink-0">
                Impact by focus area
              </p>
              <div className="h-px flex-grow bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
            </div>

            {/* Tab bar — scroll on mobile */}
            <div className="relative mb-4 sm:mb-5">
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin snap-x snap-mandatory">
                {sections.map((section, idx) => {
                  const Icon = section.icon;
                  const selected = active === idx;
                  return (
                    <button
                      key={section.short}
                      type="button"
                      onClick={() => setActive(idx)}
                      className={`snap-start shrink-0 inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                        selected
                          ? `bg-gradient-to-r ${section.accent} text-white border-transparent shadow-lg shadow-sky-500/25 ring-2 ${section.ring}`
                          : 'bg-slate-900/60 text-slate-400 border-white/10 hover:border-sky-500/30 hover:text-sky-300'
                      }`}
                    >
                      <Icon size={14} className={selected ? 'text-white' : 'text-sky-400/80'} />
                      <span className="sm:hidden">{section.short}</span>
                      <span className="hidden sm:inline">{section.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content panel */}
            <div
              key={active}
              className="rounded-2xl sm:rounded-3xl border border-sky-500/20 bg-slate-900/70 overflow-hidden shadow-xl shadow-sky-500/5 animate-fade-in"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${current.accent}`} />
              <div className="p-4 sm:p-6 lg:p-7">
                <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div
                    className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${current.accent} flex items-center justify-center shadow-lg`}
                  >
                    <CurrentIcon size={20} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-sky-400/80 mb-1">
                      Focus {String(active + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
                    </p>
                    <h4 className="font-display text-base sm:text-xl md:text-2xl font-bold text-white leading-snug">
                      {current.title}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      {current.items.length} key achievements
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                  {current.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-950/50 border border-white/5 hover:border-sky-500/25 hover:bg-sky-500/[0.04] transition-all duration-200"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <span
                        className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-lg bg-gradient-to-br ${current.accent} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}
                      >
                        {index + 1}
                      </span>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-0.5">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Experience);
