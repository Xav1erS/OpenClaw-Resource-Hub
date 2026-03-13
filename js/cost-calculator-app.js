(function () {
  const state = {
    lang: localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh",
    activePreset: "operator",
    answers: { frequency: "6-20", complexity: "medium", web: "some", output: "medium" },
    advancedOpen: false,
    advancedLinked: true,
    advanced: { model: "claude-sonnet-4.6", dailyTasks: 12, stepsPerTask: 50 },
    summary: null,
    shareCanvas: null,
    shareDataUrl: "",
    toast: ""
  };

  const copy = {
    zh: {
      brand: "OpenClaw Resource Hub",
      pageTag: "传播优先",
      title: "成本计算器",
      subtitle: "先用人话问卷估算 Agent 成本，再把结果导出成一张可以转发的分享卡片。",
      helper: "默认模式不要求你理解内部参数。只有在你真的需要精调时，再展开高级模式。",
      nav: [
        { name: "快速开始", href: "/pages/quickstart.html" },
        { name: "命令中心", href: "/pages/command-center.html" },
        { name: "模板库", href: "/pages/task-library.html" },
        { name: "教程", href: "/pages/tutorials.html" },
        { name: "更新日志", href: "/pages/release-notes.html" }
      ],
      stats: [
        { label: "估算方式", value: "4 题问卷" },
        { label: "分享链路", value: "PNG / 文案 / 链接" },
        { label: "目标场景", value: "社交传播" }
      ],
      presetTitle: "快速预设",
      questionnaireTitle: "你的日常使用强度更像哪一种？",
      questionnaireBody: "先回答 4 个每天都会遇到的问题，系统会自动映射成推荐模型和内部工作量。",
      presets: {
        starter: { label: "轻量试跑", desc: "第一次跑起来，先看最低可用成本。" },
        operator: { label: "日常运营", desc: "中等频率，需要稳定输出。" },
        content: { label: "内容团队", desc: "输出偏长，更适合内容生产。" },
        browser: { label: "网页链路", desc: "经常联网或操作网页。" },
        scale: { label: "高频规模化", desc: "高频、多步骤、持续运行。" }
      },
      questions: {
        frequency: { key: "每天使用次数", title: "你每天大概会用几次？", options: { "1-5": "1-5 次", "6-20": "6-20 次", "21-50": "21-50 次", "50+": "50+ 次" } },
        complexity: { key: "任务复杂度", title: "单次任务复杂度如何？", options: { simple: "简单", medium: "中等", hard: "复杂" } },
        web: { key: "联网频率", title: "是否经常需要联网或打开网页？", options: { rare: "很少", some: "有时", high: "经常" } },
        output: { key: "输出长度", title: "输出通常有多长？", options: { short: "简短结论", medium: "中等篇幅", long: "长输出" } }
      },
      advancedTitle: "高级模式",
      advancedBody: "如果你已经知道自己的运行量，可以手动覆盖系统映射值。默认会一直跟随问卷答案。",
      advancedOn: "当前跟随问卷",
      advancedOff: "当前为手动覆盖",
      advancedToggleOpen: "展开高级模式",
      advancedToggleClose: "收起高级模式",
      advancedSync: "重新跟随问卷",
      advancedFields: { model: "推荐模型", dailyTasks: "每日运行次数", stepsPerTask: "单次链路步数" },
      resultTitle: "解释型结果",
      resultLead: "这里不只是给你一串数字，而是告诉你这个 Agent 现在大概是什么量级、为什么会花这些钱。",
      recommendedModel: "推荐模型",
      dailyCost: "日成本",
      monthlyCost: "月成本",
      warning: "成本等级",
      workload: "映射后的内部工作量",
      workloadBody: "问卷会自动换算成内部工作量，供高级模式和模型对比复用。",
      suggestionsTitle: "最重要的优化建议",
      comparisonTitle: "模型对比",
      comparisonBody: "如果你的目标是传播效果，先看每天和每月大概花多少钱，再决定是否值得上更贵的模型。",
      shareTitle: "分享卡片",
      shareBody: "这张卡片需要在别人截图后也能看懂，不要求对方先理解 OpenClaw 的内部术语。",
      generateCard: "生成分享卡片",
      downloadCard: "下载 PNG",
      copyText: "复制分享文案",
      shareNow: "分享或复制链接",
      generatedLabel: "卡片预览",
      copied: "已复制",
      cardReady: "分享卡片已更新",
      shared: "已完成分享",
      shareFallback: "已复制分享文案和链接",
      shareUnsupported: "当前浏览器不支持原生分享",
      advancedHint: "高级模式一旦修改，就会优先使用你手动输入的值。",
      footer: "这个页面现在只做一件事：把预算结论变成可传播、可决策的结果。"
    },
    en: {
      brand: "OpenClaw Resource Hub",
      pageTag: "Share-First",
      title: "Cost Calculator",
      subtitle: "Estimate your agent cost with a human-readable questionnaire, then export the result as a shareable card.",
      helper: "The default mode does not ask you to understand internal parameters. Open advanced mode only when you need tighter control.",
      nav: [
        { name: "Quick Start", href: "/pages/quickstart.html" },
        { name: "Command Center", href: "/pages/command-center.html" },
        { name: "Task Library", href: "/pages/task-library.html" },
        { name: "Tutorials", href: "/pages/tutorials.html" },
        { name: "Release Notes", href: "/pages/release-notes.html" }
      ],
      stats: [
        { label: "Estimator", value: "4-question flow" },
        { label: "Sharing", value: "PNG / text / link" },
        { label: "Designed for", value: "Social distribution" }
      ],
      presetTitle: "Quick Presets",
      questionnaireTitle: "What does your daily workload look like?",
      questionnaireBody: "Answer four plain-language questions and the page maps them into a recommended model and internal workload.",
      presets: {
        starter: { label: "Starter", desc: "A first run with the smallest acceptable budget." },
        operator: { label: "Operator", desc: "A steady daily workflow with balanced output." },
        content: { label: "Content Team", desc: "Longer outputs for publishing or repurposing." },
        browser: { label: "Web Workflow", desc: "Frequent browsing or web actions." },
        scale: { label: "Scaled Usage", desc: "High-volume, long-running usage." }
      },
      questions: {
        frequency: { key: "Usage per day", title: "How many times will you use it per day?", options: { "1-5": "1-5 runs", "6-20": "6-20 runs", "21-50": "21-50 runs", "50+": "50+ runs" } },
        complexity: { key: "Task complexity", title: "How complex is a typical task?", options: { simple: "Simple", medium: "Medium", hard: "Complex" } },
        web: { key: "Web access", title: "How often does it need web access?", options: { rare: "Rarely", some: "Sometimes", high: "Often" } },
        output: { key: "Output length", title: "How long is the output?", options: { short: "Short answer", medium: "Medium length", long: "Long output" } }
      },
      advancedTitle: "Advanced Mode",
      advancedBody: "If you already know your workload, you can override the mapped values. By default it stays linked to the questionnaire.",
      advancedOn: "Currently linked to questionnaire",
      advancedOff: "Currently using manual override",
      advancedToggleOpen: "Open advanced mode",
      advancedToggleClose: "Close advanced mode",
      advancedSync: "Relink to questionnaire",
      advancedFields: { model: "Suggested model", dailyTasks: "Runs per day", stepsPerTask: "Steps in one run" },
      resultTitle: "Interpreted Result",
      resultLead: "This section should explain what kind of agent you are operating, not just print a price tag.",
      recommendedModel: "Recommended model",
      dailyCost: "Daily cost",
      monthlyCost: "Monthly cost",
      warning: "Cost level",
      workload: "Mapped internal workload",
      workloadBody: "The questionnaire converts your answers into an internal workload so advanced mode and model comparison can reuse the same estimate.",
      suggestionsTitle: "Top optimization moves",
      comparisonTitle: "Model comparison",
      comparisonBody: "If sharing is the goal, focus on daily and monthly spend first, then decide whether the quality jump is worth it.",
      shareTitle: "Share Card",
      shareBody: "The card should make sense even after a screenshot, without forcing the viewer to learn OpenClaw internals first.",
      generateCard: "Generate card",
      downloadCard: "Download PNG",
      copyText: "Copy share text",
      shareNow: "Share or copy link",
      generatedLabel: "Card preview",
      copied: "Copied",
      cardReady: "Share card refreshed",
      shared: "Shared",
      shareFallback: "Share text and link copied",
      shareUnsupported: "Native share is not available here",
      advancedHint: "Once advanced mode is edited, your manual values take priority.",
      footer: "This page now does one job: turn budget math into a decision-ready, share-ready conclusion."
    }
  };

  function t() {
    return copy[state.lang];
  }

  function track(name, params) {
    if (typeof window.trackEvent === "function") {
      window.trackEvent(name, { lang: state.lang, ...(params || {}) });
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function money(value) {
    return `$${value.toFixed(2)}`;
  }

  function questionOptionLabel(question, optionKey, lang = state.lang) {
    return copy[lang].questions[question].options[optionKey];
  }

  function warningLabel(level, lang = state.lang) {
    return window.warningLabels[lang][level];
  }

  function applyPreset(presetId) {
    const preset = window.scenarioPresets[presetId];
    if (!preset) return;
    state.activePreset = presetId;
    state.answers = { ...preset.answers };
    state.advancedLinked = true;
    syncAdvancedFromAnswers();
    track("cost_preset_selected", { preset: presetId });
    renderApp();
  }

  function syncAdvancedFromAnswers() {
    const mapped = window.mapQuestionnaireToWorkload(state.answers);
    state.advanced.model = mapped.recommendedModel;
    state.advanced.dailyTasks = mapped.dailyTasks;
    state.advanced.stepsPerTask = mapped.stepsPerTask;
  }

  function getSummary() {
    const mapped = window.mapQuestionnaireToWorkload(state.answers);
    const effective = state.advancedLinked
      ? { model: mapped.recommendedModel, dailyTasks: mapped.dailyTasks, stepsPerTask: mapped.stepsPerTask }
      : { ...state.advanced };
    const result = window.calculateCost(effective.model, Number(effective.dailyTasks), Number(effective.stepsPerTask));
    const model = window.modelPricing[effective.model];
    const suggestions = window.getOptimizationSuggestions(effective.model, Number(effective.dailyTasks), Number(effective.stepsPerTask));
    const comparisons = window.compareModels(Number(effective.dailyTasks), Number(effective.stepsPerTask), effective.model);
    const summary = {
      lang: state.lang,
      modelId: effective.model,
      modelName: model.name,
      dailyTasks: Number(effective.dailyTasks),
      stepsPerTask: Number(effective.stepsPerTask),
      dailyCost: result.daily,
      monthlyCost: result.monthly,
      warning: result.warning,
      warningLabel: warningLabel(result.warning.level),
      suggestions,
      comparisons,
      frequencyKey: state.answers.frequency,
      complexityKey: state.answers.complexity,
      frequencyLabel: questionOptionLabel("frequency", state.answers.frequency),
      complexityLabel: questionOptionLabel("complexity", state.answers.complexity),
      frequencyLabelZh: questionOptionLabel("frequency", state.answers.frequency, "zh"),
      frequencyLabelEn: questionOptionLabel("frequency", state.answers.frequency, "en"),
      takeawayZh: "",
      takeawayEn: ""
    };
    summary.takeawayZh = window.buildCostNarrative(summary, "zh");
    summary.takeawayEn = window.buildCostNarrative(summary, "en");
    summary.takeaway = state.lang === "zh" ? summary.takeawayZh : summary.takeawayEn;
    return summary;
  }

  function refreshShareCard() {
    state.summary = getSummary();
    state.shareCanvas = window.generateShareCard(state.summary);
    state.shareDataUrl = state.shareCanvas.toDataURL("image/png");
  }

  function renderPresetCards() {
    const text = t();
    return Object.keys(window.scenarioPresets).map((presetId) => {
      const preset = text.presets[presetId];
      const active = state.activePreset === presetId;
      return `
        <button data-preset="${presetId}" class="rounded-[28px] border p-4 text-left transition ${active ? "border-orange-300/40 bg-orange-500/15" : "border-white/10 bg-white/[0.03] hover:border-orange-300/30 hover:bg-white/[0.05]"}">
          <div class="text-sm font-medium text-white">${preset.label}</div>
          <div class="mt-2 text-sm leading-6 text-slate-300">${preset.desc}</div>
        </button>
      `;
    }).join("");
  }

  function renderQuestionBlocks() {
    const text = t();
    return Object.entries(text.questions).map(([key, question]) => `
      <article class="rounded-[28px] border border-white/10 bg-slate-950/60 p-5">
        <div class="text-sm uppercase tracking-[0.24em] text-slate-400">${question.key}</div>
        <h3 class="mt-3 text-xl font-semibold text-white">${question.title}</h3>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          ${Object.entries(question.options).map(([optionKey, label]) => `
            <button data-question="${key}" data-value="${optionKey}" class="rounded-2xl border px-4 py-4 text-left transition ${state.answers[key] === optionKey ? "border-sky-300/30 bg-sky-400/10 text-white" : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-sky-300/25 hover:bg-white/[0.05]"}">
              <span class="block text-base font-medium">${label}</span>
            </button>
          `).join("")}
        </div>
      </article>
    `).join("");
  }

  function renderSuggestionList() {
    const savingsLabel = state.lang === "zh" ? "预计每月节省" : "Potential monthly savings";
    return state.summary.suggestions.map((item) => `
      <li class="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm leading-6 text-slate-200">
        ${escapeHtml(state.lang === "zh" ? item.textZh : item.text)}
        <div class="mt-2 text-xs uppercase tracking-[0.2em] text-emerald-300">${savingsLabel} ${money(item.savings)}</div>
      </li>
    `).join("");
  }

  function renderComparisonCards() {
    return state.summary.comparisons.slice(0, 4).map((item) => `
      <article class="rounded-3xl border ${item.isSelected ? "border-orange-300/40 bg-orange-500/10" : "border-white/10 bg-white/[0.03]"} p-4">
        <div class="flex items-center justify-between gap-3">
          <div class="text-base font-medium text-white">${item.model.name}</div>
          <div class="text-xs uppercase tracking-[0.2em] text-slate-400">Q${item.model.quality}</div>
        </div>
        <div class="mt-4 text-3xl font-semibold text-white">${money(item.cost.monthly)}</div>
        <div class="mt-1 text-sm text-slate-400">/ month</div>
        <div class="mt-4 text-sm text-slate-300">${money(item.cost.daily)} / day</div>
      </article>
    `).join("");
  }

  function workloadChip(label) {
    return `<span class="rounded-full border border-white/10 bg-white/5 px-3 py-2">${label}</span>`;
  }

  function renderApp() {
    refreshShareCard();
    const text = t();
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.title = `${text.title} | OpenClaw Resource Hub`;

    const usageChip = state.lang === "zh" ? `${state.summary.dailyTasks} 次/天` : `${state.summary.dailyTasks} runs/day`;
    const stepChip = state.lang === "zh" ? `${state.summary.stepsPerTask} 步/次` : `${state.summary.stepsPerTask} steps/run`;

    document.body.className = "min-h-screen bg-slate-950 text-slate-100";
    document.body.innerHTML = `
      <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_48%,_#111827_100%)]">
        <div class="pointer-events-none fixed inset-0 opacity-40" style="background-image:linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px); background-size: 30px 30px;"></div>
        <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <a href="/index.html" class="flex items-center gap-3">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-500/10 text-sm font-semibold tracking-[0.22em] text-orange-200">OC</span>
              <div>
                <div class="text-xs uppercase tracking-[0.34em] text-slate-400">${text.pageTag}</div>
                <div class="text-lg font-semibold text-white">${text.brand}</div>
              </div>
            </a>
            <nav class="hidden items-center gap-5 text-sm text-slate-300 xl:flex">
              ${text.nav.map((item) => `<a href="${item.href}" class="transition hover:text-white">${item.name}</a>`).join("")}
            </nav>
            <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs">
              <button data-lang="zh" class="rounded-full px-3 py-1 transition ${state.lang === "zh" ? "bg-white text-slate-950" : "text-slate-300"}">中文</button>
              <button data-lang="en" class="rounded-full px-3 py-1 transition ${state.lang === "en" ? "bg-white text-slate-950" : "text-slate-300"}">EN</button>
            </div>
          </div>
        </header>

        <main class="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <section class="grid gap-8 lg:grid-cols-[1.18fr,0.82fr] lg:items-end">
            <div>
              <p class="mb-4 text-xs uppercase tracking-[0.38em] text-orange-200">${text.pageTag}</p>
              <h1 class="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">${text.title}</h1>
              <p class="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">${text.subtitle}</p>
              <p class="mt-5 max-w-3xl text-sm leading-7 text-slate-400">${text.helper}</p>
            </div>
            <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              ${text.stats.map((item) => `
                <article class="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div class="text-sm text-slate-400">${item.label}</div>
                  <div class="mt-2 text-2xl font-semibold text-white">${item.value}</div>
                </article>
              `).join("")}
            </div>
          </section>

          <section class="mt-10 grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
            <div class="space-y-6">
              <article class="rounded-[32px] border border-white/10 bg-slate-950/55 p-6">
                <h2 class="text-2xl font-semibold text-white">${text.presetTitle}</h2>
                <p class="mt-2 text-sm leading-7 text-slate-300">${text.questionnaireBody}</p>
                <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">${renderPresetCards()}</div>
              </article>

              <article class="rounded-[32px] border border-white/10 bg-slate-950/55 p-6">
                <h2 class="text-2xl font-semibold text-white">${text.questionnaireTitle}</h2>
                <div class="mt-6 grid gap-4 xl:grid-cols-2">${renderQuestionBlocks()}</div>
              </article>

              <article class="rounded-[32px] border border-white/10 bg-slate-950/55 p-6">
                <div class="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 class="text-2xl font-semibold text-white">${text.advancedTitle}</h2>
                    <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-300">${text.advancedBody}</p>
                  </div>
                  <button data-toggle-advanced class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-orange-300/30 hover:text-white">
                    ${state.advancedOpen ? text.advancedToggleClose : text.advancedToggleOpen}
                  </button>
                </div>
                <div class="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em]">
                  <span class="rounded-full border ${state.advancedLinked ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200" : "border-amber-300/30 bg-amber-400/10 text-amber-200"} px-3 py-2">${state.advancedLinked ? text.advancedOn : text.advancedOff}</span>
                  <span class="text-slate-400">${text.advancedHint}</span>
                </div>
                ${state.advancedOpen ? `
                  <div class="mt-6 grid gap-4 md:grid-cols-3">
                    <label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div class="text-sm text-slate-400">${text.advancedFields.model}</div>
                      <select data-advanced="model" class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none">
                        ${Object.entries(window.modelPricing).map(([modelId, model]) => `<option value="${modelId}" ${state.advanced.model === modelId ? "selected" : ""}>${model.name}</option>`).join("")}
                      </select>
                    </label>
                    <label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div class="text-sm text-slate-400">${text.advancedFields.dailyTasks}</div>
                      <input data-advanced="dailyTasks" type="number" min="1" value="${state.advanced.dailyTasks}" class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none">
                    </label>
                    <label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div class="text-sm text-slate-400">${text.advancedFields.stepsPerTask}</div>
                      <input data-advanced="stepsPerTask" type="number" min="1" value="${state.advanced.stepsPerTask}" class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none">
                    </label>
                  </div>
                  <div class="mt-4">
                    <button data-relink class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-300/30 hover:text-white">${text.advancedSync}</button>
                  </div>
                ` : ""}
              </article>
            </div>

            <div class="space-y-6">
              <article class="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
                <h2 class="text-2xl font-semibold text-white">${text.resultTitle}</h2>
                <p class="mt-2 text-sm leading-7 text-slate-300">${text.resultLead}</p>
                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                  <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.recommendedModel}</div><div class="mt-3 text-2xl font-semibold text-white">${state.summary.modelName}</div></div>
                  <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.warning}</div><div class="mt-3 text-2xl font-semibold" style="color:${state.summary.warning.accent}">${state.summary.warningLabel}</div></div>
                  <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.dailyCost}</div><div class="mt-3 text-3xl font-semibold text-white">${money(state.summary.dailyCost)}</div></div>
                  <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.monthlyCost}</div><div class="mt-3 text-3xl font-semibold text-white">${money(state.summary.monthlyCost)}</div></div>
                </div>
                <div class="mt-5 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <div class="text-sm text-slate-400">${text.workload}</div>
                  <div class="mt-3 flex flex-wrap gap-3 text-sm text-slate-200">
                    ${workloadChip(state.summary.frequencyLabel)}
                    ${workloadChip(state.summary.complexityLabel)}
                    ${workloadChip(usageChip)}
                    ${workloadChip(stepChip)}
                  </div>
                  <p class="mt-4 text-sm leading-7 text-slate-300">${text.workloadBody}</p>
                  <p class="mt-4 text-base leading-8 text-white">${state.summary.takeaway}</p>
                </div>
              </article>

              <article class="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
                <h2 class="text-2xl font-semibold text-white">${text.suggestionsTitle}</h2>
                <ul class="mt-5 space-y-3">${renderSuggestionList()}</ul>
              </article>

              <article class="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
                <h2 class="text-2xl font-semibold text-white">${text.comparisonTitle}</h2>
                <p class="mt-2 text-sm leading-7 text-slate-300">${text.comparisonBody}</p>
                <div class="mt-5 grid gap-4 md:grid-cols-2">${renderComparisonCards()}</div>
              </article>
            </div>
          </section>

          <section class="mt-10 rounded-[36px] border border-white/10 bg-slate-950/55 p-6">
            <div class="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
              <div>
                <h2 class="text-3xl font-semibold text-white">${text.shareTitle}</h2>
                <p class="mt-3 max-w-xl text-sm leading-7 text-slate-300">${text.shareBody}</p>
                <div class="mt-6 grid gap-3 sm:grid-cols-2">
                  <button data-generate-card class="rounded-full bg-orange-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-orange-400">${text.generateCard}</button>
                  <button data-download-card class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-orange-300/30 hover:text-white">${text.downloadCard}</button>
                  <button data-copy-share class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-orange-300/30 hover:text-white">${text.copyText}</button>
                  <button data-share-card class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-orange-300/30 hover:text-white">${text.shareNow}</button>
                </div>
              </div>
              <div class="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
                <div class="mb-4 flex items-center justify-between gap-3">
                  <div class="text-sm uppercase tracking-[0.24em] text-slate-400">${text.generatedLabel}</div>
                  <div class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">${state.summary.warningLabel}</div>
                </div>
                <img src="${state.shareDataUrl}" alt="Share card preview" class="w-full rounded-[28px] border border-white/10 bg-slate-950 object-cover shadow-2xl shadow-slate-950/40">
              </div>
            </div>
          </section>

          <footer class="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">${text.footer}</footer>
        </main>

        <div id="cost-toast" class="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-sm text-slate-100 shadow-lg shadow-slate-950/50 ${state.toast ? "opacity-100" : "opacity-0"} transition">${state.toast || ""}</div>
      </div>
    `;

    bindEvents();
  }

  function showToast(message) {
    state.toast = message;
    renderApp();
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      state.toast = "";
      renderApp();
    }, 1800);
  }

  function bindEvents() {
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        state.lang = button.dataset.lang;
        localStorage.setItem("openclaw-module-lang", state.lang);
        localStorage.setItem("openclaw-lang", state.lang);
        renderApp();
      });
    });

    document.querySelectorAll("[data-preset]").forEach((button) => {
      button.addEventListener("click", () => applyPreset(button.dataset.preset));
    });

    document.querySelectorAll("[data-question]").forEach((button) => {
      button.addEventListener("click", () => {
        state.answers[button.dataset.question] = button.dataset.value;
        track("cost_question_answered", { question: button.dataset.question, answer: button.dataset.value });
        if (state.advancedLinked) syncAdvancedFromAnswers();
        renderApp();
      });
    });

    const advancedToggle = document.querySelector("[data-toggle-advanced]");
    if (advancedToggle) {
      advancedToggle.addEventListener("click", () => {
        state.advancedOpen = !state.advancedOpen;
        track("cost_advanced_toggled", { open: state.advancedOpen });
        renderApp();
      });
    }

    document.querySelectorAll("[data-advanced]").forEach((field) => {
      field.addEventListener("input", () => {
        const key = field.dataset.advanced;
        state.advanced[key] = key === "model" ? field.value : Math.max(1, Number(field.value || 1));
        state.advancedLinked = false;
        track("cost_advanced_edited", { field: key });
        renderApp();
      });
    });

    const relink = document.querySelector("[data-relink]");
    if (relink) {
      relink.addEventListener("click", () => {
        state.advancedLinked = true;
        syncAdvancedFromAnswers();
        track("cost_advanced_relinked");
        renderApp();
      });
    }

    const generate = document.querySelector("[data-generate-card]");
    if (generate) {
      generate.addEventListener("click", () => {
        refreshShareCard();
        track("cost_card_generated", {
          model: state.summary.modelId,
          daily_cost: Number(state.summary.dailyCost.toFixed(2)),
          monthly_cost: Number(state.summary.monthlyCost.toFixed(2))
        });
        renderApp();
        showToast(t().cardReady);
      });
    }

    const download = document.querySelector("[data-download-card]");
    if (download) {
      download.addEventListener("click", () => {
        track("cost_card_downloaded", { model: state.summary.modelId, warning: state.summary.warning.level });
        window.downloadCanvasAsPng(state.shareCanvas);
      });
    }

    const copyShare = document.querySelector("[data-copy-share]");
    if (copyShare) {
      copyShare.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(window.buildShareText(state.summary, state.lang));
          track("cost_share_text_copied", { model: state.summary.modelId, warning: state.summary.warning.level });
          showToast(t().copied);
        } catch (error) {
          console.error(error);
        }
      });
    }

    const shareCard = document.querySelector("[data-share-card]");
    if (shareCard) {
      shareCard.addEventListener("click", async () => {
        try {
          const result = await window.shareCostResult(state.summary, state.lang, state.shareCanvas);
          track("cost_share_triggered", { mode: result.mode, model: state.summary.modelId, warning: state.summary.warning.level });
          if (result.mode === "native") {
            showToast(t().shared);
          } else if (result.mode === "clipboard") {
            showToast(t().shareFallback);
          } else {
            showToast(t().shareUnsupported);
          }
        } catch (error) {
          console.error(error);
          showToast(t().shareUnsupported);
        }
      });
    }
  }

  syncAdvancedFromAnswers();
  renderApp();
})();
