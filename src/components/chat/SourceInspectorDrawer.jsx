import React from 'react';
import { X, ExternalLink, ShieldCheck, Code, Globe, Clock, Hash } from 'lucide-react';

export default function SourceInspectorDrawer({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-[#271B14]/30 backdrop-blur-2xs" />

      {/* Slide-in Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 border-l border-[#E8E2D8] overflow-y-auto">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#7E9C79] text-white flex items-center justify-center shadow-xs">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading-hero font-bold text-base text-[#271B14]">
                  Source Provenance Inspector
                </h3>
                <p className="text-[11px] text-[#78685C]">
                  Traceable extraction metadata & verification
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] flex items-center justify-center text-[#78685C] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[10.5px] font-bold uppercase text-[#A3968B] block mb-1">
                Extracted Entity
              </span>
              <p className="text-sm font-bold text-[#271B14] bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
                {item.title}
              </p>
            </div>

            <div>
              <span className="text-[10.5px] font-bold uppercase text-[#A3968B] block mb-1">
                Parsed Metric / Value
              </span>
              <p className="font-mono text-base font-bold text-[#E67246] bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
                {item.value}
              </p>
            </div>

            <div>
              <span className="text-[10.5px] font-bold uppercase text-[#A3968B] block mb-1">
                Original Verified URL
              </span>
              <a
                href={item.source}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#7E9C79] bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8] flex items-center justify-between hover:bg-[#EFE9E0] transition-colors"
              >
                <span className="truncate">{item.source}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1" />
              </a>
            </div>

            {item.rawSnippet && (
              <div>
                <span className="text-[10.5px] font-bold uppercase text-[#A3968B] block mb-1 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" />
                  DOM Selector & Text Snippet
                </span>
                <div className="bg-[#271B14] text-[#D8CCC0] font-mono p-3 rounded-xl text-[11px] overflow-x-auto">
                  {item.rawSnippet}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
                <span className="text-[10px] text-[#78685C] block">Confidence Score</span>
                <span className="text-xs font-bold text-[#7E9C79] flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {item.confidence}
                </span>
              </div>
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
                <span className="text-[10px] text-[#78685C] block">Extracted At</span>
                <span className="text-xs font-bold text-[#271B14] flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#795745]" />
                  {item.verifiedAt || 'Live'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E2D8]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#271B14] hover:bg-[#3D291D] text-white text-xs font-semibold cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
