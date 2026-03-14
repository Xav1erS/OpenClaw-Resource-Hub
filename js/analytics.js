(function () {
  const debug = ["127.0.0.1", "localhost"].includes(window.location.hostname);
  const measurementMeta = document.querySelector('meta[name="openclaw-ga-id"]');
  const measurementId = window.OPENCLAW_GA_MEASUREMENT_ID || (measurementMeta && measurementMeta.content) || "";
  window.dataLayer = window.dataLayer || [];
  window.__openclawAnalytics = window.__openclawAnalytics || [];

  function installGtag() {
    if (!measurementId || typeof window.gtag === "function") return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);

    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false,
      debug_mode: debug
    });
  }

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
  installGtag();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackPageView, { once: true });
  } else {
    trackPageView();
  }
})();
