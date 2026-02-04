import { Download } from 'lucide-react';
import { useState, useEffect, memo } from 'react';

function FloatingResumeButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Only update if visibility should change
          const shouldBeVisible = currentScrollY > 100;
          if (shouldBeVisible !== isVisible || Math.abs(currentScrollY - lastScrollY) > 50) {
            setIsVisible(shouldBeVisible);
            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <a
      href="/resume.pdf"
      download="Jagath_Charan_Resume.pdf"
      className="fixed bottom-6 right-28 sm:right-32 z-40 bg-gradient-to-r from-ai-success to-emerald-600 text-white p-3 rounded-full shadow-2xl shadow-ai-success/50 hover:shadow-ai-success/70 transition-all duration-300 hover:scale-110 animate-float group"
      aria-label="Download Resume"
    >
      <Download size={20} className="group-hover:scale-110 transition-transform" />
      <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
    </a>
  );
}

export default memo(FloatingResumeButton);
