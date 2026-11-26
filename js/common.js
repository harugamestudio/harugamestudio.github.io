/* Shared code for all pages. Normally you don't need to edit this file. */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const IS_HOME = !!document.body.dataset.home;

/* ---------- Icons ---------- */
const ICONS = {
  windows: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.1 10.4 4v7.2H3zM11.3 3.9 21 2.5v8.7h-9.7zM3 12.1h7.4v7.2L3 18.2zM11.3 12.1H21v8.6l-9.7-1.4z"/></svg>`,
  linux: `<svg viewBox="0 0 24 28" fill="currentColor"><path d="M12 1c-2.6 0-4.3 2.1-4.3 5.2 0 1.3.3 2.4-.3 3.7-.8 1.6-2.6 3.4-3.4 5.8-.6 1.8-.4 3.3.3 4.3-.9.6-2.3.9-2.3 2.1 0 1.4 2.2 1.3 3.8 2.3 1.2.8 2.6.8 3.3-.2h4.8c.7 1 2.1 1 3.3.2 1.6-1 3.8-.9 3.8-2.3 0-1.2-1.4-1.5-2.3-2.1.7-1 .9-2.5.3-4.3-.8-2.4-2.6-4.2-3.4-5.8-.6-1.3-.3-2.4-.3-3.7C16.3 3.1 14.6 1 12 1zm-1.6 4.2c.6 0 1 .6 1 1.4 0 .4-.1.7-.3 1l-1.2.4c-.3-.3-.5-.8-.5-1.4 0-.8.4-1.4 1-1.4zm3.2 0c.6 0 1 .6 1 1.4 0 .5-.2 1-.5 1.3-.3-.2-.8-.3-1.2-.4-.2-.2-.3-.6-.3-.9 0-.8.4-1.4 1-1.4zM12 8.4c.9 0 2.6.6 2.6 1.1 0 .4-1.6 1.6-2.6 1.6s-2.6-1.2-2.6-1.6c0-.5 1.7-1.1 2.6-1.1zm-2.9 3.5c.8.6 1.8 1 2.9 1s2.1-.4 2.9-1c1 1.4 2.2 3.4 2.2 5.6 0 1-.2 1.8-.6 2.5-.5-.6-1.4-.8-2.1-.4-.5.3-.6.9-.6 1.5H10c0-.6-.1-1.2-.6-1.5-.7-.4-1.6-.2-2.1.4-.4-.7-.6-1.5-.6-2.5 0-2.2 1.2-4.2 2.4-5.6z"/></svg>`,
  android: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 9h12v8a1.5 1.5 0 0 1-1.5 1.5H15V21a1 1 0 0 1-2 0v-2.5h-2V21a1 1 0 0 1-2 0v-2.5H7.5A1.5 1.5 0 0 1 6 17zM3.5 9a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1zm17 0a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1zM6 8a6 6 0 0 1 3.1-5.2L8.2 1.3a.4.4 0 0 1 .7-.4l.9 1.5a6 6 0 0 1 4.4 0l.9-1.5a.4.4 0 0 1 .7.4l-.9 1.5A6 6 0 0 1 18 8zm3.5-3a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zm5 0a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z"/></svg>`,
  web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.8 6 3.8 9.5s-1.2 6.7-3.8 9.5c-2.6-2.8-3.8-6-3.8-9.5S9.4 5.3 12 2.5z"/></svg>`
};
const OS_NAMES = { windows: "Windows", linux: "Linux", macos: "macOS", android: "Android", web: "Web" };
const osName = k => OS_NAMES[k] || k;
const DL_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M6.5 10.5 12 16l5.5-5.5M4 20h16"/></svg>`;
const platBadges = p => (p.downloads || []).map(d =>
  `<span class="plat" title="${esc(osName(d.platform))}">${ICONS[d.platform] || ""}<em>${esc(osName(d.platform))}</em></span>`).join("");
