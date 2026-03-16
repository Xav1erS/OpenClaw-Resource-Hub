from __future__ import annotations

from urllib.request import urlopen


URLS = [
    "https://openclawtools.org/pages/command-center.html",
    "https://openclawtools.org/pages/quickstart.html",
    "https://openclawtools.org/pages/task-library.html",
    "https://openclawtools.org/pages/tutorials.html",
    "https://openclawtools.org/pages/release-notes.html",
    "https://openclawtools.org/pages/cost-calculator.html",
    "https://openclawtools.org/js/module-pages.js",
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
