import initCosmos from '../core/cosmos.js';
import { initNav, initReveal, initLightbox, setYear } from '../core/ui.js';
import { collections } from '../models/gallery.js';
import { renderGallery } from '../views/galleryGrid.js';

function mount(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  initCosmos('cosmos');
  initNav('nav');
  initReveal();
  setYear('year');

  mount('gallery-mount', renderGallery(collections));
  initReveal();
  initLightbox('#gallery-mount');
});
