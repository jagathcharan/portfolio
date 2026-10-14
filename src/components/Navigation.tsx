import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { RESUME_FILENAME, RESUME_PDF } from '../utils/resume';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (Math.abs(window.scrollY - lastScrollY) > 5) {
            setIsScrolled(window.scrollY > 40);
            lastScrollY = window.scrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', short: 'Projects', href: '#projects' },
    { name: 'Certifications', short: 'Certs', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5'
          : 'bg-transparent'
      }`}
      style={{ backdropFilter: isScrolled ? 'blur(14px)' : 'none', WebkitBackdropFilter: isScrolled ? 'blur(14px)' : 'none' }}
    >
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-base sm:text-lg lg:text-xl font-bold gradient-text shrink-0 tracking-tight"
          >
            Jagath Charan
          </a>

          <div className="hidden md:flex items-center gap-0.5 lg:gap-1 xl:gap-2 min-w-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-[11px] lg:text-xs xl:text-sm text-slate-300 hover:text-cyan-300 transition-colors duration-200 font-medium relative group px-1.5 lg:px-2.5 py-1.5 whitespace-nowrap"
              >
                <span className="lg:hidden">{link.short ?? link.name}</span>
                <span className="hidden lg:inline">{link.name}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-teal-400 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </a>
            ))}
            <a
              href={RESUME_PDF}
              download={RESUME_FILENAME}
              className="ml-1 lg:ml-2 px-2.5 lg:px-3 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-lg font-semibold text-[11px] lg:text-xs hover:shadow-lg hover:shadow-cyan-500/30 transition-transform duration-200 hover:scale-105 flex items-center gap-1 shrink-0"
            >
              Resume
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-cyan-400 hover:text-cyan-300 p-2 hover:bg-cyan-500/10 rounded-lg"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'max-h-[28rem] opacity-100 bg-slate-950/98 border-t border-cyan-500/20'
            : 'max-h-0 opacity-0'
        }`}
        style={{ backdropFilter: isMobileMenuOpen ? 'blur(14px)' : 'none' }}
      >
        <div className="container mx-auto px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-sm text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 font-medium py-2.5 px-4 rounded-xl"
            >
              {link.name === 'Projects' ? 'Personal Projects' : link.name}
            </a>
          ))}
          <a
            href={RESUME_PDF}
            download={RESUME_FILENAME}
            className="block text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-500 font-semibold py-2.5 px-4 rounded-xl mt-2 text-center"
          >
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navigation);
