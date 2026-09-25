import React from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function AgentTelemetrySteps({ steps, isLive = false, agentName = 'Data Agent' }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-[#FAF7F2] border border-[#EBE4D8] rounded-2xl p-4 my-3 flex flex-col gap-2.5">
      <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#271B14]">
          <Sparkles className="w-3.5 h-3.5 text-[#E67246]" />
          <span>Autonomous Execution Telemetry ({agentName})</span>
        </div>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[#7E9C79]/15 text-[#5F7C5A] font-semibold flex items-center gap-1">
          {isLive ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Synthesizing...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3 h-3 text-[#7E9C79]" />
              <span>Verified 100%</span>
            </>
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#E8E2D8] text-[11px] font-semibold text-[#271B14]"
          >
            <div className="w-4 h-4 rounded-full bg-[#7E9C79] text-white flex items-center justify-center text-[9px] shrink-0 font-bold">
              ✓
            </div>
            <span className="truncate">{typeof step === 'string' ? step : step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
