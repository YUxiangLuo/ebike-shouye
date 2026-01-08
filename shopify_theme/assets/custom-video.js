/**
 * Feature Video Custom - Video Player Controller
 *
 * Features:
 * - YouTube video player with iframe API
 * - Vimeo video player
 * - Self-hosted video player
 * - Play button overlay interaction
 * - Cover image removal on play
 */

class VideoPlayer {
  constructor(container) {
    this.container = container;
    this.player = container.querySelector('[data-video-player]');
    this.cover = container.querySelector('[data-video-cover]');

    if (!this.player) {
      return;
    }

    this.playerType = this.player.dataset.videoPlayer;
    this.videoId = this.player.dataset.videoId;
    this.autoplay = this.player.dataset.autoplay === 'true';
    this.loop = this.player.dataset.loop === 'true';
    this.muted = this.player.dataset.muted === 'true';

    this.init();
  }

  init() {
    if (this.playerType === 'youtube') {
      this.initYouTube();
    } else if (this.playerType === 'vimeo') {
      this.initVimeo();
    } else if (this.playerType === 'hosted') {
      this.initHosted();
    }
  }

  initYouTube() {
    // Set up cover click handler
    if (this.cover) {
      this.cover.addEventListener('click', () => {
        this.playYouTube();
      });
    } else if (this.autoplay) {
      // Auto-load if autoplay is enabled
      this.loadYouTubePlayer();
    }
  }

  playYouTube() {
    // Remove cover
    if (this.cover) {
      this.cover.style.opacity = '0';
      this.cover.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        this.cover.remove();
      }, 300);
    }

    // Load and play YouTube video
    this.loadYouTubePlayer();
  }

  loadYouTubePlayer() {
    const placeholder = this.player.querySelector('[data-youtube-placeholder]');
    if (!placeholder) return;

    // Build YouTube embed URL with parameters
    const params = new URLSearchParams({
      autoplay: '1',
      loop: this.loop ? '1' : '0',
      mute: this.muted ? '1' : '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1'
    });

    if (this.loop) {
      params.append('playlist', this.videoId);
    }

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${this.videoId}?${params.toString()}`;
    iframe.className = 'absolute inset-0 w-full h-full';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');

    // Replace placeholder with iframe
    placeholder.appendChild(iframe);
  }

  initVimeo() {
    const vimeoIframe = this.player.querySelector('[data-vimeo-iframe]');

    if (this.cover && vimeoIframe) {
      // Hide iframe initially if there's a cover
      vimeoIframe.style.opacity = '0';

      this.cover.addEventListener('click', () => {
        // Remove cover
        this.cover.style.opacity = '0';
        this.cover.style.transition = 'opacity 0.3s';
        setTimeout(() => {
          this.cover.remove();
        }, 300);

        // Show and play Vimeo video
        vimeoIframe.style.opacity = '1';
        vimeoIframe.style.transition = 'opacity 0.3s';

        // Update iframe src to trigger play
        const currentSrc = vimeoIframe.src;
        if (!currentSrc.includes('autoplay=1')) {
          vimeoIframe.src = currentSrc.replace('autoplay=0', 'autoplay=1').replace('autoplay=false', 'autoplay=1');
        }
      });
    }
  }

  initHosted() {
    const video = this.player.querySelector('[data-hosted-video]');

    if (this.cover && video) {
      // Hide video controls initially if there's a cover
      video.removeAttribute('controls');

      this.cover.addEventListener('click', () => {
        // Remove cover
        this.cover.style.opacity = '0';
        this.cover.style.transition = 'opacity 0.3s';
        setTimeout(() => {
          this.cover.remove();
        }, 300);

        // Show controls and play video
        video.setAttribute('controls', '');
        video.play().catch(error => {
          console.warn('Video play failed:', error);
        });
      });
    }
  }
}

// Initialize all video players on the page
function initVideoPlayers() {
  const containers = document.querySelectorAll('[data-video-container]');
  containers.forEach(container => {
    new VideoPlayer(container);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideoPlayers);
} else {
  initVideoPlayers();
}

// Reinitialize on Shopify section events (theme editor)
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const containers = event.target.querySelectorAll('[data-video-container]');
    containers.forEach(container => {
      new VideoPlayer(container);
    });
  });
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VideoPlayer;
}
