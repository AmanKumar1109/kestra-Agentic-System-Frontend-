import React from 'react';
import { Bot, Globe, ShieldCheck, Database, ArrowRight, Sparkles, CheckCircle2, Terminal } from 'lucide-react';

export default function PipelineFlowCanvas({ activeAgent, isProcessing, onSwitchToChat }) {
  const nodes = [
    {
      id: 'input',
      title: 'Prompt Ingestion',
      subtitle: 'Natural Language Decomposition',
      icon: Sparkles,
      status: 'Active',
      color: '#E67246',
      badge: 'Intent Classified',
    },
    {
      id: 'orchestrator',
      title: 'Kestra Orchestrator',
      subtitle: 'Dynamic DAG Routing',
      icon: Bot,
      status: isProcessing ? 'Processing' : 'Completed',
      color: '#795745',
      badge: 'DAG Ready',
    },
    {
      id: 'agent',
      title: activeAgent.name,
      subtitle: activeAgent.tagline,
      icon: activeAgent.icon || Globe,
      status: isProcessing ? 'Executing' : 'Completed',
      color: activeAgent.color || '#7E9C79',
      badge: activeAgent.badgeText || 'Agent Fleet',
    },
    {
      id: 'normalizer',
      title: 'Provenance & Normalizer',
      subtitle: 'Schema Auto-inference & DOM Tracing',
      icon: ShieldCheck,
      status: isProcessing ? 'Queued' : '100% Verified',
      color: '#7E9C79',
      badge: 'Zero-ETL',
    },
    {
      id: 'output',
      title: 'Structured Output Hub',
      subtitle: 'PostgreSQL, CSV, JSON & Webhooks',
      icon: Database,
      status: isProcessing ? 'Queued' : 'Ready to Export',
      color: '#271B14',
      badge: 'Multi-Destination',
    },
  ];

  return (
    <div className="w-full h-full bg-[#FAFAFA] flex flex-col p-6 sm:p-10 overflow-y-auto">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 shadow-xs mb-2">
            <span className="w-2 h-2 rounded-full bg-[#7E9C79] animate-pulse" />
            <span>Autonomous DAG Execution Canvas</span>
          </div>
          <h2 className="font-heading-hero text-2xl sm:text-3xl font-bold text-neutral-900">
            Real-time Agent Workflow Graph
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
            Live directed acyclic graph (DAG) tracking multi-agent execution, proxy rotation, headless DOM extraction, and schema normalization.
          </p>
        </div>

        <button
          onClick={onSwitchToChat}
          className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer w-fit"
        >
          <span>Return to Chat</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Nodes Flow Diagram */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-4 relative my-auto py-6">
        {nodes.map((node, idx) => {
          const IconComp = node.icon;
          const isLast = idx === nodes.length - 1;

          return (
            <div key={node.id} className="flex flex-col items-center w-full">
              {/* Card Node */}
              <div className="w-full bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: node.color }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-sm sm:text-base text-neutral-900">
                        {node.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
                        {node.badge}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{node.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 ${
                      node.status === 'Processing' || node.status === 'Executing'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{node.status}</span>
                  </span>
                </div>
              </div>

              {/* Connecting Pulse Line */}
              {!isLast && (
                <div className="flex flex-col items-center my-1.5">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-neutral-300 via-[#7E9C79] to-neutral-300 relative">
                    <div className="w-2 h-2 rounded-full bg-[#7E9C79] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 animate-ping" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
