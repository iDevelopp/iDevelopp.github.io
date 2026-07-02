export function initNav(navId) {
  var nav = document.getElementById(navId);
  var progress = document.getElementById('progress');
  var toggle = document.getElementById('nav-toggle');
  var scrollCue = document.querySelector('.scroll-cue');

  // Hamburger toggle
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    var links = nav.querySelectorAll('.nav-links a');
    links.forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);

    if (progress) {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + '%';
    }

    // Hide scroll cue once user starts scrolling
    if (scrollCue) {
      var hide = window.scrollY > 40;
      scrollCue.style.opacity = hide ? '0' : '1';
      scrollCue.style.visibility = hide ? 'hidden' : 'visible';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function initHeroParallax(heroInnerSelector, cosmosId) {
  var heroInner = document.querySelector(heroInnerSelector);
  var cosmos = cosmosId ? document.getElementById(cosmosId) : null;

  function onScroll() {
    var sy = window.scrollY;
    if (heroInner) {
      var opacity = Math.max(0, 1 - sy / 400);
      heroInner.style.transform = 'translateY(' + (sy * 0.2) + 'px)';
      heroInner.style.opacity = opacity;
    }
    if (cosmos) {
      var cosmosOpacity = Math.max(0, 1 - sy / 600);
      cosmos.style.opacity = cosmosOpacity;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

export function initReveal() {
  var elements = document.querySelectorAll('.reveal-up:not(.in)');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px'
  });

  elements.forEach(function(el) {
    observer.observe(el);
  });
}

export function initManifestoSplit(selector) {
  var el = document.querySelector(selector);
  if (!el) return;

  function wrapWords(node, counter) {
    var frag = document.createDocumentFragment();
    node.childNodes.forEach(function(child) {
      if (child.nodeType === 3) {
        child.textContent.split(/(\s+)/).forEach(function(token) {
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(token));
          } else if (token) {
            var sp = document.createElement('span');
            sp.className = 'word';
            sp.style.transitionDelay = (counter.i * 0.04) + 's';
            sp.textContent = token;
            counter.i++;
            frag.appendChild(sp);
          }
        });
      } else {
        var clone = child.cloneNode(false);
        clone.className = (clone.className ? clone.className + ' ' : '') + 'word';
        clone.style.transitionDelay = (counter.i * 0.04) + 's';
        counter.i++;
        frag.appendChild(clone);
      }
    });
    return frag;
  }

  var counter = { i: 0 };
  var frag = wrapWords(el, counter);
  el.innerHTML = '';
  el.appendChild(frag);

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.word').forEach(function(w) {
          w.classList.add('in');
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(el);
}

export function initHeroReveal() {
  var spans = document.querySelectorAll('.hero h1 .reveal');
  if (!spans.length) return;

  spans.forEach(function(span, i) {
    span.style.transform = 'translateY(110%)';
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    var delay = 0.15 + i * 0.12;
    setTimeout(function() {
      span.style.transition = 'transform 0.7s cubic-bezier(0.22,1,0.36,1)';
      span.style.transform = 'translateY(0)';
    }, delay * 1000);
  });
}

export function initLightbox(gridSelector) {
  var grid = document.querySelector(gridSelector);
  if (!grid) return;

  // Create lightbox overlay
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<div class="lightbox-inner"><img class="lightbox-img" src="" alt=""><button class="lightbox-close" aria-label="Close">&times;</button></div>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector('.lightbox-img');
  var lbClose = lb.querySelector('.lightbox-close');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
    // Clear src after transition to avoid flicker
    setTimeout(function() {
      if (!lb.classList.contains('active')) lbImg.src = '';
    }, 300);
  }

  grid.addEventListener('click', function(e) {
    var item = e.target.closest('.gallery-item');
    if (!item) return;
    var src = item.dataset.src || (item.querySelector('img') && item.querySelector('img').src);
    var alt = item.querySelector('.gallery-caption') ? item.querySelector('.gallery-caption').textContent : '';
    if (src) open(src, alt);
  });

  lb.addEventListener('click', function(e) {
    if (e.target === lb || e.target === lb.querySelector('.lightbox-inner')) {
      close();
    }
  });

  lbClose.addEventListener('click', close);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lb.classList.contains('active')) {
      close();
    }
  });
}

export function initAboutRocket(triggerSelector) {
  var el = document.querySelector(triggerSelector);
  if (!el) return;
  var fired = false;

  function fireRocket() {
    var r = document.createElement('div');
    r.className = 'rocket-shot';
    r.innerHTML =
      '<svg width="44" height="20" viewBox="0 0 44 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M42 10 L28 2 L22 10 L28 18 Z" fill="#cfe8ff"/>' +
        '<circle cx="33" cy="10" r="3.5" fill="#7fe3ff"/>' +
        '<path d="M22 7.5 L8 10 L22 12.5 Z" fill="url(#rf)"/>' +
        '<defs><linearGradient id="rf" x1="22" y1="10" x2="8" y2="10" gradientUnits="userSpaceOnUse">' +
          '<stop offset="0" stop-color="#7fe3ff" stop-opacity="1"/>' +
          '<stop offset="1" stop-color="#3d8bff" stop-opacity="0"/>' +
        '</linearGradient></defs>' +
      '</svg>';
    document.body.appendChild(r);
    r.addEventListener('animationend', function() { r.remove(); });
  }

  function check() {
    if (fired) return;
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      fired = true;
      window.removeEventListener('scroll', check);
      fireRocket();
    }
  }

  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('load', check);
}

export function initAboutHeadline(selector) {
  var el = document.querySelector(selector);
  if (!el) return;

  // Split into word spans, preserving <br>
  var html = el.innerHTML;
  var parts = html.split(/(<br\s*\/?>)/gi);
  el.innerHTML = parts.map(function(part) {
    if (/^<br/i.test(part)) return part;
    return part.split(/(\s+)/).map(function(token) {
      if (/^\s+$/.test(token) || !token) return token;
      return '<span class="about-word">' + token + '</span>';
    }).join('');
  }).join('');

  var words = el.querySelectorAll('.about-word');
  words.forEach(function(w, i) {
    w.style.transitionDelay = (i * 0.08) + 's';
  });

  var fired = false;
  function trigger() {
    if (fired) return;
    fired = true;
    window.removeEventListener('scroll', onScroll);
    words.forEach(function(w) { w.classList.add('in'); });
  }
  function onScroll() {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) trigger();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
}

export function setYear(id) {
  var el = document.getElementById(id);
  if (el) el.textContent = new Date().getFullYear();
}
