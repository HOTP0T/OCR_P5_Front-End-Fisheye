console.log('🤖 ~ Hello from lightbox.js');

// Function to open the lightbox
function openLightbox(mediaSrc) {
  // Clear existing lightbox if any
  const existingOverlay = document.querySelector('.lightbox-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';

  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';

  // Determine if media is image or video and create appropriate element
  const mediaElement = mediaSrc.includes('.mp4') ? document.createElement('video') : document.createElement('img');
  if (mediaSrc.includes('.mp4')) {
    mediaElement.controls = true;
    const source = document.createElement('source');
    source.src = mediaSrc;
    mediaElement.appendChild(source);
  } else {
    mediaElement.src = mediaSrc;
  }

  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.className = 'lightbox-close';
  closeBtn.onclick = () => lightboxOverlay.remove();

  lightboxContent.appendChild(mediaElement);
  lightboxOverlay.appendChild(lightboxContent);
  lightboxOverlay.appendChild(closeBtn);

  document.body.appendChild(lightboxOverlay);
  lightboxOverlay.style.display = 'flex';

  // Close on outside click
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      lightboxOverlay.remove();
    }
  });

  // Implement navigation arrows
  const mediaItems = Array.from(document.querySelectorAll('.photographer-image, .photographer-video'));
  let currentIndex = mediaItems.findIndex(item => item.src === mediaSrc || item.querySelector('source')?.src === mediaSrc);

  const navigate = (direction) => {
    currentIndex += direction;
    if (currentIndex >= 0 && currentIndex < mediaItems.length) {
      const newMediaSrc = mediaItems[currentIndex].src || mediaItems[currentIndex].querySelector('source').src;
      openLightbox(newMediaSrc);
    }
  };

  // Create and append navigation arrows
  ['left', 'right'].forEach(direction => {
    const arrow = document.createElement('span');
    arrow.className = `lightbox-arrow ${direction}`;
    arrow.textContent = direction === 'left' ? '⬅' : '➡';
    arrow.onclick = () => navigate(direction === 'left' ? -1 : 1);
    lightboxContent.appendChild(arrow);
  });
}

// DOMContentLoaded listener moved to here if necessary
document.addEventListener('DOMContentLoaded', () => {
  const mediaContainer = document.getElementById('media-container');
  
  mediaContainer.addEventListener('click', (e) => {
    let targetElement = e.target.closest('.photographer-image, .photographer-video');
    if (!targetElement) return;

    let mediaSrc = targetElement.src || targetElement.querySelector('source')?.src;
    if (mediaSrc) {
      openLightbox(mediaSrc);
    }
  });
});
