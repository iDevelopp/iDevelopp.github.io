import initCosmos from '../core/cosmos.js';
import { initNav, initHeroParallax, initReveal, initManifestoSplit, initHeroReveal, initAboutHeadline, initAboutRocket, setYear } from '../core/ui.js';
import { profile } from '../models/profile.js';
import { teasers } from '../models/teasers.js';
import { renderTeasers } from '../views/teaserCard.js';

function mount(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  initCosmos('cosmos');
  initNav('nav');
  initHeroParallax('.hero-inner', 'cosmos');
  initHeroReveal();
  initReveal();
  initManifestoSplit('[data-split]');
  initAboutHeadline('.about-header h2');
  initAboutRocket('.about-header');
  setYear('year');

  mount('teasers-mount', renderTeasers(teasers));
  initReveal(); // re-run after dynamic content
});
