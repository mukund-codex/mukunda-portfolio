/**
 * Swarm build — an original "the page builds itself" effect.
 *
 * Inspired by the idea behind Swarm (califa.github.io/swarm-site) and the
 * swarm-Antigravity extension, but written from scratch for this site: no code
 * is copied from either project and nothing is loaded from other domains.
 *
 * When started, every buildable part of the page is hidden. As each part
 * scrolls into view, a multiplayer-style cursor flies to it and drags a box
 * over it (with a live W × H badge) before it fades back in. More cursors join
 * when the visitor scrolls faster. Anything scrolled past, focused with the
 * keyboard, or left over when Escape/Skip is pressed is revealed at once, so
 * content is never stuck hidden. Only a data attribute is toggled on existing
 * elements; the page's DOM is never cloned or replaced.
 */

// What the swarm builds, in roughly the order a designer would lay it out.
const TARGETS = [
  ".wordmark",
  ".site-nav .nav-link",
  ".motion-play",
  ".motion-toggle",
  ".header-cta",
  ".menu-button",
  ".hero__eyebrow",
  ".hero__title-line",
  ".hero__script",
  ".hero__art",
  ".hero__intro",
  ".hero__highlights li",
  ".hero__location",
  ".hero__ctas .btn",
  ".hero__metrics > div",
  ".section-kicker",
  ".section-title",
  ".empty-state",
  ".project-card",
  ".archive__head",
  ".about__bio p",
  ".about__block",
  ".process__step",
  ".timeline__item",
  ".awards__item",
  ".testimonial",
  ".contact__text",
  ".contact__email",
  ".socials li",
  ".field",
  ".contact-form .btn",
  ".contact-form__note",
  ".site-footer__inner > *",
].join(",");

const TEXTY = /^(P|H1|H2|H3|H4|SPAN|A)$/;
const LABELS = ["Layout", "Type", "Grid", "Color", "Content", "Spacing", "Motion", "Review", "Polish", "Ship"];
const COLORS = ["#e32b3c", "#4f8cff", "#2fbf71", "#f5a524", "#a66bff", "#ff6ba6", "#22b8cf", "#f2efeb", "#ff8a3d", "#7bd88f"];
const MAX_CURSORS = 10;
const MAX_QUEUE = 14; // beyond this the oldest queued parts are revealed instantly

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const lerp = (a, b, k) => a + (b - a) * k;

let engine = null;

