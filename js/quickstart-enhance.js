(function () {
  const copy = {
    zh: {
      chooseTitle: "先选一种启动方式",
      chooseBody: "官方 Quick Start 的优点是分步明确。我们的价值不该只是重复官方，而是让第一次接触 OpenClaw 的人也知道自己正在做什么、下一步该去哪里。",
      paths: [
        {
          title: "我会用终端，想最快跑通",
          body: "适合已经能接受复制命令、编辑配置、看日志的人。先做最小运行，再决定要不要扩链路。",
          badge: "Fast Path"
        },
        {
          title: "我第一次接触，希望按步骤来",
          body: "适合小白。你只需要先完成 5 个动作：安装、填 key、做体检、跑一次、看结果。",
          badge: "Step-by-step"
        }
      ],
      trackerTitle: "第一次跑通追踪器",
      trackerBody: "把第一次成功拆成 5 个动作。每一步都完成后，你再去模板库或命令中心，不然很容易迷路。",
      stepsTitle: "最短成功路径",
      stepsBody: "不管你选哪个系统，先把这一条链路跑通。不要一开始就接复杂 workflow。",
      fastCommandTitle: "推荐的一次性起跑命令",
      fastCommandBody: "先初始化、填密钥、跑体检，再做一次最小启动。这里的顺序不要打乱。",
      copyCommands: "复制命令",
      copied: "已复制",
      stepCards: [
        { title: "安装运行环境", body: "先确认 Node.js 18+ 正常，再安装 OpenClaw CLI。" },
        { title: "准备 API Key", body: "把 key 放进 .env 或你明确知道的配置位置，不要分散在多个地方。" },
        { title: "运行健康检查", body: "先执行 doctor，提前发现 PATH、权限、环境变量问题。" },
        { title: "启动最小任务", body: "只跑一次最简单的链路，确认不是 401、429 或 timeout。" },
        { title: "确认第一次成功", body: "看日志、看输出、看成本，然后再决定下一步去模板库、命令中心还是成本页。" }
      ],
      tracker: [
        "Node.js 18+ 已安装",
        "可用的 API Key 已放到正确位置",
        "已经执行 openclaw doctor",
        "已经成功完成一次最小运行",
        "已经看过日志和成本结果"
      ],
      verifyTitle: "第一次成功，至少要看到这些信号",
      verifyItems: [
        "命令不是直接报错退出",
        "日志里没有 401 / 429 / timeout",
        "你知道当前用的是哪个模型",
        "你知道下一步是去命令中心、模板库还是成本页"
      ],
      firstSuccessTitle: "如果你是第一次接触终端",
      firstSuccessBody: "只记住一件事：你不是在“学完 OpenClaw”后才能开始，而是先完成一次最小成功，再逐步加内容。",
      nextTitle: "跑通之后该去哪",
      nextCards: [
        { title: "环境或报错问题", body: "去命令中心查命令、配置片段和故障动作。", href: "/pages/command-center.html", cta: "打开命令中心" },
        { title: "已经能跑，想马上做事", body: "去模板库选一个现成结构，先预览代码块再复制。", href: "/pages/task-library.html", cta: "打开模板库" },
        { title: "担心预算失控", body: "先去成本计算器算一下日成本和月成本。", href: "/pages/cost-calculator.html", cta: "打开成本页" }
      ],
      tracks: {
        windows: {
          command: `npm install -g openclaw-cli\nopenclaw init\nopenclaw doctor\nopenclaw start`,
          note: "Windows 最常见的问题是 PowerShell 没拿到环境变量，或者 PATH 没刷新。"
        },
        macos: {
          command: `brew install node\nnpm install -g openclaw-cli\nopenclaw doctor\nopenclaw start`,
          note: "macOS 上先用轻量模型做 smoke test，不要第一步就上高成本模型。"
        },
        linux: {
          command: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt-get install -y nodejs\nnpm install -g openclaw-cli\nopenclaw doctor\nopenclaw start`,
          note: "Linux 先确认前台运行没问题，再考虑 systemd 和长时间守护。"
        }
      }
    },
    en: {
      chooseTitle: "Choose how you want to start",
      chooseBody: "The official Quick Start is strong because it is linear and easy to follow. Our version should go further by helping beginners understand what each step means and what to do next after the first successful run.",
      paths: [
        {
          title: "I know terminals and want the fastest path",
          body: "Best for users who are comfortable copying commands, editing config, and checking logs. Get one minimal run working first.",
          badge: "Fast Path"
        },
        {
          title: "This is my first time and I want steps",
          body: "Best for beginners. You only need five actions: install, add the key, run diagnostics, start once, and confirm the output.",
          badge: "Step-by-step"
        }
      ],
      trackerTitle: "First successful run tracker",
      trackerBody: "Break the first win into five concrete actions. Only move to templates or deeper docs after these are done.",
      stepsTitle: "Shortest successful path",
      stepsBody: "No matter which environment you choose, get this one chain working before you attach heavier workflows.",
      fastCommandTitle: "Recommended launch command sequence",
      fastCommandBody: "Initialize first, add the key, run diagnostics, then start one minimal run. Do not change the order yet.",
      copyCommands: "Copy Commands",
      copied: "Copied",
      stepCards: [
        { title: "Install the runtime", body: "Confirm Node.js 18+ works, then install the OpenClaw CLI." },
        { title: "Prepare one API key", body: "Put the key in one clear place such as .env. Do not scatter it across multiple configs." },
        { title: "Run diagnostics", body: "Use doctor before the first launch so PATH, permission, and env issues surface early." },
        { title: "Start one minimal run", body: "Only run the smallest chain once. Do not attach a heavy workflow yet." },
        { title: "Confirm the first win", body: "Check logs, output, and cost. Then decide whether your next page is Command Center, Task Library, or Cost Calculator." }
      ],
      tracker: [
        "Node.js 18+ is installed",
        "A working API key is in the right place",
        "openclaw doctor has been run",
        "One minimal run completed successfully",
        "Logs and cost have been checked"
      ],
      verifyTitle: "These are the signals of a real first success",
      verifyItems: [
        "The command does not exit immediately with an error",
        "Logs show no 401 / 429 / timeout",
        "You know which model is currently being used",
        "You know whether to go to Command Center, Task Library, or Cost Calculator next"
      ],
      firstSuccessTitle: "If this is your first terminal workflow",
      firstSuccessBody: "Do not try to learn all of OpenClaw first. Get one small success, then expand from there.",
      nextTitle: "After it works, go here next",
      nextCards: [
        { title: "Setup or runtime issue", body: "Use Command Center for commands, snippets, and troubleshooting steps.", href: "/pages/command-center.html", cta: "Open Command Center" },
        { title: "Ready to ship something", body: "Use Task Library and start from a proven structure after previewing the code.", href: "/pages/task-library.html", cta: "Open Task Library" },
        { title: "Need budget control", body: "Use Cost Calculator early so you know the daily and monthly spend.", href: "/pages/cost-calculator.html", cta: "Open Cost Calculator" }
      ],
      tracks: {
        windows: {
          command: `npm install -g openclaw-cli\nopenclaw init\nopenclaw doctor\nopenclaw start`,
          note: "The most common Windows issue is PowerShell not loading env vars or PATH not refreshing."
        },
        macos: {
          command: `brew install node\nnpm install -g openclaw-cli\nopenclaw doctor\nopenclaw start`,
          note: "On macOS, start with a lightweight model for the first smoke test."
        },
        linux: {
          command: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt-get install -y nodejs\nnpm install -g openclaw-cli\nopenclaw doctor\nopenclaw start`,
          note: "On Linux, prove the foreground run first before wiring systemd."
        }
      }
    }
  };

  function lang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function getText() {
    return copy[lang()];
  }

  function currentTrack() {
    const active = Array.from(document.querySelectorAll("[data-track]")).find((button) => button.className.includes("bg-red-500"));
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
    return `openclaw-quickstart-mode-${lang()}`;
  }

  function getMode() {
    const stored = localStorage.getItem(getModeKey());
    return stored === "guided" ? "guided" : "fast";
  }

  function setMode(next) {
    localStorage.setItem(getModeKey(), next === "guided" ? "guided" : "fast");
  }

  function getModeContent(language, mode) {
    const table = {
      zh: {
        fast: {
          commandTitle: "最快起步命令",
          commandBody: "适合已经能接受复制命令、编辑配置和看日志的人。先跑通最小链路，再考虑要不要扩功能。",
          noteTitle: "这一步的目标",
          noteBody: "先确认命令、环境变量和 doctor 都正常，不要一开始就接复杂 workflow。",
          stepsTitle: "Fast Path 的 3 步",
          stepsBody: "这条路只追求一件事：先在本机跑通最小链路。",
          stepCards: [
            { title: "安装并初始化", body: "安装 CLI，立刻执行 init，确保配置文件生成正常。" },
            { title: "跑 doctor", body: "先把 PATH、权限、环境变量和模型连通性问题排掉。" },
            { title: "做一次最小运行", body: "只运行一次最简单任务，确认不是 401、429 或 timeout。" }
          ],
          successTitle: "Fast Path 成功的标准",
          successBody: "你不需要一次把整套系统学完。只要命令能跑、日志正常、你知道当前模型是谁，这一轮就算成功。",
          verifyTitle: "现在就检查这些",
          verifyItems: [
            "CLI 命令没有直接报错退出",
            "doctor 没有报 PATH 或权限问题",
            "日志里没有 401 / 429 / timeout",
            "你知道下一个页面该去命令中心、模板库还是成本页"
          ],
          nextTitle: "跑通后下一步",
          nextCards: [
            { title: "要继续排错", body: "命令、日志或配置哪里不稳，就立刻去命令中心。", href: "/pages/command-center.html", cta: "打开命令中心" },
            { title: "要立刻做事", body: "去模板库找一个现成结构，先预览再复制。", href: "/pages/task-library.html", cta: "打开模板库" },
            { title: "要控制预算", body: "先算一遍日成本和月成本，避免刚跑通就超预算。", href: "/pages/cost-calculator.html", cta: "打开成本页" }
          ],
          trackerTitle: "Fast Path 检查表",
          trackerBody: "这不是完整部署清单，而是“本机已经跑起来”的最小验证。"
        },
        guided: {
          commandTitle: "跟着这组命令一步一步做",
          commandBody: "适合第一次接触 OpenClaw。按顺序执行，不要跳步，也不要先改一堆配置。",
          noteTitle: "这一轮你在做什么",
          noteBody: "你现在不是在“搭完整系统”，而是在完成第一次成功启动，确认环境、密钥和最小任务都通了。",
          stepsTitle: "Step-by-step 的 5 步",
          stepsBody: "按这个顺序做，重点是每一步都知道自己在验证什么。",
          stepCards: [
            { title: "先装运行环境", body: "先确认 Node.js 18+ 正常，再安装 OpenClaw CLI。" },
            { title: "放好 API Key", body: "把 key 放到 .env 或你明确知道的位置，不要分散在多个地方。" },
            { title: "先做一次体检", body: "执行 doctor，把 PATH、权限和环境变量问题提前暴露。" },
            { title: "启动最小任务", body: "先跑一次最小链路，目的只是确认服务真的能起来。" },
            { title: "读懂第一次结果", body: "看日志、看输出、看成本，再决定下一步去哪里。" }
          ],
          successTitle: "第一次成功意味着什么",
          successBody: "所谓“第一次成功”，不是功能全做完，而是你能清楚地说出：现在怎么启动、哪里看日志、哪个模型在跑、下一步去哪。",
          verifyTitle: "第一次成功要看到这些信号",
          verifyItems: [
            "命令启动后不是直接报错退出",
            "日志里没有 401 / 429 / timeout",
            "你知道当前运行的是哪个模型",
            "你知道下一步是去命令中心、模板库还是成本页"
          ],
          nextTitle: "第一次成功后去哪",
          nextCards: [
            { title: "还不确定哪里报错", body: "去命令中心，对照命令、配置片段和故障案例继续排。", href: "/pages/command-center.html", cta: "去命令中心" },
            { title: "已经跑通，想先做一个任务", body: "去模板库挑一个最接近你场景的模板，先跑成一个完整例子。", href: "/pages/task-library.html", cta: "去模板库" },
            { title: "担心一上来就花太多", body: "先去成本页估一下每天和每月会花多少钱。", href: "/pages/cost-calculator.html", cta: "去成本页" }
          ],
          trackerTitle: "第一次跑通追踪器",
          trackerBody: "把第一次成功拆成 5 个动作。每一步完成后，你再决定要不要继续扩展。"
        }
      },
      en: {
        fast: {
          commandTitle: "Fastest launch sequence",
          commandBody: "Best for users who are comfortable copying commands, editing config, and reading logs. Get the minimum chain running before you expand.",
          noteTitle: "What this step is for",
          noteBody: "Prove the CLI, env vars, and doctor check are healthy first. Do not attach a larger workflow yet.",
          stepsTitle: "Fast Path in 3 steps",
          stepsBody: "This path only optimizes for one thing: getting one minimal chain running on your machine.",
          stepCards: [
            { title: "Install and initialize", body: "Install the CLI and run init immediately so the base config exists." },
            { title: "Run doctor", body: "Clear PATH, permission, env, and model access issues before launch." },
            { title: "Run one minimal task", body: "Start the smallest possible task and confirm it is not a 401, 429, or timeout." }
          ],
          successTitle: "What counts as success here",
          successBody: "You do not need the whole system on day one. If the command runs, logs are clean, and you know the active model, this round succeeded.",
          verifyTitle: "Check these now",
          verifyItems: [
            "The CLI command does not exit immediately with an error",
            "doctor shows no PATH or permission issue",
            "Logs show no 401 / 429 / timeout",
            "You know whether the next page is Command Center, Task Library, or Cost Calculator"
          ],
          nextTitle: "After the fast path",
          nextCards: [
            { title: "Need to debug further", body: "If commands, logs, or config still feel unstable, go to Command Center now.", href: "/pages/command-center.html", cta: "Open Command Center" },
            { title: "Ready to do real work", body: "Go to Task Library and start from a proven structure.", href: "/pages/task-library.html", cta: "Open Task Library" },
            { title: "Need spend control", body: "Estimate the daily and monthly cost before you scale usage.", href: "/pages/cost-calculator.html", cta: "Open Cost Calculator" }
          ],
          trackerTitle: "Fast Path checklist",
          trackerBody: "This is not a full deployment checklist. It only proves the local chain is alive."
        },
        guided: {
          commandTitle: "Follow this command flow step by step",
          commandBody: "Best for first-time users. Run these in order, do not skip steps, and do not start by editing too much config.",
          noteTitle: "What you are actually doing",
          noteBody: "You are not building the full system yet. You are completing the first successful start, then confirming env, key, and one minimal task.",
          stepsTitle: "Step-by-step in 5 moves",
          stepsBody: "Follow this order. The goal is to understand what each step is verifying.",
          stepCards: [
            { title: "Install the runtime", body: "Confirm Node.js 18+ works, then install the OpenClaw CLI." },
            { title: "Place the API key", body: "Put the key in one clear location such as .env. Do not scatter it." },
            { title: "Run doctor first", body: "Use diagnostics before launch so PATH, permissions, and env issues appear early." },
            { title: "Start one small task", body: "Only run the smallest chain once so you can verify the service really starts." },
            { title: "Read the first result", body: "Check logs, output, and cost before deciding where to go next." }
          ],
          successTitle: "What first success means",
          successBody: "First success does not mean the whole setup is done. It means you can explain how it starts, where logs live, which model is running, and which page to open next.",
          verifyTitle: "Signals of a real first success",
          verifyItems: [
            "The command starts instead of exiting immediately",
            "Logs show no 401 / 429 / timeout",
            "You know which model is running now",
            "You know whether the next page is Command Center, Task Library, or Cost Calculator"
          ],
          nextTitle: "After the first successful run",
          nextCards: [
            { title: "Still unsure what failed", body: "Use Command Center to compare commands, snippets, and known failure cases.", href: "/pages/command-center.html", cta: "Go to Command Center" },
            { title: "Ready to try one real task", body: "Use Task Library and pick the closest starting template.", href: "/pages/task-library.html", cta: "Go to Task Library" },
            { title: "Worried about spend", body: "Open the cost page and estimate the daily and monthly budget before expanding.", href: "/pages/cost-calculator.html", cta: "Go to Cost Calculator" }
          ],
          trackerTitle: "First-run tracker",
          trackerBody: "Break the first win into five concrete actions. Only expand after these are done."
        }
      }
    };

    return (table[language] && table[language][mode]) || table.en.fast;
  }

  function renderExtras() {
    const root = document.getElementById("page-root");
    const panel = document.getElementById("quickstart-panel");
    const wrapper = root ? root.querySelector(":scope > div") : null;
    const aside = root ? root.querySelector(":scope > div > aside") : null;
    const mainSection = root ? root.querySelector(":scope > div > section") : null;
    const panelSection = panel ? panel.parentElement : null;
    if (!root || !panel || !aside || !mainSection || !panelSection) return;

    const text = getText();
    const trackId = currentTrack();
    const track = text.tracks[trackId] || text.tracks.windows;
    const trackerState = getTrackerState();
    const mode = getMode();
    const modeContent = getModeContent(lang(), mode);

    wrapper.className = "grid gap-6";
    mainSection.className = "space-y-5";

    let choose = document.querySelector("[data-quickstart-choose]");
    if (!choose) {
      choose = document.createElement("article");
      choose.className = "mb-5 rounded-[28px] border border-red-400/20 bg-[linear-gradient(135deg,rgba(127,29,29,0.32),rgba(69,10,10,0.18))] p-6 shadow-2xl shadow-red-950/20";
      choose.setAttribute("data-quickstart-choose", "true");
      panelSection.insertBefore(choose, panel);
    }
    choose.innerHTML = `
      <div class="max-w-3xl">
        <h2 class="text-2xl font-semibold text-white">${text.chooseTitle}</h2>
        <p class="mt-3 text-sm leading-7 text-slate-200">${text.chooseBody}</p>
      </div>
      <div class="mt-5 grid gap-4 xl:grid-cols-2">
        ${text.paths.map((item, index) => {
          const key = index === 0 ? "fast" : "guided";
          const active = mode === key;
          return `
          <button type="button" data-start-mode="${key}" class="rounded-3xl border p-5 text-left transition ${active ? "border-red-400/40 bg-red-500/12 shadow-lg shadow-red-950/20" : "border-white/10 bg-white/[0.03] hover:border-red-400/25 hover:bg-white/[0.05]"}">
            <div class="inline-flex rounded-full border ${active ? "border-red-300/30 bg-red-400/15 text-red-100" : "border-white/10 bg-white/5 text-slate-300"} px-3 py-1 text-xs uppercase tracking-[0.22em]">${item.badge}</div>
            <h3 class="mt-4 text-lg font-semibold text-white">${item.title}</h3>
            <p class="mt-3 text-sm leading-7 text-slate-300">${item.body}</p>
          </button>
        `;
        }).join("")}
      </div>
    `;

    if (panel.parentElement !== panelSection) {
      panelSection.insertBefore(panel, choose.nextSibling);
    }

    panel.className = "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-slate-950/20";
    panel.innerHTML = `
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="max-w-2xl">
          <div class="inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-red-200">${modeContent.commandTitle}</div>
          <p class="mt-4 text-sm leading-7 text-slate-300">${modeContent.commandBody}</p>
        </div>
        <button id="copy-quickstart-command" class="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400">${text.copyCommands}</button>
      </div>
      <div class="mt-5 grid gap-4">
        <pre class="overflow-auto whitespace-pre-wrap rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-sm leading-7 text-slate-200">${track.command}</pre>
        <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <div class="text-xs uppercase tracking-[0.24em] text-red-200">${modeContent.noteTitle}</div>
          <p class="mt-4 text-sm leading-7 text-slate-300">${modeContent.noteBody}</p>
          <div class="mt-4 rounded-2xl bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300">${track.note}</div>
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
        <h2 class="text-2xl font-semibold text-white">${modeContent.stepsTitle}</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">${modeContent.stepsBody}</p>
      </div>
      <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
        ${modeContent.stepCards.map((item, index) => `
          <article class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-red-400/25 bg-red-500/10 text-sm font-semibold text-red-200">${index + 1}</div>
            <h3 class="mt-4 text-base font-semibold text-white">${item.title}</h3>
            <p class="mt-3 max-w-[28ch] text-sm leading-7 text-slate-300">${item.body}</p>
          </article>
        `).join("")}
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
          <h2 class="text-xl font-semibold text-white">${modeContent.successTitle}</h2>
          <p class="mt-4 text-sm leading-7 text-slate-300">${modeContent.successBody}</p>
        </div>
        <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <h2 class="text-xl font-semibold text-white">${modeContent.verifyTitle}</h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            ${modeContent.verifyItems.map((item) => `<li class="rounded-2xl bg-white/5 px-4 py-3">${item}</li>`).join("")}
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
      <h2 class="text-2xl font-semibold text-white">${modeContent.nextTitle}</h2>
      <div class="mt-5 grid gap-4 lg:grid-cols-3">
        ${modeContent.nextCards.map((item) => `
          <a href="${item.href}" class="block rounded-3xl border border-white/10 bg-slate-950/70 p-5 transition hover:border-red-400/40 hover:bg-slate-950">
            <div class="font-medium text-white">${item.title}</div>
            <p class="mt-3 text-sm leading-7 text-slate-300">${item.body}</p>
            <div class="mt-3 text-xs uppercase tracking-[0.24em] text-red-200">${item.cta}</div>
          </a>
        `).join("")}
      </div>
    `;

    if (checklistArticle) {
      if (checklistArticle.parentElement !== panelSection) {
        panelSection.insertBefore(checklistArticle, nextMain.nextSibling);
      }
      checklistArticle.className = "rounded-[28px] border border-red-400/20 bg-[linear-gradient(180deg,rgba(127,29,29,0.2),rgba(15,23,42,0.92))] p-6";
      checklistArticle.innerHTML = `
        <h2 class="text-2xl font-semibold text-white">${modeContent.trackerTitle}</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">${modeContent.trackerBody}</p>
        <div id="quickstart-checklist" class="mt-5 space-y-3">
          ${text.tracker.map((item, index) => `
            <label class="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4">
              <input data-step-check="${index}" type="checkbox" class="mt-1 h-4 w-4 accent-red-400" ${trackerState[index] ? "checked" : ""}>
              <span class="text-sm leading-7 text-slate-200">${item}</span>
            </label>
          `).join("")}
        </div>
      `;
    }

    const copyButton = document.getElementById("copy-quickstart-command");
    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(track.command);
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
      button.className = `quickstart-tab rounded-full border px-4 py-2 text-sm transition ${button.dataset.track === trackId ? "border-red-400/40 bg-red-500 text-white" : "border-white/10 text-slate-200 hover:border-red-400/40"}`;
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
            button.className = `quickstart-tab rounded-full border px-4 py-2 text-sm transition ${active ? "border-red-400/40 bg-red-500 text-white" : "border-white/10 text-slate-200 hover:border-red-400/40"}`;
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
