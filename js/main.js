/* Renders the site from config.js. Normally you don't need to edit this file. */
(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

  /* ---------- Static texts ---------- */
  document.title = SITE.name;
  $(".tagline").textContent = SITE.tagline;
  $(".hero-btn").textContent = SITE.heroButton;
  $("#aboutTitle").textContent = SITE.about.title;
  $("#aboutText").innerHTML = SITE.about.text.map(p => `<p>${esc(p)}</p>`).join("");
  $("#socials").innerHTML = SITE.socials.map(s =>
    `<a class="btn" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join("");
  $("#footer").textContent = `© ${new Date().getFullYear()} ${SITE.name} · ${SITE.footer}`;

  // logo: hide if file is missing
  document.querySelectorAll(".brand-logo,.hero-logo").forEach(img => {
    img.onerror = () => (img.closest(".sigil") || img).style.display = "none";
    img.src = SITE.logo;
  });

  /* ---------- Platform icons ---------- */
  const ICONS = {
    windows: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.1 10.4 4v7.2H3zM11.3 3.9 21 2.5v8.7h-9.7zM3 12.1h7.4v7.2L3 18.2zM11.3 12.1H21v8.6l-9.7-1.4z"/></svg>`,
    linux: `<svg viewBox="0 0 24 28" fill="currentColor"><path d="M12 1c-2.6 0-4.3 2.1-4.3 5.2 0 1.3.3 2.4-.3 3.7-.8 1.6-2.6 3.4-3.4 5.8-.6 1.8-.4 3.3.3 4.3-.9.6-2.3.9-2.3 2.1 0 1.4 2.2 1.3 3.8 2.3 1.2.8 2.6.8 3.3-.2h4.8c.7 1 2.1 1 3.3.2 1.6-1 3.8-.9 3.8-2.3 0-1.2-1.4-1.5-2.3-2.1.7-1 .9-2.5.3-4.3-.8-2.4-2.6-4.2-3.4-5.8-.6-1.3-.3-2.4-.3-3.7C16.3 3.1 14.6 1 12 1zm-1.6 4.2c.6 0 1 .6 1 1.4 0 .4-.1.7-.3 1l-1.2.4c-.3-.3-.5-.8-.5-1.4 0-.8.4-1.4 1-1.4zm3.2 0c.6 0 1 .6 1 1.4 0 .5-.2 1-.5 1.3-.3-.2-.8-.3-1.2-.4-.2-.2-.3-.6-.3-.9 0-.8.4-1.4 1-1.4zM12 8.4c.9 0 2.6.6 2.6 1.1 0 .4-1.6 1.6-2.6 1.6s-2.6-1.2-2.6-1.6c0-.5 1.7-1.1 2.6-1.1zm-2.9 3.5c.8.6 1.8 1 2.9 1s2.1-.4 2.9-1c1 1.4 2.2 3.4 2.2 5.6 0 1-.2 1.8-.6 2.5-.5-.6-1.4-.8-2.1-.4-.5.3-.6.9-.6 1.5H10c0-.6-.1-1.2-.6-1.5-.7-.4-1.6-.2-2.1.4-.4-.7-.6-1.5-.6-2.5 0-2.2 1.2-4.2 2.4-5.6z"/></svg>`
,
    android: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 9h12v8a1.5 1.5 0 0 1-1.5 1.5H15V21a1 1 0 0 1-2 0v-2.5h-2V21a1 1 0 0 1-2 0v-2.5H7.5A1.5 1.5 0 0 1 6 17zM3.5 9a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1zm17 0a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1zM6 8a6 6 0 0 1 3.1-5.2L8.2 1.3a.4.4 0 0 1 .7-.4l.9 1.5a6 6 0 0 1 4.4 0l.9-1.5a.4.4 0 0 1 .7.4l-.9 1.5A6 6 0 0 1 18 8zm3.5-3a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zm5 0a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z"/></svg>`,
    web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.8 6 3.8 9.5s-1.2 6.7-3.8 9.5c-2.6-2.8-3.8-6-3.8-9.5S9.4 5.3 12 2.5z"/></svg>`
  };
  const OS_NAMES = { windows: "Windows", linux: "Linux", macos: "macOS", android: "Android", web: "Web" };
  const osName = k => OS_NAMES[k] || k;
  const DL_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M6.5 10.5 12 16l5.5-5.5M4 20h16"/></svg>`;

  /* ---------- Project tiles ---------- */
  $("#tiles").innerHTML = PROJECTS.map((p, i) => {
    const locked = p.available === false;
    return `
    <article class="tile reveal ${locked ? "locked" : ""}" data-type="${esc(p.type || "")}" style="transition-delay:${i * 0.12}s" ${locked ? 'aria-disabled="true"' : ""}>
      ${locked ? `<div class="lock"><span>✠</span>${esc(p.lockedText || "Coming Soon")}</div>` : ""}
      <div class="placeholder">${esc(p.title[0])}</div>
      ${p.cover ? `<img class="cover" src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy" onerror="this.remove()">` : ""}
      <div class="badges">
        <span class="badge-group">${p.type ? `<span class="badge type">${esc(p.type)}</span>` : ""}<span class="badge">${esc(p.status)}</span></span>
        ${p.age ? `<span class="badge age">${esc(p.age)}</span>` : "<span></span>"}
      </div>
      <div class="tile-info">
        <h3>${esc(p.title)}</h3>
        <div class="meta">
          <span class="ver">${esc(p.version)}</span>
          <span class="plats">${(p.downloads || []).map(d =>
            `<span class="plat" title="${esc(osName(d.platform))}">${ICONS[d.platform] || ""}<em>${esc(osName(d.platform))}</em></span>`).join("")}</span>
        </div>
        <p class="desc">${esc(p.description)}</p>
        <div class="tags">${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        ${(p.downloads || []).length ? `<div class="dl">
          <button class="btn btn-blood" data-p="${i}" ${locked ? "disabled tabindex=\"-1\"" : ""}>${DL_ICON}Download</button>
        </div>` : ""}
      </div>
    </article>`;
  }).join("");

  /* ---------- Type filter (only if 2+ types) ---------- */
  const types = [...new Set(PROJECTS.map(p => p.type).filter(Boolean))];
  const fBox = $("#filters");
  if (types.length > 1) {
    fBox.innerHTML = ["All", ...types].map((t, i) =>
      `<button class="chip ${i === 0 ? "on" : ""}" data-f="${esc(t)}">${esc(t)}${i ? "s" : ""}</button>`).join("");
    fBox.addEventListener("click", e => {
      const c = e.target.closest(".chip"); if (!c) return;
      fBox.querySelectorAll(".chip").forEach(x => x.classList.toggle("on", x === c));
      document.querySelectorAll(".tile").forEach(t =>
        t.classList.toggle("hidden", c.dataset.f !== "All" && t.dataset.type !== c.dataset.f));
    });
  } else fBox.remove();

  /* ---------- Download popup (grouped by platform) ---------- */
  const modal = $("#modal");
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-p]");
    if (!b || b.disabled || b.closest(".locked")) return;
    const p = PROJECTS[b.dataset.p], dls = p.downloads || [];
    // only one platform with one mirror -> open directly
    if (dls.length === 1 && dls[0].mirrors.length === 1) return window.open(dls[0].mirrors[0].url, "_blank", "noopener");
    $("#mTitle").textContent = p.title;
    $("#mSub").textContent = "Choose your platform and mirror";
    $("#mList").innerHTML = dls.map(d => `
      <div class="mgroup">
        <h4>${ICONS[d.platform] || ""}${esc(osName(d.platform))}</h4>
        ${d.mirrors.map(m =>
          `<a class="mirror" href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.name)}<span>➜</span></a>`).join("")}
      </div>`).join("");
    modal.classList.add("open");
  });
  const close = () => modal.classList.remove("open");
  modal.addEventListener("click", e => { if (e.target === modal || e.target.closest(".close")) close(); });
  document.addEventListener("keydown", e => e.key === "Escape" && close());

  /* ---------- 3D tilt on tiles ---------- */
  if (matchMedia("(hover:hover)").matches) {
    document.querySelectorAll(".tile:not(.locked)").forEach(t => {
      t.addEventListener("mousemove", e => {
        const r = t.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        t.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      t.addEventListener("mouseleave", () => t.style.transform = "");
    });
  }

  /* ---------- Scroll reveal + nav ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      el.classList.add("in"); io.unobserve(el);
      // clear stagger delay after reveal so hover/tilt reacts instantly
      setTimeout(() => el.style.transitionDelay = "", 1400);
    }
  }), { threshold: .15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Embers / ash particles ---------- */
  const cv = $("#embers"), ctx = cv.getContext("2d");
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  let W, H, parts = [];
  const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
  addEventListener("resize", resize); resize();
  const N = Math.min(90, Math.floor(innerWidth / 14));
  const spawn = (init) => ({
    x: Math.random() * W, y: init ? Math.random() * H : H + 10,
    r: Math.random() * 2 + .4, vy: Math.random() * .6 + .2, vx: (Math.random() - .5) * .3,
    life: Math.random() * Math.PI * 2, ember: Math.random() < .45
  });
  for (let i = 0; i < N; i++) parts.push(spawn(true));
  (function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.life += .02; p.y -= p.vy; p.x += p.vx + Math.sin(p.life) * .3;
      if (p.y < -10) Object.assign(p, spawn(false));
      const a = .35 + Math.sin(p.life * 2) * .3;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      if (p.ember) { ctx.fillStyle = `rgba(255,${70 + p.r * 30 | 0},40,${a})`; ctx.shadowColor = "#ff3b1f"; ctx.shadowBlur = 8; }
      else { ctx.fillStyle = `rgba(200,190,180,${a * .5})`; ctx.shadowBlur = 0; }
      ctx.fill();
    }
    requestAnimationFrame(tick);
  })();
})();
