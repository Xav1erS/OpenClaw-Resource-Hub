const workflowCategories = [
  { id: "automation", name: "自动化", icon: "⚡" },
  { id: "research", name: "调研分析", icon: "🔍" },
  { id: "creation", name: "内容创作", icon: "🎨" },
  { id: "dev", name: "开发工具", icon: "🔧" }
];

const allTags = ["自动化", "调研", "商业", "创业", "验证", "分析", "代码", "文档", "API", "测试", "数据", "可视化", "翻译", "市场", "竞品", "销售", "内容", "SEO", "视频", "播客", "邮件", "简历", "合同", "会议", "数据库", "重构", "部署", "监控", "优化"];

const workflows = [
  {
    id: "market-research-agent",
    name: "Market Research Agent",
    category: "调研分析",
    description: "自动进行市场调研、竞品分析、数据收集",
    author: "OpenClaw官方",
    stars: 2800,
    usage: 12540,
    tags: ["自动化", "调研", "商业"],
    config: `name: Market Research Agent
description: 自动进行市场调研、竞品分析、数据收集
model: claude-sonnet-4.6
max_steps: 8
tools:
  - browser
  - search
  - code_interpreter
steps:
  - task: search_web
    query: "{market} 市场规模 增长趋势"
  - task: search_web
    query: "{market} 主要竞品 市场份额"
  - task: analyze
    prompt: 分析搜索结果，整理市场规模数据和竞品信息
  - task: generate_report
    prompt: 生成完整的市场调研报告，包含SWOT分析`
  },
  {
    id: "startup-idea-validator",
    name: "Startup Idea Validator",
    category: "调研分析",
    description: "验证创业想法的可行性",
    author: "社区贡献",
    stars: 1500,
    usage: 8320,
    tags: ["创业", "验证", "分析"],
    config: `name: Startup Idea Validator
description: 验证创业想法的可行性
model: claude-3-opus
max_steps: 6
tools:
  - browser
  - search
steps:
  - task: market_analysis
    query: "{idea} 市场规模 目标用户"
  - task: competitor_analysis
    query: "{idea} 竞品分析"
  - task: tech_feasibility
    query: "{idea} 技术难点 实现难度"
  - task: validation_report
    prompt: 综合所有分析，生成创业想法验证报告`
  },
  {
    id: "daily-report-automation",
    name: "Daily Report Automation",
    category: "自动化",
    description: "自动收集工作数据并生成日报",
    author: "OpenClaw官方",
    stars: 3200,
    usage: 14890,
    tags: ["自动化", "文档", "数据"],
    config: `name: Daily Report Automation
description: 自动生成日报
model: gpt-4o-mini
max_steps: 5
tools:
  - code_interpreter
steps:
  - task: collect_tasks
    prompt: 从待办列表收集今日完成任务
  - task: summarize_progress
    prompt: 总结今日工作进度和成果
  - task: identify_blockers
    prompt: 识别遇到的问题和阻碍
  - task: plan_tomorrow
    prompt: 规划明日工作计划
  - task: generate_report
    prompt: 生成结构化的日报文档`
  },
  {
    id: "code-documentation-generator",
    name: "Code Documentation Generator",
    category: "开发工具",
    description: "自动为代码生成文档",
    author: "社区贡献",
    stars: 2100,
    usage: 9870,
    tags: ["代码", "文档", "API"],
    config: `name: Code Documentation Generator
description: 自动为代码生成文档
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: parse_code
    prompt: 解析代码结构，识别函数和类
  - task: extract_params
    prompt: 提取参数说明和返回值
  - task: generate_comments
    prompt: 为每个函数生成JSDoc风格注释
  - task: create_readme
    prompt: 创建项目README文档
  - task: generate_api_docs
    prompt: 生成API参考文档`
  },
  {
    id: "social-media-content-generator",
    name: "Social Media Content Generator",
    category: "内容创作",
    description: "为多个平台生成社交媒体内容",
    author: "OpenClaw官方",
    stars: 2600,
    usage: 11230,
    tags: ["内容", "自动化", "创作"],
    config: `name: Social Media Content Generator
description: 生成社交媒体内容
model: gpt-4o-mini
max_steps: 7
tools:
  - search
  - code_interpreter
steps:
  - task: research_trends
    prompt: 搜索当前热点话题
  - task: define_tone
    prompt: 确定内容风格和语调
  - task: generate_twitter
    prompt: 生成Twitter/微博内容
  - task: generate_linkedin
    prompt: 生成LinkedIn内容
  - task: generate_xiaohongshu
    prompt: 生成小红书内容
  - task: optimize_hashtags
    prompt: 优化话题标签`
  },
  {
    id: "database-migration-assistant",
    name: "Database Migration Assistant",
    category: "开发工具",
    description: "辅助数据库迁移和版本控制",
    author: "社区贡献",
    stars: 1800,
    usage: 7650,
    tags: ["数据库", "代码", "开发"],
    config: `name: Database Migration Assistant
description: 辅助数据库迁移
model: gpt-4o
max_steps: 8
tools:
  - code_interpreter
steps:
  - task: analyze_schema
    prompt: 分析当前数据库schema
  - task: identify_changes
    prompt: 识别需要修改的表和字段
  - task: generate_migration
    prompt: 生成SQL迁移脚本
  - task: write_rollback
    prompt: 编写回滚脚本
  - task: test_migration
    prompt: 测试迁移脚本
  - task: document_changes
    prompt: 文档化变更内容`
  },
  {
    id: "customer-feedback-analyzer",
    name: "Customer Feedback Analyzer",
    category: "调研分析",
    description: "分析客户反馈，提取洞察",
    author: "OpenClaw官方",
    stars: 2200,
    usage: 9430,
    tags: ["分析", "数据", "调研"],
    config: `name: Customer Feedback Analyzer
description: 分析客户反馈
model: claude-sonnet-4.6
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: collect_feedback
    prompt: 收集和整理客户反馈数据
  - task: sentiment_analysis
    prompt: 进行情感分析
  - task: extract_themes
    prompt: 提取反馈主题
  - task: identify_issues
    prompt: 识别主要问题
  - task: generate_insights
    prompt: 生成可操作的洞察报告`
  },
  {
    id: "unit-test-generator",
    name: "Unit Test Generator",
    category: "开发工具",
    description: "自动生成单元测试代码",
    author: "社区贡献",
    stars: 2500,
    usage: 10560,
    tags: ["代码", "测试", "开发"],
    config: `name: Unit Test Generator
description: 自动生成单元测试
model: gpt-4o
max_steps: 5
tools:
  - code_interpreter
steps:
  - task: analyze_code
    prompt: 分析代码结构和功能
  - task: design_cases
    prompt: 设计测试用例
  - task: generate_tests
    prompt: 生成单元测试代码
  - task: add_edge_cases
    prompt: 添加边界测试
  - task: optimize_tests
    prompt: 优化测试代码`
  },
  {
    id: "email-campaign-creator",
    name: "Email Campaign Creator",
    category: "内容创作",
    description: "创建邮件营销活动内容",
    author: "OpenClaw官方",
    stars: 1900,
    usage: 8120,
    tags: ["内容", "邮件", "营销"],
    config: `name: Email Campaign Creator
description: 创建邮件营销活动
model: claude-sonnet-4.6
max_steps: 6
tools:
  - search
steps:
  - task: define_goal
    prompt: 明确邮件营销目标
  - task: research_audience
    prompt: 研究目标受众
  - task: write_subject
    prompt: 撰写邮件主题行
  - task: write_body
    prompt: 撰写邮件正文
  - task: add_cta
    prompt: 添加行动召唤
  - task: optimize_for_mobile
    prompt: 优化移动端显示`
  },
  {
    id: "api-integration-helper",
    name: "API Integration Helper",
    category: "开发工具",
    description: "帮助集成第三方API",
    author: "社区贡献",
    stars: 1700,
    usage: 7230,
    tags: ["API", "代码", "开发"],
    config: `name: API Integration Helper
description: 帮助集成第三方API
model: gpt-4o
max_steps: 7
tools:
  - search
  - code_interpreter
steps:
  - task: read_docs
    prompt: 阅读API文档
  - task: understand_auth
    prompt: 理解认证方式
  - task: generate_client
    prompt: 生成API客户端代码
  - task: handle_errors
    prompt: 处理错误和异常
  - task: add_retries
    prompt: 添加重试机制
  - task: write_examples
    prompt: 编写使用示例`
  },
  {
    id: "competitive-intelligence-agent",
    name: "Competitive Intelligence Agent",
    category: "调研分析",
    description: "监控竞品动态和市场变化",
    author: "OpenClaw官方",
    stars: 2400,
    usage: 10120,
    tags: ["调研", "竞品", "市场"],
    config: `name: Competitive Intelligence Agent
description: 竞品情报收集
model: claude-3-opus
max_steps: 8
tools:
  - browser
  - search
steps:
  - task: monitor_websites
    prompt: 监控竞品网站更新
  - task: check_news
    prompt: 检查竞品相关新闻
  - task: track_social
    prompt: 追踪竞品社交媒体
  - task: analyze_pricing
    prompt: 分析价格变化
  - task: track_features
    prompt: 追踪功能更新
  - task: generate_intel
    prompt: 生成情报摘要`
  },
  {
    id: "video-script-writer",
    name: "Video Script Writer",
    category: "内容创作",
    description: "创作视频脚本和分镜",
    author: "社区贡献",
    stars: 2000,
    usage: 8760,
    tags: ["内容", "视频", "创作"],
    config: `name: Video Script Writer
description: 创作视频脚本
model: gpt-4o
max_steps: 6
tools:
  - search
steps:
  - task: research_topic
    prompt: 研究视频主题
  - task: outline_structure
    prompt: 规划视频结构
  - task: write_script
    prompt: 撰写脚本台词
  - task: design_storyboard
    prompt: 设计分镜
  - task: add_b-roll
    prompt: 规划B-roll画面
  - task: optimize_duration
    prompt: 优化视频时长`
  },
  {
    id: "data-visualization-assistant",
    name: "Data Visualization Assistant",
    category: "开发工具",
    description: "辅助创建数据可视化图表",
    author: "OpenClaw官方",
    stars: 2300,
    usage: 9890,
    tags: ["数据", "可视化", "代码"],
    config: `name: Data Visualization Assistant
description: 数据可视化助手
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: analyze_data
    prompt: 分析数据结构
  - task: choose_chart
    prompt: 选择合适的图表类型
  - task: generate_code
    prompt: 生成可视化代码
  - task: customize_style
    prompt: 自定义样式
  - task: add_interactivity
    prompt: 添加交互功能
  - task: export_chart
    prompt: 导出图表`
  },
  {
    id: "resume-optimizer",
    name: "Resume Optimizer",
    category: "内容创作",
    description: "优化简历，突出亮点",
    author: "社区贡献",
    stars: 2700,
    usage: 11450,
    tags: ["内容", "简历", "优化"],
    config: `name: Resume Optimizer
description: 优化简历
model: claude-sonnet-4.6
max_steps: 5
tools:
  - search
steps:
  - task: analyze_resume
    prompt: 分析现有简历
  - task: research_job
    prompt: 研究目标岗位
  - task: highlight_achievements
    prompt: 突出成就
  - task: optimize_keywords
    prompt: 优化关键词
  - task: rewrite_content
    prompt: 重写简历内容`
  },
  {
    id: "code-refactor-bot",
    name: "Code Refactor Bot",
    category: "开发工具",
    description: "自动重构代码，提升质量",
    author: "OpenClaw官方",
    stars: 2100,
    usage: 8920,
    tags: ["代码", "重构", "优化"],
    config: `name: Code Refactor Bot
description: 代码重构助手
model: gpt-4o
max_steps: 7
tools:
  - code_interpreter
steps:
  - task: analyze_code
    prompt: 分析代码质量问题
  - task: identify_smells
    prompt: 识别代码坏味道
  - task: plan_refactor
    prompt: 规划重构方案
  - task: execute_refactor
    prompt: 执行重构
  - task: run_tests
    prompt: 运行测试验证
  - task: document_changes
    prompt: 文档化变更`
  },
  {
    id: "seo-content-optimizer",
    name: "SEO Content Optimizer",
    category: "内容创作",
    description: "优化内容SEO表现",
    author: "社区贡献",
    stars: 2250,
    usage: 9670,
    tags: ["内容", "SEO", "优化"],
    config: `name: SEO Content Optimizer
description: SEO内容优化
model: gpt-4o-mini
max_steps: 6
tools:
  - search
steps:
  - task: keyword_research
    prompt: 关键词研究
  - task: analyze_content
    prompt: 分析现有内容
  - task: optimize_structure
    prompt: 优化内容结构
  - task: add_keywords
    prompt: 自然植入关键词
  - task: improve_readability
    prompt: 提升可读性
  - task: generate_meta
    prompt: 生成meta标签`
  },
  {
    id: "deployment-automator",
    name: "Deployment Automator",
    category: "开发工具",
    description: "自动化部署流程",
    author: "OpenClaw官方",
    stars: 1950,
    usage: 8340,
    tags: ["部署", "自动化", "开发"],
    config: `name: Deployment Automator
description: 自动化部署
model: gpt-4o
max_steps: 8
tools:
  - code_interpreter
steps:
  - task: check_code
    prompt: 检查代码状态
  - task: run_tests
    prompt: 运行测试
  - task: build_project
    prompt: 构建项目
  - task: create_artifact
    prompt: 创建部署包
  - task: deploy_staging
    prompt: 部署到预发布环境
  - task: run_e2e
    prompt: 运行端到端测试
  - task: deploy_prod
    prompt: 部署到生产环境
  - task: verify_deploy
    prompt: 验证部署`
  },
  {
    id: "sales-forecast-agent",
    name: "Sales Forecast Agent",
    category: "调研分析",
    description: "预测销售趋势",
    author: "社区贡献",
    stars: 1850,
    usage: 7890,
    tags: ["销售", "数据", "分析"],
    config: `name: Sales Forecast Agent
description: 销售预测
model: claude-3-opus
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: load_data
    prompt: 加载历史销售数据
  - task: clean_data
    prompt: 清洗和预处理数据
  - task: analyze_trends
    prompt: 分析趋势和季节性
  - task: build_model
    prompt: 建立预测模型
  - task: generate_forecast
    prompt: 生成预测
  - task: visualize_results
    prompt: 可视化结果`
  },
  {
    id: "podcast-script-creator",
    name: "Podcast Script Creator",
    category: "内容创作",
    description: "创作播客节目脚本",
    author: "OpenClaw官方",
    stars: 1750,
    usage: 7450,
    tags: ["内容", "播客", "创作"],
    config: `name: Podcast Script Creator
description: 播客脚本创作
model: gpt-4o
max_steps: 6
tools:
  - search
steps:
  - task: research_topic
    prompt: 研究播客主题
  - task: outline_episode
    prompt: 规划节目大纲
  - task: write_intro
    prompt: 撰写开场白
  - task: write_dialogue
    prompt: 撰写对话内容
  - task: add_segments
    prompt: 添加节目环节
  - task: write_outro
    prompt: 撰写结束语`
  },
  {
    id: "contract-review-assistant",
    name: "Contract Review Assistant",
    category: "自动化",
    description: "辅助审查合同条款",
    author: "社区贡献",
    stars: 2050,
    usage: 8780,
    tags: ["合同", "自动化", "文档"],
    config: `name: Contract Review Assistant
description: 合同审查助手
model: claude-3-opus
max_steps: 6
tools:
  - search
steps:
  - task: read_contract
    prompt: 读取和解析合同
  - task: identify_clauses
    prompt: 识别关键条款
  - task: flag_risks
    prompt: 标记风险点
  - task: check_compliance
    prompt: 检查合规性
  - task: suggest_edits
    prompt: 建议修改
  - task: generate_summary
    prompt: 生成摘要`
  },
  {
    id: "database-schema-designer",
    name: "Database Schema Designer",
    category: "开发工具",
    description: "设计数据库Schema",
    author: "OpenClaw官方",
    stars: 2150,
    usage: 9120,
    tags: ["数据库", "设计", "开发"],
    config: `name: Database Schema Designer
description: 数据库Schema设计
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: analyze_requirements
    prompt: 分析需求
  - task: identify_entities
    prompt: 识别实体
  - task: define_relationships
    prompt: 定义关系
  - task: design_schema
    prompt: 设计Schema
  - task: generate_sql
    prompt: 生成SQL
  - task: optimize_indexes
    prompt: 优化索引`
  },
  {
    id: "content-calendar-planner",
    name: "Content Calendar Planner",
    category: "内容创作",
    description: "规划内容发布日历",
    author: "社区贡献",
    stars: 2350,
    usage: 9980,
    tags: ["内容", "规划", "自动化"],
    config: `name: Content Calendar Planner
description: 内容日历规划
model: claude-sonnet-4.6
max_steps: 7
tools:
  - search
  - code_interpreter
steps:
  - task: define_goals
    prompt: 定义内容目标
  - task: research_audience
    prompt: 研究受众
  - task: brainstorm_topics
    prompt: 头脑风暴主题
  - task: research_trends
    prompt: 研究趋势
  - task: plan_calendar
    prompt: 规划日历
  - task: assign_formats
    prompt: 分配内容格式
  - task: optimize_timing
    prompt: 优化发布时间`
  },
  {
    id: "log-analyzer-bot",
    name: "Log Analyzer Bot",
    category: "开发工具",
    description: "分析日志，发现问题",
    author: "OpenClaw官方",
    stars: 1900,
    usage: 8090,
    tags: ["代码", "监控", "开发"],
    config: `name: Log Analyzer Bot
description: 日志分析机器人
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: parse_logs
    prompt: 解析日志文件
  - task: filter_errors
    prompt: 过滤错误
  - task: identify_patterns
    prompt: 识别模式
  - task: find_root_cause
    prompt: 找出根因
  - task: suggest_fixes
    prompt: 建议修复
  - task: generate_report
    prompt: 生成报告`
  },
  {
    id: "meeting-minutes-generator",
    name: "Meeting Minutes Generator",
    category: "自动化",
    description: "自动生成会议纪要",
    author: "社区贡献",
    stars: 2850,
    usage: 12120,
    tags: ["会议", "自动化", "文档"],
    config: `name: Meeting Minutes Generator
description: 会议纪要生成
model: claude-sonnet-4.6
max_steps: 5
tools:
  - code_interpreter
steps:
  - task: transcribe
    prompt: 转录会议内容
  - task: extract_topics
    prompt: 提取议题
  - task: identify_decisions
    prompt: 识别决策
  - task: assign_actions
    prompt: 分配行动项
  - task: generate_minutes
    prompt: 生成纪要`
  },
  {
    id: "api-documentation-writer",
    name: "API Documentation Writer",
    category: "开发工具",
    description: "编写API文档",
    author: "OpenClaw官方",
    stars: 2200,
    usage: 9340,
    tags: ["API", "文档", "开发"],
    config: `name: API Documentation Writer
description: API文档编写
model: gpt-4o
max_steps: 7
tools:
  - code_interpreter
steps:
  - task: analyze_code
    prompt: 分析代码
  - task: extract_endpoints
    prompt: 提取端点
  - task: document_params
    prompt: 文档化参数
  - task: write_examples
    prompt: 编写示例
  - task: add_explanations
    prompt: 添加说明
  - task: generate_docs
    prompt: 生成文档`
  },
  {
    id: "translation-workflow",
    name: "Translation Workflow",
    category: "内容创作",
    description: "专业多语言翻译",
    author: "社区贡献",
    stars: 2500,
    usage: 10670,
    tags: ["翻译", "内容", "多语言"],
    config: `name: Translation Workflow
description: 专业翻译工作流
model: claude-3-opus
max_steps: 5
tools:
  - search
steps:
  - task: analyze_source
    prompt: 分析原文
  - task: initial_translate
    prompt: 初步翻译
  - task: cultural_adapt
    prompt: 文化适配
  - task: refine_translation
    prompt: 优化翻译
  - task: final_check
    prompt: 最终检查`
  },
  {
    id: "performance-monitor",
    name: "Performance Monitor",
    category: "开发工具",
    description: "监控应用性能",
    author: "OpenClaw官方",
    stars: 1800,
    usage: 7680,
    tags: ["监控", "优化", "开发"],
    config: `name: Performance Monitor
description: 性能监控
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: collect_metrics
    prompt: 收集指标
  - task: identify_bottlenecks
    prompt: 识别瓶颈
  - task: analyze_traces
    prompt: 分析追踪
  - task: suggest_optimizations
    prompt: 建议优化
  - task: implement_fixes
    prompt: 实施修复
  - task: verify_improvement
    prompt: 验证改进`
  },
  {
    id: "product-launch-checklist",
    name: "Product Launch Checklist",
    category: "自动化",
    description: "产品发布检查清单自动化",
    author: "社区贡献",
    stars: 2100,
    usage: 8910,
    tags: ["自动化", "产品", "发布"],
    config: `name: Product Launch Checklist
description: 产品发布检查
model: claude-sonnet-4.6
max_steps: 8
tools:
  - code_interpreter
steps:
  - task: review_code
    prompt: 代码审查
  - task: run_tests
    prompt: 运行测试
  - task: check_docs
    prompt: 检查文档
  - task: verify_security
    prompt: 安全检查
  - task: prepare_assets
    prompt: 准备资源
  - task: plan_communication
    prompt: 规划沟通
  - task: create_backup
    prompt: 创建备份
  - task: execute_launch
    prompt: 执行发布`
  },
  {
    id: "bug-triage-automator",
    name: "Bug Triage Automator",
    category: "开发工具",
    description: "自动分类和优先级排序Bug",
    author: "OpenClaw官方",
    stars: 2000,
    usage: 8530,
    tags: ["代码", "测试", "开发"],
    config: `name: Bug Triage Automator
description: Bug分类自动化
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: read_report
    prompt: 读取Bug报告
  - task: reproduce_issue
    prompt: 重现问题
  - task: assess_impact
    prompt: 评估影响
  - task: assign_priority
    prompt: 分配优先级
  - task: assign_component
    prompt: 分配组件
  - task: suggest_fix
    prompt: 建议修复方向`
  },
  {
    id: "newsletter-creator",
    name: "Newsletter Creator",
    category: "内容创作",
    description: "创建新闻通讯",
    author: "社区贡献",
    stars: 1950,
    usage: 8270,
    tags: ["内容", "邮件", "创作"],
    config: `name: Newsletter Creator
description: 新闻通讯创建
model: claude-sonnet-4.6
max_steps: 6
tools:
  - search
  - code_interpreter
steps:
  - task: curate_content
    prompt: 精选内容
  - task: write_intro
    prompt: 撰写引言
  - task: summarize_articles
    prompt: 摘要文章
  - task: add_visuals
    prompt: 添加视觉元素
  - task: write_cta
    prompt: 撰写CTA
  - task: format_newsletter
    prompt: 格式化通讯`
  },
  {
    id: "infrastructure-as-code",
    name: "Infrastructure as Code",
    category: "开发工具",
    description: "生成基础设施代码",
    author: "OpenClaw官方",
    stars: 1750,
    usage: 7420,
    tags: ["代码", "部署", "开发"],
    config: `name: Infrastructure as Code
description: 基础设施即代码
model: gpt-4o
max_steps: 7
tools:
  - code_interpreter
steps:
  - task: define_requirements
    prompt: 定义需求
  - task: design_architecture
    prompt: 设计架构
  - task: generate_terraform
    prompt: 生成Terraform
  - task: generate_cloudformation
    prompt: 生成CloudFormation
  - task: add_security
    prompt: 添加安全配置
  - task: write_tests
    prompt: 编写测试
  - task: document_setup
    prompt: 文档化设置`
  },
  {
    id: "user-persona-creator",
    name: "User Persona Creator",
    category: "调研分析",
    description: "创建用户画像",
    author: "社区贡献",
    stars: 1850,
    usage: 7860,
    tags: ["调研", "用户", "分析"],
    config: `name: User Persona Creator
description: 用户画像创建
model: claude-sonnet-4.6
max_steps: 6
tools:
  - search
  - code_interpreter
steps:
  - task: collect_data
    prompt: 收集数据
  - task: segment_users
    prompt: 细分用户
  - task: create_personas
    prompt: 创建画像
  - task: add_details
    prompt: 添加细节
  - task: define_goals
    prompt: 定义目标
  - task: visualize_personas
    prompt: 可视化画像`
  },
  {
    id: "code-review-bot",
    name: "Code Review Bot",
    category: "开发工具",
    description: "自动进行代码审查",
    author: "OpenClaw官方",
    stars: 2400,
    usage: 10230,
    tags: ["代码", "测试", "开发"],
    config: `name: Code Review Bot
description: 代码审查机器人
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: check_style
    prompt: 检查代码风格
  - task: find_bugs
    prompt: 查找bug
  - task: check_security
    prompt: 安全检查
  - task: suggest_improvements
    prompt: 建议改进
  - task: check_performance
    prompt: 性能检查
  - task: generate_report
    prompt: 生成报告`
  },
  {
    id: "social-listening-agent",
    name: "Social Listening Agent",
    category: "调研分析",
    description: "监听社交媒体提及",
    author: "社区贡献",
    stars: 1900,
    usage: 8080,
    tags: ["调研", "社交", "监控"],
    config: `name: Social Listening Agent
description: 社交监听
model: claude-sonnet-4.6
max_steps: 6
tools:
  - browser
  - search
steps:
  - task: monitor_mentions
    prompt: 监控提及
  - task: analyze_sentiment
    prompt: 情感分析
  - task: identify_trends
    prompt: 识别趋势
  - task: track_competitors
    prompt: 追踪竞品
  - task: flag_issues
    prompt: 标记问题
  - task: generate_report
    prompt: 生成报告`
  },
  {
    id: "continuous-integration-setup",
    name: "Continuous Integration Setup",
    category: "开发工具",
    description: "设置CI/CD流程",
    author: "OpenClaw官方",
    stars: 2050,
    usage: 8720,
    tags: ["部署", "自动化", "开发"],
    config: `name: Continuous Integration Setup
description: CI/CD设置
model: gpt-4o
max_steps: 7
tools:
  - code_interpreter
steps:
  - task: analyze_project
    prompt: 分析项目
  - task: choose_ci
    prompt: 选择CI工具
  - task: write_config
    prompt: 编写配置
  - task: setup_tests
    prompt: 设置测试
  - task: setup_deploy
    prompt: 设置部署
  - task: add_notifications
    prompt: 添加通知
  - task: document_workflow
    prompt: 文档化工作流`
  },
  {
    id: "recipe-generator",
    name: "Recipe Generator",
    category: "内容创作",
    description: "生成菜谱和烹饪指南",
    author: "社区贡献",
    stars: 2150,
    usage: 9150,
    tags: ["内容", "创作", "生活"],
    config: `name: Recipe Generator
description: 菜谱生成
model: gpt-4o-mini
max_steps: 6
tools:
  - search
steps:
  - task: understand_preferences
    prompt: 理解偏好
  - task: research_ingredients
    prompt: 研究食材
  - task: design_recipe
    prompt: 设计菜谱
  - task: write_instructions
    prompt: 编写步骤
  - task: add_tips
    prompt: 添加技巧
  - task: calculate_nutrition
    prompt: 计算营养`
  },
  {
    id: "security-audit-bot",
    name: "Security Audit Bot",
    category: "开发工具",
    description: "自动安全审计",
    author: "OpenClaw官方",
    stars: 2200,
    usage: 9380,
    tags: ["代码", "安全", "开发"],
    config: `name: Security Audit Bot
description: 安全审计机器人
model: gpt-4o
max_steps: 7
tools:
  - code_interpreter
  - search
steps:
  - task: scan_dependencies
    prompt: 扫描依赖
  - task: check_vulnerabilities
    prompt: 检查漏洞
  - task: review_auth
    prompt: 审查认证
  - task: check_secrets
    prompt: 检查密钥
  - task: review_permissions
    prompt: 审查权限
  - task: suggest_fixes
    prompt: 建议修复
  - task: generate_report
    prompt: 生成报告`
  },
  {
    id: "pricing-strategy-analyzer",
    name: "Pricing Strategy Analyzer",
    category: "调研分析",
    description: "分析定价策略",
    author: "社区贡献",
    stars: 1700,
    usage: 7240,
    tags: ["调研", "商业", "分析"],
    config: `name: Pricing Strategy Analyzer
description: 定价策略分析
model: claude-3-opus
max_steps: 6
tools:
  - search
  - code_interpreter
steps:
  - task: research_market
    prompt: 研究市场
  - task: analyze_competitors
    prompt: 分析竞品
  - task: evaluate_costs
    prompt: 评估成本
  - task: test_price_points
    prompt: 测试价格点
  - task: recommend_strategy
    prompt: 推荐策略
  - task: forecast_revenue
    prompt: 预测收入`
  },
  {
    id: "docker-compose-generator",
    name: "Docker Compose Generator",
    category: "开发工具",
    description: "生成Docker Compose配置",
    author: "OpenClaw官方",
    stars: 2300,
    usage: 9790,
    tags: ["代码", "部署", "开发"],
    config: `name: Docker Compose Generator
description: Docker Compose生成
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: analyze_services
    prompt: 分析服务
  - task: define_network
    prompt: 定义网络
  - task: configure_volumes
    prompt: 配置卷
  - task: set_env_vars
    prompt: 设置环境变量
  - task: write_compose
    prompt: 编写compose
  - task: add_healthchecks
    prompt: 添加健康检查`
  },
  {
    id: "travel-itinerary-planner",
    name: "Travel Itinerary Planner",
    category: "内容创作",
    description: "规划旅行行程",
    author: "社区贡献",
    stars: 2450,
    usage: 10420,
    tags: ["内容", "规划", "生活"],
    config: `name: Travel Itinerary Planner
description: 旅行行程规划
model: claude-sonnet-4.6
max_steps: 7
tools:
  - search
  - code_interpreter
steps:
  - task: understand_preferences
    prompt: 理解偏好
  - task: research_destination
    prompt: 研究目的地
  - task: plan_days
    prompt: 规划天数
  - task: select_attractions
    prompt: 选择景点
  - task: book_accommodation
    prompt: 推荐住宿
  - task: plan_transport
    prompt: 规划交通
  - task: optimize_schedule
    prompt: 优化行程`
  },
  {
    id: "kubernetes-deployment-helper",
    name: "Kubernetes Deployment Helper",
    category: "开发工具",
    description: "辅助Kubernetes部署",
    author: "OpenClaw官方",
    stars: 1850,
    usage: 7890,
    tags: ["代码", "部署", "开发"],
    config: `name: Kubernetes Deployment Helper
description: Kubernetes部署助手
model: gpt-4o
max_steps: 7
tools:
  - code_interpreter
steps:
  - task: analyze_app
    prompt: 分析应用
  - task: create_deployment
    prompt: 创建Deployment
  - task: create_service
    prompt: 创建Service
  - task: configure_ingress
    prompt: 配置Ingress
  - task: set_up_hpa
    prompt: 设置HPA
  - task: add_configmaps
    prompt: 添加ConfigMaps
  - task: write_manifests
    prompt: 编写清单`
  },
  {
    id: "brand-voice-developer",
    name: "Brand Voice Developer",
    category: "内容创作",
    description: "开发品牌声音",
    author: "社区贡献",
    stars: 1650,
    usage: 7030,
    tags: ["内容", "品牌", "创作"],
    config: `name: Brand Voice Developer
description: 品牌声音开发
model: claude-sonnet-4.6
max_steps: 6
tools:
  - search
steps:
  - task: analyze_brand
    prompt: 分析品牌
  - task: research_audience
    prompt: 研究受众
  - task: define_personality
    prompt: 定义个性
  - task: create_guidelines
    prompt: 创建指南
  - task: write_examples
    prompt: 编写示例
  - task: create_templates
    prompt: 创建模板`
  },
  {
    id: "incident-response-bot",
    name: "Incident Response Bot",
    category: "开发工具",
    description: "辅助事故响应",
    author: "OpenClaw官方",
    stars: 2100,
    usage: 8950,
    tags: ["监控", "自动化", "开发"],
    config: `name: Incident Response Bot
description: 事故响应机器人
model: gpt-4o
max_steps: 8
tools:
  - code_interpreter
steps:
  - task: detect_incident
    prompt: 检测事故
  - task: assess_impact
    prompt: 评估影响
  - task: notify_team
    prompt: 通知团队
  - task: identify_root_cause
    prompt: 识别根因
  - task: apply_fix
    prompt: 应用修复
  - task: verify_fix
    prompt: 验证修复
  - task: document_incident
    prompt: 文档化事故
  - task: suggest_prevention
    prompt: 建议预防`
  },
  {
    id: "keyword-research-agent",
    name: "Keyword Research Agent",
    category: "调研分析",
    description: "关键词研究",
    author: "社区贡献",
    stars: 2350,
    usage: 10010,
    tags: ["调研", "SEO", "分析"],
    config: `name: Keyword Research Agent
description: 关键词研究
model: claude-3-opus
max_steps: 6
tools:
  - search
  - browser
steps:
  - task: brainstorm_seeds
    prompt: 头脑风暴种子词
  - task: expand_keywords
    prompt: 扩展关键词
  - task: check_volume
    prompt: 检查搜索量
  - task: analyze_competition
    prompt: 分析竞争
  - task: find_long_tail
    prompt: 发现长尾
  - task: prioritize_keywords
    prompt: 优先级排序`
  },
  {
    id: "markdown-documentation-generator",
    name: "Markdown Documentation Generator",
    category: "开发工具",
    description: "生成Markdown文档",
    author: "OpenClaw官方",
    stars: 2000,
    usage: 8530,
    tags: ["文档", "代码", "开发"],
    config: `name: Markdown Documentation Generator
description: Markdown文档生成
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: analyze_project
    prompt: 分析项目
  - task: outline_docs
    prompt: 大纲文档
  - task: write_readme
    prompt: 编写README
  - task: document_api
    prompt: 文档化API
  - task: add_examples
    prompt: 添加示例
  - task: generate_mkdocs
    prompt: 生成MkDocs`
  },
  {
    id: "workout-plan-creator",
    name: "Workout Plan Creator",
    category: "内容创作",
    description: "创建健身计划",
    author: "社区贡献",
    stars: 2250,
    usage: 9580,
    tags: ["内容", "规划", "生活"],
    config: `name: Workout Plan Creator
description: 健身计划创建
model: gpt-4o-mini
max_steps: 6
tools:
  - search
steps:
  - task: assess_fitness
    prompt: 评估健身水平
  - task: understand_goals
    prompt: 理解目标
  - task: choose_exercises
    prompt: 选择练习
  - task: plan_schedule
    prompt: 规划时间表
  - task: add_progress
    prompt: 添加进度追踪
  - task: create_plan
    prompt: 创建计划`
  },
  {
    id: "mobile-app-testing-bot",
    name: "Mobile App Testing Bot",
    category: "开发工具",
    description: "移动应用测试自动化",
    author: "OpenClaw官方",
    stars: 1750,
    usage: 7450,
    tags: ["测试", "代码", "开发"],
    config: `name: Mobile App Testing Bot
description: 移动应用测试
model: gpt-4o
max_steps: 7
tools:
  - code_interpreter
steps:
  - task: analyze_app
    prompt: 分析应用
  - task: design_test_cases
    prompt: 设计测试用例
  - task: write_ui_tests
    prompt: 编写UI测试
  - task: write_unit_tests
    prompt: 编写单元测试
  - task: run_tests
    prompt: 运行测试
  - task: report_bugs
    prompt: 报告Bug
  - task: suggest_improvements
    prompt: 建议改进`
  },
  {
    id: "competitor-price-monitor",
    name: "Competitor Price Monitor",
    category: "调研分析",
    description: "监控竞品价格",
    author: "社区贡献",
    stars: 1950,
    usage: 8290,
    tags: ["调研", "竞品", "监控"],
    config: `name: Competitor Price Monitor
description: 竞品价格监控
model: claude-sonnet-4.6
max_steps: 6
tools:
  - browser
  - search
steps:
  - task: list_competitors
    prompt: 列出竞品
  - task: collect_prices
    prompt: 收集价格
  - task: track_changes
    prompt: 追踪变化
  - task: analyze_trends
    prompt: 分析趋势
  - task: suggest_pricing
    prompt: 建议定价
  - task: generate_alert
    prompt: 生成警报`
  },
  {
    id: "graphql-schema-generator",
    name: "GraphQL Schema Generator",
    category: "开发工具",
    description: "生成GraphQL Schema",
    author: "OpenClaw官方",
    stars: 1800,
    usage: 7670,
    tags: ["API", "代码", "开发"],
    config: `name: GraphQL Schema Generator
description: GraphQL Schema生成
model: gpt-4o
max_steps: 6
tools:
  - code_interpreter
steps:
  - task: analyze_data
    prompt: 分析数据
  - task: define_types
    prompt: 定义类型
  - task: define_queries
    prompt: 定义查询
  - task: define_mutations
    prompt: 定义变更
  - task: add_resolvers
    prompt: 添加解析器
  - task: write_schema
    prompt: 编写Schema`
  },
  {
    id: "study-plan-creator",
    name: "Study Plan Creator",
    category: "内容创作",
    description: "创建学习计划",
    author: "社区贡献",
    stars: 2150,
    usage: 9140,
    tags: ["内容", "规划", "教育"],
    config: `name: Study Plan Creator
description: 学习计划创建
model: claude-sonnet-4.6
max_steps: 6
tools:
  - search
  - code_interpreter
steps:
  - task: assess_current
    prompt: 评估当前水平
  - task: define_goals
    prompt: 定义目标
  - task: gather_resources
    prompt: 收集资源
  - task: plan_schedule
    prompt: 规划时间表
  - task: add_milestones
    prompt: 添加里程碑
  - task: create_plan
    prompt: 创建计划`
  }
];
