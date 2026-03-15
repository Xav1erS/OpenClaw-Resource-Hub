const tutorialCategories = [
    { id: 'beginner', name: '新手入门', icon: '🚀' },
    { id: 'advanced', name: '进阶技巧', icon: '⚡' },
    { id: 'faq', name: '常见问题', icon: '❓' },
    { id: 'best-practice', name: '最佳实践', icon: '✨' }
];

const tutorials = [
    {
        id: 'beginner-01',
        title: '10分钟快速部署OpenClaw',
        category: '新手入门',
        difficulty: '简单',
        readTime: '10分钟',
        views: 5420,
        likes: 320,
        content: `# 10分钟快速部署OpenClaw

## 前置要求
- Node.js 18+
- API Key（Claude、GPT或DeepSeek）

## 步骤1：安装OpenClaw

\`\`\`bash
npm install -g openclaw
\`\`\`

## 步骤2：创建配置文件

在项目根目录创建 \`config.yaml\`：

\`\`\`yaml
name: my-openclaw
model: claude-sonnet-4.6
api_key: your-api-key-here
heartbeat: true
max_tokens: 4000
\`\`\`

## 步骤3：启动服务

\`\`\`bash
openclaw start
\`\`\`

## 步骤4：验证安装

访问 http://localhost:8080 确认服务正常运行。

恭喜！您已成功部署OpenClaw！`
    },
    {
        id: 'beginner-02',
        title: '创建您的第一个Agent',
        category: '新手入门',
        difficulty: '简单',
        readTime: '15分钟',
        views: 4890,
        likes: 280,
        content: `# 创建您的第一个Agent

## 什么是Agent？

Agent是OpenClaw中的核心概念，它是一个具有特定功能的AI助手。

## 创建简单的问答Agent

\`\`\`yaml
name: Q&A Agent
model: claude-sonnet-4.6
task: 回答用户的问题，提供准确、友好的回答

tools:
  - search
  - browser
\`\`\`

## 测试您的Agent

1. 启动OpenClaw
2. 在界面中选择您的Agent
3. 输入问题："什么是OpenClaw？"
4. 观察Agent的回答

## 下一步

- 尝试添加更多工具
- 自定义Agent的任务描述
- 探索多步骤Agent`
    },
    {
        id: 'beginner-03',
        title: '理解OpenClaw的工作原理',
        category: '新手入门',
        difficulty: '简单',
        readTime: '12分钟',
        views: 3650,
        likes: 198,
        content: `# 理解OpenClaw的工作原理

## 核心架构

OpenClaw由以下几个核心组件组成：

1. **配置层**：定义模型、工具和参数
2. **执行引擎**：协调Agent的执行流程
3. **工具集成**：提供浏览器、搜索等能力
4. **交互界面**：用户与Agent交互的界面

## 执行流程

1. 用户输入请求
2. OpenClaw解析请求
3. 选择合适的工具
4. 执行工具调用
5. 收集结果
6. 生成最终回答
7. 返回给用户

## 关键概念

- **Workflow**：预定义的工作流程
- **Task**：单个执行步骤
- **Tool**：可用的工具集
- **Model**：使用的AI模型`
    },
    {
        id: 'beginner-04',
        title: '基础工具使用指南',
        category: '新手入门',
        difficulty: '简单',
        readTime: '20分钟',
        views: 3210,
        likes: 175,
        content: `# 基础工具使用指南

## 常用工具介绍

### 1. Search 工具

用于网络搜索，获取最新信息。

\`\`\`yaml
tools:
  - search
\`\`\`

### 2. Browser 工具

用于浏览网页，提取网页内容。

\`\`\`yaml
tools:
  - browser
\`\`\`

### 3. Code Interpreter 工具

用于执行代码，进行数据分析。

\`\`\`yaml
tools:
  - code_interpreter
\`\`\`

## 组合使用工具

您可以在一个Agent中同时使用多个工具：

\`\`\`yaml
tools:
  - search
  - browser
  - code_interpreter
\`\`\``
    },
    {
        id: 'beginner-05',
        title: '如何获取和配置API Key',
        category: '新手入门',
        difficulty: '简单',
        readTime: '8分钟',
        views: 4120,
        likes: 245,
        content: `# 如何获取和配置API Key

## 获取API Key

### Anthropic (Claude)

1. 访问 https://console.anthropic.com
2. 注册/登录账号
3. 进入 API Keys 页面
4. 点击 Create Key
5. 复制生成的Key

### OpenAI (GPT)

1. 访问 https://platform.openai.com
2. 注册/登录账号
3. 进入 API Keys 页面
4. 点击 Create new secret key
5. 复制生成的Key

### DeepSeek

1. 访问 https://platform.deepseek.com
2. 注册/登录账号
3. 进入 API Keys 页面
4. 创建新的API Key
5. 复制生成的Key

## 配置API Key

在 config.yaml 中配置：

\`\`\`yaml
api_key: sk-your-api-key-here
\`\`\`

## 安全提示

- 不要将API Key提交到公开仓库
- 定期轮换API Key
- 设置使用额度限制`
    },
    {
        id: 'advanced-01',
        title: 'Token优化：降低70%成本的5个技巧',
        category: '进阶技巧',
        difficulty: '中等',
        readTime: '8分钟',
        views: 3210,
        likes: 189,
        content: `# Token优化：降低70%成本的5个技巧

## 技巧1：关闭心跳机制

如果不需要实时监控，可以关闭心跳：

\`\`\`yaml
heartbeat: false
\`\`\`

## 技巧2：使用更经济的模型

\`\`\`yaml
# 从
model: claude-opus-4.6

# 改为
model: claude-sonnet-4.6
# 或
model: gpt-4o-mini
\`\`\`

## 技巧3：限制输出长度

\`\`\`yaml
max_tokens: 1000  # 从4000降到1000
\`\`\`

## 技巧4：精简Prompt

移除不必要的描述，保持Prompt简洁。

## 技巧5：使用缓存

对于重复的查询，启用缓存功能。

## 效果对比

| 优化项 | 成本降低 |
|--------|---------|
| 关闭心跳 | 5% |
| 更换模型 | 50-70% |
| 限制输出 | 20-40% |
| 精简Prompt | 10-20% |
| 使用缓存 | 30-50% |`
    },
    {
        id: 'advanced-02',
        title: '多Agent协作实战指南',
        category: '进阶技巧',
        difficulty: '中等',
        readTime: '25分钟',
        views: 2890,
        likes: 167,
        content: `# 多Agent协作实战指南

## 什么是多Agent协作？

多个Agent分工合作，共同完成复杂任务。

## 典型应用场景

### 市场分析系统

\`\`\`yaml
agents:
  - name: Researcher
    role: 收集市场数据
    tools: [search, browser]
  
  - name: Analyst
    role: 分析数据
    tools: [code_interpreter]
  
  - name: Reporter
    role: 生成报告
    tools: []
\`\`\`

## 实现方式

### 1. 顺序执行

Agent按顺序执行，前一个的输出作为后一个的输入。

### 2. 并行执行

多个Agent同时执行不同的任务。

### 3. 混合执行

结合顺序和并行执行。

## 最佳实践

- 明确每个Agent的职责
- 定义清晰的输入输出格式
- 建立错误处理机制
- 监控每个Agent的执行状态`
    },
    {
        id: 'advanced-03',
        title: '自定义工具开发完整教程',
        category: '进阶技巧',
        difficulty: '中等',
        readTime: '30分钟',
        views: 2150,
        likes: 132,
        content: `# 自定义工具开发完整教程

## 工具开发基础

OpenClaw允许您开发自定义工具来扩展功能。

## 创建一个简单的工具

\`\`\`javascript
// tools/my-tool.js
module.exports = {
    name: 'my-tool',
    description: '我的自定义工具',
    
    async execute(params) {
        // 工具逻辑
        return {
            success: true,
            result: '工具执行结果'
        };
    }
};
\`\`\`

## 注册工具

在 config.yaml 中注册：

\`\`\`yaml
custom_tools:
  - path: ./tools/my-tool.js
\`\`\`

## 使用工具

在Agent配置中使用：

\`\`\`yaml
tools:
  - my-tool
\`\`\`

## 高级特性

- 参数验证
- 错误处理
- 异步执行
- 工具组合`
    },
    {
        id: 'advanced-04',
        title: 'Workflow高级编排技巧',
        category: '进阶技巧',
        difficulty: '中等',
        readTime: '22分钟',
        views: 1980,
        likes: 115,
        content: `# Workflow高级编排技巧

## 条件分支

根据条件选择不同的执行路径：

\`\`\`yaml
workflow:
  - task: check_condition
    id: check
  
  - task: branch_a
    when: "{{ check.result }} === 'A'"
  
  - task: branch_b
    when: "{{ check.result }} === 'B'"
\`\`\`

## 循环执行

重复执行某个步骤：

\`\`\`yaml
workflow:
  - task: process_item
    for_each: "{{ items }}"
    iterator: item
\`\`\`

## 并行执行

同时执行多个任务：

\`\`\`yaml
workflow:
  - parallel:
      - task: task_a
      - task: task_b
      - task: task_c
\`\`\`

## 错误处理

定义错误处理逻辑：

\`\`\`yaml
workflow:
  - task: risky_task
    on_error:
      - task: handle_error
      - task: retry
        retries: 3
\`\`\``
    },
    {
        id: 'advanced-05',
        title: '性能调优：让您的Agent飞起来',
        category: '进阶技巧',
        difficulty: '中等',
        readTime: '18分钟',
        views: 2340,
        likes: 142,
        content: `# 性能调优：让您的Agent飞起来

## 响应时间优化

### 1. 选择更快的模型

\`\`\`yaml
model: gpt-4o-mini  # 比GPT-4o快很多
\`\`\`

### 2. 减少工具调用

合并多个工具调用为一个。

### 3. 使用缓存

\`\`\`yaml
cache:
  enabled: true
  ttl: 3600  # 1小时
\`\`\`

## 并发优化

### 1. 并行执行

\`\`\`yaml
parallel:
  - task: task1
  - task: task2
\`\`\`

### 2. 连接池

配置HTTP连接池：

\`\`\`yaml
http:
  pool_size: 10
  max_connections: 100
\`\`\`

## 资源优化

- 限制内存使用
- 优化日志输出
- 使用流式输出
- 及时释放资源`
    },
    {
        id: 'faq-01',
        title: '如何降低OpenClaw的使用成本？',
        category: '常见问题',
        difficulty: '简单',
        readTime: '5分钟',
        views: 6780,
        likes: 420,
        content: `# 如何降低OpenClaw的使用成本？

## 快速答案

1. 使用更经济的模型
2. 限制输出长度
3. 关闭不必要的功能
4. 优化Prompt
5. 使用缓存

## 详细说明

### 模型选择

| 模型 | 价格比 | 推荐场景 |
|------|--------|---------|
| Claude Opus | 1x | 高质量任务 |
| Claude Sonnet | 0.2x | 一般任务 |
| GPT-4o Mini | 0.06x | 简单任务 |

### 输出限制

\`\`\`yaml
max_tokens: 500  # 降低到500
\`\`\`

### 功能关闭

\`\`\`yaml
heartbeat: false
logging:
  level: error
\`\`\``
    },
    {
        id: 'faq-02',
        title: 'OpenClaw支持哪些模型？',
        category: '常见问题',
        difficulty: '简单',
        readTime: '4分钟',
        views: 5430,
        likes: 310,
        content: `# OpenClaw支持哪些模型？

## 支持的模型列表

### Anthropic系列
- Claude Opus 4.6
- Claude Sonnet 4.6
- Claude Haiku 4.6

### OpenAI系列
- GPT-4o
- GPT-4o Mini
- GPT-4 Turbo
- GPT-3.5 Turbo

### 国产模型
- DeepSeek V3
- DeepSeek Chat
- 智谱AI GLM-4
- 阿里云Qwen

## 如何切换模型

在 config.yaml 中修改：

\`\`\`yaml
model: claude-sonnet-4.6
\`\`\`

## 模型选择建议

| 场景 | 推荐模型 |
|------|---------|
| 高质量需求 | Claude Opus / GPT-4o |
| 平衡质量和成本 | Claude Sonnet |
| 简单任务 | GPT-4o Mini / DeepSeek |`
    },
    {
        id: 'faq-03',
        title: '遇到"API Key invalid"错误怎么办？',
        category: '常见问题',
        difficulty: '简单',
        readTime: '3分钟',
        views: 7120,
        likes: 450,
        content: `# 遇到"API Key invalid"错误怎么办？

## 排查步骤

### 1. 检查API Key格式

确保：
- 没有多余的空格
- 没有换行符
- 以"sk-"开头（大多数模型）

### 2. 验证API Key是否有效

访问对应的控制台：
- Anthropic: https://console.anthropic.com
- OpenAI: https://platform.openai.com
- DeepSeek: https://platform.deepseek.com

### 3. 检查额度

确认账户有足够的额度。

### 4. 检查权限

确认API Key有相应的权限。

## 快速修复

\`\`\`yaml
# 重新配置API Key
api_key: sk-your-new-valid-key
\`\`\`

然后重启OpenClaw：

\`\`\`bash
openclaw restart
\`\`\``
    },
    {
        id: 'faq-04',
        title: '如何配置自定义技能？',
        category: '常见问题',
        difficulty: '中等',
        readTime: '8分钟',
        views: 3890,
        likes: 225,
        content: `# 如何配置自定义技能？

## 什么是自定义技能？

自定义技能是您为Agent添加的特定能力。

## 创建自定义技能

### 步骤1：创建技能文件

\`\`\`yaml
# skills/my-skill.yaml
name: 数据分析技能
description: 专业的数据分析能力

prompt: |
  你是一个专业的数据分析师，擅长：
  1. 数据清洗
  2. 统计分析
  3. 可视化报告

tools:
  - code_interpreter
  - search
\`\`\`

### 步骤2：在Agent中使用

\`\`\`yaml
skills:
  - path: ./skills/my-skill.yaml
\`\`\`

## 技能组合

可以组合多个技能：

\`\`\`yaml
skills:
  - 数据分析技能
  - 写作技能
  - 研究技能
\`\`\``
    },
    {
        id: 'faq-05',
        title: 'OpenClaw可以离线使用吗？',
        category: '常见问题',
        difficulty: '简单',
        readTime: '5分钟',
        views: 2560,
        likes: 145,
        content: `# OpenClaw可以离线使用吗？

## 简短回答

**部分可以**，但主要功能需要网络连接。

## 离线功能

### 1. 本地执行

- 使用本地模型（如Ollama）
- 本地工具执行
- 本地数据处理

### 2. 缓存功能

已缓存的响应可以离线使用。

## 需要网络的功能

- API调用
- 网络搜索
- 浏览器工具
- 在线更新

## 配置离线模式

\`\`\`yaml
offline:
  enabled: true
  cache_only: true
  local_model: ollama/llama2
\`\`\`

## 推荐方案

混合模式：
- 简单任务：本地模型
- 复杂任务：在线API
- 重要数据：本地缓存`
    },
    {
        id: 'best-practice-01',
        title: '企业级部署最佳实践',
        category: '最佳实践',
        difficulty: '中等',
        readTime: '25分钟',
        views: 2130,
        likes: 134,
        content: `# 企业级部署最佳实践

## 架构设计

### 高可用架构

\`\`\`
                    ┌─────────┐
                    │  Load   │
                    │Balancer │
                    └────┬────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
    ┌─────▼─────┐ ┌────▼─────┐ ┌─────▼─────┐
    │ OpenClaw  │ │OpenClaw  │ │ OpenClaw  │
    │  Node 1   │ │  Node 2  │ │  Node 3   │
    └─────┬─────┘ └────┬─────┘ └─────┬─────┘
          │              │              │
          └──────────────┼──────────────┘
                         │
                  ┌──────▼──────┐
                  │   Redis     │
                  │   (缓存)    │
                  └─────────────┘
\`\`\`

## 安全配置

### 1. 网络安全

\`\`\`yaml
security:
  network:
    allowed_ips:
      - 192.168.1.0/24
    tls:
      enabled: true
      cert_file: /path/to/cert.pem
      key_file: /path/to/key.pem
\`\`\`

### 2. 访问控制

\`\`\`yaml
auth:
  type: oauth2
  providers:
    - google
    - github
  rbac:
    enabled: true
\`\`\`

## 监控与日志

### 1. 指标监控

\`\`\`yaml
monitoring:
  prometheus:
    enabled: true
    port: 9090
  grafana:
    enabled: true
    dashboards:
      - openclaw-overview
\`\`\`

### 2. 日志管理

\`\`\`yaml
logging:
  level: info
  format: json
  outputs:
    - type: file
      path: /var/log/openclaw
    - type: elasticsearch
      host: localhost:9200
\`\`\``
    },
    {
        id: 'best-practice-02',
        title: '安全配置完整指南',
        category: '最佳实践',
        difficulty: '中等',
        readTime: '20分钟',
        views: 1870,
        likes: 112,
        content: `# 安全配置完整指南

## 认证与授权

### 1. API Key安全

\`\`\`yaml
security:
  api_keys:
    rotation:
      enabled: true
      interval_days: 90
    encryption:
      enabled: true
      key_vault: aws_kms
\`\`\`

### 2. 多因素认证

\`\`\`yaml
auth:
  mfa:
    enabled: true
    methods:
      - totp
      - sms
\`\`\`

## 数据安全

### 1. 数据加密

\`\`\`yaml
data:
  encryption:
    at_rest:
      enabled: true
      algorithm: AES-256
    in_transit:
      enabled: true
      protocol: TLS 1.3
\`\`\`

### 2. 数据脱敏

\`\`\`yaml
privacy:
  data_masking:
    enabled: true
    patterns:
      - email
      - phone
      - credit_card
\`\`\`

## 审计与合规

### 1. 审计日志

\`\`\`yaml
audit:
  enabled: true
  log_level: detailed
  retention_days: 365
  integrity:
    enabled: true
    algorithm: SHA-256
\`\`\`

### 2. 合规检查

\`\`\`yaml
compliance:
  standards:
    - GDPR
    - SOC2
    - ISO27001
  auto_scan:
    enabled: true
    interval: daily
\`\`\``
    },
    {
        id: 'best-practice-03',
        title: '团队协作与权限管理',
        category: '最佳实践',
        difficulty: '中等',
        readTime: '15分钟',
        views: 1650,
        likes: 98,
        content: `# 团队协作与权限管理

## 角色定义

### 预设角色

\`\`\`yaml
roles:
  - name: admin
    permissions:
      - '*'
  
  - name: developer
    permissions:
      - 'workflow:*'
      - 'agent:read'
      - 'agent:write'
  
  - name: viewer
    permissions:
      - 'workflow:read'
      - 'agent:read'
  
  - name: operator
    permissions:
      - 'workflow:execute'
      - 'agent:execute'
\`\`\`

## 用户管理

### 1. 添加用户

\`\`\`yaml
users:
  - id: user-001
    name: 张三
    email: zhangsan@company.com
    roles:
      - developer
    teams:
      - team-a
\`\`\`

### 2. 团队管理

\`\`\`yaml
teams:
  - id: team-a
    name: AI研发组
    members:
      - user-001
      - user-002
    resources:
      workflows:
        - workflow-001
        - workflow-002
\`\`\`

## 权限最佳实践

1. 最小权限原则
2. 定期审核权限
3. 使用临时权限
4. 记录权限变更
5. 启用权限告警`
    },
    {
        id: 'best-practice-04',
        title: '性能监控与优化策略',
        category: '最佳实践',
        difficulty: '中等',
        readTime: '18分钟',
        views: 1430,
        likes: 85,
        content: `# 性能监控与优化策略

## 关键指标

### 1. 响应时间

\`\`\`yaml
metrics:
  response_time:
    target: < 2s
    warning: 2-5s
    critical: > 5s
\`\`\`

### 2. 吞吐量

\`\`\`yaml
metrics:
  throughput:
    target: > 100 req/min
    warning: 50-100 req/min
    critical: < 50 req/min
\`\`\`

### 3. 错误率

\`\`\`yaml
metrics:
  error_rate:
    target: < 1%
    warning: 1-5%
    critical: > 5%
\`\`\`

## 监控工具

### 1. Prometheus + Grafana

\`\`\`yaml
monitoring:
  prometheus:
    enabled: true
    scrape_interval: 15s
  grafana:
    enabled: true
    dashboards:
      - openclaw-performance
      - openclaw-errors
      - openclaw-business
\`\`\`

## 优化闭环

1. 监控发现问题
2. 分析根因
3. 实施优化
4. 验证效果
5. 持续迭代`
    },
    {
        id: 'best-practice-05',
        title: 'CI/CD集成最佳实践',
        category: '最佳实践',
        difficulty: '中等',
        readTime: '22分钟',
        views: 1290,
        likes: 76,
        content: `# CI/CD集成最佳实践

## GitHub Actions示例

\`\`\`yaml
# .github/workflows/openclaw.yml
name: OpenClaw CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Test
        run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to production
        uses: easingthemes/ssh-deploy@v4
        with:
          SSH_PRIVATE_KEY: \${{ secrets.SSH_PRIVATE_KEY }}
          REMOTE_HOST: \${{ secrets.REMOTE_HOST }}
          REMOTE_USER: \${{ secrets.REMOTE_USER }}
          TARGET: /var/www/openclaw
\`\`\`

## 部署策略

### 1. 蓝绿部署

\`\`\`yaml
deployment:
  strategy: blue-green
  blue:
    version: v1.0.0
  green:
    version: v1.1.0
  auto_switch:
    enabled: true
    metrics:
      - error_rate < 1%
      - response_time < 2s
\`\`\`

### 2. 金丝雀发布

\`\`\`yaml
deployment:
  strategy: canary
  phases:
    - traffic: 10%
      duration: 1h
    - traffic: 30%
      duration: 2h
    - traffic: 100%
      duration: 0
  rollback:
    enabled: true
    on_error: true
\`\`\``
    }
];

