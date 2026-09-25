import React, { useState } from 'react';
import { Terminal, Copy, Check, Trash2, ArrowRight } from 'lucide-react';

export default function LiveTerminalLogs({ activeAgent, onSwitchToChat }) {
  const [copied, setCopied] = useState(false);

  const logs = [
    { timestamp: '14:20:01.102', level: 'INFO', text: `[KESTRA-CORE] Initializing DAG execution cluster for agent [${activeAgent.name}]` },
    { timestamp: '14:20:01.240', level: 'PROXY', text: 'Rotating residential IP proxy pool (US-East, Latency: 42ms)...' },
    { timestamp: '14:20:01.385', level: 'DOM', text: 'Spawning headless Playwright Chromium instance with stealth plugins' },
    { timestamp: '14:20:01.512', level: 'HTTP', text: 'GET https://target-domain.com/v1/catalog (Status: 200 OK, Size: 1.4MB)' },
    { timestamp: '14:20:01.780', level: 'EXTRACT', text: 'Extracted 120 raw DOM nodes matching selector [data-test-item]' },
    { timestamp: '14:20:01.990', level: 'NORM', text: 'Auto-inferred tabular schema: { id, title, salary_min, salary_max, source_url }' },
    { timestamp: '14:20:02.110', level: 'PROVENANCE', text: 'SHA-256 DOM hash generated: a8f9e12... Traceable to original HTTP source' },
    { timestamp: '14:20:02.250', level: 'COMPLETE', text: 'Pipeline finished with 0 errors. Dataset cached in memory for export.' },
  ];

  const handleCopy = () => {
    const raw = logs.map((l) => `[${l.timestamp}] [${l.level}] ${l.text}`).join('\n');
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#121212] text-neutral-200 flex flex-col p-6 sm:p-10 font-mono overflow-hidden">
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-neutral-400 font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#7E9C79]" />
            <span>kestra-telemetry-stdout — {activeAgent.name}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Logs'}</span>
          </button>

          <button
            onClick={onSwitchToChat}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-semibold transition-colors cursor-pointer"
          >
            <span>Back to Chat</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto py-4 space-y-2 text-xs leading-relaxed">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-3 hover:bg-neutral-800/40 p-1 rounded-sm">
            <span className="text-neutral-500 shrink-0">{log.timestamp}</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                log.level === 'INFO'
                  ? 'bg-blue-500/20 text-blue-400'
                  : log.level === 'PROXY'
                  ? 'bg-amber-500/20 text-amber-400'
                  : log.level === 'HTTP'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : log.level === 'EXTRACT'
                  ? 'bg-purple-500/20 text-purple-400'
                  : log.level === 'NORM'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-green-500/20 text-green-300'
              }`}
            >
              {log.level}
            </span>
            <span className="text-neutral-200">{log.text}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-2 text-emerald-400 animate-pulse">
          <span>❯</span>
          <span className="w-2 h-4 bg-emerald-400 inline-block" />
        </div>
      </div>
    </div>
  );
}
