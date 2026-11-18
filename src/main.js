import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { MARK_PATH, MARK_VIEW } from './logo-mark.js';
import { info, menu, sauces, allergens, burgerLayers } from './data.js';
import { createBurger } from './burgerLayers.js';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const base = import.meta.env.BASE_URL;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const euro = (n) => `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')} €`;

/* ---------- logo: neón de verdad, en su rojo ----------
   Capas: halo ancho y suave + resplandor ceñido + tubo rojo + núcleo casi blanco (como un tubo encendido).
   data-logo="sm" (barra y pie). */
const logoSVG = (i, size) => {
  const k = size === 'lg' ? 1 : 0.7;
  return `
  <svg class="logo logo--${size}" viewBox="0 0 ${MARK_VIEW.w} ${MARK_VIEW.h}" aria-hidden="true" overflow="visible">
    <defs>
      <filter id="lg-halo-${i}" x="-80%" y="-150%" width="260%" height="400%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${9 * k}"/></filter>
      <filter id="lg-glow-${i}" x="-30%" y="-40%" width="160%" height="180%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${2.2 * k}"/></filter>
      <filter id="lg-core-${i}" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0.5"/></filter>
    </defs>
    <path class="logo__tube" fill-rule="evenodd" d="${MARK_PATH}"/>
    <g class="logo__light">
      <path class="logo__halo" fill-rule="evenodd" filter="url(#lg-halo-${i})" d="${MARK_PATH}"/>
      <path class="logo__glow" fill-rule="evenodd" filter="url(#lg-glow-${i})" d="${MARK_PATH}"/>
      <path class="logo__lit" fill-rule="evenodd" d="${MARK_PATH}"/>
      <path class="logo__core" fill-rule="evenodd" filter="url(#lg-core-${i})" d="${MARK_PATH}"/>
    </g>
  </svg>`;
};
$$('[data-logo]').forEach((el, i) => { el.innerHTML = logoSVG(i, el.dataset.logo); });
// se encienden al cargar (barra) o al llegar (pie)
const neonOn = (el) => el?.classList.add('is-on');
if (reduced) $$('.logo').forEach(neonOn);
else setTimeout(() => neonOn($('.nav .logo')), 500);

/* ---------- datos del local ---------- */
const hoursText = info.hours.map(([d, h]) => `${d}: ${h}`).join(' · ');
$$('[data-call]').forEach((a) => { a.href = info.phoneHref; });
$$('[data-maps]').forEach((a) => { a.href = info.mapsUrl; });
$$('[data-phone]').forEach((a) => { a.href = info.phoneHref; a.textContent = info.phone; });
$$('[data-phone-text]').forEach((s) => { s.textContent = info.phone; });
$('[data-address]').innerHTML = `${info.address}<br />${info.postal} ${info.town} (${info.region})`;
$('[data-address-line]').textContent = `${info.address}, ${info.town}`;
$('[data-hours]').innerHTML = info.hours.map(([d, h]) => `<li><span>${d}</span><span>${h}</span></li>`).join('');
$('[data-hours-line]').textContent = `${info.address} · ${hoursText}`;
$('[data-hours-text]').textContent = `${info.address}, ${info.town}. ${hoursText}.`;
$$('[data-social]').forEach((el) => {
  el.innerHTML = info.social.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>`).join('');
});

/* ---------- carta ---------- */
const alChips = (codes = []) => (codes.length
  ? `<ul class="al" aria-label="Alérgenos: ${codes.map((c) => allergens[c]).join(', ')}">${codes.map((c) => `<li title="${allergens[c]}">${c}</li>`).join('')}</ul>`
  : '<p class="al al--none">Alérgenos: consultar en sala</p>');

const dish = (d) => `
  <li class="dish${d.img ? ' dish--photo' : ''}">
    ${d.img ? `<div class="dish__img"><img src="${base}img/${d.img}.jpg" alt="${d.name}" loading="lazy" width="400" height="400" /></div>` : ''}
    <div class="dish__body">
      <div class="dish__top">
        <h4 class="dish__name">${d.name}</h4>
        <span class="dish__dots" aria-hidden="true"></span>
        <p class="dish__price">${euro(d.price)}</p>
      </div>
      ${d.priceAlt || d.unit ? `<p class="dish__meta">${[d.unit, d.priceAlt && `${d.priceAlt.label} ${euro(d.priceAlt.price)}`].filter(Boolean).join(' · ')}</p>` : ''}
      <p class="dish__desc">${d.desc}</p>
      <div class="dish__foot">
        ${(d.tags || []).map((t) => `<span class="tag${t === 'Picante' ? ' tag--hot' : ''}">${t}</span>`).join('')}
        ${alChips(d.al)}
      </div>
    </div>
  </li>`;

$('[data-tabs]').innerHTML = menu.map((g) => `<a href="#c-${g.id}">${g.name}</a>`).join('') + '<a href="#salsas-title">Salsas</a>';
$('[data-menu]').innerHTML = menu.map((g) => `
  <section class="group" id="c-${g.id}" aria-labelledby="c-${g.id}-t">
    <h3 class="group__name" id="c-${g.id}-t">${g.name}</h3>
    ${g.note ? `<p class="group__note">${g.note}</p>` : ''}
    <ul class="dishes">${g.items.map(dish).join('')}</ul>
  </section>`).join('');
$('[data-sauce-price]').textContent = `· ${euro(sauces.price)} cada una`;
$('[data-sauces]').innerHTML = sauces.items.map((s) => `
  <li><p class="sauce__name">${s.name}${s.hot ? ' <span class="tag tag--hot">Picante</span>' : ''}</p><p class="sauce__desc">${s.desc}</p>${alChips(s.al)}</li>`).join('');
$('[data-allergens]').innerHTML = Object.entries(allergens).map(([k, v]) => `<li><b>${k}</b> ${v}</li>`).join('');

/* ---------- textos legales ---------- */
$$('[data-open]').forEach((b) => b.addEventListener('click', () => $(`#${b.dataset.open}`).showModal()));
$$('dialog.legal').forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));

