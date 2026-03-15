from __future__ import annotations

from urllib.request import urlopen


URLS = [
    "https://openclaw-resource-hub.vercel.app/pages/command-center.html",
    "https://openclaw-resource-hub.vercel.app/pages/quickstart.html",
    "https://openclaw-resource-hub.vercel.app/pages/task-library.html",
    "https://openclaw-resource-hub.vercel.app/pages/tutorials.html",
    "https://openclaw-resource-hub.vercel.app/pages/release-notes.html",
    "https://openclaw-resource-hub.vercel.app/pages/cost-calculator.html",
    "https://openclaw-resource-hub.vercel.app/js/module-pages.js",
]


def main() -> None:
    for url in URLS:
        with urlopen(url, timeout=20) as response:
            body = response.read().decode("utf-8", errors="replace")
        print(url)
        print(f"status={response.status} bytes={len(body)}")
        print(body[:240].replace("\n", " "))
        print("---")


if __name__ == "__main__":
    main()