const OPEN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`;
const isWebOnly = p => (p.downloads || []).length > 0 && p.downloads.every(d => d.platform === "web");
const dlLabel = p => isWebOnly(p) ? `${OPEN_ICON}Open` : `${DL_ICON}Download`;
const fmtDate = d => { const x = new Date(d); return isNaN(x) ? esc(d) : x.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); };
const gamePage = p => p.page && p.id ? `game.html?id=${encodeURIComponent(p.id)}` : "";

/* ---------- Nav, footer, modal (shared markup) ---------- */
(() => {
  const h = IS_HOME ? "" : "index.html";
  const links = [["Projects", `${h}#projects`], ["News", `${h}#news`], ["Community", `${h}#community`], ["About", `${h}#about`], ["Press Kit", "presskit.html"]];
  const nav = document.createElement("nav");
  nav.id = "nav";
  nav.innerHTML = `<a href="${IS_HOME ? "#top" : "index.html"}" class="brand"><img class="brand-logo" alt="${esc(SITE.name)}"></a>
    <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
    <div class="links">${links.map(([n, u]) => `<a href="${u}">${n}</a>`).join("")}</div>`;
  document.body.prepend(nav);
  nav.querySelector(".burger").onclick = () => nav.classList.toggle("open");
  nav.querySelectorAll(".links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const footer = document.createElement("footer");
  footer.innerHTML = `© ${new Date().getFullYear()} ${esc(SITE.name)} · ${esc(SITE.footer)} · <a href="presskit.html">Press Kit</a>`;
  document.body.append(footer);

  const modal = document.createElement("div");
  modal.className = "modal"; modal.id = "modal";
  modal.innerHTML = `<div class="modal-box"><button class="close" aria-label="Close">×</button><h3 id="mTitle"></h3><p id="mSub"></p><div id="mList"></div></div>`;
  document.body.append(modal);

  const atmo = document.createElement("div");
  atmo.innerHTML = `<canvas id="embers"></canvas><div class="fog fog1"></div><div class="fog fog2"></div><div class="vignette"></div>`;
  document.body.prepend(...atmo.children);

  $$(".brand-logo,.hero-logo").forEach(img => {
    img.onerror = () => (img.closest(".sigil") || img).style.display = "none";
    img.src = SITE.logo;
  });
  const onScroll = () => nav.classList.toggle("solid", scrollY > 40 || !IS_HOME);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
})();

