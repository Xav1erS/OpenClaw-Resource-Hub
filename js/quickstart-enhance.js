(function () {
  const copy = {
    zh: {
      chooseTitle: "先选一种启动方式",
      chooseBody:
        "官方 Quick Start 的主线很清楚：安装 OpenClaw、补上 API Key、连接一个聊天渠道、启动 gateway，然后发出第一条消息。这里保留同样的流程，并把每一步为什么要做写得更细。",
      paths: [
        {
          title: "我熟悉终端，想先跑通",
          body: "适合已经能接受复制命令、看日志和调整环境变量的人。目标是先把官方推荐链路一次跑通。",
          badge: "Fast Path"
        },
        {
          title: "我是第一次接触，想按步骤来",
          body: "完全按官方 Quick Start 走：打开终端、安装、拿 API Key、onboard、建 Telegram 机器人、启动 gateway、发第一条消息。",
          badge: "Step-by-step"
        }
      ],
      copyCommands: "复制命令",
      copied: "已复制",
      trackerTitle: "官方 5 步进度",
      trackerBody:
        "官方文档把第一次成功拆成 5 个关键结果。先把这 5 件事完成，再去扩展模板、工作流或更复杂的部署。",
      tracker: [
        "已安装 OpenClaw",
        "已添加可用的 API Key",
        "已连接一个聊天渠道（推荐 Telegram）",
        "已启动 openclaw gateway",
        "已给机器人发出第一条消息"
      ],
      tracks: {
        windows: {
          installCommand:
            "curl -fsSL https://openclaw.ai/install.cmd -o install.cmd && install.cmd && del install.cmd",
          fastNote:
            "Windows 上先用官方一键安装脚本最稳。安装后如果命令找不到，先重开 Windows Terminal，再继续 onboard。",
          guidedNote:
            "如果 PowerShell 提示权限或 PATH 问题，不要先改一堆配置，先完成安装、重新打开终端，再执行 openclaw onboard。"
        },
        macos: {
          installCommand: "curl -fsSL https://openclaw.ai/install.sh | bash",
          fastNote:
            "macOS 和 Linux 都用官方 install.sh。第一次跑通时先用默认推荐模型，不要一开始就改成高成本配置。",
          guidedNote:
            "安装脚本会自动准备依赖。等安装结束后再继续 API Key 和频道配置，不要边装边手动改目录。"
        },
        linux: {
          installCommand: "curl -fsSL https://openclaw.ai/install.sh | bash",
          fastNote:
            "Linux 也走官方 install.sh。第一次只验证前台运行成功，不要先接 systemd、反向代理或长驻进程。",
          guidedNote:
            "先证明前台 gateway 能正常收发消息，再考虑长期运行方案。这样排错范围最小。"
        }
      }
    },
    en: {
      chooseTitle: "Choose how you want to start",
      chooseBody:
        "The official Quick Start follows one clear chain: install OpenClaw, add an API key, connect a chat channel, start the gateway, and send the first message. This page keeps that flow and adds a bit more explanation around each step.",
      paths: [
        {
          title: "I know terminals and want the fastest path",
          body: "Best for users who are comfortable copying commands, checking logs, and fixing environment issues. The goal is to complete the official happy path once.",
          badge: "Fast Path"
        },
        {
          title: "This is my first time and I want steps",
          body: "Follow the official Quick Start flow exactly: open a terminal, install, get an API key, run onboard, create a Telegram bot, start the gateway, and send the first message.",
          badge: "Step-by-step"
        }
      ],
      copyCommands: "Copy Commands",
      copied: "Copied",
      trackerTitle: "Official 5-step progress",
      trackerBody:
        "The official guide reduces the first win to 5 concrete outcomes. Finish these before you branch into templates, workflows, or heavier deployment work.",
      tracker: [
        "OpenClaw is installed",
        "A working API key has been added",
        "A chat channel is connected",
        "openclaw gateway is running",
        "The first message has been sent to the bot"
      ],
      tracks: {
        windows: {
          installCommand:
            "curl -fsSL https://openclaw.ai/install.cmd -o install.cmd && install.cmd && del install.cmd",
          fastNote:
            "On Windows, the official one-line installer is the safest starting point. If the command is not found after install, reopen Windows Terminal before running onboard.",
          guidedNote:
            "If PowerShell complains about permissions or PATH, do not start by editing a lot of config. Finish the installer, reopen the terminal, then run openclaw onboard."
        },
        macos: {
          installCommand: "curl -fsSL https://openclaw.ai/install.sh | bash",
          fastNote:
            "macOS and Linux both use the official install.sh flow. For the first run, stick to the default recommended model instead of optimizing everything.",
          guidedNote:
            "The installer prepares the dependencies for you. Let it finish first, then move to API key and channel setup."
        },
        linux: {
          installCommand: "curl -fsSL https://openclaw.ai/install.sh | bash",
          fastNote:
            "Linux also starts with the official install.sh. First prove the foreground gateway run works before adding systemd, tunnels, or background supervision.",
          guidedNote:
            "Get one clean foreground run first, then decide how you want to make it persistent."
        }
      }
    }
  };

  const modeContent = {
    zh: {
      fast: {
        commandTitle: "官方快速链路",
        commandBody:
          "这条路径保留官方 Quick Start 的主命令顺序，只压缩掉解释。顺序不要变：安装，onboard，gateway。",
        noteTitle: "这一步在验证什么",
        noteBody:
          "如果这组命令能走通，说明安装、Key、频道配置和 gateway 启动已经基本成立，后面再去细化模板和部署。",
        stepsTitle: "Fast Path 的 3 个动作",
        stepsBody:
          "适合已经知道怎么开终端、复制命令和读日志的人。先完成最小可运行链路，再做扩展。",
        stepCards: [
          {
            title: "安装 OpenClaw",
            body: "直接用官方安装脚本，让 Node.js 和依赖按官方路径装好。"
          },
          {
            title: "跑 onboard 向导",
            body: "在向导里填 API Key，并优先选 Telegram 作为第一个聊天渠道。"
          },
          {
            title: "启动 gateway 并发消息",
            body: "执行 openclaw gateway，随后立刻给机器人发一条消息确认它真的能响应。"
          }
        ],
        successTitle: "什么算第一次成功",
        successBody:
          "不是把所有配置都做完，而是你已经能安装、能启动、能让机器人真正回你第一条消息。",
        verifyTitle: "现在就检查这些信号",
        verifyItems: [
          "安装脚本完成，没有中途退出",
          "openclaw onboard 已保存 API Key 和一个聊天渠道",
          "gateway 启动后终端没有立即报错退出",
          "你已经在 Telegram 或其他渠道收到第一条机器人回复"
        ],
        nextTitle: "跑通之后去哪里",
        nextCards: [
          {
            title: "命令或日志还有问题",
            body: "先去故障排除，按 gateway、channels、models、memory 的顺序缩小范围。",
            href: "/pages/troubleshooting.html",
            cta: "打开故障排除"
          },
          {
            title: "已经跑通，想立刻做事",
            body: "去模板库，直接拿一个接近你场景的结构开始改。",
            href: "/pages/task-library.html",
            cta: "打开模板库"
          },
          {
            title: "担心成本和模型选择",
            body: "先去成本页估一遍日成本和月成本，再决定怎么扩。",
            href: "/pages/cost-calculator.html",
            cta: "打开成本页"
          }
        ],
        trackerTitle: "Fast Path 检查表",
        trackerBody:
          "这不是完整部署清单，而是官方 quick start 的最小通过标准。"
      },
      guided: {
        commandTitle: "官方 Step-by-step 命令流",
        commandBody:
          "这组命令对应官方文档的核心主线：安装 OpenClaw、运行 onboard、启动 gateway。中间的 API Key 和 Telegram Bot 会在步骤卡片里展开解释。",
        noteTitle: "怎么用这组命令",
        noteBody:
          "先执行安装命令；安装完成后运行 openclaw onboard，填好 API Key、模型和 Telegram；最后执行 openclaw gateway，并给机器人发第一条消息。",
        stepsTitle: "Step-by-step 的 7 个步骤",
        stepsBody:
          "这部分与官方 Quick Start 对齐，并补充了每一步你应该看到什么、为什么要这么做。",
        stepCards: [
          {
            title: "打开终端",
            body: "macOS 用 Spotlight 搜 Terminal，Windows 用 Win + X 打开 Windows Terminal 或 PowerShell。看到闪烁光标就对了。"
          },
          {
            title: "安装 OpenClaw",
            body: "复制官方安装命令执行。首次安装通常需要 2 到 5 分钟，期间会检查系统并安装所需工具。"
          },
          {
            title: "准备 API Key",
            body: "去 Anthropic 控制台创建一个以 sk-ant- 开头的 API Key。先只准备一个可用 key，不要同时接多家模型。"
          },
          {
            title: "运行 openclaw onboard",
            body: "向导里按顺序填 API Key、模型和聊天渠道。第一次建议选 Claude Sonnet 和 Telegram。"
          },
          {
            title: "创建 Telegram Bot",
            body: "在 Telegram 里找 @BotFather，发送 /newbot，拿到 bot token 后粘贴回 onboard 向导。"
          },
          {
            title: "启动 openclaw gateway",
            body: "执行 openclaw gateway，保持这个终端窗口开着。看到持续输出日志，说明服务已经在前台运行。"
          },
          {
            title: "给机器人发第一条消息",
            body: "在 Telegram 中搜索你刚创建的 bot 用户名，发送 Hello。只要收到回复，这次 Quick Start 就真正完成了。"
          }
        ],
        successTitle: "官方 Quick Start 完成的标准",
        successBody:
          "真正完成，不是只把 CLI 装上，而是已经拿到 API Key、接好聊天渠道、启动 gateway，并和机器人完成第一轮对话。",
        verifyTitle: "逐项确认这些结果",
        verifyItems: [
          "安装结束后可以直接运行 openclaw 命令",
          "onboard 过程中已经填入 API Key、模型和 Telegram bot token",
          "openclaw gateway 启动后终端持续输出运行日志",
          "你已在 Telegram 中收到机器人回复，而不是只看到本地命令执行成功"
        ],
        nextTitle: "第一次跑通后该去哪里",
        nextCards: [
          {
            title: "想继续排错和稳定运行",
            body: "先去故障排除，把 gateway、channels、memory 和 doctor 的排查顺序掌握住。",
            href: "/pages/troubleshooting.html",
            cta: "去故障排除"
          },
          {
            title: "想开始一个真实任务",
            body: "去模板库选一个现成起点，不要从空白配置重新拼。",
            href: "/pages/task-library.html",
            cta: "去模板库"
          },
          {
            title: "想控制模型与花费",
            body: "去成本页估算不同模型和频率下的预算区间。",
            href: "/pages/cost-calculator.html",
            cta: "去成本页"
          }
        ],
        trackerTitle: "第一次成功追踪器",
        trackerBody:
          "只要这 5 项都完成，你就已经和官方文档定义的 first success 对齐。"
      }
    },
    en: {
      fast: {
        commandTitle: "Official fast path",
        commandBody:
          "This path keeps the official Quick Start command order and only compresses the explanations. Do not change the sequence yet: install, onboard, gateway.",
        noteTitle: "What this proves",
        noteBody:
          "If this command flow works, installation, API key setup, channel connection, and gateway startup are all basically working. You can optimize after that.",
        stepsTitle: "Fast Path in 3 actions",
        stepsBody:
          "Best for people who already know how to open a terminal, paste commands, and read logs. Get one official happy-path run first.",
        stepCards: [
          {
            title: "Install OpenClaw",
            body: "Use the official installer so Node.js and the base dependencies follow the official path."
          },
          {
            title: "Run the onboard wizard",
            body: "Add the API key inside the wizard and choose Telegram as the first chat channel."
          },
          {
            title: "Start the gateway and send a message",
            body: "Run openclaw gateway, then immediately message the bot to confirm that it really responds."
          }
        ],
        successTitle: "What counts as first success",
        successBody:
          "Not that every config is finished, but that you can install, start, and get a real reply from your bot.",
        verifyTitle: "Check these signals now",
        verifyItems: [
          "The installer completes without exiting early",
          "openclaw onboard saved an API key and one chat channel",
          "The gateway keeps running instead of failing immediately",
          "You received the first reply in Telegram or your chosen channel"
        ],
        nextTitle: "Where to go after the first run",
        nextCards: [
          {
            title: "Commands or logs still look wrong",
            body: "Go to Troubleshooting and narrow the issue through gateway, channels, models, and memory.",
            href: "/pages/troubleshooting.html",
            cta: "Open Troubleshooting"
          },
          {
            title: "The setup works and you want to build",
            body: "Open Task Library and start from a template close to your real use case.",
            href: "/pages/task-library.html",
            cta: "Open Task Library"
          },
          {
            title: "You need cost clarity",
            body: "Estimate daily and monthly spend before expanding your setup.",
            href: "/pages/cost-calculator.html",
            cta: "Open Cost Calculator"
          }
        ],
        trackerTitle: "Fast Path checklist",
        trackerBody:
          "This is not the full deployment checklist. It is the minimum pass condition for the official quick start."
      },
      guided: {
        commandTitle: "Official step-by-step command flow",
        commandBody:
          "This command block mirrors the core flow in the official docs: install OpenClaw, run onboard, then start the gateway. The API key and Telegram bot work happen between those commands and are expanded in the step cards below.",
        noteTitle: "How to use this command block",
        noteBody:
          "Run the install command first. After installation finishes, run openclaw onboard and fill in the API key, model, and Telegram details. Then run openclaw gateway and send your first message.",
        stepsTitle: "Step-by-step in 7 moves",
        stepsBody:
          "This section follows the official Quick Start and adds more detail about what each step is verifying.",
        stepCards: [
          {
            title: "Open a terminal",
            body: "On macOS, use Spotlight and open Terminal. On Windows, use Win + X and open Windows Terminal or PowerShell. The blinking cursor is where you will paste commands."
          },
          {
            title: "Install OpenClaw",
            body: "Paste the official install command and press Enter. The first install usually takes 2 to 5 minutes while it checks the system and installs required tools."
          },
          {
            title: "Get an API key",
            body: "Create one Anthropic API key from the Anthropic console. For the first run, keep it simple and use one working key instead of mixing multiple providers."
          },
          {
            title: "Run openclaw onboard",
            body: "Use the setup wizard to enter the API key, pick a model, and choose a chat channel. The easiest first channel is Telegram."
          },
          {
            title: "Create a Telegram bot",
            body: "In Telegram, talk to @BotFather, run /newbot, and copy the bot token back into the onboard wizard."
          },
          {
            title: "Start openclaw gateway",
            body: "Run openclaw gateway and leave that terminal window open. Continuous log output means the gateway is alive."
          },
          {
            title: "Send the first message",
            body: "Search for your bot username in Telegram and send Hello. When it replies, the Quick Start is genuinely complete."
          }
        ],
        successTitle: "What completion means in the official guide",
        successBody:
          "Completion is not just installing the CLI. It means the API key exists, the chat channel is connected, the gateway is live, and a real conversation happened.",
        verifyTitle: "Confirm these outcomes one by one",
        verifyItems: [
          "You can run openclaw commands after installation",
          "The onboard flow saved the API key, model, and Telegram bot token",
          "The gateway keeps printing runtime logs after startup",
          "You received a real bot reply in Telegram, not just a local success message"
        ],
        nextTitle: "Where to go after the first successful run",
        nextCards: [
          {
            title: "You want debugging depth first",
            body: "Use Troubleshooting next so you can localize gateway, channel, model, and memory failures before scaling up.",
            href: "/pages/troubleshooting.html",
            cta: "Go to Troubleshooting"
          },
          {
            title: "You want to try a real task",
            body: "Open Task Library and start from a proven template instead of rebuilding from scratch.",
            href: "/pages/task-library.html",
            cta: "Go to Task Library"
          },
          {
            title: "You want model and cost control",
            body: "Use the cost page to estimate budget ranges before you expand usage.",
            href: "/pages/cost-calculator.html",
            cta: "Go to Cost Calculator"
          }
        ],
        trackerTitle: "First-success tracker",
        trackerBody:
          "If these 5 items are done, you are aligned with the first-success definition in the official quick start."
      }
    }
  };

  function lang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function getText() {
    return copy[lang()];
  }

  function getModeContent(language, mode) {
    const table = modeContent[language] || modeContent.en;
    return table[mode] || table.fast;
  }

  function currentTrack() {
    const active = Array.from(document.querySelectorAll("[data-track]")).find((button) =>
      button.className.includes("bg-red-500")
    );
    return active ? active.dataset.track : "windows";
  }

  function getTrackerKey() {
    return `openclaw-quickstart-tracker-${lang()}`;
  }

  function getTrackerState() {
    try {
      return JSON.parse(localStorage.getItem(getTrackerKey()) || "{}");
    } catch (_error) {
      return {};
    }
  }

  function setTrackerState(next) {
    localStorage.setItem(getTrackerKey(), JSON.stringify(next));
  }

  function getModeKey() {
    return "openclaw-quickstart-mode";
  }

  function getMode() {
    const stored = localStorage.getItem(getModeKey());
    return stored === "guided" ? "guided" : "fast";
  }

  function setMode(next) {
    localStorage.setItem(getModeKey(), next === "guided" ? "guided" : "fast");
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function getCommandBlock(language, track, mode) {
    const commentInstall = language === "zh" ? "# 安装 OpenClaw" : "# Install OpenClaw";
    const commentOnboard =
      language === "zh" ? "# 运行设置向导" : "# Run the setup wizard";
    const commentGateway =
      language === "zh" ? "# 启动 gateway" : "# Start the gateway";

    if (mode === "guided") {
      return `${commentInstall}\n${track.installCommand}\n\n${commentOnboard}\nopenclaw onboard\n\n${commentGateway}\nopenclaw gateway`;
    }

    return `${track.installCommand}\nopenclaw onboard\nopenclaw gateway`;
  }

  function renderExtras() {
    const root = document.getElementById("page-root");
    const panel = document.getElementById("quickstart-panel");
    const wrapper = root ? root.querySelector(":scope > div") : null;
    const aside = root ? root.querySelector(":scope > div > aside") : null;
    const mainSection = root ? root.querySelector(":scope > div > section") : null;
    const panelSection = panel ? panel.parentElement : null;
    if (!root || !panel || !aside || !mainSection || !panelSection) return;

    const language = lang();
    const text = getText();
    const trackId = currentTrack();
    const track = text.tracks[trackId] || text.tracks.windows;
    const trackerState = getTrackerState();
    const mode = getMode();
    const content = getModeContent(language, mode);
    const commandBlock = getCommandBlock(language, track, mode);
    const trackNote = mode === "guided" ? track.guidedNote : track.fastNote;

    wrapper.className = "grid gap-6";
    mainSection.className = "space-y-5";

    let choose = document.querySelector("[data-quickstart-choose]");
    if (!choose) {
      choose = document.createElement("article");
      choose.className =
        "mb-5 rounded-[28px] border border-red-400/20 bg-[linear-gradient(135deg,rgba(127,29,29,0.32),rgba(69,10,10,0.18))] p-6 shadow-2xl shadow-red-950/20";
      choose.setAttribute("data-quickstart-choose", "true");
      panelSection.insertBefore(choose, panel);
    }
    choose.innerHTML = `
      <div class="max-w-3xl">
        <h2 class="text-2xl font-semibold text-white">${text.chooseTitle}</h2>
        <p class="mt-3 text-sm leading-7 text-slate-200">${text.chooseBody}</p>
      </div>
      <div class="mt-5 grid gap-4 xl:grid-cols-2">
        ${text.paths
          .map((item, index) => {
            const key = index === 0 ? "fast" : "guided";
            const active = mode === key;
            return `
          <button type="button" data-start-mode="${key}" class="rounded-3xl border p-5 text-left transition ${
            active
              ? "border-red-400/40 bg-red-500/12 shadow-lg shadow-red-950/20"
              : "border-white/10 bg-white/[0.03] hover:border-red-400/25 hover:bg-white/[0.05]"
          }">
            <div class="inline-flex rounded-full border ${
              active
                ? "border-red-300/30 bg-red-400/15 text-red-100"
                : "border-white/10 bg-white/5 text-slate-300"
            } px-3 py-1 text-xs uppercase tracking-[0.22em]">${item.badge}</div>
            <h3 class="mt-4 text-lg font-semibold text-white">${item.title}</h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">${item.body}</p>
          </button>
        `;
          })
          .join("")}
      </div>
    `;

    if (panel.parentElement !== panelSection) {
      panelSection.insertBefore(panel, choose.nextSibling);
    }

    panel.className =
      "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-slate-950/20";
    panel.innerHTML = `
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="max-w-2xl">
          <div class="inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-red-200">${content.commandTitle}</div>
          <p class="mt-4 text-sm leading-7 text-slate-300">${content.commandBody}</p>
        </div>
        <button id="copy-quickstart-command" class="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400">${text.copyCommands}</button>
      </div>
      <div class="mt-5 grid gap-4">
        <pre class="overflow-auto whitespace-pre-wrap rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-sm leading-7 text-slate-200">${escapeHtml(
          commandBlock
        )}</pre>
        <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <div class="text-xs uppercase tracking-[0.24em] text-red-200">${content.noteTitle}</div>
          <p class="mt-4 text-sm leading-7 text-slate-300">${content.noteBody}</p>
          <div class="mt-4 rounded-2xl bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300">${trackNote}</div>
        </div>
      </div>
    `;

    let checklistArticle = document.querySelector("[data-quickstart-tracker-card]");
    if (!checklistArticle) {
      checklistArticle = aside.querySelector("article");
      if (checklistArticle) {
        checklistArticle.setAttribute("data-quickstart-tracker-card", "true");
      }
    }

    aside.className = "hidden";
    aside.innerHTML = "";

    let steps = document.querySelector("[data-quickstart-steps]");
    if (!steps) {
      steps = document.createElement("article");
      steps.className = "mt-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-6";
      steps.setAttribute("data-quickstart-steps", "true");
      panel.insertAdjacentElement("afterend", steps);
    }
    steps.innerHTML = `
      <div class="max-w-3xl">
        <h2 class="text-2xl font-semibold text-white">${content.stepsTitle}</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">${content.stepsBody}</p>
      </div>
      <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        ${content.stepCards
          .map(
            (item, index) => `
          <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-red-400/25 bg-red-500/10 text-sm font-semibold text-red-200">${index + 1}</div>
            <h3 class="mt-4 text-base font-semibold text-white">${item.title}</h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">${item.body}</p>
          </article>
        `
          )
          .join("")}
      </div>
    `;

    let success = document.querySelector("[data-quickstart-success]");
    if (!success) {
      success = document.createElement("article");
      success.className = "mt-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-6";
      success.setAttribute("data-quickstart-success", "true");
      steps.insertAdjacentElement("afterend", success);
    }
    success.innerHTML = `
      <div class="grid gap-5 lg:grid-cols-2">
        <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <h2 class="text-xl font-semibold text-white">${content.successTitle}</h2>
          <p class="mt-4 text-sm leading-7 text-slate-300">${content.successBody}</p>
        </div>
        <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <h2 class="text-xl font-semibold text-white">${content.verifyTitle}</h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            ${content.verifyItems
              .map((item) => `<li class="rounded-2xl bg-white/5 px-4 py-3">${item}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    `;

    let nextMain = document.querySelector("[data-quickstart-next-main]");
    if (!nextMain) {
      nextMain = document.createElement("article");
      nextMain.className = "mt-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-6";
      nextMain.setAttribute("data-quickstart-next-main", "true");
      success.insertAdjacentElement("afterend", nextMain);
    }
    nextMain.innerHTML = `
      <h2 class="text-2xl font-semibold text-white">${content.nextTitle}</h2>
      <div class="mt-5 grid gap-4 lg:grid-cols-3">
        ${content.nextCards
          .map(
            (item) => `
          <a href="${item.href}" class="block rounded-3xl border border-white/10 bg-slate-950/70 p-5 transition hover:border-red-400/40 hover:bg-slate-950">
            <div class="font-medium text-white">${item.title}</div>
            <p class="mt-3 text-sm leading-7 text-slate-300">${item.body}</p>
            <div class="mt-3 text-xs uppercase tracking-[0.24em] text-red-200">${item.cta}</div>
          </a>
        `
          )
          .join("")}
      </div>
    `;

    if (checklistArticle) {
      if (checklistArticle.parentElement !== panelSection) {
        panelSection.insertBefore(checklistArticle, nextMain.nextSibling);
      }
      checklistArticle.className =
        "rounded-[28px] border border-red-400/20 bg-[linear-gradient(180deg,rgba(127,29,29,0.2),rgba(15,23,42,0.92))] p-6";
      checklistArticle.innerHTML = `
        <h2 class="text-2xl font-semibold text-white">${text.trackerTitle}</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">${text.trackerBody}</p>
        <div id="quickstart-checklist" class="mt-5 space-y-3">
          ${text.tracker
            .map(
              (item, index) => `
            <label class="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4">
              <input data-step-check="${index}" type="checkbox" class="mt-1 h-4 w-4 accent-red-400" ${
                trackerState[index] ? "checked" : ""
              }>
              <span class="text-sm leading-7 text-slate-200">${item}</span>
            </label>
          `
            )
            .join("")}
        </div>
      `;
    }

    const copyButton = document.getElementById("copy-quickstart-command");
    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(commandBlock);
          copyButton.textContent = text.copied;
          setTimeout(() => {
            copyButton.textContent = text.copyCommands;
          }, 1200);
        } catch (_error) {}
      });
    }

    const checklistRoot = document.getElementById("quickstart-checklist");
    if (checklistRoot && !checklistRoot.dataset.bound) {
      checklistRoot.dataset.bound = "true";
      checklistRoot.addEventListener("change", (event) => {
        const input = event.target.closest("[data-step-check]");
        if (!input) return;
        const stored = getTrackerState();
        stored[input.dataset.stepCheck] = input.checked;
        setTrackerState(stored);
      });
    }

    document.querySelectorAll(".quickstart-tab").forEach((button) => {
      button.className = `quickstart-tab rounded-full border px-4 py-2 text-sm transition ${
        button.dataset.track === trackId
          ? "border-red-400/40 bg-red-500 text-white"
          : "border-white/10 text-slate-200 hover:border-red-400/40"
      }`;
    });
  }

  let observer = null;

  function start() {
    const root = document.getElementById("page-root");
    if (root && !root.dataset.quickstartInteractiveBound) {
      root.dataset.quickstartInteractiveBound = "true";
      root.addEventListener("click", (event) => {
        const modeButton = event.target.closest("[data-start-mode]");
        if (modeButton) {
          setMode(modeButton.dataset.startMode);
          renderExtras();
          return;
        }

        const trackButton = event.target.closest("[data-track]");
        if (trackButton) {
          document.querySelectorAll("[data-track]").forEach((button) => {
            const active = button === trackButton;
            button.className = `quickstart-tab rounded-full border px-4 py-2 text-sm transition ${
              active
                ? "border-red-400/40 bg-red-500 text-white"
                : "border-white/10 text-slate-200 hover:border-red-400/40"
            }`;
          });
          renderExtras();
        }
      });
    }

    observer = new MutationObserver(() => {
      observer.disconnect();
      renderExtras();
      observer.observe(document.body, { childList: true, subtree: true });
    });

    renderExtras();
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
