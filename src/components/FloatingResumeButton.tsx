import { Download, Mail } from 'lucide-react';
import { useState, useEffect, memo, type SVGProps } from 'react';
import { RESUME_FILENAME, RESUME_PDF } from '../utils/resume';
import { buildMailto, buildWhatsAppSendUrl } from '../utils/contact';

function WhatsAppIcon({ size = 20 }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="group-hover:scale-110 transition-transform"
    >
      <path d="M17.472 14.382c-.297-.139-1.688-.867-1.948-.967-.261-.1-.45-.149-.64.149-.19.297-.73.967-.896 1.164-.164.198-.33.223-.608.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.688-.69 1.927-1.356.238-.666.238-1.237.167-1.356-.072-.119-.27-.198-.568-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const quickMessage = {
  name: 'Portfolio visitor',
  email: '',
  message: 'Hello Jagath, I found your portfolio and would like to connect.',
};

const btn =
  'inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white shadow-lg transition-transform duration-200 active:scale-95 hover:scale-105';

function FloatingResumeButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onChat = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setChatOpen(Boolean(detail?.open));
    };
    window.addEventListener('portfolio-chat-open', onChat);
    return () => window.removeEventListener('portfolio-chat-open', onChat);
  }, []);

  if (!isVisible || chatOpen) return null;

  return (
    <div
      className="fixed z-40 flex items-center gap-2 sm:gap-2.5
        left-3 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]
        sm:left-auto sm:right-[5.5rem] sm:bottom-6
        px-2 py-2 sm:px-0 sm:py-0
        rounded-full sm:rounded-none
        bg-slate-950/80 sm:bg-transparent border border-white/10 sm:border-0
        backdrop-blur-md sm:backdrop-blur-none shadow-xl sm:shadow-none"
      aria-label="Quick actions"
    >
      <a
        href={buildMailto(quickMessage)}
        className={`${btn} bg-sky-600 shadow-sky-500/30`}
        aria-label="Email Jagath"
        title="Email"
      >
        <Mail size={18} />
      </a>
      <a
        href={buildWhatsAppSendUrl(quickMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} bg-[#25D366] shadow-emerald-500/40`}
        aria-label="Message on WhatsApp"
        title="WhatsApp"
      >
        <WhatsAppIcon size={18} />
      </a>
      <a
        href={RESUME_PDF}
        download={RESUME_FILENAME}
        className={`${btn} relative bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/40`}
        aria-label="Download Resume"
        title="Download Resume"
      >
        <Download size={18} />
        <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
      </a>
    </div>
  );
}

export default memo(FloatingResumeButton);
