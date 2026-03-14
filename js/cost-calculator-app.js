(function () {
  const state = {
    lang: localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh",
    activePreset: "operator",
    answers: { frequency: "6-20", complexity: "medium", web: "some", output: "medium" },
    selectedProvider: "anthropic",
    selectedModelId: "claude-sonnet-4.6",
    advancedOpen: false,
    advancedLinked: true,
    advanced: { dailyTasks: 12, stepsPerTask: 50 },
    summary: null,
    shareCanvas: null,
    shareDataUrl: "",
    toast: ""
  };

  const copy = {
    zh: {
      pageTag: "传播优先",
      title: "成本计算器",
      subtitle: "左侧做选择，右侧立即给出推荐、成本和分享卡片。",
      helper: "默认模式先用人话问卷估算，只有真正需要精调时才展开高级模式。",
      brandTop: "OPENCLAW",
      brandBottom: "Resource Hub",
      langZh: "中文",
      langEn: "EN",
      stats: [
        { label: "估算方式", value: "4 题问卷" },
        { label: "输出形式", value: "结论 + 分享卡" },
        { label: "页面目标", value: "边算边分享" }
      ],
      presetTitle: "快速预设",
      presetBody: "想先看大概区间，就从预设开始。",
      modelChoiceTitle: "模型选择",
      modelChoiceBody: "先选模型厂商，再选具体模型。默认会跟随问卷推荐，你也可以手动覆盖。",
      providerLabel: "模型厂商",
      modelLabel: "具体模型",
      modelLinkedOn: "当前跟随问卷推荐",
      modelLinkedOff: "当前使用手动模型",
      modelRelink: "恢复推荐模型",
      questionnaireTitle: "你的使用更像哪一种？",
      questionnaireBody: "这 4 个问题会驱动推荐模型、内部工作量和分享文案。",
      presets: {
        starter: { label: "轻量试跑", desc: "第一次尝试，先看最低可用成本。" },
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
      advancedBody: "你可以手动覆盖每日运行次数和单次步数。修改后右侧结果会立刻刷新。",
      advancedOn: "当前跟随问卷",
      advancedOff: "当前为手动覆盖",
      advancedToggleOpen: "展开高级模式",
      advancedToggleClose: "收起高级模式",
      advancedSync: "重新跟随问卷",
      advancedFields: { dailyTasks: "每日运行次数", stepsPerTask: "单次链路步数" },
      asideLabel: "实时结果",
      resultTitle: "推荐与成本",
      resultLead: "结果面板固定在右侧，选择后不用回到顶部找结果。",
      currentModel: "当前模型",
      recommendedModel: "推荐模型",
      recommendationHint: "问卷给出的默认推荐",
      dailyCost: "日成本",
      monthlyCost: "月成本",
      warning: "成本等级",
      workloadTitle: "映射后的工作量",
      workloadBody: "问卷会自动换算成内部工作量，方便继续用高级模式精调。",
      suggestionsTitle: "最重要的优化建议",
      comparisonTitle: "模型对比",
      comparisonBody: "先看成本差距，再决定质量升级是否值得。",
      shareTitle: "分享卡片",
      shareBody: "分享动作现在贴着结果面板，操作链不断裂。",
      generateCard: "刷新卡片",
      downloadCard: "下载 PNG",
      copyText: "复制文案",
      shareNow: "分享或复制链接",
      generatedLabel: "卡片预览",
      copied: "已复制",
      cardReady: "分享卡片已更新",
      shared: "已完成分享",
      shareFallback: "已复制分享文案和链接",
      shareUnsupported: "当前浏览器不支持原生分享",
      advancedHint: "一旦手动修改高级模式，系统会优先采用你的输入值。",
      footer: "这一页现在把估算、解释和分享放在同一个操作链里。",
      usagePerDay: "次/天",
      stepsPerRun: "步/次",
      savingsLabel: "预计每月节省"
    },
    en: {
      pageTag: "Share-First",
      title: "Cost Calculator",
      subtitle: "Pick on the left and review the live recommendation, cost, and share card on the right.",
      helper: "The default flow starts with human-readable questions. Open advanced mode only when you want exact workload control.",
      brandTop: "OPENCLAW",
      brandBottom: "Resource Hub",
      langZh: "中文",
      langEn: "EN",
      stats: [
        { label: "Estimator", value: "4-question flow" },
        { label: "Output", value: "Decision + card" },
        { label: "Goal", value: "Calculate and share" }
      ],
      presetTitle: "Quick Presets",
      presetBody: "If you only need a fast range, start from a preset.",
      modelChoiceTitle: "Model Selection",
      modelChoiceBody: "Choose the provider first, then the exact model. By default this follows the questionnaire recommendation.",
      providerLabel: "Provider",
      modelLabel: "Model",
      modelLinkedOn: "Currently using the recommended model",
      modelLinkedOff: "Currently using a manual model",
      modelRelink: "Use recommended model",
      questionnaireTitle: "What does your usage look like?",
      questionnaireBody: "These four answers drive the recommended model, internal workload, and share copy.",
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
      advancedBody: "Override runs per day and steps per run. The live panel updates immediately from your manual values.",
      advancedOn: "Currently linked to questionnaire",
      advancedOff: "Currently using manual override",
      advancedToggleOpen: "Open advanced mode",
      advancedToggleClose: "Close advanced mode",
      advancedSync: "Relink to questionnaire",
      advancedFields: { dailyTasks: "Runs per day", stepsPerTask: "Steps per run" },
      asideLabel: "Live result",
      resultTitle: "Recommendation and cost",
      resultLead: "The result panel stays in view while you answer questions.",
      currentModel: "Current model",
      recommendedModel: "Recommended model",
      recommendationHint: "Default recommendation from the questionnaire",
      dailyCost: "Daily cost",
      monthlyCost: "Monthly cost",
      warning: "Cost level",
      workloadTitle: "Mapped workload",
      workloadBody: "The questionnaire converts to an internal workload so you can keep tuning from advanced mode.",
      suggestionsTitle: "Top optimization moves",
      comparisonTitle: "Model comparison",
      comparisonBody: "Check the cost gap first, then decide whether the quality upgrade is worth it.",
      shareTitle: "Share Card",
      shareBody: "Sharing now lives next to the result so the action chain stays intact.",
      generateCard: "Refresh card",
      downloadCard: "Download PNG",
      copyText: "Copy text",
      shareNow: "Share or copy link",
      generatedLabel: "Card preview",
      copied: "Copied",
      cardReady: "Share card refreshed",
      shared: "Shared",
      shareFallback: "Share text and link copied",
      shareUnsupported: "Native share is not available here",
      advancedHint: "Once advanced mode is edited, your manual values take priority.",
      footer: "This page now keeps estimate, explanation, and sharing inside the same action loop.",
      usagePerDay: "runs/day",
      stepsPerRun: "steps/run",
      savingsLabel: "Potential monthly savings"
    }
  };

  function t() { return copy[state.lang]; }
  function track(name, params) { if (typeof window.trackEvent === "function") window.trackEvent(name, { lang: state.lang, ...(params || {}) }); }
  function escapeHtml(value) { return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }
  function money(value) { return `$${value.toFixed(2)}`; }
  function questionOptionLabel(question, optionKey, lang = state.lang) { return copy[lang].questions[question].options[optionKey]; }
  function warningLabel(level, lang = state.lang) { return window.warningLabels[lang][level]; }
  function workloadChip(label) { return `<span class="rounded-full border border-white/10 bg-white/5 px-3 py-2">${label}</span>`; }

  function getProviderName(providerId, lang = state.lang) {
    const provider = window.modelProviders && window.modelProviders[providerId];
    if (!provider) return providerId;
    return provider[lang] || provider.en || providerId;
  }

  function getProviderList() {
    return Object.keys(window.modelProviders || {}).filter((providerId) => {
      return Array.isArray(window.getModelsByProvider && window.getModelsByProvider(providerId))
        ? window.getModelsByProvider(providerId).length > 0
        : false;
    });
  }

  function syncSelectionsFromAnswers() {
    const mapped = window.mapQuestionnaireToWorkload(state.answers);
    state.advanced.dailyTasks = mapped.dailyTasks;
    state.advanced.stepsPerTask = mapped.stepsPerTask;
  }

  function applyPreset(presetId) {
    const preset = window.scenarioPresets[presetId];
    if (!preset) return;
    state.activePreset = presetId;
    state.answers = { ...preset.answers };
    state.advancedLinked = true;
    syncSelectionsFromAnswers();
    track("cost_preset_selected", { preset: presetId });
    renderApp();
  }

  function getSummary() {
    const mapped = window.mapQuestionnaireToWorkload(state.answers);
    const effective = state.advancedLinked
      ? { dailyTasks: mapped.dailyTasks, stepsPerTask: mapped.stepsPerTask }
      : { ...state.advanced };
    const effectiveModel = state.selectedModelId;
    const result = window.calculateCost(effectiveModel, Number(effective.dailyTasks), Number(effective.stepsPerTask));
    const model = window.modelPricing[effectiveModel];
    const recommendedModel = window.modelPricing[mapped.recommendedModel];
    const summary = {
      lang: state.lang,
      modelId: effectiveModel,
      modelName: model.name,
      providerId: model.provider,
      providerName: getProviderName(model.provider),
      recommendedModelId: mapped.recommendedModel,
      recommendedModelName: recommendedModel.name,
      recommendedProviderId: recommendedModel.provider,
      recommendedProviderName: getProviderName(recommendedModel.provider),
      usingRecommendedModel: effectiveModel === mapped.recommendedModel,
      dailyTasks: Number(effective.dailyTasks),
      stepsPerTask: Number(effective.stepsPerTask),
      dailyCost: result.daily,
      monthlyCost: result.monthly,
      warning: result.warning,
      warningLabel: warningLabel(result.warning.level),
      suggestions: window.getOptimizationSuggestions(effectiveModel, Number(effective.dailyTasks), Number(effective.stepsPerTask)),
      comparisons: window.compareModels(Number(effective.dailyTasks), Number(effective.stepsPerTask), effectiveModel),
      frequencyKey: state.answers.frequency,
      complexityKey: state.answers.complexity,
      frequencyLabel: questionOptionLabel("frequency", state.answers.frequency),
      complexityLabel: questionOptionLabel("complexity", state.answers.complexity),
      frequencyLabelZh: questionOptionLabel("frequency", state.answers.frequency, "zh"),
      frequencyLabelEn: questionOptionLabel("frequency", state.answers.frequency, "en")
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

  function renderModelSelector() {
    const text = t();
    const providers = getProviderList();
    const modelEntries = window.getModelsByProvider(state.selectedProvider);
    return `
      <article class="rounded-[32px] border border-white/10 bg-slate-950/55 p-6">
        <div>
          <h2 class="text-2xl font-semibold text-white">${text.modelChoiceTitle}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-300">${text.modelChoiceBody}</p>
        </div>
        <div class="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
          <span class="rounded-full border border-red-300/20 bg-red-400/10 px-3 py-2 text-red-100">${getProviderName(state.selectedProvider)}</span>
          <span class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">${window.modelPricing[state.selectedModelId].name}</span>
        </div>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div class="text-sm text-slate-400">${text.providerLabel}</div>
            <select data-model-provider class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none">
              ${providers.map((providerId) => `<option value="${providerId}" ${providerId === state.selectedProvider ? "selected" : ""}>${getProviderName(providerId)}</option>`).join("")}
            </select>
          </label>
          <label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div class="text-sm text-slate-400">${text.modelLabel}</div>
            <select data-model-id class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none">
              ${modelEntries.map(([modelId, model]) => `<option value="${modelId}" ${modelId === state.selectedModelId ? "selected" : ""}>${model.name}</option>`).join("")}
            </select>
          </label>
        </div>
      </article>
    `;
  }

  function renderPresetCards() {
    const text = t();
    return Object.keys(window.scenarioPresets).map((presetId) => {
      const preset = text.presets[presetId];
      const active = state.activePreset === presetId;
      return `
        <button data-preset="${presetId}" class="rounded-[28px] border p-4 text-left transition ${active ? "border-red-300/40 bg-red-500/15" : "border-white/10 bg-white/[0.03] hover:border-red-300/30 hover:bg-white/[0.05]"}">
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
            <button data-question="${key}" data-value="${optionKey}" class="rounded-2xl border px-4 py-4 text-left transition ${state.answers[key] === optionKey ? "border-red-300/30 bg-red-400/10 text-white" : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-red-300/25 hover:bg-white/[0.05]"}">
              <span class="block text-base font-medium">${label}</span>
            </button>
          `).join("")}
        </div>
      </article>
    `).join("");
  }

  function renderSuggestionList() {
    const text = t();
    return state.summary.suggestions.map((item) => `
      <li class="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm leading-6 text-slate-200">
        ${escapeHtml(state.lang === "zh" ? item.textZh : item.text)}
        <div class="mt-2 text-xs uppercase tracking-[0.2em] text-emerald-300">${text.savingsLabel} ${money(item.savings)}</div>
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
          <div class="text-xs uppercase tracking-[0.2em] text-slate-400">Q${item.model.quality}</div>
        </div>
        <div class="mt-4 text-3xl font-semibold text-white">${money(item.cost.monthly)}</div>
        <div class="mt-1 text-sm text-slate-400">/ month</div>
        <div class="mt-4 text-sm text-slate-300">${money(item.cost.daily)} / day</div>
      </article>
    `).join("");
  }

  function renderApp() {
    refreshShareCard();
    const text = t();
    const usageChip = `${state.summary.dailyTasks} ${text.usagePerDay}`;
    const stepChip = `${state.summary.stepsPerTask} ${text.stepsPerRun}`;
    const headerMarkup = window.openClawSiteShell
      ? window.openClawSiteShell.renderHeader({
          currentPage: "cost-calculator",
          lang: state.lang,
          brandTop: text.brandTop,
          brandBottom: text.brandBottom
        })
      : "";

    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.title = `${text.title} | OpenClaw Resource Hub`;
    document.body.className = "min-h-screen bg-slate-950 text-slate-100";
    document.body.innerHTML = `
      <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(127,29,29,0.18),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_48%,_#111827_100%)]">
        <div class="pointer-events-none fixed inset-0 opacity-40" style="background-image:linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px); background-size: 30px 30px;"></div>
        ${headerMarkup}

        <main class="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <section class="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
            <div>
              <p class="mb-4 text-xs uppercase tracking-[0.38em] text-red-200">${text.pageTag}</p>
              <h1 class="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">${text.title}</h1>
              <p class="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">${text.subtitle}</p>
              <p class="mt-5 max-w-3xl text-sm leading-7 text-slate-400">${text.helper}</p>
            </div>
            <div class="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              ${text.stats.map((item) => `
                <article class="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div class="text-sm text-slate-400">${item.label}</div>
                  <div class="mt-2 text-2xl font-semibold leading-tight text-white">${item.value}</div>
                </article>
              `).join("")}
            </div>
          </section>

          <section class="mt-10 grid gap-6 xl:grid-cols-[0.82fr,1.18fr]">
            <div class="space-y-6">
              ${renderModelSelector()}
              <article class="rounded-[32px] border border-white/10 bg-slate-950/55 p-6">
                <h2 class="text-2xl font-semibold text-white">${text.presetTitle}</h2>
                <p class="mt-2 text-sm leading-7 text-slate-300">${text.presetBody}</p>
                <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">${renderPresetCards()}</div>
              </article>
            </div>

            <aside class="xl:sticky xl:top-24">
              <article class="space-y-6 rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-slate-950/30">
                <div class="text-xs uppercase tracking-[0.24em] text-red-200">${text.asideLabel}</div>
                <div>
                  <h2 class="text-3xl font-semibold text-white">${text.resultTitle}</h2>
                  <p class="mt-3 text-sm leading-7 text-slate-300">${text.resultLead}</p>
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                    <div class="text-sm text-slate-400">${text.currentModel}</div>
                    <div class="mt-3 text-2xl font-semibold text-white">${state.summary.modelName}</div>
                    <div class="mt-2 text-sm text-slate-400">${state.summary.providerName}</div>
                  </div>
                  <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.warning}</div><div class="mt-3 text-2xl font-semibold" style="color:${state.summary.warning.accent}">${state.summary.warningLabel}</div></div>
                  <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.dailyCost}</div><div class="mt-3 text-3xl font-semibold text-white">${money(state.summary.dailyCost)}</div></div>
                  <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5"><div class="text-sm text-slate-400">${text.monthlyCost}</div><div class="mt-3 text-3xl font-semibold text-white">${money(state.summary.monthlyCost)}</div></div>
                </div>
                ${state.summary.usingRecommendedModel ? "" : `
                  <div class="rounded-3xl border border-red-300/20 bg-red-400/10 p-5">
                    <div class="text-sm text-slate-300">${text.recommendedModel}</div>
                    <div class="mt-3 text-xl font-semibold text-white">${state.summary.recommendedModelName}</div>
                    <div class="mt-2 text-sm text-slate-300">${state.summary.recommendedProviderName} · ${text.recommendationHint}</div>
                  </div>
                `}
                <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <h3 class="text-2xl font-semibold text-white">${text.shareTitle}</h3>
                  <p class="mt-3 text-sm leading-7 text-slate-300">${text.shareBody}</p>
                  <div class="mt-5 grid gap-3 sm:grid-cols-2">
                    <button data-generate-card class="rounded-full bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-400">${text.generateCard}</button>
                    <button data-download-card class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${text.downloadCard}</button>
                    <button data-copy-share class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${text.copyText}</button>
                    <button data-share-card class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${text.shareNow}</button>
                  </div>
                  <div class="mt-5 rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-3">
                    <div class="mb-3 flex items-center justify-between gap-3"><div class="text-sm uppercase tracking-[0.24em] text-slate-400">${text.generatedLabel}</div><div class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">${state.summary.warningLabel}</div></div>
                    <img src="${state.shareDataUrl}" alt="Share card preview" class="aspect-square w-full rounded-[24px] border border-white/10 bg-slate-950 object-cover shadow-2xl shadow-slate-950/40">
                  </div>
                </div>
                <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <div class="text-sm text-slate-400">${text.workloadTitle}</div>
                  <div class="mt-3 flex flex-wrap gap-3 text-sm text-slate-200">${workloadChip(state.summary.frequencyLabel)}${workloadChip(state.summary.complexityLabel)}${workloadChip(usageChip)}${workloadChip(stepChip)}</div>
                  <p class="mt-4 text-sm leading-7 text-slate-300">${text.workloadBody}</p>
                  <p class="mt-4 text-base leading-8 text-white">${state.summary.takeaway}</p>
                </div>
              </article>
            </aside>
          </section>

          <section class="mt-6 grid gap-6 xl:grid-cols-[1.08fr,0.92fr]">
            <div class="space-y-6">
              <article class="rounded-[32px] border border-white/10 bg-slate-950/55 p-6">
                <h2 class="text-2xl font-semibold text-white">${text.questionnaireTitle}</h2>
                <p class="mt-2 text-sm leading-7 text-slate-300">${text.questionnaireBody}</p>
                <div class="mt-6 grid gap-4 xl:grid-cols-2">${renderQuestionBlocks()}</div>
              </article>

              <article class="rounded-[32px] border border-white/10 bg-slate-950/55 p-6">
                <div class="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 class="text-2xl font-semibold text-white">${text.advancedTitle}</h2>
                    <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-300">${text.advancedBody}</p>
                  </div>
                  <button data-toggle-advanced class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${state.advancedOpen ? text.advancedToggleClose : text.advancedToggleOpen}</button>
                </div>
                <div class="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em]">
                  <span class="rounded-full border ${state.advancedLinked ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200" : "border-amber-300/30 bg-amber-400/10 text-amber-200"} px-3 py-2">${state.advancedLinked ? text.advancedOn : text.advancedOff}</span>
                  <span class="text-slate-400">${text.advancedHint}</span>
                </div>
                ${state.advancedOpen ? `
                  <div class="mt-6 grid gap-4 md:grid-cols-2">
                    <label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div class="text-sm text-slate-400">${text.advancedFields.dailyTasks}</div><input data-advanced="dailyTasks" type="number" min="1" value="${state.advanced.dailyTasks}" class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none"></label>
                    <label class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div class="text-sm text-slate-400">${text.advancedFields.stepsPerTask}</div><input data-advanced="stepsPerTask" type="number" min="1" value="${state.advanced.stepsPerTask}" class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none"></label>
                  </div>
                  <div class="mt-4"><button data-relink class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-300/30 hover:text-white">${text.advancedSync}</button></div>
                ` : ""}
              </article>
            </div>
            <div class="space-y-6">
              <article class="rounded-[32px] border border-white/10 bg-white/[0.04] p-6"><h2 class="text-2xl font-semibold text-white">${text.suggestionsTitle}</h2><ul class="mt-5 space-y-3">${renderSuggestionList()}</ul></article>
            </div>
          </section>

          <section class="mt-6">
            <article class="rounded-[32px] border border-white/10 bg-white/[0.04] p-6"><h2 class="text-2xl font-semibold text-white">${text.comparisonTitle}</h2><p class="mt-2 text-sm leading-7 text-slate-300">${text.comparisonBody}</p><div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">${renderComparisonCards()}</div></article>
          </section>

          <footer class="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">${text.footer}</footer>
        </main>

        <div class="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-sm text-slate-100 shadow-lg shadow-slate-950/50 ${state.toast ? "opacity-100" : "opacity-0"} transition">${state.toast || ""}</div>
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
        if (state.modelLinked || state.advancedLinked) syncSelectionsFromAnswers();
        renderApp();
      });
    });

    const providerSelect = document.querySelector("[data-model-provider]");
    if (providerSelect) {
      providerSelect.addEventListener("change", () => {
        const models = window.getModelsByProvider(providerSelect.value);
        state.selectedProvider = providerSelect.value;
        state.selectedModelId = models[0] ? models[0][0] : state.selectedModelId;
        state.modelLinked = false;
        track("cost_model_provider_changed", { provider: state.selectedProvider });
        renderApp();
      });
    }

    const modelSelect = document.querySelector("[data-model-id]");
    if (modelSelect) {
      modelSelect.addEventListener("change", () => {
        state.selectedModelId = modelSelect.value;
        state.selectedProvider = window.modelPricing[state.selectedModelId].provider;
        state.modelLinked = false;
        track("cost_model_changed", { model: state.selectedModelId, provider: state.selectedProvider });
        renderApp();
      });
    }

    const relinkModel = document.querySelector("[data-relink-model]");
    if (relinkModel) {
      relinkModel.addEventListener("click", () => {
        state.modelLinked = true;
        syncSelectionsFromAnswers();
        track("cost_model_relinked");
        renderApp();
      });
    }

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
        state.advanced[key] = Math.max(1, Number(field.value || 1));
        state.advancedLinked = false;
        track("cost_advanced_edited", { field: key });
        renderApp();
      });
    });

    const relink = document.querySelector("[data-relink]");
    if (relink) {
      relink.addEventListener("click", () => {
        state.advancedLinked = true;
        syncSelectionsFromAnswers();
        track("cost_advanced_relinked");
        renderApp();
      });
    }

    const generate = document.querySelector("[data-generate-card]");
    if (generate) {
      generate.addEventListener("click", () => {
        refreshShareCard();
        track("cost_card_generated", { model: state.summary.modelId, daily_cost: Number(state.summary.dailyCost.toFixed(2)), monthly_cost: Number(state.summary.monthlyCost.toFixed(2)) });
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
          if (result.mode === "native") showToast(t().shared);
          else if (result.mode === "clipboard") showToast(t().shareFallback);
          else showToast(t().shareUnsupported);
        } catch (error) {
          console.error(error);
          showToast(t().shareUnsupported);
        }
      });
    }
  }

  syncSelectionsFromAnswers();
  renderApp();
})();