function tutorialsModule() {
    return {
        searchQuery: '',
        selectedCategory: '',
        showDetail: false,
        selectedTutorial: null,
        categories: tutorialCategories,
        tutorials: tutorials,
        
        get filteredTutorials() {
            let result = [...this.tutorials];
            
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(tutorial => 
                    tutorial.title.toLowerCase().includes(query) ||
                    tutorial.content.toLowerCase().includes(query) ||
                    tutorial.category.toLowerCase().includes(query)
                );
            }
            
            if (this.selectedCategory) {
                result = result.filter(tutorial => tutorial.category === this.selectedCategory);
            }
            
            return result;
        },
        
        getTutorialsByCategory(category) {
            return this.tutorials.filter(t => t.category === category);
        },
        
        showTutorialDetail(tutorial) {
            this.selectedTutorial = tutorial;
            this.showDetail = true;
            
            if (typeof trackEvent === 'function') {
                trackEvent('tutorial_view', {
                    tutorial_id: tutorial.id,
                    category: tutorial.category
                });
            }
        },
        
        closeDetail() {
            this.showDetail = false;
            this.selectedTutorial = null;
        },
        
        getDifficultyColor(difficulty) {
            switch(difficulty) {
                case '简单': return 'bg-green-600/20 text-green-400';
                case '中等': return 'bg-yellow-600/20 text-yellow-400';
                case '困难': return 'bg-red-600/20 text-red-400';
                default: return 'bg-slate-600/20 text-slate-400';
            }
        }
    };
}
