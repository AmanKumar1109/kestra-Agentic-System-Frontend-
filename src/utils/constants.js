export const NAV_LINKS = [
  { name: 'Homepage', href: '#', active: true },
  { name: 'Projects', href: '#projects', active: false },
  { name: 'Features', href: '#features', active: false },
  { name: 'Teamers', href: '#teamers', active: false },
  { name: 'Contact us', href: '#contact', active: false },
];

export const CALLOUT_ITEMS = [
  {
    id: 'database',
    position: 'left',
    color: '#E67246',
    bgColorClass: 'bg-[#E67246]',
    hoverColorClass: 'hover:bg-[#D46135]',
    tailClass: 'callout-tail-right',
    text: 'Instantly find and organise specific info from structured databases',
    iconType: 'database',
    samplePrompt: 'Show me total Q3 revenue grouped by customer tier from PostgreSQL',
    iconOnRight: true,
  },
  {
    id: 'web-scraping',
    position: 'top-right',
    color: '#83A47D',
    bgColorClass: 'bg-[#83A47D]',
    hoverColorClass: 'hover:bg-[#72936C]',
    tailClass: 'callout-tail-bottom-left',
    text: 'How to efficiently pull and clean data from complex websites',
    iconType: 'document',
    samplePrompt: 'Extract pricing tables and spec sheets across 50 e-commerce URLs',
    iconOnRight: false,
  },
  {
    id: 'data-cleaning',
    position: 'bottom-right',
    color: '#795745',
    bgColorClass: 'bg-[#795745]',
    hoverColorClass: 'hover:bg-[#654635]',
    tailClass: 'callout-tail-left',
    text: 'Use our AI for data cleaning, data transformation, and insight generation',
    iconType: 'sparkles',
    samplePrompt: 'Normalize dates, remove duplicate customer records, and calculate churn probability',
    iconOnRight: false,
  },
];

export const MOCK_RESPONSES = {
  database: {
    title: 'Structured Database Query Agent',
    query: 'Show me total Q3 revenue grouped by customer tier from PostgreSQL',
    result: `✓ Connected to PostgreSQL Cluster (db-prod-01)\n✓ Executed: SELECT tier, SUM(amount) AS total_revenue, COUNT(*) AS deals FROM sales WHERE quarter = 'Q3' GROUP BY tier;\n\n• Enterprise: $1,420,500 (84 deals)\n• Mid-Market: $780,200 (142 deals)\n• Growth: $310,900 (390 deals)\n\n⚡ Summary: Enterprise generated 56.5% of total Q3 revenue with 99.4% pipeline accuracy.`,
  },
  'web-scraping': {
    title: 'Autonomous Web Extraction Agent',
    query: 'Extract pricing tables and spec sheets across 50 e-commerce URLs',
    result: `✓ Parsed DOM tree across 50 target URLs\n✓ Bypassed dynamic JS rendering & infinite scroll\n✓ Extracted 1,240 structured SKU items with prices, variants, and stock indicators\n✓ Exported clean schema to JSON / Parquet / CSV.`,
  },
  'data-cleaning': {
    title: 'AI Data Transformation & Cleaning Agent',
    query: 'Normalize dates, remove duplicate customer records, and calculate churn probability',
    result: `✓ Imputed 428 missing timestamps using context inference\n✓ Deduplicated 142 fuzzy-matched customer profiles\n✓ Generated predictive churn risk matrix (AUC: 0.94)\n✓ Transformed dataset ready for downstream vector embeddings and analytics.`,
  },
};
