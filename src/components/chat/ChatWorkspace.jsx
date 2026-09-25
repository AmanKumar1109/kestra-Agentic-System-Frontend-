import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, User, ChevronDown, Check, Trash2, GitBranch, Terminal, Table, Compass, Play, Download, ShieldCheck, Cpu } from 'lucide-react';
import ChatSidebar from './ChatSidebar';
import ChatPromptInput from './ChatPromptInput';
import AgentDirectoryView from './AgentDirectoryView';
import DatasetDashboardView from './DatasetDashboardView';
import PipelineFlowCanvas from './PipelineFlowCanvas';
import LiveTerminalLogs from './LiveTerminalLogs';
import AgentTelemetrySteps from './AgentTelemetrySteps';
import TraceableDataTable from './TraceableDataTable';
import ExportModal from './ExportModal';
import SchedulePipelineModal from './SchedulePipelineModal';
import SourceInspectorDrawer from './SourceInspectorDrawer';

import { AGENTS_CATALOG } from '../../data/agentsData';
import { SAMPLE_DATASET_ROWS } from '../../data/datasetsData';
import { RECENT_CHATS, DEMO_PROMPTS } from '../../data/templatesData';

export default function ChatWorkspace({ onBackToHome }) {
  const [currentView, setCurrentView] = useState('chat'); // 'chat' | 'graph' | 'terminal' | 'explore' | 'datasets'
  const [selectedAgent, setSelectedAgent] = useState(AGENTS_CATALOG[0]);
  const [selectedModel, setSelectedModel] = useState('Kestra 4o');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Modals state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [inspectedSourceItem, setInspectedSourceItem] = useState(null);
  const [toastNotice, setToastNotice] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const showToast = (msg) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(''), 3500);
  };

  const handleDeployAgent = (agent) => {
    setSelectedAgent(agent);
    setInputQuery(agent.starterQuery);
    setCurrentView('chat');
  };

  const handleRerunPipeline = (ds) => {
    setInputQuery(`Rerun automated data collection pipeline for: "${ds.name}"`);
    setCurrentView('chat');
  };

  const handleSend = (text) => {
    const query = text || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    // Realistic Agentic Pipeline Simulation
    setTimeout(() => {
      let aiResponseSummary = `Workflow executed successfully via [${selectedAgent.name}]. Discovered 50 permitted endpoints, extracted structured schemas, and verified 100% source provenance.`;

      if (query.toLowerCase().includes('job') || query.toLowerCase().includes('hiring')) {
        aiResponseSummary = `Crawled 5 verified tech job boards via [${selectedAgent.name}]. Extracted 120 Senior Engineer roles with verified salary bands, direct application endpoints, and source confidence scores.`;
      } else if (query.toLowerCase().includes('lead') || query.toLowerCase().includes('founder') || query.toLowerCase().includes('email')) {
        aiResponseSummary = `Discovered 30 YC-backed AI companies & founder profiles via [${selectedAgent.name}]. Generated targeted outreach sequences and verified contact deliverability.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: aiResponseSummary,
        agentName: selectedAgent.name,
        hasDataset: true,
        workflowSteps: selectedAgent.telemetryTemplate,
        dataset: SAMPLE_DATASET_ROWS,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 1100);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-white text-neutral-900 flex font-sans select-none fixed inset-0 z-50">
      {/* Toast Notification */}
      {toastNotice && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-2xl bg-neutral-900 text-white text-xs font-semibold shadow-xl flex items-center gap-2 animate-fade-in border border-neutral-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* 1. Modular Sidebar */}
      <ChatSidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        onNewSession={() => {
          setMessages([]);
          setCurrentView('chat');
        }}
        onBackToHome={onBackToHome}
        recentChats={RECENT_CHATS}
        onSelectHistoryChat={(chat) => {
          handleSend(chat);
          setCurrentView('chat');
        }}
        hasActiveMessages={messages.length > 0}
      />

      {/* 2. Main Dynamic Views */}
      {currentView === 'graph' ? (
        <PipelineFlowCanvas
          activeAgent={selectedAgent}
          isProcessing={isProcessing}
          onSwitchToChat={() => setCurrentView('chat')}
        />
      ) : currentView === 'terminal' ? (
        <LiveTerminalLogs
          activeAgent={selectedAgent}
          onSwitchToChat={() => setCurrentView('chat')}
        />
      ) : currentView === 'explore' ? (
        <AgentDirectoryView
          selectedAgentId={selectedAgent.id}
          onDeployAgent={handleDeployAgent}
          onOpenChatView={() => setCurrentView('chat')}
        />
      ) : currentView === 'datasets' ? (
        <DatasetDashboardView
          onExportDataset={(format) => showToast(`Exported dataset to ${format.toUpperCase()} (4,280 verified rows)`)}
          onRerunPipeline={handleRerunPipeline}
          onInspectSource={(item) => setInspectedSourceItem(item)}
        />
      ) : (
        /* 3. Pure White Prompt-to-Pipeline Workspace */
        <main className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
          {/* Top Bar with View Toggles, Model Switcher & Agent Badge */}
          <div className="px-6 py-3 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white/95 backdrop-blur-xs z-10">
            {/* Left: Active Agent Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-medium">Agent:</span>
              <button
                onClick={() => setCurrentView('explore')}
                className="px-3 py-1 rounded-full text-xs font-semibold text-neutral-800 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedAgent.color }} />
                <span>{selectedAgent.name}</span>
                <span className="text-[10px] text-neutral-500 font-normal underline ml-1">Change</span>
              </button>
            </div>

            {/* Center: Live Cluster Metrics Strip */}
            <div className="hidden lg:flex items-center gap-4 text-[11px] text-neutral-500 font-mono bg-neutral-50 px-3 py-1 rounded-full border border-neutral-100">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Latency: 120ms</span>
              </span>
              <span>•</span>
              <span>Bypass: 99.4%</span>
              <span>•</span>
              <span className="text-neutral-700 font-semibold">Proxies: Active</span>
            </div>

            {/* Right: View Toggles & Tools */}
            <div className="flex items-center gap-2">
              {/* Quick View Switches */}
              <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
                <button
                  onClick={() => setCurrentView('graph')}
                  title="Open Visual DAG Graph"
                  className="px-2 py-1 rounded-md text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <GitBranch className="w-3 h-3 text-[#7E9C79]" />
                  <span className="hidden sm:inline">DAG</span>
                </button>
                <button
                  onClick={() => setCurrentView('terminal')}
                  title="Open Live Terminal"
                  className="px-2 py-1 rounded-md text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Terminal className="w-3 h-3 text-emerald-600" />
                  <span className="hidden sm:inline">Logs</span>
                </button>
              </div>

              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Model Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-800 shadow-2xs transition-all cursor-pointer"
                >
                  <span className="text-[#E67246] text-[11px]">✦</span>
                  <span>{selectedModel}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {isModelDropdownOpen && (
                  <div className="absolute top-9 right-0 w-48 bg-white border border-neutral-200 rounded-xl shadow-xl py-1.5 z-30">
                    {['Kestra 4o (Recommended)', 'Kestra Flash', 'Kestra Reasoning Engine'].map((m, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedModel(m.split(' ')[0] + ' ' + m.split(' ')[1]);
                          setIsModelDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-neutral-800 hover:bg-neutral-50 font-medium cursor-pointer"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Stream */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-6 flex flex-col">
            {messages.length === 0 ? (
              /* Ultra-Clean Modern Zero State */
              <div className="flex flex-col items-center text-center my-auto max-w-2xl mx-auto py-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-700 shadow-2xs mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#E67246]" />
                  <span>Autonomous Data Intelligence Platform</span>
                </div>

                <h1 className="font-heading-hero text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-2">
                  Describe what data you need.
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed mb-8">
                  Kestra automatically decomposes your request into autonomous workflows, extracts data from permitted web sources, and outputs clean verified datasets.
                </p>

                {/* 4 Interactive Quick Start Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
                  {DEMO_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const targetAgent = AGENTS_CATALOG.find((a) => a.id === item.agentId) || selectedAgent;
                        setSelectedAgent(targetAgent);
                        setInputQuery(item.prompt);
                      }}
                      className="p-4 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-400/80 transition-all text-xs flex flex-col gap-1.5 cursor-pointer group shadow-xs hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900 flex items-center gap-1.5 text-xs">
                          <span>{item.icon}</span>
                          <span>{item.category}</span>
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono group-hover:text-neutral-900 transition-colors">
                          Run ➔
                        </span>
                      </div>
                      <span className="text-neutral-500 line-clamp-2 leading-relaxed text-[11.5px]">
                        {item.prompt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Message Stream */
              <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full py-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender !== 'user' && (
                      <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-neutral-900 text-white font-medium max-w-[80%]'
                          : 'bg-white border border-neutral-200 text-neutral-900 shadow-xs w-full'
                      }`}
                    >
                      <div className="whitespace-pre-line font-sans">{msg.text}</div>

                      {/* Problem Statement Deliverables: Telemetry + Traceable Table */}
                      {msg.hasDataset && (
                        <div className="mt-3 pt-3 border-t border-neutral-100">
                          <AgentTelemetrySteps
                            steps={msg.workflowSteps}
                            agentName={msg.agentName}
                          />

                          <TraceableDataTable
                            rows={msg.dataset}
                            onInspectSource={(row) => setInspectedSourceItem(row)}
                            onOpenExport={() => setIsExportModalOpen(true)}
                          />
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-1.5 text-right ${
                          msg.sender === 'user' ? 'text-white/60' : 'text-neutral-400'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isProcessing && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-2.5 shadow-xs flex items-center gap-2 text-xs text-neutral-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Executing [{selectedAgent.name}] workflow...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Pinned Minimal Prompt Input */}
          <ChatPromptInput
            inputQuery={inputQuery}
            setInputQuery={setInputQuery}
            onSend={() => handleSend()}
            isProcessing={isProcessing}
            activeAgentName={selectedAgent.name}
            onOpenSchedule={() => setIsScheduleModalOpen(true)}
            onOpenExplore={() => setCurrentView('explore')}
          />
        </main>
      )}

      {/* 3. Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExportComplete={(format) => showToast(`Dataset successfully synced to ${format.toUpperCase()} destination!`)}
      />

      {/* 4. Schedule Pipeline Modal */}
      <SchedulePipelineModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onScheduleSaved={(schedule) => showToast(`Cron schedule activated: ${schedule.frequency} at ${schedule.time} UTC`)}
      />

      {/* 5. Traceable Source Provenance Inspector Drawer */}
      <SourceInspectorDrawer
        item={inspectedSourceItem}
        onClose={() => setInspectedSourceItem(null)}
      />
    </div>
  );
}
