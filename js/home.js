/* Home page. Normally you don't need to edit this file. */
(async () => {
  /* ---------- Static texts ---------- */
  // page title is set in index.html (SEO)
  $(".tagline").textContent = SITE.tagline;
  $(".hero-btn").textContent = SITE.heroButton;
  $("#aboutTitle").textContent = SITE.about.title;
  $("#aboutText").innerHTML = SITE.about.text.map(p => `<p>${esc(p)}</p>`).join("");
  $("#socials").innerHTML = SITE.socials.map(s =>
    `<a class="btn" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join("");

  /* ---------- Project tiles ---------- */
  $("#tiles").innerHTML = PROJECTS.map((p, i) => {
    const locked = p.available === false;
    const page = !locked && gamePage(p);
    return `
    <article class="tile reveal ${locked ? "locked" : ""} ${page ? "has-page" : ""}" data-type="${esc(p.type || "")}" ${page ? `data-href="${page}"` : ""} style="transition-delay:${i * 0.12}s">
      ${locked ? `<div class="lock"><span>✠</span>${esc(p.lockedText || "Coming Soon")}</div>` : ""}
      <div class="placeholder">${esc(p.title[0])}</div>
      ${p.cover ? `<img class="cover" src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy" onerror="this.remove()">` : ""}
      <div class="badges">
        <span class="badge-group">${p.type ? `<span class="badge type">${esc(p.type)}</span>` : ""}<span class="badge">${esc(p.status)}</span></span>
        ${p.age ? `<span class="badge age">${esc(p.age)}</span>` : "<span></span>"}
      </div>
      <div class="tile-info">
        <h3>${esc(p.title)}</h3>
        <div class="meta"><span class="ver">${esc(p.version)}</span><span class="plats">${platBadges(p)}</span></div>
        <p class="desc">${esc(p.description)}</p>
        <div class="tags">${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <div class="dl">
          ${(p.downloads || []).length ? `<button class="btn btn-blood" data-dl="${i}" ${locked ? "disabled" : ""}>${dlLabel(p)}</button>` : ""}
          ${page ? `<a class="btn" href="${page}">Details</a>` : ""}
        </div>
      </div>
    </article>`;
  }).join("");
  $$(".tile.has-page").forEach(t => t.addEventListener("click", e => {
    if (!e.target.closest("button,a")) location.href = t.dataset.href;
  }));
  enableTilt(".tile:not(.locked)");

  /* ---------- Type filter (only if 2+ types) ---------- */
  const types = [...new Set(PROJECTS.map(p => p.type).filter(Boolean))];
  const fBox = $("#filters");
  if (types.length > 1) {
    fBox.innerHTML = ["All", ...types].map((t, i) =>
      `<button class="chip ${i === 0 ? "on" : ""}" data-f="${esc(t)}">${esc(t)}${i ? "s" : ""}</button>`).join("");
    fBox.addEventListener("click", e => {
      const c = e.target.closest(".chip"); if (!c) return;
      fBox.querySelectorAll(".chip").forEach(x => x.classList.toggle("on", x === c));
      $$(".tile").forEach(t => t.classList.toggle("hidden", c.dataset.f !== "All" && t.dataset.type !== c.dataset.f));
    });
  } else fBox.remove();

  /* ---------- Support ---------- */
  const S = SITE.support;
  $("#support").innerHTML = `
    <h3>${esc(S.title)}</h3>
    <p>${esc(S.text)}</p>
    <ul class="perks">${S.perks.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <div class="support-btns">${S.buttons.map(b => `<a class="btn btn-blood" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.name)}</a>`).join("")}</div>`;

  /* ---------- Discord (live counters) ---------- */
  const D = SITE.discord, inv = `https://discord.gg/${D.invite}`;
  $("#discord").innerHTML = `
    <div class="dc-head"><div class="dc-icon">✠</div><div><h3 id="dcName">${esc(D.title)}</h3><span class="dc-sub">${esc(D.text)}</span></div></div>
    <div class="dc-stats">
      <div><b id="dcOnline">—</b><span><i class="dot"></i>Online</span></div>
      <div><b id="dcMembers">—</b><span>Members</span></div>
    </div>
    <a class="btn btn-blood" href="${esc(inv)}" target="_blank" rel="noopener">Join Discord</a>`;
  fetch(`https://discord.com/api/v10/invites/${encodeURIComponent(D.invite)}?with_counts=true`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(j => {
      $("#dcOnline").textContent = j.approximate_presence_count ?? "—";
      $("#dcMembers").textContent = j.approximate_member_count ?? "—";
      if (j.guild?.name) $(".dc-sub").textContent = `${j.guild.name} · ${D.text}`;
      if (j.guild?.icon) $(".dc-icon").innerHTML = `<img src="https://cdn.discordapp.com/icons/${j.guild.id}/${j.guild.icon}.png?size=128" alt="">`;
    }).catch(() => $(".dc-stats").remove());

  /* ---------- News ---------- */
  $("#newsTitle").textContent = SITE.news.title;
  // how many news per source (can be set in config.js: news.perSource)
  const per = { itch: 3, patreon: 3, ...(SITE.news.perSource || {}) };
  const all = await loadNews();
  const groups = [
    { key: "itch",    title: "Devlogs · itch.io", link: SITE.socials.find(s => /itch/i.test(s.name))?.url,
      items: all.filter(n => n.source !== "patreon").slice(0, per.itch) },
    { key: "patreon", title: "Patreon · 18+",     link: SITE.support.buttons.find(b => /patreon/i.test(b.name))?.url,
      items: all.filter(n => n.source === "patreon").slice(0, per.patreon) }
  ].filter(g => g.items.length);
  $("#newsList").innerHTML = groups.length ? groups.map(g => `
    <div class="news-group news-group-${g.key}">
      <div class="news-group-head reveal"><h3>${esc(g.title)}</h3>${g.link ? `<a href="${esc(g.link)}" target="_blank" rel="noopener">View all ➜</a>` : ""}</div>
      <div class="news-grid">${g.items.map(newsCard).join("")}</div>
    </div>`).join("")
    : `<p class="empty">No news yet — follow the devlogs on <a href="${esc(SITE.socials[0]?.url)}" target="_blank">itch.io</a>.</p>`;

  observeReveals();
})();
