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

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const tokens = text.includes(" ") ? text.split(" ") : Array.from(text);
    const joiner = text.includes(" ") ? " " : "";
    let line = "";
    let cursorY = y;
    let lines = 0;

    for (const token of tokens) {
      const next = line ? `${line}${joiner}${token}` : token;
      if (ctx.measureText(next).width > maxWidth && line) {
        ctx.fillText(line, x, cursorY);
        line = token;
        cursorY += lineHeight;
        lines += 1;
        if (maxLines && lines >= maxLines - 1) break;
      } else {
        line = next;
      }
    }

    if (line && (!maxLines || lines < maxLines)) {
      ctx.fillText(line, x, cursorY);
      lines += 1;
    }

    return y + Math.max(lines, 1) * lineHeight;
  }

  function label(summary, zh, en) {
    return summary.lang === "zh" ? zh : en;
  }

  function getSiteUrl() {
    const meta = document.querySelector('meta[name="openclaw-site-url"]');
    return (meta && meta.content) || window.location.origin || "https://openclaw-resource-hub.vercel.app";
  }

  function getShareLandingUrl() {
    const siteUrl = getSiteUrl().replace(/\/$/, "");
    return `${siteUrl}/pages/cost-calculator.html`;
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

  function getCanvasPreset(format) {
    if (format === "portrait") {
      return { width: 1080, height: 1350 };
    }
    return { width: 1200, height: 1200 };
  }

  function drawBackground(ctx, width, height, accent) {
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#050816");
    bg.addColorStop(0.55, "#0f172a");
    bg.addColorStop(1, "#111827");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 0.14;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(width * 0.86, height * 0.11, width * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1d4ed8";
    ctx.beginPath();
    ctx.arc(width * 0.08, height * 0.88, width * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    fillRoundedRect(ctx, 42, 50, width - 84, height - 100, 42, "rgba(15,23,42,0.72)");
    strokeRoundedRect(ctx, 42, 50, width - 84, height - 100, 42, "rgba(255,255,255,0.08)", 2);
  }

  function drawHeader(ctx, summary, width, format) {
    ctx.fillStyle = "#f8fafc";
    ctx.font = format === "portrait" ? "600 40px Georgia, serif" : "600 48px Georgia, serif";
    ctx.fillText("OpenClaw Agent Cost", 96, 132);

    ctx.fillStyle = "rgba(226,232,240,0.78)";
    ctx.font = format === "portrait" ? "500 22px Arial" : "500 24px Arial";
    ctx.fillText(label(summary, "一眼看懂的成本卡", "A cost card built to repost"), 96, 174);

    fillRoundedRect(ctx, 96, 202, 208, 46, 23, "rgba(255,255,255,0.05)");
    ctx.fillStyle = "rgba(248,250,252,0.88)";
    ctx.font = "700 17px Arial";
    ctx.fillText(label(summary, "风险", "Risk"), 120, 232);
    fillRoundedRect(ctx, 176, 212, 112, 28, 14, summary.warning.accent);
    ctx.fillStyle = "#020617";
    ctx.font = "700 16px Arial";
    ctx.fillText(summary.warningLabel, 208, 232);

    ctx.fillStyle = "rgba(248,250,252,0.56)";
    ctx.font = "600 16px Arial";
    ctx.fillText(format === "portrait" ? "4:5" : "1:1", width - 126, 92);
  }

  function drawMetricCard(ctx, options) {
    const { x, y, width, height, title, value, note, accent, large } = options;
    fillRoundedRect(ctx, x, y, width, height, 28, "rgba(255,255,255,0.055)");
    ctx.fillStyle = "rgba(203,213,225,0.82)";
    ctx.font = "600 18px Arial";
    ctx.fillText(title, x + 28, y + 38);

    ctx.fillStyle = accent || "#f8fafc";
    ctx.font = large ? "700 58px Georgia, serif" : "700 30px Georgia, serif";
    wrapCanvasText(ctx, value, x + 28, y + (large ? 116 : 86), width - 56, large ? 56 : 36, large ? 2 : 3);

    if (note) {
      ctx.fillStyle = "rgba(226,232,240,0.74)";
      ctx.font = "500 18px Arial";
      wrapCanvasText(ctx, note, x + 28, y + height - 34, width - 56, 24, 2);
    }
  }

  function drawSummaryPanel(ctx, summary, x, y, width, height) {
    fillRoundedRect(ctx, x, y, width, height, 30, "rgba(255,255,255,0.06)");
    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 34px Georgia, serif";
    ctx.fillText(label(summary, "结论", "Takeaway"), x + 34, y + 50);

    ctx.fillStyle = "rgba(248,250,252,0.96)";
    ctx.font = "600 22px Arial";
    const headline = label(
      summary,
      `当前配置约 $${summary.dailyCost.toFixed(2)}/天，$${summary.monthlyCost.toFixed(2)}/月`,
      `This setup is about $${summary.dailyCost.toFixed(2)}/day and $${summary.monthlyCost.toFixed(2)}/month`
    );
    wrapCanvasText(ctx, headline, x + 34, y + 102, width - 68, 30, 2);

    ctx.fillStyle = "rgba(203,213,225,0.8)";
    ctx.font = "500 18px Arial";
    const points = [
      label(summary, `模型：${summary.modelName}`, `Model: ${summary.modelName}`),
      label(summary, `风险：${summary.warningLabel}`, `Risk: ${summary.warningLabel}`),
      label(summary, "扫码看模型对比和降本建议", "Scan for comparisons and savings ideas")
    ];
    let cursorY = y + 150;
    points.forEach((point) => {
      ctx.fillStyle = summary.warning.accent;
      ctx.beginPath();
      ctx.arc(x + 40, cursorY - 6, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(203,213,225,0.86)";
      cursorY = wrapCanvasText(ctx, point, x + 56, cursorY, width - 94, 24, 2) + 14;
    });
  }

  function drawQrBlock(ctx, summary, qrImage, x, y, size) {
    fillRoundedRect(ctx, x, y, size + 54, size + 112, 30, "rgba(9,13,28,0.78)");
    fillRoundedRect(ctx, x + 18, y + 18, size + 18, size + 18, 24, "#ffffff");
    if (qrImage) {
      ctx.drawImage(qrImage, x + 36, y + 36, size - 18, size - 18);
    }
    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 18px Arial";
    ctx.fillText(label(summary, "扫码看完整成本页", "Scan for the full calculator"), x + 20, y + size + 72);
    ctx.fillStyle = "rgba(203,213,225,0.72)";
    ctx.font = "500 16px Arial";
    wrapCanvasText(ctx, label(summary, "桌面端：openclaw-resource-hub.vercel.app", "Desktop: openclaw-resource-hub.vercel.app"), x + 20, y + size + 100, size + 10, 20, 2);
  }

  function drawFooterBrand(ctx, summary, x, y) {
    fillRoundedRect(ctx, x, y, 290, 72, 24, "rgba(255,255,255,0.05)");
    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 20px Arial";
    ctx.fillText(label(summary, "OpenClaw 资源中心", "OpenClaw Resource Hub"), x + 22, y + 30);
    ctx.fillStyle = "rgba(203,213,225,0.7)";
    ctx.font = "500 16px Arial";
    ctx.fillText(label(summary, "模板、排错、命令速查", "Templates, fixes, and commands"), x + 22, y + 56);
  }

  function drawWatermark(ctx, width, height) {
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 86px Arial";
    ctx.translate(width * 0.72, height * 0.82);
    ctx.rotate(-0.16);
    ctx.fillText("OPENCLAW", 0, 0);
    ctx.restore();
  }

  function renderSquareCard(ctx, summary, qrImage) {
    drawHeader(ctx, summary, 1200, "square");

    drawMetricCard(ctx, {
      x: 96, y: 284, width: 474, height: 188,
      title: label(summary, "预计每日成本", "Estimated daily cost"),
      value: `$${summary.dailyCost.toFixed(2)}`,
      note: label(summary, "按当前模型与任务强度估算", "Based on your model and workload"),
      large: true
    });
    drawMetricCard(ctx, {
      x: 628, y: 284, width: 474, height: 188,
      title: label(summary, "预计每月成本", "Estimated monthly cost"),
      value: `$${summary.monthlyCost.toFixed(2)}`,
      note: label(summary, "按 30 天估算", "Assuming 30 active days"),
      large: true
    });
    drawMetricCard(ctx, {
      x: 96, y: 522, width: 474, height: 132,
      title: label(summary, "当前模型", "Current model"),
      value: summary.modelName,
      note: summary.providerName
    });
    drawMetricCard(ctx, {
      x: 628, y: 522, width: 474, height: 132,
      title: label(summary, "每天使用频率", "Daily usage"),
      value: summary.frequencyLabel,
      note: `${summary.dailyTasks} ${label(summary, "次/天", "runs/day")}`
    });
    drawMetricCard(ctx, {
      x: 96, y: 696, width: 474, height: 132,
      title: label(summary, "任务复杂度", "Task complexity"),
      value: summary.complexityLabel,
      note: `${summary.stepsPerTask} ${label(summary, "步/次", "steps/run")}`
    });
    drawMetricCard(ctx, {
      x: 628, y: 696, width: 474, height: 132,
      title: label(summary, "核心动作", "Next action"),
      value: label(summary, "扫码继续看", "Scan for next step"),
      note: label(summary, "看模型对比和降本建议", "Open comparisons and savings ideas")
    });

    drawSummaryPanel(ctx, summary, 96, 878, 650, 218);
    drawQrBlock(ctx, summary, qrImage, 826, 864, 150);
    drawFooterBrand(ctx, summary, 782, 1022);

    ctx.fillStyle = "rgba(248,250,252,0.48)";
    ctx.font = "500 16px Arial";
    ctx.fillText(label(summary, "桌面端：openclaw-resource-hub.vercel.app", "Desktop: openclaw-resource-hub.vercel.app"), 96, 1090);
    drawWatermark(ctx, 1200, 1200);
  }

  function renderPortraitCard(ctx, summary, qrImage) {
    drawHeader(ctx, summary, 1080, "portrait");

    drawMetricCard(ctx, {
      x: 86, y: 286, width: 908, height: 176,
      title: label(summary, "预计每月成本", "Estimated monthly cost"),
      value: `$${summary.monthlyCost.toFixed(2)}`,
      note: label(summary, "最适合直接转发的一行结果", "The one line most worth sharing"),
      large: true
    });
    drawMetricCard(ctx, {
      x: 86, y: 498, width: 438, height: 134,
      title: label(summary, "当前模型", "Current model"),
      value: summary.modelName,
      note: summary.providerName
    });
    drawMetricCard(ctx, {
      x: 556, y: 498, width: 438, height: 134,
      title: label(summary, "任务强度", "Task intensity"),
      value: summary.complexityLabel,
      note: `${summary.dailyTasks} ${label(summary, "次/天", "runs/day")}`
    });

    drawSummaryPanel(ctx, summary, 86, 678, 908, 286);
    drawQrBlock(ctx, summary, qrImage, 744, 1002, 166);
    drawFooterBrand(ctx, summary, 86, 1180);
    drawWatermark(ctx, 1080, 1350);
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
      renderPortraitCard(ctx, summary, qrImage);
    } else {
      renderSquareCard(ctx, summary, qrImage);
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
