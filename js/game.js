/* Game page: game.html?id=<project id>. Normally you don't need to edit this file. */
(async () => {
  const id = new URLSearchParams(location.search).get("id");
  const idx = PROJECTS.findIndex(p => p.id === id);
  const p = PROJECTS[idx];
  const root = $("#game");

  if (!p || !p.page || p.available === false) {
    root.innerHTML = `<div class="g-missing"><h1>Not found</h1><p>This project page doesn't exist (yet).</p><a class="btn btn-blood" href="index.html#projects">Back to projects</a></div>`;
    return;
  }
  const G = p.page;
  document.title = `${p.title} — ${SITE.name}`;
  $('meta[name="description"]').content = p.description || "";
  const setMeta = (sel, v) => { const m = $(sel); if (m) m.content = v; };
  setMeta('meta[property="og:title"]', document.title);
  setMeta('meta[name="twitter:title"]', document.title);
  setMeta('meta[property="og:description"]', p.description || "");
  setMeta('meta[name="twitter:description"]', p.description || "");
  setMeta('meta[property="og:url"]', location.href);
  let canon = document.querySelector('link[rel="canonical"]');
  if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.append(canon); }
  canon.href = location.origin + location.pathname + "?id=" + encodeURIComponent(p.id);

  /* ---------- Content ---------- */
  const req = Object.entries(G.requirements || {}).filter(([, v]) => v);
  const info = [
    ["Status", p.status], ["Version", p.version],
    ["Platforms", (p.downloads || []).map(d => osName(d.platform)).join(", ")],
    ...(G.info || []),
    ["Tags", (p.tags || []).join(", ")], ["Rating", p.age]
  ].filter(([, v]) => v);
  const news = (await loadNews()).filter(n => n.project === p.title).slice(0, 5);

  root.innerHTML = `
    <div class="g-banner reveal">
      ${G.banner ? `<img src="${esc(G.banner)}" alt="${esc(p.title)}" onerror="this.replaceWith(Object.assign(document.createElement('h1'),{textContent:this.alt}))">` : `<h1>${esc(p.title)}</h1>`}
    </div>

    <div class="g-col reveal">
      <div class="g-main">
        ${G.warning ? `<div class="g-warning">⚠ ${esc(G.warning)}</div>` : ""}

        ${G.trailer ? `<div class="g-video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(G.trailer)}" title="Trailer" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : ""}

        <h2>About</h2>
        ${(G.about || [p.description]).map(t => `<p>${esc(t)}</p>`).join("")}

        ${(G.features || []).length ? `<h2>Features</h2>
          <ul class="g-features">${G.features.map(([h, t]) => `<li><b>${esc(h)}</b><span>${esc(t)}</span></li>`).join("")}</ul>` : ""}

        ${G.itch ? `<h2>Screenshots</h2>
          <a class="g-gallery-note" href="${esc(G.itch)}" target="_blank" rel="noopener">
            <span class="gn-icon">✠</span>
            <span><b>Screenshots are on itch.io</b><em>The game contains mature content, so screenshots are shown only on the itch.io page behind its age check.</em></span>
            <span class="gn-arrow">➜</span>
          </a>` : ""}

        ${(G.changelog || []).length ? `<h2>Changelog</h2>
          <ol class="g-changelog">${G.changelog.map(c => `
            <li><div class="cl-head"><b>${esc(c.version)}</b><time>${fmtDate(c.date)}</time></div><p>${esc(c.notes)}</p></li>`).join("")}</ol>` : ""}

        ${news.length ? `<h2>Latest Devlogs</h2>
          <div class="g-devlogs">${news.map(n => `
            <a href="${esc(n.link)}" target="_blank" rel="noopener"><time>${fmtDate(n.date)}</time><span>${esc(n.title)}</span></a>`).join("")}</div>` : ""}
      </div>

      <aside class="g-side">
        ${(p.downloads || []).length ? `<button class="btn btn-blood g-btn" data-dl="${idx}">${dlLabel(p)}</button>` : ""}
        <div class="plats">${platBadges(p)}</div>

        <table class="g-info">${info.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</table>

        ${req.length ? `<h3>Minimum Requirements</h3>
          <table class="g-info">${req.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</table>` : ""}

        <div class="g-links">
          ${G.itch ? `<a href="${esc(G.itch)}" target="_blank" rel="noopener">Page on itch.io ↗</a>` : ""}
          <a href="index.html#projects">← All projects</a>
        </div>
      </aside>
    </div>`;
  observeReveals();

})();
