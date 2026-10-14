import { useState, memo, type SVGProps } from 'react';
import { Mail, Linkedin, Github, MapPin, Phone, Send, ExternalLink } from 'lucide-react';
import { sendEmail } from '../utils/emailService';
import { logger } from '../utils/logger';
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
  buildMailto,
  buildWhatsAppSendUrl,
  type ContactMessage,
} from '../utils/contact';

function WhatsAppIcon({ size = 18, className, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M17.472 14.382c-.297-.139-1.688-.867-1.948-.967-.261-.1-.45-.149-.64.149-.19.297-.73.967-.896 1.164-.164.198-.33.223-.608.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.688-.69 1.927-1.356.238-.666.238-1.237.167-1.356-.072-.119-.27-.198-.568-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Contact() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isFilled =
    formData.name.trim().length >= 2 &&
    formData.email.trim().includes('@') &&
    formData.message.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFilled) {
      setStatus('error');
      logger.log('form_submit', formData, 'error', 'Form validation failed - missing required fields');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const emailData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: '',
      message: formData.message.trim(),
      title: 'Portfolio Contact Form Inquiry',
    };

    logger.log('form_submit', emailData, 'pending', 'Form submitted - sending email...');
    setStatus('loading');

    try {
      const success = await sendEmail(emailData);

      if (success) {
        logger.log('email_sent', emailData, 'success', 'Email sent successfully via EmailJS');
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        logger.log('email_error', emailData, 'error', 'Failed to send email via EmailJS');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.log('email_error', { ...emailData, error: errorMessage }, 'error', `Error: ${errorMessage}`);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      color: 'text-ai-primary',
      hoverColor: 'hover:text-ai-primary',
      external: false,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_TEL}`,
      color: 'text-ai-secondary',
      hoverColor: 'hover:text-ai-secondary',
      external: false,
    },
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: PHONE_DISPLAY,
      href: WHATSAPP_URL,
      color: 'text-[#25D366]',
      hoverColor: 'hover:text-[#25D366]',
      external: true,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bengaluru, India',
      href: '#',
      color: 'text-ai-accent',
      hoverColor: 'hover:text-ai-accent',
      external: false,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/jagathcharan2004',
      href: 'https://www.linkedin.com/in/jagathcharan2004/',
      color: 'text-ai-primary',
      hoverColor: 'hover:text-ai-primary',
      external: true,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/jagathcharan',
      href: 'https://github.com/jagathcharan',
      color: 'text-ai-secondary',
      hoverColor: 'hover:text-ai-secondary',
      external: true,
    },
    {
      icon: ExternalLink,
      label: 'Portfolio',
      value: 'jagathcharan.github.io/portfolio',
      href: 'https://jagathcharan.github.io/portfolio/',
      color: 'text-ai-accent',
      hoverColor: 'hover:text-ai-accent',
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
      <div className="absolute inset-0 ai-grid opacity-5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.06),transparent_55%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 reveal">
            <p className="section-eyebrow justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Connect
            </p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 mx-auto rounded-full mb-4" />
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
              Fill the form, then send via email app or WhatsApp — or submit directly. Open to full-time roles and consulting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <div className="space-y-6 sm:space-y-8 reveal">
              <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-ai-primary/30 hover-lift">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-1 h-5 sm:h-6 bg-gradient-to-b from-ai-primary to-ai-secondary rounded-full" />
                  Contact Information
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-3 group hover:scale-[1.02] transition-all duration-300 p-2.5 rounded-lg hover:bg-ai-primary/5"
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/80 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br ${
                          item.color === 'text-ai-primary'
                            ? 'from-ai-primary/20 to-ai-primary/5'
                            : item.color === 'text-ai-secondary'
                              ? 'from-ai-secondary/20 to-ai-secondary/5'
                              : item.color === 'text-[#25D366]'
                                ? 'from-emerald-500/20 to-emerald-500/5'
                                : 'from-ai-accent/20 to-ai-accent/5'
                        } transition-all duration-300`}
                      >
                        <item.icon size={18} className={`sm:w-5 sm:h-5 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                        <p className={`text-xs sm:text-sm text-white ${item.hoverColor} transition-colors duration-300 break-words`}>
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-ai-secondary/30 hover-lift">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Languages</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'English (Professional)',
                    'Telugu (Native)',
                    'Hindi (Fluent)',
                    'Kannada (Fluent)',
                    'Tamil (Conversational)',
                  ].map((lang) => (
                    <span
                      key={lang}
                      className="px-2.5 sm:px-3 py-1.5 bg-ai-secondary/10 text-sky-300 rounded-lg text-xs font-medium border border-ai-secondary/20 hover:bg-ai-secondary/20 hover:border-ai-secondary/40 transition-all duration-300"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 hover-lift reveal">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-1 h-5 sm:h-6 bg-gradient-to-b from-ai-secondary to-ai-accent rounded-full" />
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-ai-primary focus:ring-2 focus:ring-ai-primary/20 transition-all duration-300"
                    placeholder="Your name"
                    required
                    minLength={2}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-ai-primary focus:ring-2 focus:ring-ai-primary/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-ai-primary focus:ring-2 focus:ring-ai-primary/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about the role, project, or collaboration..."
                    required
                    minLength={10}
                  />
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5">
                  <a
                    href={buildMailto(formData)}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                      isFilled
                        ? 'bg-sky-500/15 text-sky-200 border-sky-400/40 hover:bg-sky-500/25 hover:scale-[1.02]'
                        : 'bg-slate-800/50 text-slate-500 border-slate-700 pointer-events-none opacity-60'
                    }`}
                    aria-disabled={!isFilled}
                    onClick={(e) => {
                      if (!isFilled) e.preventDefault();
                    }}
                  >
                    <Mail size={16} />
                    Open Email App
                  </a>
                  <a
                    href={buildWhatsAppSendUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                      isFilled
                        ? 'bg-[#25D366]/15 text-emerald-200 border-[#25D366]/40 hover:bg-[#25D366]/25 hover:scale-[1.02]'
                        : 'bg-slate-800/50 text-slate-500 border-slate-700 pointer-events-none opacity-60'
                    }`}
                    aria-disabled={!isFilled}
                    onClick={(e) => {
                      if (!isFilled) e.preventDefault();
                    }}
                  >
                    <WhatsAppIcon size={16} className="text-[#25D366]" />
                    Send on WhatsApp
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-5 py-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                      Submit via Form
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  Email / WhatsApp open your apps with this form prefilled. Submit uses the site form when configured.
                </p>

                {status === 'success' && (
                  <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-center text-xs sm:text-sm animate-fade-in">
                    Message sent successfully. I will get back to you soon.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center text-xs sm:text-sm animate-fade-in">
                    Could not send via form. Use Open Email App or WhatsApp, or email {EMAIL} directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Contact);
