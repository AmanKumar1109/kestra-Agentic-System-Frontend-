import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Database, Globe, Sparkles, Layers, Cpu, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Database,
    title: 'Zero-ETL Database Chat',
    desc: 'Connect PostgreSQL, MySQL, Snowflake, or ClickHouse. Query with natural language and get instantaneous, indexed analytics.',
    tag: 'SQL & NoSQL',
    color: '#E67246',
    bgLight: 'bg-[#E67246]/10',
    border: 'border-[#E67246]/30',
  },
  {
    icon: Globe,
    title: 'Adaptive Web Scraper',
    desc: 'Bypass captchas, dynamic DOM rendering, and shadow trees. Transform any webpage into structured JSON schemas automatically.',
    tag: 'Automated Crawling',
    color: '#83A47D',
    bgLight: 'bg-[#83A47D]/10',
    border: 'border-[#83A47D]/30',
  },
  {
    icon: Sparkles,
    title: 'Auto-Clean & Deduplication',
    desc: 'Detect anomalies, normalize temporal variations, handle missing keys, and enrich records with agentic intelligence.',
    tag: 'ML Pipelines',
    color: '#795745',
    bgLight: 'bg-[#795745]/10',
    border: 'border-[#795745]/30',
  },
];

export default function FeaturesSection({ onSelectFeature }) {
  const sectionRef = useRef(null);

  return (
    <section id="features" ref={sectionRef} className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9E0] text-[#795745] text-xs font-semibold uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5" />
          Autonomous Multi-Agent Architecture
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl text-[#271B14] font-semibold tracking-tight">
          Everything You Need to Unlock Unstructured & Structured Data
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {FEATURES.map((feat, idx) => {
          const IconComponent = feat.icon;
          return (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-xs border border-[#E8E2D8] rounded-3xl p-7 sm:p-8 hover:shadow-[0_20px_40px_-15px_rgba(39,27,20,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl ${feat.bgLight} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    style={{ color: feat.color }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EFE9E0] text-[#78685C]">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-semibold text-[#271B14] mb-3">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#78685C] leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F2ECE4] flex items-center justify-between text-xs font-medium text-[#271B14]">
                <span className="flex items-center gap-1.5 text-[#83A47D]">
                  <ShieldCheck className="w-4 h-4" /> 99.9% Pipeline SLA
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-200 text-[#795745]">
                  Explore →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
