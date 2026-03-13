(function () {
  const debug = ["127.0.0.1", "localhost"].includes(window.location.hostname);
  window.dataLayer = window.dataLayer || [];
  window.__openclawAnalytics = window.__openclawAnalytics || [];

  function basePayload(extra) {
    return {
      page_path: window.location.pathname,
      page_title: document.title,
      lang: localStorage.getItem("openclaw-module-lang") || localStorage.getItem("openclaw-lang") || "zh",
      ...extra
    };
  }

  function trackEvent(name, params) {
    const payload = basePayload(params || {});
    window.dataLayer.push({ event: name, ...payload });
    window.__openclawAnalytics.push({ name, payload, timestamp: Date.now() });
    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
    }
    if (debug && typeof console !== "undefined" && console.info) {
      console.info("[analytics]", name, payload);
    }
  }

  function trackPageView() {
    if (window.__openclawPageTracked) return;
    window.__openclawPageTracked = true;
    trackEvent("page_view", {
      page_name: window.location.pathname.split("/").pop() || "index"
    });
  }

  window.trackEvent = trackEvent;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackPageView, { once: true });
  } else {
    trackPageView();
  }
})();
