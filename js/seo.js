(function () {
  const metaSiteUrl = document.querySelector('meta[name="openclaw-site-url"]');
  const configuredSiteUrl = metaSiteUrl && metaSiteUrl.content
    ? metaSiteUrl.content.replace(/\/+$/, "")
    : "https://openclawtools.org";

  const defaultImage = `${configuredSiteUrl}/openclaw-og.svg`;

  function ensureMeta(attr, key) {
    const selector = `meta[${attr}="${key}"]`;
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    return tag;
  }

  function ensureCanonical() {
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    return link;
  }

  function ensureStructuredData() {
    let script = document.head.querySelector('script[data-openclaw-seo="structured-data"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-openclaw-seo", "structured-data");
      document.head.appendChild(script);
    }
    return script;
  }

  function toAbsoluteUrl(pathname) {
    const path = pathname && pathname.startsWith("/") ? pathname : window.location.pathname;
    return `${configuredSiteUrl}${path}`;
  }

  function updateSeo(options) {
    const next = options || {};
    const title = next.title || document.title || "OpenClaw Resource Hub";
    const description = next.description || "";
    const pathname = next.pathname || window.location.pathname;
    const url = next.url || toAbsoluteUrl(pathname);
    const image = next.image || defaultImage;
    const lang = next.lang || document.documentElement.lang || "zh-CN";
    const robots = next.robots || "index,follow";
    const pageNameMeta = document.querySelector('meta[name="openclaw-page"]');
    const pageName = next.pageName || (pageNameMeta && pageNameMeta.content) || "page";
    const isHome = pathname === "/" || pathname === "/index.html";
    const structuredData = isHome
      ? {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "OpenClaw Resource Hub",
          url: configuredSiteUrl,
          inLanguage: lang,
          description,
          image
        }
      : {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          url,
          inLanguage: lang,
          description,
          image,
          isPartOf: {
            "@type": "WebSite",
            name: "OpenClaw Resource Hub",
            url: configuredSiteUrl
          },
          about: pageName
        };

    document.title = title;
    document.documentElement.lang = lang;
    ensureCanonical().setAttribute("href", url);

    ensureMeta("name", "description").setAttribute("content", description);
    ensureMeta("name", "robots").setAttribute("content", robots);
    ensureMeta("property", "og:type").setAttribute("content", "website");
    ensureMeta("property", "og:site_name").setAttribute("content", "OpenClaw Resource Hub");
    ensureMeta("property", "og:title").setAttribute("content", title);
    ensureMeta("property", "og:description").setAttribute("content", description);
    ensureMeta("property", "og:url").setAttribute("content", url);
    ensureMeta("property", "og:image").setAttribute("content", image);
    ensureMeta("property", "og:locale").setAttribute("content", lang === "zh-CN" ? "zh_CN" : "en_US");
    ensureMeta("name", "twitter:card").setAttribute("content", "summary_large_image");
    ensureMeta("name", "twitter:title").setAttribute("content", title);
    ensureMeta("name", "twitter:description").setAttribute("content", description);
    ensureMeta("name", "twitter:image").setAttribute("content", image);
    ensureStructuredData().textContent = JSON.stringify(structuredData);
  }

  window.openClawSeo = {
    siteUrl: configuredSiteUrl,
    update: updateSeo
  };

  updateSeo();

  // Vercel Analytics (static site injection)
  (function () {
    var s = document.createElement("script");
    s.defer = true;
    s.src = "/_vercel/insights/script.js";
    document.head.appendChild(s);
  })();
})();
