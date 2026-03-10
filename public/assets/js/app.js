/* ============================================================
   app.js — Global App Initialization
   Runs after all components and scripts are loaded.
   ============================================================ */

(function () {
  /* Wait for components to be injected (loader uses fetch, which is async) */
  var INIT_DELAY = 800; // ms — adjust if components are slow to load

  setTimeout(function () {

    /* 1) Apply CSS custom property theme overrides */
    try {
      var root = document.documentElement;
      root.style.setProperty('--primary',       '#FF6B00');
      root.style.setProperty('--primary-light', '#FF9E44');
      root.style.setProperty('--primary-dark',  '#E25D00');
      root.style.setProperty('--secondary',     '#FFC107');
      root.style.setProperty('--dark',          '#2D2D2D');
    } catch (e) {
      console.warn('Failed to set theme CSS vars:', e);
    }

    /* 2) Initialize particles.js (hero background) */
    if (window.particlesJS) {
      try {
        particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#FF6B00' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#FF9E44',
              opacity: 0.38,
              width: 1
            },
            move: { enable: true, speed: 4, out_mode: 'out' }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: true, mode: 'push' },
              resize: true
            },
            modes: {
              grab: { distance: 140, line_linked: { opacity: 1 } },
              push: { particles_nb: 4 }
            }
          },
          retina_detect: true
        });
      } catch (e) {
        console.warn('particles.js init failed:', e);
      }
    }

    /* 3) Initialize AOS (scroll animations) */
    if (window.AOS) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
      });
    }

    /* 4) Initialize slider if defined */
    if (typeof initSlider === 'function') {
      initSlider();
    }

  }, INIT_DELAY);

})();