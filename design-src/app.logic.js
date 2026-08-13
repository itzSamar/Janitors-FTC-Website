
class Component extends DCLogic {
  state = { page: "home", sub: 0, booting: false };
  buildLog() { return (window.TEAM && window.TEAM.buildLog) || []; }
  matchResults() { return (window.TEAM && window.TEAM.matches) || []; }
  routeSteps() { return (window.TEAM && window.TEAM.routeSteps) || []; }
  pageSequence() { return ["home", "robot", "season", "outreach", "sponsors", "team", "portfolio", "join"]; }
  goToPage(p) {
    if (p === this.state.page) { this.scrollToTop(); return; }
    const ord = this.pageSequence();
    const from = ord.indexOf(this.state.page || "home");
    const to = ord.indexOf(p);
    const back = to > -1 && from > -1 && to < from;
    if (typeof window === "undefined") {
      this.setState({ page: p });
      return;
    }
    if (this.swapTimer) clearTimeout(this.swapTimer);
    if (this.wipeTimer) clearTimeout(this.wipeTimer);
    if (this.scrambleTimer) clearTimeout(this.scrambleTimer);
    this.playMopWipe(back);
    this.swapTimer = setTimeout(() => {
      this.setState({ page: p });
      this.jumpTo(0);
      setTimeout(() => { this.clearCache(); if (this.scanReveals) this.scanReveals(); this.drawBot(); this.drawRoute(); }, 30);
    }, 420);
    this.scrambleTimer = setTimeout(() => this.scrambleText(), 780);
  }
  playMopWipe(back) {
    if (typeof document === "undefined") return;
    const prev = document.getElementById("jl-mop-wipe");
    if (prev) prev.remove();
    const finishName = (() => {
      try {
        const finishes = { "Blackout": 1, "Lab Grey": 1 };
        const defaultFinish = finishes[this.props.finish] ? this.props.finish : "Blackout";
        return this.state.noir ? (defaultFinish === "Blackout" ? "Lab Grey" : "Blackout") : defaultFinish;
      } catch (e) { return "Blackout"; }
    })();
    const accent = (this.props && this.props.accentColor) || "#22D3EE";
    // Match page bg — never flash white/cream
    const veil = finishName === "Lab Grey" ? "#DBDBD5" : "#07090A";
    const figure = finishName === "Lab Grey" ? "#11161A" : "#E9F6F8";
    const figureMute = finishName === "Lab Grey" ? "rgba(17,22,26,.55)" : "rgba(233,246,248,.45)";
    const edgeGlow = back
      ? "linear-gradient(90deg, transparent 0%, " + accent + "00 40%, " + accent + "55 100%)"
      : "linear-gradient(90deg, " + accent + "55 0%, " + accent + "00 60%, transparent 100%)";
    const flip = back ? "scaleX(-1)" : "none";
    const host = document.createElement("div");
    host.id = "jl-mop-wipe";
    host.setAttribute("aria-hidden", "true");
    host.style.cssText = "position:fixed;inset:0;z-index:90;pointer-events:none;overflow:hidden;";
    host.innerHTML = `
      <div class="${back ? "jl-wipe-back" : "jl-wipe-fwd"}" style="position:absolute;top:0;bottom:0;left:0;width:128%;">
        <div style="display:flex;height:100%;width:100%;flex-direction:${back ? "row-reverse" : "row"};">
          <div style="flex:1 1 auto;height:100%;background:${veil};"></div>
          <div style="position:relative;flex:0 0 0;width:0;height:100%;">
            <div style="position:absolute;top:0;bottom:0;${back ? "left:0;" : "right:0;transform:translateX(-100%);"}width:72px;background:${edgeGlow};pointer-events:none;"></div>
            <div style="position:absolute;top:-4%;bottom:-4%;left:0;width:2px;transform:translateX(-50%);background:${accent};box-shadow:0 0 12px ${accent};animation:mopWet .35s ease-in-out infinite;"></div>
            <div style="position:absolute;left:0;bottom:12%;transform:translate(-58%,0) ${flip};width:78px;height:110px;animation:jlRun .28s ease-in-out infinite;">
              <svg viewBox="0 0 78 110" width="78" height="110" style="display:block;overflow:visible;">
                <g fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <g style="transform-origin:36px 18px;animation:jlMop .28s ease-in-out infinite;">
                    <line x1="58" y1="8" x2="22" y2="62" stroke="${figure}" stroke-width="3.2"></line>
                    <path d="M10 58 L34 54 L38 72 Q22 78 12 74 Q6 71 8 64 Z" fill="${figure}" stroke="${figureMute}" stroke-width="1"></path>
                    <g stroke="${figureMute}" stroke-width="1.4">
                      <path d="M14 70 Q12 86 11 96"></path>
                      <path d="M20 72 Q20 88 20 98"></path>
                      <path d="M26 71 Q28 87 30 97"></path>
                    </g>
                    <circle cx="58" cy="8" r="2.2" fill="${accent}"></circle>
                  </g>
                  <circle cx="36" cy="22" r="7" fill="${figure}"></circle>
                  <path d="M36 29 L36 52" stroke="${figure}" stroke-width="4.5"></path>
                  <path d="M36 34 L22 48" stroke="${figure}" stroke-width="3.2"></path>
                  <path d="M36 36 L48 44" stroke="${figure}" stroke-width="3.2"></path>
                  <g style="transform-origin:36px 52px;animation:jlLegL .28s ease-in-out infinite;">
                    <path d="M36 52 L28 78" stroke="${figure}" stroke-width="3.4"></path>
                    <path d="M28 78 L22 78" stroke="${figure}" stroke-width="3"></path>
                  </g>
                  <g style="transform-origin:36px 52px;animation:jlLegR .28s ease-in-out infinite;">
                    <path d="M36 52 L46 78" stroke="${figure}" stroke-width="3.4"></path>
                    <path d="M46 78 L54 78" stroke="${figure}" stroke-width="3"></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(host);
    this.wipeTimer = setTimeout(() => { if (host.parentNode) host.remove(); }, 1000);
  }
  componentDidMount() {
    if (typeof window !== "undefined" && !window.janitorsBootShown) {
      window.janitorsBootShown = true;
      this.startBootSequence();
    }
    this.initialize();
  }
  initialize() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;
    this.handleScroll = () => { this.scrollDirty = true; };
    this.handleResize = () => { this.scrollDirty = true; this.measureNav(); };
    this.measureNav();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.handleResize);
    this.secondTimer = setInterval(() => { const p = this.state.page; if (p === "season" || p === "home") this.setState({ now: Date.now() }); }, 1000);
    if (!this.state.now) this.setState({ now: Date.now() });
    this.scrollDirty = true; this.plateOffsetY = 0; this.plateOffsetX = 0;
    this.renderLoop = () => {
      try { this.updateFrame(); } catch (e) {}
      this.frameId = requestAnimationFrame(this.renderLoop);
    };
    this.frameId = requestAnimationFrame(this.renderLoop);
    setTimeout(() => { this.clearCache(); this.setupReveals(); this.scrambleText(); this.setupDriving(); this.drawRoute(); }, 140);
    this.viewer = { rx: -16, ry: -28, dragging: false, lx: 0, ly: 0 };
    this.handleViewerMove = (e) => { if (!this.viewer.dragging) return; const x = e.touches ? e.touches[0].clientX : e.clientX; const y = e.touches ? e.touches[0].clientY : e.clientY; this.viewer.ry += (x - this.viewer.lx) * 0.55; this.viewer.rx = Math.max(-82, Math.min(82, this.viewer.rx - (y - this.viewer.ly) * 0.4)); this.viewer.lx = x; this.viewer.ly = y; this.applyViewerRotation(); };
    this.handleViewerRelease = () => { this.viewer.dragging = false; };
    this.pointerNormX = 0; this.pointerNormY = 0; this.pointerX = 0; this.pointerY = 0;
    this.handlePointerMove = (e) => {
      const w = window.innerWidth || 1, h = window.innerHeight || 1;
      this.pointerNormX = (e.clientX / w - 0.5) * 2; this.pointerNormY = (e.clientY / h - 0.5) * 2;
      this.pointerX = e.clientX; this.pointerY = e.clientY; this.pointerDirty = true;
    };
    window.addEventListener("mousemove", this.handlePointerMove, { passive: true });
    window.addEventListener("mousemove", this.handleViewerMove); window.addEventListener("mouseup", this.handleViewerRelease);
    window.addEventListener("touchmove", this.handleViewerMove, { passive: true }); window.addEventListener("touchend", this.handleViewerRelease);

    this.compareBox = false;
    this.setComparePosition = (e, box) => {
      const r = box.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const pct = Math.max(0, Math.min(100, (x / r.width) * 100));
      const top = box.querySelector("[data-compare-top]");
      const handle = box.querySelector("[data-compare-handle]");
      if (top) top.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      if (handle) handle.style.left = pct + "%";
    };
    this.handleCompareDown = (e) => {
      const box = e.target && e.target.closest ? e.target.closest("[data-compare]") : null;
      if (!box) return;
      this.compareBox = box; this.setComparePosition(e, box);
    };
    this.handleCompareMove = (e) => { if (this.compareBox) this.setComparePosition(e, this.compareBox); };
    this.handleCompareUp = () => { this.compareBox = false; };
    this.handleClickSound = (e) => {
      const el = e.target && e.target.closest ? e.target.closest("[data-click]") : null;
      if (el) this.playClick(el.getAttribute("data-click") === "up" ? "up" : "down");
    };
    document.addEventListener("pointerdown", this.handleClickSound);

    this.handleOutsideClick = (e) => {
      if (!this.state.menuOpen) return;
      const el = e.target && e.target.closest ? e.target.closest("[data-menu]") : null;
      if (!el) this.setState({ menuOpen: false });
    };
    document.addEventListener("pointerdown", this.handleOutsideClick);

    document.addEventListener("mousedown", this.handleCompareDown);
    document.addEventListener("mousemove", this.handleCompareMove);
    document.addEventListener("mouseup", this.handleCompareUp);
    document.addEventListener("touchstart", this.handleCompareDown, { passive: true });
    document.addEventListener("touchmove", this.handleCompareMove, { passive: true });
    document.addEventListener("touchend", this.handleCompareUp);
  }
  componentWillUnmount() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    if (this.secondTimer) clearInterval(this.secondTimer);
    if (this.handleScroll) { window.removeEventListener("scroll", this.handleScroll); window.removeEventListener("resize", this.handleResize); }
    if (this.matchTimer) clearInterval(this.matchTimer);
    if (this.handleOutsideClick) document.removeEventListener("pointerdown", this.handleOutsideClick);
    if (this.handleClickSound) document.removeEventListener("pointerdown", this.handleClickSound);
    if (this.handlePointerMove) window.removeEventListener("mousemove", this.handlePointerMove);
    if (this.handleCompareDown) { document.removeEventListener("mousedown", this.handleCompareDown); document.removeEventListener("mousemove", this.handleCompareMove); document.removeEventListener("mouseup", this.handleCompareUp); }
  }
  applyViewerRotation() { const el = document.getElementById("viewer-model"); if (el && this.viewer) el.style.transform = "rotateX(" + this.viewer.rx + "deg) rotateY(" + this.viewer.ry + "deg)"; }
  startViewerDrag(e) { if (!this.viewer) this.viewer = { rx: -16, ry: -28, dragging: false, lx: 0, ly: 0 }; this.viewer.dragging = true; this.viewer.lx = e.touches ? e.touches[0].clientX : e.clientX; this.viewer.ly = e.touches ? e.touches[0].clientY : e.clientY; }
  scrambleText() {
    const els = document.querySelectorAll("[data-scramble]");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";
    els.forEach((el) => {
      if (el.scrambleTimer || el.scrambleDone) return;
      if (el.originalHtml === undefined) el.originalHtml = el.innerHTML;
      el.innerHTML = el.originalHtml;
      el.style.visibility = "visible";
      const nodes = [];
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      let node;
      while ((node = walk.nextNode())) nodes.push({ node: node, text: node.nodeValue });
      if (!nodes.length) return;
      let frame = 0;
      const total = 12;
      const started = Date.now();
      el.scrambleTimer = setInterval(() => {
        frame++;
        const churn = 1 - frame / total;
        if (frame >= total || Date.now() - started > 900) {
          clearInterval(el.scrambleTimer);
          el.scrambleTimer = null;
          el.scrambleDone = true;
          el.innerHTML = el.originalHtml;
          return;
        }
        for (let k = 0; k < nodes.length; k++) {
          const src = nodes[k].text;
          let out = "";
          for (let i = 0; i < src.length; i++) {
            const c = src[i];
            const noisy = c !== " " && c !== "\n" && Math.random() < churn * 0.45;
            out += noisy ? chars[Math.floor(Math.random() * chars.length)].toLowerCase() : c;
          }
          nodes[k].node.nodeValue = out;
        }
      }, 32);
    });
  }
  setupReveals() {
    if (typeof IntersectionObserver === "undefined") return;
    if (!this.revealObserver) {
      this.revealObserver = new IntersectionObserver((ents) => { ents.forEach((en) => { if (en.isIntersecting) { en.target.style.opacity = "1"; en.target.style.transform = "none"; this.revealObserver.unobserve(en.target); } }); }, { threshold: 0.04, rootMargin: "0px 0px -6% 0px" });
    }
    if (!this.counterObserver) {
      this.counterObserver = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target; this.counterObserver.unobserve(el);
          if (el.hasAttribute("data-fill")) { const w = el.getAttribute("data-fill"); el.style.width = "0%"; setTimeout(() => { el.style.width = w + "%"; }, 40); return; }
          const target = parseFloat(el.getAttribute("data-count")) || 0;
          const suffix = el.getAttribute("data-suffix") || "";
          const start = performance.now(); const dur = 850;
          const step = (now) => {
            const p = Math.min(1, (now - start) / dur);
            const e = 1 - Math.pow(1 - p, 3);
            const v = Math.round(target * e);
            const group = target >= 1000 && !el.hasAttribute("data-plain");
            el.textContent = (group ? v.toLocaleString() : String(v)) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.3 });
    }
    if (!this.maskObserver) {
      this.maskObserver = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (!en.isIntersecting) return;
          this.maskObserver.unobserve(en.target);
          const inner = en.target.firstElementChild;
          if (inner) inner.style.transform = "none";
        });
      }, { threshold: 0.2 });
    }
    if (!this.staggerObserver) {
      this.staggerObserver = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (!en.isIntersecting) return;
          this.staggerObserver.unobserve(en.target);
          const kind = en.target.getAttribute("data-stagger") || "up";
          const name = kind === "left" ? "slideL" : kind === "right" ? "slideR" : kind === "zoom" ? "zoomIn" : "rise";
          const dur = kind === "left" ? ".72s" : ".6s";
          Array.prototype.forEach.call(en.target.children, (c, i) => {
            c.style.animation = name + " " + dur + " cubic-bezier(.16,.84,.24,1) " + (i * 95) + "ms both";
          });
        });
      }, { threshold: 0.12 });
    }
    this.scanReveals = () => {
      const root = document.querySelector("[data-pagewrap]"); if (!root) return;
      root.querySelectorAll("section").forEach((s) => {
        if (s.getAttribute("data-rev")) return;
        s.setAttribute("data-rev", "1");
        const r = s.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) { s.style.opacity = "1"; s.style.transform = "none"; return; }
        s.style.opacity = "0"; s.style.transform = "translateY(26px)";
        s.style.transition = "opacity .8s cubic-bezier(.2,.75,.25,1), transform .8s cubic-bezier(.2,.75,.25,1)";
        this.revealObserver.observe(s);
        setTimeout(() => { if (getComputedStyle(s).opacity === "0") { s.style.opacity = "1"; s.style.transform = "none"; } }, 2400);
      });
      document.querySelectorAll("[data-count],[data-fill]").forEach((el) => { if (el.getAttribute("data-armed")) return; el.setAttribute("data-armed", "1"); this.counterObserver.observe(el); });
      document.querySelectorAll("[data-mask]").forEach((h) => {
        if (h.getAttribute("data-armed")) return;
        h.setAttribute("data-armed", "1");
        h.style.overflow = "hidden";
        const inner = document.createElement("span");
        inner.style.display = "block";
        inner.style.transform = "translateY(105%)";
        inner.style.transition = "transform .78s cubic-bezier(.16,.84,.24,1)";
        while (h.firstChild) inner.appendChild(h.firstChild);
        h.appendChild(inner);
        this.maskObserver.observe(h);
      });
      document.querySelectorAll("[data-stagger]").forEach((g) => { if (g.getAttribute("data-armed")) return; g.setAttribute("data-armed", "1"); this.staggerObserver.observe(g); });
    };
    this.scanReveals();
  }
  updateFrame() {
    if (this.scrollDirty) {
      this.scrollDirty = false;
      const se = document.scrollingElement || document.documentElement;
      const top = se.scrollTop || window.pageYOffset || 0;
      const max = (se.scrollHeight - window.innerHeight) || 1;
      this.scrollProgress = Math.min(1, Math.max(0, top / max));
      this.scrollOffset = top;
      const bar = this.barEl || (this.barEl = document.getElementById("scroll-bar"));
      if (bar) bar.style.width = (this.scrollProgress * 100).toFixed(2) + "%";
      const pl = this.percentEl || (this.percentEl = document.getElementById("scroll-percent"));
      if (pl) { const s = String(Math.round(this.scrollProgress * 100)).padStart(3, "0") + "%"; if (pl.textContent !== s) pl.textContent = s; }
    }
    const plate = this.plateEl || (this.plateEl = document.querySelector("[data-plate]"));
    if (plate) {
      const tx = (this.pointerNormX || 0) * 10;
      const ty = -(this.scrollOffset || 0) * 0.055 + (this.pointerNormY || 0) * 7;
      this.plateOffsetX += (tx - this.plateOffsetX) * 0.09;
      this.plateOffsetY += (ty - this.plateOffsetY) * 0.09;
      plate.style.transform = "translate3d(" + this.plateOffsetX.toFixed(2) + "px," + this.plateOffsetY.toFixed(2) + "px,0)";
    }
    const track = this.trackEl || (this.trackEl = document.querySelector("[data-track]"));
    if (track) {
      const r = track.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 0;
      const raw = Math.min(1, p * 1.18);
      if (window.janitorsSwept === undefined || raw > window.janitorsSwept) window.janitorsSwept = raw;
      const swept = 0.045 + window.janitorsSwept * 0.955;
      const wipe = this.wipeEl || (this.wipeEl = document.querySelector("[data-wipe]"));
      if (wipe) wipe.style.clipPath = "inset(0 " + ((1 - swept) * 100).toFixed(2) + "% 0 0)";
      const sweep = this.sweepEl || (this.sweepEl = document.querySelector("[data-sweep]"));
      if (sweep) { sweep.style.left = (swept * 100).toFixed(2) + "%"; sweep.style.opacity = swept > 0.995 ? "0" : "1"; }
      const readout = this.sweptEl || (this.sweptEl = document.querySelector("[data-swept]"));
      if (readout) { const s = "swept " + String(Math.round(swept * 100)).padStart(3, "0") + "%"; if (readout.textContent !== s) readout.textContent = s; }
      const dust = this.speckEls || (this.speckEls = document.querySelectorAll("[data-speck]"));
      for (let i = 0; i < dust.length; i++) {
        const at = parseFloat(dust[i].getAttribute("data-speck"));
        const gone = swept > at;
        dust[i].style.opacity = gone ? "0" : ".5";
        dust[i].style.transform = gone ? "translate(14px,-8px)" : "none";
      }
    }
    const rb = this.viewerEl || (this.viewerEl = document.getElementById("viewer-model"));
    if (rb && this.viewer && !this.viewer.dragging) { this.viewer.ry += 0.14; this.applyViewerRotation(); }
    this.stepDriving();
    this.applyParallax();
    if (this.pointerDirty) {
      this.pointerDirty = false;
      this.applyMagnet();
      this.applyTilt();
    }
  }
  applyExploded() {
    const on = !!this.state.exploded;
    const els = document.querySelectorAll("[data-ex]");
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (el.baseTransform === undefined) el.baseTransform = el.style.transform || "";
      el.style.transition = "transform .7s cubic-bezier(.2,.8,.25,1)";
      el.style.transform = on ? "translate3d(" + el.getAttribute("data-ex") + ") " + el.baseTransform : el.baseTransform;
    }
  }
  maxScroll() {
    const se = document.scrollingElement || document.documentElement;
    return Math.max(0, se.scrollHeight - window.innerHeight);
  }
  jumpTo(y) {
    const se = document.scrollingElement || document.documentElement;
    se.scrollTop = y;
  }
  setupDriving() {
    if (this.drivingReady || typeof window === "undefined") return;
    this.drivingReady = true;
    this.bot = { x: 0, y: 0, h: 0, vx: 0, vy: 0, vh: 0 };
    this.heldKeys = {};
    const track = (down) => (e) => {
      const f = document.querySelector("[data-field]");
      if (!f || document.activeElement !== f) return;
      const k = e.key;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Shift"].indexOf(k) < 0) return;
      e.preventDefault();
      this.heldKeys[k] = down;
    };
    this.handleDriveKeyDown = track(true);
    this.handleDriveKeyUp = track(false);
    window.addEventListener("keydown", this.handleDriveKeyDown);
    window.addEventListener("keyup", this.handleDriveKeyUp);
    window.addEventListener("blur", () => { this.heldKeys = {}; });
  }
  stepDriving() {
    const b = this.bot, k = this.heldKeys;
    if (!b || !k) return;
    const held = k.ArrowUp || k.ArrowDown || k.ArrowLeft || k.ArrowRight;
    const moving = held || Math.abs(b.vx) > 0.01 || Math.abs(b.vy) > 0.01 || Math.abs(b.vh) > 0.01;
    if (!moving) return;
    const ACC = 0.62, MAX = 3.1, FRIC = 0.885, TACC = 0.34, TMAX = 2.6, TFRIC = 0.87;
    const spin = k.Shift && (k.ArrowLeft || k.ArrowRight);
    if (spin) b.vh += (k.ArrowLeft ? -TACC : TACC);
    else {
      const fwd = (k.ArrowUp ? -1 : 0) + (k.ArrowDown ? 1 : 0);
      const str = (k.ArrowLeft ? -1 : 0) + (k.ArrowRight ? 1 : 0);
      if (fwd || str) {
        const r = b.h * Math.PI / 180;
        const len = Math.sqrt(fwd * fwd + str * str) || 1;
        const nf = fwd / len, ns = str / len;
        b.vx += (ns * Math.cos(r) - nf * Math.sin(r)) * ACC;
        b.vy += (ns * Math.sin(r) + nf * Math.cos(r)) * ACC;
      }
    }
    b.vh *= TFRIC; b.vx *= FRIC; b.vy *= FRIC;
    const sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
    if (sp > MAX) { b.vx = b.vx / sp * MAX; b.vy = b.vy / sp * MAX; }
    b.vh = Math.max(-TMAX, Math.min(TMAX, b.vh));
    if (Math.abs(b.vx) < 0.01) b.vx = 0;
    if (Math.abs(b.vy) < 0.01) b.vy = 0;
    if (Math.abs(b.vh) < 0.01) b.vh = 0;
    b.h += b.vh;
    b.x += b.vx; b.y += b.vy;
    if (b.x < -158) { b.x = -158; b.vx *= -0.32; }
    if (b.x > 158) { b.x = 158; b.vx *= -0.32; }
    if (b.y < -158) { b.y = -158; b.vy *= -0.32; }
    if (b.y > 158) { b.y = 158; b.vy *= -0.32; }
    this.drawBot();
  }
  drawBot() {
    const b = this.bot; if (!b) return;
    const g = document.getElementById("sim-robot");
    if (g) g.style.transform = "translate(" + b.x.toFixed(2) + "px," + b.y.toFixed(2) + "px) rotate(" + b.h.toFixed(2) + "deg)";
    const px = document.getElementById("sim-x"), py = document.getElementById("sim-y"), ph = document.getElementById("sim-heading");
    if (px) px.textContent = (b.x / 100).toFixed(2) + " m";
    if (py) py.textContent = (-b.y / 100).toFixed(2) + " m";
    if (ph) ph.textContent = (((b.h % 360) + 360) % 360).toFixed(0) + "\u00B0";
  }
  drawRoute() {
    const path = document.getElementById("route-path");
    const bot = document.getElementById("route-robot");
    if (!path || !bot || !path.getTotalLength) return;
    const p = (this.state.autoPos || 0) / 1000;
    const L = path.getTotalLength();
    const pt = path.getPointAtLength(L * p);
    const ahead = path.getPointAtLength(Math.min(L, L * p + 6));
    const ang = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180 / Math.PI + 90;
    bot.setAttribute("transform", "translate(" + pt.x.toFixed(1) + "," + pt.y.toFixed(1) + ") rotate(" + ang.toFixed(1) + ")");
  }
  toggleRoutePlayback() {
    if (this.routeTimer) { clearInterval(this.routeTimer); this.routeTimer = null; this.forceUpdate(); return; }
    if ((this.state.autoPos || 0) >= 1000) this.setState({ autoPos: 0 });
    this.routeTimer = setInterval(() => {
      const next = (this.state.autoPos || 0) + 8;
      if (next >= 1000) { clearInterval(this.routeTimer); this.routeTimer = null; this.setState({ autoPos: 1000 }); }
      else this.setState({ autoPos: next });
      this.drawRoute();
    }, 40);
    this.forceUpdate();
  }
  applyParallax() {
    const els = this.parallaxEls || (this.parallaxEls = document.querySelectorAll("[data-lag]"));
    const vh = window.innerHeight || 1;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      const r = el.getBoundingClientRect();
      if (!r.height || r.bottom < -400 || r.top > vh + 400) continue;
      const strength = parseFloat(el.getAttribute("data-lag")) || 0.05;
      const target = ((r.top + r.height / 2) - vh / 2) * strength;
      if (el.parallaxOffset === undefined) { el.parallaxOffset = target; el.parallaxVelocity = 0; }
      el.parallaxVelocity = (el.parallaxVelocity || 0) * 0.72 + (target - el.parallaxOffset) * 0.055;
      el.parallaxOffset += el.parallaxVelocity;
      if (Math.abs(target - el.parallaxOffset) < 0.04 && Math.abs(el.parallaxVelocity) < 0.04) { el.parallaxOffset = target; el.parallaxVelocity = 0; }
      el.style.transform = "translate3d(0," + el.parallaxOffset.toFixed(2) + "px,0)";
    }
  }
  playClick(kind) {
    if (this.state.sound === false) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = this.audio || (this.audio = new AC());
      if (ctx.state === "suspended") ctx.resume();
      const t = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(kind === "up" ? 880 : 1240, t);
      o.frequency.exponentialRampToValueAtTime(kind === "up" ? 660 : 420, t + 0.05);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.06, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.075);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + 0.09);
    } catch (e) {}
  }
  applyMagnet() {
    const els = this.magnetEls || (this.magnetEls = document.querySelectorAll("[data-magnet]"));
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      const r = el.getBoundingClientRect();
      if (!r.width) continue;
      const dx = this.pointerX - (r.left + r.width / 2), dy = this.pointerY - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) * 0.9 + 70;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < reach) {
        const pull = (1 - dist / reach) * 0.38;
        el.style.transition = "transform .25s cubic-bezier(.2,.8,.3,1)";
        el.style.transform = "translate3d(" + (dx * pull).toFixed(1) + "px," + (dy * pull * 0.65).toFixed(1) + "px,0)";
      } else if (el.style.transform) {
        el.style.transition = "transform .6s cubic-bezier(.2,1.1,.3,1)";
        el.style.transform = "";
      }
    }
  }
  applyTilt() {
    const els = this.tiltEls || (this.tiltEls = document.querySelectorAll("[data-tilt]"));
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      const r = el.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > window.innerHeight) continue;
      const inside = this.pointerX >= r.left && this.pointerX <= r.right && this.pointerY >= r.top && this.pointerY <= r.bottom;
      if (inside) {
        const px = (this.pointerX - r.left) / r.width - 0.5;
        const py = (this.pointerY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(1000px) rotateY(" + (px * 6).toFixed(2) + "deg) rotateX(" + (-py * 6).toFixed(2) + "deg) translateY(-2px)";
      } else if (el.style.transform) {
        el.style.transform = "";
      }
    }
  }
  measureNav() {
    const nav = document.querySelector("nav");
    if (nav) document.documentElement.style.setProperty("--navh", Math.round(nav.getBoundingClientRect().height) + "px");
  }
  clearCache() { this.measureNav(); this.scrollDirty = true; this.barEl = null; this.percentEl = null; this.plateEl = null; this.trackEl = null; this.viewerEl = null; this.wipeEl = null; this.sweepEl = null; this.sweptEl = null; this.speckEls = null; this.magnetEls = null; this.tiltEls = null; this.parallaxEls = null; }
  sortBy(k) {
    const cur = this.state.sortKey;
    this.setState({ sortKey: k, sortDir: cur === k ? -(this.state.sortDir || 1) : 1 });
  }
  startBootSequence() {
    if (this.bootTimer) clearTimeout(this.bootTimer);
    if (this.bootInterval) clearInterval(this.bootInterval);
    this.setState({ booting: true });
    this.bootTimer = setTimeout(() => this.setState({ booting: false }), 5600);
  }
  toggleMatchClock() {
    if (this.matchTimer) { clearInterval(this.matchTimer); this.matchTimer = null; this.setState({ t: null }); return; }
    this.setState({ t: 150 });
    this.matchTimer = setInterval(() => {
      const t = (this.state.t || 0) - 1;
      if (t <= 0) { clearInterval(this.matchTimer); this.matchTimer = null; this.setState({ t: 0 }); return; }
      this.setState({ t: t });
    }, 1000);
  }
  scrollToTop() {
    const se = document.scrollingElement || document.documentElement;
    (se.scrollTo ? se : window).scrollTo({ top: 0, behavior: "smooth" });
  }
  renderVals() {
    this.initialize();
    const finishes = {
      "Blackout": { bg: "#07090A", panel: "#0D1214", key: "#141A1D", keytop: "#1B2327", rule: "rgba(255,255,255,.13)", text: "#E9F6F8", muted: "#7A8B90", ink: "#04080A", edge: "rgba(0,0,0,.7)" },
      "Lab Grey": { bg: "#DBDBD5", panel: "#E6E6E0", key: "#EDEDE7", keytop: "#F4F4EF", rule: "rgba(0,0,0,.2)", text: "#11161A", muted: "#5C6669", ink: "#0A0F11", edge: "rgba(0,0,0,.32)" },
    };
    const defaultFinish = finishes[this.props.finish] ? this.props.finish : "Blackout";
    const finishName = this.state.noir ? (defaultFinish === "Blackout" ? "Lab Grey" : "Blackout") : defaultFinish;
    const theme = finishes[finishName];
    const accent = this.props.accentColor || "#22D3EE";
    const rootStyle = {
      "--bg": theme.bg, "--signal": this.props.signalColor || "#F2A93B", "--panel": theme.panel, "--key": theme.key, "--keytop": theme.keytop, "--rule": theme.rule,
      "--text": theme.text, "--muted": theme.muted, "--accent": accent, "--ink": theme.ink, "--edge": theme.edge,
      background: theme.bg, color: theme.text, position: "relative", minHeight: "100vh",
      overflowX: "clip", maxWidth: "1720px", margin: "0 auto",
    };
    const page = this.state.page || "home";
    const nav = (p) => () => this.goToPage(p);
    const key = (p) => ({
      position: "relative", display: "inline-flex", alignItems: "center", padding: "10px 2px",
      fontSize: "clamp(14px,1.35vw,17px)", fontWeight: 500, letterSpacing: "-.01em",
      whiteSpace: "nowrap", flexShrink: 0, lineHeight: 1,
      backgroundImage: "linear-gradient(" + accent + "," + accent + ")",
      backgroundRepeat: "no-repeat", backgroundPosition: "0 100%",
      backgroundSize: page === p ? "100% 2px" : "0% 2px",
      color: page === p ? theme.text : theme.muted,
      transition: "color .2s ease, background-size .34s cubic-bezier(.2,.8,.3,1)",
    });
    const subs = [
      { t: "drivetrain", d: "Four motors, mecanum wheels. It can drive any direction, which helps against defense.", a: "4× motors", b: "field-centric" },
      { t: "intake", d: "Compliant-wheel active intake swallows game elements at almost any approach angle.", a: "1× motor", b: "0.4 s grab" },
      { t: "deposit", d: "A two-stage slide that reaches every height in under a second.", a: "2-stage", b: "0.8 m reach" },
      { t: "software", d: "Java on the Control Hub, AprilTag vision, tuned PID paths.", a: "java", b: "opencv" },
    ];
    const subIndex = this.state.sub || 0;
    const subKey = (i) => ({
      display: "flex", alignItems: "center", justifyContent: "center", padding: "18px 10px",
      background: subIndex === i ? "var(--accent)" : "var(--key)", color: subIndex === i ? "var(--ink)" : "var(--muted)",
      border: "1px solid var(--rule)", boxShadow: "0 4px 0 var(--edge)", fontFamily: "var(--mono)",
      fontSize: "16px", transition: "transform .1s ease, box-shadow .1s ease, background .15s ease, color .15s ease",
    });
    const pick = (i) => () => this.setState({ sub: i });
    const target = new Date("2027-03-20T09:00:00").getTime();
    const left = Math.max(0, target - (this.state.now || Date.now()));
    const pad2 = (n) => String(n).padStart(2, "0");
    const daysLeft = String(Math.floor(left / 86400000));
    const hoursLeft = pad2(Math.floor(left / 3600000) % 24);
    const minutesLeft = pad2(Math.floor(left / 60000) % 60);
    const secondsLeft = pad2(Math.floor(left / 1000) % 60);
    const sk = this.state.sortKey, sd = this.state.sortDir || 1;
    const rows = this.matchResults().slice();
    if (sk) rows.sort((a, b) => (typeof a[sk] === "number" ? a[sk] - b[sk] : String(a[sk]).localeCompare(String(b[sk]))) * sd);
    const sorted = rows.map((m) => Object.assign({}, m, {
      resultStyle: { textAlign: "right", color: m.result === "W" ? accent : "var(--muted)", fontVariantNumeric: "tabular-nums" },
    }));

    const rpm = this.state.rpm || 435;
    const ratio = this.state.ratio || 4;
    const wheel = this.state.wheel || 96;
    const speed = (rpm / ratio / 60) * Math.PI * (wheel / 1000);
    const rpmKey = (v) => ({
      flex: "none", padding: "10px 13px", borderRadius: "3px", cursor: "pointer",
      border: "1px solid " + (rpm === v ? accent : "var(--rule)"),
      background: rpm === v ? accent : "transparent", color: rpm === v ? theme.ink : "var(--muted)",
      fontSize: "16px", whiteSpace: "nowrap", transition: "border-color .18s ease, background .2s ease, color .2s ease",
    });

    const amount = this.state.amount === undefined ? 500 : this.state.amount;
    const money = (n) => "$" + Math.round(n).toLocaleString();
    const bar = (frac) => ({ display: "block", height: "100%", width: (frac * 100) + "%", background: accent, transition: "width .3s ease" });
    const tiers = [
      { min: 2500, name: "title partner", perks: "naming rights · logo everywhere · featured at every event" },
      { min: 1000, name: "gold partner", perks: "logo on team shirts · robot · site · event shout-outs" },
      { min: 500, name: "silver partner", perks: "logo on the robot · pit banner · site" },
      { min: 250, name: "bronze partner", perks: "logo on the site · thank-you on social" },
      { min: 0, name: "supporter", perks: "named on our thank-you wall · our genuine gratitude" },
    ];
    const tier = tiers.filter((x) => amount >= x.min)[0];

    const stages = [
      { name: "the team", value: "the janitors", unit: "first tech challenge · rookie", note: "Six students, one shop, and a robot built from raw stock." },
      { name: "team number", value: "36721", unit: "san francisco · 2026", note: "Our rookie number. You'll see it on the pit banner this season." },
      { name: "the robot", value: "mop-9000", unit: "mecanum · vision · lift", note: "Four-motor base, compliant intake, dual-stage lift, Java on the Control Hub." },
      { name: "the record", value: "0 – 0", unit: "matches played so far", note: "Nothing on the board yet. Every number here is about to change." },
    ];
    const stageIdx = ((this.state.stage || 0) % 4 + 4) % 4;
    const stage = stages[stageIdx];
    const stageDot = (i) => ({
      width: stageIdx === i ? "22px" : "7px", height: "7px", flex: "none", borderRadius: "4px",
      background: stageIdx === i ? accent : "var(--rule)",
      transition: "width .4s cubic-bezier(.2,.9,.3,1), background .3s ease",
    });

    const bootPct = this.state.boot || [0, 0, 0, 0, 0];
    const bp = (i, done) => (bootPct[i] >= 100 ? done : bootPct[i] + "%");

    const now2 = new Date(this.state.now || Date.now());
    const nm = new Date(now2.getTime());
    nm.setHours(16, 0, 0, 0);
    let guard = 0;
    while ((nm <= now2 || [2, 4].indexOf(nm.getDay()) < 0) && guard++ < 14) { nm.setDate(nm.getDate() + 1); nm.setHours(16, 0, 0, 0); }
    const dl = nm - now2;
    const nextMeeting = dl > 0
      ? Math.floor(dl / 86400000) + "d " + (Math.floor(dl / 3600000) % 24) + "h " + (Math.floor(dl / 60000) % 60) + "m"
      : "now";

    const toggleTrack = (on) => ({
      display: "inline-block", position: "relative", width: "34px", height: "18px", flex: "none",
      border: "1px solid " + (on ? accent : "var(--rule)"), borderRadius: "10px",
      background: on ? accent : "transparent", transition: "background .2s ease, border-color .2s ease",
    });
    const knob = (on) => ({
      position: "absolute", top: "2px", left: on ? "18px" : "2px", width: "12px", height: "12px",
      borderRadius: "50%", background: on ? theme.ink : "var(--muted)",
      transition: "left .22s cubic-bezier(.2,.8,.3,1), background .2s ease",
    });

    const t = this.state.t;
    const running = t !== null && t !== undefined;
    const secs = running ? t : 150;
    const mm = Math.floor(secs / 60), ss = secs % 60;
    const phase = !running ? "ready" : secs > 120 ? "autonomous" : secs > 30 ? "driver control" : "endgame";
    return {
      letter1: () => this.typeLetter("t"), letter2: () => this.typeLetter("h"), letter3: () => this.typeLetter("e"),
      letter4: () => this.typeLetter("j"), letter5: () => this.typeLetter("a"), letter6: () => this.typeLetter("n"),
      letter7: () => this.typeLetter("i"), letter8: () => this.typeLetter("t"), letter9: () => this.typeLetter("o"),
      letter10: () => this.typeLetter("r"), letter11: () => this.typeLetter("s"),
      daysLeft: daysLeft, hoursLeft: hoursLeft, minutesLeft: minutesLeft, secondsLeft: secondsLeft,
      stageIndex: "0" + (stageIdx + 1), stageName: stage.name, stageValue: stage.value, stageUnit: stage.unit, stageNote: stage.note,
      stageDot0: stageDot(0), stageDot1: stageDot(1), stageDot2: stageDot(2), stageDot3: stageDot(3),
      stageFade: { animation: "rise .55s cubic-bezier(.16,.84,.24,1) both", minHeight: "clamp(170px,20vw,240px)" },
      printPage: () => { if (typeof window !== "undefined") window.print(); },
      resetBot: () => { this.bot = { x: 0, y: 0, h: 0 }; this.drawBot(); },
      autoPos: this.state.autoPos || 0,
      setAutoPos: (e) => { this.setState({ autoPos: parseFloat(e.target.value) }); setTimeout(() => this.drawRoute(), 0); },
      toggleAuto: () => this.toggleRoutePlayback(),
      autoLabel: this.routeTimer ? "Pause" : "Play the route",
      autoClock: (((this.state.autoPos || 0) / 1000) * 30).toFixed(1) + "s",
      autoStep: (this.routeSteps().filter((x) => (this.state.autoPos || 0) / 1000 >= x.t).pop() || this.routeSteps()[0]).label,
      nextMeeting: nextMeeting,
      log: this.buildLog(),
      matches: sorted,
      sortMatch: () => this.sortBy("id"), sortPartner: () => this.sortBy("partner"),
      sortOpp: () => this.sortBy("opp"), sortAuto: () => this.sortBy("auto"),
      sortScore: () => this.sortBy("score"), sortResult: () => this.sortBy("result"),
      rpmLabel: rpm + " rpm", ratioLabel: ratio.toFixed(1) + " : 1", wheelLabel: wheel + " mm",
      ratio: ratio, wheel: wheel,
      setRpm312: () => this.setState({ rpm: 312 }), setRpm435: () => this.setState({ rpm: 435 }), setRpm1150: () => this.setState({ rpm: 1150 }),
      setRatio: (e) => this.setState({ ratio: parseFloat(e.target.value) }),
      setWheel: (e) => this.setState({ wheel: parseFloat(e.target.value) }),
      rpmKey0: rpmKey(312), rpmKey1: rpmKey(435), rpmKey2: rpmKey(1150),
      speed: speed.toFixed(2),
      mphLabel: (speed * 2.23694).toFixed(1) + " mph",
      fieldLabel: (3.66 / Math.max(speed, 0.01)).toFixed(1) + " s across the field",
      amount: amount, amountLabel: "$" + amount.toLocaleString(),
      setAmount: (e) => this.setState({ amount: parseFloat(e.target.value) }),
      amtParts: money(amount * 0.38), amtTravel: money(amount * 0.27),
      amtTools: money(amount * 0.2), amtOut: money(amount * 0.15),
      barParts: bar(0.38), barTravel: bar(0.27), barTools: bar(0.2), barOut: bar(0.15),
      tierName: tier.name, tierPerks: tier.perks,
      menuOpen: !!this.state.menuOpen,
      toggleMenu: () => this.setState({ menuOpen: !this.state.menuOpen }),
      toggleSound: () => this.setState({ sound: this.state.sound === false }),
      toggleFinish: () => this.setState({ noir: !this.state.noir }),
      replayBoot: () => { this.setState({ menuOpen: false }); this.startBootSequence(); },
      bootStep0: bp(0, "ok"), bletter1: bp(1, "ok"), bletter2: bp(2, "ok"), bletter3: bp(3, "ok"), bletter4: bp(4, "5 / 5"),
      gearStyle: { width: "15px", height: "15px", display: "block", transition: "transform .45s cubic-bezier(.2,.8,.3,1)", transform: this.state.menuOpen ? "rotate(90deg)" : "none" },
      soundToggle: toggleTrack(this.state.sound !== false), soundToggleKnob: knob(this.state.sound !== false),
      finishToggle: toggleTrack(!!this.state.noir), finishToggleKnob: knob(!!this.state.noir),
      menuButtonStyle: {
        display: "inline-flex", alignItems: "center", justifyContent: "center", marginRight: "4px",
        padding: "8px", background: this.state.menuOpen ? "var(--panel)" : "transparent",
        border: "1px solid " + (this.state.menuOpen ? accent : "var(--rule)"), borderRadius: "3px",
        color: this.state.menuOpen ? accent : "var(--muted)", cursor: "pointer", lineHeight: 1, flexShrink: 0,
        transition: "color .18s ease, border-color .18s ease, background .18s ease",
      },
      explodeLabel: this.state.exploded ? "collapse" : "explode",
      toggleExplode: () => { this.setState({ exploded: !this.state.exploded }); setTimeout(() => this.applyExploded(), 20); },
      clockTime: mm + ":" + String(ss).padStart(2, "0"),
      clockPhase: phase,
      clockLabel: running ? "stop" : "run match",
      toggleClock: () => this.toggleMatchClock(),
      clockBarStyle: { height: "100%", width: ((150 - secs) / 150 * 100).toFixed(1) + "%", background: "var(--accent)", transition: "width 1s linear" },
      rootStyle,
      booting: !!this.state.booting,


      scrollTopFn: () => this.scrollToTop(),
      onRobotDown: (e) => this.startViewerDrag(e),
      subTitle: subs[subIndex].t, subDesc: subs[subIndex].d, subSpecA: subs[subIndex].a, subSpecB: subs[subIndex].b,
      subKey0: subKey(0), subKey1: subKey(1), subKey2: subKey(2), subKey3: subKey(3),
      selDrive: pick(0), selIntake: pick(1), selLift: pick(2), selCode: pick(3),
      isHome: page === "home", isRobot: page === "robot", isSeason: page === "season",
      isOutreach: page === "outreach", isSponsors: page === "sponsors", isTeam: page === "team", isJoin: page === "join",
      isPortfolio: page === "portfolio", navPortfolio: nav("portfolio"), navPortfolioStyle: key("portfolio"),
      navHome: nav("home"), navRobot: nav("robot"), navSeason: nav("season"), navOutreach: nav("outreach"),
      navSponsors: nav("sponsors"), navTeam: nav("team"), navJoin: nav("join"),
      navRobotStyle: key("robot"), navSeasonStyle: key("season"), navOutreachStyle: key("outreach"),
      navSponsorsStyle: key("sponsors"), navTeamStyle: key("team"),
    };
  }
}
