import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MessageSquare,
  RotateCcw,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useNotification } from '../context/NotificationContext';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const { notifySuccess, notifyError } = useNotification();

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!formName.trim()) {
      errors.name = 'Please provide your name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formEmail.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!emailRegex.test(formEmail.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    if (!formMessage.trim()) {
      errors.message = 'Please enter a message';
    } else if (formMessage.trim().length < 8) {
      errors.message = 'Message must be at least 8 characters';
    }

    setFieldErrors(errors);
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();

    // If validation fails, trigger error toast message
    if (errors.name) {
      notifyError('Please enter your full name before submitting.', 'Name Required');
      return;
    }
    if (errors.email) {
      notifyError(
        formEmail.trim()
          ? 'The email address entered appears invalid. Please check the format.'
          : 'Please enter your email address so Taher can get back to you.',
        'Email Error'
      );
      return;
    }
    if (errors.message) {
      notifyError(
        formMessage.trim()
          ? 'Your message is too short. Please add a bit more detail.'
          : 'Please enter a message or question before sending.',
        'Message Required'
      );
      return;
    }

    try {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formName.trim()}`);
      const body = encodeURIComponent(
        `Hi Taher,\n\n${formMessage.trim()}\n\nFrom: ${formName.trim()} (${formEmail.trim()})`
      );

      // Trigger mailto client
      window.location.href = `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;

      // Trigger brief success toast notification
      notifySuccess(
        `Thank you ${formName.trim()}! Your message draft was prepared and your email app was opened to send directly to Taher.`,
        'Message Sent Successfully!'
      );

      setIsSubmitted(true);
      setFieldErrors({});
    } catch (err) {
      // Trigger brief error toast notification
      notifyError(
        `Failed to launch email application. You can directly reach Taher at ${personalInfo.contact.email}`,
        'Transmission Error'
      );
    }
  };

  const handleSimulateError = () => {
    notifyError(
      'Network timeout: Unable to reach email server. Please try again or contact directly via phone.',
      'Message Error'
    );
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormName('');
    setFormEmail('');
    setFormMessage('');
    setFieldErrors({});
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/5 bg-[#060606] text-[#EBE7E1] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C17F24] flex items-center gap-2">
            <span className="w-6 h-px bg-[#C17F24]/60" />
            07 · Get In Touch
          </span>
          <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-wider text-white mt-2">
            Let's Connect.
          </h2>
          <p className="text-base sm:text-lg text-[#8E8880] mt-3 leading-relaxed font-sans">
            Whether it's a conversation, an idea, a collaboration or simply saying hello, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Direct Verified Contact Channels */}
          <div className="lg:col-span-5 space-y-5">
            {/* Phone */}
            <a
              href={`tel:${personalInfo.contact.phone}`}
              className="p-6 rounded-2xl bg-[#121110] border border-white/10 shadow-lg hover:border-[#C17F24]/40 hover:shadow-2xl transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-[#181716] border border-white/5 group-hover:bg-[#C17F24]/15 group-hover:border-[#C17F24]/30 text-[#C17F24] transition-colors shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#8E8880]">
                  Call / WhatsApp
                </p>
                <p className="text-base font-bold text-white mt-0.5 group-hover:text-[#E09830] transition-colors">
                  {personalInfo.contact.phoneFormatted}
                </p>
                <p className="text-xs text-[#6A6560] mt-0.5">Clickable on mobile</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="p-6 rounded-2xl bg-[#121110] border border-white/10 shadow-lg hover:border-[#C17F24]/40 hover:shadow-2xl transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-[#181716] border border-white/5 group-hover:bg-[#C17F24]/15 group-hover:border-[#C17F24]/30 text-[#C17F24] transition-colors shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-mono uppercase tracking-wider text-[#8E8880]">
                  Direct Email
                </p>
                <p className="text-sm sm:text-base font-bold text-white mt-0.5 truncate group-hover:text-[#E09830] transition-colors">
                  {personalInfo.contact.email}
                </p>
                <p className="text-xs text-[#6A6560] mt-0.5">Always open for inquiries</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#121110] border border-white/10 shadow-lg hover:border-[#C17F24]/40 hover:shadow-2xl transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-[#181716] border border-white/5 group-hover:bg-[#C17F24]/15 group-hover:border-[#C17F24]/30 text-[#C17F24] transition-colors shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#8E8880]">
                  LinkedIn Profile
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <p className="text-sm font-bold text-white group-hover:text-[#E09830] transition-colors">
                    Taher Chitalwala
                  </p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8E8880] group-hover:text-[#E09830]" />
                </div>
                <p className="text-xs text-[#6A6560] mt-0.5">Professional updates & network</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={personalInfo.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#121110] border border-white/10 shadow-lg hover:border-[#C17F24]/40 hover:shadow-2xl transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-[#181716] border border-white/5 group-hover:bg-[#C17F24]/15 group-hover:border-[#C17F24]/30 text-[#C17F24] transition-colors shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#8E8880]">
                  Instagram
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <p className="text-sm font-bold text-white group-hover:text-[#E09830] transition-colors">
                    {personalInfo.contact.instagramHandle}
                  </p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8E8880] group-hover:text-[#E09830]" />
                </div>
                <p className="text-xs text-[#6A6560] mt-0.5">Personal moments & sports</p>
              </div>
            </a>

            {/* Location marker */}
            <div className="p-4 rounded-xl bg-[#121110] border border-white/10 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#C17F24] shrink-0" />
              <p className="text-xs font-medium text-[#8E8880]">
                Based in <span className="font-semibold text-white">South Mumbai, India</span>
              </p>
            </div>
          </div>

          {/* Direct Note Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-[#121110] border border-white/10 shadow-2xl transition-colors">
              <h3 className="text-2xl font-display uppercase tracking-wide text-white">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-[#8E8880] mt-1 font-sans">
                Fill this out to start a conversation directly with Taher.
              </p>

              {isSubmitted ? (
                <div className="mt-8 space-y-4">
                  <div className="p-6 rounded-xl bg-[#181716] border border-[#C17F24]/40 text-[#EBE7E1] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E09830] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">Email draft initiated!</p>
                      <p className="text-xs text-[#8E8880] mt-0.5 leading-relaxed">
                        Your default mail client has opened with your note directed to Taher ({personalInfo.contact.email}). A toast notification has confirmed this transmission.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-display tracking-widest uppercase text-white bg-[#1a1a1a] hover:bg-[#222] border border-white/10 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8E8880] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formName}
                        onChange={(e) => {
                          setFormName(e.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => ({ ...prev, name: undefined }));
                          }
                        }}
                        className={`w-full px-4 py-3 text-sm rounded-xl border bg-[#161616] text-white placeholder-[#555] focus:outline-none transition-colors ${
                          fieldErrors.name
                            ? 'border-red-400 focus:ring-1 focus:ring-red-500'
                            : 'border-white/10 focus:border-[#C17F24] focus:ring-1 focus:ring-[#C17F24]/50'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{fieldErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8E8880] mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={formEmail}
                        onChange={(e) => {
                          setFormEmail(e.target.value);
                          if (fieldErrors.email) {
                            setFieldErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        className={`w-full px-4 py-3 text-sm rounded-xl border bg-[#161616] text-white placeholder-[#555] focus:outline-none transition-colors ${
                          fieldErrors.email
                            ? 'border-red-400 focus:ring-1 focus:ring-red-500'
                            : 'border-white/10 focus:border-[#C17F24] focus:ring-1 focus:ring-[#C17F24]/50'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{fieldErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#8E8880] mb-1.5">
                      Message / What's on your mind? *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Hi Taher, I came across your portfolio and wanted to connect regarding..."
                      value={formMessage}
                      onChange={(e) => {
                        setFormMessage(e.target.value);
                        if (fieldErrors.message) {
                          setFieldErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-[#161616] text-white placeholder-[#555] focus:outline-none transition-colors resize-y ${
                        fieldErrors.message
                          ? 'border-red-400 focus:ring-1 focus:ring-red-500'
                          : 'border-white/10 focus:border-[#C17F24] focus:ring-1 focus:ring-[#C17F24]/50'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fieldErrors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#C17F24] hover:bg-[#E09830] text-[#060606] font-display text-sm tracking-widest uppercase font-bold transition-all shadow-lg shadow-[#C17F24]/20 cursor-pointer hover:-translate-y-0.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message to Taher</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSimulateError}
                      title="Simulate network or submission failure to test error toast message"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-mono text-[#8E8880] hover:text-white border border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      <span>Test Error Toast</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#6A6560] mt-3 font-mono">
                    Directly addresses Taher at <span className="text-[#C17F24]">{personalInfo.contact.email}</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
