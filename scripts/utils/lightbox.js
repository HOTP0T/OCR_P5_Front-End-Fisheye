/**
 * @fileoverview Handles the functionality for displaying a lightbox with media content (images or videos) and includes navigation controls to cycle through the media.
 */

console.log('🤖 ~ Hello from lightbox.js');

/**
 * Opens a lightbox for displaying media (image or video) and sets up navigation for cycling through media items.
 * @param {string} mediaSrc - The source URL of the media to display initially in the lightbox.
 */
function openLightbox(mediaSrc) {
  // Clear existing lightbox if present
  const existingOverlay = document.querySelector('.lightbox-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  // Create the overlay div for the lightbox
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';

  // Create the content div within the overlay
  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';

  // Determine if the media is an image or a video and create the appropriate element
  const mediaElement = mediaSrc.includes('.mp4') ? document.createElement('video') : document.createElement('img');
  if (mediaSrc.includes('.mp4')) {
    mediaElement.controls = true;
    const source = document.createElement('source');
    source.src = mediaSrc;
    mediaElement.appendChild(source);
  } else {
    mediaElement.src = mediaSrc;
  }

  // Create and set up the close button for the lightbox
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '<img src="./assets/icons/svgtopng/close-24px 1.png" class="close" alt="close-lightbox" />';
  closeBtn.className = 'lightbox-close';
  closeBtn.onclick = () => lightboxOverlay.remove();

  // Append the media element and close button to the lightbox content, and then the content to the overlay
  lightboxContent.appendChild(mediaElement);
  lightboxOverlay.appendChild(lightboxContent);
  lightboxOverlay.appendChild(closeBtn);

  // Append the overlay to the body and make it visible
  document.body.appendChild(lightboxOverlay);
  lightboxOverlay.style.display = 'flex';

  // Set up an event listener to close the lightbox when clicking outside the media content
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      lightboxOverlay.remove();
    }
  });

  // Fetch all media items for navigation and find the index of the current media item
  const mediaItems = Array.from(document.querySelectorAll('.photographer-image, .photographer-video'));
  let currentIndex = mediaItems.findIndex(item => item.src === mediaSrc || item.querySelector('source')?.src === mediaSrc);

  // Function to navigate to the next or previous media item
  const navigate = (direction) => {
    currentIndex += direction;
    if (currentIndex >= 0 && currentIndex < mediaItems.length) {
      const newMediaSrc = mediaItems[currentIndex].src || mediaItems[currentIndex].querySelector('source').src;
      openLightbox(newMediaSrc);
    }
  };

  // Create and append navigation arrows for cycling through media items
  ['left', 'right'].forEach(direction => {
    const arrow = document.createElement('span');
    arrow.className = `lightbox-arrow ${direction}`;
    arrow.innerHTML = direction === 'left' ? '<img src="./assets/icons/svgtopng/expand_more-24px 4.png" class="arrows" alt="left-lightbox" />' : '<img src="./assets/icons/svgtopng/expand_more-24px 5.png" class="arrows" alt="right-lightbox" />';
    arrow.onclick = () => navigate(direction === 'left' ? -1 : 1);
    lightboxContent.appendChild(arrow);
  });
}

// Set up an event listener for DOMContentLoaded to add click event listeners to media items for opening the lightbox
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
