const tutorialCategories = [
  { id: "beginner", name: "beginner", icon: "Start" },
  { id: "advanced", name: "advanced", icon: "Deep" },
  { id: "faq", name: "faq", icon: "FAQ" },
  { id: "best-practice", name: "best-practice", icon: "Playbook" }
];

const tutorials = [
  {
    id: "beginner-01",
    title: "10 分钟快速部署 OpenClaw",
    category: "beginner",
    difficulty: "简单",
    readTime: "10 分钟",
    views: 5420,
    likes: 320,
    content: `# 10 分钟快速部署 OpenClaw

## 你会完成什么
- 安装 Node.js 18+
- 初始化 OpenClaw
- 生成第一份 config.yaml
- 完成一次成功启动验证

## 最小启动命令
\`\`\`bash
npm install -g @openclaw/cli
openclaw init
openclaw doctor
openclaw start
\`\`\`

## 最小配置
\`\`\`yaml
name: my-openclaw
model: claude-sonnet-4.6
api_key: your-api-key-here
max_steps: 24
heartbeat:
  enabled: true
  interval: 60
\`\`\`

## 启动后先看什么
1. 能否正常返回首次响应
2. 日志里是否出现 401 / 429 / timeout
3. 成本页里预估是否与实际接近
`
  },
  {
    id: "beginner-02",
    title: "创建你的第一个 Agent",
    category: "beginner",
    difficulty: "简单",
    readTime: "15 分钟",
    views: 4890,
    likes: 280,
    content: `# 创建你的第一个 Agent

## 目标
做一个能回答常见问题、必要时调用搜索工具的基础 Agent。

## 示例配置
\`\`\`yaml
name: Q&A Agent
model: gpt-4o-mini
goal: Answer user questions with concise, factual responses
tools:
  - search
  - browser
rules:
  - Ask a clarifying question if the input is ambiguous
  - Keep the response structured
\`\`\`

## 建议的第一轮验证
1. 问一个简单定义类问题
2. 问一个需要联网检索的问题
3. 观察它什么时候应该调用工具，什么时候不该调用
`
  },
  {
    id: "beginner-03",
    title: "理解 OpenClaw 的工作原理",
    category: "beginner",
    difficulty: "简单",
    readTime: "12 分钟",
    views: 3650,
    likes: 198,
    content: `# 理解 OpenClaw 的工作原理

## 执行循环
1. 接收输入
2. 规划下一步
3. 决定是否使用工具
4. 汇总工具结果
5. 输出最终答复

## 什么时候会变慢
- 输入上下文过长
- 工具调用链过多
- 每一步都允许过长输出

## 什么时候会变贵
- 使用高成本模型跑中间步骤
- 没限制 max_tokens
- 同时跑太多链路
`
  },
  {
    id: "beginner-04",
    title: "基础工具使用指南",
    category: "beginner",
    difficulty: "简单",
    readTime: "20 分钟",
    views: 3210,
    likes: 175,
    content: `# 基础工具使用指南

## Search
适合检索公开信息和快速补充上下文。

## Browser
适合读取具体网页内容，但要控制抓取链路长度。

## Code Interpreter
适合计算、数据清洗、结构化处理和简单分析。

## 常见误区
- 不要每一步都同时开三个工具
- 不要用 Browser 代替一切检索
- 不要把 Code Interpreter 当成无限计算资源
`
  },
  {
    id: "beginner-05",
    title: "如何获取和配置 API Key",
    category: "beginner",
    difficulty: "简单",
    readTime: "8 分钟",
    views: 4120,
    likes: 245,
    content: `# 如何获取和配置 API Key

## 推荐做法
- 不要把密钥写死在仓库里
- 优先用环境变量或密钥管理工具
- 首次接入后先跑一次最小请求

## 示例
\`\`\`yaml
api_key: \${OPENCLAW_API_KEY}
\`\`\`

## 首次验证
\`\`\`bash
openclaw doctor
\`\`\`

如果这里就报 401，先排查 Key 本身，而不是先怀疑模型或网络。
`
  },
  {
    id: "advanced-01",
    title: "多 Agent 协作链路设计",
    category: "advanced",
    difficulty: "中等",
    readTime: "18 分钟",
    views: 3380,
    likes: 210,
    content: `# 多 Agent 协作链路设计

## 什么时候值得拆成多 Agent
- 研究、分析、输出明显是不同角色
- 某一步可以稳定复用
- 你需要明确每一步输入和输出

## 经典三段式
1. Researcher 收集材料
2. Analyst 归纳判断
3. Writer 输出成稿

## 设计原则
- 每个 Agent 只承担一个核心职责
- 上一步输出必须可检查
- 出错时要能单独回放某一步
`
  },
  {
    id: "advanced-02",
    title: "长链路任务的成本控制",
    category: "advanced",
    difficulty: "中等",
    readTime: "16 分钟",
    views: 2940,
    likes: 178,
    content: `# 长链路任务的成本控制

## 先控制这三件事
1. 中间步骤是否一定要高价模型
2. 每一步输出长度是否有上限
3. 是否能拆成短链路缓存中间结果

## 推荐配置
\`\`\`yaml
model: gpt-4o-mini
max_steps: 16
max_tokens: 1200
response_format: concise
\`\`\`

## 经验法则
先把一条链跑稳定，再做并发和多任务批处理。
`
  },
  {
    id: "faq-01",
    title: "为什么启动后调用就失败",
    category: "faq",
    difficulty: "简单",
    readTime: "5 分钟",
    views: 6780,
    likes: 420,
    content: `# 为什么启动后调用就失败

优先排查顺序：
1. API Key 是否有效
2. 模型名是否拼错
3. 配置文件是否有隐藏空格或换行
4. 首次启动是否直接跑了过重任务

## 最小验证法
\`\`\`bash
openclaw doctor
openclaw start --max-steps 1
\`\`\`
`
  },
  {
    id: "faq-02",
    title: "为什么成本比预期更高",
    category: "faq",
    difficulty: "简单",
    readTime: "6 分钟",
    views: 5430,
    likes: 310,
    content: `# 为什么成本比预期更高

最常见的三个原因：
- 中间步骤用了高成本模型
- 输出长度没有限制
- 工具调用链过长

## 先试这三个动作
- 把中间步骤切到 mini 或 haiku
- 下调 max_tokens
- 把一个大任务拆成两个小任务
`
  },
  {
    id: "best-practice-01",
    title: "先跑通一条链再扩展",
    category: "best-practice",
    difficulty: "中等",
    readTime: "12 分钟",
    views: 2470,
    likes: 166,
    content: `# 先跑通一条链再扩展

## 为什么
很多团队不是死在模型效果，而是死在过早并发、过早叠工具、过早做平台化。

## 更稳的顺序
1. 跑通一条真实链路
2. 固化成模板
3. 补排错手册
4. 再做多人复用和部署

## 交付标准
- 输入边界明确
- 输出结构稳定
- 失败时能快速定位问题步骤
`
  },
  {
    id: "best-practice-02",
    title: "模板、命令与教程如何配合",
    category: "best-practice",
    difficulty: "中等",
    readTime: "10 分钟",
    views: 2190,
    likes: 148,
    content: `# 模板、命令与教程如何配合

## 模板库
解决“我该从什么结构开始”。

## 命令中心
解决“命令怎么写、配置怎么补、故障怎么查”。

## 教程
解决“为什么这么做，以及背后的方法论”。

如果用户已经知道自己要做什么，优先去模板库；如果用户卡在环境或报错，优先去命令中心。
`
  }
];
