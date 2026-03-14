(function () {
  function isElement(node) {
    return node && node.nodeType === 1;
  }

  function elementChildren(node) {
    return Array.from(node.children || []).filter(isElement);
  }

  function buildRow(leftNode, rightNode) {
    const row = document.createElement("div");
    row.className = "grid gap-6 xl:grid-cols-[1.15fr,0.85fr] xl:items-start";

    const left = document.createElement("div");
    left.className = "min-w-0 space-y-6";

    const right = document.createElement("div");
    right.className = "min-w-0 space-y-6";

    if (leftNode) left.appendChild(leftNode);
    if (rightNode) right.appendChild(rightNode);

    row.appendChild(left);
    row.appendChild(right);
    return row;
  }

  function applyStandardFlow(root) {
    if (!root || root.dataset.flowApplied === "1") return false;
    const direct = elementChildren(root);
    if (direct.length !== 2) return false;

    const [section, aside] = direct;
    if (section.tagName !== "SECTION" || aside.tagName !== "ASIDE") return false;

    const leftNodes = elementChildren(section);
    const rightNodes = elementChildren(aside);
    if (!leftNodes.length || !rightNodes.length) return false;

    const flow = document.createElement("div");
    flow.className = "space-y-6";

    const total = Math.max(leftNodes.length, rightNodes.length);
    for (let index = 0; index < total; index += 1) {
      flow.appendChild(buildRow(leftNodes[index], rightNodes[index]));
    }

    root.replaceChildren(flow);
    root.dataset.flowApplied = "1";
    return true;
  }

  function applyCommandCenterFlow() {
    const pageRoot = document.getElementById("page-root");
    if (!pageRoot) return false;

    const commandRoot = document.getElementById("command-sections");
    const issueRoot = document.getElementById("issue-sections");
    if (!commandRoot || !issueRoot) return false;

    const host = commandRoot.parentElement;
    if (!host || host.dataset.flowApplied === "1") return false;

    const searchBox = pageRoot.querySelector(":scope > div > div");
    const leftNodes = elementChildren(commandRoot).map((node) => node.cloneNode(true));
    const rightNodes = elementChildren(issueRoot).map((node) => node.cloneNode(true));
    if (!leftNodes.length && !rightNodes.length) return false;

    const flow = document.createElement("div");
    flow.className = "space-y-6";
    flow.setAttribute("data-command-flow", "true");

    const total = Math.max(leftNodes.length, rightNodes.length);
    for (let index = 0; index < total; index += 1) {
      flow.appendChild(buildRow(leftNodes[index], rightNodes[index]));
    }

    const wrapper = pageRoot.querySelector(":scope > div");
    if (!wrapper) return false;

    host.classList.add("hidden");
    if (!pageRoot.querySelector("[data-command-flow]")) {
      wrapper.appendChild(flow);
    } else {
      pageRoot.querySelector("[data-command-flow]").replaceWith(flow);
    }

    if (searchBox) {
      searchBox.classList.add("order-1");
    }

    host.dataset.flowApplied = "1";
    return true;
  }

  function applyCostFlow() {
    const mainSection = document.querySelector("main > section.mt-10");
    if (!mainSection || mainSection.dataset.flowApplied === "1") return false;

    const direct = elementChildren(mainSection);
    if (direct.length !== 2) return false;

    const [left, right] = direct;
    if (!left.classList.contains("space-y-6") || right.tagName !== "ASIDE") return false;

    const leftNodes = elementChildren(left);
    if (!leftNodes.length) return false;

    const flow = document.createElement("div");
    flow.className = "space-y-6";
    flow.appendChild(buildRow(leftNodes[0], right));

    if (leftNodes.length > 1) {
      const rest = document.createElement("div");
      rest.className = "grid gap-6";
      leftNodes.slice(1).forEach((node) => rest.appendChild(node));
      flow.appendChild(rest);
    }

    mainSection.replaceChildren(flow);
    mainSection.dataset.flowApplied = "1";
    return true;
  }

  function run() {
    const pathname = window.location.pathname;

    if (pathname.includes("/pages/command-center.html")) {
      applyCommandCenterFlow();
      return;
    }

    if (pathname.includes("/pages/cost-calculator.html")) {
      applyCostFlow();
      return;
    }

    const standardRoot = document.querySelector("#page-root > div");
    if (standardRoot) {
      applyStandardFlow(standardRoot);
    }
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      run();
    });
  }

  const observer = new MutationObserver(() => schedule());

  function start() {
    schedule();
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
