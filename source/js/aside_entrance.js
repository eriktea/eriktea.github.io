/* ============================================
   Sidebar Card Scroll Entrance Animation
   Cards fade/slide in as they enter viewport
   ============================================ */
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;

  var cards = document.querySelectorAll('#aside-content .card-widget');
  if (!cards.length) return;

  // Add initial hidden state
  cards.forEach(function (card, index) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease ' + (index * 0.06) + 's, transform 0.5s ease ' + (index * 0.06) + 's';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
  });

  cards.forEach(function (card) {
    observer.observe(card);
  });
})();
