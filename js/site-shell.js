(function () {
  const navItems = [
    { id: "quickstart", href: "/pages/quickstart.html", label: { zh: "快速开始", en: "Quick Start" } },
    { id: "command-center", href: "/pages/command-center.html", label: { zh: "命令中心", en: "Command Center" } },
    { id: "troubleshooting", href: "/pages/troubleshooting.html", label: { zh: "故障排除", en: "Troubleshooting" } },
    { id: "task-library", href: "/pages/task-library.html", label: { zh: "任务模板库", en: "Task Library" } },
    { id: "cost-calculator", href: "/pages/cost-calculator.html", label: { zh: "成本计算器", en: "Cost Calculator" } },
    { id: "release-notes", href: "/pages/release-notes.html", label: { zh: "更新日志", en: "Release Notes" } }
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
      <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between gap-4">
            <a href="/index.html" class="flex min-w-0 items-center gap-3">
              <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-400/30 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.22),rgba(127,29,29,0.22)),linear-gradient(180deg,rgba(69,10,10,0.94),rgba(31,41,55,0.94))] text-sm font-semibold tracking-[0.18em] text-red-100 shadow-lg shadow-red-950/30">OC</span>
              <span class="min-w-0">
                <span class="block truncate text-sm uppercase tracking-[0.28em] text-slate-400">${brandTop}</span>
                <span class="block truncate text-lg font-semibold text-white">${brandBottom}</span>
              </span>
            </a>
            <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs shadow-[0_10px_30px_rgba(2,6,23,0.2)]">
              <button data-lang="zh" class="rounded-full px-3 py-1.5 transition ${lang === "zh" ? "bg-white text-slate-950 shadow-sm" : "text-slate-300 hover:text-white"}">中文</button>
              <button data-lang="en" class="rounded-full px-3 py-1.5 transition ${lang === "en" ? "bg-white text-slate-950 shadow-sm" : "text-slate-300 hover:text-white"}">EN</button>
            </div>
          </div>
          <nav class="mt-4 flex gap-2 overflow-x-auto pb-1 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            ${navItems.map((item) => {
              const active = item.id === currentPage;
              return `<a href="${item.href}" class="shrink-0 rounded-full px-4 py-2.5 transition ${active ? "bg-red-500 text-white shadow-lg shadow-red-950/30" : "border border-white/10 bg-white/5 text-slate-300 hover:border-red-400/40 hover:bg-white/10 hover:text-white"}">${labelFor(item, lang)}</a>`;
            }).join("")}
          </nav>
        </div>
      </header>
    `;
  }

  function normalizeThemeClasses(root) {
    if (!root || !root.querySelectorAll) return;

    const replacements = [
      ["orange-500", "red-500"],
      ["orange-400", "red-400"],
      ["orange-300", "red-200"],
      ["orange-200", "red-200"],
      ["orange-950", "red-950"],
      ["text-slate-950", "text-white"]
    ];

    root.querySelectorAll("*").forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const value = node.getAttribute("class");
      if (!value || !value.includes("orange-")) return;

      let next = value;
      replacements.forEach(([from, to]) => {
        next = next.split(from).join(to);
      });

      if (next !== value) {
        node.setAttribute("class", next);
      }
    });
  }

  function startThemeObserver() {
    const apply = () => normalizeThemeClasses(document.body);
    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        apply();
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", schedule, { once: true });
    } else {
      schedule();
    }

    const observer = new MutationObserver(() => schedule());
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  window.openClawSiteShell = {
    navItems,
    renderHeader
  };

  startThemeObserver();
})();
