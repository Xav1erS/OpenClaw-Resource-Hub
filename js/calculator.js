const modelPricing = {
  "claude-opus-4.1": {
    name: "Claude Opus 4.1",
    provider: "anthropic",
    inputPrice: 15,
    outputPrice: 75,
    quality: 5,
    tier: "premium"
  },
  "claude-sonnet-4": {
    name: "Claude Sonnet 4",
    provider: "anthropic",
    inputPrice: 3,
    outputPrice: 15,
    quality: 4,
    tier: "balanced"
  },
  "claude-3.7-sonnet": {
    name: "Claude 3.7 Sonnet",
    provider: "anthropic",
    inputPrice: 3,
    outputPrice: 15,
    quality: 4,
    tier: "balanced"
  },
  "claude-3.5-haiku": {
    name: "Claude 3.5 Haiku",
    provider: "anthropic",
    inputPrice: 0.8,
    outputPrice: 4,
    quality: 3,
    tier: "light"
  },
  "gpt-5": {
    name: "GPT-5",
    provider: "openai",
    inputPrice: 1.25,
    outputPrice: 10,
    quality: 5,
    tier: "premium"
  },
  "gpt-5-mini": {
    name: "GPT-5 Mini",
    provider: "openai",
    inputPrice: 0.25,
    outputPrice: 2,
    quality: 4,
    tier: "balanced"
  },
  "gpt-5-nano": {
    name: "GPT-5 Nano",
    provider: "openai",
    inputPrice: 0.05,
    outputPrice: 0.4,
    quality: 3,
    tier: "light"
  },
  "gpt-4.1": {
    name: "GPT-4.1",
    provider: "openai",
    inputPrice: 2,
    outputPrice: 8,
    quality: 4,
    tier: "balanced"
  },
  "gpt-4.1-mini": {
    name: "GPT-4.1 Mini",
    provider: "openai",
    inputPrice: 0.4,
    outputPrice: 1.6,
    quality: 3,
    tier: "light"
  },
  "gpt-4.1-nano": {
    name: "GPT-4.1 Nano",
    provider: "openai",
    inputPrice: 0.1,
    outputPrice: 0.4,
    quality: 2,
    tier: "light"
  },
  "gpt-4o": {
    name: "GPT-4o",
    provider: "openai",
    inputPrice: 2.5,
    outputPrice: 10,
    quality: 4,
    tier: "balanced"
  },
  "gpt-4o-mini": {
    name: "GPT-4o Mini",
    provider: "openai",
    inputPrice: 0.15,
    outputPrice: 0.6,
    quality: 3,
    tier: "light"
  },
  "o4-mini": {
    name: "o4-mini",
    provider: "openai",
    inputPrice: 1.1,
    outputPrice: 4.4,
    quality: 4,
    tier: "balanced"
  },
  "gemini-2.5-pro": {
    name: "Gemini 2.5 Pro",
    provider: "google",
    inputPrice: 1.25,
    outputPrice: 10,
    quality: 5,
    tier: "premium"
  },
  "gemini-2.5-flash": {
    name: "Gemini 2.5 Flash",
    provider: "google",
    inputPrice: 0.3,
    outputPrice: 2.5,
    quality: 4,
    tier: "balanced"
  },
  "gemini-2.5-flash-lite": {
    name: "Gemini 2.5 Flash-Lite",
    provider: "google",
    inputPrice: 0.1,
    outputPrice: 0.4,
    quality: 3,
    tier: "light"
  },
  "gemini-2.0-flash": {
    name: "Gemini 2.0 Flash",
    provider: "google",
    inputPrice: 0.1,
    outputPrice: 0.4,
    quality: 3,
    tier: "light"
  },
  "deepseek-chat": {
    name: "DeepSeek Chat",
    provider: "deepseek",
    inputPrice: 0.27,
    outputPrice: 1.1,
    quality: 3,
    tier: "light"
  },
  "deepseek-reasoner": {
    name: "DeepSeek Reasoner",
    provider: "deepseek",
    inputPrice: 0.55,
    outputPrice: 2.19,
    quality: 4,
    tier: "balanced"
  },
  "qwen-max": {
    name: "Qwen Max",
    provider: "qwen",
    inputPrice: 1.6,
    outputPrice: 6.4,
    quality: 4,
    tier: "balanced"
  },
  "qwen-plus": {
    name: "Qwen Plus",
    provider: "qwen",
    inputPrice: 0.3,
    outputPrice: 0.6,
    quality: 3,
    tier: "light"
  },
  "kimi-k2": {
    name: "Kimi K2",
    provider: "kimi",
    inputPrice: 0.6,
    outputPrice: 2.4,
    quality: 4,
    tier: "balanced"
  },
  "kimi-k2-turbo": {
    name: "Kimi K2 Turbo",
    provider: "kimi",
    inputPrice: 0.3,
    outputPrice: 1.2,
    quality: 3,
    tier: "light"
  },
  "glm-4.5": {
    name: "GLM-4.5",
    provider: "glm",
    inputPrice: 0.8,
    outputPrice: 3.2,
    quality: 4,
    tier: "balanced"
  },
  "glm-4-plus": {
    name: "GLM-4 Plus",
    provider: "glm",
    inputPrice: 0.5,
    outputPrice: 1,
    quality: 3,
    tier: "light"
  },
  "minimax-m2": {
    name: "MiniMax M2",
    provider: "minimax",
    inputPrice: 0.29,
    outputPrice: 1.16,
    quality: 3,
    tier: "light"
  },
  "minimax-m2-pro": {
    name: "MiniMax M2 Pro",
    provider: "minimax",
    inputPrice: 0.6,
    outputPrice: 2.4,
    quality: 4,
    tier: "balanced"
  }
};

