/* ============================================================
   ad-banner.js — EZCirkit Floating Ad Banner Logic
   Auto-dismisses after 20 s of inactivity; pauses on hover.
   ============================================================ */

(function () {
  /* Wait for the ad component to be injected into the DOM */
  var checkInterval = setInterval(function () {
    var ad = document.getElementById('ezcirkit-ad');
    if (!ad) return;

    clearInterval(checkInterval);

    /* Auto-dismiss after 20 seconds when the user is not hovering */
    var dismissTimer = setTimeout(dismiss, 20000);

    ad.addEventListener('mouseenter', function () {
      clearTimeout(dismissTimer);
    });

    ad.addEventListener('mouseleave', function () {
      dismissTimer = setTimeout(dismiss, 20000);
    });

    function dismiss() {
      ad.classList.add('ad-gone');
      setTimeout(function () {
        if (ad.parentNode) ad.remove();
      }, 420);
    }

  }, 100);
})();