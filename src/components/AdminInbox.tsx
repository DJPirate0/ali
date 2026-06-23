import React, { useState } from 'react';
import { Mail, CheckCircle, Trash2, Calendar, MessageSquare, Shield, X, AlertCircle, Lock, Key, ArrowRight, LogOut } from 'lucide-react';
import { ContactMessage } from '../types';

interface AdminInboxProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ContactMessage[];
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function AdminInbox({ isOpen, onClose, messages, onMarkRead, onDelete, onClearAll }: AdminInboxProps) {
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'design' | 'marketing' | 'general'>('all');
  const [passwordInput, setPasswordInput] = useState('');
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('admin_authenticated_password') === 'Alih2237';
    } catch (err) {
      console.warn("sessionStorage is not accessible:", err);
      return false;
    }
  });
  const [errorMsg, setErrorMsg] = useState('');

  const filteredMessages = messages.filter(msg => {
    if (activeFilter === 'all') return true;
    return msg.category === activeFilter;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  // Format date helper
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setErrorMsg('Please enter the access password.');
      return;
    }
    if (passwordInput === 'Alih2237') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('admin_authenticated_password', 'Alih2237');
      } catch (err) {
        console.warn("sessionStorage is not accessible:", err);
      }
      setErrorMsg('');
    } else {
      setErrorMsg('Access denied. Incorrect password.');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('admin_authenticated_password');
    } catch (err) {
      console.warn("sessionStorage is not accessible:", err);
    }
    setPasswordInput('');
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div 
        id="admin-inbox-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fade-in"
      >
        <div 
          id="admin-auth-container"
          className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col relative animate-fade-in"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Decorative glowing background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Icon and Title */}
          <div className="flex flex-col items-center text-center mt-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="font-display font-bold text-lg text-white">Administrator Access Required</h2>
            <p className="text-xs text-zinc-500 mt-2 max-w-xs leading-relaxed">
              This panel contains private client proposals and leads. Please confirm your admin access password to authorize this session.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="auth-password" className="text-xs font-mono text-zinc-400 font-medium">
                Admin Access Password
              </label>
              <div className="relative">
                <input
                  id="auth-password"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter Password"
                  className="w-full bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-300 outline-none transition-all placeholder:text-zinc-600"
                  autoFocus
                />
                <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {errorMsg && (
              <p className="text-rose-400 text-[11px] font-mono animate-pulse">
                ✕ {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-950 font-display font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.1)] hover:shadow-[0_4px_18px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              Authorize Session
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-800/60 text-center">
            <span className="text-[10px] font-mono text-zinc-650">
              SECURE SESSION AUTH LOCK ACTIVE
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="admin-inbox-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-fade-in"
    >
      <div 
        id="admin-inbox-container"
        className="w-full max-w-4xl h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Shield className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg text-white flex items-center gap-2">
                Portfolio Lead Center
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">ADMIN ACCESS</span>
              </h2>
              <p className="text-xs text-zinc-500">Review, filter, and manage inquiries sent through your contact form.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSignOut}
              className="px-2.5 py-1.5 rounded-lg border border-zinc-850 text-xs font-mono text-zinc-400 hover:text-rose-400 hover:bg-rose-500/5 hover:border-rose-500/15 flex items-center gap-1.5 transition-all mr-1 cursor-pointer"
              title="Sign Out of Admin"
            >
              <LogOut className="w-3.5 h-3.5 text-zinc-500 group-hover:text-rose-400" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-zinc-800 bg-zinc-950/20">
          <div className="p-4 border-r border-zinc-800/60 flex flex-col">
            <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Total Leads</span>
            <span className="text-xl font-display font-bold text-white mt-0.5">{messages.length}</span>
          </div>
          <div className="p-4 border-r border-zinc-800/60 flex flex-col">
            <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Unread</span>
            <span className="text-xl font-display font-bold text-emerald-400 mt-0.5">{unreadCount}</span>
          </div>
          <div className="p-4 border-r border-zinc-800/60 flex flex-col">
            <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Categories Active</span>
            <span className="text-xl font-display font-bold text-cyan-400 mt-0.5">
              {new Set(messages.map(m => m.category)).size}
            </span>
          </div>
          <div className="p-4 flex flex-col justify-center">
            {isConfirmingClear ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <span className="text-[11px] font-mono text-rose-400 font-semibold uppercase">Clear all?</span>
                <button
                  onClick={() => {
                    onClearAll();
                    setSelectedMsg(null);
                    setIsConfirmingClear(false);
                  }}
                  className="text-[10px] font-mono bg-rose-500 hover:bg-rose-600 text-zinc-950 font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsConfirmingClear(false)}
                  className="text-[10px] font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsConfirmingClear(true)}
                disabled={messages.length === 0}
                className="text-xs font-mono text-rose-400 hover:text-rose-300 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All Leads
              </button>
            )}
          </div>
        </div>

        {/* Content Panel */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          {/* Left Column: Message List */}
          <div className="w-full md:w-5/12 border-r border-zinc-800 flex flex-col overflow-hidden">
            {/* Category Filter Pills */}
            <div className="p-3 border-b border-zinc-800 bg-zinc-900 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
              {(['all', 'video', 'design', 'marketing', 'general'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border transition-all shrink-0 ${
                    activeFilter === f
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold'
                      : 'bg-zinc-950/20 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/40">
              {filteredMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center text-zinc-600 gap-2">
                  <Mail className="w-8 h-8 opacity-40 stroke-[1.5]" />
                  <p className="text-xs font-mono">No messages found in this category.</p>
                </div>
              ) : (
                filteredMessages.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMsg(msg);
                      onMarkRead(msg.id);
                    }}
                    className={`p-4 cursor-pointer transition-all flex flex-col gap-1.5 ${
                      selectedMsg?.id === msg.id 
                        ? 'bg-zinc-800/55' 
                        : 'hover:bg-zinc-800/20'
                    } ${!msg.read ? 'border-l-2 border-emerald-500 pl-3.5' : 'pl-4'}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-display font-medium text-xs text-white truncate max-w-[130px]">{msg.name}</span>
                      <span className="text-[9px] font-mono text-zinc-500 whitespace-nowrap">{formatDate(msg.timestamp)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs font-semibold text-zinc-300 truncate">{msg.subject}</span>
                      <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                        msg.category === 'video' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        msg.category === 'design' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        msg.category === 'marketing' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}>
                        {msg.category}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500 line-clamp-1">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Message Detail */}
          <div className="flex-1 bg-zinc-950/40 flex flex-col overflow-hidden">
            {selectedMsg ? (
              <div className="flex-1 flex flex-col overflow-y-auto p-6 gap-6">
                {/* Detail Header */}
                <div className="flex flex-col gap-3 pb-5 border-b border-zinc-800/80">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Sender Details</span>
                      <h3 className="font-display font-bold text-lg text-white mt-0.5">{selectedMsg.name}</h3>
                      <a href={`mailto:${selectedMsg.email}`} className="text-xs text-emerald-400 hover:underline">{selectedMsg.email}</a>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(selectedMsg.id);
                          setSelectedMsg(null);
                        }}
                        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500 mt-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(selectedMsg.timestamp)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Inquiry Category: <span className="text-cyan-400 uppercase font-semibold">{selectedMsg.category}</span>
                    </span>
                  </div>
                </div>

                {/* Subject & Body */}
                <div className="flex-1 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Inquiry Subject</span>
                    <h4 className="font-display font-semibold text-white mt-1 leading-snug">{selectedMsg.subject}</h4>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800/40 p-4 rounded-xl flex-1 min-h-[150px]">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide block mb-2">Message Body</span>
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-sans">{selectedMsg.message}</p>
                  </div>
                </div>

                {/* Quick Reply Advice */}
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-start gap-2.5 shrink-0">
                  <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-emerald-400/80">
                    To connect, click the email address above to draft a direct response via your default mail client. Real persistence is simulated successfully.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-600 gap-3">
                <Mail className="w-10 h-10 opacity-35 stroke-[1.2] text-zinc-500 animate-pulse" />
                <div>
                  <p className="text-sm font-display text-zinc-400 font-medium">No Lead Selected</p>
                  <p className="text-xs text-zinc-600 max-w-[240px] mt-1">Select a message from the left menu panel to view detailed sender information.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
