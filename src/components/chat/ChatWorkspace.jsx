import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, User, ChevronDown, Plus, Check } from 'lucide-react';
import ChatSidebar from './ChatSidebar';
import ChatPromptInput from './ChatPromptInput';
import AgentDirectoryView from './AgentDirectoryView';
import DatasetDashboardView from './DatasetDashboardView';
import AgentTelemetrySteps from './AgentTelemetrySteps';
import TraceableDataTable from './TraceableDataTable';
import ExportModal from './ExportModal';
import SchedulePipelineModal from './SchedulePipelineModal';
import SourceInspectorDrawer from './SourceInspectorDrawer';

import { AGENTS_CATALOG } from '../../data/agentsData';
import { SAMPLE_DATASET_ROWS } from '../../data/datasetsData';
import { RECENT_CHATS, DEMO_PROMPTS } from '../../data/templatesData';

export default function ChatWorkspace({ onBackToHome }) {
  const [currentView, setCurrentView] = useState('chat'); // 'chat' | 'explore' | 'datasets'
  const [selectedAgent, setSelectedAgent] = useState(AGENTS_CATALOG[0]);
  const [selectedModel, setSelectedModel] = useState('Data AI 4o');
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
      let aiResponseSummary = `✓ Discovered 50 permitted sources for requirement: "${query}"\n✓ Executed autonomous workflow via [${selectedAgent.name}].\n✓ Schema validated, deduplicated, and converted into structured dataset.`;

      if (query.toLowerCase().includes('job') || query.toLowerCase().includes('hiring')) {
        aiResponseSummary = `✓ [${selectedAgent.name}] Crawled 5 verified tech job boards\n✓ Extracted 120 Senior Engineer roles with verified salary bands and application endpoints.`;
      } else if (query.toLowerCase().includes('lead') || query.toLowerCase().includes('founder') || query.toLowerCase().includes('email')) {
        aiResponseSummary = `✓ [${selectedAgent.name}] Discovered 30 YC-backed AI companies & founder profiles\n✓ Generated personalized outreach sequences & checked deliverability metrics.`;
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
    <div className="w-screen h-screen overflow-hidden bg-[#FAF7F2] text-[#271B14] flex font-sans select-none fixed inset-0 z-50">
      {/* Toast Notification */}
      {toastNotice && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 rounded-2xl bg-[#7E9C79] text-white text-xs font-semibold shadow-lg flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
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
      {currentView === 'explore' ? (
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
        /* 3. Prompt-to-Pipeline Chat Area */
        <main className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
          {/* Top Bar with Model Switcher & Agent Badge */}
          <div className="px-6 py-3 border-b border-[#F0EAE1] flex items-center justify-between shrink-0 bg-white/70 backdrop-blur-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-[#78685C]">Deployed Agent:</span>
              <button
                onClick={() => setCurrentView('explore')}
                className="px-3 py-1 rounded-full text-xs font-bold text-[#271B14] bg-[#FAF7F2] hover:bg-[#EFE9E0] border border-[#E8E2D8] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedAgent.color }} />
                <span>{selectedAgent.name}</span>
                <span className="text-[10px] text-[#E67246] font-normal underline ml-1">Switch</span>
              </button>
            </div>

            {/* Model Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] border border-[#E8E2D8] text-xs font-semibold text-[#271B14] shadow-2xs transition-all cursor-pointer"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#795745] text-white flex items-center justify-center text-[9px]">
                  ✦
                </div>
                <span>{selectedModel}</span>
                <ChevronDown className="w-3 h-3 text-[#78685C]" />
              </button>

              {isModelDropdownOpen && (
                <div className="absolute top-10 right-0 w-52 bg-white border border-[#E8E2D8] rounded-2xl shadow-xl py-1.5 z-30">
                  {['Data AI 4o (Recommended)', 'Data AI Flash', 'Data AI Reasoning Engine'].map((m, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedModel(m.split(' ')[0] + ' ' + m.split(' ')[1]);
                        setIsModelDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#271B14] hover:bg-[#FAF7F2] font-medium cursor-pointer"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Messages Stream */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-6 flex flex-col">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center text-center my-auto max-w-2xl mx-auto py-6">
                {/* Glowing Holographic Sphere */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-radial from-[#7E9C79]/60 via-[#E67246]/40 to-transparent blur-xl animate-pulse" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#7E9C79] via-[#E4DDD2] to-[#795745] p-0.5 shadow-[0_15px_30px_rgba(126,156,121,0.35)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-[#795745]" />
                    </div>
                  </div>
                </div>

                {/* Hero Greeting */}
                <h1 className="font-heading-hero text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#271B14] mb-2 leading-tight">
                  Prompt to Dataset
                </h1>
                <h2 className="font-heading-hero text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#271B14]">
                  Describe what data you need,{' '}
                  <span className="bg-gradient-to-r from-[#7E9C79] via-[#795745] to-[#E67246] bg-clip-text text-transparent underline decoration-[#7E9C79]/40 decoration-wavy">
                    we build the pipeline.
                  </span>
                </h2>

                {/* Ready-made Demo Template Pills */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
                  {DEMO_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const targetAgent = AGENTS_CATALOG.find((a) => a.id === item.agentId) || selectedAgent;
                        setSelectedAgent(targetAgent);
                        setInputQuery(item.prompt);
                      }}
                      className="p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#EFE9E0] border border-[#E8E2D8] transition-all text-xs flex flex-col gap-1 cursor-pointer group"
                    >
                      <span className="font-bold text-[#795745] flex items-center gap-1.5">
                        <span>{item.icon}</span>
                        <span>{item.category}</span>
                      </span>
                      <span className="text-[#78685C] line-clamp-2 leading-relaxed">
                        {item.prompt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full py-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.sender === 'user'
                          ? 'bg-[#271B14] text-white'
                          : 'bg-[#7E9C79] text-white'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`w-full max-w-[94%] rounded-[24px] px-5 py-4 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#EFE9E0] text-[#271B14] font-medium max-w-[75%]'
                          : 'bg-white border border-[#E8E2D8] text-[#271B14] shadow-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line font-sans mb-2">{msg.text}</div>

                      {/* Problem Statement Deliverables: Telemetry + Traceable Table */}
                      {msg.hasDataset && (
                        <div className="mt-4 pt-3 border-t border-[#F0EAE1]">
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

                      <div className="text-[10px] text-[#A3968B] mt-2 text-right">
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isProcessing && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#7E9C79] flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl px-4 py-3 shadow-xs flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#E67246] animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-[#7E9C79] animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-[#795745] animate-bounce [animation-delay:0.4s]" />
                      <span className="text-xs text-[#78685C] ml-1 font-medium">
                        [{selectedAgent.name}] decomposing prompt, scraping dynamic sources & validating provenance...
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Fixed Pinned Bottom Prompt Input */}
          <ChatPromptInput
            inputQuery={inputQuery}
            setInputQuery={setInputQuery}
            onSend={() => handleSend()}
            isProcessing={isProcessing}
            activeAgentName={selectedAgent.name}
            onOpenSchedule={() => setIsScheduleModalOpen(true)}
            onOpenExport={() => setIsExportModalOpen(true)}
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