const modelProviders = {
  anthropic: {
    zh: "Anthropic",
    en: "Anthropic"
  },
  openai: {
    zh: "OpenAI",
    en: "OpenAI"
  },
  google: {
    zh: "Google",
    en: "Google"
  },
  deepseek: {
    zh: "DeepSeek",
    en: "DeepSeek"
  },
  qwen: {
    zh: "Qwen",
    en: "Qwen"
  },
  kimi: {
    zh: "Kimi",
    en: "Kimi"
  },
  glm: {
    zh: "GLM",
    en: "GLM"
  },
  minimax: {
    zh: "MiniMax",
    en: "MiniMax"
  }
};

const scenarioPresets = {
  starter: {
    id: "starter",
    answers: {
      frequency: "1-5",
      complexity: "simple",
      web: "rare",
      output: "short"
    }
  },
  operator: {
    id: "operator",
    answers: {
      frequency: "6-20",
      complexity: "medium",
      web: "some",
      output: "medium"
    }
  },
  content: {
    id: "content",
    answers: {
      frequency: "21-50",
      complexity: "medium",
      web: "some",
      output: "long"
    }
  },
  browser: {
    id: "browser",
    answers: {
      frequency: "21-50",
      complexity: "hard",
      web: "high",
      output: "medium"
    }
  },
  scale: {
    id: "scale",
    answers: {
      frequency: "50+",
      complexity: "hard",
      web: "high",
      output: "long"
    }
  }
};

const questionnaireOptions = {
  frequency: {
    "1-5": { dailyTasks: 3 },
    "6-20": { dailyTasks: 12 },
    "21-50": { dailyTasks: 35 },
    "50+": { dailyTasks: 80 }
  },
  complexity: {
    simple: { steps: 14, score: 0 },
    medium: { steps: 32, score: 1 },
    hard: { steps: 70, score: 2 }
  },
  web: {
    rare: { steps: 0, score: 0 },
    some: { steps: 10, score: 0.5 },
    high: { steps: 25, score: 1 }
  },
  output: {
    short: { steps: 0, score: 0 },
    medium: { steps: 8, score: 0.5 },
    long: { steps: 18, score: 1 }
  }
};

const warningLabels = {
  zh: {
    low: "可放心起跑",
    watch: "需要关注",
    high: "偏高",
    critical: "过高"
  },
  en: {
    low: "Low",
    watch: "Watch",
    high: "High",
    critical: "Critical"
  }
};

