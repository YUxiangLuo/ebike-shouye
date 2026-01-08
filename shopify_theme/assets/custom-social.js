/**
 * Social Family Custom - Gallery Controller
 *
 * Features:
 * - Center-focused scaling effect
 * - Navigation buttons
 * - Expand/collapse product panels
 * - Quick add to cart (Shopify Ajax API)
 * - Drag scroll support
 */

class SocialGallery {
  constructor(container) {
    this.container = container;
    this.scrollContainer = container.querySelector('[data-social-scroll]');
    this.moments = Array.from(container.querySelectorAll('.social-moment'));
    this.leftButton = container.querySelector('[data-scroll-direction="left"]');
    this.rightButton = container.querySelector('[data-scroll-direction="right"]');

    if (!this.scrollContainer) {
      return;
    }

    this.init();
  }

  init() {
    // Set up scaling on scroll
    this.scrollContainer.addEventListener('scroll', () => {
      this.updateScales();
    }, { passive: true });

    // Set up navigation buttons
    if (this.leftButton) {
      this.leftButton.addEventListener('click', () => this.scrollLeft());
    }

    if (this.rightButton) {
      this.rightButton.addEventListener('click', () => this.scrollRight());
    }

    // Set up expand/collapse buttons
    this.setupExpandButtons();

    // Set up quick add buttons
    this.setupQuickAddButtons();

    // Initial scale update
    setTimeout(() => this.updateScales(), 100);

    // Update on window resize
    window.addEventListener('resize', () => {
      this.updateScales();
    });
  }

  updateScales() {
    const containerRect = this.scrollContainer.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const isMobile = window.innerWidth < 768;

    this.moments.forEach((moment) => {
      const momentRect = moment.getBoundingClientRect();
      const momentCenter = momentRect.left + momentRect.width / 2;
      const distanceFromCenter = Math.abs(momentCenter - containerCenter);

      // Calculate scale based on distance from center
      let scale;
      if (isMobile) {
        const threshold = containerRect.width / 1.4;
        const normalizedDist = Math.min(distanceFromCenter / threshold, 1);
        scale = 1 - (normalizedDist * 0.18); // 0.82 to 1.0
      } else {
        const threshold = containerRect.width / 2.5;
        const normalizedDist = Math.min(distanceFromCenter / threshold, 1);
        scale = 1 - (normalizedDist * 0.04); // 0.96 to 1.0
      }

      // Apply scale and opacity
      moment.style.transform = `scale(${scale})`;
      moment.style.opacity = scale > 0.9 ? 1 : 0.8;
    });
  }

  scrollLeft() {
    const scrollAmount = window.innerWidth < 768 ? 300 : 500;
    this.scrollContainer.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const scrollAmount = window.innerWidth < 768 ? 300 : 500;
    this.scrollContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  setupExpandButtons() {
    const expandButtons = this.container.querySelectorAll('.expand-btn');
    const closeButtons = this.container.querySelectorAll('.close-expand-btn');

    expandButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = button.dataset.expandTarget;
        const panel = document.getElementById(targetId);

        if (panel) {
          // Close any other open panels
          this.closeAllPanels();

          // Open this panel
          panel.style.transform = 'translateY(0)';
          panel.style.opacity = '1';
          button.classList.add('rotate-180', 'bg-gray-100');
        }
      });
    });

    closeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeAllPanels();
      });
    });

    // Close on panel click (background)
    const panels = this.container.querySelectorAll('.expand-panel');
    panels.forEach(panel => {
      panel.addEventListener('click', (e) => {
        if (e.target === panel) {
          this.closeAllPanels();
        }
      });
    });
  }

  closeAllPanels() {
    const panels = this.container.querySelectorAll('.expand-panel');
    const expandButtons = this.container.querySelectorAll('.expand-btn');

    panels.forEach(panel => {
      panel.style.transform = 'translateY(100%)';
      panel.style.opacity = '0';
    });

    expandButtons.forEach(button => {
      button.classList.remove('rotate-180', 'bg-gray-100');
    });
  }

  setupQuickAddButtons() {
    const quickAddButtons = this.container.querySelectorAll('.quick-add-btn');

    quickAddButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.stopPropagation();
        const variantId = button.dataset.productId;

        if (!variantId) {
          return;
        }

        // Disable button during request
        button.disabled = true;
        const originalHTML = button.innerHTML;

        // Show loading state
        button.innerHTML = '<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';

        try {
          // Add to cart via Shopify Ajax API
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: variantId,
              quantity: 1
            })
          });

          if (response.ok) {
            // Show success feedback
            button.innerHTML = '<svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

            // Trigger cart update event (if theme listens to it)
            document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
              bubbles: true
            }));

            // Reset after delay
            setTimeout(() => {
              button.innerHTML = originalHTML;
              button.disabled = false;
            }, 1500);
          } else {
            throw new Error('Failed to add to cart');
          }
        } catch (error) {
          console.error('Quick add error:', error);

          // Show error feedback
          button.innerHTML = '<svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

          // Reset after delay
          setTimeout(() => {
            button.innerHTML = originalHTML;
            button.disabled = false;
          }, 1500);
        }
      });
    });
  }
}

// Initialize all social gallery sections
function initSocialGallery() {
  const containers = document.querySelectorAll('[data-social-family]');
  containers.forEach(container => {
    new SocialGallery(container);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSocialGallery);
} else {
  initSocialGallery();
}

// Reinitialize on Shopify section events (theme editor)
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const containers = event.target.querySelectorAll('[data-social-family]');
    containers.forEach(container => {
      new SocialGallery(container);
    });
  });
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SocialGallery;
}
