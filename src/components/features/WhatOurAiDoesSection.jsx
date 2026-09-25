import React from 'react';
import { Database, Sparkles, Brain, Zap } from 'lucide-react';

const CAPABILITIES = [
  {
    id: 'extraction',
    tag: 'Autonomous Crawling',
    title: 'Instant Web & API Mining',
    desc: 'Extract clean tabular schemas from complex, dynamic JS websites and messy endpoints without writing custom scrapers.',
    icon: Database,
  },
  {
    id: 'transformation',
    tag: 'Zero-Loss Normalization',
    title: 'AI Data Cleaning & Imputation',
    desc: 'Auto-detect missing values, normalize timestamps, resolve entity conflicts, and generate semantic data dictionaries.',
    icon: Sparkles,
  },
  {
    id: 'reasoning',
    tag: 'Natural Language SQL',
    title: 'Contextual Query Engine',
    desc: 'Chat directly with your vector stores and SQL relational tables to synthesize instant reports, charts, and executive insights.',
    icon: Brain,
  },
];

export default function WhatOurAiDoesSection({ onSelectCapability }) {
  return (
    <section
      id="capabilities"
      className="sticky top-16 sm:top-20 z-20 w-full min-h-[85vh] sm:min-h-[90vh] bg-[#7E9C79] text-[#FFFDF9] py-14 sm:py-20 px-6 sm:px-12 md:px-16 lg:px-24 rounded-t-[36px] sm:rounded-t-[56px] shadow-[0_-25px_60px_rgba(0,0,0,0.4)] flex flex-col justify-center will-change-transform"
    >
      <div className="w-full max-w-[1280px] mx-auto my-auto">
        {/* Header Tag & Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs mb-3">
            <Zap className="w-3.5 h-3.5" />
            Core Capabilities
          </div>
          <h2 className="font-heading-hero text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            What Our AI Does
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/85 font-normal">
            High-performance agentic pipelines built to transform chaotic data into clean intelligence.
          </p>
        </div>

        {/* 3 White Rounded Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CAPABILITIES.map((cap) => {
            const IconComp = cap.icon;
            return (
              <div
                key={cap.id}
                onClick={() => onSelectCapability && onSelectCapability(cap.id)}
                className="group cursor-pointer bg-white text-[#271B14] rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_45px_-10px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-2 select-none"
              >
                {/* Top Badge Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-[#FAF7F2] border border-[#EBE4D8] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-2xs">
                    <IconComp className="w-6 h-6 text-[#795745]" strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FAF7F2] text-[#78685C] border border-[#EFE9E0]">
                    {cap.tag}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="mt-8">
                  <h3 className="font-heading-hero text-xl sm:text-2xl font-bold text-[#271B14] mb-2 group-hover:text-[#E67246] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#78685C]">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
