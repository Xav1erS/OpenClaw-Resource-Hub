(function () {
  const extra = {
    zh: {
      sectionTitle: "官方 Fast Fixes",
      sectionBody: "这部分保留官方 cheatsheet 风格的快修路径。前面的高频症状负责帮你定位层级，这里负责给出更具体的动作。",
      issueTitle: "升级排查入口",
      nextTitle: "继续下一步",
      nextBadge: "继续动作",
      nextBody: "如果你已经缩到具体命令层，回命令中心；如果问题处理完了，再回教程补原理。这样路径最短。",
      empty: "没有匹配结果",
      issues: [
        {
          title: "私聊没有回复",
          body: "先不要猜是模型问题。官方 fast path 的第一步是直接测频道健康和认证状态。",
          steps: [
            "运行 openclaw channels status --probe",
            "确认频道认证仍有效，gateway 已连接",
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
          title: "gateway 没起来或状态异常",
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
      ],
      escalation: [
        "如果问题已经定位到具体命令层，就回命令中心复制确切命令。",
        "如果你还不知道是哪一层坏了，继续按 doctor -> gateway -> channels -> models -> memory 缩小范围。",
        "排查完成后，再回教程页补原理，而不是在故障页里长时间补课。"
      ],
      commandLink: "打开命令中心",
      tutorialLink: "打开教程"
    },
    en: {
      sectionTitle: "Official Fast Fixes",
      sectionBody: "This section keeps the official cheatsheet-style quick fixes. The common failure signals above help you localize the layer. This section gives you the concrete next moves.",
      issueTitle: "Escalation Paths",
      nextTitle: "Next Best Move",
      nextBadge: "Next Move",
      nextBody: "If you already narrowed the issue to exact commands, go back to Command Center. If the issue is resolved, return to Tutorials for the reasoning.",
      empty: "No matching result",
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
      ],
      escalation: [
        "If the broken layer is already obvious, jump back to Command Center and copy the exact command.",
        "If the broken layer is still unclear, keep following doctor -> gateway -> channels -> models -> memory.",
        "After the issue is resolved, go to Tutorials for the reasoning instead of learning theory mid-debug."
      ],
      commandLink: "Open Command Center",
      tutorialLink: "Open Tutorials"
    }
  };

  function currentLang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function renderExtras() {
    const root = document.getElementById("page-root");
    const issueRoot = document.getElementById("troubleshooting-sections");
    const input = document.getElementById("troubleshooting-search");
    const extraRoot = document.getElementById("troubleshooting-extra-root");
    if (!root || !issueRoot || !input || !extraRoot) return;

    const text = extra[currentLang()];
    const isZh = currentLang() === "zh";
    const bodyClass = isZh ? "text-[15px] leading-7" : "text-[14px] leading-[1.72]";
    const compactBodyClass = isZh ? "text-[14px] leading-6" : "text-[13.5px] leading-[1.65]";
    const cardTitleClass = isZh ? "text-xl font-semibold" : "text-[1.18rem] font-semibold tracking-[-0.015em]";
    const sectionTitleClass = isZh ? "text-2xl font-semibold" : "text-[1.85rem] font-semibold tracking-[-0.02em]";
    const q = input.value.trim().toLowerCase();
    const issues = text.issues.filter((item) =>
      `${item.title} ${item.body} ${item.steps.join(" ")}`.toLowerCase().includes(q)
    );
    const escalation = text.escalation.filter((item) => item.toLowerCase().includes(q) || !q);

    extraRoot.innerHTML = `
      <section class="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.28em] text-red-200/80">${text.sectionTitle}</p>
            <div class="mt-3 flex flex-wrap items-center gap-3">
              <h2 class="${sectionTitleClass} text-white">${text.sectionTitle}</h2>
              <span class="rounded-full border border-red-300/15 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-100">${issues.length}</span>
            </div>
          </div>
          <p class="max-w-2xl ${bodyClass} text-slate-300">${text.sectionBody}</p>
        </div>
        <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          ${issues.length
            ? issues.map((item) => `
              <article class="flex h-full min-h-[228px] flex-col rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.06),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] p-5">
                <h3 class="${cardTitleClass} leading-7 text-white">${item.title}</h3>
                <p class="mt-3 min-h-[64px] ${bodyClass} text-slate-300">${item.body}</p>
                <div class="mt-auto space-y-2 pt-5">
                  ${item.steps.map((step, index) => `
                    <div class="grid grid-cols-[24px,1fr] items-start gap-3 rounded-2xl border border-white/5 bg-slate-950/72 px-3 py-2.5 ${compactBodyClass} text-slate-200">
                      <span class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-[11px] font-semibold text-red-100">${index + 1}</span>
                      <span>${step}</span>
                    </div>
                  `).join("")}
                </div>
              </article>
            `).join("")
            : `<article class="rounded-[28px] border border-dashed border-white/10 bg-slate-950/40 p-6 ${bodyClass} text-slate-300 md:col-span-2 xl:col-span-3">${text.empty}</article>`}
        </div>
      </section>
      <section class="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <article class="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
          <div class="flex items-center justify-between gap-3">
            <h2 class="${cardTitleClass} text-white">${text.issueTitle}</h2>
            <span class="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">${escalation.length}</span>
          </div>
          <ul class="mt-4 space-y-3 ${bodyClass} text-slate-300">
            ${escalation.map((item, index) => `
              <li class="grid grid-cols-[26px,1fr] items-start gap-3 rounded-2xl bg-slate-950/70 px-4 py-3">
                <span class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-[11px] text-slate-300">${index + 1}</span>
                <span>${item}</span>
              </li>
            `).join("")}
          </ul>
        </article>
        <article class="rounded-[30px] border border-red-400/20 bg-[linear-gradient(180deg,rgba(127,29,29,0.2),rgba(15,23,42,0.92))] p-5">
          <div class="inline-flex rounded-full border border-red-300/20 bg-red-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-red-100">${text.nextBadge}</div>
          <h2 class="mt-4 ${cardTitleClass} text-white">${text.nextTitle}</h2>
          <p class="mt-4 ${bodyClass} text-slate-300">${text.nextBody}</p>
          <div class="mt-5 flex flex-wrap gap-3">
            <a href="/pages/command-center.html" class="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400">${text.commandLink}</a>
            <a href="/pages/tutorials.html" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-400/40 hover:text-white">${text.tutorialLink}</a>
          </div>
        </article>
      </section>
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
    const input = document.getElementById("troubleshooting-search");
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
