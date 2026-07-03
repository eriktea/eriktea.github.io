<link rel="stylesheet" class="aplayer-secondary-style-marker" href="\assets\css\APlayer.min.css"><script src="\assets\js\APlayer.min.js" class="aplayer-secondary-script-marker"></script>/* ============================================
   Reading Progress Bar + Scroll Percent
   Creates top progress bar and updates go-up button percent
   ============================================ */
(function () {
  'use strict';

  // --- Progress bar ---
  var bar = document.createElement('div');
  bar.id = 'reading-progress-bar';
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:3px;z-index:99999;pointer-events:none;';
  document.body.appendChild(bar);

  var fillEl = document.createElement('div');
  fillEl.style.cssText = 'height:100%;width:0%;background:#49b1f5;border-radius:0 2px 2px 0;transition:width 0.1s linear;box-shadow:0 0 8px rgba(73,177,245,0.4);';
  bar.appendChild(fillEl);

  function updateProgress() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fillEl.style.width = progress + '%';
  }

  // --- Scroll percent on go-up button ---
  var goUpBtn = document.querySelector('#go-up');
  if (goUpBtn) {
    var scrollPercentEl = goUpBtn.querySelector('.scroll-percent');
    if (!scrollPercentEl) {
      scrollPercentEl = document.createElement('span');
      scrollPercentEl.className = 'scroll-percent';
      scrollPercentEl.style.cssText = 'font-size:11px;font-weight:600;line-height:1;';
      goUpBtn.appendChild(scrollPercentEl);
    }
    scrollPercentEl.textContent = '0%';

    var arrowIcon = goUpBtn.querySelector('i');
    if (arrowIcon) arrowIcon.style.display = 'none';

    function updateBtnPercent() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      scrollPercentEl.textContent = pct + '%';
    }
    window.addEventListener('scroll', function () {
      requestAnimationFrame(function () {
        updateProgress();
        updateBtnPercent();
      });
    }, { passive: true });
  } else {
    window.addEventListener('scroll', function () {
      requestAnimationFrame(updateProgress);
    }, { passive: true });
  }

  updateProgress();
  window.addEventListener('resize', updateProgress);
})();
