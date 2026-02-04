import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Only update if scroll position changed significantly (reduce re-renders)
          if (Math.abs(currentScrollY - lastScrollY) > 5) {
            setIsScrolled(currentScrollY > 50);
            lastScrollY = currentScrollY;
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
    // Close mobile menu on resize - debounced
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 768) {
          setIsMobileMenuOpen(false);
        }
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
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-ai-darker/95 border-b border-ai-primary/30 shadow-lg shadow-ai-primary/10'
          : 'bg-transparent'
      }`}
      style={{ backdropFilter: isScrolled ? 'blur(8px)' : 'none', WebkitBackdropFilter: isScrolled ? 'blur(8px)' : 'none' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg sm:text-xl font-bold gradient-text hover:scale-105 transition-transform duration-200 relative group"
            style={{ willChange: 'transform' }}
          >
            <span className="relative z-10">JC</span>
          </a>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs lg:text-sm text-slate-300 hover:text-ai-primary transition-colors duration-200 font-medium relative group px-2 py-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 bg-ai-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </a>
            ))}
            <a
              href="/resume.pdf"
              download="Jagath_Charan_Resume.pdf"
              className="ml-2 px-3 py-1.5 bg-gradient-to-r from-ai-success to-emerald-600 text-white rounded-lg font-semibold text-xs hover:shadow-lg hover:shadow-ai-success/50 transition-transform duration-200 hover:scale-105 flex items-center gap-1.5"
              style={{ willChange: 'transform' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-ai-primary hover:text-ai-secondary transition-colors duration-200 p-2 hover:bg-ai-primary/10 rounded-lg"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={28} className="animate-scale-in" />
            ) : (
              <Menu size={28} className="animate-scale-in" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100 bg-ai-darker/98 border-t border-ai-primary/30'
            : 'max-h-0 opacity-0'
        }`}
        style={{ backdropFilter: isMobileMenuOpen ? 'blur(8px)' : 'none', WebkitBackdropFilter: isMobileMenuOpen ? 'blur(8px)' : 'none' }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 space-y-1.5">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-sm sm:text-base text-slate-300 hover:text-ai-primary hover:bg-ai-primary/10 transition-all duration-200 font-medium py-2.5 px-4 rounded-lg hover:translate-x-1"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download="Jagath_Charan_Resume.pdf"
            className="block text-sm sm:text-base text-white bg-gradient-to-r from-ai-success to-emerald-600 hover:from-emerald-600 hover:to-ai-success transition-colors duration-200 font-semibold py-2.5 px-4 rounded-lg flex items-center gap-2 mt-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navigation);
