export function renderTeaser(t) {
  const mediaContent = t.image
    ? `<img src="${t.image}" alt="${t.title}" loading="lazy">`
    : `<div class="ph"><span>${t.tag}</span></div>`;

  return `
  <a class="teaser-card" href="${t.href}">
    <div class="teaser-media">${mediaContent}</div>
    <div class="teaser-body">
      <span class="tag">${t.tag}</span>
      <h3>${t.title}</h3>
      <p>${t.description}</p>
    </div>
  </a>`;
}

export function renderTeasers(teasers) {
  return teasers.map(t => renderTeaser(t)).join('');
}
