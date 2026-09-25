import React from 'react';
import { Home, Compass, Database, Plus, Bot, MessageSquare, ArrowLeft, Cpu } from 'lucide-react';

export default function ChatSidebar({
  currentView,
  onSelectView,
  onNewSession,
  onBackToHome,
  recentChats,
  onSelectHistoryChat,
  hasActiveMessages,
}) {
  return (
    <aside className="w-64 sm:w-72 md:w-80 bg-[#FAF7F2] border-r border-[#E8E2D8] flex flex-col justify-between shrink-0 h-full overflow-hidden transition-all duration-300">
      {/* Top Workspace Identity & Main Navigation */}
      <div className="p-4 border-b border-[#E8E2D8]/60 flex flex-col gap-3 shrink-0">
        {/* Back to Homepage Button & New Session Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE9E0] hover:bg-[#E4DDD2] text-[#795745] font-semibold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </button>

          <button
            onClick={onNewSession}
            title="New Clean Session"
            className="p-1.5 rounded-lg bg-[#EFE9E0] hover:bg-[#E4DDD2] text-[#795745] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Logo Title */}
        <div className="flex items-center gap-2 pt-1">
          <div className="w-8 h-8 rounded-xl bg-[#795745] text-white flex items-center justify-center shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <span className="font-heading-hero font-bold text-base text-[#271B14]">
            DataWeave AI
          </span>
        </div>

        {/* View Switchers */}
        <div className="flex flex-col gap-1.5 pt-1">
          {/* 1. Prompt-to-Pipeline (Chat Workspace) */}
          <button
            onClick={() => onSelectView('chat')}
            className={`flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'chat'
                ? 'bg-white text-[#271B14] shadow-xs border border-[#E8E2D8]'
                : 'text-[#78685C] hover:bg-white/60 hover:text-[#271B14]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-[#795745]" />
              <span>Prompt-to-Pipeline</span>
            </div>
            {hasActiveMessages && <span className="w-2 h-2 rounded-full bg-[#E67246]" />}
          </button>

          {/* 2. Explore AI Agents */}
          <button
            onClick={() => onSelectView('explore')}
            className={`flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'explore'
                ? 'bg-[#7E9C79] text-white shadow-xs'
                : 'bg-white/70 text-[#271B14] hover:bg-white border border-[#E8E2D8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Compass className={`w-4 h-4 ${currentView === 'explore' ? 'text-white' : 'text-[#7E9C79]'}`} />
              <span>Explore AI Agents</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                currentView === 'explore' ? 'bg-white/20 text-white' : 'bg-[#EFE9E0] text-[#795745]'
              }`}
            >
              6 Ready
            </span>
          </button>

          {/* 3. Centralized Datasets Dashboard */}
          <button
            onClick={() => onSelectView('datasets')}
            className={`flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'datasets'
                ? 'bg-[#271B14] text-white shadow-xs'
                : 'text-[#78685C] hover:bg-white/60 hover:text-[#271B14]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-[#E67246]" />
              <span>Dataset Dashboard</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#EFE9E0] text-[#78685C] font-mono">
              3 Active
            </span>
          </button>
        </div>
      </div>

      {/* Middle: Scrollable History List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#A3968B] px-2 py-1 block">
          Recent Workflows ({recentChats.length})
        </span>
        {recentChats.map((chat, idx) => (
          <button
            key={idx}
            onClick={() => onSelectHistoryChat(chat)}
            className="w-full text-left text-xs text-[#78685C] hover:text-[#271B14] hover:bg-white px-3 py-2 rounded-xl truncate flex items-center gap-2 transition-colors group cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#A3968B] group-hover:text-[#7E9C79] shrink-0" />
            <span className="truncate">{chat}</span>
          </button>
        ))}
      </div>

      {/* Bottom User Profile */}
      <div className="p-3.5 border-t border-[#E8E2D8] bg-[#FAF7F2] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#E67246] text-white flex items-center justify-center text-xs font-bold">
            J
          </div>
          <div>
            <p className="text-xs font-semibold text-[#271B14]">Judha Dev</p>
            <p className="text-[10px] text-[#A3968B]">Enterprise Agent Fleet</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