function getWarningLevel(monthlyCost) {
  if (monthlyCost < 25) {
    return { level: "low", label: "Low", color: "#34d399", accent: "#10b981" };
  }
  if (monthlyCost < 120) {
    return { level: "watch", label: "Watch", color: "#fbbf24", accent: "#f59e0b" };
  }
  if (monthlyCost < 300) {
    return { level: "high", label: "High", color: "#fb7185", accent: "#ef4444" };
  }
  return { level: "critical", label: "Critical", color: "#fda4af", accent: "#dc2626" };
}

function calculateCost(modelId, dailyTasks, stepsPerTask) {
  const model = modelPricing[modelId];
  if (!model) return null;

  const avgInputTokens = 1000;
  const avgOutputTokens = 500;
  const totalInputTokens = dailyTasks * stepsPerTask * avgInputTokens;
  const totalOutputTokens = dailyTasks * stepsPerTask * avgOutputTokens;
  const inputCost = (totalInputTokens / 1000000) * model.inputPrice;
  const outputCost = (totalOutputTokens / 1000000) * model.outputPrice;
  const daily = inputCost + outputCost;
  const monthly = daily * 30;

  return {
    daily,
    weekly: daily * 7,
    monthly,
    yearly: daily * 365,
    inputCost,
    outputCost,
    totalInputTokens,
    totalOutputTokens,
    warning: getWarningLevel(monthly)
  };
}

function compareModels(dailyTasks, stepsPerTask, selectedModelId) {
  return Object.entries(modelPricing)
    .map(([modelId, model]) => ({
      modelId,
      model,
      cost: calculateCost(modelId, dailyTasks, stepsPerTask),
      isSelected: modelId === selectedModelId
    }))
    .filter((item) => item.cost)
    .sort((left, right) => left.cost.monthly - right.cost.monthly);
}

function getModelsByProvider(providerId) {
  return Object.entries(modelPricing)
    .filter(([, model]) => model.provider === providerId)
    .sort((left, right) => {
      if (right[1].quality !== left[1].quality) {
        return right[1].quality - left[1].quality;
      }
      return left[1].inputPrice - right[1].inputPrice;
    });
}

function getOptimizationSuggestions(selectedModelId, dailyTasks, stepsPerTask) {
  const selected = calculateCost(selectedModelId, dailyTasks, stepsPerTask);
  if (!selected) return [];

  const cheaperAlt = compareModels(dailyTasks, stepsPerTask, selectedModelId).find((item) => {
    return item.modelId !== selectedModelId && item.model.quality >= modelPricing[selectedModelId].quality - 1;
  });

  const suggestions = [];
  if (cheaperAlt) {
    suggestions.push({
      kind: "model",
      text: `Switch to ${cheaperAlt.model.name} when a slight quality drop is acceptable.`,
      textZh: `如果容忍轻微质量下降，可以改用 ${cheaperAlt.model.name}。`,
      savings: Math.max(0, selected.monthly - cheaperAlt.cost.monthly)
    });
  }

  if (stepsPerTask > 70) {
    suggestions.push({
      kind: "steps",
      text: "Split long chains into smaller runs so each run burns fewer tokens.",
      textZh: "把长链路拆成更短的多次运行，能直接压低单次 token 消耗。",
      savings: selected.monthly * 0.18
    });
  }

  if (dailyTasks > 35) {
    suggestions.push({
      kind: "volume",
      text: "Route repetitive jobs to a cheaper model and save premium models for the hard cases.",
      textZh: "把重复任务下放到便宜模型，把贵模型留给难题。",
      savings: selected.monthly * 0.22
    });
  }

  if (suggestions.length < 2) {
    suggestions.push({
      kind: "output",
      text: "Shorter outputs and tighter summaries are usually the fastest way to lower cost.",
      textZh: "限制输出长度和中间总结，通常是最快的降本动作。",
      savings: selected.monthly * 0.12
    });
  }

  return suggestions.slice(0, 3);
}

