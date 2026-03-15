(function () {
  const extra = {
    zh: {
      sectionTitle: "官方 Fast Fixes",
      issueTitle: "升级排查入口",
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
      ],
      escalation: [
        "如果问题在命令层已经明确，回命令中心复制确切命令。",
        "如果你还不知道是哪一层坏了，继续按 doctor -> gateway -> channels -> models -> memory 的顺序缩小范围。",
        "排查完成后，再回教程页补原理，而不是在故障页里长时间补课。"
      ]
    },
    en: {
      sectionTitle: "Official Fast Fixes",
      issueTitle: "Escalation Paths",
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
      ]
    }
  };

  function currentLang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function renderExtras() {
    const root = document.getElementById("page-root");
    const issueRoot = document.getElementById("troubleshooting-sections");
    const input = document.getElementById("troubleshooting-search");
    if (!root || !issueRoot || !input) return;

    let extraRoot = document.getElementById("troubleshooting-extra-root");
    if (!extraRoot) {
      extraRoot = document.createElement("section");
      extraRoot.id = "troubleshooting-extra-root";
      extraRoot.className = "grid gap-4 xl:grid-cols-[1.1fr,0.9fr]";
      issueRoot.parentElement.insertAdjacentElement("afterend", extraRoot);
    }

    const text = extra[currentLang()];
    const q = input.value.trim().toLowerCase();
    const issues = text.issues.filter((item) =>
      `${item.title} ${item.body} ${item.steps.join(" ")}`.toLowerCase().includes(q)
    );
    const escalation = text.escalation.filter((item) => item.toLowerCase().includes(q) || !q);

    extraRoot.innerHTML = `
      <section class="space-y-4">
        <h2 class="text-xl font-semibold text-white">${text.sectionTitle}</h2>
        <div class="grid gap-4 md:grid-cols-2">
          ${issues
            .map(
              (item) => `
            <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <h3 class="text-lg font-semibold text-white">${item.title}</h3>
              <p class="mt-3 text-sm leading-6 text-slate-300">${item.body}</p>
              <ul class="mt-4 space-y-2 text-sm text-slate-300">
                ${item.steps.map((step) => `<li class="rounded-2xl bg-slate-950/70 px-3 py-2">${step}</li>`).join("")}
              </ul>
            </article>
          `
            )
            .join("")}
        </div>
      </section>
      <aside class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h2 class="text-xl font-semibold text-white">${text.issueTitle}</h2>
        <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-300">
          ${escalation.map((item) => `<li class="rounded-2xl bg-slate-950/70 px-4 py-3">${item}</li>`).join("")}
        </ul>
      </aside>
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
