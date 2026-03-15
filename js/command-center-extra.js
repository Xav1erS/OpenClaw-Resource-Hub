(function () {
  const extra = {
    zh: {
      sectionTitle: "官方 Cheatsheet 补充区",
      issueTitle: "官方 Fast Fixes",
      copy: "复制",
      packs: [
        {
          title: "Workspace Anatomy",
          description: "官方 cheatsheet 里最容易被忽略的一块。你需要知道 workspace 里哪些文件会在每次会话或启动时被真正读取。",
          commands: [
            { label: "AGENTS.md", code: "Agent 的规则、工作方式和约束。" },
            { label: "SOUL.md", code: "Agent 的人格、语气和偏好。" },
            { label: "USER.md", code: "用户偏好、长期上下文和行为习惯。" },
            { label: "IDENTITY.md", code: "Agent 名称、主题、头像和身份信息。" },
            { label: "MEMORY.md", code: "长期记忆摘要，适合沉淀稳定事实。" },
            { label: "memory/YYYY-MM-DD.md", code: "每天的短期记忆和会话记录。" },
            { label: "HEARTBEAT.md", code: "周期性检查、主动任务和提醒逻辑。" },
            { label: "BOOT.md", code: "网关启动时经由 hooks 执行的启动说明。" },
            { label: ".openclaw/", code: "项目级配置、状态和本地运行数据。" }
          ]
        },
        {
          title: "Memory & Models",
          description: "把检索记忆、重建索引、切模型和检查模型授权的命令放在一起，方便第一次排查“为什么模型没按预期工作”。",
          commands: [
            { label: "搜索记忆", code: "openclaw memory search --query \"deployment notes\"" },
            { label: "检查记忆状态", code: "openclaw memory status" },
            { label: "强制重建索引", code: "openclaw memory index --force" },
            { label: "列出模型", code: "openclaw models list --provider anthropic" },
            { label: "切换默认模型", code: "openclaw models set claude-3-5-sonnet" },
            { label: "检查模型探针", code: "openclaw models status --probe" },
            { label: "设置 provider token", code: "openclaw models auth setup-token --provider anthropic" }
          ]
        },
        {
          title: "Channel Management",
          description: "官方 cheatsheet 把频道管理作为核心入口之一。第一次上线时，频道健康往往比模型配置更容易出问题。",
          commands: [
            { label: "添加或更新频道", code: "openclaw channels add" },
            { label: "列出频道", code: "openclaw channels list" },
            { label: "频道健康探针", code: "openclaw channels status --probe" },
            { label: "登录 WhatsApp", code: "openclaw channels login --channel whatsapp" },
            { label: "添加 Telegram", code: "openclaw channels add --channel telegram --token <token>" },
            { label: "添加 Discord", code: "openclaw channels add --channel discord --token <token>" },
            { label: "添加 Slack", code: "openclaw channels add --channel slack --bot-token <bot> --app-token <app>" }
          ]
        },
        {
          title: "Hooks & Skills",
          description: "当你想把 workspace 启动逻辑、技能扩展和社区能力接进来时，先记住这几个命令。",
          commands: [
            { label: "列出 hooks", code: "openclaw hooks list" },
            { label: "启用 hook", code: "openclaw hooks enable boot-md" },
            { label: "列出 skills", code: "openclaw skills list" },
            { label: "检查 skill 依赖", code: "openclaw skills check" },
            { label: "搜索社区技能", code: "clawhub search \"gmail\"" },
            { label: "安装社区技能", code: "clawhub install <slug>" }
          ]
        },
        {
          title: "Slash Commands",
          description: "这些是官方 cheatsheet 里的聊天内快捷命令，适合做上下文切换、压缩对话和中断当前动作。",
          commands: [
            { label: "列出上下文", code: "/context list" },
            { label: "切换上下文", code: "/context <id>" },
            { label: "压缩上下文", code: "/compact" },
            { label: "新开会话", code: "/new" },
            { label: "停止当前动作", code: "/stop" },
            { label: "开启 TTS", code: "/tts on" },
            { label: "关闭 TTS", code: "/tts off" }
          ]
        },
        {
          title: "Automation & Research",
          description: "官方 cheatsheet 还给了自动化、浏览器和 heartbeat 的快速入口。这些命令适合部署后做持续运行。",
          commands: [
            { label: "浏览器状态", code: "openclaw browser status" },
            { label: "启动浏览器", code: "openclaw browser start" },
            { label: "浏览器快照", code: "openclaw browser snapshot" },
            { label: "查看 cron", code: "openclaw cron list" },
            { label: "新增 cron", code: "openclaw cron add" },
            { label: "查看 cron 运行记录", code: "openclaw cron runs" },
            { label: "查看 agents", code: "openclaw agents list" },
            { label: "查看 sessions", code: "openclaw sessions list" },
            { label: "最近 heartbeat", code: "openclaw system heartbeat last" },
            { label: "启用 heartbeat", code: "openclaw system heartbeat enable" },
            { label: "停用 heartbeat", code: "openclaw system heartbeat disable" }
          ]
        }
      ],
      issues: [
        {
          title: "私聊没有回复",
          body: "先不要猜是模型问题。官方 fast path 的第一步是直接测频道健康和认证状态。",
          steps: [
            "运行 openclaw channels status --probe",
            "确认频道认证仍有效、Gateway 已连接",
            "如果是 Telegram / Discord，确认 bot token 没失效"
          ]
        },
        {
          title: "群聊里完全沉默",
          body: "这通常不是网关挂了，而是群聊权限、allowlist 或频道侧配置不允许 bot 响应。",
          steps: [
            "运行 openclaw channels status --probe",
            "检查 group allowlists 和 mention / permission 规则",
            "先在 DM 里确认 bot 正常，再回到群聊排权限"
          ]
        },
        {
          title: "模型授权过期或探针失败",
          body: "如果 gateway 在跑，但模型调用立刻失败，先去看模型授权，而不是先改 prompt。",
          steps: [
            "运行 openclaw models status --probe",
            "确认当前 key 对应 provider 和 model name 一致",
            "必要时重新执行 openclaw onboard 或 setup-token"
          ]
        },
        {
          title: "Gateway 没起来或状态异常",
          body: "先确认是服务本身没起，还是起了但频道没通。不要把两类问题混在一起排。",
          steps: [
            "运行 openclaw gateway status",
            "如果需要，执行 openclaw gateway start 或 restart",
            "前台直接运行一次 openclaw gateway，看是否即时退出"
          ]
        },
        {
          title: "记忆搜索不准或 memory 工具失灵",
          body: "官方 cheatsheet 的排法是先看 memory status，再决定是否重建索引。",
          steps: [
            "运行 openclaw memory status",
            "确认向量索引和 provider 都是健康状态",
            "如果索引陈旧，执行 openclaw memory index --force"
          ]
        },
        {
          title: "一切都很怪，找不到入口",
          body: "当频道、模型、记忆都说不清楚哪里坏了，最省时间的入口还是完整体检。",
          steps: [
            "运行 openclaw doctor",
            "按 doctor 给出的 quick fixes 先收敛显式报错",
            "doctor 干净后再回到 channels / models / memory 分支继续排"
          ]
        }
      ]
    },
    en: {
      sectionTitle: "Official Cheatsheet Additions",
      issueTitle: "Official Fast Fixes",
      copy: "Copy",
      packs: [
        {
          title: "Workspace Anatomy",
          description: "One of the most important parts of the official cheatsheet. These are the files the assistant or gateway actually reads during sessions and boot.",
          commands: [
            { label: "AGENTS.md", code: "Rules, workflow instructions, and hard constraints for the agent." },
            { label: "SOUL.md", code: "Persona, voice, and behavioral style." },
            { label: "USER.md", code: "User preferences, long-term context, and working habits." },
            { label: "IDENTITY.md", code: "Agent name, theme, avatar, and identity metadata." },
            { label: "MEMORY.md", code: "Curated long-term memory with stable facts." },
            { label: "memory/YYYY-MM-DD.md", code: "Daily notes and short-term memory." },
            { label: "HEARTBEAT.md", code: "Periodic checks, proactive tasks, and reminder logic." },
            { label: "BOOT.md", code: "Startup instructions triggered on gateway boot via hooks." },
            { label: ".openclaw/", code: "Project-level config, runtime state, and local data." }
          ]
        },
        {
          title: "Memory & Models",
          description: "Keep memory search, indexing, model switching, and auth probes together so the first pass of debugging stays simple.",
          commands: [
            { label: "search memory", code: "openclaw memory search --query \"deployment notes\"" },
            { label: "memory status", code: "openclaw memory status" },
            { label: "force reindex", code: "openclaw memory index --force" },
            { label: "list models", code: "openclaw models list --provider anthropic" },
            { label: "set default model", code: "openclaw models set claude-3-5-sonnet" },
            { label: "model probe", code: "openclaw models status --probe" },
            { label: "setup provider token", code: "openclaw models auth setup-token --provider anthropic" }
          ]
        },
        {
          title: "Channel Management",
          description: "The official cheatsheet treats channels as a first-class operating surface. In practice, channel health often breaks before model config does.",
          commands: [
            { label: "add or update channel", code: "openclaw channels add" },
            { label: "list channels", code: "openclaw channels list" },
            { label: "channel probe", code: "openclaw channels status --probe" },
            { label: "login to WhatsApp", code: "openclaw channels login --channel whatsapp" },
            { label: "add Telegram", code: "openclaw channels add --channel telegram --token <token>" },
            { label: "add Discord", code: "openclaw channels add --channel discord --token <token>" },
            { label: "add Slack", code: "openclaw channels add --channel slack --bot-token <bot> --app-token <app>" }
          ]
        },
        {
          title: "Hooks & Skills",
          description: "Use these when you want boot logic, skill extensions, and community capabilities to become part of the workspace.",
          commands: [
            { label: "list hooks", code: "openclaw hooks list" },
            { label: "enable hook", code: "openclaw hooks enable boot-md" },
            { label: "list skills", code: "openclaw skills list" },
            { label: "check skill dependencies", code: "openclaw skills check" },
            { label: "search community skills", code: "clawhub search \"gmail\"" },
            { label: "install community skill", code: "clawhub install <slug>" }
          ]
        },
        {
          title: "Slash Commands",
          description: "These are the in-chat quick commands from the official cheatsheet for context switching, compacting conversations, and stopping work.",
          commands: [
            { label: "list contexts", code: "/context list" },
            { label: "switch context", code: "/context <id>" },
            { label: "compact context", code: "/compact" },
            { label: "new thread", code: "/new" },
            { label: "stop current action", code: "/stop" },
            { label: "TTS on", code: "/tts on" },
            { label: "TTS off", code: "/tts off" }
          ]
        },
        {
          title: "Automation & Research",
          description: "The official cheatsheet also includes quick entry points for browser automation, cron jobs, sessions, and heartbeat control.",
          commands: [
            { label: "browser status", code: "openclaw browser status" },
            { label: "start browser", code: "openclaw browser start" },
            { label: "browser snapshot", code: "openclaw browser snapshot" },
            { label: "list cron jobs", code: "openclaw cron list" },
            { label: "add cron job", code: "openclaw cron add" },
            { label: "show cron runs", code: "openclaw cron runs" },
            { label: "list agents", code: "openclaw agents list" },
            { label: "list sessions", code: "openclaw sessions list" },
            { label: "last heartbeat", code: "openclaw system heartbeat last" },
            { label: "enable heartbeat", code: "openclaw system heartbeat enable" },
            { label: "disable heartbeat", code: "openclaw system heartbeat disable" }
          ]
        }
      ],
      issues: [
        {
          title: "No DM reply",
          body: "Do not start by guessing it is a model issue. The official fast path starts with a live channel probe.",
          steps: [
            "Run openclaw channels status --probe",
            "Confirm the channel auth is still valid and the gateway is connected",
            "If it is Telegram or Discord, verify the bot token is still valid"
          ]
        },
        {
          title: "Silent in group chat",
          body: "This is often not a dead gateway. It is usually group permissions, allowlists, or mention rules on the channel side.",
          steps: [
            "Run openclaw channels status --probe",
            "Check group allowlists and mention / permission rules",
            "Prove the bot works in DM first, then return to the group chat"
          ]
        },
        {
          title: "Model auth expired or probe fails",
          body: "If the gateway runs but model calls fail immediately, inspect model auth before tweaking prompts.",
          steps: [
            "Run openclaw models status --probe",
            "Confirm the key, provider, and model name match",
            "If needed, rerun openclaw onboard or setup-token"
          ]
        },
        {
          title: "Gateway is down or unhealthy",
          body: "First separate service startup problems from channel connectivity problems. Mixing the two wastes time.",
          steps: [
            "Run openclaw gateway status",
            "Start or restart with openclaw gateway start or restart",
            "Run openclaw gateway in the foreground once and watch whether it exits immediately"
          ]
        },
        {
          title: "Memory search looks wrong",
          body: "The official cheatsheet path is to inspect memory status first, then decide whether the index needs a rebuild.",
          steps: [
            "Run openclaw memory status",
            "Confirm the vector index and provider look healthy",
            "If the index is stale, run openclaw memory index --force"
          ]
        },
        {
          title: "Everything feels weird",
          body: "When channel, model, and memory symptoms are still ambiguous, the shortest route back to clarity is a full doctor sweep.",
          steps: [
            "Run openclaw doctor",
            "Apply the explicit quick fixes from doctor first",
            "Once doctor is clean, return to channels / models / memory branches"
          ]
        }
      ]
    }
  };

  function currentLang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function renderExtras() {
    const root = document.getElementById("page-root");
    const issueRoot = document.getElementById("issue-sections");
    const input = document.getElementById("command-search");
    if (!root || !issueRoot || !input) return;

    let extraRoot = document.getElementById("command-extra-root");
    if (!extraRoot) {
      extraRoot = document.createElement("div");
      extraRoot.id = "command-extra-root";
      extraRoot.className = "grid gap-6 lg:grid-cols-2";
      issueRoot.insertAdjacentElement("afterend", extraRoot);
    }

    const text = extra[currentLang()];
    const q = input.value.trim().toLowerCase();
    const packs = text.packs.filter((item) =>
      `${item.title} ${item.description} ${item.commands.map((cmd) => `${cmd.label} ${cmd.code}`).join(" ")}`
        .toLowerCase()
        .includes(q)
    );
    const issues = text.issues.filter((item) =>
      `${item.title} ${item.body} ${item.steps.join(" ")}`.toLowerCase().includes(q)
    );

    extraRoot.innerHTML = `
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-white">${text.sectionTitle}</h2>
        ${packs
          .map(
            (pack) => `
          <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h3 class="text-lg font-semibold text-white">${pack.title}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-300">${pack.description}</p>
            <div class="mt-4 space-y-3">
              ${pack.commands
                .map(
                  (cmd) => `
                <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div class="flex items-center justify-between gap-3">
                    <div class="font-medium text-white">${cmd.label}</div>
                    <button data-extra-copy="${encodeURIComponent(cmd.code)}" class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 transition hover:bg-white/10">${text.copy}</button>
                  </div>
                  <pre class="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">${cmd.code}</pre>
                </div>
              `
                )
                .join("")}
            </div>
          </article>
        `
          )
          .join("")}
      </section>
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-white">${text.issueTitle}</h2>
        ${issues
          .map(
            (item) => `
          <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h3 class="text-lg font-semibold text-white">${item.title}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-300">${item.body}</p>
            <ul class="mt-4 space-y-2 text-sm text-slate-300">
              ${item.steps
                .map((step) => `<li class="rounded-2xl bg-slate-950/70 px-3 py-2">${step}</li>`)
                .join("")}
            </ul>
          </article>
        `
          )
          .join("")}
      </section>
    `;
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-extra-copy]");
    if (!button) return;
    navigator.clipboard.writeText(decodeURIComponent(button.dataset.extraCopy)).catch(() => {});
  });

  let observer = null;

  function start() {
    observer = new MutationObserver(() => {
      observer.disconnect();
      renderExtras();
      observer.observe(document.body, { childList: true, subtree: true });
    });
    renderExtras();
    const input = document.getElementById("command-search");
    if (input && !input.dataset.extraBound) {
      input.dataset.extraBound = "true";
      input.addEventListener("input", renderExtras);
    }
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
