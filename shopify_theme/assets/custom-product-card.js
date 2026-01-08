/**
 * Product Card - Color Switching & Drag Scroll
 *
 * Features:
 * - Color swatch switching (updates product image)
 * - Mobile drag scroll functionality
 * - Active state management for color swatches
 * - Smooth image transitions
 */

class ProductCardColorSwitcher {
  constructor(card) {
    this.card = card;
    this.mainImage = card.querySelector('[data-product-main-image]');
    this.swatches = Array.from(card.querySelectorAll('[data-color-swatch]'));

    if (!this.mainImage || this.swatches.length === 0) {
      return;
    }

    this.currentSwatchIndex = 0;
    this.init();
  }

  init() {
    // Set up click handlers for color swatches
    this.swatches.forEach((swatch, index) => {
      swatch.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchColor(index);
      });
    });
  }

  switchColor(index) {
    if (index === this.currentSwatchIndex || index < 0 || index >= this.swatches.length) {
      return;
    }

    const newSwatch = this.swatches[index];
    const newImageUrl = newSwatch.dataset.imageUrl;

    if (!newImageUrl) {
      return;
    }

    // Update image with fade transition
    this.mainImage.style.opacity = '0.5';

    setTimeout(() => {
      this.mainImage.src = newImageUrl;
      this.mainImage.style.opacity = '1';
    }, 150);

    // Update swatch states
    this.updateSwatchStates(index);
    this.currentSwatchIndex = index;
  }

  updateSwatchStates(activeIndex) {
    this.swatches.forEach((swatch, index) => {
      if (index === activeIndex) {
        // Active state
        swatch.classList.add('scale-110', 'border-white', 'ring-2', 'ring-white/50');
        swatch.classList.remove('border-white/20', 'hover:scale-105');
      } else {
        // Inactive state
        swatch.classList.remove('scale-110', 'border-white', 'ring-2', 'ring-white/50');
        swatch.classList.add('border-white/20', 'hover:scale-105');
      }
    });
  }
}

class DragScrollContainer {
  constructor(container) {
    this.container = container;
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.isDesktop = window.innerWidth >= 1024;

    this.init();
  }

  init() {
    // Only enable drag scroll on mobile/tablet
    if (this.isDesktop) {
      this.container.style.cursor = 'default';
      return;
    }

    // Mouse events
    this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // Touch events (passive for better performance)
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });

    // Update on window resize
    window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth >= 1024;
      if (this.isDesktop) {
        this.container.style.cursor = 'default';
      } else {
        this.container.style.cursor = this.isDragging ? 'grabbing' : 'grab';
      }
    });
  }

  handleMouseDown(e) {
    if (this.isDesktop) return;

    this.isDragging = true;
    this.container.style.cursor = 'grabbing';
    this.container.style.scrollBehavior = 'auto';

    this.startX = e.pageX - this.container.offsetLeft;
    this.scrollLeft = this.container.scrollLeft;
  }

  handleMouseUp() {
    if (this.isDesktop) return;

    this.isDragging = false;
    this.container.style.cursor = 'grab';
    this.container.style.scrollBehavior = 'smooth';
  }

  handleMouseMove(e) {
    if (!this.isDragging || this.isDesktop) return;

    e.preventDefault();
    const x = e.pageX - this.container.offsetLeft;
    const walk = (x - this.startX) * 2; // Scroll speed multiplier
    this.container.scrollLeft = this.scrollLeft - walk;
  }

  handleTouchStart(e) {
    if (this.isDesktop) return;

    this.startX = e.touches[0].pageX - this.container.offsetLeft;
    this.scrollLeft = this.container.scrollLeft;
  }

  handleTouchEnd() {
    if (this.isDesktop) return;
    // Touch end is handled automatically by browser scroll
  }

  handleTouchMove(e) {
    if (this.isDesktop) return;

    const x = e.touches[0].pageX - this.container.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.container.scrollLeft = this.scrollLeft - walk;
  }
}

// Initialize all product cards on the page
function initProductCards() {
  const cards = document.querySelectorAll('[data-product-card]');
  cards.forEach(card => {
    new ProductCardColorSwitcher(card);
  });
}

// Initialize drag scroll containers
function initDragScroll() {
  const containers = document.querySelectorAll('[data-drag-scroll]');
  containers.forEach(container => {
    new DragScrollContainer(container);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initProductCards();
    initDragScroll();
  });
} else {
  initProductCards();
  initDragScroll();
}

// Reinitialize on Shopify section events (theme editor)
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target;

    // Reinitialize product cards in this section
    const cards = section.querySelectorAll('[data-product-card]');
    cards.forEach(card => {
      new ProductCardColorSwitcher(card);
    });

    // Reinitialize drag scroll
    const containers = section.querySelectorAll('[data-drag-scroll]');
    containers.forEach(container => {
      new DragScrollContainer(container);
    });
  });
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ProductCardColorSwitcher, DragScrollContainer };
}
