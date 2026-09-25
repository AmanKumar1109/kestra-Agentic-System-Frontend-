import React, { useState } from 'react';
import { ExternalLink, Check, Download, Search, ShieldCheck } from 'lucide-react';

export default function TraceableDataTable({ rows, onInspectSource, onOpenExport }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = (rows || []).filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border border-[#EBE4D8] rounded-2xl overflow-hidden bg-white mt-3 flex flex-col">
      {/* Table Header Controls */}
      <div className="p-3 bg-[#FAF7F2] border-b border-[#EBE4D8] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#A3968B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search table rows..."
              className="bg-white border border-[#E0D8CC] rounded-xl pl-8 pr-3 py-1 text-xs text-[#271B14] placeholder-[#A3968B] focus:outline-hidden focus:border-[#7E9C79]"
            />
          </div>
          <span className="text-[11px] text-[#78685C] font-semibold">
            {filteredRows.length} Provenance Items
          </span>
        </div>

        <button
          onClick={onOpenExport}
          className="px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] text-xs font-semibold text-[#271B14] border border-[#E8E2D8] flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-95"
        >
          <Download className="w-3 h-3 text-[#795745]" />
          <span>Export / Push Dataset</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF7F2] border-b border-[#EBE4D8] text-[#78685C]">
            <tr>
              <th className="py-2.5 px-3.5 font-semibold">Title / Entity</th>
              <th className="py-2.5 px-3.5 font-semibold">Extracted Value</th>
              <th className="py-2.5 px-3.5 font-semibold">Category</th>
              <th className="py-2.5 px-3.5 font-semibold">Traceable Source URL</th>
              <th className="py-2.5 px-3.5 font-semibold">Provenance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2ECE4]">
            {filteredRows.map((row) => (
              <tr key={row.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                <td className="py-2.5 px-3.5 font-semibold text-[#271B14]">{row.title}</td>
                <td className="py-2.5 px-3.5 font-mono font-bold text-[#E67246]">{row.value}</td>
                <td className="py-2.5 px-3.5 text-[#78685C]">{row.category}</td>
                <td className="py-2.5 px-3.5 font-mono text-[11px] text-[#7E9C79]">
                  <button
                    onClick={() => onInspectSource && onInspectSource(row)}
                    className="hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{row.source.replace('https://', '')}</span>
                    <ExternalLink className="w-3 h-3 text-[#A3968B]" />
                  </button>
                </td>
                <td className="py-2.5 px-3.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7E9C79]/15 text-[#5F7C5A] text-[10px] font-semibold">
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
  );
}
