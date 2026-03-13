(function () {
  const text = {
    zh: {
      title: "这里适合做什么",
      body: "教程页用来补方法论、上手顺序和排错思路。模板库解决“拿什么开工”，命令中心解决“命令怎么写”，这里解决“为什么这么做”。",
      pills: ["补方法论", "理解顺序", "建立排错思路"],
      asideTitle: "阅读建议",
      asideBody: "如果你已经知道要做什么，先去模板库；如果你卡在环境或命令，先去命令中心；如果你想理解背后的做法，再看教程。"
    },
    en: {
      title: "Use This Page For",
      body: "Tutorials explain the reasoning, setup order, and debugging approach. Templates answer what to start from. Command Center answers which command to run.",
      pills: ["Learn the reasoning", "Understand the sequence", "Build debugging intuition"],
      asideTitle: "Reading Advice",
      asideBody: "If you already know the job, start with Task Library. If you are blocked by setup or commands, use Command Center. Use Tutorials when you need the why behind the workflow."
    }
  };

  function currentLang() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? "en" : "zh";
  }

  function inject() {
    const root = document.getElementById("page-root");
    if (!root) return;
    const pack = text[currentLang()];

    const mainSection = root.querySelector(":scope > div > section");
    if (mainSection && !mainSection.querySelector("[data-tutorial-intro]")) {
      const card = document.createElement("article");
      card.className = "mb-4 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5";
      card.setAttribute("data-tutorial-intro", "true");
      card.innerHTML = `
        <h2 class="text-lg font-semibold text-white">${pack.title}</h2>
        <p class="mt-3 text-sm leading-6 text-slate-200">${pack.body}</p>
        <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/90">
          ${pack.pills.map((item) => `<span class="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2">${item}</span>`).join("")}
        </div>
      `;
      mainSection.insertBefore(card, mainSection.firstChild);
    }

    const aside = root.querySelector(":scope > div > aside");
    if (aside && !aside.querySelector("[data-reading-advice]")) {
      const card = document.createElement("article");
      card.className = "rounded-3xl border border-white/10 bg-white/[0.03] p-5";
      card.setAttribute("data-reading-advice", "true");
      card.innerHTML = `
        <h2 class="text-lg font-semibold text-white">${pack.asideTitle}</h2>
        <p class="mt-3 text-sm leading-6 text-slate-300">${pack.asideBody}</p>
      `;
      aside.insertBefore(card, aside.firstChild);
    }
  }

  const observer = new MutationObserver(inject);

  function start() {
    inject();
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
