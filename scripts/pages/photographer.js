/**
 * @fileoverview Script for displaying and interacting with photographer media on a webpage.
 * Includes functionality to sort media items, display detailed information, and manage user interactions with media items.
 */

/**
 * Fetches details of a specific photographer and their media from an API based on the photographer's ID.
 * @async
 * @param {string} photographerId - The unique identifier for the photographer.
 * @returns {Promise<Object>} An object containing details of the photographer and their media, or an error if the fetch fails.
 */
async function getPhotographerDetails(photographerId) {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b/660d15e2ad19ca34f854284c', {
      headers: {
        'X-Master-Key': '$2a$10$qbfGIDJdT4VtlhBqXNLnXO5PaWdVaDRbrEJjAk6T5riM8VLv7mP.a'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const photographer = data.record.photographers.find(p => p.id === parseInt(photographerId, 10));
    const media = data.record.media.filter(m => m.photographerId === parseInt(photographerId, 10));
    // console.log('Fetched photographer details:', photographer);
    // console.log('Fetched media:', media);
    return { photographer, media };
  } catch (error) {
    console.error('Failed to fetch photographer details:', error);
  }
}

/**
 * Displays media items on the page and sorts them based on a specified filter.
 * @param {Array} media - Array of media items to be displayed.
 * @param {?string} sortType - Filter used for sorting media items. Can be 'likes', 'date', or 'title'.
 */
function displayPhotographerMedia(media, sortType = null) {
  const mediaContainer = document.getElementById('media-container');
  mediaContainer.innerHTML = ''; // Clear existing media content before displaying new sorted media

  // Load likes from local storage
  media.forEach(item => {
    const storedLikes = localStorage.getItem(`media-${item.id}-likes`);
    if (storedLikes) {
      item.likes = parseInt(storedLikes, 10);
    }
  });

  const sortedMedia = [...media]; // Create a shallow copy of the media array to sort

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
    const mediaElement = document.createElement('div');
    mediaElement.className = 'media-item';

    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.className = 'photographer-image';
      img.alt = `Picture named ${item.title}`;
      mediaElement.appendChild(img);
    } else if (item.video) {
      const video = document.createElement('video');
      video.controls = true;
      video.className = 'photographer-video';
      video.alt = `Video named ${item.title}`;
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

    const likeButton = document.createElement('i');
    likeButton.className = 'like-button';
    likeButton.innerHTML = '&#x2764;';

    const updateLikes = (increment) => {
      item.likes += increment;
      localStorage.setItem(`media-${item.id}-likes`, item.likes);
      likes.textContent = `${item.likes}`;
      updateBottomInfo();
      console.log(`Updated likes for media ${item.id}:`, item.likes);
    };

    likes.onclick = () => updateLikes(1);
    likeButton.onclick = () => updateLikes(1);

    likeDiv.appendChild(likes);
    likeDiv.appendChild(likeButton);

    mediaDetails.appendChild(likeDiv);

    mediaElement.appendChild(mediaDetails);
    mediaContainer.appendChild(mediaElement);
  });
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
  const { photographer, media } = await getPhotographerDetails(photographerId);
  if (photographer && media) {
    const totalLikes = calculateTotalLikes(media);
    displayBottomInfo(photographer.price, totalLikes);
    // console.log('Displayed bottom info with total likes and price:', photographer.price, totalLikes);
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
    const storedLikes = localStorage.getItem(`media-${item.id}-likes`);
    if (storedLikes) {
      totalLikes += parseInt(storedLikes, 10);
    } else {
      totalLikes += item.likes;
    }
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
  totalLikesElement.id = 'total-likes';
  totalLikesElement.textContent = `${totalLikes} ♥︎`;

  const priceElement = document.createElement('span');
  priceElement.textContent = `${price} €/jour`;

  bottomInfoDiv.appendChild(totalLikesElement);
  bottomInfoDiv.appendChild(priceElement);

  const bottomPinkDiv = document.getElementById('bottom-pink');
  bottomPinkDiv.innerHTML = ''; // Clear existing content
  bottomPinkDiv.appendChild(bottomInfoDiv);
}

/**
 * Updates the bottom information dynamically.
 */
async function updateBottomInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');
  const { media } = await getPhotographerDetails(photographerId);
  const totalLikes = calculateTotalLikes(media);
  const totalLikesElement = document.getElementById('total-likes');
  if (totalLikesElement) {
    totalLikesElement.textContent = `${totalLikes} ♥︎`;
    console.log('Updated total likes in bottom info:', totalLikes);
  }
}

/**
 * Updates the form header with the photographer's name.
 * @param {string} name - The photographer's name.
 */
function updateFormHeader(name) {
  const formHeader = document.querySelector('#contact_modal h2');
  formHeader.textContent = `Contactez-moi ${name}`;
  // console.log('Updated form header with photographer name:', name);
}

/**
 * Main initialization function to set up the webpage based on the photographer's ID from the URL.
 */
async function init() {
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

    // Update the form header with the photographer's name
    updateFormHeader(photographer.name);

    // console.log('Initialized page with photographer details and media:', photographer, media);
  } else {
    console.error('Failed to load photographer details or media.');
  }
}

init(); // Execute the main function on script load.
