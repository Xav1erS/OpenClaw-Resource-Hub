# OpenClaw Resource Hub Handoff

## Current Product Scope
- Public navigation is centered on `Quick Start`, `Command Center`, `Troubleshooting`, `Task Library`, `Cost Calculator`, and `Release Notes`.
- `Tutorials` exists as a page, but it is intentionally hidden from primary navigation and should not be pushed for search indexing until real content is ready.
- Redirect/merged pages such as `community.html`, `tools.html`, and `workflows.html` are not part of the public IA and should remain out of sitemap/indexing flows.

## Important Files
- `index.html`: homepage shell and SEO entrypoint.
- `pages/*.html`: static page entrypoints.
- `js/module-pages.js`: shared rendering for most content pages and global page shell.
- `js/site-shell.js`: shared header/nav/language switch shell.
- `js/landing.js`: homepage rendering and homepage module structure.
- `js/calculator.js`: pricing/model data and cost estimation logic.
- `js/cost-calculator-redesign.js`: current public cost calculator UI.
- `js/share-card-overrides.js`: cost share card drawing logic for `1:1` and `4:5`.
- `js/page-clarity.js`: shared guidance/clarity card rendering.
- `sitemap.xml` and `robots.txt`: search indexing surface.

## Current Constraints
- This is still a static-file site. There is no build pipeline and no framework runtime.
- The public site is currently hosted on the default Vercel domain:
  `https://openclaw-resource-hub.vercel.app`
- Google Analytics wiring exists, but `openclaw-ga-id` is still blank in page metadata, so real analytics is not live yet.
- The share card system is canvas-based and uses a local QR asset:
  `assets/cost-calculator-qr.png`
- Tutorials are intentionally hidden because content depth is not yet production-ready.

## Search / SEO State
- `sitemap.xml` is now limited to pages that are intended for public indexing.
- `pages/tutorials.html` should stay `noindex` until the module is reopened.
- Redirect/placeholder pages should remain `noindex,follow`.

## Known Product Decisions
- Keep key technical terms in English when they are the actual search/query vocabulary:
  `API Key`, `CLI`, `gateway`, `memory`, `slash commands`.
- Do not fabricate engagement metrics. Fake favorites/usage counts were already removed from task cards.
- Cost share cards support two export shapes:
  `1:1` for chat sharing and `4:5` for feed/post sharing.
- The `1:1` card is intentionally more compressed than the `4:5` card. Shared visual language should stay aligned, but layout should not be mechanically identical across ratios.

## Next Suggested Work
1. Connect a real GA4 Measurement ID.
2. Continue polishing cost share cards with real visual regression checks.
3. Expand cost calculator model coverage and add maintenance notes when pricing changes.
4. Reopen `Tutorials` only after substantial content is added, then remove `noindex` and re-add it to public navigation/sitemap.
5. Consider a custom domain before broader search submission.
