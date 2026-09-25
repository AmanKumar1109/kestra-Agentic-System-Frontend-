import React from 'react';
import { Database, FileSpreadsheet, Download, ExternalLink, Play } from 'lucide-react';
import { HISTORICAL_DATASETS, SAMPLE_DATASET_ROWS } from '../../data/datasetsData';

export default function DatasetDashboardView({ onExportDataset, onRerunPipeline, onInspectSource }) {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#FAFAFA] overflow-y-auto p-6 sm:p-10 lg:p-12">
      <div className="max-w-6xl mx-auto w-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
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

        {/* Datasets List */}
        <div className="space-y-5 pb-12">
          {HISTORICAL_DATASETS.map((ds) => (
            <div
              key={ds.id}
              className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col gap-5"
            >
              {/* Dataset Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-neutral-900">
                      {ds.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mt-1">
                      <span>Sources: <strong className="text-neutral-800">{ds.sources}</strong></span>
                      <span>•</span>
                      <span>Cadence: <strong className="text-emerald-600">{ds.schedule}</strong></span>
                      <span>•</span>
                      <span>Drift Status: <strong className="text-neutral-700">{ds.schemaDrift}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onExportDataset('csv')}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={() => onExportDataset('json')}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON</span>
                  </button>
                  <button
                    onClick={() => onRerunPipeline(ds)}
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Rerun</span>
                  </button>
                </div>
              </div>

              {/* Sample Table Preview */}
              <div className="border border-neutral-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600">
                    <tr>
                      <th className="py-2.5 px-3.5 font-semibold">Entity / Item</th>
                      <th className="py-2.5 px-3.5 font-semibold">Extracted Value</th>
                      <th className="py-2.5 px-3.5 font-semibold">Category</th>
                      <th className="py-2.5 px-3.5 font-semibold">Source Link</th>
                      <th className="py-2.5 px-3.5 font-semibold">Validation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {SAMPLE_DATASET_ROWS.map((row) => (
                      <tr key={row.id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="py-2.5 px-3.5 font-medium text-neutral-900">{row.title}</td>
                        <td className="py-2.5 px-3.5 font-mono font-bold text-[#E67246]">{row.value}</td>
                        <td className="py-2.5 px-3.5 text-neutral-500">{row.category}</td>
                        <td className="py-2.5 px-3.5">
                          <button
                            onClick={() => onInspectSource(row)}
                            className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                          >
                            <span>{row.source.replace('https://', '')}</span>
                            <ExternalLink className="w-3 h-3 text-neutral-400" />
                          </button>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-semibold border border-emerald-200">
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
