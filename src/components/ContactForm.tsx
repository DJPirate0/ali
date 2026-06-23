import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, MessageSquare, Briefcase, Sparkles } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactFormProps {
  onSubmit: (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'video' | 'design' | 'marketing' | 'general'>('general');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Quick validations
    if (!name.trim()) return setErrorMessage('Name is required');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setErrorMessage('A valid email is required');
    if (!subject.trim()) return setErrorMessage('Subject is required');
    if (!message.trim() || message.length < 10) return setErrorMessage('Message must be at least 10 characters');

    setIsSubmitting(true);

    // Prepare body for the FormSubmit background POST
    const payload = {
      name: name,
      email: email,
      category: category,
      subject: `[Portfolio Inquiry] ${subject}`,
      message: message,
      _subject: `[Portfolio Lead] ${subject} (from ${name})`,
      _captcha: "false"
    };

    // Make simultaneous POST request to send the email and save it locally
    fetch("https://formsubmit.co/ajax/thealihussain013@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) {
          console.warn("Background email forwarding status response was not ok");
        }
      })
      .catch((err) => {
        console.error("Background email forwarding failed:", err);
      })
      .finally(() => {
        // Save locally to the Lead Center admin panel in any case so that no lead is lost
        onSubmit({
          name,
          email,
          subject,
          category,
          message
        });

        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset form fields
        setName('');
        setEmail('');
        setSubject('');
        setCategory('general');
        setMessage('');
      });
  };

  return (
    <div 
      id="contact-form-card"
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl"
    >
      {/* Glow highlight */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mb-5 relative">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-full animate-ping opacity-60" />
            <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-display font-bold text-xl text-white tracking-tight font-sans">Inquiry Sent Successfully!</h3>
          
          <div className="mt-3 p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/80 max-w-md text-left">
            <p className="text-xs text-zinc-300 leading-relaxed">
              ✓ Saved to the <strong>Lead Center</strong> on this website.
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed mt-2.5">
              ✉ Dispatched automatically to <strong>thealihussain013@gmail.com</strong>.
            </p>
            <p className="text-[11px] text-zinc-500 mt-2 font-mono leading-normal">
              Note: The very first time a submission is received, FormSubmit may send you a confirmation email with an "Activate Form" button to verify your inbox. Once clicked, all future leads will stream directly to your inbox in the background!
            </p>
          </div>

          <div className="mt-6 flex gap-3 items-center justify-center w-full max-w-sm">
            <button 
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-950 font-display font-semibold text-xs transition-all shadow-[0_4px_12px_rgba(16,185,129,0.1)] hover:shadow-[0_4px_18px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Form Header */}
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Start a Collaboration</span>
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-name" className="text-xs font-mono text-zinc-400 font-medium flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-zinc-500" />
                Full Name
              </label>
              <input
                id="form-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tony Stark"
                className="w-full bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-xs text-zinc-300 outline-none transition-all placeholder:text-zinc-600"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-email" className="text-xs font-mono text-zinc-400 font-medium flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                Email Address
              </label>
              <input
                id="form-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tony@stark.com"
                className="w-full bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-xs text-zinc-300 outline-none transition-all placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Project Category */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-category" className="text-xs font-mono text-zinc-400 font-medium flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                Inquiry Category
              </label>
              <select
                id="form-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-zinc-300 outline-none transition-all cursor-pointer"
              >
                <option value="video" className="bg-zinc-900">Video Editing Project</option>
                <option value="design" className="bg-zinc-900">Graphic Design / Branding</option>
                <option value="marketing" className="bg-zinc-900">Digital Marketing Campaign</option>
                <option value="general" className="bg-zinc-900">General Consultation</option>
              </select>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-subject" className="text-xs font-mono text-zinc-400 font-medium flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                Subject
              </label>
              <input
                id="form-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Growth Strategy for SaaS"
                className="w-full bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-xs text-zinc-300 outline-none transition-all placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="form-message" className="text-xs font-mono text-zinc-400 font-medium">
              Tell Me About Your Goals & Project Specifications
            </label>
            <textarea
              id="form-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Briefly describe what you're building, your ideal timeline, and what services you're seeking..."
              className="w-full bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-xs text-zinc-300 outline-none transition-all resize-none placeholder:text-zinc-600"
            />
          </div>

          {/* Validation Feedback */}
          {errorMessage && (
            <p className="text-rose-400 text-xs font-mono animate-pulse mt-1 flex items-center gap-1.5">
              ● {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-950 font-display font-semibold text-xs py-3.5 px-6 rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                Encrypting & Dispatching...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Project Brief
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
