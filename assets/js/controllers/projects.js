import initCosmos from '../core/cosmos.js';
import { initNav, initReveal, setYear } from '../core/ui.js';
import { projects } from '../models/projects.js';
import { renderProjects } from '../views/projectCard.js';

function mount(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  initCosmos('cosmos');
  initNav('nav');
  initReveal();
  setYear('year');

  mount('projects-mount', renderProjects(projects));
  initReveal();
});
