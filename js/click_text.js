<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script>/* ============================================
   Click Show Text Effect
   鼠标点击时显示随机文字
   ============================================ */

(function () {
  'use strict';

  var texts = ['加油！', '优秀！', '真棒！', '不错哦~', '继续！', '厉害！', '棒棒哒', '666', 'Nice!', '💪', '✨', '🌟'];

  function showText(x, y) {
    var text = document.createElement('div');
    text.className = 'click-show-text';
    text.textContent = texts[Math.floor(Math.random() * texts.length)];
    text.style.left = x + 'px';
    text.style.top = y + 'px';
    document.body.appendChild(text);

    setTimeout(function () {
      document.body.removeChild(text);
    }, 1500);
  }

  document.addEventListener('click', function (e) {
    showText(e.clientX, e.clientY);
  });
})();
