from urllib.request import urlopen

import esprima


URL = "https://openclaw-resource-hub.vercel.app/js/module-pages.js"


def main() -> None:
    with urlopen(URL, timeout=20) as response:
        body = response.read().decode("utf-8", errors="replace")
    esprima.parseScript(body)
    print("live module-pages.js OK")


if __name__ == "__main__":
    main()
