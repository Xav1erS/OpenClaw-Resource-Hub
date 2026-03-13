const taskCategories = [
  { id: "research", name: "research" },
  { id: "content", name: "content" },
  { id: "ops", name: "ops" },
  { id: "dev", name: "dev" },
  { id: "office", name: "office" }
];

const taskTemplates = [
  {
    id: "startup-research-agent",
    name: "创业方向调研 Agent",
    category: "research",
    description: "围绕市场规模、竞争格局、用户痛点和切入机会，输出适合决策讨论的研究摘要。",
    stars: 1280,
    usageCount: 8420,
    preview: { estimatedTime: "5-8 min" },
    copyFormat: `name: Startup Research Agent
model: claude-sonnet-4.6
goal: Evaluate a startup opportunity before committing resources
inputs:
  market: "{{target_market}}"
  user_segment: "{{user_segment}}"
  region: "{{region}}"
tools:
  - browser
  - search
  - code_interpreter
steps:
  - Estimate TAM, SAM, and near-term growth rate
  - Identify 5 direct competitors and pricing positions
  - Extract the top user pain points from public discussions
  - Recommend entry wedges and differentiation angles
output:
  sections:
    - market_size
    - competitor_map
    - user_pains
    - entry_strategy
`
  },
  {
    id: "xiaohongshu-content-agent",
    name: "小红书内容策划 Agent",
    category: "content",
    description: "拆解热门笔记结构，产出标题、钩子、正文提纲和标签，适合快速起稿。",
    stars: 2130,
    usageCount: 15630,
    preview: { estimatedTime: "2-3 min" },
    copyFormat: `name: Xiaohongshu Content Agent
model: gpt-4o-mini
goal: Draft a high-converting Xiaohongshu post
inputs:
  topic: "{{topic}}"
  audience: "{{target_audience}}"
  product: "{{product_or_offer}}"
steps:
  - Review 10 popular posts in the same category
  - Extract title and hook patterns
  - Generate 5 title options and a post outline
  - Suggest visual ideas and 12 relevant tags
output:
  sections:
    - title_options
    - hook
    - outline
    - visual_direction
    - hashtags
`
  },
  {
    id: "support-triage-agent",
    name: "客服工单分流 Agent",
    category: "ops",
    description: "对用户问题做分类、判断紧急程度，并给出建议回复和流转队列。",
    stars: 760,
    usageCount: 6380,
    preview: { estimatedTime: "1-2 min" },
    copyFormat: `name: Support Ticket Triage
model: gpt-4o-mini
goal: Classify incoming support tickets and draft the first response
inputs:
  ticket_text: "{{ticket_text}}"
  customer_tier: "{{customer_tier}}"
  product_area: "{{product_area}}"
rules:
  - Flag billing and data-loss issues as high priority
  - Escalate angry or blocked users immediately
output:
  category: ""
  urgency: ""
  reply_draft: ""
  next_queue: ""
`
  },
  {
    id: "prd-review-agent",
    name: "PRD 审查 Agent",
    category: "dev",
    description: "找出需求文档中的模糊点、边界条件、依赖项和潜在阻塞因素。",
    stars: 540,
    usageCount: 4710,
    preview: { estimatedTime: "3-5 min" },
    copyFormat: `name: PRD Review Agent
model: claude-sonnet-4.6
goal: Review a product requirement doc before implementation starts
inputs:
  document: "{{prd_markdown}}"
checks:
  - missing constraints
  - undefined success metrics
  - edge cases
  - technical dependencies
  - release blockers
output:
  summary: ""
  risks: []
  questions: []
  release_blockers: []
`
  },
  {
    id: "weekly-report-agent",
    name: "增长周报 Agent",
    category: "office",
    description: "汇总核心指标、异常波动和建议动作，输出适合同步给团队的周报摘要。",
    stars: 680,
    usageCount: 5190,
    preview: { estimatedTime: "3 min" },
    copyFormat: `name: Growth Weekly Reporter
model: gpt-4o
goal: Summarize weekly business movement for the team
inputs:
  metrics:
    - uv
    - activation
    - retention
    - conversion
  anomalies: "{{anomaly_notes}}"
output:
  highlights: []
  risk_signals: []
  next_actions: []
`
  },
  {
    id: "meeting-summary-agent",
    name: "会议纪要 Agent",
    category: "office",
    description: "把会议记录压缩成摘要、决策、负责人和下一步行动，适合站会和复盘。",
    stars: 910,
    usageCount: 7310,
    preview: { estimatedTime: "2-4 min" },
    copyFormat: `name: Meeting Summary Agent
model: gpt-4o-mini
goal: Convert meeting transcripts into action-ready notes
inputs:
  transcript: "{{meeting_transcript}}"
output:
  summary: ""
  decisions: []
  action_items:
    - owner: ""
      task: ""
      due_date: ""
`
  },
  {
    id: "seo-brief-agent",
    name: "SEO Brief Agent",
    category: "content",
    description: "围绕核心关键词生成内容 brief，包括搜索意图、结构提纲、FAQ 和内链建议。",
    stars: 1180,
    usageCount: 6930,
    preview: { estimatedTime: "4 min" },
    copyFormat: `name: SEO Brief Agent
model: claude-sonnet-4.6
goal: Build an SEO content brief before writing
inputs:
  keyword: "{{primary_keyword}}"
  audience: "{{target_reader}}"
output:
  search_intent: ""
  title_ideas: []
  section_outline: []
  faq: []
  internal_links: []
`
  },
  {
    id: "bug-triage-agent",
    name: "Bug 分级 Agent",
    category: "dev",
    description: "读取 issue、日志和复现步骤，估算严重级别、影响范围和建议处理顺序。",
    stars: 970,
    usageCount: 5610,
    preview: { estimatedTime: "4-6 min" },
    copyFormat: `name: Bug Triage Agent
model: gpt-4o
goal: Triage a bug report using issue text and logs
inputs:
  issue: "{{issue_description}}"
  logs: "{{relevant_logs}}"
  repro_steps: "{{repro_steps}}"
output:
  severity: ""
  probable_root_cause: ""
  affected_scope: ""
  suggested_owner: ""
`
  }
];
