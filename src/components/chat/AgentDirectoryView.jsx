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

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
          {filteredCatalog.map((agent) => {
            const IconComp = agent.icon;
            const isCurrentlyActive = selectedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                className={`bg-white border rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group relative ${
                  isCurrentlyActive ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: agent.color }}
                    >
                      <IconComp className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                      {agent.badgeText}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-neutral-900 mb-1 group-hover:text-neutral-700 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
                    {agent.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{agent.metrics}</span>
                  </span>

                  <button
                    onClick={() => onDeployAgent(agent)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCurrentlyActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800'
                    }`}
                  >
                    <span>{isCurrentlyActive ? 'Selected' : 'Deploy'}</span>
                    {isCurrentlyActive ? <Check className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
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
