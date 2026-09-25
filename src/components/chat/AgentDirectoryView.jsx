import React, { useState } from 'react';
import { Cpu, ArrowUpRight, ShieldCheck, Check } from 'lucide-react';
import { AGENTS_CATALOG } from '../../data/agentsData';

export default function AgentDirectoryView({ selectedAgentId, onDeployAgent, onOpenChatView }) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const categories = ['All', 'Scraping', 'Mailing', 'Database', 'Cleaning', 'Document', 'Analytics'];

  const filteredCatalog = AGENTS_CATALOG.filter(
    (a) => activeCategoryFilter === 'All' || a.category === activeCategoryFilter
  );

  return (
    <main className="flex-1 flex flex-col h-full bg-[#FAFAFA] overflow-y-auto p-6 sm:p-10 lg:p-12">
      <div className="max-w-6xl mx-auto w-full flex flex-col">
        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
              <Cpu className="w-3.5 h-3.5 text-[#E67246]" />
              <span>Specialized Agent Fleet</span>
            </div>
            <h1 className="font-heading-hero text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Autonomous AI Agent Catalog
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 max-w-xl">
              Deploy multi-modal autonomous agents configured for dynamic DOM scraping, B2B email enrichment, SQL databases, and schema normalizers.
            </p>
          </div>

          <button
            onClick={onOpenChatView}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-2 w-fit transition-all cursor-pointer shadow-xs active:scale-95"
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
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vibrant Colored Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredCatalog.map((agent) => {
            const IconComp = agent.icon;
            const isCurrentlyActive = selectedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                style={{ backgroundColor: agent.color }}
                className={`rounded-[26px] p-6 sm:p-7 flex flex-col justify-between text-white shadow-[0_14px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1.5 group relative border border-white/20 overflow-hidden ${
                  isCurrentlyActive ? 'ring-4 ring-neutral-900/30 ring-offset-2' : ''
                }`}
              >
                {/* Subtle Glass Glow Overlay */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    {/* Glass Icon Container */}
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:scale-110">
                      <IconComp className="w-6 h-6" strokeWidth={2.2} />
                    </div>

                    {/* Translucent Badge */}
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-2xs">
                      {agent.badgeText}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-2 leading-tight">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-white/85 line-clamp-3 leading-relaxed mb-6">
                    {agent.description}
                  </p>
                </div>

                {/* Bottom Footer: Metric & White Deploy Button */}
                <div className="pt-4 border-t border-white/20 flex items-center justify-between gap-3 relative z-10">
                  <span className="text-xs font-mono font-medium text-white/95 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>{agent.metrics}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onDeployAgent(agent)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-neutral-900 hover:bg-neutral-100 flex items-center gap-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.16)] active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <span>{isCurrentlyActive ? 'Selected' : 'Deploy'}</span>
                    {isCurrentlyActive ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
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
