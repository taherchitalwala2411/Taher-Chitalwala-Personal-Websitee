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
    <section id="contact" className="py-16 md:py-22 border-t border-stone-200/80 dark:border-stone-800 bg-gradient-to-b from-[#FAF9F5] via-[#F6F3EB] to-[#FAF9F5] dark:from-[#121110] dark:via-[#161513] dark:to-[#121110] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E28] dark:text-[#E11D48]">
            07 · Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 mt-1">
            Let's Connect.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 mt-4 leading-relaxed font-normal">
            Whether it's a conversation, an idea, a collaboration or simply saying hello, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Direct Verified Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone */}
            <a
              href={`tel:${personalInfo.contact.phone}`}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 group-hover:bg-[#8B1E28]/10 dark:group-hover:bg-[#E11D48]/20 text-stone-700 dark:text-stone-300 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48] transition-colors shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Call / WhatsApp
                </p>
                <p className="text-base font-bold text-stone-950 dark:text-stone-50 mt-0.5 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48] transition-colors">
                  {personalInfo.contact.phoneFormatted}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Clickable on mobile</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 group-hover:bg-[#8B1E28]/10 dark:group-hover:bg-[#E11D48]/20 text-stone-700 dark:text-stone-300 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48] transition-colors shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Direct Email
                </p>
                <p className="text-sm sm:text-base font-bold text-stone-950 dark:text-stone-50 mt-0.5 truncate group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48] transition-colors">
                  {personalInfo.contact.email}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Always open for inquiries</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 group-hover:bg-[#8B1E28]/10 dark:group-hover:bg-[#E11D48]/20 text-stone-700 dark:text-stone-300 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48] transition-colors shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  LinkedIn Profile
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <p className="text-sm font-bold text-stone-950 dark:text-stone-50 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48] transition-colors">
                    Taher Chitalwala
                  </p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48]" />
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Professional updates & network</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={personalInfo.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 group-hover:bg-[#8B1E28]/10 dark:group-hover:bg-[#E11D48]/20 text-stone-700 dark:text-stone-300 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48] transition-colors shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Instagram
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <p className="text-sm font-bold text-stone-950 dark:text-stone-50 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48] transition-colors">
                    {personalInfo.contact.instagramHandle}
                  </p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#8B1E28] dark:group-hover:text-[#E11D48]" />
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Personal moments & sports</p>
              </div>
            </a>

            {/* Location marker */}
            <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#8B1E28] dark:text-[#E11D48] shrink-0" />
              <p className="text-xs font-medium text-stone-700 dark:text-stone-300">
                Based in <span className="font-semibold text-stone-900 dark:text-stone-100">South Mumbai, India</span>
              </p>
            </div>
          </div>

          {/* Direct Note Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs transition-colors">
              <h3 className="text-xl font-bold text-stone-950 dark:text-stone-50">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Fill this out to start a conversation directly with Taher.
              </p>

              {isSubmitted ? (
                <div className="mt-8 space-y-4">
                  <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-bold">Email draft initiated!</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5 leading-relaxed">
                        Your default mail client has opened with your note directed to Taher ({personalInfo.contact.email}). A toast notification has confirmed this transmission.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
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
                        className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-800 focus:outline-none transition-colors ${
                          fieldErrors.name
                            ? 'border-red-400 dark:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-stone-300 dark:border-stone-700 focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{fieldErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
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
                        className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-800 focus:outline-none transition-colors ${
                          fieldErrors.email
                            ? 'border-red-400 dark:border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-stone-300 dark:border-stone-700 focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{fieldErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
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
                      className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-800 focus:outline-none transition-colors resize-y ${
                        fieldErrors.message
                          ? 'border-red-400 dark:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-stone-300 dark:border-stone-700 focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fieldErrors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white/90 text-white dark:text-stone-950 text-xs font-bold transition-all shadow-xs cursor-pointer hover:-translate-y-0.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message to Taher</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSimulateError}
                      title="Simulate network or submission failure to test error toast message"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 border border-dashed border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <span>Test Error Toast</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-2">
                    Directly addresses Taher at <span className="font-mono text-stone-600 dark:text-stone-300">{personalInfo.contact.email}</span>
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