function cursorSvg(color) {
  return `<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M3 2.2 18.4 9.3c.8.4.7 1.5-.1 1.7l-6.2 1.6c-.4.1-.7.4-.8.8l-1.6 6.2c-.2.8-1.3.9-1.7.1L1.5 3.7C1.1 2.8 2.1 1.8 3 2.2Z" fill="${color}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
}

function collectTargets() {
  const found = [...document.querySelectorAll(TARGETS)].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 4 && r.height > 4 && getComputedStyle(el).visibility !== "hidden";
  });
  // Keep the outermost match only, so a card is built once rather than piece by piece.
  return found.filter((el) => !found.some((other) => other !== el && other.contains(el)));
}

class Engine {
  constructor() {
    this.stopped = false;
    this.items = new Map(); // element -> "hidden" | "queued" | "building"
    this.queue = [];
    this.cursors = new Set();
    this.spawned = 0;

    this.layer = document.createElement("div");
    this.layer.className = "swarm-layer";
    this.layer.setAttribute("aria-hidden", "true");
    this.skip = document.createElement("button");
    this.skip.type = "button";
    this.skip.className = "swarm-skip";
    this.skip.textContent = "Skip";
    this.skip.hidden = true;
    this.skip.addEventListener("click", () => stopSwarm());
    document.body.append(this.layer, this.skip);

    this.onKey = (event) => event.key === "Escape" && this.cursors.size && stopSwarm();
    this.onFocus = (event) => {
      for (const el of this.items.keys()) if (el.contains(event.target)) this.reveal(el, true);
    };
    this.onScroll = () => {
      if (this.scrollTick) return;
      this.scrollTick = requestAnimationFrame(() => {
        this.scrollTick = 0;
        this.sweep();
      });
    };
    document.addEventListener("keydown", this.onKey);
    document.addEventListener("focusin", this.onFocus);
    window.addEventListener("scroll", this.onScroll, { passive: true });

    for (const el of collectTargets()) {
      el.dataset.swarm = "hidden";
      this.items.set(el, "hidden");
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting && this.items.get(entry.target) === "hidden")
          .map((entry) => entry.target)
          .sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left;
          });
        for (const el of entering) {
          this.items.set(el, "queued");
          this.queue.push(el);
        }
        if (entering.length) this.dispatch();
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.12 },
    );
    for (const el of this.items.keys()) this.observer.observe(el);
  }

  /** Reveal what the visitor has scrolled past or what the swarm can't keep up with. */
  sweep() {
    for (const [el, state] of [...this.items]) {
      if (state !== "building" && el.getBoundingClientRect().bottom < 0) this.reveal(el, true);
    }
    while (this.queue.length > MAX_QUEUE) this.reveal(this.queue[0], true);
  }

  reveal(el, instant = false) {
    if (!this.items.has(el)) return;
    this.items.delete(el);
    this.observer.unobserve(el);
    const index = this.queue.indexOf(el);
    if (index >= 0) this.queue.splice(index, 1);
    if (instant) delete el.dataset.swarm;
    else el.dataset.swarm = TEXTY.test(el.tagName) ? "type" : "reveal";
    if (!this.items.size) this.idleTeardown();
  }

  /** Bring in more cursors the more work is waiting. */
  dispatch() {
    const wanted = Math.min(MAX_CURSORS, Math.max(3, Math.ceil(this.queue.length / 2)));
    while (this.cursors.size < wanted && this.queue.length) this.spawn();
    this.skip.hidden = this.cursors.size === 0;
  }

  spawn() {
    const index = this.spawned++;
    const color = COLORS[index % COLORS.length];
    const el = document.createElement("div");
    el.className = "swarm-cursor";
    el.innerHTML = `${cursorSvg(color)}<span style="background:${color};color:${color === "#f2efeb" ? "#111" : "#fff"}">${LABELS[index % LABELS.length]}</span>`;
    this.layer.append(el);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const side = index % 4;
    const cursor = {
      el,
      x: side === 0 ? -40 : side === 1 ? w + 40 : Math.random() * w,
      y: side === 2 ? -40 : side === 3 ? h + 40 : Math.random() * h,
    };
    this.place(cursor, cursor.x, cursor.y);
    this.cursors.add(cursor);
    this.work(cursor);
  }

  place(cursor, x, y) {
    cursor.x = x;
    cursor.y = y;
    cursor.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  tween(duration, step) {
    return new Promise((resolve) => {
      const start = performance.now();
      const frame = (now) => {
        if (this.stopped) return resolve(false);
        const t = Math.min(1, (now - start) / duration);
        step(ease(t));
        if (t < 1) requestAnimationFrame(frame);
        else resolve(true);
      };
      requestAnimationFrame(frame);
    });
  }

  async work(cursor) {
    let idleSince = 0;
    while (!this.stopped) {
      const el = this.queue.shift();
      if (el) {
        idleSince = 0;
        await this.build(cursor, el);
        continue;
      }
      if (!idleSince) idleSince = performance.now();
      if (performance.now() - idleSince > 900) break;
      await sleep(80);
    }
    if (this.stopped) return;
    // Nothing left in view: fly off the nearest side and leave.
    const toRight = cursor.x > window.innerWidth / 2;
    const fromX = cursor.x;
    const fromY = cursor.y;
    await this.tween(550, (k) => this.place(cursor, lerp(fromX, toRight ? window.innerWidth + 60 : -60, k), fromY));
    cursor.el.remove();
    this.cursors.delete(cursor);
    this.skip.hidden = this.cursors.size === 0;
  }

  async build(cursor, el) {
    if (!this.items.has(el)) return;
    this.items.set(el, "building");

    // Positions are read every frame, so the cursor keeps up while the page scrolls.
    const fromX = cursor.x;
    const fromY = cursor.y;
    const start = el.getBoundingClientRect();
    const travel = Math.hypot(start.left - fromX, start.top - fromY);
    const arrived = await this.tween(Math.min(650, 220 + travel * 0.4), (k) => {
      const r = el.getBoundingClientRect();
      this.place(cursor, lerp(fromX, r.left, k), lerp(fromY, r.top, k));
    });
    if (!arrived || !this.items.has(el)) return;

    const box = document.createElement("div");
    box.className = "swarm-box";
    const badge = document.createElement("span");
    badge.className = "swarm-badge";
    box.append(badge);
    this.layer.append(box);

    cursor.el.classList.add("is-pressed");
    const drag = Math.min(600, 220 + (start.width + start.height) * 0.3);
    const drawn = await this.tween(drag, (k) => {
      const r = el.getBoundingClientRect();
      const w = r.width * k;
      const h = r.height * k;
      box.style.cssText = `left:${r.left}px;top:${r.top}px;width:${w}px;height:${h}px`;
      badge.textContent = `${Math.round(w)} × ${Math.round(h)}`;
      this.place(cursor, r.left + w, r.top + h);
    });
    cursor.el.classList.remove("is-pressed");
    if (!drawn) return box.remove();

    this.reveal(el);
    box.classList.add("is-done");
    setTimeout(() => box.remove(), 500);
    await sleep(160);
  }

  /** Everything is built: stop listening but let the last cursors fly away. */
  idleTeardown() {
    this.observer.disconnect();
    window.removeEventListener("scroll", this.onScroll);
    document.removeEventListener("focusin", this.onFocus);
  }

  destroy() {
    this.stopped = true;
    this.idleTeardown();
    document.removeEventListener("keydown", this.onKey);
    cancelAnimationFrame(this.scrollTick);
    for (const el of this.items.keys()) delete el.dataset.swarm;
    this.items.clear();
    this.queue = [];
    const skipHadFocus = document.activeElement === this.skip;
    this.skip.remove();
    if (skipHadFocus) document.querySelector(".motion-play")?.focus({ preventScroll: true });
    this.layer.classList.add("is-leaving");
    setTimeout(() => this.layer.remove(), 400);
  }
}

/** Hide the page and let the swarm build it, now and as the visitor scrolls. */
export function startSwarm() {
  stopSwarm();
  engine = new Engine();
}

/** End the swarm and reveal everything immediately. */
export function stopSwarm() {
  if (!engine) return;
  engine.destroy();
  engine = null;
}
