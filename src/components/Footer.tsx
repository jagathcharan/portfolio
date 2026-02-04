import { Heart } from 'lucide-react';
import { memo } from 'react';

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-ai-primary/20 py-8 sm:py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-ai-primary/3 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
          <p className="text-slate-400 text-center flex items-center gap-1.5 text-xs sm:text-sm">
            Built with <Heart size={14} className="text-ai-primary fill-ai-primary animate-pulse" /> by 
            <span className="gradient-text font-semibold">Vankayala Jagath Charan</span>
          </p>
          <p className="text-slate-500 text-xs text-center">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 bg-ai-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-600">AI Developer Portfolio</span>
            <div className="w-1.5 h-1.5 bg-ai-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
