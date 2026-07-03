/* ============================================
   Footer Runtime Timer
   Updates the timer capsule in footer
   ============================================ */
(function () {
  'use strict';

  var SINCE = new Date('2026-05-06T00:00:00').getTime();
  var timerEl = document.getElementById('footer-timer-text');
  if (!timerEl) return;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function updateTimer() {
    var now = Date.now();
    var diff = Math.max(0, now - SINCE);
    var totalSec = Math.floor(diff / 1000);
    var totalMin = Math.floor(totalSec / 60);
    var totalHr  = Math.floor(totalMin / 60);
    var totalDay = Math.floor(totalHr / 24);
    var years = Math.floor(totalDay / 365);
    var days = totalDay % 365;
    var hrs = totalHr % 24;
    var mins = totalMin % 60;
    var secs = totalSec % 60;
    var text = (years > 0 ? years + 'Y ' : '') + days + 'D ' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
    timerEl.textContent = text;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
})();
