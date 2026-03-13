(function () {
  const copy = {
    zh: {
      introTitle: "启动后先做这四件事",
      introBody: "Quick Start 不是命令堆砌页，而是最短成功路径。先跑通，再去模板库和成本页。",
      introPills: ["先跑通最小配置", "先检查日志", "尽早估预算", "稳定后再扩链路"],
      configTitle: "最小配置",
      verifyTitle: "首次验证",
      pitfallsTitle: "高频新手坑",
      nextTitle: "下一步去哪",
      nextCards: [
        { title: "环境或报错问题", body: "去命令中心查命令、配置片段和排错动作。", href: "/pages/command-center.html", cta: "打开命令中心" },
        { title: "想直接开工", body: "去模板库挑一个现成结构，先预览代码块再复制。", href: "/pages/task-library.html", cta: "打开模板库" },
        { title: "想先看预算", body: "去成本计算器看日成本和月成本，避免规模化之后才补救。", href: "/pages/cost-calculator.html", cta: "打开成本页" }
      ],
      tracks: {
        windows: {
          config: `name: my-openclaw\nmodel: gpt-4o-mini\napi_key: \${OPENCLAW_API_KEY}\nmax_steps: 24\nheartbeat:\n  enabled: true\n  interval: 60`,
          verify: ["先执行 `openclaw doctor`。", "再用 `openclaw start` 跑一次最小链路。", "确认日志里没有 401 / 429 / timeout。", "再决定下一步去命令中心、模板库还是成本页。"],
          pitfalls: ["PowerShell 里的环境变量没生效。", "Node 版本低于 18。", "API Key 带了尾部空格。"]
        },
        macos: {
          config: `name: my-openclaw\nmodel: claude-haiku-4.6\napi_key: \${OPENCLAW_API_KEY}\nmax_steps: 24\nlogging:\n  level: info\n  file: openclaw.log`,
          verify: ["先检查 `node -v`。", "用 `openclaw doctor` 看依赖状态。", "第一次启动先用轻量模型。", "验证成功后再复制任务模板。"],
          pitfalls: ["Keychain 和 .env 混用，导致密钥来源不清。", "第一次就上高成本模型。", "还没 smoke test 就开始长链路。"]
        },
        linux: {
          config: `name: my-openclaw\nmodel: claude-haiku-4.6\napi_key: \${OPENCLAW_API_KEY}\nmax_steps: 20\nlogging:\n  level: info\n  file: /var/log/openclaw.log`,
          verify: ["先确认前台运行能成功。", "再决定是否接 systemd。", "检查日志文件是否真的落盘。", "确认权限、端口和网络都正常。"],
          pitfalls: ["前台都没跑通就先配 systemd。", "日志路径没有写权限。", "树莓派太早使用重模型。"]
        }
      }
    },
    en: {
      introTitle: "Do These Four Things First",
      introBody: "Quick Start is the shortest success path, not a random command page. Get one run working first, then move to templates and cost.",
      introPills: ["Run the smallest setup", "Validate logs first", "Estimate cost early", "Expand later"],
      configTitle: "Minimum Config",
      verifyTitle: "First Verification",
      pitfallsTitle: "Common Beginner Pitfalls",
      nextTitle: "Where To Go Next",
      nextCards: [
        { title: "Setup or error issue", body: "Open Command Center for commands, snippets, and troubleshooting actions.", href: "/pages/command-center.html", cta: "Open Command Center" },
        { title: "Ready to start shipping", body: "Open Task Library and start from a proven template after previewing the code.", href: "/pages/task-library.html", cta: "Open Task Library" },
        { title: "Need a budget check", body: "Open Cost Calculator before usage grows so you know the daily and monthly cost.", href: "/pages/cost-calculator.html", cta: "Open Cost Calculator" }
      ],
      tracks: {
        windows: {
          config: `name: my-openclaw\nmodel: gpt-4o-mini\napi_key: \${OPENCLAW_API_KEY}\nmax_steps: 24\nheartbeat:\n  enabled: true\n  interval: 60`,
          verify: ["Run `openclaw doctor` first.", "Start one minimal run with `openclaw start`.", "Make sure logs show no 401 / 429 / timeout.", "Decide whether your next step is Command Center, Task Library, or Cost Calculator."],
          pitfalls: ["Environment variables were not loaded in PowerShell.", "Node is older than v18.", "The API key contains trailing whitespace."]
        },
        macos: {
          config: `name: my-openclaw\nmodel: claude-haiku-4.6\napi_key: \${OPENCLAW_API_KEY}\nmax_steps: 24\nlogging:\n  level: info\n  file: openclaw.log`,
          verify: ["Check `node -v` first.", "Run `openclaw doctor` before the first launch.", "Use a lightweight model for the first run.", "Only then start copying task templates."],
          pitfalls: ["Mixing Keychain and .env without a clear source of truth.", "Starting with an expensive model on Apple Silicon.", "Trying a long chain before the first smoke test is stable."]
        },
        linux: {
          config: `name: my-openclaw\nmodel: claude-haiku-4.6\napi_key: \${OPENCLAW_API_KEY}\nmax_steps: 20\nlogging:\n  level: info\n  file: /var/log/openclaw.log`,
          verify: ["Confirm the service can run in the foreground first.", "Only then wire systemd.", "Verify the log file is actually written.", "Check permissions, network, and ports before scaling up."],
          pitfalls: ["Wiring systemd before the foreground run works.", "The log path is not writable.", "Using a heavy model on Raspberry Pi too early."]
        }
      }
    }
  };

  function lang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function currentTrack() {
    const active = Array.from(document.querySelectorAll("[data-track]")).find((button) => button.className.includes("bg-orange-500"));
    return active ? active.dataset.track : "windows";
  }

  function renderExtras() {
    const root = document.getElementById("page-root");
    const panel = document.getElementById("quickstart-panel");
    const aside = root ? root.querySelector(":scope > div > aside") : null;
    if (!root || !panel || !aside) return;

    const text = copy[lang()];
    const trackId = currentTrack();
    const track = text.tracks[trackId] || text.tracks.windows;

    let intro = document.querySelector("[data-quickstart-intro]");
    if (!intro) {
      intro = document.createElement("article");
      intro.className = "mb-4 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-5";
      intro.setAttribute("data-quickstart-intro", "true");
      panel.parentElement.insertBefore(intro, panel);
    }
    intro.innerHTML = `
      <h2 class="text-lg font-semibold text-white">${text.introTitle}</h2>
      <p class="mt-3 text-sm leading-6 text-slate-200">${text.introBody}</p>
      <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/90">
        ${text.introPills.map((item) => `<span class="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2">${item}</span>`).join("")}
      </div>
    `;

    let extra = document.querySelector("[data-quickstart-extra]");
    if (!extra) {
      extra = document.createElement("div");
      extra.className = "mt-4 grid gap-4 md:grid-cols-3";
      extra.setAttribute("data-quickstart-extra", "true");
      panel.insertAdjacentElement("afterend", extra);
    }
    extra.innerHTML = `
      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h3 class="text-lg font-semibold text-white">${text.configTitle}</h3>
        <pre class="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/90 p-4 text-sm leading-6 text-slate-300">${track.config}</pre>
      </article>
      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h3 class="text-lg font-semibold text-white">${text.verifyTitle}</h3>
        <ul class="mt-4 space-y-2 text-sm leading-6 text-slate-300">${track.verify.map((item) => `<li class="rounded-2xl bg-slate-950/70 px-3 py-2">${item}</li>`).join("")}</ul>
      </article>
      <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h3 class="text-lg font-semibold text-white">${text.pitfallsTitle}</h3>
        <ul class="mt-4 space-y-2 text-sm leading-6 text-slate-300">${track.pitfalls.map((item) => `<li class="rounded-2xl bg-slate-950/70 px-3 py-2">${item}</li>`).join("")}</ul>
      </article>
    `;

    let next = document.querySelector("[data-quickstart-next]");
    if (!next) {
      next = document.createElement("article");
      next.className = "rounded-3xl border border-white/10 bg-white/[0.03] p-5";
      next.setAttribute("data-quickstart-next", "true");
      aside.appendChild(next);
    }
    next.innerHTML = `
      <h2 class="text-lg font-semibold text-white">${text.nextTitle}</h2>
      <div class="mt-4 space-y-3">
        ${text.nextCards.map((item) => `
          <a href="${item.href}" class="block rounded-2xl border border-white/10 bg-slate-950/70 p-4 transition hover:border-orange-400/40 hover:bg-slate-950">
            <div class="font-medium text-white">${item.title}</div>
            <p class="mt-2 text-sm leading-6 text-slate-300">${item.body}</p>
            <div class="mt-3 text-xs uppercase tracking-[0.2em] text-orange-200">${item.cta}</div>
          </a>
        `).join("")}
      </div>
    `;
  }

  let observer = null;

  function start() {
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
