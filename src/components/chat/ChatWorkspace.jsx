import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Home,
  Compass,
  History,
  Paperclip,
  Lightbulb,
  Sparkles,
  SearchCode,
  Send,
  ChevronDown,
  X,
  Plus,
  ArrowLeft,
  Bot,
  User,
  MessageSquare,
  PanelLeftClose,
  PanelLeft,
  Database,
  Globe,
  Mail,
  FileText,
  TrendingUp,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Download,
  ExternalLink,
  Layers,
  Activity,
  Check,
  FileSpreadsheet
} from 'lucide-react';

const AGENTS_CATALOG = [
  {
    id: 'scraper-agent',
    name: 'Web Scraper & Crawler',
    category: 'Scraping',
    tagline: 'Autonomous dynamic DOM extractor & anti-bot bypasser',
    description: 'Crawl JS-rendered single-page apps, bypass Cloudflare challenges, and extract clean nested schemas directly into JSON, CSV, or Parquet.',
    color: '#7E9C79',
    bgLight: 'bg-[#7E9C79]/10',
    border: 'border-[#7E9C79]/30',
    badgeText: 'Live Crawler',
    icon: Globe,
    starterQuery: 'Extract pricing tables and spec sheets across 50 e-commerce URLs',
    metrics: '99.4% bypass rate',
  },
  {
    id: 'mailing-agent',
    name: 'Cold Email & Outreach Agent',
    category: 'Mailing',
    tagline: 'Hyper-personalized prospect research & multi-touch sequences',
    description: 'Scrape lead LinkedIn profiles, synthesize company news triggers, generate customized outreach emails, and test deliverability.',
    color: '#E67246',
    bgLight: 'bg-[#E67246]/10',
    border: 'border-[#E67246]/30',
    badgeText: 'High Inbox Rate',
    icon: Mail,
    starterQuery: 'Generate 5 personalized cold emails for B2B SaaS CTOs using recent funding news',
    metrics: '68% open rate avg',
  },
  {
    id: 'sql-agent',
    name: 'Zero-ETL SQL Database Agent',
    category: 'Database',
    tagline: 'Natural language query executor for relational & columnar DBs',
    description: 'Connect directly to PostgreSQL, Snowflake, BigQuery, or MySQL. Auto-infers foreign keys and generates optimized SQL with execution telemetry.',
    color: '#795745',
    bgLight: 'bg-[#795745]/10',
    border: 'border-[#795745]/30',
    badgeText: 'Direct Read-Only',
    icon: Database,
    starterQuery: 'Show me total Q3 revenue grouped by customer tier from PostgreSQL',
    metrics: '12ms query latency',
  },
  {
    id: 'cleaner-agent',
    name: 'Data Normalizer & Imputation',
    category: 'Cleaning',
    tagline: 'Auto-detect missing values & deduplicate fuzzy records',
    description: 'Cleans messy timestamps, handles UTF-8 edge cases, merges duplicated customer rows with Levenshtein distance heuristics, and creates dictionaries.',
    color: '#654635',
    bgLight: 'bg-[#654635]/10',
    border: 'border-[#654635]/30',
    badgeText: 'Zero-Loss',
    icon: Sparkles,
    starterQuery: 'Normalize dates, remove duplicate customer records, and calculate churn probability',
    metrics: '100% schema integrity',
  },
  {
    id: 'document-agent',
    name: 'Document & Invoice Parser',
    category: 'Document',
    tagline: 'Convert unstructured PDFs, contracts & receipts to JSON',
    description: 'Extract line items, tax IDs, payment terms, and vendor entities from multi-page PDFs with visual table reconstruction.',
    color: '#344049',
    bgLight: 'bg-[#344049]/10',
    border: 'border-[#344049]/30',
    badgeText: 'OCR + Vision',
    icon: FileText,
    starterQuery: 'Extract line items, invoice totals, and VAT numbers from 10 supplier invoices',
    metrics: 'Sub-second parsing',
  },
  {
    id: 'insights-agent',
    name: 'Predictive Cohort & Forecast',
    category: 'Analytics',
    tagline: 'Machine-learning anomaly detection and 12-month projections',
    description: 'Calculate LTV projections, churn probabilities, seasonal demand spikes, and executive board summaries from connected data warehouses.',
    color: '#5B7A58',
    bgLight: 'bg-[#5B7A58]/10',
    border: 'border-[#5B7A58]/30',
    badgeText: 'Predictive ML',
    icon: TrendingUp,
    starterQuery: 'Generate a predictive 12-month cohort retention and churn forecast matrix',
    metrics: 'AUC 0.96 accuracy',
  },
];

