import { Github, Linkedin, Mail } from 'lucide-react';
import { memo } from 'react';
import { EMAIL, buildMailto, buildWhatsAppSendUrl } from '../utils/contact';

function Footer() {
  const hello = {
    name: 'Portfolio visitor',
    email: '',
    message: 'Hello Jagath, I found your portfolio and would like to connect.',
  };

  return (
    <footer className="bg-slate-950 border-t border-sky-500/20 py-8 sm:py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-sky-500/5 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
          <p className="font-display text-lg sm:text-xl font-bold gradient-text">
            Vankayala Jagath Charan
          </p>
          <p className="text-slate-400 text-xs sm:text-sm text-center max-w-md">
            Machine Learning Engineer · Computer Vision &amp; Edge AI · RAG · MLOps
          </p>
          <div className="flex items-center gap-3">
            <a href={buildMailto(hello)} className="p-2 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href={buildWhatsAppSendUrl(hello)} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors text-sm font-semibold" aria-label="WhatsApp">
              WA
            </a>
            <a href="https://github.com/jagathcharan" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/jagathcharan2004/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
          <p className="text-slate-500 text-xs text-center">
            © {new Date().getFullYear()} · {EMAIL}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
