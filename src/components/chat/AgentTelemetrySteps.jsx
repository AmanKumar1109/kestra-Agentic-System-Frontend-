import React from 'react';
import { Check, Loader2, Cpu } from 'lucide-react';

export default function AgentTelemetrySteps({ steps, isLive = false, agentName = 'Data Agent' }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-[#FAF7F2] border border-[#EAE3D8] rounded-2xl p-3.5 my-3 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E8E2D8]">
        <div className="flex items-center gap-1.5 font-semibold text-[#271B14]">
          <Cpu className="w-3.5 h-3.5 text-[#E67246]" />
          <span>Execution Telemetry • {agentName}</span>
        </div>
        <span className="text-[11px] font-medium text-[#5F7C5A] flex items-center gap-1">
          {isLive ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Processing steps...</span>
            </>
          ) : (
            <>
              <Check className="w-3.5 h-3.5 text-[#7E9C79]" />
              <span>Completed</span>
            </>
          )}
        </span>
      </div>

      {/* Stepper Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
        {steps.map((step, idx) => {
          const stepName = typeof step === 'string' ? step : step.name;
          return (
            <div
              key={idx}
              className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#E8E2D8] text-[11px] font-medium text-[#271B14] shadow-2xs"
            >
              <div className="w-4 h-4 rounded-full bg-[#7E9C79] text-white flex items-center justify-center text-[9px] shrink-0 font-bold">
                ✓
              </div>
              <span className="truncate">{stepName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
