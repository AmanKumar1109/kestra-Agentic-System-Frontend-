import React from 'react';
import { MessageSquare, Plus, ArrowLeft, Bot, Compass, Database, GitBranch, Terminal, Sparkles } from 'lucide-react';

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
    <aside className="w-64 sm:w-72 bg-white border-r border-neutral-200 flex flex-col justify-between shrink-0 h-full overflow-hidden transition-all select-none">
      {/* Top Workspace Identity & Navigation */}
      <div className="p-4 border-b border-neutral-100 flex flex-col gap-3 shrink-0">
        {/* Back to Homepage Button & New Session Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </button>

          <button
            onClick={onNewSession}
            title="Start New Pipeline"
            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Logo Title */}
        <div className="flex items-center gap-2.5 pt-1">
          <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-[#E67246]" />
          </div>
          <div>
            <span className="font-heading-hero font-bold text-base text-neutral-900 leading-none block">
              Kestra AI
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">v2.4 Enterprise</span>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex flex-col gap-1 pt-2">
          {/* 1. Prompt-to-Pipeline (Chat Workspace) */}
          <button
            onClick={() => onSelectView('chat')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'chat'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-4 h-4" />
              <span>Prompt Pipeline</span>
            </div>
            {hasActiveMessages && <span className="w-2 h-2 rounded-full bg-[#E67246]" />}
          </button>

          {/* 2. Visual DAG Graph */}
          <button
            onClick={() => onSelectView('graph')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'graph'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <GitBranch className="w-4 h-4 text-[#7E9C79]" />
              <span>Visual DAG Graph</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-mono">
              Live
            </span>
          </button>

          {/* 3. Live Terminal Logs */}
          <button
            onClick={() => onSelectView('terminal')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'terminal'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Live Terminal</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono">
              Stdout
            </span>
          </button>

          {/* 4. Explore AI Agents Hub */}
          <button
            onClick={() => onSelectView('explore')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'explore'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-[#E67246]" />
              <span>Explore 6 Agents</span>
            </div>
          </button>

          {/* 5. Datasets Dashboard */}
          <button
            onClick={() => onSelectView('datasets')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'datasets'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-amber-600" />
              <span>Dataset Dashboard</span>
            </div>
          </button>
        </div>
      </div>

      {/* Middle: Recent Pipelines */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1 block">
          Recent Runs ({recentChats.length})
        </span>
        {recentChats.map((chat, idx) => (
          <button
            key={idx}
            onClick={() => onSelectHistoryChat(chat)}
            className="w-full text-left text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 px-3 py-2 rounded-xl truncate flex items-center gap-2 transition-colors group cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 shrink-0" />
            <span className="truncate">{chat}</span>
          </button>
        ))}
      </div>

      {/* Bottom User Status */}
      <div className="p-3.5 border-t border-neutral-100 bg-neutral-50/70 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
            K
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-900">Kestra Master Node</p>
            <p className="text-[10px] text-emerald-600 font-medium">● Cluster Connected</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
