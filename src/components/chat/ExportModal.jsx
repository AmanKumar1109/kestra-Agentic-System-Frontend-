import React, { useState } from 'react';
import { X, Download, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { INTEGRATION_DESTINATIONS } from '../../data/templatesData';

export default function ExportModal({ isOpen, onClose, onExportComplete }) {
  const [selectedDestination, setSelectedDestination] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExecuteExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      if (onExportComplete) {
        onExportComplete(selectedDestination);
      }
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-[#271B14]/40 backdrop-blur-xs" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#E8E2D8] rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-4">
          <div>
            <h3 className="font-heading-hero text-xl font-bold text-[#271B14]">
              Export & Stream Dataset
            </h3>
            <p className="text-xs text-[#78685C]">
              Select a target destination or warehouse connector
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EFE9E0] hover:bg-[#E4DDD2] flex items-center justify-center text-[#78685C] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Destination List */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {INTEGRATION_DESTINATIONS.map((dest) => {
            const Icon = dest.icon;
            const isSelected = selectedDestination === dest.id;
            return (
              <div
                key={dest.id}
                onClick={() => setSelectedDestination(dest.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-white border-[#271B14] shadow-xs'
                    : 'bg-white/60 border-[#E8E2D8] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-2xs"
                    style={{ backgroundColor: dest.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#271B14]">{dest.name}</h4>
                    <p className="text-[11px] text-[#78685C]">{dest.desc}</p>
                  </div>
                </div>

                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-[#271B14] bg-[#271B14] text-white' : 'border-[#DDD4C6]'
                }`}>
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D8]">
          <span className="text-[11px] text-[#83A47D] flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Schema Validated
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#78685C] hover:bg-[#EFE9E0] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleExecuteExport}
              disabled={isExporting}
              className="px-5 py-2 rounded-full bg-[#E67246] hover:bg-[#D46135] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isExporting ? 'Syncing...' : 'Confirm Export'}
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
