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

  function label(summary, zh, en) {
    return summary.lang === "zh" ? zh : en;
  }

  function getWarningSentence(summary, lang) {
    const zh = {
      low: "当前成本仍在可控区间，适合先跑起来。",
      medium: "已经进入需要盯成本的区间，建议开始收紧链路。",
      high: "如果不优化链路结构，月成本会继续上升。",
      critical: "先重做路由和任务结构，再继续放量。"
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
      return `当前模型 ${summary.modelName}，约 $${summary.dailyCost.toFixed(2)}/天，$${summary.monthlyCost.toFixed(2)}/月。${getWarningSentence(summary, "zh")}`;
    }

    return `Current model: ${summary.modelName}. About $${summary.dailyCost.toFixed(2)}/day and $${summary.monthlyCost.toFixed(2)}/month. ${getWarningSentence(summary, "en")}`;
  }

  function buildShareText(summary, lang = "en") {
    if (lang === "zh") {
      return `我测了一下 OpenClaw Agent 成本：${summary.modelName} 约 $${summary.dailyCost.toFixed(2)}/天，$${summary.monthlyCost.toFixed(2)}/月。${buildShareCardTakeaway(summary, "zh")} openclaw-hub.com`;
    }

    return `I estimated my OpenClaw agent cost on ${summary.modelName}: about $${summary.dailyCost.toFixed(2)}/day and $${summary.monthlyCost.toFixed(2)}/month. ${buildShareCardTakeaway(summary, "en")} openclaw-hub.com`;
  }

  function statCard(ctx, options) {
    const { x, y, width, height, title, value, note, accent } = options;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    drawRoundedRect(ctx, x, y, width, height, 28);
    ctx.fill();

    ctx.fillStyle = "rgba(203,213,225,0.82)";
    ctx.font = "500 20px Arial";
    ctx.fillText(title, x + 34, y + 42);

    ctx.fillStyle = accent || "#f8fafc";
    ctx.font = "700 64px Georgia, serif";
    ctx.fillText(value, x + 34, y + 118);

    ctx.fillStyle = "rgba(226,232,240,0.88)";
    ctx.font = "500 21px Arial";
    wrapCanvasText(ctx, note, x + 34, y + 152, width - 68, 28);
  }

  function metaCard(ctx, options) {
    const { x, y, title, value, note } = options;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    drawRoundedRect(ctx, x, y, 470, 130, 26);
    ctx.fill();

    ctx.fillStyle = "rgba(148,163,184,0.9)";
    ctx.font = "500 20px Arial";
    ctx.fillText(title, x + 28, y + 40);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 32px Georgia, serif";
    wrapCanvasText(ctx, value, x + 28, y + 82, 400, 34);

    if (note) {
      ctx.fillStyle = "rgba(203,213,225,0.78)";
      ctx.font = "500 18px Arial";
      wrapCanvasText(ctx, note, x + 28, y + 108, 400, 22);
    }
  }

  function generateShareCard(summary) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 1200;

    const bg = ctx.createLinearGradient(0, 0, 1200, 1200);
    bg.addColorStop(0, "#020617");
    bg.addColorStop(0.52, "#0f172a");
    bg.addColorStop(1, "#111827");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.15;
    ctx.fillStyle = summary.warning.accent;
    ctx.beginPath();
    ctx.arc(1010, 140, 230, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(120, 1080, 250, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "rgba(255,255,255,0.045)";
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
    ctx.fillText(label(summary, "一张适合直接转发的成本卡片", "A share-ready cost card"), 100, 175);

    ctx.fillStyle = summary.warning.accent;
    drawRoundedRect(ctx, 858, 92, 220, 48, 24);
    ctx.fill();
    ctx.fillStyle = "#020617";
    ctx.font = "700 20px Arial";
    ctx.fillText(summary.warningLabel, 926, 124);

    statCard(ctx, {
      x: 100,
      y: 250,
      width: 470,
      height: 190,
      title: label(summary, "预计每日成本", "Estimated daily cost"),
      value: `$${summary.dailyCost.toFixed(2)}`,
      note: label(summary, "按当前模型与问卷结果估算", "Based on your current model and answers")
    });

    statCard(ctx, {
      x: 630,
      y: 250,
      width: 470,
      height: 190,
      title: label(summary, "预计每月成本", "Estimated monthly cost"),
      value: `$${summary.monthlyCost.toFixed(2)}`,
      note: label(summary, "按 30 天连续运行估算", "Assuming 30 active days"),
      accent: "#cbd5e1"
    });

    metaCard(ctx, {
      x: 100,
      y: 490,
      title: label(summary, "当前模型", "Current model"),
      value: summary.modelName,
      note: summary.providerName || ""
    });

    metaCard(ctx, {
      x: 630,
      y: 490,
      title: label(summary, "每天使用频率", "Daily usage"),
      value: summary.frequencyLabel,
      note: `${summary.dailyTasks} ${label(summary, "次/天", "runs/day")}`
    });

    metaCard(ctx, {
      x: 100,
      y: 650,
      title: label(summary, "任务复杂度", "Task complexity"),
      value: summary.complexityLabel,
      note: `${summary.stepsPerTask} ${label(summary, "步/次", "steps/run")}`
    });

    metaCard(ctx, {
      x: 630,
      y: 650,
      title: label(summary, "状态", "Status"),
      value: summary.warningLabel,
      note: label(summary, "这张卡片适合直接分享", "Built for sharing")
    });

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    drawRoundedRect(ctx, 100, 840, 1000, 220, 28);
    ctx.fill();
    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 34px Georgia, serif";
    ctx.fillText(label(summary, "结论", "Takeaway"), 140, 905);
    ctx.font = "500 28px Arial";
    wrapCanvasText(ctx, buildShareCardTakeaway(summary, summary.lang), 140, 960, 920, 40);

    ctx.fillStyle = "rgba(248,250,252,0.64)";
    ctx.font = "500 22px Arial";
    ctx.fillText("openclaw-hub.com", 140, 1095);

    return canvas;
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

  window.buildShareCardTakeaway = buildShareCardTakeaway;
  window.buildShareText = buildShareText;
  window.generateShareCard = generateShareCard;
  window.shareCostResult = shareCostResult;
})();
