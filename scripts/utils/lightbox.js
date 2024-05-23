/**
 * Opens a lightbox for displaying media (image or video) and sets up navigation for cycling through media items, along with displaying the media name.
 * @param {string} mediaSrc - The source URL of the media to display initially in the lightbox.
 * @param {string} mediaName - The name of the media to display.
 */
function openLightbox (mediaSrc) {
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
  mediaElement.className = 'lightbox-displayed-media';
  if (mediaSrc.includes('.mp4')) {
    mediaElement.controls = true;
    const source = document.createElement('source');
    source.src = mediaSrc;
    mediaElement.appendChild(source);
  } else {
    mediaElement.src = mediaSrc;
  }

  // ADDING THE MEDIA LABEL TO THE LIGHTBOX
  // Extracting the media name from the URL
  const mediaName = mediaSrc.split('/').pop().split('.')[0].replace(/[^a-zA-Z0-9]/g, ' '); // Replace special characters with spaces
  // Split the URL by '/', take the last part, and remove extension + remove special characters

  // Create a label for the media name
  const mediaLabel = document.createElement('div');
  mediaLabel.textContent = mediaName; // Use the extracted mediaName
  mediaLabel.className = 'media-label';

  // Create and set up the close button for the lightbox
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<img src="./assets/icons/svgtopng/close-24px 1.png" class="close" alt="close-lightbox" />';
  closeBtn.className = 'lightbox-close';
  closeBtn.onclick = () => lightboxOverlay.remove();

  // Function to close the lightbox
  const closeLightbox = () => {
    lightboxOverlay.remove();
    document.removeEventListener('keydown', handleEscapeKey); // Remove event listener for escape key
  };

  closeBtn.onclick = closeLightbox;

  // Append the media element and label to the lightbox content
  lightboxContent.appendChild(mediaElement);
  lightboxContent.appendChild(mediaLabel); // Append the label under the media
  lightboxOverlay.appendChild(lightboxContent);
  lightboxOverlay.appendChild(closeBtn);

  // Append the overlay to the body and make it visible
  document.body.appendChild(lightboxOverlay);
  lightboxOverlay.style.display = 'flex';

  // Set up an event listener to close the lightbox when clicking outside the media content
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });

  // Function to handle escape key press
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  // Add event listener for escape key
  document.addEventListener('keydown', handleEscapeKey);

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
    const arrow = document.createElement('button');
    arrow.tabIndex = 0;
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
    const targetElement = e.target.closest('.photographer-image, .photographer-video');
    if (!targetElement) return;

    const mediaSrc = targetElement.src || targetElement.querySelector('source')?.src;
    if (mediaSrc) {
      openLightbox(mediaSrc);
    }
  });

  mediaContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const targetElement = document.activeElement.closest('.photographer-image, .photographer-video');
      if (!targetElement) return;

      const mediaSrc = targetElement.src || targetElement.querySelector('source')?.src;
      if (mediaSrc) {
        openLightbox(mediaSrc);
      }
    }
  });
});
