const showcaseCases = [
    {
        id: "raspberry-pi-assistant",
        title: "24/7 Raspberry Pi Assistant",
        category: "自动化",
        description: "在树莓派上运行的全天候AI助手，低功耗、高可靠",
        author: "OpenClaw官方",
        authorAvatar: "🦞",
        verified: true,
        difficulty: "中等",
        estimatedTime: "30-60分钟",
        stars: 2850,
        usage: 15620,
        tags: ["树莓派", "自动化", "24/7", "低功耗"],
        
        hardwareRequirements: [
            { name: "Raspberry Pi 4/5", spec: "4GB+ RAM 推荐" },
            { name: "Micro SD卡", spec: "32GB+ Class 10" },
            { name: "官方电源", spec: "5V 3A USB-C" },
            { name: "以太网连接", spec: "推荐，比WiFi更稳定" },
            { name: "散热片/风扇", spec: "长时间运行建议" }
        ],
        
        setupSteps: [
            {
                step: 1,
                title: "刷入Raspberry Pi OS",
                description: "使用Raspberry Pi Imager刷入64位操作系统",
                code: `# 下载Raspberry Pi Imager
# 选择 Raspberry Pi OS (64-bit)
# 启用SSH（高级设置）
# 写入SD卡`,
                note: "确保在高级设置中启用SSH并设置用户名密码"
            },
            {
                step: 2,
                title: "安装Node.js",
                description: "安装LTS版本的Node.js运行环境",
                code: `# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js (使用NodeSource)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# 验证安装
node --version
npm --version`,
                note: "树莓派4/5推荐使用Node.js 18或20 LTS"
            },
            {
                step: 3,
                title: "安装OpenClaw",
                description: "全局安装OpenClaw CLI工具",
                code: `# 全局安装OpenClaw
sudo npm install -g @openclaw/cli

# 验证安装
openclaw --version`,
                note: "如果遇到权限问题，可以使用nvm管理Node.js版本"
            },
            {
                step: 4,
                title: "配置OpenClaw",
                description: "创建配置文件并设置API密钥",
                code: `# 创建配置目录
mkdir -p ~/.openclaw
cd ~/.openclaw

# 创建config.yaml
cat > config.yaml << 'EOF'
name: Raspberry Pi Assistant
model: claude-haiku-4.6
api_key: sk-your-api-key-here
max_steps: 50
heartbeat:
  enabled: true
  interval: 60
EOF

# 编辑配置文件填入你的API密钥
nano config.yaml`,
                note: "建议使用Claude Haiku以降低成本"
            },
            {
                step: 5,
                title: "创建systemd服务",
                description: "设置OpenClaw为系统服务，开机自动启动",
                code: `# 创建服务文件
sudo nano /etc/systemd/system/openclaw.service

# 粘贴以下内容：
[Unit]
Description=OpenClaw AI Assistant
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/.openclaw
ExecStart=/usr/bin/openclaw start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target

# 启用并启动服务
sudo systemctl daemon-reload
sudo systemctl enable openclaw
sudo systemctl start openclaw

# 查看状态
sudo systemctl status openclaw
sudo journalctl -u openclaw -f`,
                note: "确保User设置为正确的用户名"
            },
            {
                step: 6,
                title: "验证运行状态",
                description: "检查OpenClaw是否正常运行",
                code: `# 检查服务状态
sudo systemctl status openclaw

# 查看实时日志
sudo journalctl -u openclaw -f

# 运行健康检查
openclaw doctor`,
                note: "如果有问题，检查日志中的错误信息"
            }
        ],
        
        proTips: [
            {
                icon: "🏥",
                title: "定期运行健康检查",
                description: "设置cron任务每天运行 openclaw doctor 检查系统状态"
            },
            {
                icon: "🔒",
                title: "使用Tailscale远程访问",
                description: "安装Tailscale以便从任何地方安全访问你的树莓派"
            },
            {
                icon: "💾",
                title: "配置Swap文件",
                description: "2GB Swap文件可以防止内存不足导致的崩溃"
            },
            {
                icon: "💰",
                title: "优先使用Claude Haiku",
                description: "对于大多数任务，Haiku足够快且成本仅为0.03美元/天"
            }
        ],
        
        userTestimonials: [
            {
                name: "Alex Chen",
                avatar: "👨‍💻",
                verified: true,
                quote: "已经稳定运行3个月了，成本才$0.03/天，太划算了！",
                date: "2026-01-15"
            },
            {
                name: "Sarah Wang",
                avatar: "👩‍🔬",
                verified: false,
                quote: "用它控制我的智能设备，响应速度很快，从来没掉过线。",
                date: "2026-02-03"
            }
        ],
        
        exampleCommands: [
            "打开客厅的灯",
            "检查前门是否锁了",
            "设置电影模式",
            "查看客厅摄像头",
            "现在温度是多少",
            "提醒我明天早上8点"
        ],
        
        developerInfo: {
            name: "OpenClaw官方",
            avatar: "🦞",
            github: "https://github.com/openclaw",
            verified: true,
            contributions: 42
        }
    },
    
    {
        id: "crypto-trading-monitor",
        title: "Crypto Trading & Market Monitor",
        category: "调研分析",
        description: "实时加密货币价格监控、DEX扫描和投资组合跟踪",
        author: "社区贡献",
        authorAvatar: "📈",
        verified: true,
        difficulty: "中等",
        estimatedTime: "45-75分钟",
        stars: 2120,
        usage: 9850,
        tags: ["加密货币", "交易", "监控", "投资"],
        
        hardwareRequirements: [
            { name: "任何现代电脑", spec: "Windows/macOS/Linux均可" },
            { name: "稳定网络连接", spec: "推荐有线连接" },
            { name: "可选：VPS服务器", spec: "用于24/7运行" }
        ],
        
        setupSteps: [
            {
                step: 1,
                title: "安装必要依赖",
                description: "安装OpenClaw和价格监控工具",
                code: `# 全局安装OpenClaw
npm install -g @openclaw/cli

# 验证安装
openclaw --version`,
                note: "需要Node.js 18+环境"
            },
            {
                step: 2,
                title: "创建监控配置",
                description: "设置要监控的代币列表和价格警报",
                code: `name: Crypto Monitor
model: gpt-4o-mini
max_steps: 30
tools:
  - browser
  - search
  - code_interpreter

cron:
  - schedule: "*/30 * * * *"
    task: check_prices
    description: 每30分钟检查价格`,
                note: "使用cron语法设置定时任务"
            },
            {
                step: 3,
                title: "配置价格警报",
                description: "设置代币价格变动警报阈值",
                code: `alerts:
  - token: BTC
    above: 70000
    below: 60000
    change_5m: 5%
  - token: ETH
    above: 4000
    below: 3000
  - token: SOL
    change_1h: 10%`,
                note: "可以设置价格上限、下限和变动百分比"
            }
        ],
        
        proTips: [
            {
                icon: "⏰",
                title: "设置合理的检查频率",
                description: "每15-30分钟检查一次足够频繁，又不会产生过高成本"
            },
            {
                icon: "📊",
                title: "结合技术分析",
                description: "添加MA、RSI等技术指标进行更智能的决策"
            },
            {
                icon: "🔔",
                title: "配置多个通知渠道",
                description: "Telegram、Discord、邮件等多渠道确保不会错过重要警报"
            }
        ],
        
        userTestimonials: [
            {
                name: "CryptoTrader99",
                avatar: "🚀",
                verified: true,
                quote: "帮我抓住了3次大的价格波动，太实用了！",
                date: "2026-02-20"
            }
        ],
        
        exampleCommands: [
            "BTC现在价格是多少",
            "ETH最近24小时涨了多少",
            "扫描DEX上的新币",
            "生成今日市场简报",
            "我的投资组合现在价值多少",
            "SOL技术分析"
        ],
        
        developerInfo: {
            name: "DeFi Wizard",
            avatar: "🧙",
            github: "https://github.com/defi-wizard",
            verified: true,
            contributions: 17
        }
    },
    
    {
        id: "smart-home-control",
        title: "Smart Home Control via Chat",
        category: "自动化",
        description: "通过自然语言控制Home Assistant智能家居设备",
        author: "OpenClaw官方",
        authorAvatar: "🏠",
        verified: true,
        difficulty: "简单",
        estimatedTime: "25-40分钟",
        stars: 3200,
        usage: 18750,
        tags: ["智能家居", "Home Assistant", "语音控制", "自动化"],
        
        hardwareRequirements: [
            { name: "Home Assistant实例", spec: "已安装并运行" },
            { name: "智能设备", spec: "已接入Home Assistant" }
        ],
        
        setupSteps: [
            {
                step: 1,
                title: "安装Home Assistant Skill",
                description: "从OpenClaw Hub安装官方Home Assistant集成",
                code: `# 安装Home Assistant Skill
openclaw skills install home-assistant

# 配置Home Assistant连接
openclaw skills configure home-assistant`,
                note: "需要提供Home Assistant的URL和Long-Lived Access Token"
            },
            {
                step: 2,
                title: "配置你的设备",
                description: "为常用设备创建友好的别名",
                code: `devices:
  aliases:
    "客厅灯": light.living_room
    "卧室灯": light.bedroom
    "空调": climate.ac
    "电视": media_player.tv
    "前门": lock.front_door`,
                note: "使用自然的中文名称会让交互更流畅"
            }
        ],
        
        proTips: [
            {
                icon: "🎭",
                title: "创建场景命令",
                description: "设置'电影模式'、'晚安'等一键控制多个设备的场景"
            },
            {
                icon: "📅",
                title: "结合日程自动化",
                description: "根据你的日程自动调整家中环境"
            }
        ],
        
        userTestimonials: [
            {
                name: "智能家居爱好者",
                avatar: "🏡",
                verified: true,
                quote: "终于不用记那么多自动化规则了，用自然语言就能控制！",
                date: "2026-01-28"
            }
        ],
        
        exampleCommands: [
            "把客厅灯调暗一点",
            "空调调到24度",
            "锁上前门",
            "打开电影模式",
            "查看客厅摄像头",
            "家里现在什么状态"
        ],
        
        developerInfo: {
            name: "OpenClaw官方",
            avatar: "🦞",
            github: "https://github.com/openclaw",
            verified: true,
            contributions: 42
        }
    },
    
    {
        id: "email-calendar-automation",
        title: "Email & Calendar Automation",
        category: "办公效率",
        description: "智能处理Gmail邮件、Notion同步和日历管理",
        author: "社区贡献",
        authorAvatar: "📧",
        verified: true,
        difficulty: "中等",
        estimatedTime: "35-50分钟",
        stars: 2560,
        usage: 14230,
        tags: ["邮件", "日历", "Notion", "自动化", "办公"],
        
        hardwareRequirements: [
            { name: "Gmail账号", spec: "用于邮件处理" },
            { name: "Google Calendar", spec: "用于日程管理" },
            { name: "Notion账号", spec: "用于任务同步（可选）" }
        ],
        
        setupSteps: [
            {
                step: 1,
                title: "连接Gmail",
                description: "授权OpenClaw访问你的Gmail",
                code: `# 配置Gmail集成
openclaw integrations add gmail

# 按照提示完成OAuth授权`,
                note: "只申请必要的权限，保护你的隐私"
            },
            {
                step: 2,
                title: "设置每日简报",
                description: "配置每天早上7点发送今日摘要",
                code: `cron:
  - schedule: "0 7 * * *"
    task: daily_briefing
    description: 每日简报

rules:
  - name: 重要邮件标记
    filter: "from:boss@company.com OR subject:紧急"
    action: "标记重要+立即通知"`,
                note: "使用cron时间：分 时 日 月 周"
            }
        ],
        
        proTips: [
            {
                icon: "✉️",
                title: "创建邮件处理规则",
                description: "自动分类、归档、回复常规邮件"
            },
            {
                icon: "📝",
                title: "同步到Notion",
                description: "重要邮件自动创建Notion任务卡片"
            },
            {
                icon: "⏰",
                title: "智能日程提醒",
                description: "提前准备会议材料，自动生成会议摘要"
            }
        ],
        
        userTestimonials: [
            {
                name: "Product Manager",
                avatar: "👔",
                verified: true,
                quote: "每天节省1小时处理邮件的时间，太值了！",
                date: "2026-02-10"
            }
        ],
        
        exampleCommands: [
            "总结今天的新邮件",
            "取消订阅所有促销邮件",
            "帮我起草一封回复",
            "明天的日程是什么",
            "把这个邮件转成Notion任务",
            "明天下午3点有空吗"
        ],
        
        developerInfo: {
            name: "Efficiency Guru",
            avatar: "⚡",
            github: "https://github.com/efficiency-guru",
            verified: true,
            contributions: 23
        }
    },
    
    {
        id: "developer-workflow-automation",
        title: "Developer Workflow Automation",
        category: "开发工具",
        description: "自动化代码审查、CI/CD监控、手机调试等开发工作流",
        author: "OpenClaw官方",
        authorAvatar: "💻",
        verified: true,
        difficulty: "高级",
        estimatedTime: "50-90分钟",
        stars: 2890,
        usage: 16540,
        tags: ["开发", "GitHub", "CI/CD", "代码审查", "自动化"],
        
        hardwareRequirements: [
            { name: "GitHub账号", spec: "用于代码仓库集成" },
            { name: "开发环境", spec: "已配置好的本地开发环境" },
            { name: "Android/iOS设备", spec: "用于移动端调试（可选）" }
        ],
        
        setupSteps: [
            {
                step: 1,
                title: "安装GitHub Skill",
                description: "连接GitHub账号以访问代码仓库",
                code: `# 安装GitHub Skill
openclaw skills install github

# 配置GitHub Personal Access Token
openclaw skills configure github`,
                note: "Token需要repo、workflow、pull_request权限"
            },
            {
                step: 2,
                title: "配置代码审查规则",
                description: "设置PR自动审查和反馈",
                code: `code_review:
  auto_review: true
  check_types:
    - security
    - performance
    - code_style
  comment_style: constructive
  min_severity: medium`,
                note: "可以自定义审查的严格程度"
            },
            {
                step: 3,
                title: "设置CI/CD监控",
                description: "监控GitHub Actions运行状态",
                code: `ci_monitor:
  enabled: true
  notify_on:
    - failure
    - success
    - timeout
  check_interval: 5m`,
                note: "构建失败时会立即通知你"
            }
        ],
        
        proTips: [
            {
                icon: "🔍",
                title: "结合本地开发工具",
                description: "在提交前先在本地运行初步检查"
            },
            {
                icon: "📱",
                title: "配置手机调试",
                description: "通过USB或网络连接Android/iOS设备进行实时调试"
            },
            {
                icon: "🚀",
                title: "自动化入职流程",
                description: "新团队成员可以通过自动化流程快速搭建开发环境"
            }
        ],
        
        userTestimonials: [
            {
                name: "Senior DevOps",
                avatar: "🛠️",
                verified: true,
                quote: "CI/CD监控帮我发现了好几次潜在问题，强烈推荐！",
                date: "2026-02-05"
            },
            {
                name: "Tech Lead",
                avatar: "👨‍💼",
                verified: true,
                quote: "代码审查质量很高，减轻了我很多负担，团队效率提升明显。",
                date: "2026-01-22"
            }
        ],
        
        exampleCommands: [
            "帮我调试这个错误",
            "创建一个新的功能分支",
            "审查这个PR",
            "CI构建为什么失败了",
            "生成这个组件的测试",
            "最新的提交是什么"
        ],
        
        developerInfo: {
            name: "OpenClaw官方",
            avatar: "🦞",
            github: "https://github.com/openclaw",
            verified: true,
            contributions: 42
        }
    }
];

function getShowcaseCase(caseId) {
    return showcaseCases.find(c => c.id === caseId);
}
