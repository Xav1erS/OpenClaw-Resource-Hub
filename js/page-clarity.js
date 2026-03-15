(function () {
  const copy = {
    task: {
      zh: {
        title: "这个页面解决什么？",
        body: "模板库用于直接拿现成任务结构开工。先预览，再复制，再改成自己的版本。",
        pills: ["找任务模板", "先预览再复制", "不是命令速查页"]
      },
      en: {
        title: "Use This Page For",
        body: "Start from a proven task structure. Preview first, copy second, customize third.",
        pills: ["Find task templates", "Preview before copying", "Not for CLI lookup"]
      }
    },
    command: {
      zh: {
        title: "这个页面解决什么？",
        body: "命令中心用于查 CLI 命令、配置片段和速查表参考。先找确切动作，再复制命令。",
        pills: ["找命令", "找配置片段", "找速查表参考"]
      },
      en: {
        title: "Use This Page For",
        body: "Find CLI commands, config snippets, and cheatsheet references. Look up the exact move, then copy the command.",
        pills: ["Find commands", "Copy config snippets", "Use cheatsheet references"]
      }
    },
    troubleshooting: {
      zh: {
        title: "这个页面解决什么？",
        body: "故障排除用于先判断问题落在哪一层，再决定下一步要排 doctor、gateway、channels、models 还是 memory。",
        pills: ["先定层", "再缩范围", "最后回命令中心"]
      },
      en: {
        title: "Use This Page For",
        body: "Localize the broken layer first, then decide whether to debug doctor, gateway, channels, models, or memory next.",
        pills: ["Localize the layer", "Narrow the scope", "Then jump back"]
      }
    }
  };

  function lang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function buildCompactCard(kind) {
    const text = copy[kind][lang()];
    const tint = kind === "task" ? "orange" : kind === "command" ? "sky" : "red";
    const wrapper = document.createElement("article");
    wrapper.className = `rounded-[24px] border border-${tint}-400/18 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,41,59,0.88))] p-4 shadow-[0_18px_50px_rgba(2,6,23,0.18)]`;
    wrapper.setAttribute("data-clarity-card", kind);
    wrapper.innerHTML = `
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="max-w-2xl">
          <div class="inline-flex rounded-full border border-${tint}-300/18 bg-${tint}-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-${tint}-100">${text.title}</div>
          <p class="mt-3 text-sm leading-6 text-slate-300">${text.body}</p>
        </div>
        <div class="flex flex-wrap gap-2 text-xs text-slate-200">
          ${text.pills.map((item) => `<span class="rounded-full border border-white/10 bg-slate-950/50 px-3 py-2">${item}</span>`).join("")}
        </div>
      </div>
    `;
    return wrapper;
  }

  function buildAsideCard(kind) {
    const text = copy[kind][lang()];
    const tint = kind === "task" ? "orange" : "red";
    const wrapper = document.createElement("article");
    wrapper.className = `rounded-[26px] border border-${tint}-400/18 bg-${tint}-500/10 p-4`;
    wrapper.setAttribute("data-clarity-card", kind);
    wrapper.innerHTML = `
      <h2 class="text-base font-semibold text-white">${text.title}</h2>
      <p class="mt-2 text-sm leading-6 text-slate-200">${text.body}</p>
      <div class="mt-3 flex flex-wrap gap-2 text-xs text-white/90">
        ${text.pills.map((item) => `<span class="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2">${item}</span>`).join("")}
      </div>
    `;
    return wrapper;
  }

  function injectTaskCard() {
    const aside = document.querySelector("#page-root > div > aside");
    if (!aside || aside.querySelector('[data-clarity-card="task"]')) return;
    aside.insertBefore(buildAsideCard("task"), aside.firstChild);
  }

  function injectCommandCard() {
    const container = document.querySelector("#page-root > div");
    const section = document.getElementById("command-sections");
    if (!container || !section || container.querySelector('[data-clarity-card="command"]')) return;
    container.insertBefore(buildCompactCard("command"), section);
  }

  function injectTroubleshootingCard() {
    const aside = document.querySelector("#page-root aside");
    if (!aside || aside.querySelector('[data-clarity-card="troubleshooting"]')) return;
    aside.insertBefore(buildAsideCard("troubleshooting"), aside.firstChild);
  }

  function run() {
    const path = window.location.pathname;
    if (path.endsWith("/pages/task-library.html")) injectTaskCard();
    if (path.endsWith("/pages/command-center.html")) injectCommandCard();
    if (path.endsWith("/pages/troubleshooting.html")) injectTroubleshootingCard();
  }

  let observer = null;

  function start() {
    observer = new MutationObserver(() => {
      observer.disconnect();
      run();
      observer.observe(document.body, { childList: true, subtree: true });
    });
    run();
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
