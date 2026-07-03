/* ============================================
   Essay / Mood Page
   Renders daily-style timeline from inline data
   ============================================ */

(function () {
  'use strict';

  var essays = window.__essays || [];

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function renderEntry(entry, index) {
    var html = '<div class="essay-entry" style="animation-delay:' + (index * 0.08) + 's">';
    html += '  <div class="essay-card">';

    // Meta line
    html += '    <div class="essay-meta">';
    if (entry.date) {
      html += '      <span class="essay-date"><i class="far fa-calendar-alt"></i> ' + formatDate(entry.date) + '</span>';
    }
    if (entry.from) {
      html += '      <span class="essay-from">' + escapeHtml(entry.from) + '</span>';
    }
    if (entry.address) {
      html += '      <span class="essay-address"><i class="fas fa-map-marker-alt"></i> ' + escapeHtml(entry.address) + '</span>';
    }
    html += '    </div>';

    // Content
    if (entry.content) {
      html += '    <div class="essay-content">' + escapeHtml(entry.content) + '</div>';
    }

    // Images
    if (entry.image && entry.image.length > 0) {
      html += '    <div class="essay-images">';
      entry.image.forEach(function (img) {
        html += '      <img src="' + img + '" alt="essay image" onclick="window.open(\'' + img + '\')" loading="lazy">';
      });
      html += '    </div>';
    }

    // Link
    if (entry.link) {
      html += '    <a class="essay-link" href="' + entry.link + '" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> 查看原文</a>';
    }

    html += '  </div>';
    html += '</div>';
    return html;
  }

  function render() {
    var container = document.getElementById('essay-container');
    if (!container) return;

    if (essays.length === 0) {
      container.innerHTML = '<div class="essay-empty">暂无碎碎念 ✨</div>';
      return;
    }

    var html = '<div class="essay-timeline">';
    essays.forEach(function (entry, i) {
      html += renderEntry(entry, i);
    });
    html += '</div>';
    container.innerHTML = html;
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
