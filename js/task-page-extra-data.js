taskTemplates.push(
  {
    id: "competitor-monitor-agent",
    name: "Competitor Monitor Agent",
    category: "research",
    description: "Track pricing changes, product launches, and user sentiment across key competitors every week.",
    stars: 840,
    usageCount: 4980,
    preview: { estimatedTime: "6-10 min" },
    copyFormat: `name: Competitor Monitor Agent
model: claude-sonnet-4.6
goal: Monitor competitor product changes on a weekly basis
inputs:
  competitors:
    - "{{competitor_1}}"
    - "{{competitor_2}}"
  market: "{{market_segment}}"
steps:
  - Scan pricing pages and release notes
  - Capture feature launches and packaging changes
  - Summarize user sentiment from public channels
  - Flag moves that may affect positioning
output:
  pricing_changes: []
  product_changes: []
  user_signals: []
  recommended_response: []
`
  },
  {
    id: "user-interview-synthesis-agent",
    name: "User Interview Synthesis Agent",
    category: "research",
    description: "Turn scattered interview notes into patterns, objections, and product opportunities.",
    stars: 910,
    usageCount: 4310,
    preview: { estimatedTime: "5-8 min" },
    copyFormat: `name: User Interview Synthesis Agent
model: claude-sonnet-4.6
goal: Synthesize user interview notes into actionable findings
inputs:
  transcript_bundle: "{{interview_notes}}"
steps:
  - Group recurring pains and desired outcomes
  - Extract objections and switching triggers
  - Highlight notable quotes
output:
  top_pains: []
  top_motivations: []
  objections: []
  recommendations: []
`
  },
  {
    id: "market-entry-brief-agent",
    name: "Market Entry Brief Agent",
    category: "research",
    description: "Build a fast market-entry brief for a new geography, segment, or customer type.",
    stars: 760,
    usageCount: 3120,
    preview: { estimatedTime: "6-9 min" },
    copyFormat: `name: Market Entry Brief Agent
model: gpt-4o
goal: Build a short market-entry brief for a new segment
inputs:
  segment: "{{segment}}"
  region: "{{region}}"
steps:
  - Summarize demand and competition
  - Estimate likely barriers to entry
  - Recommend a first wedge strategy
output:
  demand_signal: ""
  competitor_snapshot: []
  barriers: []
  entry_wedge: ""
`
  },
  {
    id: "longform-repurpose-agent",
    name: "Longform Repurpose Agent",
    category: "content",
    description: "Break one long article into a thread, newsletter summary, FAQ, and social post variants.",
    stars: 1120,
    usageCount: 6050,
    preview: { estimatedTime: "5-8 min" },
    copyFormat: `name: Longform Repurpose Agent
model: gpt-4o-mini
goal: Repurpose one long article into multiple distribution formats
inputs:
  source_content: "{{article_markdown}}"
  channels:
    - x_thread
    - newsletter
    - faq
    - linkedin
steps:
  - Extract the main argument and 3 supporting ideas
  - Draft channel-specific versions
  - Highlight reusable quotes and pull-lines
output:
  x_thread: []
  newsletter_summary: ""
  faq: []
  linkedin_post: ""
`
  },
  {
    id: "landing-page-copy-agent",
    name: "Landing Page Copy Agent",
    category: "content",
    description: "Draft hero copy, proof sections, FAQ, and CTA blocks for a product landing page.",
    stars: 980,
    usageCount: 5220,
    preview: { estimatedTime: "4-7 min" },
    copyFormat: `name: Landing Page Copy Agent
model: claude-sonnet-4.6
goal: Draft the core copy blocks for a landing page
inputs:
  product: "{{product_name}}"
  audience: "{{target_audience}}"
  proof_points: "{{proof_points}}"
steps:
  - Draft hero headline and subheadline
  - Build 3 value sections and a proof block
  - Generate FAQ and CTA copy
output:
  hero: ""
  value_sections: []
  faq: []
  cta: ""
`
  },
  {
    id: "newsletter-editor-agent",
    name: "Newsletter Editor Agent",
    category: "content",
    description: "Turn raw updates into a concise weekly newsletter with clear sections and subject lines.",
    stars: 670,
    usageCount: 2860,
    preview: { estimatedTime: "4-6 min" },
    copyFormat: `name: Newsletter Editor Agent
model: gpt-4o-mini
goal: Turn raw updates into a weekly newsletter draft
inputs:
  raw_updates: "{{updates}}"
  audience: "{{audience}}"
steps:
  - Group updates by importance
  - Draft 3 subject line options
  - Produce a clean newsletter body
output:
  subject_lines: []
  intro: ""
  sections: []
`
  },
  {
    id: "sales-call-brief-agent",
    name: "Sales Call Brief Agent",
    category: "ops",
    description: "Compress account background, CRM notes, and likely talking points into a one-page pre-call brief.",
    stars: 720,
    usageCount: 3620,
    preview: { estimatedTime: "3-5 min" },
    copyFormat: `name: Sales Call Brief Agent
model: gpt-4o-mini
goal: Prepare a pre-call brief for an upcoming sales conversation
inputs:
  company: "{{company_name}}"
  contact: "{{contact_name}}"
  crm_notes: "{{crm_notes}}"
  website: "{{company_website}}"
steps:
  - Summarize company background and likely needs
  - Extract previous touchpoints from CRM notes
  - Match product value props to the account
  - Draft 5 discovery questions for the call
output:
  account_summary: ""
  risk_flags: []
  call_objectives: []
  discovery_questions: []
`
  },
  {
    id: "onboarding-checkin-agent",
    name: "Onboarding Check-in Agent",
    category: "ops",
    description: "Draft customer onboarding follow-ups based on milestones, blockers, and usage activity.",
    stars: 580,
    usageCount: 2540,
    preview: { estimatedTime: "3-4 min" },
    copyFormat: `name: Onboarding Check-in Agent
model: gpt-4o-mini
goal: Draft onboarding follow-up messages for a customer account
inputs:
  account_status: "{{account_status}}"
  milestones: "{{milestones}}"
  blockers: "{{blockers}}"
output:
  health_status: ""
  next_message: ""
  next_actions: []
`
  },
  {
    id: "churn-risk-rescue-agent",
    name: "Churn Risk Rescue Agent",
    category: "ops",
    description: "Identify retention risks from account notes and propose a recovery message with next actions.",
    stars: 690,
    usageCount: 2920,
    preview: { estimatedTime: "4-6 min" },
    copyFormat: `name: Churn Risk Rescue Agent
model: claude-sonnet-4.6
goal: Respond to a customer account that shows churn risk
inputs:
  account_notes: "{{notes}}"
  usage_signal: "{{usage_signal}}"
  complaints: "{{complaints}}"
output:
  risk_level: ""
  likely_reasons: []
  rescue_message: ""
  follow_up_actions: []
`
  },
  {
    id: "ops-handbook-agent",
    name: "Ops Handbook Agent",
    category: "ops",
    description: "Turn scattered process notes into a cleaner internal handbook for recurring operations tasks.",
    stars: 540,
    usageCount: 2210,
    preview: { estimatedTime: "5-7 min" },
    copyFormat: `name: Ops Handbook Agent
model: gpt-4o
goal: Organize messy process notes into an internal handbook draft
inputs:
  notes: "{{process_notes}}"
  audience: "{{team_role}}"
output:
  sections: []
  step_checklists: []
  risk_notes: []
`
  },
  {
    id: "release-note-drafter",
    name: "Release Note Drafter",
    category: "dev",
    description: "Turn merged PRs and issue summaries into user-facing release notes that non-engineers can read.",
    stars: 660,
    usageCount: 2840,
    preview: { estimatedTime: "4-7 min" },
    copyFormat: `name: Release Note Drafter
model: gpt-4o
goal: Turn engineering changes into user-facing release notes
inputs:
  prs: "{{merged_pr_list}}"
  issues: "{{issue_summaries}}"
  audience: "{{target_audience}}"
rules:
  - Group changes by user impact
  - Keep the summary readable for non-engineers
output:
  headline: ""
  highlights: []
  fixes: []
  upgrade_notes: []
`
  },
  {
    id: "qa-regression-planner-agent",
    name: "QA Regression Planner Agent",
    category: "dev",
    description: "Turn a release diff into a prioritized regression checklist for QA or manual verification.",
    stars: 610,
    usageCount: 2670,
    preview: { estimatedTime: "4-6 min" },
    copyFormat: `name: QA Regression Planner Agent
model: claude-sonnet-4.6
goal: Build a regression checklist from a release diff
inputs:
  changed_areas: "{{release_diff}}"
  risk_notes: "{{risk_notes}}"
output:
  critical_checks: []
  smoke_checks: []
  risky_areas: []
`
  },
  {
    id: "hiring-debrief-agent",
    name: "Hiring Debrief Agent",
    category: "office",
    description: "Summarize interview notes into a hiring recommendation, concerns, and follow-up questions.",
    stars: 570,
    usageCount: 2310,
    preview: { estimatedTime: "3-5 min" },
    copyFormat: `name: Hiring Debrief Agent
model: gpt-4o-mini
goal: Summarize candidate interviews into a decision-ready debrief
inputs:
  interview_notes: "{{notes}}"
  role: "{{role_name}}"
output:
  recommendation: ""
  strengths: []
  concerns: []
  follow_up_questions: []
`
  },
  {
    id: "priority-planning-agent",
    name: "Priority Planning Agent",
    category: "office",
    description: "Turn a long weekly task list into a priority plan with clear owners and sequencing.",
    stars: 630,
    usageCount: 2480,
    preview: { estimatedTime: "3-5 min" },
    copyFormat: `name: Priority Planning Agent
model: gpt-4o-mini
goal: Turn a messy weekly task list into a prioritized execution plan
inputs:
  backlog: "{{weekly_backlog}}"
  constraints: "{{constraints}}"
output:
  top_priorities: []
  sequence: []
  defer_list: []
`
  }
);