function mapQuestionnaireToWorkload(answers) {
  const frequency = questionnaireOptions.frequency[answers.frequency] || questionnaireOptions.frequency["6-20"];
  const complexity = questionnaireOptions.complexity[answers.complexity] || questionnaireOptions.complexity.medium;
  const web = questionnaireOptions.web[answers.web] || questionnaireOptions.web.some;
  const output = questionnaireOptions.output[answers.output] || questionnaireOptions.output.medium;

  const dailyTasks = frequency.dailyTasks;
  const stepsPerTask = complexity.steps + web.steps + output.steps;
  const score = complexity.score
    + web.score
    + output.score
    + (answers.frequency === "50+" ? 0.5 : answers.frequency === "21-50" ? 0.25 : 0);

  let recommendedModel = "gpt-4.1-mini";
  if (score >= 3.5) {
    recommendedModel = "claude-opus-4.1";
  } else if (score >= 2.25) {
    recommendedModel = "gpt-5";
  } else if (score >= 1.5) {
    recommendedModel = "claude-sonnet-4";
  }

  return {
    dailyTasks,
    stepsPerTask,
    recommendedModel,
    score
  };
}

function buildCostNarrative(summary, lang = "en") {
  const zh = lang === "zh";
  const complexityLabel = zh
    ? { simple: "简单", medium: "中等", hard: "复杂" }[summary.complexityKey]
    : { simple: "simple", medium: "medium", hard: "complex" }[summary.complexityKey];

  const warningMessage = zh
    ? {
        low: "这还处在可以放心起跑的成本区间。",
        watch: "已经进入需要开始盯预算的区间。",
        high: "如果不优化链路结构，月成本会继续抬高。",
        critical: "现在就该重做路由和任务拆分，否则成本会很难看。"
      }[summary.warning.level]
    : {
        low: "This is still a safe range for an early rollout.",
        watch: "This is where budget discipline starts to matter.",
        high: "Without workflow changes, the monthly spend will keep climbing.",
        critical: "You should redesign routing and task structure now before cost compounds."
      }[summary.warning.level];

  if (zh) {
    return `推荐模型是 ${summary.modelName}。你当前更像一个每天 ${summary.frequencyLabelZh}、单次任务复杂度为${complexityLabel}的 Agent。${warningMessage}`;
  }

  return `The recommended model is ${summary.modelName}. Your agent currently looks like a ${summary.frequencyLabelEn.toLowerCase()} ${complexityLabel} workflow. ${warningMessage}`;
}

function buildShareText(summary, lang = "en") {
  if (lang === "zh") {
    return `我测了一下 OpenClaw Agent 成本：${summary.modelName} 大约 $${summary.dailyCost.toFixed(2)}/天，$${summary.monthlyCost.toFixed(2)}/月。${summary.takeawayZh} openclaw-resource-hub.vercel.app/pages/cost-calculator.html`;
  }

  return `I estimated my OpenClaw agent cost on ${summary.modelName}: about $${summary.dailyCost.toFixed(2)}/day and $${summary.monthlyCost.toFixed(2)}/month. ${summary.takeawayEn} openclaw-resource-hub.vercel.app/pages/cost-calculator.html`;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const tokens = text.includes(" ") ? text.split(" ") : Array.from(text);
  const joiner = text.includes(" ") ? " " : "";
  let line = "";
  let cursorY = y;

  tokens.forEach((token) => {
    const next = line ? `${line}${joiner}${token}` : token;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = token;
      cursorY += lineHeight;
    } else {
      line = next;
    }
  });

  if (line) {
    ctx.fillText(line, x, cursorY);
  }
}

