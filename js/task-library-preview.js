(function () {
  const zh = {
    searchPlaceholder: "搜索模板名称、用途或分类",
    allCategories: "全部分类",
    preview: "展开代码预览",
    collapse: "收起代码预览",
    previewTitle: "即将复制的内容",
    copy: "复制模板",
    helper: "复制前可先展开代码块，确认结构和字段。",
    eyebrow: "可复用任务",
    title: "任务模板库",
    subtitle: "把常用 Agent 模板整理成可搜索、可预览、可复制的页面，避免盲目复制。"
  };

  const en = {
    searchPlaceholder: "Search by template name, use case, or category",
    allCategories: "All categories",
    preview: "Preview Code",
    collapse: "Hide Preview",
    previewTitle: "What You Will Copy",
    copy: "Copy Template",
    helper: "Expand the code block before copying so people can verify the structure first.",
    eyebrow: "Reusable Tasks",
    title: "Task Library",
    subtitle: "A searchable, previewable template library so users can inspect what they copy first."
  };

  function langPack() {
    return localStorage.getItem("openclaw-module-lang") === "en" ? en : zh;
  }

  let observer = null;

  function patchTaskLibraryPage() {
    const text = langPack();
    const search = document.getElementById("task-search");
    if (search) search.placeholder = text.searchPlaceholder;

    const category = document.getElementById("task-category");
    if (category && category.options.length > 0) {
      category.options[0].textContent = text.allCategories;
    }

    document.querySelectorAll("[data-toggle-preview]").forEach((button) => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.textContent = expanded ? text.collapse : text.preview;
    });

    document.querySelectorAll("[data-copy]").forEach((button) => {
      button.textContent = text.copy;
    });

    document.querySelectorAll('[id^="preview-"] > div').forEach((header) => {
      header.textContent = text.previewTitle;
    });

    const heroEyebrow = document.querySelector("main section:first-of-type .inline-flex");
    if (heroEyebrow) heroEyebrow.textContent = text.eyebrow;

    const heroTitle = document.querySelector("main section:first-of-type h1");
    if (heroTitle) heroTitle.textContent = text.title;

    const heroSubtitle = heroTitle && heroTitle.parentElement ? heroTitle.parentElement.querySelector("p") : null;
    if (heroSubtitle) heroSubtitle.textContent = text.subtitle;

    const list = document.getElementById("task-list");
    if (!list) return;

    list.querySelectorAll("article").forEach((card) => {
      if (card.querySelector("[data-preview-helper]")) return;
      const actionRow = card.querySelector(".mt-5.flex");
      if (!actionRow) return;
      const helper = document.createElement("p");
      helper.className = "mt-3 text-xs leading-5 text-slate-400";
      helper.setAttribute("data-preview-helper", "true");
      helper.textContent = text.helper;
      actionRow.insertAdjacentElement("afterend", helper);
    });
  }

  function start() {
    observer = new MutationObserver(() => {
      observer.disconnect();
      patchTaskLibraryPage();
      observer.observe(document.body, { childList: true, subtree: true });
    });
    patchTaskLibraryPage();
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
