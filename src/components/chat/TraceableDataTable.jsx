import React, { useState } from 'react';
import { ExternalLink, Check, Download, Search, Code, Table as TableIcon, Copy } from 'lucide-react';

export default function TraceableDataTable({ rows, onInspectSource, onOpenExport }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'json'
  const [copiedJson, setCopiedJson] = useState(false);

  const filteredRows = (rows || []).filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(filteredRows, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-white mt-3 flex flex-col shadow-xs">
      {/* Header Bar */}
      <div className="px-4 py-2.5 bg-neutral-50/90 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('json')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'json'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
          </div>

          {/* Search Box */}
          {viewMode === 'table' && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter entities..."
                className="bg-white border border-neutral-200 rounded-lg pl-7 pr-2.5 py-1 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-400"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'json' ? (
            <button
              type="button"
              onClick={handleCopyJson}
              className="px-3 py-1 rounded-lg bg-white hover:bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copiedJson ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedJson ? 'Copied JSON' : 'Copy JSON'}</span>
            </button>
          ) : (
            <span className="text-[11.5px] text-neutral-500 font-medium hidden sm:inline">
              {filteredRows.length} extracted records
            </span>
          )}

          <button
            type="button"
            onClick={onOpenExport}
            className="px-3 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
          >
            <Download className="w-3 h-3" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'json' ? (
        <div className="bg-neutral-900 text-neutral-200 p-4 font-mono text-xs max-h-72 overflow-y-auto leading-relaxed">
          <pre>{JSON.stringify(filteredRows, null, 2)}</pre>
        </div>
      ) : (
        <div className="overflow-x-auto max-h-72 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 sticky top-0 backdrop-blur-xs">
              <tr>
                <th className="py-2.5 px-3.5 font-semibold">Entity / Title</th>
                <th className="py-2.5 px-3.5 font-semibold">Extracted Value</th>
                <th className="py-2.5 px-3.5 font-semibold">Category</th>
                <th className="py-2.5 px-3.5 font-semibold">Source Link</th>
                <th className="py-2.5 px-3.5 font-semibold text-right">Provenance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-2.5 px-3.5 font-medium text-neutral-900">{row.title}</td>
                  <td className="py-2.5 px-3.5 font-mono font-semibold text-[#E67246]">{row.value}</td>
                  <td className="py-2.5 px-3.5 text-neutral-500">{row.category}</td>
                  <td className="py-2.5 px-3.5 font-mono text-[11px] text-blue-600">
                    <button
                      onClick={() => onInspectSource && onInspectSource(row)}
                      className="hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{row.source.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </button>
                  </td>
                  <td className="py-2.5 px-3.5 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                      <Check className="w-2.5 h-2.5" />
                      {row.confidence} Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
