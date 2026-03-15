(function () {
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

  function fillRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
    ctx.fillStyle = fillStyle;
    drawRoundedRect(ctx, x, y, width, height, radius);
    ctx.fill();
  }

  function strokeRoundedRect(ctx, x, y, width, height, radius, strokeStyle, lineWidth) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    drawRoundedRect(ctx, x, y, width, height, radius);
    ctx.stroke();
  }

  function label(summary, zh, en) {
    return summary.lang === "zh" ? zh : en;
  }

  function getSiteUrl() {
    const meta = document.querySelector('meta[name="openclaw-site-url"]');
    return (meta && meta.content) || window.location.origin || "https://openclaw-resource-hub.vercel.app";
  }

  function getShareLandingUrl() {
    return `${getSiteUrl().replace(/\/$/, "")}/pages/cost-calculator.html`;
  }

  function getDesktopUrl() {
    return "openclaw-resource-hub.vercel.app";
  }

  let qrImagePromise = null;

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  function getQrImage() {
    if (!qrImagePromise) {
      qrImagePromise = loadImage("/assets/cost-calculator-qr.png").catch(() => null);
    }
    return qrImagePromise;
  }

  function getWarningSentence(summary, lang) {
    const zh = {
      low: "当前成本可控，可以先跑起来。",
      medium: "已经要开始盯成本了。",
      high: "不收紧链路，月成本会继续涨。",
      critical: "先重做链路，再继续放量。"
    };
    const en = {
      low: "This is still manageable and safe for an early rollout.",
      medium: "Costs are now worth tracking before scaling further.",
      high: "Monthly spend will keep climbing unless the flow is tightened.",
      critical: "Redesign the route and task structure before scaling further."
    };
    return lang === "zh" ? zh[summary.warning.level] : en[summary.warning.level];
  }

  function buildShareCardTakeaway(summary, lang = "en") {
    if (lang === "zh") {
      return `${summary.modelName} 约 $${summary.dailyCost.toFixed(2)}/天，$${summary.monthlyCost.toFixed(2)}/月。${getWarningSentence(summary, "zh")}`;
    }
    return `${summary.modelName} is about $${summary.dailyCost.toFixed(2)}/day and $${summary.monthlyCost.toFixed(2)}/month. ${getWarningSentence(summary, "en")}`;
  }

  function buildShareText(summary, lang = "en") {
    if (lang === "zh") {
      return `我测了下 OpenClaw Agent 成本：${summary.modelName} 约 $${summary.dailyCost.toFixed(2)}/天，$${summary.monthlyCost.toFixed(2)}/月。${getWarningSentence(summary, "zh")} ${getShareLandingUrl()}`;
    }
    return `I estimated an OpenClaw agent on ${summary.modelName}: about $${summary.dailyCost.toFixed(2)}/day and $${summary.monthlyCost.toFixed(2)}/month. ${getWarningSentence(summary, "en")} ${getShareLandingUrl()}`;
  }

  function wrapLines(ctx, text, maxWidth, maxLines) {
    const tokens = text.includes(" ") ? text.split(" ") : Array.from(text);
    const joiner = text.includes(" ") ? " " : "";
    const lines = [];
    let line = "";

    tokens.forEach((token) => {
      const next = line ? `${line}${joiner}${token}` : token;
      if (ctx.measureText(next).width > maxWidth && line) {
        lines.push(line);
        line = token;
      } else {
        line = next;
      }
    });

    if (line) lines.push(line);
    return maxLines ? lines.slice(0, maxLines) : lines;
  }

  function drawLines(ctx, lines, x, y, lineHeight) {
    lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  }

  function getCanvasPreset(format) {
    return format === "portrait"
      ? { width: 1080, height: 1350, ratioLabel: "4:5" }
      : { width: 1200, height: 1200, ratioLabel: "1:1" };
  }

  function drawBackground(ctx, width, height, accent) {
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#060816");
    bg.addColorStop(0.55, "#0f172a");
    bg.addColorStop(1, "#111827");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 0.12;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(width * 0.86, height * 0.1, width * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1d4ed8";
    ctx.beginPath();
    ctx.arc(width * 0.06, height * 0.9, width * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    fillRoundedRect(ctx, 42, 50, width - 84, height - 100, 42, "rgba(15,23,42,0.76)");
    strokeRoundedRect(ctx, 42, 50, width - 84, height - 100, 42, "rgba(255,255,255,0.08)", 2);
  }

  function drawHeader(ctx, summary, preset) {
    ctx.fillStyle = "#f8fafc";
    ctx.font = preset.width === 1080 ? "600 40px Georgia, serif" : "600 48px Georgia, serif";
    ctx.fillText("OpenClaw Agent Cost", 96, 132);

    ctx.fillStyle = "rgba(226,232,240,0.78)";
    ctx.font = preset.width === 1080 ? "600 18px Arial" : "600 20px Arial";
    ctx.fillText(label(summary, "一眼看懂的成本卡", "A cost card built to repost"), 96, 174);

    fillRoundedRect(ctx, 96, 206, 226, 44, 22, "rgba(255,255,255,0.05)");
    ctx.fillStyle = "rgba(248,250,252,0.82)";
    ctx.font = "700 16px Arial";
    ctx.fillText(label(summary, "风险", "Risk"), 120, 234);
    fillRoundedRect(ctx, 176, 214, 112, 28, 14, summary.warning.accent);
    ctx.fillStyle = "#020617";
    ctx.font = "700 16px Arial";
    ctx.fillText(summary.warningLabel, 208, 234);

    ctx.fillStyle = "rgba(248,250,252,0.55)";
    ctx.font = "600 16px Arial";
    ctx.fillText(preset.ratioLabel, preset.width - 128, 92);
  }

  function drawMetricCard(ctx, card) {
    fillRoundedRect(ctx, card.x, card.y, card.width, card.height, 28, "rgba(255,255,255,0.055)");
    ctx.fillStyle = "rgba(203,213,225,0.82)";
    ctx.font = "600 18px Arial";
    ctx.fillText(card.title, card.x + 28, card.y + 40);

    ctx.fillStyle = "#f8fafc";
    ctx.font = card.large ? "700 58px Georgia, serif" : "700 32px Georgia, serif";
    const valueLines = wrapLines(ctx, card.value, card.width - 56, card.large ? 2 : 2);
    drawLines(ctx, valueLines, card.x + 28, card.y + (card.large ? 116 : 92), card.large ? 56 : 34);

    if (card.note) {
      ctx.fillStyle = "rgba(203,213,225,0.74)";
      ctx.font = "600 16px Arial";
      const noteLines = wrapLines(ctx, card.note, card.width - 56, 2);
      drawLines(ctx, noteLines, card.x + 28, card.y + card.height - (noteLines.length === 2 ? 42 : 28), 18);
    }
  }

  function drawSummaryPanel(ctx, summary, panel) {
    fillRoundedRect(ctx, panel.x, panel.y, panel.width, panel.height, 30, "rgba(255,255,255,0.06)");
    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 34px Georgia, serif";
    ctx.fillText(label(summary, "结论", "Takeaway"), panel.x + 34, panel.y + 54);

    ctx.fillStyle = "rgba(248,250,252,0.96)";
    ctx.font = "700 24px Arial";
    const headline = label(
      summary,
      `当前配置约 $${summary.dailyCost.toFixed(2)}/天，$${summary.monthlyCost.toFixed(2)}/月`,
      `This setup is about $${summary.dailyCost.toFixed(2)}/day and $${summary.monthlyCost.toFixed(2)}/month`
    );
    const headlineLines = wrapLines(ctx, headline, panel.width - 68, 2);
    drawLines(ctx, headlineLines, panel.x + 34, panel.y + 104, 32);

    const bullets = [
      label(summary, `模型：${summary.modelName}`, `Model: ${summary.modelName}`),
      label(summary, `风险：${summary.warningLabel}`, `Risk: ${summary.warningLabel}`),
      label(summary, "扫码看模型对比和降本建议", "Scan for comparisons and savings ideas")
    ];

    ctx.font = "600 17px Arial";
    let y = panel.y + 156;
    bullets.forEach((bullet) => {
      ctx.fillStyle = summary.warning.accent;
      ctx.beginPath();
      ctx.arc(panel.x + 40, y - 6, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(226,232,240,0.86)";
      const lines = wrapLines(ctx, bullet, panel.width - 94, 2);
      drawLines(ctx, lines, panel.x + 56, y, 22);
      y += lines.length * 22 + 18;
    });
  }

  function drawQrPanel(ctx, summary, qrImage, panel) {
    fillRoundedRect(ctx, panel.x, panel.y, panel.width, panel.height, 30, "rgba(9,13,28,0.82)");
    fillRoundedRect(ctx, panel.x + (panel.width - panel.qrBox) / 2, panel.y + 18, panel.qrBox, panel.qrBox, 24, "#ffffff");
    if (qrImage) {
      const qrSize = panel.qrBox - 28;
      ctx.drawImage(qrImage, panel.x + (panel.width - qrSize) / 2, panel.y + 32, qrSize, qrSize);
    }

    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label(summary, "扫码看完整成本页", "Scan for the full calculator"), panel.x + panel.width / 2, panel.y + panel.qrBox + 54);
    ctx.fillStyle = "rgba(203,213,225,0.72)";
    ctx.font = "600 15px Arial";
    const desktopLines = wrapLines(ctx, label(summary, "桌面端：openclaw-resource-hub.vercel.app", "Desktop: openclaw-resource-hub.vercel.app"), panel.width - 36, 2);
    drawLines(ctx, desktopLines, panel.x + 18, panel.y + panel.qrBox + 84, 18);
    ctx.textAlign = "start";
  }

  function drawBrandPanel(ctx, summary, x, y, width, height) {
    fillRoundedRect(ctx, x, y, width, height, 24, "rgba(255,255,255,0.05)");
    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 18px Arial";
    ctx.fillText(label(summary, "OpenClaw 资源中心", "OpenClaw Resource Hub"), x + 22, y + 28);
    ctx.fillStyle = "rgba(203,213,225,0.68)";
    ctx.font = "600 15px Arial";
    ctx.fillText(label(summary, "模板、排错、命令速查", "Templates, fixes, and commands"), x + 22, y + 54);
  }

  function drawWatermark(ctx, width, height) {
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 84px Arial";
    ctx.translate(width * 0.76, height * 0.83);
    ctx.rotate(-0.16);
    ctx.fillText("OPENCLAW", 0, 0);
    ctx.restore();
  }

  function renderSquareCard(ctx, summary, qrImage, preset) {
    drawHeader(ctx, summary, preset);

    drawMetricCard(ctx, { x: 96, y: 286, width: 474, height: 188, title: label(summary, "预计每日成本", "Estimated daily cost"), value: `$${summary.dailyCost.toFixed(2)}`, note: label(summary, "按当前模型与任务强度估算", "Based on your model and workload"), large: true });
    drawMetricCard(ctx, { x: 628, y: 286, width: 474, height: 188, title: label(summary, "预计每月成本", "Estimated monthly cost"), value: `$${summary.monthlyCost.toFixed(2)}`, note: label(summary, "按 30 天估算", "Assuming 30 active days"), large: true });
    drawMetricCard(ctx, { x: 96, y: 524, width: 474, height: 132, title: label(summary, "当前模型", "Current model"), value: summary.modelName, note: summary.providerName });
    drawMetricCard(ctx, { x: 628, y: 524, width: 474, height: 132, title: label(summary, "每天使用频率", "Daily usage"), value: summary.frequencyLabel, note: `${summary.dailyTasks} ${label(summary, "次/天", "runs/day")}` });
    drawMetricCard(ctx, { x: 96, y: 698, width: 474, height: 132, title: label(summary, "任务复杂度", "Task complexity"), value: summary.complexityLabel, note: `${summary.stepsPerTask} ${label(summary, "步/次", "steps/run")}` });
    drawMetricCard(ctx, { x: 628, y: 698, width: 474, height: 132, title: label(summary, "核心动作", "Next action"), value: label(summary, "扫码继续看", "Scan for next step"), note: label(summary, "看模型对比和降本建议", "Open comparisons and savings ideas") });

    drawSummaryPanel(ctx, summary, { x: 96, y: 882, width: 650, height: 224 });
    drawQrPanel(ctx, summary, qrImage, { x: 826, y: 868, width: 236, height: 270, qrBox: 160 });
    drawBrandPanel(ctx, summary, 782, 1038, 280, 76);

    ctx.fillStyle = "rgba(248,250,252,0.46)";
    ctx.font = "600 15px Arial";
    ctx.fillText(label(summary, "桌面端：openclaw-resource-hub.vercel.app", "Desktop: openclaw-resource-hub.vercel.app"), 96, 1126);
    drawWatermark(ctx, preset.width, preset.height);
  }

  function renderPortraitCard(ctx, summary, qrImage, preset) {
    drawHeader(ctx, summary, preset);

    drawMetricCard(ctx, { x: 86, y: 286, width: 908, height: 176, title: label(summary, "预计每月成本", "Estimated monthly cost"), value: `$${summary.monthlyCost.toFixed(2)}`, note: label(summary, "最适合直接转发的一行结果", "The one line most worth sharing"), large: true });
    drawMetricCard(ctx, { x: 86, y: 500, width: 438, height: 136, title: label(summary, "当前模型", "Current model"), value: summary.modelName, note: summary.providerName });
    drawMetricCard(ctx, { x: 556, y: 500, width: 438, height: 136, title: label(summary, "任务强度", "Task intensity"), value: summary.complexityLabel, note: `${summary.dailyTasks} ${label(summary, "次/天", "runs/day")}` });

    drawSummaryPanel(ctx, summary, { x: 86, y: 684, width: 908, height: 282 });
    drawBrandPanel(ctx, summary, 86, 1178, 292, 76);
    drawQrPanel(ctx, summary, qrImage, { x: 762, y: 1002, width: 232, height: 276, qrBox: 154 });
    drawWatermark(ctx, preset.width, preset.height);
  }

  async function generateShareCard(summary, format = "square") {
    const preset = getCanvasPreset(format);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = preset.width;
    canvas.height = preset.height;

    drawBackground(ctx, preset.width, preset.height, summary.warning.accent);
    const qrImage = await getQrImage();

    if (format === "portrait") {
      renderPortraitCard(ctx, summary, qrImage, preset);
    } else {
      renderSquareCard(ctx, summary, qrImage, preset);
    }

    return canvas;
  }

  async function shareCostResult(summary, lang = "en", canvas) {
    const shareText = buildShareText(summary, lang);

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
      await navigator.clipboard.writeText(shareText);
      return { mode: "clipboard" };
    }

    return { mode: "unsupported" };
  }

  window.buildShareCardTakeaway = buildShareCardTakeaway;
  window.buildShareText = buildShareText;
  window.generateShareCard = generateShareCard;
  window.shareCostResult = shareCostResult;
})();
