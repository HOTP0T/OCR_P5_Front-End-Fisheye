/**
 * @fileoverview Handles fetching and displaying details of photographers from an external API.
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
    return { photographer, media };
  } catch (error) {
    console.error('Failed to fetch photographer details:', error);
  }
}

/**
 * Displays details of the photographer on the webpage.
 * @param {Object} photographer - An object containing the photographer's details.
 * @param {string} photographer.name - The photographer's name.
 * @param {string} photographer.city - The photographer's city.
 * @param {string} photographer.country - The photographer's country.
 * @param {string} photographer.tagline - The photographer's tagline.
 * @param {string} photographer.portrait - The URL to the photographer's portrait image.
 */
function displayPhotographerDetails(photographer) {
  // Ensuring the photographer details container is accessible
  const photographerName = document.getElementById('photographer-name');
  photographerName.textContent = photographer.name;
  photographerName.tabIndex = 0; // Adding tabindex for focusability
  
  const photographerLocation = document.getElementById('photographer-location');
  photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
  photographerLocation.tabIndex = 0; // Adding tabindex for focusability
  
  const photographerTagline = document.getElementById('photographer-tagline');
  photographerTagline.textContent = photographer.tagline;
  photographerTagline.tabIndex = 0; // Adding tabindex for focusability
  
  const photographerImageContainer = document.getElementById('photographer-image');
  photographerImageContainer.innerHTML = ''; // Clear existing content
  const img = document.createElement('img');
  img.src = photographer.portrait;
  img.alt = `${photographer.name} - Portrait`; // Ensuring the image has meaningful alt text
  img.tabIndex = 0; // Adding tabindex for focusability
  photographerImageContainer.appendChild(img);
}

// Set up an event listener for DOMContentLoaded to fetch and display photographer details
document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');
  if (photographerId) {
    const { photographer } = await getPhotographerDetails(photographerId);
    displayPhotographerDetails(photographer);
  }
});