/* ---------- Download popup (grouped by platform) ---------- */
const GH_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/></svg>`;
const cmdList = d => [].concat(d.command || []).filter(Boolean);
function openDownload(p) {
  const dls = p.downloads || [];
  if (!dls.length || p.available === false) return;
  const hasCmd = dls.some(d => cmdList(d).length);
  if (!hasCmd && dls.length === 1 && dls[0].mirrors.length === 1) return window.open(dls[0].mirrors[0].url, "_blank", "noopener");
  $("#mTitle").textContent = p.title;
  $("#mSub").textContent = isWebOnly(p) ? "Open in your browser" : "Choose your platform and mirror";
  $("#mList").innerHTML = dls.map(d => `
    <div class="mgroup">
      <h4>${ICONS[d.platform] || ""}${esc(osName(d.platform))}</h4>
      ${cmdList(d).length ? `<div class="cmd-label">Install via terminal</div>
        ${cmdList(d).map(c => `<div class="cmd"><span class="cmd-prompt">$</span><code>${esc(c)}</code><button class="cmd-copy" data-cmd="${esc(c)}" title="Copy">Copy</button></div>`).join("")}` : ""}
      ${(d.mirrors || []).map(m => `<a class="mirror" href="${esc(m.url)}" target="_blank" rel="noopener"><span class="m-name">${/github\.com/i.test(m.url) ? GH_ICON : ""}${esc(m.name)}</span><span>➜</span></a>`).join("")}
    </div>`).join("");
  $("#modal").classList.add("open");
}
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); return true; }
  catch {
    const ta = Object.assign(document.createElement("textarea"), { value: t });
    ta.style.cssText = "position:fixed;opacity:0"; document.body.append(ta); ta.select();
    const ok = document.execCommand("copy"); ta.remove(); return ok;
  }
}
document.addEventListener("click", async e => {
  const b = e.target.closest(".cmd-copy");
  if (!b) return;
  const ok = await copyText(b.dataset.cmd);
  b.textContent = ok ? "Copied ✓" : "Select & copy";
  b.classList.toggle("done", ok);
  setTimeout(() => { b.textContent = "Copy"; b.classList.remove("done"); }, 1800);
});
document.addEventListener("click", e => {
  const b = e.target.closest("[data-dl]");
  if (b && !b.disabled && !b.closest(".locked")) { e.preventDefault(); e.stopPropagation(); openDownload(PROJECTS[b.dataset.dl]); }
});
$("#modal").addEventListener("click", e => { if (e.target.id === "modal" || e.target.closest(".close")) $("#modal").classList.remove("open"); });
document.addEventListener("keydown", e => e.key === "Escape" && $("#modal").classList.remove("open"));

/* ---------- News data (data/news.js, made by GitHub Action) ---------- */
async function loadNews() {
  const auto = (typeof NEWS !== "undefined" && NEWS.items) || [];
  const manual = (SITE.news.manual || []).map(n => ({ project: n.source === "patreon" ? "Patreon" : "", summary: "", ...n }));
  const items = [...auto, ...manual];
  return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
}
const isNew = d => Date.now() - new Date(d) < 14 * 864e5;   // newer than 14 days
const PATREON_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="15" cy="9.5" r="6.5"/><rect x="2.5" y="3" width="3.6" height="18"/></svg>`;
const newsCard = n => n.source === "patreon" ? `
  <a class="news-card news-patreon reveal" href="${esc(n.link)}" target="_blank" rel="noopener">
    <div class="news-body">
      <div class="news-meta"><span class="patreon-tag">${PATREON_ICON}Patreon<i>18+</i></span>${isNew(n.date) ? `<b class="new">New</b>` : ""}<time>${fmtDate(n.date)}</time></div>
      <h4>${esc(n.title)}</h4>
    </div>
  </a>` : `
  <a class="news-card reveal" href="${esc(n.link)}" target="_blank" rel="noopener">
    <div class="news-body">
      <div class="news-meta"><span>${esc(n.project)}${isNew(n.date) ? `<b class="new">New</b>` : ""}</span><time>${fmtDate(n.date)}</time></div>
      <h4>${esc(n.title)}</h4>
      <p>${esc(n.summary)}</p>
    </div>
  </a>`;

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    const el = e.target;
    el.classList.add("in"); io.unobserve(el);
    setTimeout(() => el.style.transitionDelay = "", 1400);
  }
}), { threshold: .12 });
const observeReveals = () => $$(".reveal:not(.in)").forEach(el => io.observe(el));

/* ---------- 3D tilt ---------- */
function enableTilt(sel) {
  if (!matchMedia("(hover:hover)").matches) return;
  $$(sel).forEach(t => {
    t.addEventListener("mousemove", e => {
      const r = t.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      t.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    t.addEventListener("mouseleave", () => t.style.transform = "");
  });
}

/* ---------- Embers / ash particles ---------- */
(() => {
  const cv = $("#embers"), ctx = cv.getContext("2d");
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  let W, H;
  const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
  addEventListener("resize", resize); resize();
  const N = Math.min(90, Math.floor(innerWidth / 14));
  const spawn = init => ({
    x: Math.random() * W, y: init ? Math.random() * H : H + 10,
    r: Math.random() * 2 + .4, vy: Math.random() * .6 + .2, vx: (Math.random() - .5) * .3,
    life: Math.random() * Math.PI * 2, ember: Math.random() < .45
  });
  const parts = Array.from({ length: N }, () => spawn(true));
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