const HISTORICAL_DATASETS = [
  {
    id: 'ds-101',
    name: 'Global SaaS Pricing Matrix (50 Targets)',
    records: '1,420 Items',
    sources: '50 Permitted Domains',
    confidence: '99.8%',
    date: '10 mins ago',
    status: 'Validated',
  },
  {
    id: 'ds-102',
    name: 'B2B FinTech Decision Makers',
    records: '850 Leads',
    sources: 'Crunchbase & LinkedIn Public',
    confidence: '98.5%',
    date: '2 hours ago',
    status: 'Ready',
  },
  {
    id: 'ds-103',
    name: 'Q3 Multi-Tier Revenue Telemetry',
    records: '4,280 Rows',
    sources: 'PostgreSQL db-prod-01',
    confidence: '100%',
    date: 'Yesterday',
    status: 'Indexed',
  },
];

const SAMPLE_DATASET_ROWS = [
  { id: 1, title: 'CloudScale Pro Tier', value: '$249/mo', category: 'Enterprise Tier', source: 'https://cloudscale.io/pricing', confidence: '99.4%', status: 'Verified' },
  { id: 2, title: 'DevFlow Unlimited Seat', value: '$89/seat/mo', category: 'Team Seat', source: 'https://devflow.dev/plans', confidence: '99.8%', status: 'Verified' },
  { id: 3, title: 'VectorDB Dedicated Node', value: '$0.04/node-hr', category: 'Compute Unit', source: 'https://vectordb.ai/pricing', confidence: '98.9%', status: 'Verified' },
  { id: 4, title: 'Synthetix API Ingestion', value: '$0.002/req', category: 'API Rate', source: 'https://synthetix.org/docs', confidence: '99.1%', status: 'Verified' },
];

const RECENT_CHATS = [
  "Extract product schema from Shopify store",
  "Normalize user timestamps & timezone offsets",
  "Query Q3 sales grouped by regional tier",
  "Deduplicate fuzzy customer records in PostgreSQL",
  "Web crawl 50 competitor pricing tables",
  "Cold outreach campaign for seed-stage founders",
];

const QUICK_ACTIONS = [
  { id: 'reasoning', label: 'Reasoning', icon: Lightbulb },
  { id: 'data-clean', label: 'Clean & Transform', icon: Sparkles },
  { id: 'deep-research', label: 'Deep Research', icon: SearchCode },
];

