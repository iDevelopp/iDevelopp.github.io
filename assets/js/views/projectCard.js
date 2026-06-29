function placeholderIcon(id) {
  const icons = {
    swarmz: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="19" cy="17" r="2"/><path d="M12 7v4m0 0-5 4m5-4 5 4"/>',
    software: '<path d="M8 6 3 12l5 6M16 6l5 6-5 6M13 4l-2 16"/>'
  };
  return icons[id] || '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>';
}

export function renderProject(p, index) {
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
    </div>
  </article>`;
}

export function renderProjects(projects) {
  return projects.map((p, i) => renderProject(p, i)).join('');
}
