/**
 * Global Custom Utilities
 *
 * Features:
 * - Enhanced image lazy loading with Intersection Observer
 * - Smooth scroll for anchor links
 * - Utility functions (debounce, throttle)
 * - Scroll-to-top button
 * - Mobile viewport height fix
 */

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Debounce function - limits the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, wait = 250) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - ensures a function is called at most once in a specified time period
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} The throttled function
 */
function throttle(func, limit = 250) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================================================
// Enhanced Image Lazy Loading
// ============================================================================

class LazyImageLoader {
  constructor() {
    this.images = [];
    this.observer = null;
    this.init();
  }

  init() {
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately
      this.loadAllImages();
      return;
    }

    // Create observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    // Observe all lazy images
    this.observeImages();
  }

  observeImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      if (this.observer) {
        this.observer.observe(img);
      }
    });
  }

  loadImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }

    if (img.dataset.srcset) {
      img.srcset = img.dataset.srcset;
      img.removeAttribute('data-srcset');
    }

    img.classList.add('loaded');
  }

  loadAllImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => this.loadImage(img));
  }
}

// ============================================================================
// Smooth Scroll for Anchor Links
// ============================================================================

class SmoothScrollAnchors {
  constructor() {
    this.init();
  }

  init() {
    // Find all anchor links that point to page sections
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Skip if it's just "#" or empty
        if (!href || href === '#' || href === '#!') {
          return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();

          // Calculate offset (account for fixed header if any)
          const header = document.querySelector('header[data-header]') || document.querySelector('sticky-header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });

          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }
}

// ============================================================================
// Scroll to Top Button
// ============================================================================

class ScrollToTop {
  constructor() {
    this.button = null;
    this.scrollThreshold = 400; // Show button after scrolling 400px
    this.init();
  }

  init() {
    this.createButton();
    this.attachEventListeners();
  }

  createButton() {
    // Check if button already exists
    if (document.querySelector('[data-scroll-to-top]')) {
      return;
    }

    // Create button
    this.button = document.createElement('button');
    this.button.setAttribute('data-scroll-to-top', '');
    this.button.setAttribute('aria-label', 'Scroll to top');
    this.button.className = 'fixed bottom-6 right-6 w-12 h-12 bg-[#004d43] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-[#003d35] transition-all duration-300 hover:scale-110 active:scale-95 z-50 opacity-0 pointer-events-none';

    this.button.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    `;

    document.body.appendChild(this.button);
  }

  attachEventListeners() {
    if (!this.button) return;

    // Show/hide button on scroll
    const handleScroll = throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > this.scrollThreshold) {
        this.button.style.opacity = '1';
        this.button.style.pointerEvents = 'auto';
      } else {
        this.button.style.opacity = '0';
        this.button.style.pointerEvents = 'none';
      }
    }, 150);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top on click
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}

// ============================================================================
// Mobile Viewport Height Fix
// ============================================================================

/**
 * Fix for mobile browsers where 100vh doesn't account for address bar
 * Sets a CSS custom property --vh that can be used instead of vh units
 */
class ViewportHeightFix {
  constructor() {
    this.init();
  }

  init() {
    this.setViewportHeight();

    // Update on resize (debounced)
    window.addEventListener(
      'resize',
      debounce(() => {
        this.setViewportHeight();
      }, 250),
      { passive: true }
    );

    // Update on orientation change
    window.addEventListener(
      'orientationchange',
      () => {
        setTimeout(() => {
          this.setViewportHeight();
        }, 100);
      },
      { passive: true }
    );
  }

  setViewportHeight() {
    // Calculate 1vh in pixels
    const vh = window.innerHeight * 0.01;
    // Set CSS custom property
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}

// ============================================================================
// Accessibility: Focus Visible Polyfill
// ============================================================================

/**
 * Adds 'focus-visible' class for keyboard navigation
 * Removes it for mouse/touch interactions
 */
class FocusVisiblePolyfill {
  constructor() {
    this.hadKeyboardEvent = false;
    this.init();
  }

  init() {
    // Track keyboard usage
    document.addEventListener('keydown', () => {
      this.hadKeyboardEvent = true;
    }, { passive: true });

    // Track mouse usage
    document.addEventListener('mousedown', () => {
      this.hadKeyboardEvent = false;
    }, { passive: true });

    // Add/remove focus-visible class
    document.addEventListener('focus', (e) => {
      if (this.hadKeyboardEvent) {
        e.target.classList.add('focus-visible');
      }
    }, true);

    document.addEventListener('blur', (e) => {
      e.target.classList.remove('focus-visible');
    }, true);
  }
}

// ============================================================================
// Performance: Preload Critical Images
// ============================================================================

/**
 * Preload critical images that are above the fold
 */
function preloadCriticalImages() {
  const criticalImages = document.querySelectorAll('[data-preload-image]');

  criticalImages.forEach((img) => {
    const src = img.dataset.preloadImage || img.src;

    if (src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;

      // Add to head
      document.head.appendChild(link);
    }
  });
}

// ============================================================================
// Initialize All Features
// ============================================================================

function initCustomGlobal() {
  // Enhanced image lazy loading
  new LazyImageLoader();

  // Smooth scroll for anchors
  new SmoothScrollAnchors();

  // Scroll to top button
  new ScrollToTop();

  // Mobile viewport height fix
  new ViewportHeightFix();

  // Focus visible polyfill
  new FocusVisiblePolyfill();

  // Preload critical images
  preloadCriticalImages();

  // Log initialization in development
  if (window.Shopify && window.Shopify.designMode) {
    console.log('✅ Custom Global Utilities Initialized');
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomGlobal);
} else {
  initCustomGlobal();
}

// Reinitialize on Shopify section events (theme editor)
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    // Reinitialize lazy loading for new images
    new LazyImageLoader();
  });
}

// Export utility functions for external use
if (typeof window !== 'undefined') {
  window.CustomUtils = {
    debounce,
    throttle,
  };
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    throttle,
    LazyImageLoader,
    SmoothScrollAnchors,
    ScrollToTop,
    ViewportHeightFix,
    FocusVisiblePolyfill,
  };
}
