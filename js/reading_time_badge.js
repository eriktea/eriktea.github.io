<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script>/* ============================================
   Reading Time Badge
   Adds a sky-blue pill badge with reading time
   next to the post title on article pages
   ============================================ */
(function () {
  'use strict';

  // Find the min2read element in post meta
  var min2readEl = document.querySelector('#post-meta .post-meta-wordcount span:last-child');
  if (!min2readEl) return;

  var readingTime = min2readEl.textContent.trim();
  if (!readingTime) return;

  // Find the post title
  var postTitle = document.querySelector('#post-info .post-title');
  if (!postTitle) return;

  // Create badge
  var badge = document.createElement('span');
  badge.className = 'reading-time-badge';
  badge.innerHTML = '<i class="far fa-clock fa-fw"></i> ' + readingTime;
  badge.style.cssText = 'display:inline-flex;align-items:center;gap:4px;margin-left:10px;padding:2px 10px;border-radius:20px;font-size:0.75em;font-weight:500;background:rgba(73,177,245,0.1);color:#49b1f5;border:1px solid rgba(73,177,245,0.2);white-space:nowrap;vertical-align:middle;';

  postTitle.appendChild(badge);
})();
