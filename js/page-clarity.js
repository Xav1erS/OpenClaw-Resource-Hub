(function () {
  const copy = {
    task: {
      zh: {
        title: "这里适合做什么",
        body: "模板库用于直接拿现成任务结构开工。先预览，再复制，再改成自己的版本。",
        pillsTitle: "建议入口",
        pills: ["找任务模板", "先预览再复制", "不是命令速查页"]
      },
      en: {
        title: "What This Page Is For",
        body: "Start from a proven task structure. Preview first, copy second, customize third.",
        pillsTitle: "Suggested Paths",
        pills: ["Find task templates", "Preview before copying", "Not for CLI lookup"]
      }
    },
    command: {
      zh: {
        title: "这里适合做什么",
        body: "命令中心用于查命令行命令、配置片段和速查表参考。先确认动作，再复制命令。",
        pillsTitle: "建议入口",
        pills: ["找命令", "找配置片段", "找速查表参考"]
      },
      en: {
        title: "What This Page Is For",
        body: "Find CLI commands, config snippets, and cheatsheet references. Confirm the move, then copy the command.",
        pillsTitle: "Suggested Paths",
        pills: ["Find commands", "Copy config snippets", "Use cheatsheet references"]
      }
    },
    troubleshooting: {
      zh: {
        title: "这里适合做什么",
        body: "故障排除用于先判断问题落在哪一层，再决定下一步排 doctor、gateway、channels、models 还是 memory。",
        pillsTitle: "建议入口",
        pills: ["先定层", "再缩范围", "最后回命令中心"]
      },
      en: {
        title: "What This Page Is For",
        body: "Localize the broken layer first, then decide whether to debug doctor, gateway, channels, models, or memory next.",
        pillsTitle: "Suggested Paths",
        pills: ["Localize the layer", "Narrow the scope", "Jump back later"]
      }
    },
    tutorial: {
      zh: {
        title: "这里适合做什么",
        body: "教程页用来补方法论、上手顺序和排错思路。模板库解决“拿什么开工”，命令中心解决“命令怎么写”，故障排除解决“从哪一层开始排”。这里解决“为什么这么做”。",
        pillsTitle: "建议入口",
        pills: ["补方法论", "理解顺序", "建立排错思路"],
        noteTitle: "阅读建议",
        noteBody: "如果你已经知道要做什么，先去模板库；如果你卡在报错或无响应，先去故障排除；如果你只需要确切命令，再去命令中心；如果你想理解背后的做法，再看教程。"
      },
      en: {
        title: "What This Page Is For",
        body: "Tutorials explain the reasoning, setup order, and debugging approach. Task Library answers what to start from. Command Center answers which command to run. Troubleshooting answers which layer to debug first.",
        pillsTitle: "Suggested Paths",
        pills: ["Learn the reasoning", "Understand the sequence", "Build debugging intuition"],
        noteTitle: "Reading Advice",
        noteBody: "If you already know the job, start with Task Library. If you are blocked by failures or no-response cases, use Troubleshooting. If you only need the exact command, use Command Center. Use Tutorials when you need the why behind the workflow."
      }
    }
  };

  function lang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function textFor(kind) {
    return copy[kind][lang()];
  }

  function paletteFor(kind) {
    const palettes = {
      task: {
        shell: "bg-[linear-gradient(135deg,rgba(94,38,18,0.92),rgba(48,24,14,0.94))]",
        inner: "bg-[linear-gradient(135deg,rgba(112,46,20,0.92),rgba(56,28,16,0.96))]",
        panel: "bg-amber-950/18",
        accent: "text-amber-100/62"
      },
      command: {
        shell: "bg-[linear-gradient(135deg,rgba(10,48,64,0.9),rgba(10,33,47,0.92))]",
        inner: "bg-[linear-gradient(135deg,rgba(13,52,69,0.92),rgba(11,33,47,0.96))]",
        panel: "bg-cyan-950/18",
        accent: "text-cyan-100/58"
      },
      troubleshooting: {
        shell: "bg-[linear-gradient(135deg,rgba(74,24,31,0.92),rgba(40,18,27,0.94))]",
        inner: "bg-[linear-gradient(135deg,rgba(88,28,36,0.92),rgba(45,18,29,0.96))]",
        panel: "bg-rose-950/18",
        accent: "text-rose-100/58"
      },
      tutorial: {
        shell: "bg-[linear-gradient(135deg,rgba(18,66,54,0.92),rgba(14,36,35,0.94))]",
        inner: "bg-[linear-gradient(135deg,rgba(22,79,63,0.92),rgba(12,40,37,0.96))]",
        panel: "bg-emerald-950/18",
        accent: "text-emerald-100/58"
      }
    };
    return palettes[kind] || palettes.command;
  }

  function pillMarkup(items) {
    return items
      .map(
        (item) =>
          `<span class="rounded-full bg-[linear-gradient(180deg,rgba(9,24,35,0.82),rgba(7,18,28,0.92))] px-4 py-2.5 text-xs text-white/90 shadow-[0_8px_20px_rgba(2,6,23,0.14),inset_0_0_0_1px_rgba(255,255,255,0.05)]">${item}</span>`
      )
      .join("");
  }

  function noteMarkup(text) {
    if (!text.noteTitle || !text.noteBody) return "";
    return `
      <div class="mt-5 rounded-[24px] bg-[linear-gradient(180deg,rgba(6,17,27,0.8),rgba(7,18,28,0.94))] px-5 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
        <div class="text-[11px] uppercase tracking-[0.24em] text-cyan-100/58">${text.noteTitle}</div>
        <p class="mt-3 text-[15px] leading-8 text-slate-100/86">${text.noteBody}</p>
      </div>
    `;
  }

  function buildGuideCard(kind, layout) {
    const text = textFor(kind);
    const palette = paletteFor(kind);
    const wrapper = document.createElement("article");
    wrapper.setAttribute("data-clarity-card", kind);

    if (layout === "compact") {
      wrapper.className =
        `overflow-hidden rounded-[28px] ${palette.shell} p-[1px] shadow-[0_20px_60px_rgba(2,6,23,0.22)]`;
      wrapper.innerHTML = `
        <div class="rounded-[27px] ${palette.inner} px-5 py-5">
          <div class="grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(250px,0.68fr)] xl:items-start">
            <div class="max-w-2xl">
              <h2 class="text-[clamp(1.5rem,2vw,2.1rem)] font-semibold tracking-tight text-white">${text.title}</h2>
              <p class="mt-4 max-w-[42rem] text-[15px] leading-8 text-slate-100/88">${text.body}</p>
            </div>
            <div class="rounded-[22px] ${palette.panel} px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
              <div class="text-[11px] uppercase tracking-[0.24em] ${palette.accent}">${text.pillsTitle}</div>
              <div class="mt-3 flex flex-wrap gap-3 text-xs">
                ${pillMarkup(text.pills)}
              </div>
            </div>
          </div>
          ${noteMarkup(text)}
        </div>
      `;
      return wrapper;
    }

    wrapper.className =
      `overflow-hidden rounded-[28px] ${palette.shell} p-[1px] shadow-[0_20px_60px_rgba(2,6,23,0.2)]`;
    wrapper.innerHTML = `
      <div class="rounded-[27px] ${palette.inner} p-5">
        <h2 class="text-xl font-semibold text-white">${text.title}</h2>
        <p class="mt-3 text-[15px] leading-7 text-slate-100/86">${text.body}</p>
        <div class="mt-5 rounded-[22px] ${palette.panel} px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div class="text-[11px] uppercase tracking-[0.24em] ${palette.accent}">${text.pillsTitle}</div>
          <div class="mt-3 flex flex-wrap gap-3 text-xs">
            ${pillMarkup(text.pills)}
          </div>
        </div>
        ${noteMarkup(text)}
      </div>
    `;
    return wrapper;
  }

  function injectTaskCard() {
    const aside = document.querySelector("#page-root > div > aside");
    if (!aside || aside.querySelector('[data-clarity-card="task"]')) return;
    aside.insertBefore(buildGuideCard("task", "aside"), aside.firstChild);
  }

  function injectCommandCard() {
    const container = document.querySelector("#page-root > div");
    const searchShell = container?.querySelector(":scope > div");
    const section = document.getElementById("command-sections");
    if (!container || !section || container.querySelector('[data-clarity-card="command"]')) return;
    const card = buildGuideCard("command", "compact");
    if (searchShell) {
      searchShell.insertAdjacentElement("afterend", card);
    } else {
      container.insertBefore(card, section);
    }
  }

  function injectTroubleshootingCard() {
    const aside = document.querySelector("#page-root aside");
    if (!aside || aside.querySelector('[data-clarity-card="troubleshooting"]')) return;
    aside.insertBefore(buildGuideCard("troubleshooting", "aside"), aside.firstChild);
  }

  function injectTutorialCard() {
    const section = document.querySelector("#page-root > div > section");
    if (!section || section.querySelector('[data-clarity-card="tutorial"]')) return;
    section.insertBefore(buildGuideCard("tutorial", "compact"), section.firstChild);
  }

  function run() {
    const path = window.location.pathname;
    if (path.endsWith("/pages/task-library.html")) injectTaskCard();
    if (path.endsWith("/pages/command-center.html")) injectCommandCard();
    if (path.endsWith("/pages/troubleshooting.html")) injectTroubleshootingCard();
    if (path.endsWith("/pages/tutorials.html")) injectTutorialCard();
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
