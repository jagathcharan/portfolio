import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { generateLocalAIResponse, type ChatReply } from '../utils/localAI';
import { suggestedQuestions } from '../utils/siteKnowledge';
import { EMAIL, buildMailto, buildWhatsAppSendUrl } from '../utils/contact';
import { sendEmail } from '../utils/emailService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

type ContactFlow = 'idle' | 'asking_name' | 'asking_email' | 'asking_message';

function renderRichText(text: string) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={j} className="text-sky-200 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={j}>{part}</span>;
    });
    return (
      <span key={i} className="block min-h-[0.85em]">
        {parts}
      </span>
    );
  });
}

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi — I'm Jagath's portfolio assistant. Ask about his Machine Learning / Edge AI / RAG work, experience, projects, or how to reach him.",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: suggestedQuestions.slice(0, 4),
    },
  ]);
  const [input, setInput] = useState('');
  const [contactFlow, setContactFlow] = useState<ContactFlow>('idle');
  const [visitorInfo, setVisitorInfo] = useState({ name: '', email: '', message: '' });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen, contactFlow]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('portfolio-chat-open', { detail: { open: isOpen } }));
  }, [isOpen]);

  const pushAi = useCallback((text: string, suggestions?: string[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-ai`,
        text,
        sender: 'ai',
        timestamp: new Date(),
        suggestions,
      },
    ]);
    setIsTyping(false);
  }, []);

  const answerQuestion = useCallback(
    (userInput: string) => {
      const history = messages.slice(-6).map((m) => m.text.toLowerCase());
      const lower = userInput.toLowerCase();

      if (
        contactFlow === 'idle' &&
        (/\b(connect|leave a message|send (him )?a message|contact flow)\b/.test(lower) ||
          lower === 'send a message')
      ) {
        setContactFlow('asking_name');
        pushAi(
          "Sure — I'll collect a short intro for Jagath.\n\nWhat's your **name**?",
          undefined
        );
        return;
      }

      const reply: ChatReply = generateLocalAIResponse(userInput, history);

      if (
        contactFlow === 'idle' &&
        /\b(hire|recruit|opportunity|open to|available for)\b/.test(lower) &&
        /\b(yes|connect|contact)\b/.test(lower)
      ) {
        setContactFlow('asking_name');
        pushAi(
          `${reply.text}\n\nIf you'd like, share your **name** and I'll take a message.`,
          ['Skip — just email', ...((reply.suggestions || []).slice(0, 2))]
        );
        return;
      }

      pushAi(reply.text, reply.suggestions);
    },
    [contactFlow, messages, pushAi]
  );

  const handleSend = async (raw?: string) => {
    const userInput = (raw ?? input).trim();
    if (!userInput || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-u`, text: userInput, sender: 'user', timestamp: new Date() },
    ]);
    setInput('');
    setIsTyping(true);

    if (userInput.toLowerCase() === 'skip — just email' || userInput.toLowerCase() === 'skip') {
      setContactFlow('idle');
      setTimeout(
        () =>
          pushAi(`No problem. Email **${EMAIL}** or use WhatsApp from the contact buttons.`, [
            'How can I contact him?',
            'What does Jagath specialize in?',
          ]),
        400
      );
      return;
    }

    if (contactFlow === 'asking_name') {
      setVisitorInfo((prev) => ({ ...prev, name: userInput }));
      setContactFlow('asking_email');
      setTimeout(
        () => pushAi(`Nice to meet you, **${userInput}**. What's your **email**?`),
        450
      );
      return;
    }

    if (contactFlow === 'asking_email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput)) {
        setTimeout(
          () => pushAi('That email looks off — try again (e.g. name@company.com).'),
          400
        );
        return;
      }
      setVisitorInfo((prev) => ({ ...prev, email: userInput }));
      setContactFlow('asking_message');
      setTimeout(
        () =>
          pushAi(
            'Thanks. What would you like Jagath to know? (role, project, timeline — a few lines is fine)'
          ),
        450
      );
      return;
    }

    if (contactFlow === 'asking_message') {
      const finalInfo = { ...visitorInfo, message: userInput };
      setVisitorInfo(finalInfo);
      try {
        const success = await sendEmail({
          name: finalInfo.name,
          email: finalInfo.email,
          company: '',
          message: finalInfo.message,
          title: 'Portfolio chat inquiry',
        });
        setContactFlow('idle');
        setVisitorInfo({ name: '', email: '', message: '' });
        pushAi(
          success
            ? `Got it, **${finalInfo.name}**. Your note was submitted. Jagath will follow up at **${finalInfo.email}**.\n\nYou can also WhatsApp or email him anytime.`
            : `Saved your details locally in this chat. Form delivery may be unavailable — please email **${EMAIL}** or open WhatsApp with your note prefilled.`,
          ['Edge AI work', 'Skills overview', 'Open WhatsApp']
        );
      } catch {
        setContactFlow('idle');
        pushAi(`Please reach Jagath at **${EMAIL}** — happy to keep answering questions here.`, [
          'Skills overview',
          'Projects',
        ]);
      }
      return;
    }

    if (userInput.toLowerCase() === 'open whatsapp') {
      window.open(
        buildWhatsAppSendUrl({
          name: 'Portfolio visitor',
          email: '',
          message: 'Hello Jagath, I found your portfolio and would like to connect.',
        }),
        '_blank',
        'noopener,noreferrer'
      );
      setTimeout(
        () => pushAi('Opened WhatsApp with a starter message. Anything else about Jagath?', [
          'Projects',
          'Availability',
        ]),
        300
      );
      return;
    }

    setTimeout(() => answerQuestion(userInput), 350 + Math.min(userInput.length * 8, 500));
  };

  const placeholder =
    contactFlow === 'asking_name'
      ? 'Your name…'
      : contactFlow === 'asking_email'
        ? 'your.email@company.com'
        : contactFlow === 'asking_message'
          ? 'Your message…'
          : 'Ask about skills, Edge AI, RAG, contact…';

  if (!isOpen) {
    return (
      <div
        className="fixed z-50 right-3 sm:right-6
          bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-6
          flex items-end gap-2"
      >
        <div className="hidden md:block max-w-[180px] rounded-2xl border border-cyan-500/25 bg-slate-900/95 px-3 py-2.5 shadow-xl shadow-cyan-500/10 backdrop-blur-md mb-1">
          <p className="text-[11px] font-semibold text-cyan-300 mb-1 flex items-center gap-1">
            <Sparkles size={12} /> Ask Jagath&apos;s assistant
          </p>
          <p className="text-[10px] text-slate-400 leading-relaxed">Skills · Edge AI · RAG · Contact</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative w-12 h-12 sm:w-[3.25rem] sm:h-[3.25rem] inline-flex items-center justify-center bg-gradient-to-br from-sky-500 to-cyan-600 text-white rounded-full shadow-xl shadow-cyan-500/35 hover:scale-105 active:scale-95 transition-transform"
          aria-label="Open portfolio assistant"
        >
          <MessageCircle size={22} />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
        </button>
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      className="fixed z-50 left-3 right-3 sm:left-auto sm:right-6
        bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-6
        w-auto sm:w-[24rem] max-w-md
        h-[min(78svh,34rem)] sm:h-[min(85vh,36rem)]
        bg-slate-950/95 rounded-2xl shadow-2xl shadow-cyan-500/15 border border-cyan-500/30
        flex flex-col overflow-hidden chat-scale-in backdrop-blur-xl"
    >
      <div className="relative px-3.5 py-3 flex items-center justify-between bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/25">
            <Bot size={18} className="text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm leading-tight truncate">Portfolio Assistant</h3>
            <p className="text-white/85 text-[11px] truncate">Q&amp;A about Jagath Charan</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-white/90 hover:bg-white/15 rounded-lg p-1.5"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_55%)] scrollbar-thin">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot size={13} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-3 py-2 text-[12px] leading-relaxed ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-sky-600 to-cyan-600 text-white rounded-br-md'
                    : 'bg-slate-900/90 text-slate-200 border border-white/10 rounded-bl-md'
                }`}
              >
                <div className="whitespace-pre-wrap">{renderRichText(message.text)}</div>
                <p className="text-[10px] opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User size={13} className="text-sky-300" />
                </div>
              )}
            </div>
            {message.sender === 'ai' && message.suggestions && message.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pl-9">
                {message.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSend(s)}
                    className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center">
              <Bot size={13} className="text-white" />
            </div>
            <div className="bg-slate-900 border border-white/10 rounded-2xl px-3 py-2.5 flex gap-1">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-3 py-2 border-t border-white/10 bg-slate-900/80 flex gap-2">
        <a
          href={buildMailto({
            name: 'Portfolio visitor',
            email: '',
            message: 'Hello Jagath, I found your portfolio via the chat assistant.',
          })}
          className="flex-1 text-center text-[11px] font-semibold py-1.5 rounded-lg bg-sky-500/15 text-sky-200 border border-sky-500/30 hover:bg-sky-500/25"
        >
          Email
        </a>
        <a
          href={buildWhatsAppSendUrl({
            name: 'Portfolio visitor',
            email: '',
            message: 'Hello Jagath, I found your portfolio via the chat assistant.',
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-[11px] font-semibold py-1.5 rounded-lg bg-emerald-500/15 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/25"
        >
          WhatsApp
        </a>
      </div>

      <div className="p-3 bg-slate-900/95 border-t border-white/10">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type={contactFlow === 'asking_email' ? 'email' : 'text'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
            placeholder={placeholder}
            className="flex-1 px-3 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20"
          />
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={!input.trim() || isTyping}
            className="px-3.5 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(AIChat);
