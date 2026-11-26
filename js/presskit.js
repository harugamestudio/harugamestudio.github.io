/* Press kit page. Data comes from SITE.press and PROJECTS in config.js. */
(() => {
  const P = SITE.press, site = location.origin + location.pathname.replace(/presskit\.html$/, "");
  const contact = P.email ? `<a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`
    : SITE.socials.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join(", ");
  const games = PROJECTS.filter(p => p.available !== false);

  $("#press").innerHTML = `
    <h1>Press Kit</h1>
    <p class="lead">Everything you need to write about or stream our games. Feel free to use these materials.</p>

    <h2 class="reveal">Fact Sheet</h2>
    <div class="fact reveal">
      <table>
        <tr><th>Developer</th><td>${esc(P.developer)}</td></tr>
        <tr><th>Founded</th><td>${esc(P.founded)}</td></tr>
        <tr><th>Team</th><td>${esc(P.teamSize)}</td></tr>
        <tr><th>Website</th><td><a href="${esc(site)}">${esc(site.replace(/^https?:\/\//, ""))}</a></td></tr>
        <tr><th>Contact</th><td>${contact}</td></tr>
        <tr><th>Games</th><td>${games.filter(g => (g.type || "Game") === "Game").map(g => esc(g.title)).join(", ")}</td></tr>
        ${games.some(g => g.type && g.type !== "Game") ? `<tr><th>Tools</th><td>${games.filter(g => g.type && g.type !== "Game").map(g => esc(g.title)).join(", ")}</td></tr>` : ""}
      </table>
      <div>
        <p class="fact-desc">${esc(P.description)}</p>
      </div>
    </div>

    <h2 class="reveal">Logo</h2>
    <div class="logo-dl reveal">
      <div class="logo-prev"><img src="${esc(SITE.logo)}" alt="logo" onerror="this.remove()"></div>
      <div class="press-links">${P.logoFiles.map(f => `<a class="btn" href="${esc(f.url)}" download>${esc(f.name)}</a>`).join("")}</div>
    </div>

    <h2 class="reveal">Projects</h2>
    ${games.map(p => {
      const G = p.page || {};
      return `
      <div class="press-game reveal">
        <h3>${esc(p.title)}</h3>
        <div class="meta"><span class="ver">${esc(p.status)} · ${esc(p.version)}</span><span class="plats">${platBadges(p)}</span>${p.age ? `<span class="badge age">${esc(p.age)}</span>` : ""}</div>
        ${(G.about || [p.description]).map(t => `<p>${esc(t)}</p>`).join("")}
        <div class="press-links">
          ${gamePage(p) ? `<a class="btn" href="${gamePage(p)}">Game Page</a>` : ""}
          ${G.itch ? `<a class="btn" href="${esc(G.itch)}" target="_blank" rel="noopener">Screenshots on itch.io</a>` : ""}
          ${G.trailer ? `<a class="btn" href="https://youtu.be/${esc(G.trailer)}" target="_blank" rel="noopener">Trailer</a>` : ""}
        </div>
      </div>`;
    }).join("")}
  `;
  observeReveals();
})();
