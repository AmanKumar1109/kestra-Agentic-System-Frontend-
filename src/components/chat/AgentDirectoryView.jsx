import React, { useState } from 'react';
import { Cpu, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { AGENTS_CATALOG } from '../../data/agentsData';

export default function AgentDirectoryView({ selectedAgentId, onDeployAgent, onOpenChatView }) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const categories = ['All', 'Scraping', 'Mailing', 'Database', 'Cleaning', 'Document', 'Analytics'];

  const filteredCatalog = AGENTS_CATALOG.filter(
    (a) => activeCategoryFilter === 'All' || a.category === activeCategoryFilter
  );

  return (
    <main className="flex-1 flex flex-col h-full bg-[#FAF7F2] overflow-y-auto p-6 sm:p-10 lg:p-12">
      <div className="max-w-6xl mx-auto w-full flex flex-col">
        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9E0] text-[#795745] text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5 text-[#E67246]" />
              Autonomous Agent Fleet
            </div>
            <h1 className="font-heading-hero text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#271B14]">
              Explore Specialized AI Agents
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#78685C] max-w-xl">
              Deploy multi-modal autonomous agents designed for dynamic web scraping, cold outreach, SQL databases, and schema normalizers.
            </p>
          </div>

          <button
            onClick={onOpenChatView}
            className="px-5 py-2.5 rounded-full bg-[#271B14] hover:bg-[#3D291D] text-white text-xs font-semibold flex items-center gap-2 w-fit transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <span>Open Active Pipeline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-[#271B14] text-white shadow-2xs'
                  : 'bg-white border border-[#E8E2D8] text-[#78685C] hover:text-[#271B14] hover:bg-[#EFE9E0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredCatalog.map((agent) => {
            const IconComp = agent.icon;
            const isCurrentlyActive = selectedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                className="bg-white border border-[#E8E2D8] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(39,27,20,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(39,27,20,0.12)] transition-all duration-300 hover:-translate-y-1.5 group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-2xs transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: agent.color }}
                    >
                      <IconComp className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#78685C] border border-[#E8E2D8]">
                      {agent.badgeText}
                    </span>
                  </div>

                  <h3 className="font-heading-hero text-xl font-bold text-[#271B14] mb-1.5 group-hover:text-[#E67246] transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#795745] mb-3">
                    {agent.tagline}
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#78685C] leading-relaxed mb-6">
                    {agent.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE4] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#83A47D] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {agent.metrics}
                  </span>

                  <button
                    onClick={() => onDeployAgent(agent)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                      isCurrentlyActive
                        ? 'bg-[#7E9C79] text-white shadow-2xs'
                        : 'bg-[#FAF7F2] hover:bg-[#271B14] text-[#271B14] hover:text-white border border-[#E8E2D8]'
                    }`}
                  >
                    <span>{isCurrentlyActive ? 'Active Agent' : 'Deploy & Chat'}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
