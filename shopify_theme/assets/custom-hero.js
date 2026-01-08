/**
 * Hero Banner Custom - Carousel Logic
 *
 * Features:
 * - Auto-rotation with configurable speed
 * - Pause on hover/focus
 * - Thumbnail navigation
 * - Progress indicator navigation
 * - Keyboard navigation (Arrow keys)
 * - Touch/swipe support (basic)
 * - Accessible (ARIA attributes)
 */

class HeroBannerCustom {
  constructor(element) {
    this.banner = element;
    this.slider = this.banner.querySelector('.hero-banner-custom__slider');
    this.slides = Array.from(this.slider.querySelectorAll('.hero-banner-custom__slide'));
    this.thumbnails = Array.from(this.banner.querySelectorAll('.hero-banner-custom__thumbnail'));
    this.indicators = Array.from(this.banner.querySelectorAll('.hero-banner-custom__indicator'));

    // Settings from data attributes
    this.autoplay = this.banner.dataset.autoplay === 'true';
    this.speed = parseInt(this.banner.dataset.speed, 10) || 5000;

    // State
    this.currentIndex = 0;
    this.isPlaying = this.autoplay;
    this.interval = null;
    this.isPaused = false;

    // Touch/swipe state
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (this.slides.length <= 1) {
      // No need for carousel functionality with only one slide
      return;
    }

    this.setupEventListeners();
    this.setupAccessibility();

    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  setupEventListeners() {
    // Thumbnail clicks
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        this.goToSlide(index);
        this.pauseAutoplay();
      });
    });

    // Indicator clicks
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
        this.pauseAutoplay();
      });
    });

    // Pause on hover
    this.banner.addEventListener('mouseenter', () => {
      this.pauseAutoplay();
    });

    this.banner.addEventListener('mouseleave', () => {
      this.resumeAutoplay();
    });

    // Pause on focus (accessibility)
    this.banner.addEventListener('focusin', () => {
      this.pauseAutoplay();
    });

    this.banner.addEventListener('focusout', () => {
      this.resumeAutoplay();
    });

    // Keyboard navigation
    this.banner.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.previousSlide();
        this.pauseAutoplay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSlide();
        this.pauseAutoplay();
      }
    });

    // Touch/swipe support
    this.slider.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.slider.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Pause autoplay when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoplay();
      } else {
        this.resumeAutoplay();
      }
    });
  }

  setupAccessibility() {
    // Add ARIA live region for slide announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'custom-visually-hidden';
    liveRegion.id = `hero-banner-live-${this.banner.id}`;
    this.banner.appendChild(liveRegion);
    this.liveRegion = liveRegion;

    // Set initial ARIA attributes
    this.slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.slides.length}`);
      slide.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
    });
  }

  goToSlide(index) {
    if (index === this.currentIndex || index < 0 || index >= this.slides.length) {
      return;
    }

    // Update slide visibility
    this.slides[this.currentIndex].classList.remove('hero-banner-custom__slide--active');
    this.slides[this.currentIndex].setAttribute('aria-hidden', 'true');

    this.slides[index].classList.add('hero-banner-custom__slide--active');
    this.slides[index].setAttribute('aria-hidden', 'false');

    // Update thumbnail states
    if (this.thumbnails.length > 0) {
      this.thumbnails[this.currentIndex].classList.remove('hero-banner-custom__thumbnail--active');
      this.thumbnails[index].classList.add('hero-banner-custom__thumbnail--active');
    }

    // Update indicator states
    if (this.indicators.length > 0) {
      this.indicators[this.currentIndex].classList.remove('hero-banner-custom__indicator--active');
      this.indicators[index].classList.add('hero-banner-custom__indicator--active');
    }

    // Announce slide change to screen readers
    const slideTitle = this.slides[index].querySelector('.hero-banner-custom__title');
    if (this.liveRegion && slideTitle) {
      this.liveRegion.textContent = `Slide ${index + 1} of ${this.slides.length}: ${slideTitle.textContent}`;
    }

    this.currentIndex = index;
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next slide
        this.nextSlide();
      } else {
        // Swiped right - go to previous slide
        this.previousSlide();
      }
      this.pauseAutoplay();
    }
  }

  startAutoplay() {
    if (!this.autoplay || this.interval) {
      return;
    }

    this.interval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, this.speed);

    this.isPlaying = true;
  }

  stopAutoplay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isPlaying = false;
  }

  pauseAutoplay() {
    this.isPaused = true;
  }

  resumeAutoplay() {
    if (this.autoplay && this.isPlaying) {
      this.isPaused = false;
    }
  }

  destroy() {
    this.stopAutoplay();
    // Remove event listeners if needed for cleanup
  }
}

// Initialize all hero banners on the page
function initHeroBanners() {
  const heroBanners = document.querySelectorAll('[data-hero-banner]');

  heroBanners.forEach((banner) => {
    new HeroBannerCustom(banner);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroBanners);
} else {
  initHeroBanners();
}

// Reinitialize on Shopify section events (theme editor)
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const banner = event.target.querySelector('[data-hero-banner]');
    if (banner) {
      new HeroBannerCustom(banner);
    }
  });
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeroBannerCustom;
}
