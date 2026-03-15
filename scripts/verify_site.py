from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

HTML_CHECKS = {
    Path("index.html"): [
        'meta name="openclaw-site-url"',
        'meta name="openclaw-ga-id"',
        'meta name="description"',
        'meta property="og:title"',
        'meta name="twitter:card"',
        '<script src="/js/seo.js"></script>',
        '<script src="/js/analytics.js"></script>',
    ],
    Path("pages/quickstart.html"): [
        'meta name="openclaw-site-url"',
        'meta name="openclaw-ga-id"',
        'meta name="description"',
        'meta property="og:title"',
        'meta name="twitter:card"',
        '<script src="/js/seo.js"></script>',
        '<script src="/js/analytics.js"></script>',
    ],
    Path("pages/command-center.html"): [
        'meta name="openclaw-site-url"',
        'meta name="openclaw-ga-id"',
        'meta name="description"',
        'meta property="og:title"',
        'meta name="twitter:card"',
        '<script src="/js/seo.js"></script>',
        '<script src="/js/analytics.js"></script>',
    ],
    Path("pages/troubleshooting.html"): [
        'meta name="openclaw-site-url"',
        'meta name="openclaw-ga-id"',
        'meta name="description"',
        'meta property="og:title"',
        'meta name="twitter:card"',
        '<script src="/js/seo.js"></script>',
        '<script src="/js/analytics.js"></script>',
    ],
    Path("pages/task-library.html"): [
        'meta name="openclaw-site-url"',
        'meta name="openclaw-ga-id"',
        'meta name="description"',
        'meta property="og:title"',
        'meta name="twitter:card"',
        '<script src="/js/seo.js"></script>',
        '<script src="/js/analytics.js"></script>',
    ],
    Path("pages/cost-calculator.html"): [
        'meta name="openclaw-site-url"',
        'meta name="openclaw-ga-id"',
        'meta name="description"',
        'meta property="og:title"',
        'meta name="twitter:card"',
        '<script src="/js/seo.js"></script>',
        '<script src="/js/analytics.js"></script>',
    ],
    Path("pages/tutorials.html"): [
        'meta name="openclaw-site-url"',
        'meta name="openclaw-ga-id"',
        'meta name="description"',
        'meta property="og:title"',
        'meta name="twitter:card"',
        '<script src="/js/seo.js"></script>',
        '<script src="/js/analytics.js"></script>',
    ],
    Path("pages/release-notes.html"): [
        'meta name="openclaw-site-url"',
        'meta name="openclaw-ga-id"',
        'meta name="description"',
        'meta property="og:title"',
        'meta name="twitter:card"',
        '<script src="/js/seo.js"></script>',
        '<script src="/js/analytics.js"></script>',
    ],
}


STATIC_FILES = [
    Path("js/seo.js"),
    Path("js/analytics.js"),
    Path("openclaw-og.svg"),
    Path("favicon.svg"),
    Path("robots.txt"),
    Path("sitemap.xml"),
    Path("404.html"),
]


def main() -> int:
    failures: list[str] = []

    for rel_path, checks in HTML_CHECKS.items():
        full_path = ROOT / rel_path
        if not full_path.exists():
            failures.append(f"Missing file: {rel_path}")
            continue

        content = full_path.read_text(encoding="utf-8")
        for check in checks:
            if check not in content:
                failures.append(f"{rel_path}: missing `{check}`")

    for rel_path in STATIC_FILES:
        if not (ROOT / rel_path).exists():
            failures.append(f"Missing file: {rel_path}")

    robots = (ROOT / "robots.txt").read_text(encoding="utf-8") if (ROOT / "robots.txt").exists() else ""
    if "Sitemap:" not in robots:
        failures.append("robots.txt: missing Sitemap entry")

    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8") if (ROOT / "sitemap.xml").exists() else ""
    for expected in (
        "/index.html",
        "/pages/quickstart.html",
        "/pages/command-center.html",
        "/pages/troubleshooting.html",
        "/pages/task-library.html",
        "/pages/cost-calculator.html",
        "/pages/tutorials.html",
        "/pages/release-notes.html",
    ):
        if expected not in sitemap:
            failures.append(f"sitemap.xml: missing {expected}")

    if failures:
        print("FAIL")
        for item in failures:
            print(f"- {item}")
        return 1

    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
