import { memo, type SVGProps } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { RESUME_FILENAME, RESUME_PDF } from '../utils/resume';
import { EMAIL, PHONE_TEL, buildMailto, buildWhatsAppSendUrl, WHATSAPP_URL } from '../utils/contact';

function WhatsAppIcon({ size = 14, className, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M17.472 14.382c-.297-.139-1.688-.867-1.948-.967-.261-.1-.45-.149-.64.149-.19.297-.73.967-.896 1.164-.164.198-.33.223-.608.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.688-.69 1.927-1.356.238-.666.238-1.237.167-1.356-.072-.119-.27-.198-.568-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface HeroProps {
  onContactClick: () => void;
}

function Hero({ onContactClick }: HeroProps) {
  const quickHello = {
    name: 'Portfolio visitor',
    email: '',
    message: 'Hello Jagath, I found your portfolio and would like to connect.',
  };

  const links = [
    { href: buildMailto(quickHello), icon: Mail, label: 'Email' },
    { href: `tel:${PHONE_TEL}`, icon: Phone, label: 'Phone' },
    { href: buildWhatsAppSendUrl(quickHello), icon: WhatsAppIcon, label: 'WhatsApp' },
    { href: 'https://www.linkedin.com/in/jagathcharan2004/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://github.com/jagathcharan', icon: Github, label: 'GitHub' },
    { href: 'https://jagathcharan.github.io/portfolio/', icon: MapPin, label: 'Portfolio' },
  ];

  const roleTags = [
    'ML Engineer',
    'Computer Vision',
    'Edge AI',
    'RAG / GenAI',
    'MLOps',
    'FastAPI',
  ];

  return (
    <section className="min-h-[100svh] flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,191,36,0.08),transparent_45%)]" />
      <div className="absolute inset-0 ai-grid opacity-[0.07]" />
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-sky-400/15 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-teal-400/12 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-7">
          <div className="animate-fade-in-down">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to hire · Bengaluru / Remote
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4 animate-fade-in-down" style={{ animationDelay: '0.05s' }}>
            <h1 className="font-display text-[2.35rem] leading-[1.05] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.1rem] font-extrabold tracking-tight">
              <span className="block gradient-text-animated">Vankayala</span>
              <span className="block text-white">Jagath Charan</span>
            </h1>
            <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-sky-400 via-cyan-400 to-amber-300 mx-auto rounded-full animate-scale-in" />
          </div>

          <h2 className="font-display text-[13px] sm:text-base md:text-lg lg:text-xl text-cyan-100/95 font-semibold animate-fade-in-up px-1 leading-relaxed tracking-wide" style={{ animationDelay: '0.15s' }}>
            Machine Learning Engineer · Computer Vision &amp; Edge AI · Generative AI (RAG) · Python Backend · MLOps
          </h2>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 animate-fade-in-up px-1" style={{ animationDelay: '0.2s' }}>
            {roleTags.map((tag, i) => (
              <span
                key={tag}
                className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold border ${
                  i % 3 === 0
                    ? 'bg-sky-500/10 text-sky-200 border-sky-400/25'
                    : i % 3 === 1
                      ? 'bg-teal-500/10 text-teal-200 border-teal-400/25'
                      : 'bg-amber-500/10 text-amber-100 border-amber-400/25'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed px-1 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            17+ months shipping production AI — real-time vision, RAG, FastAPI products, and secure edge deployments for 50+ enterprise clients under 200&nbsp;ms latency.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm text-slate-300 bg-white/5 border border-white/10 hover:border-sky-400/40 hover:text-sky-300 hover:bg-sky-500/10 transition-all duration-200"
                aria-label={label}
              >
                <Icon size={14} className={label === 'WhatsApp' ? 'text-[#25D366]' : 'text-sky-400'} />
                <span className="hidden xs:inline">{label}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <a
              href="#contact"
              onClick={onContactClick}
              className="group relative px-6 sm:px-8 py-3.5 min-h-[44px] bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-transform duration-200 hover:scale-[1.03] overflow-hidden w-full xs:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get In Touch
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href={buildWhatsAppSendUrl(quickHello)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3.5 min-h-[44px] bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.03] w-full xs:w-auto text-center flex items-center justify-center gap-2"
            >
              <WhatsAppIcon size={16} />
              WhatsApp
            </a>
            <a
              href={RESUME_PDF}
              download={RESUME_FILENAME}
              className="px-6 sm:px-8 py-3.5 min-h-[44px] border border-amber-300/40 text-amber-100 rounded-xl font-semibold text-sm hover:bg-amber-400/10 hover:border-amber-200/60 transition-all duration-200 hover:scale-[1.03] w-full xs:w-auto text-center flex items-center justify-center gap-2"
            >
              Download Resume
            </a>
          </div>
          <p className="text-[11px] text-slate-500 animate-fade-in-up px-2" style={{ animationDelay: '0.55s' }}>
            Prefer email?{' '}
            <a href={buildMailto(quickHello)} className="text-cyan-300 hover:text-cyan-200 underline-offset-2 hover:underline break-all">
              {EMAIL}
            </a>
            {' · '}
            <a href="#roles" className="text-amber-200/90 hover:text-amber-100 underline-offset-2 hover:underline">
              Roles I fit
            </a>
            {' · '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 underline-offset-2 hover:underline">
              WhatsApp
            </a>
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:flex">
        <div className="flex flex-col items-center gap-1.5 opacity-70">
          <span className="text-[10px] uppercase tracking-widest text-cyan-300/80 font-medium">Scroll</span>
          <svg className="w-4 h-4 text-cyan-300 animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
