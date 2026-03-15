(function () {
  const state = {
    currentLang: localStorage.getItem("openclaw-module-lang") || "zh",
    currentPage: "task-library",
    currentRenderer: null,
    quickStartTrack: "windows"
  };

  const ui = {
    nav: {
      quickstart: { zh: "快速开始", en: "Quick Start" },
      "command-center": { zh: "命令中心", en: "Command Center" },
      troubleshooting: { zh: "故障排除", en: "Troubleshooting" },
      "task-library": { zh: "模板库", en: "Task Library" },
      "cost-calculator": { zh: "成本计算器", en: "Cost Calculator" },
      workflows: { zh: "工作流", en: "Workflows" },
      tools: { zh: "工具", en: "Tools" },
      tutorials: { zh: "教程", en: "Tutorials" },
      community: { zh: "社区", en: "Community" },
      "release-notes": { zh: "更新日志", en: "Release Notes" }
    },
    shell: {
      brand: "OpenClaw Resource Hub",
      quickAction: { zh: "先看快速开始", en: "Open Quick Start" },
      commandAction: { zh: "打开命令中心", en: "Open Command Center" },
      langZh: "中文",
      langEn: "EN"
    },
    common: {
      copy: { zh: "复制", en: "Copy" },
      copied: { zh: "已复制", en: "Copied" },
      noResult: { zh: "没有匹配结果", en: "No matching result" },
      selected: { zh: "当前", en: "Current" },
      views: { zh: "浏览", en: "views" },
      uses: { zh: "使用", en: "uses" }
    },
    pageMeta: {
      "task-library": {
        eyebrow: { zh: "可复用任务", en: "Reusable Tasks" },
        title: { zh: "任务模板库", en: "Task Library" },
        subtitle: {
          zh: "把现阶段最值得复用的任务模板整理成可搜索、可复制的资源页，适合内容、调研、客服分流和开发辅助。",
          en: "A reusable task library for content, research, support triage, and developer workflows."
        }
      },
      "cost-calculator": {
        eyebrow: { zh: "控制成本", en: "Spend With Control" },
        title: { zh: "成本计算器", en: "Cost Calculator" },
        subtitle: {
          zh: "用预设场景快速估算日成本和月成本，并比较不同模型的性价比。",
          en: "Estimate daily and monthly cost with presets, then compare models before you scale."
        }
      },
      workflows: {
        eyebrow: { zh: "系统配方", en: "System Recipes" },
        title: { zh: "工作流画廊", en: "Workflow Gallery" },
        subtitle: {
          zh: "把高频场景的多步链路整理成可直接复制的 workflow 卡片。",
          en: "Browse reusable multi-step workflows so you can start from a proven chain instead of a blank page."
        }
      },
      tools: {
        eyebrow: { zh: "操作工具箱", en: "Operator Toolkit" },
        title: { zh: "工具", en: "Tools" },
        subtitle: {
          zh: "把 Prompt 优化、配置生成和错误解读放在一页里，减少切换成本。",
          en: "Keep prompt optimization, config generation, and error decoding in one place."
        }
      },
      tutorials: {
        eyebrow: { zh: "更快上手", en: "Learn Faster" },
        title: { zh: "教程", en: "Tutorials" },
        subtitle: {
          zh: "浏览安装、使用和排错内容，并在同一页里获取快速答案。",
          en: "Browse setup and troubleshooting guides with quick answers on the side."
        }
      },
      community: {
        eyebrow: { zh: "公开构建", en: "Build In Public" },
        title: { zh: "社区", en: "Community" },
        subtitle: {
          zh: "聚合 showcase、交流渠道和贡献建议，先把社区感做起来。",
          en: "A lightweight community layer with showcases, channels, and contribution guidance."
        }
      },
      quickstart: {
        eyebrow: { zh: "从零到跑通", en: "From Zero To Running" },
        title: { zh: "快速开始", en: "Quick Start" },
        subtitle: {
          zh: "按环境选择安装命令，完成最小配置、日志检查和第一轮成本判断。",
          en: "Choose your environment, run a minimal setup, validate logs, and estimate costs."
        }
      },
      "command-center": {
        eyebrow: { zh: "官方速查", en: "Official Cheatsheet" },
        title: { zh: "命令中心 / 速查表", en: "Command Center / Cheatsheet" },
        subtitle: {
          zh: "把官方速查表里的主干命令、运行状态、频道管理、模型探针和工作区参考集中到一个可搜索页面。",
          en: "A searchable mirror of the official cheatsheet for runtime commands, channels, model probes, and workspace references."
        }
      },
      troubleshooting: {
        eyebrow: { zh: "故障定位", en: "Failure Triage" },
        title: { zh: "故障排除", en: "Troubleshooting" },
        subtitle: {
          zh: "把常见报错、频道无响应、gateway 状态异常、memory 失准和官方 fast fixes 拆成独立排查模块。",
          en: "A dedicated troubleshooting module for common failures, silent channels, unhealthy gateways, memory issues, and official fast fixes."
        }
      },
      "release-notes": {
        eyebrow: { zh: "持续交付", en: "Shipping Notes" },
        title: { zh: "更新日志", en: "Release Notes" },
        subtitle: {
          zh: "公开当前站点的推进节奏，明确哪些功能已可用，哪些还在路上。",
          en: "Track what is already usable, what just shipped, and what is still on the roadmap."
        }
      }
    }
  };

  const navItems = [
    { id: "quickstart", href: "/pages/quickstart.html" },
    { id: "command-center", href: "/pages/command-center.html" },
    { id: "troubleshooting", href: "/pages/troubleshooting.html" },
    { id: "task-library", href: "/pages/task-library.html" },
    { id: "cost-calculator", href: "/pages/cost-calculator.html" },
    { id: "tutorials", href: "/pages/tutorials.html" },
    { id: "release-notes", href: "/pages/release-notes.html" }
  ];

  const taskCategoryMap = {
    research: { zh: "市场调研", en: "Research" },
    content: { zh: "内容创作", en: "Content" },
    ops: { zh: "运营自动化", en: "Operations" },
    dev: { zh: "开发辅助", en: "Developer" },
    office: { zh: "办公效率", en: "Productivity" },
    "甯傚満璋冪爺": { zh: "市场调研", en: "Research" },
    "鍐呭鍒涗綔": { zh: "内容创作", en: "Content" },
    "杩愯惀鑷姩鍖?": { zh: "运营自动化", en: "Operations" },
    "寮€鍙戣緟鍔?": { zh: "开发辅助", en: "Developer" },
    "鍔炲叕鏁堢巼": { zh: "办公效率", en: "Productivity" }
  };

  const taskTemplateText = {
    "startup-research-agent": {
      name: { zh: "创业方向调研 Agent", en: "Startup Research Agent" },
      description: { zh: "从市场规模、竞争格局、用户痛点和差异化切入，输出一份结构化的可行性报告。", en: "Analyze market size, competitive landscape, user pain points, and differentiation opportunities." }
    },
    "xiaohongshu-content-agent": {
      name: { zh: "小红书爆款笔记 Agent", en: "Xiaohongshu Content Agent" },
      description: { zh: "分析同类热门笔记后生成标题、正文结构、钩子句和高流量标签。", en: "Reverse engineer high-performing posts and generate titles, structure, hooks, and tags." }
    },
    "support-triage-agent": {
      name: { zh: "客服工单分流 Agent", en: "Support Triage Agent" },
      description: { zh: "对客服对话做问题分类、紧急程度判断，并输出建议回复与处理队列。", en: "Classify support requests, assign urgency, and draft a suggested response." }
    },
    "prd-review-agent": {
      name: { zh: "PRD 审查 Agent", en: "PRD Review Agent" },
      description: { zh: "找出边界条件、歧义、依赖项和潜在缺口，适合需求评审前快速过一遍。", en: "Find missing constraints, ambiguities, dependencies, and release blockers in a PRD." }
    },
    "weekly-report-agent": {
      name: { zh: "增长周报 Agent", en: "Growth Weekly Report Agent" },
      description: { zh: "汇总核心指标、异常波动和建议动作，输出可直接发送给团队的周报摘要。", en: "Summarize weekly metrics, unusual movement, and recommended growth actions." }
    },
    "meeting-summary-agent": {
      name: { zh: "会议纪要 Agent", en: "Meeting Summary Agent" },
      description: { zh: "把会议逐字稿压缩成摘要、决策、负责人和下一步行动。", en: "Turn meeting transcripts into concise summaries, decisions, owners, and next actions." }
    },
    "seo-brief-agent": {
      name: { zh: "SEO Brief Agent", en: "SEO Brief Agent" },
      description: { zh: "针对关键词自动生成内容 brief，包括搜索意图、标题结构、FAQ 和内链建议。", en: "Generate an SEO content brief with search intent, heading ideas, FAQ, and internal links." }
    },
    "bug-triage-agent": {
      name: { zh: "Bug 分级 Agent", en: "Bug Triage Agent" },
      description: { zh: "读取 issue、日志和复现步骤，给出严重级别、根因假设和建议处理优先级。", en: "Read issues and logs, then estimate severity, root cause, and triage priority." }
    }
  };

  const resourceText = {
    quickStartTracks: {
      windows: {
        badge: { zh: "本地试跑", en: "Local Trial" },
        notes: {
          zh: ["优先使用 Node.js 18 或 20 LTS。", "首次运行先执行 openclaw doctor，避免权限和 PATH 问题。", "如果要长期运行，先从单 Agent 配置开始。"],
          en: ["Prefer Node.js 18 or 20 LTS.", "Run openclaw doctor first to catch PATH and permission issues.", "If you plan to run long-term, start with a single-agent config."]
        }
      },
      macos: {
        badge: { zh: "最快上手", en: "Fastest Setup" },
        notes: {
          zh: ["建议把 API Key 放到 .env 或系统 Keychain，不要写死在仓库里。", "Apple Silicon 机器优先用轻量模型做 smoke test。"],
          en: ["Keep API keys in .env or Keychain instead of hardcoding them.", "On Apple Silicon, start with a lightweight model for your smoke test."]
        }
      },
      linux: {
        badge: { zh: "长期运行", en: "Long Running" },
        notes: {
          zh: ["长期运行建议配合 systemd 和日志轮转。", "树莓派优先从 Claude Haiku 或 GPT-4o Mini 开始，先控成本。"],
          en: ["For long-running setups, pair OpenClaw with systemd and log rotation.", "On Raspberry Pi, start with Claude Haiku or GPT-4o Mini to control cost."]
        }
      }
    },
    checklist: {
      zh: ["安装 Node.js 18+", "准备一个可用的模型 API Key", "执行 openclaw init 生成配置", "先用轻量模型做一次 smoke test", "打开日志和成本监控"],
      en: ["Install Node.js 18+", "Prepare a working model API key", "Run openclaw init to generate config", "Use a lightweight model for a smoke test", "Turn on logs and cost monitoring"]
    },
    stacks: {
      zh: [
        { name: "内容工作台", audience: "运营 / 内容团队", outcome: "1 小时内搭出一个可复用的内容产出链路", items: ["爆款选题模板", "SEO Brief Agent", "会议纪要 Agent"] },
        { name: "自动化客服台", audience: "客服 / 社区运营", outcome: "先把重复咨询自动分类，再考虑真正接客服系统", items: ["客服工单分流", "常见错误诊断", "升级工单模板"] },
        { name: "独立开发包", audience: "开发者 / Indie Hacker", outcome: "减少需求模糊和 issue 分流的人工成本", items: ["PRD 审查", "Bug 分级", "发布说明模板"] }
      ],
      en: [
        { name: "Content Desk", audience: "Ops / Content", outcome: "Build a reusable content production chain in under an hour.", items: ["Viral topic template", "SEO Brief Agent", "Meeting Summary Agent"] },
        { name: "Support Automation", audience: "Support / Community", outcome: "Classify repetitive requests first, then connect to a real support system later.", items: ["Support triage", "Error diagnosis", "Escalation template"] },
        { name: "Indie Dev Pack", audience: "Developer / Indie Hacker", outcome: "Reduce ambiguity in product docs and issue triage.", items: ["PRD review", "Bug triage", "Release note template"] }
      ]
    }
  };

  const pageText = {
    taskLibrary: {
      stats: {
        templates: { zh: "模板数", en: "Templates" },
        categories: { zh: "分类", en: "Categories" },
        actions: { zh: "动作", en: "Actions" }
      },
      actionValue: { zh: "搜索 / 复制 / 组合", en: "Search / Preview" },
      searchPlaceholder: { zh: "搜索模板名称、用途或分类", en: "Search by template name, use case, or category" },
      allCategories: { zh: "全部分类", en: "All categories" },
      estimatedTimeFallback: { zh: "快速预览", en: "Quick scan" },
      reusableHint: { zh: "适合复制后二次改写", en: "Good starting point for customization" },
      previewButton: { zh: "展开预览", en: "Preview Code" },
      collapseButton: { zh: "收起预览", en: "Hide Preview" },
      previewTitle: { zh: "模板预览", en: "Template Preview" },
      copyButton: { zh: "复制模板", en: "Copy Template" },
      empty: { zh: "没有匹配的模板，试试更短的关键词。", en: "No matching templates. Try a shorter query." }
    },
    workflow: {
      stats: {
        total: { zh: "工作流", en: "Workflows" },
        tags: { zh: "标签", en: "Tags" },
        actions: { zh: "动作", en: "Actions" }
      },
      actionValue: { zh: "搜索 / 复制配置", en: "Search / Copy Config" },
      searchPlaceholder: { zh: "搜索工作流、作者或标签", en: "Search workflows, authors, or tags" },
      allCategories: { zh: "全部分类", en: "All categories" },
      principlesTitle: { zh: "Workflow 设计原则", en: "Workflow Principles" },
      principles: {
        zh: ["每一步都要有明确输入、输出和失败回退。", "优先先通一条链，再去追求“全自动”。", "能复用的步骤，拆成模板或命令片段。"],
        en: ["Each step needs a clear input, output, and fallback.", "Get one chain working before chasing full automation.", "If a step is reusable, turn it into a template or snippet."]
      },
      nextTitle: { zh: "现阶段适合补的功能", en: "Good Next Additions" },
      nextList: {
        zh: ["给每个工作流补输入示例和预期输出。", "给 workflow 增加难度与耗时标签。", "补一个“我该先用哪个工作流”的引导器。"],
        en: ["Add example inputs and expected outputs to each workflow.", "Add difficulty and estimated-time labels.", "Build a small guide for choosing the first workflow."]
      },
      copyButton: { zh: "复制配置", en: "Copy Config" },
      empty: { zh: "没有匹配的工作流。", en: "No matching workflows." },
      author: { zh: "作者", en: "Author" }
    },
    tutorial: {
      stats: {
        total: { zh: "教程", en: "Tutorials" },
        categories: { zh: "分类", en: "Categories" },
        actions: { zh: "动作", en: "Actions" }
      },
      actionValue: { zh: "筛选 / 阅读 / 排错", en: "Filter / Read" },
      allCategories: { zh: "全部分类", en: "All categories" },
      selectArticle: { zh: "选择一篇教程", en: "Choose a Tutorial" },
      troubleshooting: { zh: "快速排错答案", en: "Troubleshooting Quick Answers" },
      noBody: { zh: "当前提供摘要版内容。", en: "This article currently ships as a concise summary. Switch to Chinese for the full version." }
    },
    cost: {
      stats: {
        models: { zh: "模型", en: "Models" },
        presets: { zh: "场景预设", en: "Presets" },
        actions: { zh: "动作", en: "Actions" }
      },
      actionValue: { zh: "估算 / 比较 / 分享摘要", en: "Estimate / Compare / Share" },
      scenario: { zh: "场景预设", en: "Scenario" },
      model: { zh: "模型", en: "Model" },
      dailyTasks: { zh: "每日任务数", en: "Daily Tasks" },
      stepsPerTask: { zh: "每任务步骤数", en: "Steps per Task" },
      calcButton: { zh: "计算成本", en: "Calculate Cost" },
      copySummary: { zh: "复制结果摘要", en: "Copy Summary" },
      summary: { zh: "成本摘要", en: "Cost Summary" },
      currentModel: { zh: "当前模型", en: "Selected Model" },
      risk: { zh: "风险提示", en: "Risk Level" },
      daily: { zh: "日成本", en: "Daily Cost" },
      monthly: { zh: "月成本", en: "Monthly Cost" },
      comparison: { zh: "模型对比", en: "Model Comparison" },
      suggestions: { zh: "优化建议", en: "Optimization Suggestions" },
      balanced: { zh: "当前模型已经比较均衡，下一步可以优先优化 steps 或输出长度。", en: "This model is already fairly balanced. Next optimize steps or output length." },
      missing: { zh: "当前页面缺少计算脚本，暂时无法计算。", en: "Calculator script is missing on this page." }
    },
    tools: {
      stats: {
        total: { zh: "工具", en: "Tools" },
        target: { zh: "目标", en: "Target" },
        actions: { zh: "动作", en: "Actions" }
      },
      targetValue: { zh: "起步更快", en: "Faster Setup" },
      actionValue: { zh: "生成 / 复制 / 诊断", en: "Generate / Copy / Diagnose" },
      promptTitle: { zh: "Prompt 优化器", en: "Prompt Optimizer" },
      promptPlaceholder: { zh: "贴入原始 Prompt", en: "Paste your original prompt" },
      promptButton: { zh: "生成优化版", en: "Generate Better Prompt" },
      configTitle: { zh: "配置生成器", en: "Config Generator" },
      configButton: { zh: "生成 YAML", en: "Generate YAML" },
      errorTitle: { zh: "错误解码器", en: "Error Decoder" },
      errorPlaceholder: { zh: "贴入日志或错误信息", en: "Paste a log or error message" },
      errorButton: { zh: "分析错误", en: "Analyze Error" },
      promptToast: { zh: "先输入原始 Prompt", en: "Enter a prompt first" },
      errorFallbackTitle: { zh: "未命中预设错误", en: "No Known Error Matched" },
      errorFallbackBody: { zh: "先检查 API Key、网络、步骤数和日志文件，再把关键报错贴到社区页的提问模板里。", en: "Check API key, network, step count, and logs first, then post the key error in a community issue template." }
    },
    community: {
      stats: {
        showcase: { zh: "案例", en: "Showcase" },
        channels: { zh: "渠道", en: "Channels" },
        actions: { zh: "动作", en: "Actions" }
      },
      actionValue: { zh: "浏览 / 提问 / 分享", en: "Browse / Ask / Share" },
      waysTitle: { zh: "加入社区的最好方式", en: "Best Ways to Join" },
      tipsTitle: { zh: "贡献建议", en: "Contribution Tips" },
      tips: {
        zh: ["分享你跑通的一条 workflow，不需要一开始就写成大而全教程。", "遇到问题时附上日志片段、模型、步骤数和复现方式。", "把“踩坑结论”沉淀成 FAQ，比单纯晒图更有价值。"],
        en: ["Share one workflow you actually ran. It does not need to be a giant tutorial.", "When asking for help, include logs, model, step count, and repro details.", "Turn lessons learned into FAQ-style notes. That is more valuable than screenshots alone."]
      }
    },
    quickstart: {
      stats: {
        envs: { zh: "环境", en: "Environments" },
        checks: { zh: "检查项", en: "Checks" },
        goal: { zh: "目标", en: "Goal" }
      },
      goalValue: { zh: "15 分钟起步", en: "Start in 15 min" },
      stacksTitle: { zh: "Starter Stacks", en: "Starter Stacks" },
      checklistTitle: { zh: "启动清单", en: "Launch Checklist" },
      nextTitle: { zh: "下一步建议", en: "What To Do Next" },
      nextList: {
        zh: ["先跑一个轻量模型，确认日志和配置都通，再谈长期运行。", "起步阶段就打开成本页，不要等跑大了再追成本。", "当你能稳定跑完 1 条链路，再去加更多工具。"],
        en: ["Run a lightweight model first and confirm logs and config are healthy.", "Open the cost page early instead of waiting until usage grows.", "Add more tools only after one chain runs reliably end-to-end."]
      },
      copyCommand: { zh: "复制命令", en: "Copy Commands" }
    },
    command: {
      stats: {
        groups: { zh: "命令分组", en: "Command Blocks" },
        focus: { zh: "覆盖范围", en: "Coverage" },
        actions: { zh: "核心动作", en: "Primary Actions" }
      },
      focusValue: { zh: "运行 / 模型 / 频道", en: "Runtime / Models / Channels" },
      actionValue: { zh: "搜索 / 复制 / 跳转", en: "Search / Copy / Route" },
      searchPlaceholder: { zh: "搜索网关、频道、记忆、斜杠命令或工作区", en: "Search gateway, channels, memory, slash commands, or workspace" }
    },
    troubleshooting: {
      stats: {
        issues: { zh: "故障场景", en: "Failure Cases" },
        fixes: { zh: "Fast Fixes", en: "Fast Fixes" },
        actions: { zh: "动作", en: "Actions" }
      },
      actionValue: { zh: "定位 / 修复", en: "Triage / Fix" },
      searchPlaceholder: { zh: "搜索 401、gateway、channels、memory、doctor、超时", en: "Search 401, gateway, channels, memory, doctor, or timeout" },
      ladderTitle: { zh: "推荐排查顺序", en: "Recommended Triage Order" },
      ladder: {
        zh: ["先跑 openclaw doctor，收敛显式环境问题。", "再看 gateway 是否存活，而不是先改 prompt。", "然后检查 channels 探针和 bot 登录状态。", "再检查 models probe 和 provider token。", "最后处理 memory 索引、长链路超时和高级症状。"],
        en: ["Start with openclaw doctor to eliminate explicit environment problems.", "Then verify the gateway is alive before touching prompts.", "Next inspect channel probes and bot login state.", "Then check model probes and provider tokens.", "Handle memory indexing, long-chain timeouts, and advanced symptoms last."]
      },
      escalationTitle: { zh: "什么时候回命令中心", en: "When to Jump Back to Cheatsheet" },
      escalationBody: {
        zh: "如果你已经知道是哪一层坏了，就回到命令中心复制对应命令；如果你还不知道坏在哪一层，就留在故障排除页按顺序缩小范围。",
        en: "If you already know which layer is broken, go back to Command Center and copy the exact command. If the broken layer is still unclear, stay here and narrow the scope first."
      }
    },
    release: {
      stats: {
        rounds: { zh: "更新轮次", en: "Updates" },
        roadmap: { zh: "路线图", en: "Roadmap" },
        status: { zh: "状态", en: "Status" }
      },
      statusValue: { zh: "上线基线已就绪", en: "Launch Baseline Ready" },
      nextTitle: { zh: "接下来补什么", en: "What Comes Next" },
      ideaTitle: { zh: "适合下一轮做的事", en: "Best Next Iteration" },
      ideaBody: {
        zh: "下一轮最有价值的事情不是继续加页面，而是把命令、排错、模板详情和教程详情做得更深、更可检索，并接上真实使用数据。",
        en: "The best next step is not more pages. It is deeper command docs, troubleshooting, richer template and tutorial detail pages, plus real usage data."
      }
    }
  };

  const workflowCategoryMap = {
    "鑷姩鍖?": { zh: "自动化", en: "Automation" },
    "璋冪爺鍒嗘瀽": { zh: "调研分析", en: "Research" },
    "鍐呭鍒涗綔": { zh: "内容创作", en: "Content" },
    "寮€鍙戝伐鍏?": { zh: "开发工具", en: "Developer" }
  };

  const workflowTagMap = {
    "鑷姩鍖?": { zh: "自动化", en: "Automation" },
    "璋冪爺": { zh: "调研", en: "Research" },
    "鍟嗕笟": { zh: "商业", en: "Business" },
    "鍒涗笟": { zh: "创业", en: "Startup" },
    "楠岃瘉": { zh: "验证", en: "Validation" },
    "鍒嗘瀽": { zh: "分析", en: "Analysis" },
    "浠ｇ爜": { zh: "代码", en: "Code" },
    "鏂囨。": { zh: "文档", en: "Docs" },
    API: { zh: "API", en: "API" },
    "娴嬭瘯": { zh: "测试", en: "Testing" },
    "鏁版嵁": { zh: "数据", en: "Data" },
    "鍐呭": { zh: "内容", en: "Content" },
    SEO: { zh: "SEO", en: "SEO" },
    "鏁版嵁搴?": { zh: "数据库", en: "Database" },
    "閮ㄧ讲": { zh: "部署", en: "Deployment" },
    "鐩戞帶": { zh: "监控", en: "Monitoring" },
    "浼樺寲": { zh: "优化", en: "Optimization" }
  };

  const tutorialCategoryMap = {
    beginner: { zh: "新手入门", en: "Beginner" },
    advanced: { zh: "进阶技巧", en: "Advanced" },
    faq: { zh: "常见问题", en: "FAQ" },
    "best-practice": { zh: "最佳实践", en: "Best Practices" },
    "鏂版墜鍏ラ棬": { zh: "新手入门", en: "Beginner" },
    "杩涢樁鎶€宸?": { zh: "进阶技巧", en: "Advanced" },
    "甯歌闂": { zh: "常见问题", en: "FAQ" },
    "鏈€浣冲疄璺?": { zh: "最佳实践", en: "Best Practices" }
  };

  const tutorialTitleMap = {
    "beginner-01": { zh: "10 分钟快速部署 OpenClaw", en: "Deploy OpenClaw in 10 Minutes" },
    "beginner-02": { zh: "创建你的第一个 Agent", en: "Create Your First Agent" },
    "beginner-03": { zh: "理解 OpenClaw 的工作原理", en: "How OpenClaw Works" },
    "beginner-04": { zh: "基础工具使用指南", en: "Core Tooling Guide" },
    "beginner-05": { zh: "如何获取和配置 API Key", en: "Get and Configure an API Key" },
    "advanced-01": { zh: "多 Agent 协作链路设计", en: "Multi-Agent Chain Design" },
    "advanced-02": { zh: "长链路任务的成本控制", en: "Cost Control for Long Chains" },
    "advanced-03": { zh: "浏览器自动化的稳定性优化", en: "Hardening Browser Automation" },
    "advanced-04": { zh: "日志与可观测性实践", en: "Logging and Observability" },
    "advanced-05": { zh: "生产环境部署建议", en: "Production Deployment Guide" },
    "faq-01": { zh: "为什么启动后调用就失败", en: "Why Calls Fail After Startup" },
    "faq-02": { zh: "为什么成本比预期更高", en: "Why Costs Are Higher Than Expected" },
    "faq-03": { zh: "如何判断该不该换模型", en: "When To Switch Models" },
    "faq-04": { zh: "为什么浏览器步骤总是超时", en: "Why Browser Steps Timeout" },
    "faq-05": { zh: "树莓派部署的常见坑", en: "Common Raspberry Pi Pitfalls" },
    "best-practice-01": { zh: "先跑通一条链再扩展", en: "Ship One Reliable Chain First" },
    "best-practice-02": { zh: "模板、命令与教程如何配合", en: "How Templates, Commands, and Guides Fit Together" },
    "best-practice-03": { zh: "团队共享 OpenClaw 的方式", en: "Sharing OpenClaw Across a Team" },
    "best-practice-04": { zh: "如何沉淀可复用的 Workflow", en: "Turning Ad-hoc Work into Reusable Workflows" },
    "best-practice-05": { zh: "从试验到上线的交付节奏", en: "Moving from Trials to Production" }
  };

  const tutorialPreviewMap = {
    "beginner-01": {
      zh: "安装 Node.js，初始化 OpenClaw，生成 config.yaml，并完成第一次成功启动验证。",
      en: "Install Node.js, initialize OpenClaw, generate config.yaml, and validate the first successful boot."
    },
    "beginner-02": {
      zh: "理解 Agent 的职责，定义任务、接入工具，并跑通第一条对话链路。",
      en: "Understand what an Agent does, define its task, attach tools, and run the first conversation chain."
    },
    "beginner-03": {
      zh: "梳理 OpenClaw 的执行循环：输入、规划、工具调用、结果汇总与最终回答。",
      en: "Learn the OpenClaw execution loop: input, planning, tool calls, result collection, and final answer."
    },
    "beginner-04": {
      zh: "快速认识 Search、Browser 和 Code Interpreter 三类核心工具及使用边界。",
      en: "Get familiar with Search, Browser, and Code Interpreter, and when each tool should be used."
    },
    "beginner-05": {
      zh: "对比常见模型平台的 API Key 获取方式，并完成本地环境注入。",
      en: "Compare common model providers, obtain an API key, and load it into your local environment."
    }
  };

  const difficultyMap = {
    "绠€鍗?": { zh: "简单", en: "Easy" },
    "涓瓑": { zh: "中等", en: "Intermediate" },
    "鍥伴毦": { zh: "困难", en: "Advanced" }
  };

  const showcaseCategoryMap = {
    "鑷姩鍖?": { zh: "自动化", en: "Automation" },
    "鏁堢巼": { zh: "效率", en: "Productivity" },
    "寮€鍙?": { zh: "开发", en: "Developer" },
    "璋冪爺鍒嗘瀽": { zh: "调研分析", en: "Research" }
  };

  const commandSections = {
    zh: [
      { title: "CLI 启动", description: "最常用的本地初始化和排错命令。", commands: [{ label: "初始化项目", code: "openclaw init" }, { label: "启动服务", code: "openclaw start" }, { label: "环境体检", code: "openclaw doctor" }, { label: "查看版本", code: "openclaw --version" }] },
      { title: "Gateway 与运行状态", description: "对齐官方速查表的第一层运行控制。先确认 gateway 活着，再判断频道和模型是否正常。", commands: [{ label: "启动 gateway", code: "openclaw gateway start" }, { label: "查看 gateway 状态", code: "openclaw gateway status" }, { label: "重启 gateway", code: "openclaw gateway restart" }, { label: "查看 agent 会话", code: "openclaw sessions list" }] },
      { title: "模型与授权", description: "当模型探针失败或 provider 权限有问题时，先从这里排。", commands: [{ label: "列出模型", code: "openclaw models list --provider anthropic" }, { label: "模型状态探针", code: "openclaw models status --probe" }, { label: "切换默认模型", code: "openclaw models set claude-3-5-sonnet" }, { label: "设置 provider token", code: "openclaw models auth setup-token --provider anthropic" }] },
      { title: "配置片段", description: "当前阶段最值得保留的 YAML 片段。", commands: [{ label: "轻量模型", code: "model: claude-haiku-4.6\nmax_steps: 24" }, { label: "心跳配置", code: "heartbeat:\n  enabled: true\n  interval: 60" }, { label: "日志输出", code: "logging:\n  level: info\n  file: openclaw.log" }] },
      { title: "上线前检查", description: "避免最常见的首发事故。", commands: [{ label: "检查端口", code: "netstat -ano | findstr 8080" }, { label: "检查环境变量", code: "echo %OPENCLAW_API_KEY%" }, { label: "检查日志", code: "type openclaw.log" }] }
    ],
    en: [
      { title: "CLI Startup", description: "Most-used commands for local setup and debugging.", commands: [{ label: "Initialize project", code: "openclaw init" }, { label: "Start service", code: "openclaw start" }, { label: "Health check", code: "openclaw doctor" }, { label: "Show version", code: "openclaw --version" }] },
      { title: "Gateway and Runtime", description: "Aligned with the first operating layer in the official cheatsheet. Prove the gateway is alive before you debug channels or models.", commands: [{ label: "Start gateway", code: "openclaw gateway start" }, { label: "Gateway status", code: "openclaw gateway status" }, { label: "Restart gateway", code: "openclaw gateway restart" }, { label: "List sessions", code: "openclaw sessions list" }] },
      { title: "Models and Auth", description: "Use these when model probes fail or provider authorization looks suspicious.", commands: [{ label: "List models", code: "openclaw models list --provider anthropic" }, { label: "Model probe", code: "openclaw models status --probe" }, { label: "Set default model", code: "openclaw models set claude-3-5-sonnet" }, { label: "Setup provider token", code: "openclaw models auth setup-token --provider anthropic" }] },
      { title: "Config Snippets", description: "Small YAML fragments worth keeping around.", commands: [{ label: "Light model", code: "model: claude-haiku-4.6\nmax_steps: 24" }, { label: "Heartbeat", code: "heartbeat:\n  enabled: true\n  interval: 60" }, { label: "Logging", code: "logging:\n  level: info\n  file: openclaw.log" }] },
      { title: "Pre-Launch Checks", description: "Avoid the most common launch mistakes.", commands: [{ label: "Check port", code: "netstat -ano | findstr 8080" }, { label: "Check env var", code: "echo %OPENCLAW_API_KEY%" }, { label: "Inspect log", code: "type openclaw.log" }] }
    ]
  };

  const troubleshooting = {
    zh: [
      { title: "API Key 无效或未加载", symptoms: "启动时报 401 / 模型调用立即失败", diagnosis: "优先检查配置文件是否把换行、引号或空格一起带进去了。", fix: ["重新复制 API Key，避免尾部空格。", "把 Key 放进环境变量，再在配置里读取。", "先用最小配置做一次单步请求验证。"] },
      { title: "请求频率过高", symptoms: "429 rate limit / 批量任务间歇性失败", diagnosis: "通常不是 OpenClaw 本身故障，而是并发或重试策略过猛。", fix: ["把批处理改成队列执行。", "降低 max_steps 或减少同时运行的 Agent 数量。", "高峰时段切到轻量模型。"] },
      { title: "日志里出现 timeout", symptoms: "步骤卡住 / 浏览器工具返回慢", diagnosis: "常见于网页抓取链路过长，或者模型输出太大。", fix: ["先缩短输入上下文。", "把一个长任务拆成两到三段。", "必要时限制每步输出格式。"] },
      { title: "频道不回消息", symptoms: "DM 无回复 / 群聊沉默", diagnosis: "先不要猜是 prompt 或模型问题。官方速查表的第一步是做频道探针。", fix: ["运行 openclaw channels status --probe。", "确认 bot token 和频道登录还有效。", "先在私聊验证，再回到群聊检查权限。"] },
      { title: "Memory 结果不准", symptoms: "记忆搜索不到 / 返回旧内容", diagnosis: "多半是索引陈旧或 memory provider 状态异常。", fix: ["运行 openclaw memory status。", "检查当前索引和 provider 是否健康。", "必要时执行 openclaw memory index --force。"] }
    ],
    en: [
      { title: "API key is invalid or missing", symptoms: "401 on startup / model calls fail immediately", diagnosis: "Check whether line breaks, quotes, or whitespace were copied into the config.", fix: ["Copy the API key again without trailing spaces.", "Load the key from environment variables.", "Validate with a minimal one-step request first."] },
      { title: "Rate limit is too high", symptoms: "429 rate limit / intermittent batch failures", diagnosis: "This is usually concurrency or retry pressure, not an OpenClaw platform issue.", fix: ["Move batch work into a queue.", "Reduce max_steps or active agents.", "Switch to a lighter model during peak usage."] },
      { title: "Timeout appears in logs", symptoms: "A step hangs / browser tool responds slowly", diagnosis: "Often caused by long page-fetching chains or overly large outputs.", fix: ["Reduce input context first.", "Split one long task into two or three stages.", "Constrain output format per step."] },
      { title: "Channel does not reply", symptoms: "No DM reply / silent group chat", diagnosis: "Do not start by blaming the prompt or model. The official cheatsheet says to probe the channel first.", fix: ["Run openclaw channels status --probe.", "Confirm the bot token or login is still valid.", "Prove the bot works in DM first, then inspect group permissions."] },
      { title: "Memory search looks wrong", symptoms: "Missing memories / stale results", diagnosis: "This is usually a stale index or an unhealthy memory provider.", fix: ["Run openclaw memory status.", "Check the current index and provider health.", "If needed, run openclaw memory index --force."] }
    ]
  };

  const releaseNotes = {
    zh: [
      { version: "Launch Baseline", date: "2026-03-15", highlights: ["补齐首页与核心内页的 SEO 元信息、canonical、OG 与 Twitter 卡片。", "新增 robots.txt、sitemap.xml、404 页面与站点静态校验脚本。", "接入可后续填写 GA4 ID 的埋点基线，并清理发布时的未完成感文案。"] },
      { version: "MVP Sprint 3", date: "2026-03-14", highlights: ["独立页从占位状态改为真实模块页。", "新增 Quick Start、Command Center、Release Notes 三个静态功能页。", "补齐中英文切换并重做独立页渲染层。"] },
      { version: "MVP Sprint 2", date: "2026-03-13", highlights: ["成本计算器接入多模型对比和优化建议。", "补齐模块页基础导航和复制交互。"] },
      { version: "MVP Sprint 1", date: "2026-03-11", highlights: ["项目从单首页结构切出 6 个模块入口。", "建立首批任务模板、工作流和教程种子数据。"] }
    ],
    en: [
      { version: "Launch Baseline", date: "2026-03-15", highlights: ["Added canonical, OG, Twitter, and shared SEO metadata across the homepage and core pages.", "Added robots.txt, sitemap.xml, a 404 page, and a static site verification script.", "Prepared analytics wiring for a future GA4 ID and cleaned up unfinished-looking launch copy."] },
      { version: "MVP Sprint 3", date: "2026-03-14", highlights: ["Standalone pages are now real module pages, not placeholders.", "Added Quick Start, Command Center, and Release Notes pages.", "Rebuilt the bilingual page renderer and cleaned the content layer."] },
      { version: "MVP Sprint 2", date: "2026-03-13", highlights: ["Cost calculator now compares models and shows optimization hints.", "Filled in module page navigation and copy interactions."] },
      { version: "MVP Sprint 1", date: "2026-03-11", highlights: ["Split the project from a single homepage into six module entry points.", "Created seed data for templates, workflows, and tutorials."] }
    ]
  };

  const roadmapItems = {
    zh: ["把模板、教程、工作流扩充为更完整、可筛选的生产数据集。", "补教程详情页，以及收藏 / 历史记录等回访能力。", "接入真实 GA4 Measurement ID，开始看页面流量和点击行为。", "做一轮发布后人工验收，确认默认 Vercel 域名下的分享、404 和跳转表现。"],
    en: ["Expand templates, tutorials, and workflows into a richer production-grade dataset.", "Add tutorial detail pages plus favorites and history for return visits.", "Plug in a real GA4 Measurement ID so page traffic and clicks are measurable.", "Run a post-deploy manual QA pass for sharing cards, 404 behavior, and redirects on the default Vercel domain."]
  };

  const communityChannels = {
    zh: [
      { name: "GitHub Discussions", description: "适合沉淀部署问题、配置范式和排错结论。", action: "收集问题与解决方案" },
      { name: "Discord / 社群", description: "适合快速问答和展示你最新跑通的一条 workflow。", action: "每周挑一条最佳实践做精选" },
      { name: "Build Log", description: "记录每次改模型、改心跳、改步骤后的实际结果。", action: "形成长期可复用的运维日志" }
    ],
    en: [
      { name: "GitHub Discussions", description: "Best for durable deployment notes, config patterns, and debugging outcomes.", action: "Collect issues and solutions" },
      { name: "Discord / Community", description: "Best for fast Q&A and sharing a recent workflow.", action: "Turn one strong practice into a weekly highlight" },
      { name: "Build Log", description: "Track what changed after each model, heartbeat, or step adjustment.", action: "Build a reusable operations log" }
    ]
  };

  function t(value) {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number") return String(value);
    return value[state.currentLang] || value.zh || value.en || "";
  }

  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function readGlobal(primary, fallback) {
    return typeof fallback !== "undefined" ? fallback : primary;
  }

  function track(name, params) {
    if (typeof window.trackEvent === "function") {
      window.trackEvent(name, params || {});
    }
  }

  function showToast(message) {
    const existing = document.getElementById("page-toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.id = "page-toast";
    toast.className = "fixed bottom-6 right-6 z-50 rounded-2xl border border-red-400/40 bg-slate-900/95 px-4 py-3 text-sm text-slate-100 shadow-2xl shadow-red-950/30";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 220ms ease";
    }, 2200);
    setTimeout(() => toast.remove(), 2600);
  }

  function copyToClipboard(text, message) {
    if (!navigator.clipboard) {
      showToast(state.currentLang === "zh" ? "当前浏览器不支持复制" : "Clipboard is not available");
      return Promise.resolve(false);
    }
    return navigator.clipboard.writeText(text).then(() => {
      showToast(message || t(ui.common.copied));
      return true;
    });
  }

  function formatCurrency(value) {
    return `$${Number(value || 0).toFixed(2)}`;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem("openclaw-module-lang", lang);
    localStorage.setItem("openclaw-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    if (typeof state.currentRenderer === "function") state.currentRenderer();
  }

  function setPage(pageId, renderer) {
    state.currentPage = pageId;
    state.currentRenderer = renderer;
  }

  function getStoredChecklist() {
    try {
      return JSON.parse(localStorage.getItem("openclaw-quickstart-checklist") || "{}");
    } catch (_error) {
      return {};
    }
  }

  function setStoredChecklist(data) {
    localStorage.setItem("openclaw-quickstart-checklist", JSON.stringify(data));
  }

  function localizeTaskCategory(category) {
    return t(taskCategoryMap[category] || { zh: category, en: category });
  }

  function localizeTaskTemplate(item) {
    const entry = taskTemplateText[item.id];
    return {
      name: entry ? t(entry.name) : item.name,
      description: entry ? t(entry.description) : item.description
    };
  }

  function localizeWorkflowCategory(category) {
    return t(workflowCategoryMap[category] || { zh: category, en: category });
  }

  function localizeWorkflowTag(tag) {
    return t(workflowTagMap[tag] || { zh: tag, en: tag });
  }

  function localizeWorkflowAuthor(author) {
    if (author === "OpenClaw瀹樻柟") return state.currentLang === "zh" ? "OpenClaw 官方" : "OpenClaw Official";
    if (author === "绀惧尯璐＄尞") return state.currentLang === "zh" ? "社区贡献者" : "Community Contributor";
    return author;
  }

  function workflowSummary(item) {
    const tagText = safeArray(item.tags).slice(0, 2).map((tag) => localizeWorkflowTag(tag)).join(" / ");
    if (state.currentLang === "zh") {
      return `适用于${localizeWorkflowCategory(item.category)}场景的可复用流程，重点覆盖${tagText || "执行链路"}。`;
    }
    return `A reusable ${localizeWorkflowCategory(item.category).toLowerCase()} workflow focused on ${tagText || "reliable execution chains"}.`;
  }

  function localizeTutorialCategory(item) {
    return t(tutorialCategoryMap[item.id || item.category] || tutorialCategoryMap[item.name] || { zh: item.name, en: item.id || item.name });
  }

  function localizeTutorialDifficulty(value) {
    return t(difficultyMap[value] || { zh: value, en: value });
  }

  function localizeTutorialTitle(item) {
    return t(tutorialTitleMap[item.id] || { zh: item.title || item.id, en: item.title || item.id });
  }

  function localizeTutorialPreview(item) {
    const entry = tutorialPreviewMap[item.id];
    if (entry) return t(entry);
    return state.currentLang === "zh" ? "这篇教程正在整理成更完整的正文版本，当前先提供摘要和快速排错入口。" : "This guide is being expanded into a fuller article. For now, use the summary and troubleshooting panel.";
  }

  function localizeReadTime(value) {
    const raw = String(value || "");
    if (state.currentLang === "zh") return raw.replace(/鍒嗛挓/g, "分钟");
    const minutes = raw.match(/\d+/g);
    return minutes ? `${minutes.join("-")} min` : raw;
  }

  function localizeShowcaseCategory(category) {
    return t(showcaseCategoryMap[category] || { zh: "案例", en: "Showcase" });
  }

  function localizeShowcaseDifficulty(value) {
    return t(difficultyMap[value] || { zh: value, en: value });
  }

  function localizeShowcaseAuthor(author) {
    return localizeWorkflowAuthor(author);
  }

  function warningText(level) {
    const map = {
      low: { zh: "成本合理", en: "Healthy cost" },
      medium: { zh: "请注意成本", en: "Watch cost" },
      high: { zh: "成本较高", en: "Cost is high" },
      critical: { zh: "成本过高，建议优化", en: "Cost is too high" }
    };
    return t(map[level] || map.medium);
  }

  const cardSurfaceClass = "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_60px_rgba(2,6,23,0.22)]";
  const cardSurfaceDenseClass = "rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_18px_48px_rgba(2,6,23,0.2)]";
  const searchShellClass = "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(15,23,42,0.48))] p-4 shadow-[0_20px_60px_rgba(2,6,23,0.2)]";
  const insetPanelClass = "rounded-2xl border border-white/10 bg-slate-950/72";
  const fieldClass = "w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-red-400 focus:ring-1 focus:ring-red-400/30";
  const fieldClassOrange = "w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400/30";
  const pillClass = "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300";
  const buttonPrimaryClass = "rounded-full bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-400";
  const buttonSecondaryClass = "rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition hover:border-red-400/40 hover:text-white";
  const buttonSecondaryCompactClass = "rounded-full bg-slate-900/78 px-3 py-1 text-xs text-slate-300 transition hover:bg-slate-800/92 hover:text-white";
  const commandSnippetShellClass = "rounded-[22px] bg-[linear-gradient(180deg,rgba(6,10,20,0.88),rgba(15,23,42,0.56))] px-4 py-3 shadow-[0_14px_34px_rgba(2,6,23,0.16),inset_0_1px_0_rgba(255,255,255,0.02)]";
  const commandSnippetCodeClass = "inline-flex max-w-full whitespace-pre-wrap break-words rounded-[14px] bg-rose-300/[0.08] px-3 py-2 font-mono text-[13px] leading-6 text-rose-200 shadow-[inset_0_0_0_1px_rgba(254,205,211,0.08)]";

  function getTypeScale() {
    const isZh = state.currentLang === "zh";
    return {
      heroTitle: isZh
        ? "text-[clamp(2.6rem,5vw,4.4rem)] tracking-tight leading-[0.95]"
        : "text-[clamp(2.35rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.96]",
      heroBody: isZh
        ? "text-base leading-7 sm:text-[1.05rem]"
        : "text-[15px] leading-7 sm:text-[1rem]",
      sectionTitle: isZh
        ? "text-2xl font-semibold"
        : "text-[1.85rem] font-semibold tracking-[-0.02em]",
      cardTitle: isZh
        ? "text-xl font-semibold"
        : "text-[1.18rem] font-semibold tracking-[-0.015em]",
      body: isZh
        ? "text-[15px] leading-7"
        : "text-[14px] leading-[1.72]",
      compactBody: isZh
        ? "text-[14px] leading-6"
        : "text-[13.5px] leading-[1.65]",
      meta: isZh
        ? "text-sm leading-6"
        : "text-[13px] leading-[1.55]"
    };
  }

  function renderHeroStatCard(item, index) {
    const valueText = t(item.value);
    const compact = String(valueText).length > 12;
    const numeric = /^[0-9]+$/.test(String(valueText).trim());
    const articleSpan = index === 2 ? "xl:col-span-2" : "";
    return `<article class="${articleSpan} relative min-w-0 overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.08),transparent_38%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(15,23,42,0.7))] p-4 shadow-[0_18px_50px_rgba(2,6,23,0.2),inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur"><div class="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-red-200/15 to-transparent"></div><div class="flex h-full flex-col justify-between"><div class="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-400"><span class="h-1.5 w-1.5 rounded-full bg-red-300/55"></span><span>${t(item.label)}</span></div><div class="mt-6 ${numeric ? "text-[clamp(2.15rem,4vw,3rem)]" : compact ? "text-[clamp(1.28rem,1.8vw,1.86rem)] max-w-[12ch]" : "text-[clamp(1.5rem,2vw,2.1rem)]"} font-semibold leading-[1.02] text-white break-words">${valueText}</div></div></article>`;
  }

  function pageShell(pageId, stats) {
    const meta = ui.pageMeta[pageId];
    const type = getTypeScale();
    document.title = `${t(meta.title)} | ${ui.shell.brand}`;
    if (window.openClawSeo) {
      window.openClawSeo.update({
        title: `${t(meta.title)} | ${ui.shell.brand}`,
        description: t(meta.subtitle),
        lang: state.currentLang === "zh" ? "zh-CN" : "en",
        pathname: window.location.pathname
      });
    }
    const headerMarkup = window.openClawSiteShell
      ? window.openClawSiteShell.renderHeader({
          currentPage: pageId,
          lang: state.currentLang,
          brandTop: "OpenClaw",
          brandBottom: ui.shell.brand
        })
      : "";
    document.body.innerHTML = `
      <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(127,29,29,0.16),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_50%,_#111827_100%)] text-slate-100">
        <div class="pointer-events-none fixed inset-0 opacity-50" style="background-image:linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px); background-size: 32px 32px;"></div>
        ${headerMarkup}
        <main class="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section class="grid gap-5 xl:grid-cols-[minmax(0,1.24fr)_minmax(320px,0.76fr)] xl:items-stretch">
            <div class="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.55),rgba(15,23,42,0.18))] p-6 shadow-[0_24px_80px_rgba(2,6,23,0.28)] sm:p-7">
              <p class="mb-4 text-xs uppercase tracking-[0.36em] text-red-200">${t(meta.eyebrow)}</p>
              <h1 class="max-w-4xl ${type.heroTitle} font-semibold text-white break-words">${t(meta.title)}</h1>
              <p class="mt-4 max-w-3xl ${type.heroBody} text-slate-300">${t(meta.subtitle)}</p>
              <div class="mt-6 flex flex-wrap gap-3 text-sm">
                <a href="/pages/quickstart.html" class="${buttonPrimaryClass}">${t(ui.shell.quickAction)}</a>
                <a href="/pages/command-center.html" class="${buttonSecondaryClass}">${t(ui.shell.commandAction)}</a>
              </div>
            </div>
            <div class="grid auto-rows-fr gap-3 sm:grid-cols-3 xl:grid-cols-2">
              ${safeArray(stats).map((item, index) => renderHeroStatCard(item, index)).join("")}
            </div>
          </section>
          <section class="relative mt-7 overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(2,6,23,0.72))] shadow-[0_28px_90px_rgba(2,6,23,0.28)]">
            <div class="pointer-events-none absolute inset-x-0 mt-px h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"></div>
            <div class="rounded-[31px] bg-[linear-gradient(180deg,rgba(15,23,42,0.42),rgba(2,6,23,0.12))] p-3 sm:p-5 lg:p-6">
              <div id="page-root" class="space-y-6"></div>
            </div>
          </section>
        </main>
      </div>
    `;
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });
  }

  function renderTaskLibraryPage() {
    setPage("task-library", renderTaskLibraryPage);
    const categories = safeArray(readGlobal(window.taskCategories, typeof taskCategories !== "undefined" ? taskCategories : undefined));
    const templates = safeArray(readGlobal(window.taskTemplates, typeof taskTemplates !== "undefined" ? taskTemplates : undefined));
    pageShell("task-library", [
      { label: pageText.taskLibrary.stats.templates, value: templates.length },
      { label: pageText.taskLibrary.stats.categories, value: categories.length },
      { label: pageText.taskLibrary.stats.actions, value: pageText.taskLibrary.actionValue }
    ]);

    const stacks = resourceText.stacks[state.currentLang];
    document.getElementById("page-root").innerHTML = `
      <div class="grid gap-6 xl:grid-cols-[1.45fr,0.9fr]">
        <section>
          <div class="mb-4 grid gap-3 sm:grid-cols-[1fr,220px]">
            <input id="task-search" class="${fieldClass}" placeholder="${t(pageText.taskLibrary.searchPlaceholder)}">
            <select id="task-category" class="${fieldClass}">
              <option value="">${t(pageText.taskLibrary.allCategories)}</option>
              ${categories.map((item) => `<option value="${item.name}">${localizeTaskCategory(item.name)}</option>`).join("")}
            </select>
          </div>
          <div id="task-list" class="grid gap-4"></div>
        </section>
        <aside class="space-y-4">
          ${stacks.map((stack) => `<article class="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.94))] p-5"><div class="flex items-center justify-between gap-3"><h2 class="text-lg font-semibold text-white">${stack.name}</h2><span class="rounded-full border border-amber-300/18 bg-amber-500/10 px-3 py-1 text-xs text-amber-100/90">${stack.audience}</span></div><p class="mt-3 text-sm leading-6 text-slate-300">${stack.outcome}</p><ul class="mt-4 space-y-2 text-sm text-slate-300">${stack.items.map((item) => `<li class="rounded-2xl bg-amber-950/18 px-3 py-2 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.08)]">${item}</li>`).join("")}</ul></article>`).join("")}
        </aside>
      </div>
    `;

    const search = document.getElementById("task-search");
    const category = document.getElementById("task-category");
    const list = document.getElementById("task-list");

    function draw() {
      const q = search.value.trim().toLowerCase();
      const c = category.value;
      const result = templates.filter((item) => {
        const localized = localizeTaskTemplate(item);
        const haystack = `${localized.name} ${localized.description} ${localizeTaskCategory(item.category)}`.toLowerCase();
        return (!c || item.category === c) && haystack.includes(q);
      });
      list.innerHTML = result.map((item) => {
        const localized = localizeTaskTemplate(item);
    return `<article class="${cardSurfaceClass}"><div class="flex flex-wrap items-start justify-between gap-4"><div><div class="inline-flex rounded-full border border-amber-300/20 bg-amber-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100">${localizeTaskCategory(item.category)}</div><h3 class="mt-3 text-xl font-semibold text-white">${localized.name}</h3><p class="mt-2 text-sm leading-6 text-slate-300">${localized.description}</p></div><div class="text-right text-sm text-slate-400"><div>★ ${item.stars}</div><div class="mt-1">${item.usageCount} ${t(ui.common.uses)}</div></div></div><div class="mt-4 flex flex-wrap gap-2 text-xs text-slate-300"><span class="rounded-full border border-amber-300/14 bg-amber-500/8 px-3 py-1 text-amber-100/88">${item.preview && item.preview.estimatedTime ? localizeReadTime(item.preview.estimatedTime) : t(pageText.taskLibrary.estimatedTimeFallback)}</span><span class="rounded-full border border-amber-300/12 bg-amber-950/18 px-3 py-1 text-amber-50/80">${t(pageText.taskLibrary.reusableHint)}</span></div><div class="mt-5 flex flex-wrap gap-3"><button data-toggle-preview="${item.id}" aria-expanded="false" class="${buttonSecondaryClass} hover:border-orange-400/40">${t(pageText.taskLibrary.previewButton)}</button><button data-copy="${item.id}" class="rounded-full bg-orange-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-orange-400">${t(pageText.taskLibrary.copyButton)}</button></div><div id="preview-${item.id}" class="mt-4 hidden overflow-hidden rounded-2xl border border-amber-300/10 bg-slate-950/90"><div class="border-b border-amber-300/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-amber-100/70">${t(pageText.taskLibrary.previewTitle)}</div><pre class="max-h-80 overflow-auto px-4 py-4 text-sm leading-6 text-slate-300">${escapeHtml(item.copyFormat)}</pre></div></article>`;
      }).join("") || `<div class="rounded-3xl border border-dashed border-white/10 p-10 text-center text-slate-400">${t(pageText.taskLibrary.empty)}</div>`;
    }

    list.addEventListener("click", (event) => {
      const previewButton = event.target.closest("[data-toggle-preview]");
      if (previewButton) {
        const previewId = previewButton.dataset.togglePreview;
        const preview = document.getElementById(`preview-${previewId}`);
      if (!preview) return;
      const isHidden = preview.classList.contains("hidden");
      preview.classList.toggle("hidden", !isHidden);
      previewButton.setAttribute("aria-expanded", isHidden ? "true" : "false");
      previewButton.textContent = isHidden ? t(pageText.taskLibrary.collapseButton) : t(pageText.taskLibrary.previewButton);
      if (isHidden) {
        track("template_preview", { template_id: previewId, lang: state.currentLang });
      }
      return;
    }

      const button = event.target.closest("[data-copy]");
      if (!button) return;
      const item = templates.find((entry) => entry.id === button.dataset.copy);
      if (!item) return;
      copyToClipboard(item.copyFormat, t(ui.common.copied));
      track("template_copy", { template_id: item.id, category: item.category, lang: state.currentLang });
    });

    search.addEventListener("input", draw);
    category.addEventListener("change", draw);
    draw();
  }

  function renderWorkflowPage() {
    window.location.replace("/pages/task-library.html");
  }

  function renderTutorialPage() {
    setPage("tutorials", renderTutorialPage);
    const categories = safeArray(readGlobal(window.tutorialCategories, typeof tutorialCategories !== "undefined" ? tutorialCategories : undefined));
    const items = safeArray(readGlobal(window.tutorials, typeof tutorials !== "undefined" ? tutorials : undefined));
    pageShell("tutorials", [
      { label: pageText.tutorial.stats.total, value: items.length },
      { label: pageText.tutorial.stats.categories, value: categories.length },
      { label: pageText.tutorial.stats.actions, value: pageText.tutorial.actionValue }
    ]);
    document.getElementById("page-root").innerHTML = `
      <div class="grid gap-6 xl:grid-cols-[0.82fr,1.18fr]">
        <section class="space-y-4">
          <div class="${searchShellClass}"><select id="tutorial-category" class="${fieldClass}"><option value="">${t(pageText.tutorial.allCategories)}</option>${categories.map((item) => `<option value="${item.name}">${localizeTutorialCategory(item)}</option>`).join("")}</select></div>
          <div id="tutorial-list" class="grid gap-4"></div>
        </section>
        <aside class="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <article class="${cardSurfaceClass}"><h2 id="tutorial-title" class="text-2xl font-semibold text-white">${t(pageText.tutorial.selectArticle)}</h2><div id="tutorial-meta" class="mt-3 text-sm text-emerald-100/72"></div><pre id="tutorial-preview" class="mt-5 min-h-[360px] max-h-[520px] overflow-auto whitespace-pre-wrap rounded-3xl border border-emerald-300/10 bg-slate-950/90 p-5 text-sm leading-7 text-slate-300"></pre></article>
          <article class="${cardSurfaceClass}"><h2 class="text-lg font-semibold text-white">${t(pageText.tutorial.troubleshooting)}</h2><div class="mt-4 space-y-3">${troubleshooting[state.currentLang].map((item) => `<details class="rounded-2xl border border-emerald-300/10 bg-emerald-950/12 p-4"><summary class="cursor-pointer text-sm font-medium text-white">${item.title}</summary><p class="mt-3 text-sm leading-6 text-slate-300">${item.diagnosis}</p></details>`).join("")}</div></article>
        </aside>
      </div>
    `;

    const category = document.getElementById("tutorial-category");
    const list = document.getElementById("tutorial-list");
    const title = document.getElementById("tutorial-title");
    const meta = document.getElementById("tutorial-meta");
    const preview = document.getElementById("tutorial-preview");

    function showTutorial(item) {
      title.textContent = localizeTutorialTitle(item);
      meta.textContent = `${localizeTutorialCategory({ id: item.id.split("-").slice(0, -1).join("-"), name: item.category })} · ${localizeTutorialDifficulty(item.difficulty)} · ${localizeReadTime(item.readTime)} · ${item.views} ${t(ui.common.views)}`;
      preview.textContent = localizeTutorialPreview(item);
      track("tutorial_view", { tutorial_id: item.id, lang: state.currentLang });
    }

    function draw() {
      const c = category.value;
      const result = items.filter((item) => !c || item.category === c || item.id.startsWith(String(c).split("-")[0]));
      list.innerHTML = result.map((item) => `<button data-open="${item.id}" class="${cardSurfaceClass} text-left transition hover:border-emerald-400/30 hover:bg-emerald-500/[0.04]"><div class="text-sm text-emerald-100/70">${localizeTutorialCategory({ id: item.id.split("-").slice(0, -1).join("-"), name: item.category })} · ${localizeTutorialDifficulty(item.difficulty)}</div><div class="mt-2 text-lg font-semibold text-white">${localizeTutorialTitle(item)}</div><div class="mt-2 text-sm text-slate-300">${localizeReadTime(item.readTime)} · ${item.views} ${t(ui.common.views)}</div></button>`).join("");
      if (result[0]) showTutorial(result[0]);
    }

    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-open]");
      if (!button) return;
      const item = items.find((entry) => entry.id === button.dataset.open);
      if (item) showTutorial(item);
    });
    category.addEventListener("change", draw);
    draw();
  }

  function renderCostCalculatorPage() {
    setPage("cost-calculator", renderCostCalculatorPage);
    const pricing = readGlobal(window.modelPricing, typeof modelPricing !== "undefined" ? modelPricing : undefined) || {};
    const presets = readGlobal(window.scenarioPresets, typeof scenarioPresets !== "undefined" ? scenarioPresets : undefined) || {};
    const calculate = typeof calculateCost === "function" ? calculateCost : (typeof window.calculateCost === "function" ? window.calculateCost : null);
    const compare = typeof compareModels === "function" ? compareModels : (typeof window.compareModels === "function" ? window.compareModels : null);
    const suggestionsFn = typeof getOptimizationSuggestions === "function" ? getOptimizationSuggestions : (typeof window.getOptimizationSuggestions === "function" ? window.getOptimizationSuggestions : null);
    const presetNames = {
      light: { zh: "轻度使用", en: "Light Usage" },
      office: { zh: "日常办公", en: "Office Routine" },
      dev: { zh: "开发辅助", en: "Dev Support" },
      browser: { zh: "浏览器自动化", en: "Browser Automation" },
      heavy: { zh: "重度运行", en: "Heavy Runtime" }
    };
    pageShell("cost-calculator", [
      { label: pageText.cost.stats.models, value: Object.keys(pricing).length },
      { label: pageText.cost.stats.presets, value: Object.keys(presets).length },
      { label: pageText.cost.stats.actions, value: pageText.cost.actionValue }
    ]);
    document.getElementById("page-root").innerHTML = `
      <div class="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <form id="cost-form" class="${cardSurfaceClass}">
          <div class="grid gap-4">
            <div><label class="mb-2 block text-sm text-slate-300">${t(pageText.cost.scenario)}</label><select id="scenario" class="${fieldClass}">${Object.keys(presets).map((key) => `<option value="${key}">${t(presetNames[key] || { zh: key, en: key })}</option>`).join("")}</select></div>
            <div><label class="mb-2 block text-sm text-slate-300">${t(pageText.cost.model)}</label><select id="model" class="${fieldClass}">${Object.entries(pricing).map(([key, value]) => `<option value="${key}">${value.name}</option>`).join("")}</select></div>
            <div class="grid gap-4 sm:grid-cols-2"><div><label class="mb-2 block text-sm text-slate-300">${t(pageText.cost.dailyTasks)}</label><input id="dailyTasks" type="number" min="1" class="${fieldClass}"></div><div><label class="mb-2 block text-sm text-slate-300">${t(pageText.cost.stepsPerTask)}</label><input id="stepsPerTask" type="number" min="1" class="${fieldClass}"></div></div>
            <div class="flex flex-wrap gap-3"><button class="rounded-full bg-orange-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-orange-400" type="submit">${t(pageText.cost.calcButton)}</button><button id="copy-cost-summary" class="${buttonSecondaryClass}" type="button">${t(pageText.cost.copySummary)}</button></div>
          </div>
        </form>
        <div class="grid gap-4"><article id="cost-summary" class="${cardSurfaceClass}"></article><article id="cost-compare" class="${cardSurfaceClass}"></article><article id="cost-suggestions" class="${cardSurfaceClass}"></article></div>
      </div>
    `;

    const form = document.getElementById("cost-form");
    const scenario = document.getElementById("scenario");
    const model = document.getElementById("model");
    const dailyTasks = document.getElementById("dailyTasks");
    const stepsPerTask = document.getElementById("stepsPerTask");
    const summary = document.getElementById("cost-summary");
    const compareBox = document.getElementById("cost-compare");
    const suggestions = document.getElementById("cost-suggestions");

    function applyPreset() {
      const preset = presets[scenario.value];
      if (!preset) return;
      dailyTasks.value = preset.dailyTasks;
      stepsPerTask.value = preset.stepsPerTask;
    }

    function renderResult() {
      if (!calculate || !compare || !suggestionsFn) {
        summary.innerHTML = `<h2 class="text-lg font-semibold text-white">${t(pageText.cost.summary)}</h2><p class="mt-3 text-sm text-slate-300">${t(pageText.cost.missing)}</p>`;
        compareBox.innerHTML = "";
        suggestions.innerHTML = "";
        return null;
      }
      const result = calculate(model.value, Number(dailyTasks.value), Number(stepsPerTask.value));
      if (!result) return null;
      const compares = compare(Number(dailyTasks.value), Number(stepsPerTask.value), model.value).slice(0, 4);
      const optimization = suggestionsFn(model.value, Number(dailyTasks.value), Number(stepsPerTask.value));
      const selectedModel = pricing[model.value];
      summary.innerHTML = `<h2 class="text-lg font-semibold text-white">${t(pageText.cost.summary)}</h2><div class="mt-4 grid gap-4 sm:grid-cols-2"><div class="rounded-2xl bg-slate-950/70 p-4"><div class="text-sm text-slate-400">${t(pageText.cost.currentModel)}</div><div class="mt-2 text-xl font-semibold text-white">${selectedModel.name}</div></div><div class="rounded-2xl bg-slate-950/70 p-4"><div class="text-sm text-slate-400">${t(pageText.cost.risk)}</div><div class="mt-2 text-xl font-semibold text-white">${warningText(result.warning.level)}</div></div><div class="rounded-2xl bg-slate-950/70 p-4"><div class="text-sm text-slate-400">${t(pageText.cost.daily)}</div><div class="mt-2 text-xl font-semibold text-white">${formatCurrency(result.daily)}</div></div><div class="rounded-2xl bg-slate-950/70 p-4"><div class="text-sm text-slate-400">${t(pageText.cost.monthly)}</div><div class="mt-2 text-xl font-semibold text-white">${formatCurrency(result.monthly)}</div></div></div>`;
      compareBox.innerHTML = `<h2 class="text-lg font-semibold text-white">${t(pageText.cost.comparison)}</h2><div class="mt-4 grid gap-3">${compares.map((entry) => `<div class="rounded-2xl border ${entry.isSelected ? "border-orange-400/40" : "border-white/10"} bg-slate-950/70 p-4"><div class="flex items-center justify-between gap-3"><div><div class="font-medium text-white">${entry.model.name}</div><div class="mt-1 text-sm text-slate-400">${t(pageText.cost.monthly)} ${formatCurrency(entry.cost.monthly)}</div></div>${entry.isSelected ? `<span class="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-slate-950">${t(ui.common.selected)}</span>` : ""}</div></div>`).join("")}</div>`;
      suggestions.innerHTML = `<h2 class="text-lg font-semibold text-white">${t(pageText.cost.suggestions)}</h2><div class="mt-4 space-y-3">${optimization.length ? optimization.map((entry) => `<div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4"><div class="font-medium text-white">${entry.model.name}</div><div class="mt-1 text-sm text-slate-300">${state.currentLang === "zh" ? `预计每月节省 ${formatCurrency(entry.savings)}` : `Save about ${formatCurrency(entry.savings)} per month`}</div></div>`).join("") : `<div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">${t(pageText.cost.balanced)}</div>`}</div>`;
      return { result, selectedModel };
    }

    let currentSummary = null;
    scenario.addEventListener("change", () => { applyPreset(); currentSummary = renderResult(); });
    form.addEventListener("submit", (event) => { event.preventDefault(); currentSummary = renderResult(); track("calculate_cost", { model: model.value, lang: state.currentLang }); });
    document.getElementById("copy-cost-summary").addEventListener("click", () => {
      if (!currentSummary) currentSummary = renderResult();
      if (!currentSummary) return;
      const text = `${t(pageText.cost.model)}: ${currentSummary.selectedModel.name}\n${t(pageText.cost.dailyTasks)}: ${dailyTasks.value}\n${t(pageText.cost.stepsPerTask)}: ${stepsPerTask.value}\n${t(pageText.cost.daily)}: ${formatCurrency(currentSummary.result.daily)}\n${t(pageText.cost.monthly)}: ${formatCurrency(currentSummary.result.monthly)}`;
      copyToClipboard(text, t(ui.common.copied));
    });
    applyPreset();
    currentSummary = renderResult();
  }

  function renderToolsPage() {
    window.location.replace("/pages/command-center.html");
    return;
    setPage("tools", renderToolsPage);
    const pricing = readGlobal(window.modelPricing, typeof modelPricing !== "undefined" ? modelPricing : undefined) || {};
    pageShell("tools", [
      { label: pageText.tools.stats.total, value: 3 },
      { label: pageText.tools.stats.target, value: pageText.tools.targetValue },
      { label: pageText.tools.stats.actions, value: pageText.tools.actionValue }
    ]);
    document.getElementById("page-root").innerHTML = `
      <div class="grid gap-6 xl:grid-cols-3">
        <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><h2 class="text-lg font-semibold text-white">${t(pageText.tools.promptTitle)}</h2><textarea id="prompt-input" class="mt-4 h-44 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-orange-400" placeholder="${t(pageText.tools.promptPlaceholder)}"></textarea><button id="optimize-prompt" class="mt-4 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-slate-950">${t(pageText.tools.promptButton)}</button><pre id="prompt-output" class="mt-4 min-h-40 whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/90 p-4 text-sm leading-6 text-slate-300"></pre></article>
        <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><h2 class="text-lg font-semibold text-white">${t(pageText.tools.configTitle)}</h2><div class="mt-4 grid gap-3"><input id="cfg-name" class="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100" value="my-openclaw"><select id="cfg-model" class="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100">${Object.entries(pricing).map(([key, value]) => `<option value="${key}">${value.name}</option>`).join("")}</select><input id="cfg-token" type="number" class="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100" value="4000"><button id="generate-config" class="rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950">${t(pageText.tools.configButton)}</button></div><pre id="config-output" class="mt-4 min-h-40 whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/90 p-4 text-sm leading-6 text-slate-300"></pre></article>
        <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><h2 class="text-lg font-semibold text-white">${t(pageText.tools.errorTitle)}</h2><textarea id="error-input" class="mt-4 h-44 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none focus:border-orange-400" placeholder="${t(pageText.tools.errorPlaceholder)}"></textarea><button id="analyze-error" class="mt-4 rounded-full bg-sky-400 px-4 py-2 text-sm font-medium text-slate-950">${t(pageText.tools.errorButton)}</button><div id="error-output" class="mt-4 min-h-40 rounded-2xl border border-white/10 bg-slate-950/90 p-4 text-sm leading-6 text-slate-300"></div></article>
      </div>
    `;
    document.getElementById("optimize-prompt").addEventListener("click", () => {
      const original = document.getElementById("prompt-input").value.trim();
      if (!original) return showToast(t(pageText.tools.promptToast));
      document.getElementById("prompt-output").textContent = state.currentLang === "zh"
        ? `你是一个高可靠的 OpenClaw 执行代理。\n\n任务目标：\n${original}\n\n输出要求：\n1. 先总结任务意图。\n2. 再给出步骤化执行计划。\n3. 如果输入信息不足，明确列出缺失项。\n4. 最后输出结构化结果。`
        : `You are a reliable OpenClaw execution agent.\n\nGoal:\n${original}\n\nOutput rules:\n1. Summarize the task intent first.\n2. Produce a step-by-step execution plan.\n3. List missing information if the input is incomplete.\n4. Return a structured result at the end.`;
    });
    document.getElementById("generate-config").addEventListener("click", () => {
      document.getElementById("config-output").textContent = `name: ${document.getElementById("cfg-name").value || "my-openclaw"}\nmodel: ${document.getElementById("cfg-model").value}\napi_key: your-api-key-here\nmax_tokens: ${document.getElementById("cfg-token").value || 4000}\nheartbeat:\n  enabled: true\n  interval: 60\ntools:\n  - browser\n  - search\n  - code_interpreter`;
    });
    document.getElementById("analyze-error").addEventListener("click", () => {
      const content = document.getElementById("error-input").value.toLowerCase();
      const output = document.getElementById("error-output");
      if (content.includes("401") || content.includes("api key")) {
        output.innerHTML = state.currentLang === "zh"
          ? `<div class="font-medium text-white">API Key 无效或未加载</div><p class="mt-2">检查配置文件中的空格、引号，以及环境变量的绑定方式。</p>`
          : `<div class="font-medium text-white">API key is invalid or missing</div><p class="mt-2">Check whitespace, quotes, and how the key is loaded into the environment.</p>`;
        return;
      }
      output.innerHTML = `<div class="font-medium text-white">${t(pageText.tools.errorFallbackTitle)}</div><p class="mt-2">${t(pageText.tools.errorFallbackBody)}</p>`;
    });
  }

  function renderCommunityPage() {
    setPage("community", renderCommunityPage);
    const cases = safeArray(readGlobal(window.showcaseCases, typeof showcaseCases !== "undefined" ? showcaseCases : undefined)).slice(0, 6);
    const channels = communityChannels[state.currentLang];
    pageShell("community", [
      { label: pageText.community.stats.showcase, value: cases.length },
      { label: pageText.community.stats.channels, value: channels.length },
      { label: pageText.community.stats.actions, value: pageText.community.actionValue }
    ]);
    document.getElementById("page-root").innerHTML = `<div class="grid gap-6 lg:grid-cols-[1.2fr,0.9fr]"><section class="grid gap-4">${cases.map((item) => `<article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><div class="flex flex-wrap items-start justify-between gap-4"><div><div class="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sky-200">${localizeShowcaseCategory(item.category)}</div><h2 class="mt-3 text-xl font-semibold text-white">${item.title}</h2><p class="mt-2 text-sm leading-6 text-slate-300">${state.currentLang === "zh" ? "一个真实的 OpenClaw 社区案例，展示从搭建到运行的实际落地方式。" : "A real community build using OpenClaw in a practical scenario."}</p></div><div class="text-right text-sm text-slate-400"><div>★ ${item.stars}</div><div class="mt-1">${item.usage} ${t(ui.common.uses)}</div></div></div><div class="mt-4 text-sm text-slate-400">${state.currentLang === "zh" ? `作者：${localizeShowcaseAuthor(item.author)} · 难度：${localizeShowcaseDifficulty(item.difficulty)} · 预计时间：${localizeReadTime(item.estimatedTime)}` : `Author: ${localizeShowcaseAuthor(item.author)} · Difficulty: ${localizeShowcaseDifficulty(item.difficulty)} · ETA: ${localizeReadTime(item.estimatedTime)}`}</div><div class="mt-4 flex flex-wrap gap-2">${safeArray(item.tags).slice(0, 5).map((tag) => `<span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">${localizeWorkflowTag(tag)}</span>`).join("")}</div></article>`).join("")}</section><aside class="space-y-4"><article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><h2 class="text-lg font-semibold text-white">${t(pageText.community.waysTitle)}</h2><div class="mt-4 space-y-3">${channels.map((item) => `<div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4"><div class="font-medium text-white">${item.name}</div><p class="mt-2 text-sm leading-6 text-slate-300">${item.description}</p><div class="mt-2 text-xs uppercase tracking-[0.2em] text-orange-200">${item.action}</div></div>`).join("")}</div></article><article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5"><h2 class="text-lg font-semibold text-white">${t(pageText.community.tipsTitle)}</h2><ul class="mt-4 space-y-3 text-sm leading-6 text-slate-300">${pageText.community.tips[state.currentLang].map((item) => `<li>${item}</li>`).join("")}</ul></article></aside></div>`;
  }

  function renderQuickStartPage() {
    setPage("quickstart", renderQuickStartPage);
    const tracks = safeArray(readGlobal(window.quickStartTracks, typeof quickStartTracks !== "undefined" ? quickStartTracks : undefined));
    pageShell("quickstart", [
      { label: pageText.quickstart.stats.envs, value: tracks.length },
      { label: pageText.quickstart.stats.checks, value: resourceText.checklist[state.currentLang].length },
      { label: pageText.quickstart.stats.goal, value: pageText.quickstart.goalValue }
    ]);
    document.getElementById("page-root").innerHTML = `<div class="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]"><section class="space-y-4"><div class="flex flex-wrap gap-3">${tracks.map((track) => `<button data-track="${track.id}" class="quickstart-tab rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-orange-400/40">${track.name}</button>`).join("")}</div><article id="quickstart-panel" class="${cardSurfaceClass}"></article><article class="${cardSurfaceClass}"><h2 class="text-lg font-semibold text-white">${t(pageText.quickstart.stacksTitle)}</h2><div class="mt-4 grid gap-3 md:grid-cols-3">${resourceText.stacks[state.currentLang].map((stack) => `<div class="${insetPanelClass} p-4"><div class="font-medium text-white">${stack.name}</div><div class="mt-2 text-sm text-slate-300">${stack.outcome}</div></div>`).join("")}</div></article></section><aside class="space-y-4 xl:sticky xl:top-24 xl:self-start"><article class="${cardSurfaceClass}"><h2 class="text-lg font-semibold text-white">${t(pageText.quickstart.checklistTitle)}</h2><div id="quickstart-checklist" class="mt-4 space-y-3"></div></article><article class="${cardSurfaceClass}"><h2 class="text-lg font-semibold text-white">${t(pageText.quickstart.nextTitle)}</h2><ul class="mt-4 space-y-3 text-sm leading-6 text-slate-300">${pageText.quickstart.nextList[state.currentLang].map((item) => `<li>${item}</li>`).join("")}</ul></article></aside></div>`;
    const panel = document.getElementById("quickstart-panel");
    const checklistRoot = document.getElementById("quickstart-checklist");
    function renderTrack() {
      const current = tracks.find((item) => item.id === state.quickStartTrack) || tracks[0];
      const localized = resourceText.quickStartTracks[current.id] || resourceText.quickStartTracks.windows;
      panel.innerHTML = `<div class="flex flex-wrap items-start justify-between gap-4"><div><span class="rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-orange-200">${t(localized.badge)}</span><h2 class="mt-3 text-2xl font-semibold text-white">${current.name}</h2></div><button id="copy-quickstart-command" class="rounded-full bg-orange-500 px-4 py-2.5 text-sm font-medium text-slate-950">${t(pageText.quickstart.copyCommand)}</button></div><div class="mt-4 grid gap-4 2xl:grid-cols-[1.1fr,0.9fr]"><pre class="whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/90 p-4 text-sm leading-6 text-slate-300">${current.command}</pre><ul class="space-y-3 text-sm leading-6 text-slate-300">${localized.notes[state.currentLang].map((item) => `<li class="${insetPanelClass} px-3 py-3">${item}</li>`).join("")}</ul></div>`;
      document.querySelectorAll(".quickstart-tab").forEach((button) => {
        button.className = `quickstart-tab rounded-full border px-4 py-2.5 text-sm transition ${button.dataset.track === current.id ? "border-orange-400/40 bg-orange-500 text-slate-950" : "border-white/10 bg-white/5 text-slate-200 hover:border-orange-400/40 hover:text-white"}`;
      });
      document.getElementById("copy-quickstart-command").addEventListener("click", () => {
        copyToClipboard(current.command, t(ui.common.copied));
        track("quickstart_copy_command", { track: current.id, lang: state.currentLang });
      });
    }
    function renderChecklist() {
      const stored = getStoredChecklist();
      checklistRoot.innerHTML = resourceText.checklist[state.currentLang].map((item, index) => `<label class="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/72 px-4 py-3"><input data-check="${index}" type="checkbox" class="mt-1 h-4 w-4 accent-orange-400" ${stored[index] ? "checked" : ""}><span class="text-sm leading-6 text-slate-300">${item}</span></label>`).join("");
    }
    document.getElementById("page-root").addEventListener("click", (event) => {
      const button = event.target.closest("[data-track]");
      if (!button) return;
      state.quickStartTrack = button.dataset.track;
      renderTrack();
    });
    checklistRoot.addEventListener("change", (event) => {
      const input = event.target.closest("[data-check]");
      if (!input) return;
      const stored = getStoredChecklist();
      stored[input.dataset.check] = input.checked;
      setStoredChecklist(stored);
    });
    renderTrack();
    renderChecklist();
  }

  function renderCommandCenterPage() {
    setPage("command-center", renderCommandCenterPage);
    const sections = commandSections[state.currentLang];
    pageShell("command-center", [
      { label: pageText.command.stats.groups, value: sections.length },
      { label: pageText.command.stats.focus, value: pageText.command.focusValue },
      { label: pageText.command.stats.actions, value: pageText.command.actionValue }
    ]);
    document.getElementById("page-root").innerHTML = `<div class="space-y-4"><div class="${searchShellClass}"><input id="command-search" class="${fieldClassOrange}" placeholder="${t(pageText.command.searchPlaceholder)}"></div><section id="command-sections" class="grid gap-4 xl:grid-cols-2"></section></div>`;
    const input = document.getElementById("command-search");
    const commandRoot = document.getElementById("command-sections");
    function draw() {
      const q = input.value.trim().toLowerCase();
      const cmdList = sections.filter((section) => `${section.title} ${section.description} ${section.commands.map((item) => `${item.label} ${item.code}`).join(" ")}`.toLowerCase().includes(q));
      commandRoot.innerHTML = cmdList.map((section) => `<article class="${cardSurfaceClass}"><h2 class="text-lg font-semibold text-white">${section.title}</h2><p class="mt-2 text-sm leading-6 text-slate-300">${section.description}</p><div class="mt-4 space-y-3">${section.commands.map((item) => `<div class="${commandSnippetShellClass}"><div class="flex items-start justify-between gap-3"><div class="min-w-0 flex-1"><div class="inline-flex rounded-full bg-cyan-950/22 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-cyan-100/70 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.08)]">${item.label}</div><div class="mt-2 flex items-start gap-2"><span class="mt-0.5 text-cyan-200/75">&gt;</span><code class="${commandSnippetCodeClass}">${item.code}</code></div></div><button data-copy-code="${encodeURIComponent(item.code)}" class="rounded-full bg-cyan-950/18 px-3 py-1 text-xs text-cyan-50/78 transition hover:bg-cyan-900/30 hover:text-white">${t(ui.common.copy)}</button></div></div>`).join("")}</div></article>`).join("");
    }
    document.getElementById("page-root").addEventListener("click", (event) => {
      const button = event.target.closest("[data-copy-code]");
      if (!button) return;
      copyToClipboard(decodeURIComponent(button.dataset.copyCode), t(ui.common.copied));
      track("command_copy", { lang: state.currentLang });
    });
    input.addEventListener("input", draw);
    draw();
  }

  function renderTroubleshootingPage() {
    setPage("troubleshooting", renderTroubleshootingPage);
    const issues = troubleshooting[state.currentLang];
    const type = getTypeScale();
    const bodyClass = type.body;
    const compactBodyClass = type.compactBody;
    pageShell("troubleshooting", [
      { label: pageText.troubleshooting.stats.issues, value: issues.length },
      { label: pageText.troubleshooting.stats.fixes, value: 6 },
      { label: pageText.troubleshooting.stats.actions, value: pageText.troubleshooting.actionValue }
    ]);
    const issueIntro = state.currentLang === "zh"
      ? "先按现象判断问题落在哪一层，再决定要不要继续下钻。"
      : "Start by mapping the symptom to a layer before you go deeper.";
    const issueTitle = state.currentLang === "zh" ? "高频症状" : "Common Failure Signals";
    document.getElementById("page-root").innerHTML = `<div class="space-y-6"><div class="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(15,23,42,0.68))] p-4 shadow-2xl shadow-slate-950/20"><div class="mb-3 inline-flex rounded-full border border-rose-300/15 bg-rose-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-rose-100/80">${t(pageText.troubleshooting.stats.actions)}</div><input id="troubleshooting-search" class="${fieldClass}" placeholder="${t(pageText.troubleshooting.searchPlaceholder)}"></div><div class="grid gap-6 xl:grid-cols-[320px,minmax(0,1fr)] xl:items-start"><aside class="space-y-5 xl:sticky xl:top-24"><article class="overflow-hidden rounded-[30px] border border-red-400/20 bg-[linear-gradient(180deg,rgba(127,29,29,0.24),rgba(15,23,42,0.92))] p-5 shadow-2xl shadow-red-950/15"><div class="inline-flex rounded-full border border-red-300/20 bg-red-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-red-100">${t(ui.nav.troubleshooting)}</div><h2 class="mt-4 ${type.cardTitle} text-white">${t(pageText.troubleshooting.ladderTitle)}</h2><ol class="mt-4 space-y-3">${pageText.troubleshooting.ladder[state.currentLang].map((item, index) => `<li class="grid grid-cols-[34px,1fr] items-start gap-3 rounded-2xl bg-slate-950/60 px-4 py-4"><span class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-400/25 bg-red-500/10 text-xs font-semibold text-red-100">${index + 1}</span><span class="${compactBodyClass} text-slate-200">${item}</span></li>`).join("")}</ol></article><article class="${cardSurfaceClass}"><h2 class="${type.cardTitle} text-white">${t(pageText.troubleshooting.escalationTitle)}</h2><p class="mt-4 ${bodyClass} text-slate-300">${t(pageText.troubleshooting.escalationBody)}</p><div class="mt-5 flex flex-wrap gap-3"><a href="/pages/command-center.html" class="${buttonPrimaryClass}">${t(ui.nav["command-center"])}</a><a href="/pages/quickstart.html" class="${buttonSecondaryClass}">${t(ui.nav.quickstart)}</a></div></article></aside><section class="space-y-6"><section class="${cardSurfaceClass}"><div class="flex flex-wrap items-end justify-between gap-4"><div><p class="text-xs uppercase tracking-[0.28em] text-rose-200/80">${t(pageText.troubleshooting.stats.issues)}</p><div class="mt-3 flex flex-wrap items-center gap-3"><h2 class="${type.sectionTitle} text-white">${issueTitle}</h2><span class="rounded-full border border-rose-300/15 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-100">${issues.length}</span></div></div><p class="max-w-2xl ${bodyClass} text-slate-300">${issueIntro}</p></div><div id="troubleshooting-sections" class="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3"></div></section><section id="troubleshooting-extra-root" class="space-y-6"></section></section></div></div>`;
    const input = document.getElementById("troubleshooting-search");
    const issueRoot = document.getElementById("troubleshooting-sections");
    function draw() {
      const q = input.value.trim().toLowerCase();
      const issueList = issues.filter((item) => `${item.title} ${item.symptoms} ${item.diagnosis} ${item.fix.join(" ")}`.toLowerCase().includes(q));
      issueRoot.innerHTML = issueList.length ? issueList.map((item) => `<article class="flex h-full min-h-[272px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] p-5 shadow-lg shadow-slate-950/10"><div class="flex flex-wrap items-start justify-between gap-3"><h3 class="max-w-[14rem] ${type.cardTitle} leading-7 text-white">${item.title}</h3><span class="rounded-full border border-rose-300/15 bg-rose-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-rose-100">${item.symptoms}</span></div><p class="mt-4 min-h-[64px] ${bodyClass} text-slate-300">${item.diagnosis}</p><div class="mt-auto space-y-2 pt-5">${item.fix.map((step, index) => `<div class="grid grid-cols-[26px,1fr] items-start gap-3 rounded-2xl border border-rose-300/8 bg-rose-950/12 px-3 py-3 ${compactBodyClass} text-slate-200"><span class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-rose-400/20 bg-rose-500/10 text-[11px] font-semibold text-rose-100">${index + 1}</span><span>${step}</span></div>`).join("")}</div></article>`).join("") : `<article class="rounded-[28px] border border-dashed border-rose-300/12 bg-rose-950/12 p-6 ${bodyClass} text-slate-300 md:col-span-2 2xl:col-span-3">${t(ui.common.noResult)}</article>`;
    }
    input.addEventListener("input", draw);
    draw();
  }

  function renderReleaseNotesPage() {
    setPage("release-notes", renderReleaseNotesPage);
    const notes = releaseNotes[state.currentLang];
    const roadmap = roadmapItems[state.currentLang];
    const type = getTypeScale();
    const timelineLabel = state.currentLang === "zh" ? "版本时间线" : "Release Timeline";
    const latestBadge = "Latest";
    const latestSummary = state.currentLang === "zh"
      ? "当前可公开访问版本的上线基线。"
      : "The launch baseline for the current public version.";
    const sprintSummary = state.currentLang === "zh"
      ? "这一轮迭代完成的核心更新。"
      : "Core updates completed in this iteration.";

    pageShell("release-notes", [
      { label: pageText.release.stats.rounds, value: notes.length },
      { label: pageText.release.stats.roadmap, value: roadmap.length },
      { label: pageText.release.stats.status, value: pageText.release.statusValue }
    ]);

    document.getElementById("page-root").innerHTML = `
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)] xl:items-start">
        <section class="relative rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.88))] p-5 shadow-2xl shadow-slate-950/20 sm:p-6">
          <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.32em] text-red-200/80">Timeline</p>
              <h2 class="mt-3 ${type.sectionTitle} text-white">${timelineLabel}</h2>
            </div>
            <div class="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-200">
              ${t(pageText.release.stats.status)} · ${t(pageText.release.statusValue)}
            </div>
          </div>
          <div class="relative pl-0 lg:pl-8">
            <div class="pointer-events-none absolute bottom-0 left-3 top-2 hidden w-px bg-[linear-gradient(180deg,rgba(248,113,113,0.6),rgba(148,163,184,0.05))] lg:block"></div>
            <div class="space-y-4">
              ${notes.map((item, index) => `
                <article class="relative overflow-hidden rounded-[28px] border ${index === 0 ? "border-red-400/30 bg-[linear-gradient(135deg,rgba(127,29,29,0.28),rgba(15,23,42,0.9))]" : "border-white/10 bg-white/[0.03]"} p-5 lg:ml-8">
                  <div class="absolute left-[-2.55rem] top-8 hidden h-4 w-4 rounded-full border border-red-300/50 bg-red-400 shadow-[0_0_0_6px_rgba(248,113,113,0.12)] lg:block"></div>
                  <div class="flex flex-wrap items-start justify-between gap-3">
                    <div class="min-w-0">
                      <div class="flex flex-wrap items-center gap-3">
                        <h3 class="${type.cardTitle} text-white">${item.version}</h3>
                        ${index === 0 ? `<span class="rounded-full border border-red-300/30 bg-red-500/15 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-red-100">${latestBadge}</span>` : ""}
                      </div>
                      <p class="mt-2 ${type.meta} text-slate-400">${index === 0 ? latestSummary : sprintSummary}</p>
                    </div>
                    <span class="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs text-slate-300">${item.date}</span>
                  </div>
                  <div class="mt-5 grid gap-3">
                    ${item.highlights.map((highlight, highlightIndex) => `
                      <div class="rounded-2xl border ${index === 0 && highlightIndex === 0 ? "border-red-400/20 bg-red-500/10" : "border-white/10 bg-slate-950/70"} px-4 py-3 ${type.compactBody} text-slate-200">
                        ${highlight}
                      </div>
                    `).join("")}
                  </div>
                </article>
              `).join("")}
            </div>
          </div>
        </section>
        <aside class="space-y-4">
          <article class="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.88))] p-5">
            <div class="flex items-center justify-between gap-3">
              <h2 class="${type.cardTitle} text-white">${t(pageText.release.nextTitle)}</h2>
              <span class="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">${roadmap.length}</span>
            </div>
            <div class="mt-4 space-y-3">
              ${roadmap.map((item, index) => `
                <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div class="flex items-start gap-3">
                    <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-medium text-slate-300">${index + 1}</span>
                    <p class="${type.compactBody} text-slate-300">${item}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </article>
          <article class="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.88))] p-5">
            <h2 class="${type.cardTitle} text-white">${t(pageText.release.ideaTitle)}</h2>
            <p class="mt-3 ${type.body} text-slate-300">${t(pageText.release.ideaBody)}</p>
          </article>
        </aside>
      </div>
    `;
  }

  window.modulePages = {
    renderTaskLibraryPage,
    renderWorkflowPage,
    renderTutorialPage,
    renderCostCalculatorPage,
    renderToolsPage,
    renderCommunityPage,
    renderQuickStartPage,
    renderCommandCenterPage,
    renderTroubleshootingPage,
    renderReleaseNotesPage
  };
})();
