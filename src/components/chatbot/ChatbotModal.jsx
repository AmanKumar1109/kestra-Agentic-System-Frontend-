import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, Send, Sparkles, Database, FileText, Bot, User, CheckCircle2 } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { CALLOUT_ITEMS } from '../../utils/constants';

export default function ChatbotModal() {
  const {
    isChatOpen,
    setIsChatOpen,
    activeCategory,
    openChatWithCategory,
    customQuery,
    setCustomQuery,
    chatHistory,
    isProcessing,
    handleSendMessage,
  } = useChat();

  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isChatOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        gsap.fromTo(
          modalRef.current,
          { scale: 0.92, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }
        );
      });
      return () => ctx.revert();
    }
  }, [isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isProcessing]);

  if (!isChatOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(customQuery);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={() => setIsChatOpen(false)}
        className="fixed inset-0 bg-[#271B14]/40 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E8E2D8] rounded-3xl shadow-[0_25px_60px_-15px_rgba(39,27,20,0.3)] flex flex-col max-h-[88vh] overflow-hidden z-10"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E2D8] bg-[#F4EFE6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E67246] flex items-center justify-center text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[#271B14] text-base">
                Data AI Agent Workspace
              </h3>
              <p className="text-xs text-[#78685C]">
                Connected to SQL Engines, Web Crawlers & Normalizers
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsChatOpen(false)}
            className="w-8 h-8 rounded-full bg-[#EFE9E0] hover:bg-[#E4DDD2] flex items-center justify-center text-[#78685C] hover:text-[#271B14] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Sample Action Tabs */}
        <div className="px-6 py-2.5 bg-[#FAF7F2] border-b border-[#EFE9E0] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CALLOUT_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => openChatWithCategory(item.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeCategory === item.id
                  ? `${item.bgColorClass} text-white shadow-xs`
                  : 'bg-[#EFE9E0] text-[#78685C] hover:bg-[#E4DDD2]'
              }`}
            >
              {item.id === 'database' && <Database className="w-3 h-3" />}
              {item.id === 'web-scraping' && <FileText className="w-3 h-3" />}
              {item.id === 'data-cleaning' && <Sparkles className="w-3 h-3" />}
              <span>{item.id === 'database' ? 'Structured DB' : item.id === 'web-scraping' ? 'Web Extraction' : 'AI Cleaning'}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[420px]">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-[#271B14] text-white'
                    : 'bg-[#83A47D] text-white'
                }`}
              >
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#EFE9E0] text-[#271B14] font-medium'
                    : 'bg-white border border-[#E8E2D8] text-[#271B14] shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.text}</div>
                <div className="text-[10px] text-[#A3968B] mt-1.5 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#83A47D] flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#E8E2D8] rounded-2xl px-4 py-3 shadow-xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E67246] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#83A47D] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#795745] animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-[#78685C] ml-1">Executing agent workflow...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-[#E8E2D8] bg-[#F4EFE6] flex items-center gap-2"
        >
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Ask anything or request data transform / extraction..."
            className="flex-1 bg-white border border-[#E0D8CC] rounded-full px-5 py-2.5 text-sm text-[#271B14] placeholder-[#A3968B] focus:outline-hidden focus:border-[#E67246] transition-colors"
          />
          <button
            type="submit"
            disabled={!customQuery.trim() || isProcessing}
            className="w-10 h-10 rounded-full bg-[#E67246] hover:bg-[#D46135] disabled:opacity-40 disabled:hover:bg-[#E67246] text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-xs active:scale-95"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
