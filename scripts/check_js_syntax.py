from pathlib import Path

import esprima


def main() -> None:
    target = Path("js/module-pages.js")
    text = target.read_text(encoding="utf-8")
    esprima.parseScript(text)
    print("module-pages.js OK")


if __name__ == "__main__":
    main()
