function placeholderIcon(id) {
  const icons = {
    swarmz:            '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="19" cy="17" r="2"/><path d="M12 7v4m0 0-5 4m5-4 5 4"/>',
    'drone-simulator': '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
    software:          '<path d="M8 6 3 12l5 6M16 6l5 6-5 6M13 4l-2 16"/>',
    classifier:        '<path d="M21 21H3V3M9 9h6M9 13h6M9 17h4"/>',
    'stable-diffusion':'<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4"/>',
    raytracing:        '<path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/>',
  };
  return icons[id] || '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>';
}

function renderLinks(p) {
  const links = [];
  if (p.github) links.push(`<a href="${p.github}" target="_blank" rel="noopener" class="project-link">GitHub →</a>`);
  if (p.pdf)    links.push(`<a href="${p.pdf}" target="_blank" rel="noopener" class="project-link">Paper →</a>`);
  return links.length ? `<div class="project-links">${links.join('')}</div>` : '';
}

export function renderProject(p) {
  const mediaContent = p.images && p.images.length > 0
    ? `<img src="${p.images[0]}" alt="${p.title}" loading="lazy">`
    : `<div class="ph">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5">${placeholderIcon(p.id)}</svg>
        <span>${p.tag}</span>
      </div>`;

  return `
  <article class="project" id="${p.id}">
    <div class="project-media reveal-up">${mediaContent}</div>
    <div class="project-body reveal-up d1">
      <span class="tag">${p.tag}</span>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <ul class="stack">${p.stack.map(s => `<li>${s}</li>`).join('')}</ul>
      ${p.period ? `<p class="project-period"><span class="mono-label">${p.period}</span></p>` : ''}
      ${renderLinks(p)}
    </div>
  </article>`;
}

export function renderProjects(projects) {
  // Group by category
  const cats = [];
  const map = {};
  projects.forEach(p => {
    if (!map[p.category]) {
      map[p.category] = [];
      cats.push({ name: p.category, items: map[p.category] });
    }
    map[p.category].push(p);
  });

  return cats.map(cat => `
  <div class="project-category">
    <div class="category-head reveal-up">
      <span class="eyebrow">${cat.name}</span>
    </div>
    ${cat.items.map(p => renderProject(p)).join('')}
  </div>`).join('');
}
