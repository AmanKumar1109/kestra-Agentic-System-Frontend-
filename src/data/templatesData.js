import { Database, FileSpreadsheet, Send, HardDrive, Webhook } from 'lucide-react';

export const DEMO_PROMPTS = [
  {
    category: 'Sales & Lead Gen',
    prompt: 'Extract top 30 YC-backed AI startups, founders names, LinkedIn profiles, and verified work emails',
    icon: '🎯',
    agentId: 'mailing-agent',
  },
  {
    category: 'Market Intelligence',
    prompt: 'Scrape and compare pricing tiers, seat limits, and storage quotas across 10 cloud database providers',
    icon: '📊',
    agentId: 'scraper-agent',
  },
  {
    category: 'Database Analytics',
    prompt: 'Show me total Q3 revenue grouped by customer tier and calculate regional growth percentages',
    icon: '🗄️',
    agentId: 'sql-agent',
  },
  {
    category: 'Data Cleaning & ETL',
    prompt: 'Normalize dates, remove duplicate customer records, and calculate churn probability matrix',
    icon: '✨',
    agentId: 'cleaner-agent',
  },
];

export const INTEGRATION_DESTINATIONS = [
  { id: 'csv', name: 'CSV File (.csv)', icon: FileSpreadsheet, color: '#7E9C79', desc: 'Standard tabular download' },
  { id: 'json', name: 'JSON Schema (.json)', icon: Database, color: '#E67246', desc: 'Structured JSON objects' },
  { id: 'postgres', name: 'PostgreSQL Database', icon: HardDrive, color: '#795745', desc: 'Direct warehouse table push' },
  { id: 'webhook', name: 'Custom HTTP Webhook', icon: Webhook, color: '#344049', desc: 'Realtime JSON payload delivery' },
  { id: 'notion', name: 'Notion Database / Airtable', icon: Send, color: '#654635', desc: 'Sync directly to workspace' },
];

export const RECENT_CHATS = [
  "Extract product schema from Shopify store",
  "Normalize user timestamps & timezone offsets",
  "Query Q3 sales grouped by regional tier",
  "Deduplicate fuzzy customer records in PostgreSQL",
  "Web crawl 50 competitor pricing tables",
  "Cold outreach campaign for seed-stage founders",
];
