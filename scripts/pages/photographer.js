
/**
 * Script for displaying and interacting with photographer media on a webpage.
 * Includes functionality to sort media items, display detailed information, and manage user interactions with media items.
 */
console.log('👾 ~ Hello from photographer.js');

/**
 * Displays media items on the page and sorts them based on a specified criterion.
 * @param {Array} media - Array of media items to be displayed.
 * @param {?string} sortType - Criterion used for sorting media items. Can be 'likes', 'date', or 'title'.
 */
function displayPhotographerMedia(media, sortType = null) {
  const mediaContainer = document.getElementById('media-container');
  mediaContainer.innerHTML = ''; // Clear existing media content before displaying new sorted media

  let sortedMedia = [...media]; // Create a shallow copy of the media array to sort

  // Sort media based on the specified sortType
  switch (sortType) {
    case 'likes':
      sortedMedia.sort((a, b) => b.likes - a.likes);
      break;
    case 'date':
      sortedMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'title':
      sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }
  console.log(`Media after sorting by ${sortType}:`, sortedMedia);
  // Iterate over sorted media to create and append elements to the DOM
  sortedMedia.forEach(item => {
    // Elements creation and appending logic for media items
    const mediaElement = document.createElement('div');
    mediaElement.className = 'media-item';

    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.className = 'photographer-image';
      mediaElement.appendChild(img);
    } else if (item.video) {
      const video = document.createElement('video');
      video.controls = true;
      video.className = 'photographer-video';
      const source = document.createElement('source');
      source.src = item.video;
      video.appendChild(source);
      mediaElement.appendChild(video);
    }

    const mediaDetails = document.createElement('div');
    mediaDetails.classList.add('media-details');

    const title = document.createElement('h3');
    title.textContent = item.title;
    mediaDetails.appendChild(title);

    const likeDiv = document.createElement('div');
    likeDiv.classList.add('like-div');

    const likes = document.createElement('span');
    likes.textContent = `${item.likes}`;
    likes.className = 'likes';
    likes.onclick = () => {
      item.likes += 1;
      likes.textContent = `${item.likes}`;
    };
    const likeButton = document.createElement('i');
    likeButton.className = 'like-button';
    likeButton.innerHTML = '&#x2764;';
    likeButton.onclick = () => {
      item.likes += 1;
      likes.textContent = `${item.likes}`;
    };

    likeDiv.appendChild(likes);
    likeDiv.appendChild(likeButton);

    mediaDetails.appendChild(likeDiv);

    mediaElement.appendChild(mediaDetails);
    mediaContainer.appendChild(mediaElement);
  });
  console.log("🚀 ~ displayPhotographerMedia ~ sortedMedia:", sortedMedia)
  console.log("🚀 ~ displayPhotographerMedia ~ sortedMedia:", sortedMedia)
}

/**
 * Initializes the filter options for media sorting and applies the selected sorting method.
 */
function initFilterOptions() {
  document.getElementById('filterOptions').addEventListener('change', async (event) => {
    const sortType = event.target.value; // Get the selected option value

    // Only proceed if a sortType is selected
    if (sortType) {
      const urlParams = new URLSearchParams(window.location.search);
      const photographerId = urlParams.get('id');
      const { media } = await getPhotographerDetails(photographerId);
      displayPhotographerMedia(media, sortType);
    }
  });
}

/**
 * Displays the total number of likes and the photographer's daily rate at the bottom of the page.
 * @param {string} photographerId - The unique identifier of the photographer.
 */
async function displayPhotographerBottomInfo(photographerId) {
  // Fetch and display photographer and media info, including total likes and price
  const { photographer, media } = await getPhotographerDetails(photographerId);
  if (photographer && media) {
    const totalLikes = calculateTotalLikes(media);
    displayBottomInfo(photographer.price, totalLikes);
  } else {
    console.error('Failed to load photographer details or media.');
  }
}

/**
 * Calculates the total number of likes across all media items.
 * @param {Array} media - Array of media items.
 * @returns {number} Total number of likes across all media items.
 */
function calculateTotalLikes(media) {
  let totalLikes = 0;
  // Summation logic for likes
  media.forEach(item => {
    totalLikes += item.likes;
  });
  return totalLikes;
}

/**
 * Displays the photographer's pricing information and total likes at the bottom of the page.
 * @param {number} price - Photographer's daily rate.
 * @param {number} totalLikes - Total number of likes across the photographer's media.
 */
function displayBottomInfo(price, totalLikes) {
  const bottomInfoDiv = document.createElement('div');
  bottomInfoDiv.classList.add('bottom-info');

  const totalLikesElement = document.createElement('span');
  totalLikesElement.textContent = `${totalLikes}♥︎`;

  const priceElement = document.createElement('span');
  priceElement.textContent = `${price}€/jour`;

  bottomInfoDiv.appendChild(totalLikesElement);
  bottomInfoDiv.appendChild(priceElement);

  const bottomPinkDiv = document.getElementById('bottom-pink');
  bottomPinkDiv.appendChild(bottomInfoDiv);
}

/**
 * Main initialization function to set up the webpage based on the photographer's ID from the URL.
 */
async function init() {
  // Main logic for initializing the page, including fetching photographer details and setting up UI
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');
  if (!photographerId) {
    console.error('Photographer ID is required.');
    return;
  }

  const { photographer, media } = await getPhotographerDetails(photographerId);
  if (photographer && media) {
    initFilterOptions();
    displayPhotographerDetails(photographer);
    displayPhotographerMedia(media);
    displayPhotographerBottomInfo(photographerId);


    const totalLikes = calculateTotalLikes(media); // Calculate total likes
    console.log(`Total Likes: ${totalLikes}`);
  } else {
    console.error('Failed to load photographer details or media.');
  }
  console.log("🚀 ~ init ~ photographer:", photographer);
  console.log("🚀 ~ init ~ media:", media);
}

init(); // Execute the main function on script load.
