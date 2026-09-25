import React from 'react';
import { Database, FileSpreadsheet, Download, ExternalLink, Play, Check } from 'lucide-react';
import { HISTORICAL_DATASETS, SAMPLE_DATASET_ROWS } from '../../data/datasetsData';

export default function DatasetDashboardView({ onExportDataset, onRerunPipeline, onInspectSource }) {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#FAFAFA] overflow-y-auto p-6 sm:p-10 lg:p-12">
      <div className="max-w-6xl mx-auto w-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
              <Database className="w-3.5 h-3.5 text-[#E67246]" />
              <span>Dataset & Provenance Hub</span>
            </div>
            <h1 className="font-heading-hero text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Collected Datasets & Active Workflows
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 max-w-xl">
              Inspect historical extraction jobs, review traceable source links, monitor scheduled cadences, and export data with 1-click.
            </p>
          </div>
        </div>

        {/* Vibrant Colored Datasets List */}
        <div className="space-y-6 pb-12">
          {HISTORICAL_DATASETS.map((ds) => {
            const cardBg = ds.color || '#7E9C79';
            return (
              <div
                key={ds.id}
                style={{ backgroundColor: cardBg }}
                className="rounded-[26px] p-6 sm:p-8 shadow-[0_14px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.22)] transition-all duration-300 flex flex-col gap-6 text-white border border-white/20 relative overflow-hidden group"
              >
                {/* Subtle Ambient Light Glow Overlay */}
                <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

                {/* Dataset Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:scale-105">
                      <FileSpreadsheet className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                          {ds.name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-2xs">
                          {ds.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/85 mt-1.5 font-medium">
                        <span>Sources: <strong className="text-white font-semibold">{ds.sources}</strong></span>
                        <span>•</span>
                        <span>Cadence: <strong className="text-white font-semibold">{ds.schedule}</strong></span>
                        <span>•</span>
                        <span>Confidence: <strong className="text-white font-semibold">{ds.confidence}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Solid White Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onExportDataset('csv')}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-900 flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV</span>
                    </button>
                    <button
                      onClick={() => onExportDataset('json')}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-900 flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>JSON</span>
                    </button>
                    <button
                      onClick={() => onRerunPipeline(ds)}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Rerun Workflow</span>
                    </button>
                  </div>
                </div>

                {/* Frosted Glass Sample Table Preview */}
                <div className="border border-white/20 rounded-2xl overflow-x-auto bg-black/10 backdrop-blur-sm relative z-10">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/15 border-b border-white/20 text-white font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">Entity / Item</th>
                        <th className="py-2.5 px-4">Extracted Value</th>
                        <th className="py-2.5 px-4">Category</th>
                        <th className="py-2.5 px-4">Source Link</th>
                        <th className="py-2.5 px-4 text-right">Validation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-white/90">
                      {SAMPLE_DATASET_ROWS.map((row) => (
                        <tr key={row.id} className="hover:bg-white/10 transition-colors">
                          <td className="py-2.5 px-4 font-semibold text-white">{row.title}</td>
                          <td className="py-2.5 px-4 font-mono font-bold text-white">{row.value}</td>
                          <td className="py-2.5 px-4 text-white/80">{row.category}</td>
                          <td className="py-2.5 px-4">
                            <button
                              onClick={() => onInspectSource(row)}
                              className="text-white hover:underline flex items-center gap-1 font-mono text-[11.5px] cursor-pointer"
                            >
                              <span>{row.source.replace('https://', '')}</span>
                              <ExternalLink className="w-3 h-3 text-white/70" />
                            </button>
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10.5px] font-bold backdrop-blur-md border border-white/30 shadow-2xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                              {row.confidence} Verified
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
