(function () {
  const state = {
    lang: localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh"
  };

  const copy = {
    zh: {
      title: "OpenClaw Resource Hub",
      eyebrow: "更快上手",
      subtitle: "首页现在只负责把你导向真正可用的页面，不再保留功能重叠的旧单页结构。",
      primary: "快速开始",
      secondary: "命令中心",
      modulesTitle: "核心页面",
      modulesSubtitle: "只保留真正有用的入口。模板库解决“拿什么开工”，命令中心解决“命令怎么写、问题怎么查”。",
      pathsTitle: "推荐路径",
      pathsSubtitle: "按你当前的目标进入，不需要先理解整站。",
      releaseTitle: "当前站点状态",
      releaseBody: "站点已经切换为独立页面结构。接下来重点是内容质量、双语完善、成本传播和模板深度。",
      footer: "首页现在只做导航入口，避免重复模块占据主路径。",
      langZh: "中文",
      langEn: "EN",
      modules: [
        { name: "快速开始", desc: "按环境选择安装命令，用最小配置先跑通。", href: "/pages/quickstart.html", badge: "Start" },
        { name: "命令中心", desc: "查 CLI 命令、配置片段和故障处理步骤。", href: "/pages/command-center.html", badge: "Cheatsheet" },
        { name: "模板库", desc: "找现成任务模板，先预览代码块再复制。", href: "/pages/task-library.html", badge: "Templates" },
        { name: "成本计算器", desc: "先算清日成本和月成本，再决定模型和使用规模。", href: "/pages/cost-calculator.html", badge: "Cost" },
        { name: "教程", desc: "从安装到排错，按场景补齐知识缺口。", href: "/pages/tutorials.html", badge: "Guides" },
        { name: "更新日志", desc: "跟踪当前版本做到了哪里，以及下一轮重点。", href: "/pages/release-notes.html", badge: "Updates" }
      ],
      paths: [
        { title: "第一次接触 OpenClaw", steps: ["先看快速开始", "再打开命令中心", "最后复制一个模板开始试跑"] },
        { title: "已经能跑，想控成本", steps: ["打开成本计算器", "比较不同模型", "再回到模板库优化任务结构"] },
        { title: "想立刻开始做事", steps: ["直接进入模板库", "按模板改成你的任务", "遇到问题再补教程和命令中心"] }
      ],
      statStructure: "独立页面",
      statLanguage: "中英切换",
      statGoal: "更快上手"
    },
    en: {
      title: "OpenClaw Resource Hub",
      eyebrow: "Launch Faster",
      subtitle: "The homepage now routes users to the pages that actually matter instead of keeping a bloated single-page shell alive.",
      primary: "Quick Start",
      secondary: "Command Center",
      modulesTitle: "Core Pages",
      modulesSubtitle: "Only the useful entry points remain. Task Library answers what to start from. Command Center answers which command, config, or fix to use.",
      pathsTitle: "Recommended Paths",
      pathsSubtitle: "Start from the goal you have right now instead of learning the whole site first.",
      releaseTitle: "Current Site Status",
      releaseBody: "The site has moved to a standalone-page structure. The next priority is stronger bilingual coverage, cleaner source data, cost sharing, and deeper templates.",
      footer: "The homepage now acts as a router so overlapping modules do not dilute the main path.",
      langZh: "中文",
      langEn: "EN",
      modules: [
        { name: "Quick Start", desc: "Choose your environment and run the smallest working setup first.", href: "/pages/quickstart.html", badge: "Start" },
        { name: "Command Center", desc: "Look up CLI commands, config snippets, and troubleshooting steps.", href: "/pages/command-center.html", badge: "Cheatsheet" },
        { name: "Task Library", desc: "Start from a ready-made task template and preview the code before copying.", href: "/pages/task-library.html", badge: "Templates" },
        { name: "Cost Calculator", desc: "Estimate daily and monthly cost before you scale up.", href: "/pages/cost-calculator.html", badge: "Cost" },
        { name: "Tutorials", desc: "Fill in knowledge gaps from setup to troubleshooting.", href: "/pages/tutorials.html", badge: "Guides" },
        { name: "Release Notes", desc: "Track what has shipped and what the next round will focus on.", href: "/pages/release-notes.html", badge: "Updates" }
      ],
      paths: [
        { title: "First time with OpenClaw", steps: ["Open Quick Start", "Then use Command Center", "Finally copy one template and run a first trial"] },
        { title: "Already running, need cost control", steps: ["Start with Cost Calculator", "Compare models", "Then optimize with Task Library"] },
        { title: "Want to start shipping quickly", steps: ["Open Task Library", "Adapt one template to your job", "Use Tutorials only when you hit a gap"] }
      ],
      statStructure: "Standalone Pages",
      statLanguage: "ZH / EN",
      statGoal: "Faster Onboarding"
    }
  };

  function render() {
    const text = copy[state.lang];
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.title = text.title;
    document.getElementById("landing-root").innerHTML = `
      <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-slate-100">
        <div class="pointer-events-none fixed inset-0 opacity-40" style="background-image:linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px); background-size: 32px 32px;"></div>
        <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <a href="/index.html" class="flex items-center gap-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-500/15 text-sm font-semibold tracking-[0.18em] text-orange-300">OC</span>
              <div>
                <div class="text-sm uppercase tracking-[0.28em] text-slate-400">OpenClaw</div>
                <div class="text-lg font-semibold text-white">Resource Hub</div>
              </div>
            </a>
            <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs">
              <button data-lang="zh" class="rounded-full px-3 py-1 transition ${state.lang === "zh" ? "bg-white text-slate-950" : "text-slate-300"}">${text.langZh}</button>
              <button data-lang="en" class="rounded-full px-3 py-1 transition ${state.lang === "en" ? "bg-white text-slate-950" : "text-slate-300"}">${text.langEn}</button>
            </div>
          </div>
        </header>
        <main class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <section class="grid gap-10 lg:grid-cols-[1.4fr,0.9fr] lg:items-end">
            <div>
              <p class="mb-4 text-xs uppercase tracking-[0.36em] text-orange-300">${text.eyebrow}</p>
              <h1 class="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                <span class="block sm:inline">OpenClaw</span>
                <span class="block sm:inline">Resource Hub</span>
              </h1>
              <p class="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">${text.subtitle}</p>
              <div class="mt-8 flex flex-wrap gap-3">
                <a href="/pages/quickstart.html" class="rounded-full bg-orange-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-orange-400">${text.primary}</a>
                <a href="/pages/command-center.html" class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-orange-400/40 hover:text-white">${text.secondary}</a>
              </div>
            </div>
            <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <article class="rounded-3xl border border-white/10 bg-white/5 p-5"><div class="text-sm text-slate-400">Structure</div><div class="mt-2 text-2xl font-semibold text-white">${text.statStructure}</div></article>
              <article class="rounded-3xl border border-white/10 bg-white/5 p-5"><div class="text-sm text-slate-400">Language</div><div class="mt-2 text-2xl font-semibold text-white">${text.statLanguage}</div></article>
              <article class="rounded-3xl border border-white/10 bg-white/5 p-5"><div class="text-sm text-slate-400">Goal</div><div class="mt-2 text-2xl font-semibold text-white">${text.statGoal}</div></article>
            </div>
          </section>

          <section class="mt-12 rounded-[28px] border border-white/10 bg-slate-950/50 p-5 shadow-2xl shadow-slate-950/20">
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-white">${text.modulesTitle}</h2>
              <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-300">${text.modulesSubtitle}</p>
            </div>
            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              ${text.modules.map((item) => `
                <a href="${item.href}" class="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange-400/40 hover:bg-white/[0.05]">
                  <div class="flex items-center justify-between gap-3">
                    <span class="rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-orange-200">${item.badge}</span>
                    <span class="text-xs text-slate-500">→</span>
                  </div>
                  <h3 class="mt-4 text-xl font-semibold text-white">${item.name}</h3>
                  <p class="mt-3 text-sm leading-6 text-slate-300">${item.desc}</p>
                </a>
              `).join("")}
            </div>
          </section>

          <section class="mt-10 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <div class="rounded-[28px] border border-white/10 bg-slate-950/50 p-5">
              <h2 class="text-2xl font-semibold text-white">${text.pathsTitle}</h2>
              <p class="mt-3 text-sm leading-7 text-slate-300">${text.pathsSubtitle}</p>
              <div class="mt-6 grid gap-4">
                ${text.paths.map((path) => `
                  <article class="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 class="text-lg font-semibold text-white">${path.title}</h3>
                    <ol class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      ${path.steps.map((step) => `<li class="rounded-2xl bg-white/5 px-3 py-3">${step}</li>`).join("")}
                    </ol>
                  </article>
                `).join("")}
              </div>
            </div>
            <aside class="rounded-[28px] border border-white/10 bg-slate-950/50 p-5">
              <h2 class="text-2xl font-semibold text-white">${text.releaseTitle}</h2>
              <p class="mt-4 text-sm leading-7 text-slate-300">${text.releaseBody}</p>
              <div class="mt-6 grid gap-3">
                <a href="/pages/release-notes.html" class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition hover:border-orange-400/40 hover:text-white">Release Notes</a>
                <a href="/pages/task-library.html" class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition hover:border-orange-400/40 hover:text-white">Task Library</a>
                <a href="/pages/command-center.html" class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition hover:border-orange-400/40 hover:text-white">Command Center</a>
              </div>
            </aside>
          </section>

          <footer class="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">${text.footer}</footer>
        </main>
      </div>
    `;

    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        state.lang = button.dataset.lang;
        localStorage.setItem("openclaw-module-lang", state.lang);
        localStorage.setItem("openclaw-lang", state.lang);
        render();
      });
    });
  }

  render();
})();
