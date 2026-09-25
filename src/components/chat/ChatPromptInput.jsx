import React from 'react';
import { Sparkles, Paperclip, Clock, ArrowUp, Compass } from 'lucide-react';

export default function ChatPromptInput({
  inputQuery,
  setInputQuery,
  onSend,
  isProcessing,
  activeAgentName,
  onOpenSchedule,
  onOpenExplore,
}) {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent shrink-0 w-full z-20">
      <div className="max-w-3xl mx-auto bg-white border border-[#E6DFD4] rounded-[28px] p-3 sm:p-4 shadow-[0_12px_36px_rgba(39,27,20,0.06)] transition-all focus-within:border-[#795745]/40 focus-within:shadow-[0_16px_40px_rgba(39,27,20,0.09)]">
        {/* Input Textarea */}
        <div className="px-1.5 pt-1">
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
            placeholder={`Describe what data to collect, scrape, or extract...`}
            className="w-full resize-none border-none outline-hidden bg-transparent text-sm text-[#271B14] placeholder-[#A3968B] leading-relaxed font-sans"
          />
        </div>

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between gap-2 pt-2 mt-1 border-t border-[#F2ECE4]">
          <div className="flex items-center gap-2">
            {/* Active Agent Badge */}
            {activeAgentName && (
              <button
                type="button"
                onClick={onOpenExplore}
                title="Switch Agent"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] text-[#795745] border border-[#E8E2D8] text-xs font-semibold transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#E67246]" />
                <span>{activeAgentName}</span>
              </button>
            )}

            {/* Schedule Cron Button */}
            <button
              type="button"
              onClick={onOpenSchedule}
              title="Schedule Recurring Pipeline"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#FAF7F2] text-[#78685C] hover:text-[#271B14] border border-[#E8E2D8] text-xs font-medium transition-all cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#7E9C79]" />
              <span className="hidden sm:inline">Schedule</span>
            </button>
          </div>

          {/* Send / Execute Button */}
          <button
            type="button"
            onClick={() => onSend()}
            disabled={!inputQuery.trim() || isProcessing}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              inputQuery.trim() && !isProcessing
                ? 'bg-[#271B14] text-white hover:bg-[#3D291D] shadow-xs active:scale-90'
                : 'bg-[#EFE9E0] text-[#A3968B] cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
