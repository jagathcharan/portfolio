import { useEffect, lazy, Suspense, useCallback } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Roles from './components/Roles';

const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingResumeButton = lazy(() => import('./components/FloatingResumeButton'));
const AIChat = lazy(() => import('./components/AIChat'));

function App() {
  useEffect(() => {
    document.title =
      'Vankayala Jagath Charan | Machine Learning Engineer · Computer Vision · Edge AI · RAG · MLOps | Bengaluru';
    
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    const observed = new WeakSet<Element>();
    const observeReveals = () => {
      document.querySelectorAll('.reveal:not(.active)').forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        observer.observe(el);
      });
    };

    observeReveals();

    const mutationObserver = new MutationObserver(() => {
      observeReveals();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
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
    <div className="min-h-screen bg-[#050b14] relative overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/4 w-72 sm:w-[28rem] h-72 sm:h-[28rem] bg-sky-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-teal-400/12 rounded-full blur-3xl" />
        <div className="absolute top-[60%] left-[10%] w-64 h-64 bg-amber-400/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 ai-grid opacity-[0.045]" />
      </div>
      
      <Navigation />
      <main>
        <Hero onContactClick={handleContactClick} />
        <About />
        <Roles />
        <Suspense fallback={null}>
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <FloatingResumeButton />
        <AIChat />
      </Suspense>
    </div>
  );
}

export default App;
