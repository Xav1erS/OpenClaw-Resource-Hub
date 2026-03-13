const quickStartTracks = [
  {
    id: "windows",
    name: "Windows",
    badge: "本地试跑",
    command: `winget install OpenJS.NodeJS.LTS
npm install -g @openclaw/cli
openclaw init
openclaw doctor`,
    notes: [
      "优先使用 Node.js 18 或 20 LTS。",
      "首次运行先执行 openclaw doctor，避免权限和 PATH 问题。",
      "如果要长期运行，先从单 Agent 配置开始。"
    ]
  },
  {
    id: "macos",
    name: "macOS",
    badge: "最快上手",
    command: `brew install node
npm install -g @openclaw/cli
openclaw init
openclaw start`,
    notes: [
      "建议把 API Key 放到 .env 或系统 Keychain，不要写死在仓库里。",
      "Apple Silicon 机器优先用轻量模型做 smoke test。"
    ]
  },
  {
    id: "linux",
    name: "Linux / Raspberry Pi",
    badge: "长期运行",
    command: `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g @openclaw/cli
openclaw init
openclaw start`,
    notes: [
      "长期运行建议配合 systemd 和日志轮转。",
      "树莓派优先从 Claude Haiku 或 GPT-4o Mini 开始，先控成本。"
    ]
  }
];

const quickStartChecklist = [
  "安装 Node.js 18+",
  "准备一个可用的模型 API Key",
  "执行 openclaw init 生成配置",
  "先用轻量模型做一次 smoke test",
  "打开日志和成本监控"
];

const starterStacks = [
  {
    name: "内容工作台",
    audience: "运营 / 内容团队",
    items: ["爆款选题模板", "SEO Brief Agent", "会议纪要 Agent"],
    outcome: "1 小时内搭出一个可复用的内容产出链路"
  },
  {
    name: "自动化客服台",
    audience: "客服 / 社区运营",
    items: ["客服工单分流", "常见错误诊断", "升级工单模板"],
    outcome: "先把重复咨询自动分类，再考虑真正接客服系统"
  },
  {
    name: "独立开发包",
    audience: "开发者 / Indie Hacker",
    items: ["PRD 审查", "Bug 分级", "发布说明模板"],
    outcome: "减少需求模糊和 issue 分流的人工成本"
  }
];

const commandSections = [
  {
    title: "CLI 启动",
    description: "最常用的本地初始化和排错命令。",
    commands: [
      { label: "初始化项目", code: "openclaw init" },
      { label: "启动服务", code: "openclaw start" },
      { label: "环境体检", code: "openclaw doctor" },
      { label: "查看版本", code: "openclaw --version" }
    ]
  },
  {
    title: "配置片段",
    description: "当前阶段最值得保留的 YAML 片段。",
    commands: [
      { label: "轻量模型", code: "model: claude-haiku-4.6\nmax_steps: 24" },
      { label: "心跳配置", code: "heartbeat:\n  enabled: true\n  interval: 60" },
      { label: "日志输出", code: "logging:\n  level: info\n  file: openclaw.log" }
    ]
  },
  {
    title: "上线前检查",
    description: "避免最常见的首发事故。",
    commands: [
      { label: "检查端口", code: "netstat -ano | findstr 8080" },
      { label: "检查环境变量", code: "echo %OPENCLAW_API_KEY%" },
      { label: "检查日志", code: "type openclaw.log" }
    ]
  }
];

const troubleshootingItems = [
  {
    title: "API Key 无效或未加载",
    symptoms: ["启动时报 401", "模型调用立即失败"],
    diagnosis: "优先检查配置文件是否把换行、引号或空格一起带进去了。",
    fix: [
      "重新复制 API Key，避免尾部空格。",
      "把 Key 放进环境变量，再在配置里读取。",
      "先用最小配置做一次单步请求验证。"
    ]
  },
  {
    title: "请求频率过高",
    symptoms: ["429 rate limit", "批量任务间歇性失败"],
    diagnosis: "通常不是 OpenClaw 本身故障，而是并发或重试策略过猛。",
    fix: [
      "把批处理改成队列执行。",
      "降低 max_steps 或减少同时运行的 Agent 数量。",
      "高峰时段切到轻量模型。"
    ]
  },
  {
    title: "日志里出现 timeout",
    symptoms: ["步骤卡住", "浏览器工具返回慢"],
    diagnosis: "常见于网页抓取链路过长，或者模型输出太大。",
    fix: [
      "先缩短输入上下文。",
      "把一个长任务拆成两到三段。",
      "必要时限制每步输出格式。"
    ]
  },
  {
    title: "树莓派运行不稳定",
    symptoms: ["偶发崩溃", "服务自动退出", "内存占用拉满"],
    diagnosis: "通常是散热、Swap 或模型过重。",
    fix: [
      "先切换到轻量模型。",
      "增加 2GB Swap 文件。",
      "加入散热片并改用有线网络。"
    ]
  }
];

const releaseNotes = [
  {
    version: "MVP Sprint 3",
    date: "2026-03-13",
    highlights: [
      "独立页从占位状态改为真实模块页。",
      "新增 Quick Start、Command Center、Release Notes 三个静态功能页。",
      "模板库、工作流、教程、社区页统一成同一套页面框架。"
    ]
  },
  {
    version: "MVP Sprint 2",
    date: "2026-03-12",
    highlights: [
      "成本计算器接入多模型对比和优化建议。",
      "补齐模块页基础导航和复制交互。"
    ]
  },
  {
    version: "MVP Sprint 1",
    date: "2026-03-11",
    highlights: [
      "项目从单首页结构切出 6 个模块入口。",
      "建立首批任务模板、工作流和教程种子数据。"
    ]
  }
];

const roadmapItems = [
  "给首页和独立页统一真实 SEO 元信息与 OG 图片。",
  "把模板、教程、工作流扩充为可筛选的生产数据集。",
  "补教程详情页和收藏/历史记录。",
  "接真实 GA4、部署后的 404 与社交分享验证。"
];

const communityChannels = [
  {
    name: "GitHub Discussions",
    description: "适合沉淀部署问题、配置范式和排错结论。",
    action: "收集问题与解决方案"
  },
  {
    name: "Discord / 社群",
    description: "适合快速问答和展示你的最新 workflow。",
    action: "每周挑一条最佳实践做精华"
  },
  {
    name: "Build Log",
    description: "记录每次改模型、改心跳、改步骤后的实际效果。",
    action: "形成长期可复用的运维日志"
  }
];
