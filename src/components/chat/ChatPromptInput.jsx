import React from 'react';
import { Sparkles, Paperclip, Clock, Send, Lightbulb, SearchCode } from 'lucide-react';

export default function ChatPromptInput({
  inputQuery,
  setInputQuery,
  onSend,
  isProcessing,
  activeAgentName,
  onOpenSchedule,
  onOpenExport,
}) {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent shrink-0 w-full z-20">
      <div className="max-w-4xl mx-auto bg-[#FAF7F2] border border-[#E2DAD0] rounded-[24px] p-3.5 sm:p-4 shadow-[0_10px_30px_-10px_rgba(39,27,20,0.08)] flex flex-col gap-2.5">
        {/* Input Textarea */}
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#7E9C79] mt-2.5 ml-1 shrink-0" />
          <textarea
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            rows={2}
            placeholder={`Describe data requirement for [${activeAgentName}] in plain English...`}
            className="w-full resize-none border-none outline-hidden bg-transparent text-sm text-[#271B14] placeholder-[#A3968B] py-1.5"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8E2D8]/70">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              title="Attach target schema or URL list"
              className="p-1.5 rounded-lg bg-white hover:bg-[#EFE9E0] text-[#78685C] border border-[#E8E2D8] transition-colors cursor-pointer"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onOpenSchedule}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white hover:bg-[#EFE9E0] text-[#795745] border border-[#E8E2D8] transition-all cursor-pointer shadow-2xs"
            >
              <Clock className="w-3.5 h-3.5 text-[#7E9C79]" />
              <span>Schedule Cron</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/60 text-[11px] text-[#78685C] border border-[#E8E2D8]/60 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7E9C79]" />
              <span>Anti-bot & Dynamic DOM Enabled</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSend()}
            disabled={!inputQuery.trim() || isProcessing}
            className="px-5 py-1.5 rounded-full bg-[#7E9C79] hover:bg-[#6C8E66] disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>Execute Pipeline</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
