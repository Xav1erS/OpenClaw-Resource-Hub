(function () {
  const extra = {
    zh: {
      sectionTitle: "高级命令包",
      issueTitle: "更多故障场景",
      copy: "复制",
      packs: [
        {
          title: "部署与守护",
          description: "适合把 OpenClaw 作为常驻服务运行时参考。",
          commands: [
            { label: "systemd 服务", code: "[Unit]\nDescription=OpenClaw Agent\n\n[Service]\nExecStart=/usr/bin/openclaw start\nRestart=always\nUser=ubuntu\n\n[Install]\nWantedBy=multi-user.target" },
            { label: "跟踪日志", code: "journalctl -u openclaw -f" },
            { label: "检查进程", code: "ps aux | grep openclaw" }
          ]
        },
        {
          title: "调试与回放",
          description: "适合定位哪一步失败、哪一步输出过长。",
          commands: [
            { label: "单步试跑", code: "openclaw start --max-steps 1" },
            { label: "详细日志", code: "logging:\n  level: debug\n  file: openclaw-debug.log" },
            { label: "限制输出", code: "max_tokens: 1200\nresponse_format: concise" }
          ]
        },
        {
          title: "日志与观测",
          description: "适合上线前后看状态、追日志和保留关键观测点。",
          commands: [
            { label: "实时 tail 日志", code: "tail -f /var/log/openclaw.log" },
            { label: "按错误筛日志", code: "grep -i \"error\\|timeout\\|429\\|401\" openclaw.log" },
            { label: "结构化日志", code: "logging:\n  level: info\n  format: json\n  file: openclaw.log" }
          ]
        }
      ],
      issues: [
        {
          title: "输出过长导致成本失控",
          body: "通常不是模型本身的问题，而是没有对每一步输出的长度和格式做约束。",
          steps: ["先压缩每步输出格式。", "中间步骤优先使用轻量模型。", "把长链路拆成多个短任务。"]
        },
        {
          title: "浏览器抓取不稳定",
          body: "常见于反爬页面、动态站点或者抓取链路太长。",
          steps: ["先验证目标页面能稳定打开。", "优先抓结构化页面而不是无限滚动页。", "给失败步骤加 fallback。"]
        },
        {
          title: "模型名写错或供应商不匹配",
          body: "模型名拼错、供应商不匹配，都会导致启动成功但调用立刻失败。",
          steps: ["先核对模型名与供应商是否一致。", "确认当前密钥有该模型权限。", "先用最小请求验证调用。"]
        },
        {
          title: "环境变量没有真正加载",
          body: "很多问题不是密钥错误，而是变量根本没有进入当前 shell 或服务环境。",
          steps: ["先在当前 shell 里 echo 一次变量。", "如果走 systemd，检查 Environment 配置。", "不要混用多个 .env 来源。"]
        },
        {
          title: "服务启动后很快退出",
          body: "通常是权限、端口冲突、日志路径不可写或配置路径错误。",
          steps: ["先前台运行一次。", "检查端口是否被占用。", "确认日志和配置路径都可访问。"]
        }
      ]
    },
    en: {
      sectionTitle: "Advanced Command Packs",
      issueTitle: "More Failure Cases",
      copy: "Copy",
      packs: [
        {
          title: "Deployment and Daemon",
          description: "Reference snippets for running OpenClaw as a long-lived service.",
          commands: [
            { label: "systemd service", code: "[Unit]\nDescription=OpenClaw Agent\n\n[Service]\nExecStart=/usr/bin/openclaw start\nRestart=always\nUser=ubuntu\n\n[Install]\nWantedBy=multi-user.target" },
            { label: "follow logs", code: "journalctl -u openclaw -f" },
            { label: "inspect process", code: "ps aux | grep openclaw" }
          ]
        },
        {
          title: "Debug and Replay",
          description: "Use these when you need to isolate the step that failed.",
          commands: [
            { label: "single-step run", code: "openclaw start --max-steps 1" },
            { label: "debug log", code: "logging:\n  level: debug\n  file: openclaw-debug.log" },
            { label: "limit output", code: "max_tokens: 1200\nresponse_format: concise" }
          ]
        },
        {
          title: "Logs and Observability",
          description: "Useful snippets for tailing logs and preserving the right debug signals.",
          commands: [
            { label: "tail log", code: "tail -f /var/log/openclaw.log" },
            { label: "filter errors", code: "grep -i \"error\\|timeout\\|429\\|401\" openclaw.log" },
            { label: "structured logging", code: "logging:\n  level: info\n  format: json\n  file: openclaw.log" }
          ]
        }
      ],
      issues: [
        {
          title: "Outputs are too long and cost spikes",
          body: "This is usually a formatting problem, not a model problem. Intermediate steps need tighter limits.",
          steps: ["Constrain the output format for each step.", "Use a lighter model for intermediate stages.", "Break one long chain into smaller tasks."]
        },
        {
          title: "Browser fetches are unstable",
          body: "Common on anti-bot pages, dynamic apps, or long fetch chains.",
          steps: ["Verify the target page can load reliably first.", "Prefer structured pages over infinite-scroll pages.", "Add a fallback step when fetching fails."]
        },
        {
          title: "Model name or provider does not match",
          body: "A wrong model identifier or provider mismatch can make startup look fine while calls fail immediately.",
          steps: ["Check that the model name matches the provider.", "Confirm the current key has permission for that model.", "Validate with one minimal request."]
        },
        {
          title: "Environment variables were not loaded",
          body: "Many failures come from shell or service environments that never loaded the key at all.",
          steps: ["Echo the variable in the current shell.", "If you use systemd, inspect Environment settings.", "Avoid mixing multiple .env sources."]
        },
        {
          title: "Service starts and exits quickly",
          body: "This is commonly caused by permissions, port conflicts, or an invalid config or log path.",
          steps: ["Run it once in the foreground first.", "Check whether the port is already in use.", "Verify the log and config paths are accessible."]
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
    const packs = text.packs.filter((item) => `${item.title} ${item.description} ${item.commands.map((cmd) => `${cmd.label} ${cmd.code}`).join(" ")}`.toLowerCase().includes(q));
    const issues = text.issues.filter((item) => `${item.title} ${item.body} ${item.steps.join(" ")}`.toLowerCase().includes(q));

    extraRoot.innerHTML = `
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-white">${text.sectionTitle}</h2>
        ${packs.map((pack) => `
          <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h3 class="text-lg font-semibold text-white">${pack.title}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-300">${pack.description}</p>
            <div class="mt-4 space-y-3">
              ${pack.commands.map((cmd) => `
                <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div class="flex items-center justify-between gap-3">
                    <div class="font-medium text-white">${cmd.label}</div>
                    <button data-extra-copy="${encodeURIComponent(cmd.code)}" class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 transition hover:bg-white/10">${text.copy}</button>
                  </div>
                  <pre class="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">${cmd.code}</pre>
                </div>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </section>
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-white">${text.issueTitle}</h2>
        ${issues.map((item) => `
          <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h3 class="text-lg font-semibold text-white">${item.title}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-300">${item.body}</p>
            <ul class="mt-4 space-y-2 text-sm text-slate-300">
              ${item.steps.map((step) => `<li class="rounded-2xl bg-slate-950/70 px-3 py-2">${step}</li>`).join("")}
            </ul>
          </article>
        `).join("")}
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
