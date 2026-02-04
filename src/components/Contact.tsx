import { useState, memo } from 'react';
import { Mail, Linkedin, Github, MapPin, Phone, Send } from 'lucide-react';
import { sendEmail } from '../utils/emailService';
import { logger } from '../utils/logger';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      logger.log('form_submit', formData, 'error', 'Form validation failed - missing required fields');
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
      return;
    }

    const emailData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: '', // Contact form doesn't have company field
      message: formData.message.trim(),
      title: 'Portfolio Contact Form Inquiry',
    };

    // Log form submission
    logger.log('form_submit', emailData, 'pending', 'Form submitted - sending email...');
    setStatus('loading');

    try {
      const success = await sendEmail(emailData);

      if (success) {
        logger.log('email_sent', emailData, 'success', 'Email sent successfully via EmailJS');
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        logger.log('email_error', emailData, 'error', 'Failed to send email via EmailJS');
        setStatus('error');
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.log('email_error', { ...emailData, error: errorMessage }, 'error', `Error: ${errorMessage}`);
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Jagathcharan2004@gmail.com',
      href: 'mailto:Jagathcharan2004@gmail.com',
      color: 'text-ai-primary',
      hoverColor: 'hover:text-ai-primary',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9198198123',
      href: 'tel:+91 9198198123',
      color: 'text-ai-secondary',
      hoverColor: 'hover:text-ai-secondary',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bengaluru 560057',
      href: '#',
      color: 'text-ai-accent',
      hoverColor: 'hover:text-ai-accent',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/jagathcharan2004/',
      color: 'text-ai-primary',
      hoverColor: 'hover:text-ai-primary',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View GitHub Profile',
      href: 'https://github.com/jagathcharan',
      color: 'text-ai-secondary',
      hoverColor: 'hover:text-ai-secondary',
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="absolute inset-0 ai-grid opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/2 via-transparent to-ai-secondary/2"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.03),transparent_50%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <div className="h-0.5 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent mx-auto rounded-full mb-3 sm:mb-4"></div>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              Let's discuss your next AI project or collaboration opportunity. Open to full-time positions and consulting opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <div className="space-y-6 sm:space-y-8 reveal">
              <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-ai-primary/30 hover-lift">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-1 h-5 sm:h-6 bg-gradient-to-b from-ai-primary to-ai-secondary rounded-full"></span>
                  Contact Information
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-start gap-3 group hover:scale-105 transition-all duration-300 p-2.5 rounded-lg hover:bg-ai-primary/5"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/80 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br ${item.color === 'text-ai-primary' ? 'from-ai-primary/20 to-ai-primary/5' : item.color === 'text-ai-secondary' ? 'from-ai-secondary/20 to-ai-secondary/5' : 'from-ai-accent/20 to-ai-accent/5'} transition-all duration-300`}>
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
                  {['English', 'Telugu', 'Kannada', 'Tamil', 'Hindi'].map((lang, index) => (
                    <span
                      key={index}
                      className="px-2.5 sm:px-3 py-1.5 bg-ai-secondary/10 text-ai-secondary rounded-lg text-xs font-medium border border-ai-secondary/20 hover:bg-ai-secondary/20 hover:border-ai-secondary/40 transition-all duration-300 hover:scale-110"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 hover-lift reveal">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-1 h-5 sm:h-6 bg-gradient-to-b from-ai-secondary to-ai-accent rounded-full"></span>
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
                    placeholder="Your message..."
                    required
                    minLength={10}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-5 py-3 bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:shadow-2xl hover:shadow-ai-primary/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-center text-xs sm:text-sm animate-fade-in">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center text-xs sm:text-sm animate-fade-in">
                    ✗ Failed to send message. Please try again or email me directly at Jagathcharan2004@gmail.com
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
