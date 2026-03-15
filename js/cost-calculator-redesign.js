(function () {
  const state = {
    lang: localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh",
    activePreset: "operator",
    answers: {
      frequency: "6-20",
      complexity: "medium",
      web: "some",
      output: "medium"
    },
    selectedProvider: "anthropic",
    selectedModelId: "claude-sonnet-4.6",
    advancedOpen: false,
    advancedLinked: true,
    advanced: {
      dailyTasks: 12,
      stepsPerTask: 50
    },
    summary: null,
    shareCanvas: null,
    shareDataUrl: ""
  };

  const copy = {
    zh: {
      brandTop: "OPENCLAW",
      brandBottom: "Resource Hub",
      pageTag: "成本预估",
      title: "成本计算器",
      subtitle: "先固定你要用的模型，再按任务强度估算每天会吃掉多少 Token，最后统一看结果并生成分享卡片。",
      helper: "快速预设只调整任务强度，不会再偷偷切换模型。模型始终由你自己决定。",
      stats: [
        { label: "估算方式", value: "模型 + 任务强度" },
        { label: "输出结果", value: "Token + 成本 + 卡片" },
        { label: "传播目标", value: "结果确认后可直接分享" }
      ],
      setupTag: "输入区",
      setupTitle: "先选择模型与任务",
      setupBody: "先固定模型，再用预设和问题把任务强度调准。页面会直接按你当前的输入估算 Token 和成本。",
      modelTitle: "1. 选择模型",
      modelBody: "先选厂商，再选具体模型。后面的任务预设和问题只改工作量，不改模型。",
      providerLabel: "模型厂商",
      modelLabel: "具体模型",
      presetTitle: "2. 快速预设",
      presetBody: "如果你只想快速落到一个大致区间，先点一个最接近的预设，再继续细调下面的问题。",
      presets: {
        starter: { label: "轻量试跑", desc: "第一次跑起来，先看最低可用成本。" },
        operator: { label: "日常运营", desc: "中等频率，需要稳定输出。" },
        content: { label: "内容团队", desc: "输出偏长，适合内容生产。" },
        browser: { label: "网页链路", desc: "经常联网或操作网页。" },
        scale: { label: "高频规模化", desc: "高频、多步骤、持续运行。" }
      },
      questionnaireTitle: "3. 任务强度问卷",
      questionnaireBody: "这 4 个问题决定每天运行次数和单次链路步数，用来估算 Token 消耗。",
      questions: {
        frequency: { key: "每天使用次数", title: "你每天大概会用几次？", options: { "1-5": "1-5 次", "6-20": "6-20 次", "21-50": "21-50 次", "50+": "50+ 次" } },
        complexity: { key: "任务复杂度", title: "单次任务复杂度如何？", options: { simple: "简单", medium: "中等", hard: "复杂" } },
        web: { key: "联网频率", title: "是否经常需要联网或打开网页？", options: { rare: "很少", some: "有时", high: "经常" } },
        output: { key: "输出长度", title: "输出通常有多长？", options: { short: "简短结论", medium: "中等篇幅", long: "长输出" } }
      },
      advancedTitle: "高级模式",
      advancedBody: "如果你已经知道更准确的运行次数和链路步数，可以手动覆盖。否则保持跟随问卷即可。",
      advancedOn: "当前跟随问卷",
      advancedOff: "当前使用手动覆盖",
      advancedToggleOpen: "展开高级模式",
      advancedToggleClose: "收起高级模式",
      advancedSync: "重新跟随问卷",
      advancedFields: { dailyTasks: "每日运行次数", stepsPerTask: "单次链路步数" },
      resultTag: "结果区",
      resultTitle: "下面直接看结果",
      resultBody: "这里统一展示当前模型下的 Token、日成本、月成本和解释，不再拆到左右两列里。",
      currentModel: "当前模型",
      provider: "所属厂商",
      warning: "成本等级",
      dailyCost: "日成本",
      monthlyCost: "月成本",
      inputTokens: "预计输入 Token / 天",
      outputTokens: "预计输出 Token / 天",
      basisTitle: "本次估算依据",
      basisBody: "这次估算基于你当前的问卷选择映射出来的工作量。",
      usagePerDay: "次/天",
      stepsPerRun: "步/次",
      suggestionsTitle: "最重要的优化建议",
      comparisonTitle: "同任务强度下的模型对比",
      comparisonBody: "如果想换模型，先在同一组任务强度下看成本差距。",
      shareTitle: "最后再分享",
      shareBody: "确认结果没问题后，再刷新卡片、下载 PNG 或复制分享文案。",
      generateCard: "刷新卡片",
      downloadCard: "下载 PNG",
      copyText: "复制文案",
      shareNow: "分享或复制链接",
      generatedLabel: "分享卡片预览",
      footer: "这一页现在按“先输入，再看结果，最后分享”的顺序组织。",
      copied: "已复制",
      cardReady: "分享卡片已更新",
      shared: "已完成分享",
      shareFallback: "已复制分享文案和链接",
      shareUnsupported: "当前浏览器不支持原生分享",
      savingsLabel: "预计每月节省"
    },
    en: {
      brandTop: "OPENCLAW",
      brandBottom: "Resource Hub",
      pageTag: "Cost Planning",
      title: "Cost Calculator",
      subtitle: "Lock in the model first, then estimate daily token usage from task intensity. Results and sharing live in one clear flow below.",
      helper: "Quick presets only adjust workload assumptions. They do not change the selected model anymore.",
      stats: [
        { label: "Estimator", value: "Model + workload" },
        { label: "Output", value: "Tokens + cost + card" },
        { label: "Goal", value: "Review first, share second" }
      ],
      setupTag: "Setup",
      setupTitle: "Choose model and workload first",
      setupBody: "Fix the model first, then use presets and the questionnaire to shape the workload. The calculator will estimate tokens and cost from that input.",
      modelTitle: "1. Choose the model",
      modelBody: "Pick the provider first, then the exact model. Presets and questionnaire only change workload.",
      providerLabel: "Provider",
      modelLabel: "Model",
      presetTitle: "2. Quick presets",
      presetBody: "Start from the closest operating pattern, then refine the workload below.",
      presets: {
        starter: { label: "Starter", desc: "First useful run with the lowest spend." },
        operator: { label: "Operator", desc: "Balanced daily use with steady output." },
        content: { label: "Content Team", desc: "Longer outputs for content-heavy work." },
        browser: { label: "Web Workflow", desc: "Frequent browsing or web actions." },
        scale: { label: "Scaled Usage", desc: "High volume, long chains, steady throughput." }
      },
      questionnaireTitle: "3. Workload questionnaire",
      questionnaireBody: "These four answers determine runs per day and steps per run, which is how token usage is estimated.",
      questions: {
        frequency: { key: "Usage per day", title: "How many times will you use it per day?", options: { "1-5": "1-5 runs", "6-20": "6-20 runs", "21-50": "21-50 runs", "50+": "50+ runs" } },
        complexity: { key: "Task complexity", title: "How complex is a typical task?", options: { simple: "Simple", medium: "Medium", hard: "Complex" } },
        web: { key: "Web access", title: "How often does it need web access?", options: { rare: "Rarely", some: "Sometimes", high: "Often" } },
        output: { key: "Output length", title: "How long is the output?", options: { short: "Short answer", medium: "Medium length", long: "Long output" } }
      },
      advancedTitle: "Advanced mode",
      advancedBody: "If you already know the real workload, override runs per day and steps per run here. Otherwise keep it linked to the questionnaire.",
      advancedOn: "Linked to questionnaire",
      advancedOff: "Using manual override",
      advancedToggleOpen: "Open advanced mode",
      advancedToggleClose: "Close advanced mode",
      advancedSync: "Relink to questionnaire",
      advancedFields: { dailyTasks: "Runs per day", stepsPerTask: "Steps per run" },
      resultTag: "Result",
      resultTitle: "Review the estimate below",
      resultBody: "This section keeps token usage, daily cost, monthly cost, and the explanation together so the output reads as one story.",
      currentModel: "Current model",
      provider: "Provider",
      warning: "Cost level",
      dailyCost: "Daily cost",
      monthlyCost: "Monthly cost",
      inputTokens: "Estimated input tokens / day",
      outputTokens: "Estimated output tokens / day",
      basisTitle: "Estimate basis",
      basisBody: "This estimate is based on the current workload mapped from your questionnaire answers.",
      usagePerDay: "runs/day",
      stepsPerRun: "steps/run",
      suggestionsTitle: "Top optimization moves",
      comparisonTitle: "Model comparison under the same workload",
      comparisonBody: "If you want to switch models, compare monthly cost under the exact same task intensity first.",
      shareTitle: "Share after review",
      shareBody: "Once the result looks right, refresh the card, download the PNG, or copy the share copy here.",
      generateCard: "Refresh card",
      downloadCard: "Download PNG",
      copyText: "Copy text",
      shareNow: "Share or copy link",
      generatedLabel: "Share card preview",
      footer: "This page now follows a simple sequence: inputs first, result second, sharing last.",
      copied: "Copied",
      cardReady: "Share card refreshed",
      shared: "Shared",
      shareFallback: "Share text and link copied",
      shareUnsupported: "Native share is not available here",
      savingsLabel: "Potential monthly savings"
    }
  };

  function t() { return copy[state.lang]; }
  function money(value) { return `$${Number(value).toFixed(2)}`; }
  function numberFmt(value) { return new Intl.NumberFormat(state.lang === "zh" ? "zh-CN" : "en-US").format(Math.round(Number(value))); }
  function escapeHtml(value) { return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }
  function track(name, payload) { if (typeof window.trackEvent === "function") window.trackEvent(name, { lang: state.lang, ...(payload || {}) }); }

  function showToast(message) {
    const toast = document.querySelector("[data-toast]");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");
    toast.classList.add("opacity-100", "translate-y-0");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
    }, 1800);
  }

  function getProviderList() {
    return Object.keys(window.modelProviders || {}).filter((providerId) => {
      return Array.isArray(window.getModelsByProvider(providerId)) && window.getModelsByProvider(providerId).length > 0;
    });
  }

  function getProviderName(providerId) {
    const provider = window.modelProviders && window.modelProviders[providerId];
    if (!provider) return providerId;
    return provider[state.lang] || provider.en || providerId;
  }

  function getQuestionCopy(questionKey, optionKey) {
    return t().questions[questionKey].options[optionKey];
  }

  function syncWorkloadFromAnswers() {
    const mapped = window.mapQuestionnaireToWorkload(state.answers);
    state.advanced.dailyTasks = mapped.dailyTasks;
    state.advanced.stepsPerTask = mapped.stepsPerTask;
  }

  function ensureModelSelection() {
    const models = window.getModelsByProvider(state.selectedProvider);
    if (!models.length) return;
    const exists = models.some(([modelId]) => modelId === state.selectedModelId);
    if (!exists) state.selectedModelId = models[0][0];
  }

  function applyPreset(presetId) {
    const preset = window.scenarioPresets[presetId];
    if (!preset) return;
    state.activePreset = presetId;
    state.answers = { ...preset.answers };
    state.advancedLinked = true;
    syncWorkloadFromAnswers();
    track("cost_preset_selected", { preset: presetId });
    renderApp(true);
  }

  function getSummary() {
    const mapped = window.mapQuestionnaireToWorkload(state.answers);
    const workload = state.advancedLinked ? mapped : state.advanced;
    const cost = window.calculateCost(state.selectedModelId, Number(workload.dailyTasks), Number(workload.stepsPerTask));
    const model = window.modelPricing[state.selectedModelId];
    const summary = {
      lang: state.lang,
      modelId: state.selectedModelId,
      modelName: model.name,
      providerId: model.provider,
      providerName: getProviderName(model.provider),
      dailyTasks: Number(workload.dailyTasks),
      stepsPerTask: Number(workload.stepsPerTask),
      dailyCost: cost.daily,
      monthlyCost: cost.monthly,
      totalInputTokens: cost.totalInputTokens,
      totalOutputTokens: cost.totalOutputTokens,
      warning: cost.warning,
      warningLabel: window.warningLabels[state.lang][cost.warning.level],
      frequencyLabel: getQuestionCopy("frequency", state.answers.frequency),
      complexityLabel: getQuestionCopy("complexity", state.answers.complexity),
      complexityKey: state.answers.complexity,
      frequencyLabelZh: copy.zh.questions.frequency.options[state.answers.frequency],
      frequencyLabelEn: copy.en.questions.frequency.options[state.answers.frequency],
      suggestions: window.getOptimizationSuggestions(state.selectedModelId, Number(workload.dailyTasks), Number(workload.stepsPerTask)),
      comparisons: window.compareModels(Number(workload.dailyTasks), Number(workload.stepsPerTask), state.selectedModelId)
    };
    summary.takeaway = window.buildCostNarrative(summary, state.lang);
    return summary;
  }

  function refreshShareAssets() {
    state.summary = getSummary();
    state.shareCanvas = window.generateShareCard(state.summary);
    state.shareDataUrl = state.shareCanvas.toDataURL("image/png");
  }

  function renderHeader() {
    if (!window.openClawSiteShell) return "";
    return window.openClawSiteShell.renderHeader({
      currentPage: "cost-calculator",
      lang: state.lang,
      brandTop: t().brandTop,
      brandBottom: t().brandBottom
    });
  }

  function renderPresetCards() {
    const presetCopy = t().presets;
    return Object.keys(window.scenarioPresets).map((presetId) => {
      const preset = presetCopy[presetId];
      const active = state.activePreset === presetId;
      return `
        <button type="button" data-preset="${presetId}" class="rounded-[28px] border p-4 text-left transition ${active ? "border-red-300/40 bg-red-500/12" : "border-white/10 bg-white/[0.03] hover:border-red-300/25 hover:bg-white/[0.05]"}">
          <div class="text-sm font-medium text-white">${preset.label}</div>
          <div class="mt-2 text-sm leading-6 text-slate-300">${preset.desc}</div>
        </button>
      `;
    }).join("");
  }

  function renderQuestionBlocks() {
    return Object.entries(t().questions).map(([questionKey, question]) => `
      <article class="rounded-[28px] border border-white/10 bg-slate-950/60 p-5">
        <div class="text-xs uppercase tracking-[0.22em] text-slate-400">${question.key}</div>
        <h3 class="mt-3 text-xl font-semibold text-white">${question.title}</h3>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          ${Object.entries(question.options).map(([optionKey, label]) => `
            <button type="button" data-question="${questionKey}" data-value="${optionKey}" class="rounded-2xl border px-4 py-4 text-left transition ${state.answers[questionKey] === optionKey ? "border-red-300/35 bg-red-500/12 text-white" : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-red-300/25 hover:bg-white/[0.05]"}">
              <span class="block text-base font-medium">${label}</span>
            </button>
          `).join("")}
        </div>
      </article>
    `).join("");
  }

  function renderSuggestionList() {
    return state.summary.suggestions.map((item) => `
      <li class="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm leading-6 text-slate-200">
        ${escapeHtml(state.lang === "zh" ? item.textZh : item.text)}
        <div class="mt-2 text-xs uppercase tracking-[0.2em] text-emerald-300">${t().savingsLabel} ${money(item.savings)}</div>
      </li>
    `).join("");
  }

  function renderComparisonCards() {
    return state.summary.comparisons.slice(0, 4).map((item) => `
      <article class="rounded-3xl border ${item.isSelected ? "border-red-300/40 bg-red-500/10" : "border-white/10 bg-white/[0.03]"} p-4">
        <div class="flex items-center justify-between gap-3">
          <div>
            <div class="text-base font-medium text-white">${item.model.name}</div>
            <div class="mt-1 text-sm text-slate-400">${getProviderName(item.model.provider)}</div>
          </div>
          <div class="text-xs uppercase tracking-[0.18em] text-slate-400">Q${item.model.quality}</div>
        </div>
        <div class="mt-4 text-3xl font-semibold text-white">${money(item.cost.monthly)}</div>
        <div class="mt-1 text-sm text-slate-400">/ month</div>
        <div class="mt-4 text-sm text-slate-300">${money(item.cost.daily)} / day</div>
      </article>
    `).join("");
  }

  function renderModelSelector() {
    const providers = getProviderList();
    const models = window.getModelsByProvider(state.selectedProvider);
    return `
      <article class="rounded-[28px] border border-white/10 bg-slate-950/55 p-6">
        <h3 class="text-2xl font-semibold text-white">${t().modelTitle}</h3>
        <p class="mt-2 text-sm leading-7 text-slate-300">${t().modelBody}</p>
        <div class="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
          <span class="rounded-full border border-red-300/20 bg-red-500/10 px-3 py-2 text-red-100">${getProviderName(state.selectedProvider)}</span>
          <span class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">${window.modelPricing[state.selectedModelId].name}</span>
        </div>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div class="text-sm text-slate-400">${t().providerLabel}</div>
            <select data-model-provider class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none">
              ${providers.map((providerId) => `<option value="${providerId}" ${providerId === state.selectedProvider ? "selected" : ""}>${getProviderName(providerId)}</option>`).join("")}
            </select>
          </label>
          <label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div class="text-sm text-slate-400">${t().modelLabel}</div>
            <select data-model-id class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none">
              ${models.map(([modelId, model]) => `<option value="${modelId}" ${modelId === state.selectedModelId ? "selected" : ""}>${model.name}</option>`).join("")}
            </select>
          </label>
        </div>
      </article>
    `;
  }

  function renderApp(preserveScroll) {
    if (state.advancedLinked) syncWorkloadFromAnswers();
    ensureModelSelection();
    refreshShareAssets();

    const text = t();
    const scrollY = preserveScroll ? window.scrollY : null;
    const isZh = state.lang === "zh";
    const heroTitleClass = isZh
      ? "text-[clamp(2.6rem,5vw,4.4rem)] tracking-tight leading-[0.95]"
      : "text-[clamp(2.35rem,4.5vw,4rem)] tracking-[-0.035em] leading-[0.96]";
    const heroBodyClass = isZh
      ? "text-base leading-7 sm:text-[1.05rem]"
      : "text-[15px] leading-7 sm:text-[1rem]";
    const helperClass = isZh
      ? "text-sm leading-7"
      : "text-[13.5px] leading-[1.68]";
    const quickAction = state.lang === "zh" ? "先看快速开始" : "Open Quick Start";
    const commandAction = state.lang === "zh" ? "打开命令中心" : "Open Command Center";
    const workloadChips = [
      text.questions.frequency.options[state.answers.frequency],
      text.questions.complexity.options[state.answers.complexity],
      `${state.summary.dailyTasks} ${text.usagePerDay}`,
      `${state.summary.stepsPerTask} ${text.stepsPerRun}`
    ];

    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.title = `${text.title} | OpenClaw Resource Hub`;
    document.body.className = "min-h-screen bg-slate-950 text-slate-100";
    document.body.innerHTML = `
      <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.14),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(127,29,29,0.18),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_48%,_#111827_100%)]">
        <div class="pointer-events-none fixed inset-0 opacity-40" style="background-image:linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px); background-size: 30px 30px;"></div>
        ${renderHeader()}
        <main class="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section class="grid gap-5 xl:grid-cols-[minmax(0,1.24fr)_minmax(320px,0.76fr)] xl:items-stretch">
            <div class="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.55),rgba(15,23,42,0.18))] p-6 shadow-[0_24px_80px_rgba(2,6,23,0.28)] sm:p-7">
              <p class="mb-4 text-xs uppercase tracking-[0.38em] text-red-200">${text.pageTag}</p>
              <h1 class="max-w-4xl ${heroTitleClass} font-semibold text-white">${text.title}</h1>
              <p class="mt-4 max-w-3xl ${heroBodyClass} text-slate-300">${text.subtitle}</p>
              <p class="mt-4 max-w-3xl ${helperClass} text-slate-400">${text.helper}</p>
              <div class="mt-6 flex flex-wrap gap-3 text-sm">
                <a href="/pages/quickstart.html" class="rounded-full bg-red-500 px-4 py-2.5 font-medium text-white transition hover:bg-red-400">${quickAction}</a>
                <a href="/pages/command-center.html" class="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-slate-200 transition hover:border-red-400/40 hover:text-white">${commandAction}</a>
              </div>
            </div>
            <div class="grid auto-rows-fr gap-3 sm:grid-cols-3 xl:grid-cols-2">
              ${text.stats.map((item) => {
                const compact = String(item.value).length > 12;
                const numeric = /^[0-9]+$/.test(String(item.value).trim());
                const spanClass = item === text.stats[2] ? "xl:col-span-2" : "";
                return `<article class="${spanClass} relative min-w-0 overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.08),transparent_38%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(15,23,42,0.7))] p-4 shadow-[0_18px_50px_rgba(2,6,23,0.2),inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur"><div class="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-red-200/15 to-transparent"></div><div class="flex h-full flex-col justify-between"><div class="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400"><span class="h-1.5 w-1.5 rounded-full bg-red-300/55"></span><span>${item.label}</span></div><div class="mt-6 ${numeric ? "text-[clamp(2.15rem,4vw,3rem)]" : compact ? "text-[clamp(1.28rem,1.8vw,1.86rem)] max-w-[12ch]" : "text-[clamp(1.5rem,2vw,2.1rem)]"} font-semibold leading-[1.02] text-white break-words">${item.value}</div></div></article>`;
              }).join("")}
            </div>
          </section>
          <section class="mt-7 space-y-6">
            <article class="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-slate-950/20">
              <div class="max-w-3xl">
                <div class="text-xs uppercase tracking-[0.24em] text-red-200">${text.setupTag}</div>
                <h2 class="mt-3 text-3xl font-semibold text-white">${text.setupTitle}</h2>
                <p class="mt-3 text-sm leading-7 text-slate-300">${text.setupBody}</p>
              </div>
              <div class="mt-8 space-y-6">
                ${renderModelSelector()}
                <article class="rounded-[28px] border border-white/10 bg-slate-950/55 p-6">
                  <h3 class="text-2xl font-semibold text-white">${text.presetTitle}</h3>
                  <p class="mt-2 text-sm leading-7 text-slate-300">${text.presetBody}</p>
                  <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">${renderPresetCards()}</div>
                </article>
                <article class="rounded-[28px] border border-white/10 bg-slate-950/55 p-6">
                  <h3 class="text-2xl font-semibold text-white">${text.questionnaireTitle}</h3>
                  <p class="mt-2 text-sm leading-7 text-slate-300">${text.questionnaireBody}</p>
                  <div class="mt-6 grid gap-4 xl:grid-cols-2">${renderQuestionBlocks()}</div>
                </article>
                <article class="rounded-[28px] border border-white/10 bg-slate-950/55 p-6">
                  <div class="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 class="text-2xl font-semibold text-white">${text.advancedTitle}</h3>
                      <p class="mt-2 text-sm leading-7 text-slate-300">${text.advancedBody}</p>
                    </div>
                    <button data-toggle-advanced class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${state.advancedOpen ? text.advancedToggleClose : text.advancedToggleOpen}</button>
                  </div>
                  <div class="mt-4"><span class="rounded-full border ${state.advancedLinked ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200" : "border-amber-300/30 bg-amber-400/10 text-amber-200"} px-3 py-2 text-xs uppercase tracking-[0.22em]">${state.advancedLinked ? text.advancedOn : text.advancedOff}</span></div>
                  ${state.advancedOpen ? `<div class="mt-6 grid gap-4 md:grid-cols-2"><label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div class="text-sm text-slate-400">${text.advancedFields.dailyTasks}</div><input data-advanced="dailyTasks" type="number" min="1" value="${state.advanced.dailyTasks}" class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none"></label><label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div class="text-sm text-slate-400">${text.advancedFields.stepsPerTask}</div><input data-advanced="stepsPerTask" type="number" min="1" value="${state.advanced.stepsPerTask}" class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none"></label></div><div class="mt-4"><button data-relink class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${text.advancedSync}</button></div>` : ""}
                </article>
              </div>
            </article>
            <article class="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-slate-950/30">
              <div class="max-w-3xl">
                <div class="text-xs uppercase tracking-[0.24em] text-red-200">${text.resultTag}</div>
                <h2 class="mt-3 text-3xl font-semibold text-white">${text.resultTitle}</h2>
                <p class="mt-3 text-sm leading-7 text-slate-300">${text.resultBody}</p>
              </div>
              <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.currentModel}</div><div class="mt-3 text-2xl font-semibold text-white">${state.summary.modelName}</div></div>
                <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.provider}</div><div class="mt-3 text-2xl font-semibold text-white">${state.summary.providerName}</div></div>
                <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.dailyCost}</div><div class="mt-3 text-3xl font-semibold text-white">${money(state.summary.dailyCost)}</div></div>
                <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.monthlyCost}</div><div class="mt-3 text-3xl font-semibold text-white">${money(state.summary.monthlyCost)}</div></div>
              </div>
              <div class="mt-4 grid gap-4 md:grid-cols-3">
                <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.warning}</div><div class="mt-3 text-2xl font-semibold" style="color:${state.summary.warning.accent}">${state.summary.warningLabel}</div></div>
                <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.inputTokens}</div><div class="mt-3 text-3xl font-semibold text-white">${numberFmt(state.summary.totalInputTokens)}</div></div>
                <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.outputTokens}</div><div class="mt-3 text-3xl font-semibold text-white">${numberFmt(state.summary.totalOutputTokens)}</div></div>
              </div>
              <div class="mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <div class="text-sm text-slate-400">${text.basisTitle}</div>
                <div class="mt-3 flex flex-wrap gap-3 text-sm text-slate-200">${workloadChips.map((label) => `<span class="rounded-full border border-white/10 bg-white/5 px-3 py-2">${label}</span>`).join("")}</div>
                <p class="mt-4 text-sm leading-7 text-slate-300">${text.basisBody}</p>
                <p class="mt-4 text-base leading-8 text-white">${state.summary.takeaway}</p>
              </div>
            </article>
            <article class="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-slate-950/30">
              <h2 class="text-2xl font-semibold text-white">${text.shareTitle}</h2>
              <p class="mt-3 text-sm leading-7 text-slate-300">${text.shareBody}</p>
              <div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <button data-generate-card class="rounded-full bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-400">${text.generateCard}</button>
                <button data-download-card class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${text.downloadCard}</button>
                <button data-copy-share class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${text.copyText}</button>
                <button data-share-card class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${text.shareNow}</button>
              </div>
              <div class="mt-5 rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-3">
                <div class="mb-3 flex items-center justify-between gap-3"><div class="text-sm uppercase tracking-[0.24em] text-slate-400">${text.generatedLabel}</div><div class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">${state.summary.warningLabel}</div></div>
                <img src="${state.shareDataUrl}" alt="Share card preview" class="aspect-square w-full max-w-[760px] rounded-[24px] border border-white/10 bg-slate-950 object-cover shadow-2xl shadow-slate-950/40">
              </div>
            </article>
            <section class="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
              <article class="rounded-[32px] border border-white/10 bg-white/[0.04] p-6"><h2 class="text-2xl font-semibold text-white">${text.suggestionsTitle}</h2><ul class="mt-5 space-y-3">${renderSuggestionList()}</ul></article>
              <article class="rounded-[32px] border border-white/10 bg-white/[0.04] p-6"><h2 class="text-2xl font-semibold text-white">${text.comparisonTitle}</h2><p class="mt-2 text-sm leading-7 text-slate-300">${text.comparisonBody}</p><div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">${renderComparisonCards()}</div></article>
            </section>
            <footer class="border-t border-white/10 pt-6 text-sm text-slate-400">${text.footer}</footer>
          </section>
        </main>
        <div data-toast class="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 translate-y-2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-sm text-slate-100 opacity-0 shadow-xl shadow-slate-950/40 transition duration-200"></div>
      </div>
    `;

    bindEvents();
    if (preserveScroll && scrollY !== null) requestAnimationFrame(() => window.scrollTo({ top: scrollY }));
  }

  function bindEvents() {
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextLang = button.getAttribute("data-lang");
        if (!nextLang || nextLang === state.lang) return;
        state.lang = nextLang;
        localStorage.setItem("openclaw-module-lang", nextLang);
        renderApp(true);
      });
    });

    document.querySelectorAll("[data-preset]").forEach((button) => {
      button.addEventListener("click", () => applyPreset(button.getAttribute("data-preset")));
    });

    document.querySelectorAll("[data-question]").forEach((button) => {
      button.addEventListener("click", () => {
        const question = button.getAttribute("data-question");
        const value = button.getAttribute("data-value");
        if (!question || !value) return;
        state.answers[question] = value;
        state.advancedLinked = true;
        syncWorkloadFromAnswers();
        track("cost_question_answered", { question, value });
        renderApp(true);
      });
    });

    const providerSelect = document.querySelector("[data-model-provider]");
    if (providerSelect) {
      providerSelect.addEventListener("change", (event) => {
        state.selectedProvider = event.target.value;
        ensureModelSelection();
        renderApp(true);
      });
    }

    const modelSelect = document.querySelector("[data-model-id]");
    if (modelSelect) {
      modelSelect.addEventListener("change", (event) => {
        state.selectedModelId = event.target.value;
        renderApp(true);
      });
    }

    const toggleButton = document.querySelector("[data-toggle-advanced]");
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        state.advancedOpen = !state.advancedOpen;
        track("cost_advanced_toggled", { open: state.advancedOpen });
        renderApp(true);
      });
    }

    document.querySelectorAll("[data-advanced]").forEach((input) => {
      input.addEventListener("input", (event) => {
        const field = input.getAttribute("data-advanced");
        const value = Math.max(1, Number(event.target.value) || 1);
        state.advanced[field] = value;
        state.advancedLinked = false;
        track("cost_advanced_edited", { field, value });
        renderApp(true);
      });
    });

    const relinkButton = document.querySelector("[data-relink]");
    if (relinkButton) {
      relinkButton.addEventListener("click", () => {
        state.advancedLinked = true;
        syncWorkloadFromAnswers();
        track("cost_advanced_relinked");
        renderApp(true);
      });
    }

    const refreshButton = document.querySelector("[data-generate-card]");
    if (refreshButton) {
      refreshButton.addEventListener("click", () => {
        refreshShareAssets();
        const preview = document.querySelector("img[alt='Share card preview']");
        if (preview) preview.src = state.shareDataUrl;
        track("cost_card_generated", { model: state.selectedModelId });
        showToast(t().cardReady);
      });
    }

    const downloadButton = document.querySelector("[data-download-card]");
    if (downloadButton) {
      downloadButton.addEventListener("click", () => {
        refreshShareAssets();
        window.downloadCanvasAsPng(state.shareCanvas, `openclaw-agent-cost-${state.selectedModelId}.png`);
        track("cost_card_downloaded", { model: state.selectedModelId });
      });
    }

    const copyButton = document.querySelector("[data-copy-share]");
    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        refreshShareAssets();
        const text = window.buildShareText(state.summary, state.lang);
        await navigator.clipboard.writeText(text);
        track("cost_share_text_copied", { model: state.selectedModelId });
        showToast(t().copied);
      });
    }

    const shareButton = document.querySelector("[data-share-card]");
    if (shareButton) {
      shareButton.addEventListener("click", async () => {
        refreshShareAssets();
        const result = await window.shareCostResult(state.summary, state.lang, state.shareCanvas);
        track("cost_share_triggered", { mode: result.mode, model: state.selectedModelId });
        if (result.mode === "native") showToast(t().shared);
        else if (result.mode === "clipboard") showToast(t().shareFallback);
        else showToast(t().shareUnsupported);
      });
    }
  }

  syncWorkloadFromAnswers();
  renderApp(false);
})();
