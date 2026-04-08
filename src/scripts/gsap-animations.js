import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Hero animations ──────────────────────────────────────────────────────────
function initHeroAnimations() {
  const greeting   = document.querySelector('#hero-greeting');
  const titleWords = document.querySelectorAll('#hero-title .word');
  const subtitle   = document.querySelector('#hero-subtitle');
  const body       = document.querySelector('#hero-body');
  const ctaItems   = document.querySelectorAll('#hero-cta > *');
  const photo      = document.querySelector('#hero-photo');
  const badges     = document.querySelectorAll('.hero-badge');

  if (!greeting) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (greeting)          tl.fromTo(greeting,   { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 });
  if (titleWords.length) tl.fromTo(titleWords,  { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.4');
  if (subtitle)          tl.fromTo(subtitle,   { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');
  if (body)              tl.fromTo(body,       { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');
  if (ctaItems.length)   tl.fromTo(ctaItems,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, '-=0.2');
  if (photo)             tl.fromTo(photo,      { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.5');
  if (badges.length)     tl.fromTo(badges,     { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' }, '-=0.4');
}

// ── Scroll-triggered reveals ──────────────────────────────────────────────────
function initScrollAnimations() {
  gsap.utils.toArray('.gsap-reveal').forEach(el => {
    if (el.closest('#hero')) return;
    gsap.fromTo(el,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      }
    );
  });

  gsap.utils.toArray('.gsap-reveal-left').forEach(el => {
    if (el.closest('#hero')) return;
    gsap.fromTo(el,
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      }
    );
  });

  gsap.utils.toArray('.gsap-scale-in').forEach(el => {
    if (el.closest('#hero')) return;
    gsap.fromTo(el,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      }
    );
  });

  gsap.utils.toArray('.gsap-stagger-parent').forEach(parent => {
    const children = parent.querySelectorAll('.gsap-stagger-child');
    if (!children.length) return;
    gsap.fromTo(children,
      { y: 25, opacity: 0, immediateRender: false },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: parent, start: 'top 92%', once: true },
      }
    );
  });
}

// ── Init all ──────────────────────────────────────────────────────────────────
function initAll() {
  ScrollTrigger.getAll().forEach(t => t.kill());
  gsap.killTweensOf('*');

  initHeroAnimations();
  initScrollAnimations();

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  requestAnimationFrame(initAll);
}

document.addEventListener('astro:page-load', () => {
  requestAnimationFrame(initAll);
});
