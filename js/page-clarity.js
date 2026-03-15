(function () {
  const copy = {
    task: {
      zh: {
        title: "这个页面解决什么？",
        body: "模板库用来直接拿现成任务结构开工。先展开代码预览，再复制成你自己的任务版本。",
        pills: ["找任务模板", "先预览再复制", "不是 CLI 速查页"]
      },
      en: {
        title: "Use This Page For",
        body: "The task library is for starting from a proven task structure. Preview the code block first, then copy and adapt it.",
        pills: ["Find task templates", "Preview before copying", "Not for CLI lookup"]
      }
    },
    command: {
      zh: {
        title: "这个页面解决什么？",
        body: "命令中心用来查 CLI 命令、配置片段、频道管理和 cheatsheet 参考。它是操作台，不是专门的故障定位页。",
        pills: ["查命令", "查配置片段", "查 cheatsheet 参考"]
      },
      en: {
        title: "Use This Page For",
        body: "The command center is for CLI commands, config snippets, channel management, and cheatsheet references. It is an operator console, not the dedicated failure-triage page.",
        pills: ["Find commands", "Copy config snippets", "Use cheatsheet references"]
      }
    },
    troubleshooting: {
      zh: {
        title: "这个页面解决什么？",
        body: "故障排除页用来判断问题先从哪一层排：doctor、gateway、channels、models 还是 memory。它不是命令大全，而是排查路径页。",
        pills: ["先定层", "再缩范围", "最后回命令中心复制命令"]
      },
      en: {
        title: "Use This Page For",
        body: "Troubleshooting is for deciding which layer to debug first: doctor, gateway, channels, models, or memory. It is a triage page, not the full command catalog.",
        pills: ["Localize the broken layer", "Narrow the scope", "Then jump back to Command Center"]
      }
    }
  };

  function lang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function buildCard(kind) {
    const text = copy[kind][lang()];
    const tint = kind === "task" ? "orange" : kind === "command" ? "sky" : "red";
    const wrapper = document.createElement("article");
    wrapper.className = `mb-4 rounded-3xl border border-${tint}-400/20 bg-${tint}-500/10 p-4`;
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
    aside.insertBefore(buildCard("task"), aside.firstChild);
  }

  function injectCommandCard() {
    const section = document.querySelector("#page-root > div > section");
    if (!section || section.querySelector('[data-clarity-card="command"]')) return;
    section.insertBefore(buildCard("command"), section.firstChild);
  }

  function injectTroubleshootingCard() {
    const aside = document.querySelector("#page-root aside");
    if (!aside || aside.querySelector('[data-clarity-card="troubleshooting"]')) return;
    aside.insertBefore(buildCard("troubleshooting"), aside.firstChild);
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
