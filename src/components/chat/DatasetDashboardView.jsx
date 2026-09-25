import React from 'react';
import { Database, FileSpreadsheet, Download, ExternalLink, Check, Clock, ShieldCheck, Play } from 'lucide-react';
import { HISTORICAL_DATASETS, SAMPLE_DATASET_ROWS } from '../../data/datasetsData';

export default function DatasetDashboardView({ onExportDataset, onRerunPipeline, onInspectSource }) {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#FAF7F2] overflow-y-auto p-6 sm:p-10 lg:p-12">
      <div className="max-w-6xl mx-auto w-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9E0] text-[#795745] text-xs font-bold uppercase tracking-wider mb-3">
              <Database className="w-3.5 h-3.5 text-[#E67246]" />
              Dataset Dashboard & Provenance Hub
            </div>
            <h1 className="font-heading-hero text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#271B14]">
              Collected Datasets & Active Jobs
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#78685C] max-w-xl">
              Inspect historical scraping tasks, review traceable source links, monitor scheduled cadences, and export data in 1-click.
            </p>
          </div>
        </div>

        {/* Datasets List */}
        <div className="space-y-6 pb-12">
          {HISTORICAL_DATASETS.map((ds) => (
            <div
              key={ds.id}
              className="bg-white border border-[#E8E2D8] rounded-[28px] p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(39,27,20,0.06)] flex flex-col gap-6"
            >
              {/* Dataset Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center text-[#795745]">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading-hero font-bold text-lg sm:text-xl text-[#271B14]">
                      {ds.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#78685C] mt-1">
                      <span>Sources: <strong className="text-[#271B14]">{ds.sources}</strong></span>
                      <span>•</span>
                      <span>Cadence: <strong className="text-[#7E9C79]">{ds.schedule}</strong></span>
                      <span>•</span>
                      <span>Drift Status: <strong className="text-[#795745]">{ds.schemaDrift}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onExportDataset('csv')}
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] text-xs font-semibold text-[#271B14] border border-[#E8E2D8] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#795745]" />
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={() => onExportDataset('json')}
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] text-xs font-semibold text-[#271B14] border border-[#E8E2D8] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#795745]" />
                    <span>JSON</span>
                  </button>
                  <button
                    onClick={() => onRerunPipeline(ds)}
                    className="px-4 py-1.5 rounded-full bg-[#271B14] hover:bg-[#3D291D] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Rerun Workflow</span>
                  </button>
                </div>
              </div>

              {/* Sample Table Preview */}
              <div className="border border-[#EBE4D8] rounded-2xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#EBE4D8] text-[#78685C]">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Title / Extracted Item</th>
                      <th className="py-2.5 px-4 font-semibold">Extracted Value</th>
                      <th className="py-2.5 px-4 font-semibold">Category</th>
                      <th className="py-2.5 px-4 font-semibold">Traceable Source Provenance</th>
                      <th className="py-2.5 px-4 font-semibold">Validation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE4]">
                    {SAMPLE_DATASET_ROWS.map((row) => (
                      <tr key={row.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-[#271B14]">{row.title}</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-[#E67246]">{row.value}</td>
                        <td className="py-2.5 px-4 text-[#78685C]">{row.category}</td>
                        <td className="py-2.5 px-4">
                          <button
                            onClick={() => onInspectSource(row)}
                            className="text-[#7E9C79] hover:underline flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                          >
                            <span>{row.source.replace('https://', '')}</span>
                            <ExternalLink className="w-3 h-3 text-[#A3968B]" />
                          </button>
                        </td>
                        <td className="py-2.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7E9C79]/15 text-[#5F7C5A] text-[10.5px] font-semibold">
                            <Check className="w-3 h-3" />
                            {row.confidence} Verified
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
