export function renderCollection(collection) {
  const items = collection.items.map(item => `
    <div class="gallery-item${item.wide ? ' gallery-item--wide' : ''}${item.tall ? ' gallery-item--tall' : ''}" data-src="${item.src}">
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <div class="gallery-caption">${item.caption}</div>
    </div>`).join('');

  return `
  <section class="gallery-section" id="${collection.id}">
    <div class="wrap">
      <div class="collection-head reveal-up">
        <span class="eyebrow">${collection.eyebrow}</span>
        <h2>${collection.title}</h2>
        <p class="collection-desc">${collection.description}</p>
      </div>
      <div class="gallery-grid reveal-up">${items}</div>
    </div>
  </section>`;
}

export function renderGallery(collections) {
  return collections.map(c => renderCollection(c)).join('');
}
