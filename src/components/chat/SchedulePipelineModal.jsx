import React, { useState } from 'react';
import { X, Clock, Calendar, Check, ShieldCheck, Bell } from 'lucide-react';

export default function SchedulePipelineModal({ isOpen, onClose, onScheduleSaved }) {
  const [frequency, setFrequency] = useState('weekly');
  const [time, setTime] = useState('09:00');
  const [day, setDay] = useState('Monday');
  const [notifyEmail, setNotifyEmail] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    if (onScheduleSaved) {
      onScheduleSaved({ frequency, time, day, notifyEmail });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-[#271B14]/40 backdrop-blur-xs" />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] border border-[#E8E2D8] rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#7E9C79] text-white flex items-center justify-center shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading-hero text-lg font-bold text-[#271B14]">
                Schedule Recurring Pipeline
              </h3>
              <p className="text-[11px] text-[#78685C]">
                Automate periodic data scraping and warehouse sync
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#EFE9E0] hover:bg-[#E4DDD2] flex items-center justify-center text-[#78685C] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Frequency Selector */}
        <div className="space-y-3 text-xs">
          <label className="font-bold text-[#271B14] block">Execution Cadence</label>
          <div className="grid grid-cols-3 gap-2">
            {['hourly', 'daily', 'weekly'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                className={`py-2 px-3 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                  frequency === f
                    ? 'bg-[#271B14] text-white shadow-2xs'
                    : 'bg-white border border-[#E8E2D8] text-[#78685C] hover:bg-[#EFE9E0]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {frequency === 'weekly' && (
            <div className="pt-2">
              <label className="font-semibold text-[#78685C] block mb-1">Day of Week</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full bg-white border border-[#E0D8CC] rounded-xl px-3 py-2 text-xs text-[#271B14] outline-hidden"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          )}

          <div className="pt-2">
            <label className="font-semibold text-[#78685C] block mb-1">Execution Time (UTC)</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-white border border-[#E0D8CC] rounded-xl px-3 py-2 text-xs text-[#271B14] outline-hidden"
            />
          </div>

          <label className="flex items-center gap-2 pt-2 cursor-pointer text-[#78685C]">
            <input
              type="checkbox"
              checked={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.checked)}
              className="accent-[#7E9C79] rounded w-3.5 h-3.5"
            />
            <span>Send Slack / Email notification upon completion</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8E2D8]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-[#78685C] hover:bg-[#EFE9E0] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-full bg-[#7E9C79] hover:bg-[#6C8E66] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Activate Cron Pipeline</span>
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
