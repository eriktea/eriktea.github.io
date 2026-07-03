/* ============================================
   Pinned Post Carousel
   Scans homepage for sticky/pinned posts and
   replaces them with an interactive carousel
   ============================================ */

(function () {
  'use strict';

  const CONFIG = {
    interval: 5000,
    fadeDuration: 600,
    maxSlides: 4
  };

  function initPinnedCarousel() {
    // Only run on homepage
    if (!document.querySelector('#recent-posts')) return;

    const recentPosts = document.getElementById('recent-posts');
    if (!recentPosts) return;

    // Find all pinned post items (those with the sticky thumbtack icon)
    const allItems = recentPosts.querySelectorAll('.recent-post-item');
    const pinnedItems = [];

    allItems.forEach(item => {
      const stickyIcon = item.querySelector('.sticky');
      if (stickyIcon) {
        pinnedItems.push(item);
      }
    });

    if (pinnedItems.length === 0) return;

    // Limit to maxSlides
    const slides = pinnedItems.slice(0, CONFIG.maxSlides);
    if (slides.length === 0) return;

    // Extract data from each pinned post
    const slideData = slides.map(item => {
      const titleEl = item.querySelector('.article-title');
      const coverImg = item.querySelector('.post_cover img.post-bg');
      const coverDiv = item.querySelector('.post_cover div.post-bg');
      const dateEl = item.querySelector('.post-meta-date-created, .post-meta-date');
      const categoryEl = item.querySelector('.article-meta__categories');
      const tagEls = item.querySelectorAll('.article-meta__tags');
      const excerptEl = item.querySelector('.content');
      const linkEl = titleEl ? titleEl.querySelector('a') : null;

      const title = titleEl ? titleEl.textContent.trim() : '';
      const link = linkEl ? linkEl.getAttribute('href') : '#';
      const stickyIconHTML = item.querySelector('.sticky') ? item.querySelector('.sticky').outerHTML : '';

      // Cover image
      let coverHTML = '';
      if (coverImg) {
        coverHTML = `<img src="${coverImg.src}" alt="${title}" loading="eager">`;
      } else if (coverDiv) {
        const bg = coverDiv.getAttribute('style') || '';
        const match = bg.match(/background:\s*([^;]+)/);
        if (match) {
          coverHTML = `<div style="width:100%;height:100%;background:${match[1]};background-size:cover;background-position:center;"></div>`;
        }
      }

      // Date
      const dateText = dateEl ? dateEl.textContent.trim() : '';

      // Categories
      const catText = categoryEl ? categoryEl.textContent.trim() : '';

      // Tags
      const tags = Array.from(tagEls).map(t => t.textContent.trim()).filter(Boolean);
      const tagsText = tags.slice(0, 3).join(' · ');

      // Excerpt
      const excerpt = excerptEl ? excerptEl.textContent.trim() : '';
      const shortExcerpt = excerpt.length > 100 ? excerpt.substring(0, 100) + '...' : excerpt;

      return {
        title,
        link,
        coverHTML,
        dateText,
        catText,
        tagsText,
        excerpt: shortExcerpt,
        stickyHTML: stickyIconHTML
      };
    });

    // Remove pinned items from DOM
    slides.forEach(item => item.remove());

    // Build carousel HTML
    const slidesHTML = slideData.map((data, i) => `
      <div class="carousel-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
        <div class="slide-inner">
          <div class="slide-cover">
            <a href="${data.link}" title="${data.title}">
              ${data.coverHTML || '<div style="width:100%;height:100%;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>'}
            </a>
          </div>
          <div class="slide-content">
            <div class="pin-badge">
              ${data.stickyHTML || '<i class="fas fa-thumbtack"></i> 置顶'}
            </div>
            <h3 class="slide-title">
              <a href="${data.link}">${data.title}</a>
            </h3>
            <div class="slide-excerpt">${data.excerpt || '点击查看详情...'}</div>
            <div class="slide-meta">
              ${data.catText ? `<span><i class="far fa-folder"></i> ${data.catText}</span>` : ''}
              ${data.tagsText ? `<span><i class="fas fa-tag"></i> ${data.tagsText}</span>` : ''}
              ${data.dateText ? `<span><i class="far fa-calendar"></i> ${data.dateText}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    const carouselHTML = `
      <div class="pinned-carousel" id="pinned-carousel">
        <div class="carousel-progress" id="carousel-progress"></div>
        ${slidesHTML}
        <div class="carousel-dots" id="carousel-dots">
          ${slideData.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('')}
        </div>
        <div class="carousel-controls">
          <button class="ctrl-btn prev" id="carousel-prev" aria-label="Previous">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="ctrl-btn next" id="carousel-next" aria-label="Next">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    `;

    // Insert carousel before the first remaining post item
    const firstRemaining = recentPosts.querySelector('.recent-post-item:not(.removed)');
    if (firstRemaining) {
      firstRemaining.insertAdjacentHTML('beforebegin', carouselHTML);
    } else {
      recentPosts.insertAdjacentHTML('beforeend', carouselHTML);
    }

    // Carousel logic
    const container = document.getElementById('pinned-carousel');
    const slideEls = container.querySelectorAll('.carousel-slide');
    const dots = container.querySelectorAll('.dot');
    const progressBar = document.getElementById('carousel-progress');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    let current = 0;
    let timer = null;
    let isPaused = false;
    let isTransitioning = false;

    function goTo(index) {
      if (isTransitioning || index === current) return;
      isTransitioning = true;

      // Wrap around
      if (index < 0) index = slideEls.length - 1;
      if (index >= slideEls.length) index = 0;

      slideEls[current].classList.remove('active');
      dots[current].classList.remove('active');

      current = index;

      slideEls[current].classList.add('active');
      dots[current].classList.add('active');

      setTimeout(() => {
        isTransitioning = false;
      }, CONFIG.fadeDuration);
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startTimer() {
      stopTimer();
      if (!isPaused) {
        // Animate progress bar
        progressBar.style.transition = `width ${CONFIG.interval}ms linear`;
        progressBar.style.width = '100%';
        // Force reflow to restart transition
        progressBar.offsetHeight;
        timer = setInterval(() => {
          next();
          resetProgressBar();
        }, CONFIG.interval);
      }
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
    }

    function resetProgressBar() {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      progressBar.offsetHeight;
      progressBar.style.transition = `width ${CONFIG.interval}ms linear`;
      progressBar.style.width = '100%';
    }

    function resetTimer() {
      stopTimer();
      resetProgressBar();
      startTimer();
    }

    // Button events
    prevBtn.addEventListener('click', () => { prev(); resetTimer(); });
    nextBtn.addEventListener('click', () => { next(); resetTimer(); });

    // Dot events
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.index));
        resetTimer();
      });
    });

    // Hover pause
    container.addEventListener('mouseenter', () => {
      isPaused = true;
      stopTimer();
    });
    container.addEventListener('mouseleave', () => {
      isPaused = false;
      resetProgressBar();
      startTimer();
    });

    // Touch swipe
    let touchStartX = 0;
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    container.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
        resetTimer();
      }
    }, { passive: true });

    // Keyboard
    document.addEventListener('keydown', (e) => {
      // Only when carousel is visible in viewport
      const rect = container.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
      if (e.key === 'ArrowRight') { next(); resetTimer(); }
    });

    // Pause on page hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopTimer();
      } else if (!isPaused) {
        resetProgressBar();
        startTimer();
      }
    });

    // Start
    resetProgressBar();
    startTimer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPinnedCarousel);
  } else {
    initPinnedCarousel();
  }
})();
