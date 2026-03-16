# Claude Code Notes

## What This Repo Is
OpenClaw Resource Hub is a static resource site deployed on Vercel. Most pages are rendered client-side from shared JS modules rather than a framework build step.

## Editing Guidance
- Prefer minimal, targeted edits. Shared UI logic lives in JS render functions, not templates/components.
- Before changing navigation or indexing, check all of:
  - `js/module-pages.js`
  - `js/site-shell.js`
  - `js/landing.js`
  - `sitemap.xml`
  - `robots.txt`
- When touching the cost calculator, assume these three files are linked:
  - `js/calculator.js`
  - `js/cost-calculator-redesign.js`
  - `js/share-card-overrides.js`

## Current Intentional States
- `Tutorials` is hidden from public nav and should stay out of indexing until content is ready.
- `community.html`, `tools.html`, and `workflows.html` are redirect/noindex pages.
- Share card exports are a live product surface, not a prototype. Be careful with layout regressions.

## Search Submission Readiness
- Use the public sitemap:
  `https://openclaw-resource-hub.vercel.app/sitemap.xml`
- Keep only public, index-worthy pages inside the sitemap.
- If a page is hidden for product reasons, it should usually also be removed from the sitemap and set to `noindex`.

## Current Pain Points
- No GA4 Measurement ID yet.
- Tutorials content is still too thin for public discovery.
- Share card layout still benefits from visual QA after each change.
- Cost model pricing will drift unless maintained over time.
