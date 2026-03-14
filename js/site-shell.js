(function () {
  const navItems = [
    {
      id: "quickstart",
      href: "/pages/quickstart.html",
      label: { zh: "快速开始", en: "Quick Start" }
    },
    {
      id: "command-center",
      href: "/pages/command-center.html",
      label: { zh: "命令中心", en: "Command Center" }
    },
    {
      id: "task-library",
      href: "/pages/task-library.html",
      label: { zh: "模板库", en: "Task Library" }
    },
    {
      id: "cost-calculator",
      href: "/pages/cost-calculator.html",
      label: { zh: "成本计算器", en: "Cost Calculator" }
    },
    {
      id: "tutorials",
      href: "/pages/tutorials.html",
      label: { zh: "教程", en: "Tutorials" }
    },
    {
      id: "release-notes",
      href: "/pages/release-notes.html",
      label: { zh: "更新日志", en: "Release Notes" }
    }
  ];

  function labelFor(item, lang) {
    return item.label[lang] || item.label.en;
  }

  function renderHeader(options) {
    const lang = options.lang === "en" ? "en" : "zh";
    const currentPage = options.currentPage;
    const brandTop = options.brandTop || "OPENCLAW";
    const brandBottom = options.brandBottom || "OpenClaw Resource Hub";

    return `
      <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between gap-4">
            <a href="/index.html" class="flex min-w-0 items-center gap-3">
              <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-500/15 text-sm font-semibold tracking-[0.18em] text-orange-300">OC</span>
              <span class="min-w-0">
                <span class="block truncate text-sm uppercase tracking-[0.28em] text-slate-400">${brandTop}</span>
                <span class="block truncate text-lg font-semibold text-white">${brandBottom}</span>
              </span>
            </a>
            <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs">
              <button data-lang="zh" class="rounded-full px-3 py-1 transition ${lang === "zh" ? "bg-white text-slate-950" : "text-slate-300"}">中文</button>
              <button data-lang="en" class="rounded-full px-3 py-1 transition ${lang === "en" ? "bg-white text-slate-950" : "text-slate-300"}">EN</button>
            </div>
          </div>
          <nav class="mt-3 flex gap-2 overflow-x-auto pb-1 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            ${navItems.map((item) => {
              const active = item.id === currentPage;
              return `<a href="${item.href}" class="shrink-0 rounded-full px-3 py-2 transition ${active ? "bg-orange-500 text-slate-950" : "border border-white/10 bg-white/5 text-slate-300 hover:border-orange-400/40 hover:text-white"}">${labelFor(item, lang)}</a>`;
            }).join("")}
          </nav>
        </div>
      </header>
    `;
  }

  window.openClawSiteShell = {
    navItems,
    renderHeader
  };
})();
