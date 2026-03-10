/* ============================================================
   loader.js — Dynamically loads HTML components into containers
   ============================================================ */

/**
 * Fetches an HTML component file and injects it into a container element.
 * @param {string} id       - The container element ID
 * @param {string} file     - The component filename inside ./components/
 * @param {Function} [callback] - Optional callback after injection
 */
function loadComponent(id, file, callback) {
  fetch('./components/' + file)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status + ' loading ' + file);
      return res.text();
    })
    .then(function (html) {
      var container = document.getElementById(id);
      if (container) {
        container.innerHTML = html;
      } else {
        console.warn('Container not found: #' + id);
      }
      if (typeof callback === 'function') callback();
    })
    .catch(function (err) {
      console.error('Component load error [' + file + ']:', err);
    });
}

/* ── Load header separately to apply z-index fix immediately ── */
fetch('./components/header.html')
  .then(function (res) { return res.text(); })
  .then(function (html) {
    var container = document.getElementById('header-container');
    if (container) container.innerHTML = html;

    var header = document.getElementById('header');
    if (header) {
      header.style.zIndex = '200';
      header.style.background = 'transparent';
    }
  })
  .catch(function (err) { console.error('Header load error:', err); });

/* ── Load all other components ── */
loadComponent('hero-container',       'hero.html');
loadComponent('services-container',   'services.html');
loadComponent('newsection-container', 'newsection.html');
loadComponent('products-container',   'products.html');
loadComponent('founders-container',   'founders.html');
loadComponent('reviews-container',    'reviews.html', function () {
  if (typeof initReviews === 'function') initReviews();
});
loadComponent('contact-container',    'contact.html');
loadComponent('footer-container',     'footer.html');
loadComponent('ad-container',         'ad-banner.html');