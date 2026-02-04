import { useEffect, lazy, Suspense, useCallback } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';

// Lazy load heavy components for better initial load
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingResumeButton = lazy(() => import('./components/FloatingResumeButton'));
const AIChat = lazy(() => import('./components/AIChat'));

function App() {
  useEffect(() => {
    document.title = 'Vankayala Jagath Charan | ML Engineer & AI Developer';
    
    // Scroll to top on page load/reload
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Prevent browser from restoring scroll position on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Optimized scroll reveal animation with single observer
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after animation to reduce overhead
            observer.unobserve(entry.target);
          }
        });
      });
    }, observerOptions);

    // Use setTimeout to defer DOM query until after initial render
    const timeoutId = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleContactClick = useCallback(() => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-x-hidden">
      {/* Professional subtle background elements - optimized with GPU acceleration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'auto', transform: 'translateZ(0)' }}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ai-primary/3 rounded-full blur-2xl opacity-50" style={{ willChange: 'auto' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ai-secondary/3 rounded-full blur-2xl opacity-50" style={{ willChange: 'auto' }}></div>
      </div>
      
      <Navigation />
      <Hero onContactClick={handleContactClick} />
      <About />
      <Suspense fallback={null}>
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
        <FloatingResumeButton />
        <AIChat />
      </Suspense>
    </div>
  );
}

export default App;
