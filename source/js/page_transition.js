/* ============================================
   Page Transition Animation
   Adds fade effect on PJAX page transitions
   ============================================ */
(function () {
  'use strict';

  var body = document.body;

  // Fade out on page leave
  body.addEventListener('pjax:send', function () {
    body.classList.add('pjax-loading');
  });

  // Fade in on page arrive
  body.addEventListener('pjax:complete', function () {
    body.classList.remove('pjax-loading');
  });

  // Also handle regular link clicks (non-PJAX fallback)
  var links = document.querySelectorAll('a[href]');
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.indexOf('#') === 0) return; // skip anchor links
      if (href && href.indexOf('javascript:') === 0) return; // skip JS links
      if (link.target === '_blank') return; // skip external links

      // Let PJAX handle it if available
      if (typeof pjax !== 'undefined') return;

      // Fallback: simple fade
      body.style.opacity = '0.3';
      body.style.transition = 'opacity 0.15s ease';
      setTimeout(function () {
        body.style.opacity = '1';
      }, 150);
    });
  });
})();