/* ---------- scroll suave y navegación ---------- */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const navH = () => $('[data-nav]').offsetHeight;
const setNavH = () => document.documentElement.style.setProperty('--nav-h', `${navH()}px`);
setNavH();
window.addEventListener('resize', setNavH);
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
  const id = a.getAttribute('href');
  const target = id.length > 1 && $(id);
  if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(target, { offset: -navH() - 56, duration: 1.1 });
  else target.scrollIntoView();
}));

const nav = $('[data-nav]');
const dock = $('.dock');
let lastY = 0;
const onScroll = (y) => {
  nav.classList.toggle('is-solid', y > 40);
  const hidden = y > lastY && y > 500;
  nav.classList.toggle('is-hidden', hidden);
  document.body.classList.toggle('nav-hidden', hidden);
  dock.classList.toggle('is-on', y > innerHeight * 0.6);
  lastY = y;
};
if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
else window.addEventListener('scroll', () => onScroll(scrollY), { passive: true });

// pestaña activa de la carta
const tabs = $$('[data-tabs] a');
menu.forEach((g, i) => ScrollTrigger.create({
  trigger: `#c-${g.id}`,
  refreshPriority: -1, // se calculan después del pin del hero, que está por encima
  start: 'top 40%',
  end: 'bottom 40%',
  onToggle: ({ isActive }) => {
    if (!isActive) return;
    tabs.forEach((t, j) => t.classList.toggle('is-active', j === i));
    tabs[i].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
  },
}));

/* ---------- hero ---------- */
const burger = createBurger($('.hero__burger'), { base: `${base}img/`, layers: burgerLayers, reduced });
const bits = '.hero__eyebrow, .hero__title span, .hero__sub, .hero__actions, .hero__meta, .hero__hint';
if (reduced) {
  gsap.set(bits, { autoAlpha: 1 });
  burger.set(0);
} else {
  burger.intro();
  gsap.timeline({ delay: 0.35 })
    .fromTo('.hero__eyebrow, .hero__title span', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power4.out' })
    .fromTo('.hero__sub, .hero__actions, .hero__meta, .hero__hint', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, '-=0.4');

  const burgerEl = $('.hero__burger');
  const toMiddle = () => innerHeight / 2 - (burgerEl.offsetTop + burgerEl.offsetHeight / 2);
  const toCenter = () => innerWidth / 2 - (burgerEl.offsetLeft + burgerEl.offsetWidth / 2);
  const mm = gsap.matchMedia();
  mm.add({ wide: '(min-width: 761px)', narrow: '(max-width: 760px)' }, ({ conditions }) => {
    const proxy = { o: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: () => `+=${innerHeight * (conditions.wide ? 2.2 : 1.7)}`,
        pin: true,
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    });
    // 1) el texto se va y la burger pasa al centro
    tl.to('.hero__copy, .hero__hint', { autoAlpha: 0, y: -30, duration: 0.14, ease: 'power2.in' }, 0)
      .to('.hero__burger', { x: () => (conditions.wide ? toCenter() : 0), scale: conditions.wide ? 1.06 : 1.1, y: () => toMiddle(), duration: 0.2, ease: 'power2.inOut' }, 0.02)
    // 2) se despieza
      .to(proxy, { o: 1, duration: 0.34, ease: 'power2.inOut', onUpdate: () => burger.set(proxy.o) }, 0.16)
    // 3) un momento abierta y 4) se vuelve a montar
      .to(proxy, { o: 0, duration: 0.3, ease: 'back.in(1.4)', onUpdate: () => burger.set(proxy.o) }, 0.66)
      .to({}, { duration: 0.04 });
    return () => burger.set(0);
  });
}

