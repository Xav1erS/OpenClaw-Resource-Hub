from pathlib import Path


path = Path(r"C:\Users\Windows11\Documents\GitHub\OpenClaw-Resource-Hub\js\module-pages.js")
text = path.read_text(encoding="utf-8")
start = text.index("  function renderReleaseNotesPage() {")
end = text.index("  window.modulePages = {")

replacement = """  function renderReleaseNotesPage() {
    setPage(\"release-notes\", renderReleaseNotesPage);
    const notes = releaseNotes[state.currentLang];
    const roadmap = roadmapItems[state.currentLang];
    const timelineLabel = state.currentLang === \"zh\" ? \"版本时间线\" : \"Release Timeline\";
    const latestBadge = \"Latest\";
    const latestSummary = state.currentLang === \"zh\"
      ? \"当前可公开访问版本的上线基线。\"
      : \"The launch baseline for the current public version.\";
    const sprintSummary = state.currentLang === \"zh\"
      ? \"这一轮迭代完成的核心更新。\"
      : \"Core updates completed in this iteration.\";

    pageShell(\"release-notes\", [
      { label: pageText.release.stats.rounds, value: notes.length },
      { label: pageText.release.stats.roadmap, value: roadmap.length },
      { label: pageText.release.stats.status, value: pageText.release.statusValue }
    ]);

    document.getElementById(\"page-root\").innerHTML = `
      <div class=\"grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)] xl:items-start\">
        <section class=\"relative rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.88))] p-5 shadow-2xl shadow-slate-950/20 sm:p-6\">
          <div class=\"mb-6 flex flex-wrap items-end justify-between gap-4\">
            <div>
              <p class=\"text-xs uppercase tracking-[0.32em] text-red-200/80\">Timeline</p>
              <h2 class=\"mt-3 text-2xl font-semibold text-white\">${timelineLabel}</h2>
            </div>
            <div class=\"rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-200\">
              ${t(pageText.release.stats.status)} · ${t(pageText.release.statusValue)}
            </div>
          </div>
          <div class=\"relative pl-0 lg:pl-8\">
            <div class=\"pointer-events-none absolute bottom-0 left-3 top-2 hidden w-px bg-[linear-gradient(180deg,rgba(248,113,113,0.6),rgba(148,163,184,0.05))] lg:block\"></div>
            <div class=\"space-y-4\">
              ${notes.map((item, index) => `
                <article class=\"relative overflow-hidden rounded-[28px] border ${index === 0 ? \"border-red-400/30 bg-[linear-gradient(135deg,rgba(127,29,29,0.28),rgba(15,23,42,0.9))]\" : \"border-white/10 bg-white/[0.03]\"} p-5 lg:ml-8\">
                  <div class=\"absolute left-[-2.55rem] top-8 hidden h-4 w-4 rounded-full border border-red-300/50 bg-red-400 shadow-[0_0_0_6px_rgba(248,113,113,0.12)] lg:block\"></div>
                  <div class=\"flex flex-wrap items-start justify-between gap-3\">
                    <div class=\"min-w-0\">
                      <div class=\"flex flex-wrap items-center gap-3\">
                        <h3 class=\"text-xl font-semibold text-white\">${item.version}</h3>
                        ${index === 0 ? `<span class=\"rounded-full border border-red-300/30 bg-red-500/15 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-red-100\">${latestBadge}</span>` : \"\"}
                      </div>
                      <p class=\"mt-2 text-sm text-slate-400\">${index === 0 ? latestSummary : sprintSummary}</p>
                    </div>
                    <span class=\"rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs text-slate-300\">${item.date}</span>
                  </div>
                  <div class=\"mt-5 grid gap-3\">
                    ${item.highlights.map((highlight, highlightIndex) => `
                      <div class=\"rounded-2xl border ${index === 0 && highlightIndex === 0 ? \"border-red-400/20 bg-red-500/10\" : \"border-white/10 bg-slate-950/70\"} px-4 py-3 text-sm leading-6 text-slate-200\">
                        ${highlight}
                      </div>
                    `).join(\"\")}
                  </div>
                </article>
              `).join(\"\")}
            </div>
          </div>
        </section>
        <aside class=\"space-y-4\">
          <article class=\"overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.88))] p-5\">
            <div class=\"flex items-center justify-between gap-3\">
              <h2 class=\"text-lg font-semibold text-white\">${t(pageText.release.nextTitle)}</h2>
              <span class=\"rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400\">${roadmap.length}</span>
            </div>
            <div class=\"mt-4 space-y-3\">
              ${roadmap.map((item, index) => `
                <div class=\"rounded-2xl border border-white/10 bg-slate-950/70 p-4\">
                  <div class=\"flex items-start gap-3\">
                    <span class=\"mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-medium text-slate-300\">${index + 1}</span>
                    <p class=\"text-sm leading-6 text-slate-300\">${item}</p>
                  </div>
                </div>
              `).join(\"\")}
            </div>
          </article>
          <article class=\"rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.88))] p-5\">
            <h2 class=\"text-lg font-semibold text-white\">${t(pageText.release.ideaTitle)}</h2>
            <p class=\"mt-3 text-sm leading-7 text-slate-300\">${t(pageText.release.ideaBody)}</p>
          </article>
        </aside>
      </div>
    `;
  }

"""

path.write_text(text[:start] + replacement + text[end:], encoding="utf-8")