export default function ChatWorkspace({ onBackToHome }) {
  const [currentMainView, setCurrentMainView] = useState('chat'); // 'chat' | 'explore' | 'datasets'
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState(AGENTS_CATALOG[0]);
  const [selectedModel, setSelectedModel] = useState('Data AI 4o');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAction, setActiveAction] = useState('reasoning');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [exportNotice, setExportNotice] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleDeployAgent = (agent) => {
    setSelectedAgent(agent);
    setInputQuery(agent.starterQuery);
    setCurrentMainView('chat');
  };

  const handleExport = (format) => {
    setExportNotice(`Exported dataset to ${format.toUpperCase()} (4,280 validated records)`);
    setTimeout(() => setExportNotice(''), 3000);
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

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: `✓ Connected Agent: [${selectedAgent.name}]\n✓ Autonomous Pipeline: Discovered 50 permitted sources, normalized schema, and validated traceable provenance.`,
        agentName: selectedAgent.name,
        hasDataset: true,
        workflowSteps: [
          { name: '1. Intent & Schema Requirement Parsed', status: 'done' },
          { name: '2. Multi-Source Permitted Scraping / DB Query', status: 'done' },
          { name: '3. Deduplication & AI Schema Cleaning', status: 'done' },
          { name: '4. Traceable Source Provenance & Quality Check', status: 'verified' },
        ],
        dataset: SAMPLE_DATASET_ROWS,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 1100);
  };

  const categories = ['All', 'Scraping', 'Mailing', 'Database', 'Cleaning', 'Document', 'Analytics'];

  const filteredCatalog = AGENTS_CATALOG.filter(
    (a) => activeCategoryFilter === 'All' || a.category === activeCategoryFilter
  );

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#FAF7F2] text-[#271B14] flex font-sans select-none fixed inset-0 z-50">
      {/* Left Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 sm:w-72 md:w-80 bg-[#FAF7F2] border-r border-[#E8E2D8] flex flex-col justify-between shrink-0 h-full overflow-hidden transition-all duration-300">
          {/* Top Workspace Identity & Main Nav */}
          <div className="p-4 border-b border-[#E8E2D8]/60 flex flex-col gap-3 shrink-0">
            {/* Back to Homepage Button & Close Sidebar */}
            <div className="flex items-center justify-between">
              <button
                onClick={onBackToHome}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE9E0] hover:bg-[#E4DDD2] text-[#795745] font-semibold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Homepage</span>
              </button>

              <button
                onClick={() => {
                  setMessages([]);
                  setCurrentMainView('chat');
                }}
                title="New Session"
                className="p-1.5 rounded-lg bg-[#EFE9E0] hover:bg-[#E4DDD2] text-[#795745] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Brand Logo Title */}
            <div className="flex items-center gap-2 pt-1">
              <div className="w-8 h-8 rounded-xl bg-[#795745] text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <span className="font-heading-hero font-bold text-base text-[#271B14]">
                DataWeave AI
              </span>
            </div>

            {/* View Switchers */}
            <div className="flex flex-col gap-1.5 pt-1">
              {/* 1. Chat Workspace */}
              <button
                onClick={() => setCurrentMainView('chat')}
                className={`flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  currentMainView === 'chat'
                    ? 'bg-white text-[#271B14] shadow-xs border border-[#E8E2D8]'
                    : 'text-[#78685C] hover:bg-white/60 hover:text-[#271B14]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-[#795745]" />
                  <span>Prompt-to-Pipeline</span>
                </div>
                {messages.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#E67246]" />
                )}
              </button>

              {/* 2. Explore AI Agents */}
              <button
                onClick={() => setCurrentMainView('explore')}
                className={`flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  currentMainView === 'explore'
                    ? 'bg-[#7E9C79] text-white shadow-xs'
                    : 'bg-white/70 text-[#271B14] hover:bg-white border border-[#E8E2D8]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className={`w-4 h-4 ${currentMainView === 'explore' ? 'text-white' : 'text-[#7E9C79]'}`} />
                  <span>Explore AI Agents</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    currentMainView === 'explore'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#EFE9E0] text-[#795745]'
                  }`}
                >
                  6 Ready
                </span>
              </button>

              {/* 3. Centralized Datasets & Workflow Dashboard */}
              <button
                onClick={() => setCurrentMainView('datasets')}
                className={`flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  currentMainView === 'datasets'
                    ? 'bg-[#271B14] text-white shadow-xs'
                    : 'text-[#78685C] hover:bg-white/60 hover:text-[#271B14]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-[#E67246]" />
                  <span>Dataset Dashboard</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#EFE9E0] text-[#78685C] font-mono">
                  3 Active
                </span>
              </button>
            </div>
          </div>

          {/* Scrollable Pipeline History (ChatGPT style) */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#A3968B] px-2 py-1 block">
              Recent Workflows ({RECENT_CHATS.length})
            </span>
            {RECENT_CHATS.map((chat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleSend(chat);
                  setCurrentMainView('chat');
                }}
                className="w-full text-left text-xs text-[#78685C] hover:text-[#271B14] hover:bg-white px-3 py-2 rounded-xl truncate flex items-center gap-2 transition-colors group cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#A3968B] group-hover:text-[#7E9C79] shrink-0" />
                <span className="truncate">{chat}</span>
              </button>
            ))}
          </div>

          {/* Bottom User Profile */}
          <div className="p-3.5 border-t border-[#E8E2D8] bg-[#FAF7F2] shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E67246] text-white flex items-center justify-center text-xs font-bold">
                J
              </div>
              <div>
                <p className="text-xs font-semibold text-[#271B14]">Judha Dev</p>
                <p className="text-[10px] text-[#A3968B]">Enterprise Agent Fleet</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Right Area: Dynamic Views */}
      {currentMainView === 'explore' ? (
        /* ========================================================================= */
        /* 1. AGENTS CATALOG DIRECTORY                                               */
        /* ========================================================================= */
        <main className="flex-1 flex flex-col h-full bg-[#FAF7F2] overflow-y-auto p-6 sm:p-10 lg:p-12">
          <div className="max-w-6xl mx-auto w-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9E0] text-[#795745] text-xs font-bold uppercase tracking-wider mb-3">
                  <Cpu className="w-3.5 h-3.5 text-[#E67246]" />
                  Autonomous Agent Catalog
                </div>
                <h1 className="font-heading-hero text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#271B14]">
                  Explore Specialized AI Agents
                </h1>
                <p className="mt-2 text-sm sm:text-base text-[#78685C] max-w-xl">
                  Select and deploy specialized agents designed for web scraping, cold outreach, SQL databases, and ETL cleaning.
                </p>
              </div>

              <button
                onClick={() => setCurrentMainView('chat')}
                className="px-5 py-2.5 rounded-full bg-[#271B14] hover:bg-[#3D291D] text-white text-xs font-semibold flex items-center gap-2 w-fit transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>Open Active Workspace</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategoryFilter === cat
                      ? 'bg-[#271B14] text-white shadow-2xs'
                      : 'bg-white border border-[#E8E2D8] text-[#78685C] hover:text-[#271B14] hover:bg-[#EFE9E0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {filteredCatalog.map((agent) => {
                const IconComp = agent.icon;
                const isCurrentlyActive = selectedAgent.id === agent.id;
                return (
                  <div
                    key={agent.id}
                    className="bg-white border border-[#E8E2D8] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(39,27,20,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(39,27,20,0.12)] transition-all duration-300 hover:-translate-y-1.5 group relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-2xs transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: agent.color }}
                        >
                          <IconComp className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#78685C] border border-[#E8E2D8]">
                          {agent.badgeText}
                        </span>
                      </div>

                      <h3 className="font-heading-hero text-xl font-bold text-[#271B14] mb-1.5 group-hover:text-[#E67246] transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#795745] mb-3">
                        {agent.tagline}
                      </p>
                      <p className="text-xs sm:text-[13px] text-[#78685C] leading-relaxed mb-6">
                        {agent.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#F2ECE4] flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#83A47D] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {agent.metrics}
                      </span>

                      <button
                        onClick={() => handleDeployAgent(agent)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                          isCurrentlyActive
                            ? 'bg-[#7E9C79] text-white shadow-2xs'
                            : 'bg-[#FAF7F2] hover:bg-[#271B14] text-[#271B14] hover:text-white border border-[#E8E2D8]'
                        }`}
                      >
                        <span>{isCurrentlyActive ? 'Active Agent' : 'Deploy & Chat'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      ) : currentMainView === 'datasets' ? (
        /* ========================================================================= */
        /* 2. CENTRALIZED DATASETS & PROVENANCE INSPECTOR VIEW (PS REQUIREMENT)      */
        /* ========================================================================= */
        <main className="flex-1 flex flex-col h-full bg-[#FAF7F2] overflow-y-auto p-6 sm:p-10 lg:p-12">
          <div className="max-w-6xl mx-auto w-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9E0] text-[#795745] text-xs font-bold uppercase tracking-wider mb-3">
                  <Database className="w-3.5 h-3.5 text-[#E67246]" />
                  Centralized Dataset Hub & Provenance
                </div>
                <h1 className="font-heading-hero text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#271B14]">
                  Collected Datasets & Pipelines
                </h1>
                <p className="mt-2 text-sm sm:text-base text-[#78685C] max-w-xl">
                  Inspect provenance, filter records, monitor active collection jobs, and 1-click export to CSV, JSON, or PostgreSQL.
                </p>
              </div>

              {exportNotice && (
                <div className="px-4 py-2 rounded-2xl bg-[#7E9C79] text-white text-xs font-semibold shadow-xs flex items-center gap-2 animate-bounce">
                  <Check className="w-4 h-4" />
                  <span>{exportNotice}</span>
                </div>
              )}
            </div>

            {/* Datasets Cards Grid */}
            <div className="space-y-6 pb-12">
              {HISTORICAL_DATASETS.map((ds) => (
                <div
                  key={ds.id}
                  className="bg-white border border-[#E8E2D8] rounded-[28px] p-6 sm:p-8 shadow-[0_10px_30px_-10px_rgba(39,27,20,0.06)] flex flex-col gap-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center text-[#795745]">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-heading-hero font-bold text-lg sm:text-xl text-[#271B14]">
                          {ds.name}
                        </h3>
                        <p className="text-xs text-[#78685C] mt-0.5">
                          Sources: <span className="font-semibold text-[#271B14]">{ds.sources}</span> • Completed {ds.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExport('csv')}
                        className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] text-xs font-semibold text-[#271B14] border border-[#E8E2D8] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#795745]" />
                        <span>CSV</span>
                      </button>
                      <button
                        onClick={() => handleExport('json')}
                        className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] text-xs font-semibold text-[#271B14] border border-[#E8E2D8] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#795745]" />
                        <span>JSON</span>
                      </button>
                      <button
                        onClick={() => {
                          setInputQuery(`Rerun workflow for dataset: ${ds.name}`);
                          setCurrentMainView('chat');
                        }}
                        className="px-4 py-1.5 rounded-full bg-[#271B14] hover:bg-[#3D291D] text-white text-xs font-semibold cursor-pointer"
                      >
                        Revisit & Rerun
                      </button>
                    </div>
                  </div>

                  {/* Inline Live Table Preview */}
                  <div className="border border-[#EBE4D8] rounded-2xl overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF7F2] border-b border-[#EBE4D8] text-[#78685C]">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Title / Identifier</th>
                          <th className="py-3 px-4 font-semibold">Extracted Value</th>
                          <th className="py-3 px-4 font-semibold">Category</th>
                          <th className="py-3 px-4 font-semibold">Traceable Source Provenance</th>
                          <th className="py-3 px-4 font-semibold">Validation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2ECE4]">
                        {SAMPLE_DATASET_ROWS.map((row) => (
                          <tr key={row.id} className="hover:bg-[#FAF7F2]/50">
                            <td className="py-3 px-4 font-semibold text-[#271B14]">{row.title}</td>
                            <td className="py-3 px-4 font-mono font-bold text-[#E67246]">{row.value}</td>
                            <td className="py-3 px-4 text-[#78685C]">{row.category}</td>
                            <td className="py-3 px-4">
                              <a
                                href={row.source}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#7E9C79] hover:underline flex items-center gap-1 font-mono text-[11px]"
                              >
                                <span>{row.source.replace('https://', '')}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7E9C79]/15 text-[#5F7C5A] text-[10.5px] font-semibold">
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
              ))}
            </div>
          </div>
        </main>
      ) : (
        /* ========================================================================= */
        /* 3. PROMPT-TO-PIPELINE CHAT & LIVE RESULT DASHBOARD VIEW                   */
        /* ========================================================================= */
        <main className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
          {/* Messages Feed Container */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-6 flex flex-col">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center text-center my-auto max-w-2xl mx-auto py-8">
                {/* Glowing Holographic Sphere */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-radial from-[#7E9C79]/60 via-[#E67246]/40 to-transparent blur-xl animate-pulse" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#7E9C79] via-[#E4DDD2] to-[#795745] p-0.5 shadow-[0_15px_30px_rgba(126,156,121,0.35)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-[#795745]" />
                    </div>
                  </div>
                </div>

                {/* Hero Greeting Typography */}
                <h1 className="font-heading-hero text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#271B14] mb-2 leading-tight">
                  Prompt to Dataset
                </h1>
                <h2 className="font-heading-hero text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#271B14]">
                  Describe what data you need,{' '}
                  <span className="bg-gradient-to-r from-[#7E9C79] via-[#795745] to-[#E67246] bg-clip-text text-transparent underline decoration-[#7E9C79]/40 decoration-wavy">
                    we build the pipeline.
                  </span>
                </h2>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-[#78685C]">Autonomous Agent:</span>
                  <span className="text-xs font-bold text-[#271B14] px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8E2D8]">
                    {selectedAgent.name}
                  </span>
                  <button
                    onClick={() => setCurrentMainView('explore')}
                    className="text-xs text-[#E67246] hover:underline font-semibold cursor-pointer"
                  >
                    (Switch Agent)
                  </button>
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
                      {msg.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>

                    <div
                      className={`w-full max-w-[92%] rounded-[24px] px-5 py-4 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#EFE9E0] text-[#271B14] font-medium max-w-[75%]'
                          : 'bg-white border border-[#E8E2D8] text-[#271B14] shadow-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line font-sans mb-3">{msg.text}</div>

                      {/* Problem Statement Deliverable: Autonomous Workflow Progress Bar & Traceable Table */}
                      {msg.hasDataset && (
                        <div className="mt-4 pt-4 border-t border-[#F0EAE1] flex flex-col gap-4">
                          {/* 4 Pipeline Workflow Execution Steps */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#FAF7F2] p-3 rounded-2xl border border-[#EBE4D8]">
                            {msg.workflowSteps.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-1.5 text-[11px] font-semibold text-[#271B14]">
                                <div className="w-4 h-4 rounded-full bg-[#7E9C79] text-white flex items-center justify-center text-[9px] shrink-0">
                                  ✓
                                </div>
                                <span className="truncate">{step.name}</span>
                              </div>
                            ))}
                          </div>

                          {/* Traceable Dataset Table */}
                          <div className="border border-[#EBE4D8] rounded-2xl overflow-x-auto bg-white">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-[#FAF7F2] border-b border-[#EBE4D8] text-[#78685C]">
                                <tr>
                                  <th className="py-2.5 px-3 font-semibold">Title</th>
                                  <th className="py-2.5 px-3 font-semibold">Extracted Value</th>
                                  <th className="py-2.5 px-3 font-semibold">Traceable Source</th>
                                  <th className="py-2.5 px-3 font-semibold">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#F2ECE4]">
                                {msg.dataset.map((row) => (
                                  <tr key={row.id} className="hover:bg-[#FAF7F2]/50">
                                    <td className="py-2.5 px-3 font-semibold text-[#271B14]">{row.title}</td>
                                    <td className="py-2.5 px-3 font-mono font-bold text-[#E67246]">{row.value}</td>
                                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#7E9C79]">
                                      <a href={row.source} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                                        <span>{row.source.replace('https://', '')}</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </td>
                                    <td className="py-2.5 px-3">
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7E9C79]/15 text-[#5F7C5A] text-[10px] font-semibold">
                                        <Check className="w-3 h-3" />
                                        {row.confidence}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* 1-Click Export Actions */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-[#78685C]">
                              4 verified sample items shown (4,280 ready)
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleExport('csv')}
                                className="px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] text-xs font-semibold text-[#271B14] border border-[#E8E2D8] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <Download className="w-3 h-3 text-[#795745]" />
                                <span>Export CSV</span>
                              </button>
                              <button
                                onClick={() => handleExport('json')}
                                className="px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE9E0] text-xs font-semibold text-[#271B14] border border-[#E8E2D8] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <Download className="w-3 h-3 text-[#795745]" />
                                <span>Export JSON</span>
                              </button>
                            </div>
                          </div>
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
                      <span className="text-xs text-[#78685C] ml-1">
                        Synthesizing prompt, crawling sources & validating provenance...
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Fixed Bottom Input Bar */}
          <div className="p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent shrink-0 w-full z-20">
            <div className="max-w-3xl mx-auto bg-[#FAF7F2] border border-[#E2DAD0] rounded-[24px] p-3 sm:p-4 shadow-[0_10px_30px_-10px_rgba(39,27,20,0.08)] flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#7E9C79] mt-2.5 ml-1 shrink-0" />
                <textarea
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={2}
                  placeholder="Describe what data you need in plain English (e.g. Find 50 SaaS pricing tiers, or Q3 customer revenue)..."
                  className="w-full resize-none border-none outline-hidden bg-transparent text-sm text-[#271B14] placeholder-[#A3968B] py-1.5"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8E2D8]/70">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    title="Attach schema file"
                    className="p-1.5 rounded-lg bg-white hover:bg-[#EFE9E0] text-[#78685C] border border-[#E8E2D8] transition-colors cursor-pointer"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                  </button>

                  {QUICK_ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => setActiveAction(action.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          activeAction === action.id
                            ? 'bg-white text-[#271B14] border border-[#DDD4C6] shadow-2xs font-semibold'
                            : 'text-[#78685C] hover:bg-white hover:text-[#271B14]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-[#795745]" />
                        <span>{action.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!inputQuery.trim() || isProcessing}
                  className="px-4 py-1.5 rounded-full bg-[#7E9C79] hover:bg-[#6C8E66] disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Build Pipeline</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