/* ---------- cómo pedir: el título sube, las tarjetas caen y el cheddar se derrite por el borde ---------- */
// Borde de queso fundido: una franja con goterones anchos y cortos, distintos en cada tarjeta.
// [centro x, ancho, largo] sobre un lienzo de 300 × 40
const DRIPS = [
  [[34, 24, 12], [80, 14, 6], [150, 30, 24], [212, 18, 10], [258, 26, 16]],
  [[30, 16, 7], [86, 30, 20], [146, 14, 6], [204, 26, 15], [262, 20, 9]],
  [[44, 28, 17], [104, 14, 6], [160, 20, 11], [226, 32, 26], [278, 12, 6]],
];
const dripPath = (x, w, d) => {
  const h = w / 2;
  // sale de la franja con un hombro suave y cae en una U ancha, como queso, no como gota
  return `M${x - h - 6} 4 C${x - h} 4 ${x - h} 6 ${x - h} ${4 + d * 0.45} C${x - h} ${4 + d} ${x - h * 0.45} ${5 + d} ${x} ${5 + d} C${x + h * 0.45} ${5 + d} ${x + h} ${4 + d} ${x + h} ${4 + d * 0.45} C${x + h} 6 ${x + h} 4 ${x + h + 6} 4 Z`;
};
$$('.card__drip').forEach((el, i) => {
  el.innerHTML = `<svg viewBox="0 0 300 40" preserveAspectRatio="none">
    <defs><linearGradient id="cheese-${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6B23C"/><stop offset="1" stop-color="#D9740A"/></linearGradient></defs>
    <g fill="url(#cheese-${i})">
      <rect class="cheese__band" x="0" y="0" width="300" height="5" rx="2"/>
      ${DRIPS[i % DRIPS.length].map(([x, w, d]) => `<path class="cheese__drip" d="${dripPath(x, w, d)}"/>`).join('')}
    </g>
    <rect x="0" y="1" width="300" height="1.2" fill="#FFE2A6" opacity=".55"/>
  </svg>`;
});
if (reduced) {
  gsap.set('.card', { autoAlpha: 1 });
} else {
  gsap.from('.order__title span', {
    yPercent: 105, duration: 0.9, ease: 'power4.out',
    scrollTrigger: { trigger: '.order', start: 'top 80%', once: true },
  });
  gsap.set('.card__drip svg', { clipPath: 'inset(0 100% 0 0)' });
  gsap.set('.cheese__drip', { scaleY: 0, transformOrigin: '50% 0%' });
  ScrollTrigger.batch('.card', {
    start: 'top 88%',
    once: true,
    onEnter: (cards) => {
      const tl = gsap.timeline();
      tl.fromTo(cards, { autoAlpha: 0, y: 70, rotation: (i) => (i % 2 ? 2.5 : -2.5) }, {
        autoAlpha: 1, y: 0, rotation: 0, duration: 0.9, ease: 'back.out(1.5)', stagger: 0.12, clearProps: 'transform',
      });
      cards.forEach((card, i) => {
        tl.to(card.querySelector('.card__drip svg'), { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power2.inOut' }, 0.45 + i * 0.12)
          .to(card.querySelectorAll('.cheese__drip'), {
            scaleY: 1, duration: 1.4, ease: 'power1.out', stagger: { each: 0.12, from: 'random' },
          }, 0.75 + i * 0.12);
      });
      // el botón de llamar da un toque, como un teléfono que suena
      const call = cards[0]?.querySelector('[data-call]');
      if (call) {
        tl.to(call, {
          keyframes: { rotation: [0, -4, 4, -3, 3, 0], ease: 'none' }, duration: 0.5, clearProps: 'transform',
        }, 1.4);
      }
    },
  });
}

// el neón del pie se enciende al llegar
['.footer'].forEach((sel) => ScrollTrigger.create({
  trigger: sel,
  start: 'top 80%',
  once: true,
  onEnter: () => neonOn($(`${sel} .logo`)),
}));

window.addEventListener('resize', () => burger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
