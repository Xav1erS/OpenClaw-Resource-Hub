const taskCategories = [
  { id: "market", name: "市场调研", icon: "📊" },
  { id: "product", name: "产品分析", icon: "📱" },
  { id: "content", name: "内容创作", icon: "✍️" },
  { id: "dev", name: "开发辅助", icon: "💻" },
  { id: "office", name: "办公效率", icon: "📈" }
];

const taskTemplates = [
  {
    id: "startup-research-agent",
    name: "创业方向调研Agent",
    category: "市场调研",
    description: "深度分析创业方向，自动拆解为5个步骤，利用浏览器搜索、数据分析、对比评估",
    type: "agent-workflow",
    agent: {
      name: "Startup Research Agent",
      model: "claude-sonnet-4.6",
      maxSteps: 10,
      tools: ["browser", "search", "code_interpreter"],
      task: "分析创业方向【{idea}】的可行性，从市场、竞品、盈利模式、差异化四个维度深度分析",
      steps: [
        {
          step: 1,
          name: "收集市场规模数据",
          prompt: "使用browser工具搜索【{idea}】的市场规模、增长趋势、用户基数，输出具体数据",
          tools: ["browser", "search"],
          output: "market_size_report"
        },
        {
          step: 2,
          name: "找出主要竞品",
          prompt: "搜索【{idea}】的主要竞争对手，收集其产品特点、定价策略、市场份额",
          tools: ["browser", "search"],
          output: "competitor_analysis"
        },
        {
          step: 3,
          name: "分析盈利模式",
          prompt: "基于搜索结果，分析【{idea}】的盈利模式、变现路径、单用户价值",
          tools: ["code_interpreter"],
          input: ["market_size_report", "competitor_analysis"],
          output: "revenue_model"
        },
        {
          step: 4,
          name: "给出差异化建议",
          prompt: "综合前面的分析，找出【{idea}】的差异化机会，给出3个具体建议",
          input: ["market_size_report", "competitor_analysis", "revenue_model"],
          output: "differentiation_strategy"
        },
        {
          step: 5,
          name: "输出可行性报告",
          prompt: "整合所有步骤的输出，生成一份结构化的可行性报告，包含：市场评分（1-10）、竞争激烈度、盈利潜力、风险提示",
          input: ["market_size_report", "competitor_analysis", "revenue_model", "differentiation_strategy"],
          output: "final_report"
        }
      ],
      iteration: {
        enabled: true,
        maxIterations: 2,
        criteria: "如果市场评分<5，自动触发第二轮深度调研"
      }
    },
    preview: {
      estimatedTime: "5-8分钟",
      estimatedCost: "$0.08-0.15",
      complexity: "中等",
      toolsUsed: ["Browser", "Search", "Code Interpreter"],
      steps: ["收集市场规模", "找出竞品", "分析盈利模式", "差异化建议", "可行性报告"]
    },
    copyFormat: `name: Startup Research Agent
model: claude-sonnet-4.6
task: 分析创业方向【{idea}】的可行性
tools:
  - browser
  - search
  - code_interpreter
steps:
  - name: 收集市场规模数据
    prompt: 使用browser工具搜索【{idea}】的市场规模
    tools: [browser, search]
  - name: 找出主要竞品
    prompt: 搜索【{idea}】的主要竞争对手
    tools: [browser, search]
  - name: 分析盈利模式
    prompt: 分析盈利模式和变现路径
    tools: [code_interpreter]
  - name: 给出差异化建议
    prompt: 综合分析，给出3个差异化建议
  - name: 输出可行性报告
    prompt: 整合所有步骤，生成可行性报告
iteration:
  enabled: true
  maxIterations: 2`,
    usageCount: 8420,
    stars: 1280
  },
  {
    id: "xiaohongshu-agent",
    name: "小红书爆款生成Agent",
    category: "内容创作",
    description: "自动生成符合小红书风格的爆款笔记，包含标题、正文、话题标签",
    type: "agent-workflow",
    agent: {
      name: "Xiaohongshu Content Agent",
      model: "gpt-4o-mini",
      maxSteps: 4,
      tools: ["search", "code_interpreter"],
      task: "为【{product}】生成小红书爆款笔记，包含吸引人的标题、正文、话题标签",
      steps: [
        {
          step: 1,
          name: "搜索同类产品爆款笔记",
          prompt: "搜索小红书上【{product}】的爆款笔记，分析标题特征、正文结构、话题标签规律",
          tools: ["search"],
          output: "trending_analysis"
        },
        {
          step: 2,
          name: "生成多个标题选项",
          prompt: "基于【{product}】和爆款笔记分析，生成10个吸引人的标题（数字+痛点+解决方案结构）",
          input: ["trending_analysis"],
          output: "title_options"
        },
        {
          step: 3,
          name: "生成正文内容",
          prompt: "生成正文，包含：开头吸引点、3个核心卖点、使用场景、结尾互动引导，自然植入emoji",
          input: ["trending_analysis", "title_options"],
          output: "content_body"
        },
        {
          step: 4,
          name: "生成话题标签",
          prompt: "根据【{product}】和正文内容，生成10-15个高流量话题标签",
          input: ["content_body"],
          output: "hashtags"
        }
      ]
    },
    preview: {
      estimatedTime: "2-3分钟",
      estimatedCost: "$0.02-0.04",
      complexity: "简单",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["搜索爆款笔记", "生成标题", "生成正文", "生成话题标签"]
    },
    copyFormat: `name: Xiaohongshu Content Agent
model: gpt-4o-mini
task: 为【{product}】生成小红书爆款笔记
tools:
  - search
  - code_interpreter
steps:
  - name: 搜索同类产品爆款笔记
    prompt: 搜索小红书上【{product}】的爆款笔记
    tools: [search]
  - name: 生成多个标题选项
    prompt: 生成10个吸引人的标题
  - name: 生成正文内容
    prompt: 生成正文，包含开头吸引点、核心卖点、使用场景
  - name: 生成话题标签
    prompt: 生成10-15个高流量话题标签`,
    usageCount: 15630,
    stars: 2130
  },
  {
    id: "market-trend-analyzer",
    name: "市场趋势分析Agent",
    category: "市场调研",
    description: "分析指定行业的市场趋势、竞争格局和未来机会",
    type: "agent-workflow",
    agent: {
      name: "Market Trend Analyzer",
      model: "claude-3-opus",
      maxSteps: 6,
      tools: ["browser", "search", "code_interpreter"],
      task: "分析【{industry}】行业的市场趋势、竞争格局和未来机会",
      steps: [
        { step: 1, name: "收集行业数据", prompt: "搜索【{industry}】行业的最新数据和报告", tools: ["browser", "search"], output: "industry_data" },
        { step: 2, name: "分析竞争格局", prompt: "识别主要竞争者并分析其市场份额", tools: ["search"], input: ["industry_data"], output: "competitive_landscape" },
        { step: 3, name: "识别增长趋势", prompt: "分析行业增长驱动因素和趋势", tools: ["code_interpreter"], input: ["industry_data"], output: "growth_trends" },
        { step: 4, name: "发现市场机会", prompt: "基于分析结果，找出市场空白和机会点", input: ["industry_data", "growth_trends"], output: "market_opportunities" },
        { step: 5, name: "生成洞察报告", prompt: "整合所有分析，生成完整的市场趋势报告", input: ["industry_data", "competitive_landscape", "growth_trends", "market_opportunities"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "6-10分钟",
      estimatedCost: "$0.10-0.20",
      complexity: "中等",
      toolsUsed: ["Browser", "Search", "Code Interpreter"],
      steps: ["收集行业数据", "分析竞争格局", "识别增长趋势", "发现市场机会", "生成洞察报告"]
    },
    copyFormat: `name: Market Trend Analyzer
model: claude-3-opus
task: 分析【{industry}】行业的市场趋势
tools: [browser, search, code_interpreter]
steps:
  - name: 收集行业数据
    prompt: 搜索【{industry}】行业的最新数据
    tools: [browser, search]
  - name: 分析竞争格局
    prompt: 识别主要竞争者并分析市场份额
  - name: 识别增长趋势
    prompt: 分析行业增长驱动因素和趋势
  - name: 发现市场机会
    prompt: 找出市场空白和机会点
  - name: 生成洞察报告
    prompt: 整合分析，生成完整报告`,
    usageCount: 7230,
    stars: 980
  },
  {
    id: "code-review-agent",
    name: "代码审查Agent",
    category: "开发辅助",
    description: "自动审查代码质量，识别潜在问题并提供改进建议",
    type: "agent-workflow",
    agent: {
      name: "Code Review Agent",
      model: "gpt-4o",
      maxSteps: 5,
      tools: ["search", "code_interpreter"],
      task: "审查【{code}】的代码质量，识别潜在问题并提供改进建议",
      steps: [
        { step: 1, name: "语法检查", prompt: "检查代码的语法错误和格式问题", tools: ["code_interpreter"], output: "syntax_issues" },
        { step: 2, name: "逻辑分析", prompt: "分析代码逻辑，识别潜在的bug和漏洞", input: ["syntax_issues"], output: "logic_issues" },
        { step: 3, name: "性能评估", prompt: "评估代码性能，找出可优化的地方", tools: ["code_interpreter"], input: ["syntax_issues"], output: "performance_issues" },
        { step: 4, name: "最佳实践检查", prompt: "检查代码是否符合最佳实践和编码规范", input: ["syntax_issues", "logic_issues"], output: "best_practice_issues" },
        { step: 5, name: "生成审查报告", prompt: "整合所有发现，生成详细的代码审查报告", input: ["syntax_issues", "logic_issues", "performance_issues", "best_practice_issues"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "3-5分钟",
      estimatedCost: "$0.05-0.10",
      complexity: "中等",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["语法检查", "逻辑分析", "性能评估", "最佳实践检查", "生成审查报告"]
    },
    copyFormat: `name: Code Review Agent
model: gpt-4o
task: 审查代码质量
tools: [search, code_interpreter]
steps:
  - name: 语法检查
    prompt: 检查代码的语法错误
    tools: [code_interpreter]
  - name: 逻辑分析
    prompt: 识别潜在的bug和漏洞
  - name: 性能评估
    prompt: 评估代码性能，找出可优化点
  - name: 最佳实践检查
    prompt: 检查是否符合编码规范
  - name: 生成审查报告
    prompt: 整合发现，生成详细报告`,
    usageCount: 9850,
    stars: 1420
  },
  {
    id: "meeting-minutes-agent",
    name: "会议纪要生成Agent",
    category: "办公效率",
    description: "将会议录音或文字转录整理成结构化的会议纪要",
    type: "agent-workflow",
    agent: {
      name: "Meeting Minutes Agent",
      model: "claude-sonnet-4.6",
      maxSteps: 4,
      tools: ["code_interpreter"],
      task: "将【{meeting_content}】整理成结构化的会议纪要",
      steps: [
        { step: 1, name: "内容解析", prompt: "解析会议内容，识别主要议题和参与者", output: "parsed_content" },
        { step: 2, name: "关键点提取", prompt: "提取会议中的关键决策和行动项", input: ["parsed_content"], output: "key_points" },
        { step: 3, name: "责任分配", prompt: "识别每个行动项的负责人和截止日期", input: ["key_points"], output: "action_items" },
        { step: 4, name: "生成纪要", prompt: "生成结构化的会议纪要文档", input: ["parsed_content", "key_points", "action_items"], output: "final_minutes" }
      ]
    },
    preview: {
      estimatedTime: "2-4分钟",
      estimatedCost: "$0.03-0.06",
      complexity: "简单",
      toolsUsed: ["Code Interpreter"],
      steps: ["内容解析", "关键点提取", "责任分配", "生成纪要"]
    },
    copyFormat: `name: Meeting Minutes Agent
model: claude-sonnet-4.6
task: 整理会议纪要
tools: [code_interpreter]
steps:
  - name: 内容解析
    prompt: 解析会议内容，识别议题和参与者
  - name: 关键点提取
    prompt: 提取关键决策和行动项
  - name: 责任分配
    prompt: 识别负责人和截止日期
  - name: 生成纪要
    prompt: 生成结构化的会议纪要`,
    usageCount: 6780,
    stars: 890
  },
  {
    id: "product-requirements-agent",
    name: "产品需求分析Agent",
    category: "产品分析",
    description: "分析产品需求，生成详细的PRD文档和功能规格说明",
    type: "agent-workflow",
    agent: {
      name: "Product Requirements Agent",
      model: "claude-3-opus",
      maxSteps: 6,
      tools: ["search", "code_interpreter"],
      task: "分析【{product_idea}】的需求，生成详细的PRD文档",
      steps: [
        { step: 1, name: "需求收集", prompt: "收集和整理产品需求", output: "requirements" },
        { step: 2, name: "用户分析", prompt: "分析目标用户和使用场景", input: ["requirements"], output: "user_analysis" },
        { step: 3, name: "功能规划", prompt: "规划核心功能和功能优先级", input: ["requirements", "user_analysis"], output: "feature_plan" },
        { step: 4, name: "竞品分析", prompt: "分析竞品功能和市场定位", tools: ["search"], input: ["requirements"], output: "competitive_analysis" },
        { step: 5, name: "技术评估", prompt: "评估技术可行性和架构方案", input: ["feature_plan"], output: "tech_assessment" },
        { step: 6, name: "生成PRD", prompt: "生成完整的产品需求文档", input: ["requirements", "user_analysis", "feature_plan", "competitive_analysis", "tech_assessment"], output: "final_prd" }
      ]
    },
    preview: {
      estimatedTime: "8-12分钟",
      estimatedCost: "$0.15-0.25",
      complexity: "复杂",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["需求收集", "用户分析", "功能规划", "竞品分析", "技术评估", "生成PRD"]
    },
    copyFormat: `name: Product Requirements Agent
model: claude-3-opus
task: 生成产品需求文档
tools: [search, code_interpreter]
steps:
  - name: 需求收集
    prompt: 收集和整理产品需求
  - name: 用户分析
    prompt: 分析目标用户和使用场景
  - name: 功能规划
    prompt: 规划核心功能和优先级
  - name: 竞品分析
    prompt: 分析竞品功能和市场定位
    tools: [search]
  - name: 技术评估
    prompt: 评估技术可行性和架构方案
  - name: 生成PRD
    prompt: 生成完整的产品需求文档`,
    usageCount: 5620,
    stars: 750
  },
  {
    id: "social-media-scheduler",
    name: "社交媒体内容规划Agent",
    category: "内容创作",
    description: "规划一周的社交媒体内容，生成详细的发布日历和文案",
    type: "agent-workflow",
    agent: {
      name: "Social Media Scheduler",
      model: "gpt-4o-mini",
      maxSteps: 5,
      tools: ["search", "code_interpreter"],
      task: "为【{brand}】规划一周的社交媒体内容",
      steps: [
        { step: 1, name: "内容策略", prompt: "制定本周内容主题和策略", output: "content_strategy" },
        { step: 2, name: "热点追踪", prompt: "搜索本周热点话题和趋势", tools: ["search"], output: "trending_topics" },
        { step: 3, name: "内容创作", prompt: "为每一天创作内容文案", input: ["content_strategy", "trending_topics"], output: "content_drafts" },
        { step: 4, name: "发布规划", prompt: "安排最佳发布时间和平台", input: ["content_drafts"], output: "publish_schedule" },
        { step: 5, name: "生成日历", prompt: "生成完整的内容日历", input: ["content_drafts", "publish_schedule"], output: "final_calendar" }
      ]
    },
    preview: {
      estimatedTime: "4-6分钟",
      estimatedCost: "$0.06-0.12",
      complexity: "中等",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["内容策略", "热点追踪", "内容创作", "发布规划", "生成日历"]
    },
    copyFormat: `name: Social Media Scheduler
model: gpt-4o-mini
task: 规划一周社交媒体内容
tools: [search, code_interpreter]
steps:
  - name: 内容策略
    prompt: 制定本周内容主题和策略
  - name: 热点追踪
    prompt: 搜索本周热点话题
    tools: [search]
  - name: 内容创作
    prompt: 为每一天创作内容文案
  - name: 发布规划
    prompt: 安排最佳发布时间
  - name: 生成日历
    prompt: 生成完整的内容日历`,
    usageCount: 8940,
    stars: 1150
  },
  {
    id: "api-documentation-agent",
    name: "API文档生成Agent",
    category: "开发辅助",
    description: "根据代码自动生成详细的API文档",
    type: "agent-workflow",
    agent: {
      name: "API Documentation Agent",
      model: "gpt-4o",
      maxSteps: 5,
      tools: ["code_interpreter"],
      task: "为【{api_code}】生成详细的API文档",
      steps: [
        { step: 1, name: "代码解析", prompt: "解析代码结构，识别所有API端点", tools: ["code_interpreter"], output: "api_structure" },
        { step: 2, name: "参数分析", prompt: "分析每个端点的请求参数和响应格式", input: ["api_structure"], output: "param_details" },
        { step: 3, name: "示例生成", prompt: "为每个端点生成请求和响应示例", input: ["api_structure", "param_details"], output: "examples" },
        { step: 4, name: "文档撰写", prompt: "撰写API说明文档和使用指南", input: ["api_structure", "param_details", "examples"], output: "doc_content" },
        { step: 5, name: "格式整理", prompt: "整理成标准的API文档格式", input: ["doc_content"], output: "final_documentation" }
      ]
    },
    preview: {
      estimatedTime: "4-7分钟",
      estimatedCost: "$0.08-0.14",
      complexity: "中等",
      toolsUsed: ["Code Interpreter"],
      steps: ["代码解析", "参数分析", "示例生成", "文档撰写", "格式整理"]
    },
    copyFormat: `name: API Documentation Agent
model: gpt-4o
task: 生成API文档
tools: [code_interpreter]
steps:
  - name: 代码解析
    prompt: 解析代码结构，识别API端点
    tools: [code_interpreter]
  - name: 参数分析
    prompt: 分析请求参数和响应格式
  - name: 示例生成
    prompt: 生成请求和响应示例
  - name: 文档撰写
    prompt: 撰写API说明文档
  - name: 格式整理
    prompt: 整理成标准文档格式`,
    usageCount: 7650,
    stars: 990
  },
  {
    id: "email-writing-agent",
    name: "专业邮件写作Agent",
    category: "办公效率",
    description: "根据场景自动生成专业的商务邮件",
    type: "agent-workflow",
    agent: {
      name: "Email Writing Agent",
      model: "claude-sonnet-4.6",
      maxSteps: 3,
      tools: ["code_interpreter"],
      task: "为【{email_scenario}】生成专业邮件",
      steps: [
        { step: 1, name: "场景分析", prompt: "分析邮件场景和目标受众", output: "scenario_analysis" },
        { step: 2, name: "内容撰写", prompt: "撰写邮件内容，确保语气专业", input: ["scenario_analysis"], output: "email_draft" },
        { step: 3, name: "优化润色", prompt: "优化邮件表达，确保清晰有效", input: ["email_draft"], output: "final_email" }
      ]
    },
    preview: {
      estimatedTime: "1-2分钟",
      estimatedCost: "$0.01-0.03",
      complexity: "简单",
      toolsUsed: ["Code Interpreter"],
      steps: ["场景分析", "内容撰写", "优化润色"]
    },
    copyFormat: `name: Email Writing Agent
model: claude-sonnet-4.6
task: 生成专业邮件
tools: [code_interpreter]
steps:
  - name: 场景分析
    prompt: 分析邮件场景和目标受众
  - name: 内容撰写
    prompt: 撰写专业邮件内容
  - name: 优化润色
    prompt: 优化邮件表达`,
    usageCount: 12450,
    stars: 1680
  },
  {
    id: "competitor-monitor-agent",
    name: "竞品监控Agent",
    category: "市场调研",
    description: "监控竞品动态，收集价格变化、功能更新、营销活动等信息",
    type: "agent-workflow",
    agent: {
      name: "Competitor Monitor Agent",
      model: "claude-3-opus",
      maxSteps: 5,
      tools: ["browser", "search"],
      task: "监控【{competitor}】的最新动态",
      steps: [
        { step: 1, name: "网站监控", prompt: "访问竞品网站，检查更新和变化", tools: ["browser"], output: "website_changes" },
        { step: 2, name: "新闻搜索", prompt: "搜索竞品相关新闻和公告", tools: ["search"], output: "news_updates" },
        { step: 3, name: "社交媒体", prompt: "检查竞品社交媒体账号动态", tools: ["search"], output: "social_updates" },
        { step: 4, name: "价格监控", prompt: "记录价格变化和促销活动", input: ["website_changes"], output: "price_changes" },
        { step: 5, name: "生成报告", prompt: "整合所有信息，生成竞品监控报告", input: ["website_changes", "news_updates", "social_updates", "price_changes"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "5-8分钟",
      estimatedCost: "$0.09-0.16",
      complexity: "中等",
      toolsUsed: ["Browser", "Search"],
      steps: ["网站监控", "新闻搜索", "社交媒体", "价格监控", "生成报告"]
    },
    copyFormat: `name: Competitor Monitor Agent
model: claude-3-opus
task: 监控竞品动态
tools: [browser, search]
steps:
  - name: 网站监控
    prompt: 访问竞品网站检查更新
    tools: [browser]
  - name: 新闻搜索
    prompt: 搜索竞品相关新闻
    tools: [search]
  - name: 社交媒体
    prompt: 检查竞品社交媒体动态
    tools: [search]
  - name: 价格监控
    prompt: 记录价格变化和促销
  - name: 生成报告
    prompt: 整合信息生成监控报告`,
    usageCount: 6120,
    stars: 820
  },
  {
    id: "bug-report-agent",
    name: "Bug报告生成Agent",
    category: "开发辅助",
    description: "自动生成详细的Bug报告，包含复现步骤和预期行为",
    type: "agent-workflow",
    agent: {
      name: "Bug Report Agent",
      model: "gpt-4o",
      maxSteps: 4,
      tools: ["code_interpreter"],
      task: "为【{bug_description}】生成详细的Bug报告",
      steps: [
        { step: 1, name: "问题分析", prompt: "分析Bug描述，提取关键信息", output: "bug_analysis" },
        { step: 2, name: "复现步骤", prompt: "整理详细的复现步骤", input: ["bug_analysis"], output: "reproduction_steps" },
        { step: 3, name: "环境信息", prompt: "收集必要的环境信息", input: ["bug_analysis"], output: "environment_info" },
        { step: 4, name: "生成报告", prompt: "生成标准格式的Bug报告", input: ["bug_analysis", "reproduction_steps", "environment_info"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "2-3分钟",
      estimatedCost: "$0.02-0.05",
      complexity: "简单",
      toolsUsed: ["Code Interpreter"],
      steps: ["问题分析", "复现步骤", "环境信息", "生成报告"]
    },
    copyFormat: `name: Bug Report Agent
model: gpt-4o
task: 生成Bug报告
tools: [code_interpreter]
steps:
  - name: 问题分析
    prompt: 分析Bug描述，提取关键信息
  - name: 复现步骤
    prompt: 整理详细的复现步骤
  - name: 环境信息
    prompt: 收集必要的环境信息
  - name: 生成报告
    prompt: 生成标准格式的Bug报告`,
    usageCount: 8230,
    stars: 1080
  },
  {
    id: "data-visualization-agent",
    name: "数据可视化Agent",
    category: "办公效率",
    description: "自动分析数据并生成可视化图表和洞察报告",
    type: "agent-workflow",
    agent: {
      name: "Data Visualization Agent",
      model: "claude-sonnet-4.6",
      maxSteps: 5,
      tools: ["code_interpreter"],
      task: "分析【{data}】并生成可视化报告",
      steps: [
        { step: 1, name: "数据解析", prompt: "解析和清洗数据", tools: ["code_interpreter"], output: "cleaned_data" },
        { step: 2, name: "探索分析", prompt: "进行探索性数据分析", input: ["cleaned_data"], output: "eda_results" },
        { step: 3, name: "图表选择", prompt: "选择合适的图表类型", input: ["eda_results"], output: "chart_plan" },
        { step: 4, name: "生成图表", prompt: "生成可视化图表代码", tools: ["code_interpreter"], input: ["cleaned_data", "chart_plan"], output: "charts" },
        { step: 5, name: "生成报告", prompt: "生成数据洞察报告", input: ["eda_results", "charts"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "4-6分钟",
      estimatedCost: "$0.06-0.11",
      complexity: "中等",
      toolsUsed: ["Code Interpreter"],
      steps: ["数据解析", "探索分析", "图表选择", "生成图表", "生成报告"]
    },
    copyFormat: `name: Data Visualization Agent
model: claude-sonnet-4.6
task: 分析数据并生成可视化
tools: [code_interpreter]
steps:
  - name: 数据解析
    prompt: 解析和清洗数据
    tools: [code_interpreter]
  - name: 探索分析
    prompt: 进行探索性数据分析
  - name: 图表选择
    prompt: 选择合适的图表类型
  - name: 生成图表
    prompt: 生成可视化图表代码
    tools: [code_interpreter]
  - name: 生成报告
    prompt: 生成数据洞察报告`,
    usageCount: 6890,
    stars: 920
  },
  {
    id: "user-interview-agent",
    name: "用户访谈分析Agent",
    category: "产品分析",
    description: "分析用户访谈记录，提取洞察和需求",
    type: "agent-workflow",
    agent: {
      name: "User Interview Agent",
      model: "claude-3-opus",
      maxSteps: 5,
      tools: ["code_interpreter"],
      task: "分析【{interview_transcript}】用户访谈记录",
      steps: [
        { step: 1, name: "内容转录", prompt: "处理访谈内容，识别关键主题", output: "themes" },
        { step: 2, name: "痛点识别", prompt: "识别用户痛点和抱怨", input: ["themes"], output: "pain_points" },
        { step: 3, name: "需求提取", prompt: "提取用户需求和期望", input: ["themes", "pain_points"], output: "user_needs" },
        { step: 4, name: "洞察分析", prompt: "生成用户洞察和建议", input: ["themes", "pain_points", "user_needs"], output: "insights" },
        { step: 5, name: "生成报告", prompt: "整理成完整的用户研究报告", input: ["themes", "pain_points", "user_needs", "insights"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "5-8分钟",
      estimatedCost: "$0.08-0.15",
      complexity: "中等",
      toolsUsed: ["Code Interpreter"],
      steps: ["内容转录", "痛点识别", "需求提取", "洞察分析", "生成报告"]
    },
    copyFormat: `name: User Interview Agent
model: claude-3-opus
task: 分析用户访谈记录
tools: [code_interpreter]
steps:
  - name: 内容转录
    prompt: 识别关键主题
  - name: 痛点识别
    prompt: 识别用户痛点和抱怨
  - name: 需求提取
    prompt: 提取用户需求和期望
  - name: 洞察分析
    prompt: 生成用户洞察和建议
  - name: 生成报告
    prompt: 整理成用户研究报告`,
    usageCount: 5340,
    stars: 710
  },
  {
    id: "seo-content-agent",
    name: "SEO内容优化Agent",
    category: "内容创作",
    description: "优化文章内容，提升搜索引擎排名",
    type: "agent-workflow",
    agent: {
      name: "SEO Content Agent",
      model: "gpt-4o-mini",
      maxSteps: 5,
      tools: ["search", "code_interpreter"],
      task: "优化【{content}】的SEO表现",
      steps: [
        { step: 1, name: "关键词研究", prompt: "搜索相关关键词和搜索量", tools: ["search"], output: "keywords" },
        { step: 2, name: "内容分析", prompt: "分析现有内容的SEO问题", input: ["keywords"], output: "content_analysis" },
        { step: 3, name: "结构优化", prompt: "优化内容结构和标题", input: ["content_analysis"], output: "structure_optimized" },
        { step: 4, name: "关键词植入", prompt: "自然植入关键词", input: ["keywords", "structure_optimized"], output: "keyword_optimized" },
        { step: 5, name: "生成优化版", prompt: "生成最终优化后的内容", input: ["keyword_optimized"], output: "final_content" }
      ]
    },
    preview: {
      estimatedTime: "4-6分钟",
      estimatedCost: "$0.05-0.10",
      complexity: "中等",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["关键词研究", "内容分析", "结构优化", "关键词植入", "生成优化版"]
    },
    copyFormat: `name: SEO Content Agent
model: gpt-4o-mini
task: 优化SEO内容
tools: [search, code_interpreter]
steps:
  - name: 关键词研究
    prompt: 搜索相关关键词
    tools: [search]
  - name: 内容分析
    prompt: 分析现有内容的SEO问题
  - name: 结构优化
    prompt: 优化内容结构和标题
  - name: 关键词植入
    prompt: 自然植入关键词
  - name: 生成优化版
    prompt: 生成最终优化内容`,
    usageCount: 9120,
    stars: 1240
  },
  {
    id: "unit-test-generator",
    name: "单元测试生成Agent",
    category: "开发辅助",
    description: "根据代码自动生成单元测试",
    type: "agent-workflow",
    agent: {
      name: "Unit Test Generator",
      model: "gpt-4o",
      maxSteps: 4,
      tools: ["code_interpreter"],
      task: "为【{code}】生成单元测试",
      steps: [
        { step: 1, name: "代码分析", prompt: "分析代码结构和功能", tools: ["code_interpreter"], output: "code_analysis" },
        { step: 2, name: "测试用例设计", prompt: "设计测试用例", input: ["code_analysis"], output: "test_cases" },
        { step: 3, name: "生成测试代码", prompt: "生成单元测试代码", tools: ["code_interpreter"], input: ["test_cases"], output: "test_code" },
        { step: 4, name: "优化测试", prompt: "优化和完善测试", input: ["test_code"], output: "final_tests" }
      ]
    },
    preview: {
      estimatedTime: "3-5分钟",
      estimatedCost: "$0.04-0.08",
      complexity: "中等",
      toolsUsed: ["Code Interpreter"],
      steps: ["代码分析", "测试用例设计", "生成测试代码", "优化测试"]
    },
    copyFormat: `name: Unit Test Generator
model: gpt-4o
task: 生成单元测试
tools: [code_interpreter]
steps:
  - name: 代码分析
    prompt: 分析代码结构和功能
    tools: [code_interpreter]
  - name: 测试用例设计
    prompt: 设计测试用例
  - name: 生成测试代码
    prompt: 生成单元测试代码
    tools: [code_interpreter]
  - name: 优化测试
    prompt: 优化和完善测试`,
    usageCount: 8560,
    stars: 1120
  },
  {
    id: "presentation-outline-agent",
    name: "演示文稿大纲Agent",
    category: "办公效率",
    description: "自动生成演示文稿大纲和演讲要点",
    type: "agent-workflow",
    agent: {
      name: "Presentation Outline Agent",
      model: "claude-sonnet-4.6",
      maxSteps: 4,
      tools: ["code_interpreter"],
      task: "为【{topic}】生成演示文稿大纲",
      steps: [
        { step: 1, name: "主题分析", prompt: "分析主题，确定核心要点", output: "key_points" },
        { step: 2, name: "结构规划", prompt: "规划演示文稿结构", input: ["key_points"], output: "structure" },
        { step: 3, name: "内容填充", prompt: "为每一页生成内容要点", input: ["structure"], output: "slides_content" },
        { step: 4, name: "生成大纲", prompt: "生成完整的演示文稿大纲", input: ["slides_content"], output: "final_outline" }
      ]
    },
    preview: {
      estimatedTime: "2-4分钟",
      estimatedCost: "$0.02-0.05",
      complexity: "简单",
      toolsUsed: ["Code Interpreter"],
      steps: ["主题分析", "结构规划", "内容填充", "生成大纲"]
    },
    copyFormat: `name: Presentation Outline Agent
model: claude-sonnet-4.6
task: 生成演示文稿大纲
tools: [code_interpreter]
steps:
  - name: 主题分析
    prompt: 分析主题，确定核心要点
  - name: 结构规划
    prompt: 规划演示文稿结构
  - name: 内容填充
    prompt: 为每一页生成内容要点
  - name: 生成大纲
    prompt: 生成完整的演示文稿大纲`,
    usageCount: 7450,
    stars: 980
  },
  {
    id: "keyword-research-agent",
    name: "关键词研究Agent",
    category: "市场调研",
    description: "研究关键词搜索量、竞争度和相关性",
    type: "agent-workflow",
    agent: {
      name: "Keyword Research Agent",
      model: "claude-3-opus",
      maxSteps: 5,
      tools: ["browser", "search"],
      task: "研究【{niche}】的关键词",
      steps: [
        { step: 1, name: "种子关键词", prompt: "生成相关种子关键词", output: "seed_keywords" },
        { step: 2, name: "搜索量数据", prompt: "搜索关键词搜索量数据", tools: ["search"], input: ["seed_keywords"], output: "search_volume" },
        { step: 3, name: "竞争分析", prompt: "分析关键词竞争度", tools: ["search"], input: ["seed_keywords"], output: "competition" },
        { step: 4, name: "长尾关键词", prompt: "发现长尾关键词机会", input: ["seed_keywords", "search_volume"], output: "long_tail" },
        { step: 5, name: "生成报告", prompt: "生成关键词研究报告", input: ["seed_keywords", "search_volume", "competition", "long_tail"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "5-8分钟",
      estimatedCost: "$0.08-0.14",
      complexity: "中等",
      toolsUsed: ["Browser", "Search"],
      steps: ["种子关键词", "搜索量数据", "竞争分析", "长尾关键词", "生成报告"]
    },
    copyFormat: `name: Keyword Research Agent
model: claude-3-opus
task: 研究关键词
tools: [browser, search]
steps:
  - name: 种子关键词
    prompt: 生成相关种子关键词
  - name: 搜索量数据
    prompt: 搜索关键词搜索量
    tools: [search]
  - name: 竞争分析
    prompt: 分析关键词竞争度
    tools: [search]
  - name: 长尾关键词
    prompt: 发现长尾关键词机会
  - name: 生成报告
    prompt: 生成关键词研究报告`,
    usageCount: 6230,
    stars: 840
  },
  {
    id: "video-script-agent",
    name: "视频脚本创作Agent",
    category: "内容创作",
    description: "创作短视频脚本，包含分镜和台词",
    type: "agent-workflow",
    agent: {
      name: "Video Script Agent",
      model: "gpt-4o",
      maxSteps: 5,
      tools: ["search", "code_interpreter"],
      task: "为【{video_topic}】创作视频脚本",
      steps: [
        { step: 1, name: "主题研究", prompt: "研究视频主题和受众", tools: ["search"], output: "topic_research" },
        { step: 2, name: "结构规划", prompt: "规划视频结构和节奏", input: ["topic_research"], output: "structure" },
        { step: 3, name: "台词创作", prompt: "创作视频台词", input: ["structure"], output: "dialogue" },
        { step: 4, name: "分镜设计", prompt: "设计分镜和画面", input: ["dialogue"], output: "storyboard" },
        { step: 5, name: "生成脚本", prompt: "生成完整的视频脚本", input: ["dialogue", "storyboard"], output: "final_script" }
      ]
    },
    preview: {
      estimatedTime: "5-7分钟",
      estimatedCost: "$0.07-0.13",
      complexity: "中等",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["主题研究", "结构规划", "台词创作", "分镜设计", "生成脚本"]
    },
    copyFormat: `name: Video Script Agent
model: gpt-4o
task: 创作视频脚本
tools: [search, code_interpreter]
steps:
  - name: 主题研究
    prompt: 研究视频主题
    tools: [search]
  - name: 结构规划
    prompt: 规划视频结构
  - name: 台词创作
    prompt: 创作视频台词
  - name: 分镜设计
    prompt: 设计分镜和画面
  - name: 生成脚本
    prompt: 生成完整视频脚本`,
    usageCount: 7890,
    stars: 1060
  },
  {
    id: "code-refactor-agent",
    name: "代码重构Agent",
    category: "开发辅助",
    description: "分析代码并提供重构建议，自动重构代码",
    type: "agent-workflow",
    agent: {
      name: "Code Refactor Agent",
      model: "gpt-4o",
      maxSteps: 5,
      tools: ["code_interpreter"],
      task: "重构【{code}】以提升质量",
      steps: [
        { step: 1, name: "代码分析", prompt: "分析代码质量和问题", tools: ["code_interpreter"], output: "analysis" },
        { step: 2, name: "重构计划", prompt: "制定重构计划", input: ["analysis"], output: "refactor_plan" },
        { step: 3, name: "代码重构", prompt: "执行代码重构", tools: ["code_interpreter"], input: ["refactor_plan"], output: "refactored_code" },
        { step: 4, name: "测试验证", prompt: "验证重构后的代码", input: ["refactored_code"], output: "verification" },
        { step: 5, name: "生成文档", prompt: "生成重构说明文档", input: ["analysis", "refactor_plan", "refactored_code"], output: "final_doc" }
      ]
    },
    preview: {
      estimatedTime: "4-6分钟",
      estimatedCost: "$0.06-0.12",
      complexity: "中等",
      toolsUsed: ["Code Interpreter"],
      steps: ["代码分析", "重构计划", "代码重构", "测试验证", "生成文档"]
    },
    copyFormat: `name: Code Refactor Agent
model: gpt-4o
task: 重构代码
tools: [code_interpreter]
steps:
  - name: 代码分析
    prompt: 分析代码质量和问题
    tools: [code_interpreter]
  - name: 重构计划
    prompt: 制定重构计划
  - name: 代码重构
    prompt: 执行代码重构
    tools: [code_interpreter]
  - name: 测试验证
    prompt: 验证重构后的代码
  - name: 生成文档
    prompt: 生成重构说明文档`,
    usageCount: 7120,
    stars: 930
  },
  {
    id: "contract-review-agent",
    name: "合同审查Agent",
    category: "办公效率",
    description: "审查合同条款，识别潜在风险和问题",
    type: "agent-workflow",
    agent: {
      name: "Contract Review Agent",
      model: "claude-3-opus",
      maxSteps: 5,
      tools: ["search", "code_interpreter"],
      task: "审查【{contract}】合同",
      steps: [
        { step: 1, name: "合同解析", prompt: "解析合同结构和条款", output: "parsed_contract" },
        { step: 2, name: "风险识别", prompt: "识别潜在风险条款", input: ["parsed_contract"], output: "risks" },
        { step: 3, name: "法律检查", prompt: "检查法律合规性", tools: ["search"], input: ["parsed_contract"], output: "legal_check" },
        { step: 4, name: "修改建议", prompt: "提供修改建议", input: ["risks", "legal_check"], output: "suggestions" },
        { step: 5, name: "生成报告", prompt: "生成合同审查报告", input: ["risks", "legal_check", "suggestions"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "5-8分钟",
      estimatedCost: "$0.10-0.18",
      complexity: "复杂",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["合同解析", "风险识别", "法律检查", "修改建议", "生成报告"]
    },
    copyFormat: `name: Contract Review Agent
model: claude-3-opus
task: 审查合同
tools: [search, code_interpreter]
steps:
  - name: 合同解析
    prompt: 解析合同结构和条款
  - name: 风险识别
    prompt: 识别潜在风险条款
  - name: 法律检查
    prompt: 检查法律合规性
    tools: [search]
  - name: 修改建议
    prompt: 提供修改建议
  - name: 生成报告
    prompt: 生成合同审查报告`,
    usageCount: 5890,
    stars: 770
  },
  {
    id: "customer-feedback-agent",
    name: "客户反馈分析Agent",
    category: "产品分析",
    description: "分析客户反馈，提取洞察和改进建议",
    type: "agent-workflow",
    agent: {
      name: "Customer Feedback Agent",
      model: "claude-sonnet-4.6",
      maxSteps: 5,
      tools: ["code_interpreter"],
      task: "分析【{feedback}】客户反馈",
      steps: [
        { step: 1, name: "反馈收集", prompt: "收集和整理反馈数据", output: "feedback_data" },
        { step: 2, name: "情感分析", prompt: "分析反馈情感倾向", tools: ["code_interpreter"], input: ["feedback_data"], output: "sentiment" },
        { step: 3, name: "主题提取", prompt: "提取反馈主题", input: ["feedback_data"], output: "themes" },
        { step: 4, name: "洞察生成", prompt: "生成客户洞察", input: ["sentiment", "themes"], output: "insights" },
        { step: 5, name: "建议报告", prompt: "生成改进建议报告", input: ["insights"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "4-6分钟",
      estimatedCost: "$0.06-0.11",
      complexity: "中等",
      toolsUsed: ["Code Interpreter"],
      steps: ["反馈收集", "情感分析", "主题提取", "洞察生成", "建议报告"]
    },
    copyFormat: `name: Customer Feedback Agent
model: claude-sonnet-4.6
task: 分析客户反馈
tools: [code_interpreter]
steps:
  - name: 反馈收集
    prompt: 收集和整理反馈数据
  - name: 情感分析
    prompt: 分析反馈情感倾向
    tools: [code_interpreter]
  - name: 主题提取
    prompt: 提取反馈主题
  - name: 洞察生成
    prompt: 生成客户洞察
  - name: 建议报告
    prompt: 生成改进建议报告`,
    usageCount: 6540,
    stars: 870
  },
  {
    id: "translation-agent",
    name: "多语言翻译Agent",
    category: "内容创作",
    description: "专业翻译，保持语境和文化适应性",
    type: "agent-workflow",
    agent: {
      name: "Translation Agent",
      model: "claude-3-opus",
      maxSteps: 4,
      tools: ["search"],
      task: "将【{text}】翻译成【{target_language}】",
      steps: [
        { step: 1, name: "原文分析", prompt: "分析原文语境和风格", output: "analysis" },
        { step: 2, name: "初步翻译", prompt: "进行初步翻译", input: ["analysis"], output: "initial_translation" },
        { step: 3, name: "文化适配", prompt: "进行文化适应性调整", tools: ["search"], input: ["initial_translation"], output: "adapted" },
        { step: 4, name: "优化润色", prompt: "优化翻译质量", input: ["adapted"], output: "final_translation" }
      ]
    },
    preview: {
      estimatedTime: "2-4分钟",
      estimatedCost: "$0.03-0.07",
      complexity: "简单",
      toolsUsed: ["Search"],
      steps: ["原文分析", "初步翻译", "文化适配", "优化润色"]
    },
    copyFormat: `name: Translation Agent
model: claude-3-opus
task: 专业翻译
tools: [search]
steps:
  - name: 原文分析
    prompt: 分析原文语境和风格
  - name: 初步翻译
    prompt: 进行初步翻译
  - name: 文化适配
    prompt: 进行文化适应性调整
    tools: [search]
  - name: 优化润色
    prompt: 优化翻译质量`,
    usageCount: 11230,
    stars: 1490
  },
  {
    id: "database-schema-agent",
    name: "数据库设计Agent",
    category: "开发辅助",
    description: "设计数据库Schema，生成SQL脚本",
    type: "agent-workflow",
    agent: {
      name: "Database Schema Agent",
      model: "gpt-4o",
      maxSteps: 5,
      tools: ["code_interpreter"],
      task: "为【{requirements}】设计数据库",
      steps: [
        { step: 1, name: "需求分析", prompt: "分析数据需求", output: "requirements_analysis" },
        { step: 2, name: "实体识别", prompt: "识别实体和关系", input: ["requirements_analysis"], output: "entities" },
        { step: 3, name: "Schema设计", prompt: "设计数据库Schema", input: ["entities"], output: "schema" },
        { step: 4, name: "SQL生成", prompt: "生成SQL创建脚本", tools: ["code_interpreter"], input: ["schema"], output: "sql_script" },
        { step: 5, name: "优化文档", prompt: "优化和生成文档", input: ["schema", "sql_script"], output: "final_output" }
      ]
    },
    preview: {
      estimatedTime: "4-6分钟",
      estimatedCost: "$0.06-0.11",
      complexity: "中等",
      toolsUsed: ["Code Interpreter"],
      steps: ["需求分析", "实体识别", "Schema设计", "SQL生成", "优化文档"]
    },
    copyFormat: `name: Database Schema Agent
model: gpt-4o
task: 设计数据库Schema
tools: [code_interpreter]
steps:
  - name: 需求分析
    prompt: 分析数据需求
  - name: 实体识别
    prompt: 识别实体和关系
  - name: Schema设计
    prompt: 设计数据库Schema
  - name: SQL生成
    prompt: 生成SQL创建脚本
    tools: [code_interpreter]
  - name: 优化文档
    prompt: 优化和生成文档`,
    usageCount: 6780,
    stars: 890
  },
  {
    id: "resume-writing-agent",
    name: "简历优化Agent",
    category: "办公效率",
    description: "优化简历，突出亮点，提升通过率",
    type: "agent-workflow",
    agent: {
      name: "Resume Writing Agent",
      model: "claude-sonnet-4.6",
      maxSteps: 5,
      tools: ["search", "code_interpreter"],
      task: "优化【{resume}】简历",
      steps: [
        { step: 1, name: "简历分析", prompt: "分析现有简历", output: "analysis" },
        { step: 2, name: "岗位研究", prompt: "研究目标岗位要求", tools: ["search"], input: ["analysis"], output: "job_requirements" },
        { step: 3, name: "亮点挖掘", prompt: "挖掘个人亮点", input: ["analysis", "job_requirements"], output: "highlights" },
        { step: 4, name: "内容重构", prompt: "重构简历内容", input: ["highlights"], output: "restructured" },
        { step: 5, name: "优化润色", prompt: "优化和润色简历", input: ["restructured"], output: "final_resume" }
      ]
    },
    preview: {
      estimatedTime: "3-5分钟",
      estimatedCost: "$0.04-0.08",
      complexity: "中等",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["简历分析", "岗位研究", "亮点挖掘", "内容重构", "优化润色"]
    },
    copyFormat: `name: Resume Writing Agent
model: claude-sonnet-4.6
task: 优化简历
tools: [search, code_interpreter]
steps:
  - name: 简历分析
    prompt: 分析现有简历
  - name: 岗位研究
    prompt: 研究目标岗位要求
    tools: [search]
  - name: 亮点挖掘
    prompt: 挖掘个人亮点
  - name: 内容重构
    prompt: 重构简历内容
  - name: 优化润色
    prompt: 优化和润色简历`,
    usageCount: 10560,
    stars: 1380
  },
  {
    id: "sales-forecast-agent",
    name: "销售预测Agent",
    category: "市场调研",
    description: "分析历史数据，预测未来销售趋势",
    type: "agent-workflow",
    agent: {
      name: "Sales Forecast Agent",
      model: "claude-3-opus",
      maxSteps: 5,
      tools: ["code_interpreter"],
      task: "根据【{sales_data}】预测销售",
      steps: [
        { step: 1, name: "数据导入", prompt: "导入和清洗销售数据", tools: ["code_interpreter"], output: "clean_data" },
        { step: 2, name: "趋势分析", prompt: "分析历史销售趋势", input: ["clean_data"], output: "trend_analysis" },
        { step: 3, name: "季节分析", prompt: "分析季节性因素", input: ["clean_data", "trend_analysis"], output: "seasonality" },
        { step: 4, name: "预测建模", prompt: "建立预测模型", tools: ["code_interpreter"], input: ["clean_data", "trend_analysis", "seasonality"], output: "forecast_model" },
        { step: 5, name: "生成报告", prompt: "生成预测报告", input: ["forecast_model"], output: "final_report" }
      ]
    },
    preview: {
      estimatedTime: "5-8分钟",
      estimatedCost: "$0.08-0.15",
      complexity: "中等",
      toolsUsed: ["Code Interpreter"],
      steps: ["数据导入", "趋势分析", "季节分析", "预测建模", "生成报告"]
    },
    copyFormat: `name: Sales Forecast Agent
model: claude-3-opus
task: 销售预测
tools: [code_interpreter]
steps:
  - name: 数据导入
    prompt: 导入和清洗销售数据
    tools: [code_interpreter]
  - name: 趋势分析
    prompt: 分析历史销售趋势
  - name: 季节分析
    prompt: 分析季节性因素
  - name: 预测建模
    prompt: 建立预测模型
    tools: [code_interpreter]
  - name: 生成报告
    prompt: 生成预测报告`,
    usageCount: 5980,
    stars: 790
  },
  {
    id: "podcast-script-agent",
    name: "播客脚本创作Agent",
    category: "内容创作",
    description: "创作播客节目脚本，包含对话和环节设计",
    type: "agent-workflow",
    agent: {
      name: "Podcast Script Agent",
      model: "gpt-4o",
      maxSteps: 5,
      tools: ["search", "code_interpreter"],
      task: "为【{topic}】创作播客脚本",
      steps: [
        { step: 1, name: "主题研究", prompt: "研究播客主题", tools: ["search"], output: "research" },
        { step: 2, name: "结构设计", prompt: "设计节目结构", input: ["research"], output: "structure" },
        { step: 3, name: "对话创作", prompt: "创作对话内容", input: ["structure"], output: "dialogue" },
        { step: 4, name: "环节设计", prompt: "设计节目环节", input: ["dialogue"], output: "segments" },
        { step: 5, name: "生成脚本", prompt: "生成完整脚本", input: ["dialogue", "segments"], output: "final_script" }
      ]
    },
    preview: {
      estimatedTime: "5-7分钟",
      estimatedCost: "$0.07-0.13",
      complexity: "中等",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["主题研究", "结构设计", "对话创作", "环节设计", "生成脚本"]
    },
    copyFormat: `name: Podcast Script Agent
model: gpt-4o
task: 创作播客脚本
tools: [search, code_interpreter]
steps:
  - name: 主题研究
    prompt: 研究播客主题
    tools: [search]
  - name: 结构设计
    prompt: 设计节目结构
  - name: 对话创作
    prompt: 创作对话内容
  - name: 环节设计
    prompt: 设计节目环节
  - name: 生成脚本
    prompt: 生成完整脚本`,
    usageCount: 7230,
    stars: 960
  },
  {
    id: "api-integration-agent",
    name: "API集成Agent",
    category: "开发辅助",
    description: "生成API集成代码，处理认证和错误",
    type: "agent-workflow",
    agent: {
      name: "API Integration Agent",
      model: "gpt-4o",
      maxSteps: 5,
      tools: ["search", "code_interpreter"],
      task: "集成【{api_docs}】API",
      steps: [
        { step: 1, name: "文档解析", prompt: "解析API文档", tools: ["search"], output: "api_analysis" },
        { step: 2, name: "认证方案", prompt: "设计认证方案", input: ["api_analysis"], output: "auth_plan" },
        { step: 3, name: "代码生成", prompt: "生成集成代码", tools: ["code_interpreter"], input: ["api_analysis", "auth_plan"], output: "integration_code" },
        { step: 4, name: "错误处理", prompt: "添加错误处理", input: ["integration_code"], output: "error_handling" },
        { step: 5, name: "测试示例", prompt: "生成测试示例", input: ["error_handling"], output: "final_code" }
      ]
    },
    preview: {
      estimatedTime: "4-6分钟",
      estimatedCost: "$0.07-0.13",
      complexity: "中等",
      toolsUsed: ["Search", "Code Interpreter"],
      steps: ["文档解析", "认证方案", "代码生成", "错误处理", "测试示例"]
    },
    copyFormat: `name: API Integration Agent
model: gpt-4o
task: API集成
tools: [search, code_interpreter]
steps:
  - name: 文档解析
    prompt: 解析API文档
    tools: [search]
  - name: 认证方案
    prompt: 设计认证方案
  - name: 代码生成
    prompt: 生成集成代码
    tools: [code_interpreter]
  - name: 错误处理
    prompt: 添加错误处理
  - name: 测试示例
    prompt: 生成测试示例`,
    usageCount: 6540,
    stars: 860
  },
  {
    id: "travel-itinerary-agent",
    name: "旅行行程规划Agent",
    category: "办公效率",
    description: "规划旅行行程，包含景点、交通、住宿",
    type: "agent-workflow",
    agent: {
      name: "Travel Itinerary Agent",
      model: "claude-sonnet-4.6",
      maxSteps: 5,
      tools: ["browser", "search"],
      task: "为【{destination}】规划行程",
      steps: [
        { step: 1, name: "目的地研究", prompt: "研究目的地信息", tools: ["search"], output: "destination_info" },
        { step: 2, name: "景点选择", prompt: "选择必游景点", input: ["destination_info"], output: "attractions" },
        { step: 3, name: "行程安排", prompt: "安排每日行程", input: ["attractions"], output: "daily_plan" },
        { step: 4, name: "交通住宿", prompt: "规划交通和住宿", tools: ["search"], input: ["daily_plan"], output: "transport_accommodation" },
        { step: 5, name: "生成行程", prompt: "生成完整行程单", input: ["daily_plan", "transport_accommodation"], output: "final_itinerary" }
      ]
    },
    preview: {
      estimatedTime: "4-6分钟",
      estimatedCost: "$0.06-0.11",
      complexity: "中等",
      toolsUsed: ["Browser", "Search"],
      steps: ["目的地研究", "景点选择", "行程安排", "交通住宿", "生成行程"]
    },
    copyFormat: `name: Travel Itinerary Agent
model: claude-sonnet-4.6
task: 规划旅行行程
tools: [browser, search]
steps:
  - name: 目的地研究
    prompt: 研究目的地信息
    tools: [search]
  - name: 景点选择
    prompt: 选择必游景点
  -