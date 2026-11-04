
// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

// Reveal sections as they enter the viewport
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(' ');
      card.hidden = filter !== 'all' && !categories.includes(filter);
    });
  });
});

// Load selected website homepage previews after the page has loaded
function loadWebsitePreviews() {
  const previewImages = document.querySelectorAll('img[data-preview-url]');

  previewImages.forEach((img, index) => {
    const primaryUrl = img.dataset.previewUrl;
    const fallbackUrl = img.dataset.fallbackUrl;

    // Try the fallback image if the primary preview fails
    img.addEventListener('error', function handlePreviewError() {
      img.removeEventListener('error', handlePreviewError);

      if (fallbackUrl && img.src !== fallbackUrl) {
        img.src = fallbackUrl;
      }
    });

    // Load previews one by one after a short delay
    setTimeout(() => {
      img.src = primaryUrl;
    }, index * 1200);
  });
}

// Wait for the entire page and its normal assets to finish loading
if (document.readyState === 'complete') {
  loadWebsitePreviews();
} else {
  window.addEventListener('load', loadWebsitePreviews, { once: true });
}

// Keep the footer year current
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}
