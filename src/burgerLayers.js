import { gsap } from 'gsap';

// Burger despiezada a partir de una sola imagen IA (todas las capas con la misma luz y perspectiva).
// Las seis capas comparten lienzo (484 × 723), así que en la posición "natural" encajan tal cual salieron.
// Montada: cada capa baja hasta apoyarse en la de debajo. Despiezada: un poco más de aire que en la foto.

const W = 484;
const H = 723;

// De abajo arriba: base, carne, cheddar, col, salsa, pan.
// center: altura (px del lienzo) donde va la etiqueta de cada capa.
const GEO = [
  { center: 652, closed: -4, open: 46 },
  { center: 520, closed: 40, open: 20 },
  { center: 420, closed: 58, open: -4 },
  { center: 318, closed: 96, open: -26 },
  { center: 232, closed: 122, open: -52 },
  { center: 110, closed: 146, open: -88 },
];

export function createBurger(root, { base = '', layers, reduced = false }) {
  root.classList.add('burger');
  root.style.setProperty('--ratio', `${W} / ${H}`);
  root.innerHTML = `
    <div class="burger__glow" aria-hidden="true"></div>
    <div class="burger__stack">
      <div class="burger__ground" aria-hidden="true"></div>
      ${layers.map((layer, i) => `
        <div class="burger__layer" style="z-index:${i + 1}">
          <img src="${base}${layer.file}.webp" alt="" width="${W}" height="${H}" draggable="false" ${i < 2 ? '' : 'decoding="async"'} />
          <span class="burger__label burger__label--${i % 2 ? 'left' : 'right'}" style="top:${(GEO[i].center / H) * 100}%">
            <i aria-hidden="true"></i>${layer.label}
          </span>
        </div>`).join('')}
    </div>`;

  const stack = root.querySelector('.burger__stack');
  const els = [...root.querySelectorAll('.burger__layer')];
  const labels = [...root.querySelectorAll('.burger__label')];
  const ground = root.querySelector('.burger__ground');
  const state = { open: 0 };

  const unit = () => (root.clientHeight || H) / H;

  // open: 0 montada · 1 despiezada
  const render = () => {
    const u = unit();
    const t = state.open;
    els.forEach((el, i) => {
      const { closed, open } = GEO[i];
      const y = (closed + (open - closed) * t) * u;
      // las capas centrales giran un pelo al separarse, para que no parezca un ascensor
      const r = t * (i % 2 ? -1.6 : 1.2) * (i === 0 ? 0 : 1);
      gsap.set(el, { y, rotation: r, x: t * (i % 2 ? -4 : 4) * u });
    });
    labels.forEach((l) => gsap.set(l, { autoAlpha: Math.max(0, (t - 0.45) / 0.4) }));
    gsap.set(ground, { scaleX: 1 + t * 0.25, opacity: 0.85 - t * 0.35, y: GEO[0].open * t * u });
  };

  let idle = null;
  return {
    intro() {
      render();
      if (reduced) return gsap.timeline();
      const tl = gsap.timeline({ delay: 0.15 });
      els.forEach((el, i) => {
        const img = el.querySelector('img');
        tl.fromTo(img, { y: -120 - i * 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.in' }, i * 0.11)
          .to(img, { keyframes: [{ scaleY: 0.96, scaleX: 1.015, duration: 0.07 }, { scaleY: 1, scaleX: 1, duration: 0.45, ease: 'elastic.out(1, 0.45)' }], transformOrigin: '50% 100%' }, i * 0.11 + 0.5);
      });
      tl.fromTo(ground, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.3);
      tl.add(() => {
        idle = gsap.to(stack, { y: -6, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
      return tl;
    },
    set(value) {
      state.open = value;
      if (idle) idle.paused(value > 0.02);
      render();
    },
    refresh: render,
  };
}
