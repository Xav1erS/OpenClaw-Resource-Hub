(function () {
  const copy = {
    task: {
      zh: {
        title: "这个页面解决什么",
        body: "模板库用来直接拿现成任务结构开工。先展开代码预览，再复制成你自己的任务版本。",
        pills: ["找任务模板", "先预览再复制", "不查 CLI 命令"]
      },
      en: {
        title: "Use This Page For",
        body: "The task library is for starting from a proven task structure. Preview the code block first, then copy and adapt it.",
        pills: ["Find task templates", "Preview before copying", "Not for CLI lookup"]
      }
    },
    command: {
      zh: {
        title: "这个页面解决什么",
        body: "命令中心用来查 CLI 命令、配置片段和排错动作。它是操作台，不是任务模板库。",
        pills: ["查命令", "查配置片段", "查排错步骤"]
      },
      en: {
        title: "Use This Page For",
        body: "The command center is for CLI commands, config snippets, and troubleshooting steps. It is an operator console, not a template library.",
        pills: ["Find commands", "Copy config snippets", "Debug failures"]
      }
    }
  };

  function lang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function buildCard(kind) {
    const text = copy[kind][lang()];
    const tint = kind === "task" ? "orange" : "sky";
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
    const section = document.querySelector("#page-root > div > section");
    if (!section || section.querySelector('[data-clarity-card="task"]')) return;
    section.insertBefore(buildCard("task"), section.firstChild);
  }

  function injectCommandCard() {
    const section = document.querySelector("#page-root > div > section");
    if (!section || section.querySelector('[data-clarity-card="command"]')) return;
    section.insertBefore(buildCard("command"), section.firstChild);
  }

  function run() {
    const path = window.location.pathname;
    if (path.endsWith("/pages/task-library.html")) injectTaskCard();
    if (path.endsWith("/pages/command-center.html")) injectCommandCard();
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
