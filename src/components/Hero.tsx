import { memo } from 'react';

interface HeroProps {
  onContactClick: () => void;
}

function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Professional subtle gradient backgrounds - optimized */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_50%)]"></div>
      
      {/* Subtle grid pattern overlay - reduced opacity */}
      <div className="absolute inset-0 ai-grid opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="space-y-3 sm:space-y-4 animate-fade-in-down">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              <span className="block gradient-text animate-fade-in">Vankayala</span>
              <span className="block gradient-text animate-fade-in" style={{ animationDelay: '0.1s' }}>Jagath</span>
              <span className="block text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>Charan</span>
            </h1>
            <div className="h-0.5 w-20 sm:w-24 md:w-32 bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent mx-auto rounded-full animate-scale-in" style={{ animationDelay: '0.4s' }}></div>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl gradient-text font-semibold animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Software Developer | Machine Learning Engineer
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Specializing in <span className="text-ai-primary font-semibold">AI & Machine Learning</span>, <span className="text-ai-secondary font-semibold">Computer Vision</span>, <span className="text-ai-accent font-semibold">Edge AI</span>, <span className="text-ai-primary font-semibold">RAG-based Applications</span>, and <span className="text-ai-secondary font-semibold">Real-time Video Analytics</span>.
            <br className="hidden sm:block" />
            <span className="block mt-2 sm:inline sm:mt-0 text-slate-300">Building intelligent systems that transform data into actionable insights for enterprise solutions.</span>
          </p>

          <div className="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 lg:pt-10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <a
              href="#contact"
              onClick={onContactClick}
              className="group relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-ai-primary/30 transition-transform duration-200 hover:scale-105 overflow-hidden w-full xs:w-auto"
              style={{ willChange: 'transform' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get In Touch
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-ai-accent via-ai-primary to-ai-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a
              href="/resume.pdf"
              download="Jagath_Charan_Resume.pdf"
              className="group px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-ai-success to-emerald-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-ai-success/30 transition-transform duration-200 hover:scale-105 w-full xs:w-auto text-center flex items-center justify-center gap-2"
              style={{ willChange: 'transform' }}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
            <a
              href="#projects"
              className="group px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 border-2 border-ai-primary text-ai-primary rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:bg-ai-primary/10 hover:border-ai-secondary hover:text-ai-secondary transition-all duration-200 hover:scale-105 w-full xs:w-auto text-center"
              style={{ willChange: 'transform' }}
            >
              View Projects
            </a>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xs text-ai-secondary font-medium">Scroll</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-ai-primary animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
