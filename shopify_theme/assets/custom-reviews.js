/**
 * Reviews Custom - Navigation and Scroll Controller
 *
 * Features:
 * - Left/right navigation buttons
 * - Auto-hide buttons at scroll boundaries
 * - Smooth scroll behavior
 * - Works with drag scroll from custom-product-card.js
 */

class ReviewsNavigation {
  constructor(container) {
    this.container = container;
    this.scrollContainer = container.querySelector('[data-reviews-scroll]');
    this.leftButton = container.querySelector('[data-scroll-direction="left"]');
    this.rightButton = container.querySelector('[data-scroll-direction="right"]');

    if (!this.scrollContainer) {
      return;
    }

    this.scrollAmount = 400; // pixels to scroll per click
    this.init();
  }

  init() {
    // Set up button click handlers
    if (this.leftButton) {
      this.leftButton.addEventListener('click', () => {
        this.scrollLeft();
      });
    }

    if (this.rightButton) {
      this.rightButton.addEventListener('click', () => {
        this.scrollRight();
      });
    }

    // Set up scroll listener to show/hide buttons
    this.scrollContainer.addEventListener('scroll', () => {
      this.updateButtonVisibility();
    });

    // Initial button visibility check
    this.updateButtonVisibility();

    // Update on window resize
    window.addEventListener('resize', () => {
      this.updateButtonVisibility();
    });
  }

  scrollLeft() {
    this.scrollContainer.scrollBy({
      left: -this.scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.scrollContainer.scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

  updateButtonVisibility() {
    const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;

    // Check if can scroll left
    const canScrollLeft = scrollLeft > 10;

    // Check if can scroll right
    const canScrollRight = scrollLeft < scrollWidth - clientWidth - 20;

    // Update button visibility
    if (this.leftButton) {
      if (canScrollLeft) {
        this.leftButton.style.opacity = '1';
        this.leftButton.style.pointerEvents = 'auto';
      } else {
        this.leftButton.style.opacity = '0';
        this.leftButton.style.pointerEvents = 'none';
      }
    }

    if (this.rightButton) {
      if (canScrollRight) {
        this.rightButton.style.opacity = '1';
        this.rightButton.style.pointerEvents = 'auto';
      } else {
        this.rightButton.style.opacity = '0';
        this.rightButton.style.pointerEvents = 'none';
      }
    }
  }
}

// Initialize all review sections on the page
function initReviewsNavigation() {
  const containers = document.querySelectorAll('[data-reviews-container]');
  containers.forEach(container => {
    new ReviewsNavigation(container);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewsNavigation);
} else {
  initReviewsNavigation();
}

// Reinitialize on Shopify section events (theme editor)
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const containers = event.target.querySelectorAll('[data-reviews-container]');
    containers.forEach(container => {
      new ReviewsNavigation(container);
    });
  });
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ReviewsNavigation;
}