function generateShareCard(summary) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1200;
  canvas.height = 1200;

  const bg = ctx.createLinearGradient(0, 0, 1200, 1200);
  bg.addColorStop(0, "#020617");
  bg.addColorStop(0.55, "#0f172a");
  bg.addColorStop(1, "#111827");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.14;
  ctx.fillStyle = summary.warning.accent;
  ctx.beginPath();
  ctx.arc(1050, 140, 240, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#38bdf8";
  ctx.beginPath();
  ctx.arc(150, 1080, 280, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(255,255,255,0.04)";
  drawRoundedRect(ctx, 50, 50, 1100, 1100, 44);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 50, 50, 1100, 1100, 44);
  ctx.stroke();

  ctx.fillStyle = "#f8fafc";
  ctx.font = "600 34px Georgia, serif";
  ctx.fillText("OpenClaw Agent Cost", 100, 130);

  ctx.fillStyle = "rgba(248,250,252,0.72)";
  ctx.font = "500 24px Arial";
  ctx.fillText(summary.lang === "zh" ? "一张能直接转发的成本卡片" : "A budget card built for sharing", 100, 175);

  ctx.fillStyle = summary.warning.accent;
  drawRoundedRect(ctx, 880, 92, 190, 48, 24);
  ctx.fill();
  ctx.fillStyle = "#020617";
  ctx.font = "700 21px Arial";
  ctx.fillText(summary.warningLabel, 920, 124);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "700 72px Georgia, serif";
  ctx.fillText(`$${summary.dailyCost.toFixed(2)}`, 100, 330);
  ctx.font = "500 24px Arial";
  ctx.fillStyle = "rgba(248,250,252,0.72)";
  ctx.fillText(summary.lang === "zh" ? "预计每日成本" : "Estimated daily cost", 100, 372);

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "700 48px Georgia, serif";
  ctx.fillText(`$${summary.monthlyCost.toFixed(2)}`, 100, 472);
  ctx.font = "500 22px Arial";
  ctx.fillStyle = "rgba(203,213,225,0.78)";
  ctx.fillText(summary.lang === "zh" ? "预计每月成本" : "Estimated monthly cost", 100, 508);

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  drawRoundedRect(ctx, 100, 570, 1000, 220, 28);
  ctx.fill();

  const meta = [
    [summary.lang === "zh" ? "推荐模型" : "Recommended model", summary.modelName],
    [summary.lang === "zh" ? "每天使用频率" : "Daily usage", summary.frequencyLabel],
    [summary.lang === "zh" ? "任务复杂度" : "Task complexity", summary.complexityLabel]
  ];

  meta.forEach((item, index) => {
    const x = 140 + index * 320;
    ctx.fillStyle = "rgba(148,163,184,0.9)";
    ctx.font = "500 20px Arial";
    ctx.fillText(item[0], x, 640);
    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 34px Georgia, serif";
    ctx.fillText(item[1], x, 700);
  });

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  drawRoundedRect(ctx, 100, 840, 1000, 180, 28);
  ctx.fill();
  ctx.fillStyle = "#f8fafc";
  ctx.font = "600 34px Georgia, serif";
  ctx.fillText(summary.lang === "zh" ? "结论" : "Takeaway", 140, 905);
  ctx.font = "500 30px Arial";
  wrapCanvasText(ctx, summary.takeaway, 140, 960, 920, 44);

  ctx.fillStyle = "rgba(248,250,252,0.64)";
  ctx.font = "500 22px Arial";
  ctx.fillText("openclaw-resource-hub.vercel.app/pages/cost-calculator.html", 140, 1080);

  return canvas;
}

function downloadCanvasAsPng(canvas, filename = "openclaw-agent-cost.png") {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function shareCostResult(summary, lang = "en", canvas) {
  const shareText = buildShareText(summary, lang);
  const shareUrl = window.location.href;

  if (navigator.share && canvas && navigator.canShare) {
    try {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (blob) {
        const file = new File([blob], "openclaw-agent-cost.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "OpenClaw Agent Cost",
            text: shareText,
            files: [file]
          });
          return { mode: "native" };
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    return { mode: "clipboard" };
  }

  return { mode: "unsupported" };
}

window.modelPricing = modelPricing;
window.modelProviders = modelProviders;
window.scenarioPresets = scenarioPresets;
window.questionnaireOptions = questionnaireOptions;
window.warningLabels = warningLabels;
window.getWarningLevel = getWarningLevel;
window.calculateCost = calculateCost;
window.compareModels = compareModels;
window.getModelsByProvider = getModelsByProvider;
window.getOptimizationSuggestions = getOptimizationSuggestions;
window.mapQuestionnaireToWorkload = mapQuestionnaireToWorkload;
window.buildCostNarrative = buildCostNarrative;
window.buildShareText = buildShareText;
window.generateShareCard = generateShareCard;
window.downloadCanvasAsPng = downloadCanvasAsPng;
window.shareCostResult = shareCostResult;
