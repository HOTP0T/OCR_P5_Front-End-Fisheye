/**
 * @fileoverview This script is responsible for fetching photographer data from an external API and generating HTML content to display each photographer's information.
 */

// console.log('👾 ~ Hello from indexData.js');

/**
 * Fetches photographer data from a specific API endpoint.
 * @async
 * @function getPhotographers
 * @returns {Promise<Object>} A promise that resolves with the JSON response containing photographers' data.
 * @throws Will throw an error if the fetch operation fails.
 */
async function getPhotographers () {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b/660d15e2ad19ca34f854284c', {
      headers: {
        // Note: KEYS SHOULD NEVER APPEAR IN CLIENT-SIDE CODE. THIS IS FOR DEVELOPMENT PURPOSES ONLY.
        'X-Master-Key': '$2a$10$qbfGIDJdT4VtlhBqXNLnXO5PaWdVaDRbrEJjAk6T5riM8VLv7mP.a'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch photographers:', error);
  }
}

/**
 * Generates and returns an HTML article element for a given photographer's data.
 * @function photographerTemplate
 * @param {Object} photographer An object containing data for a single photographer.
 * @param {string} photographer.portrait The URL to the photographer's portrait image.
 * @param {string} photographer.name The name of the photographer.
 * @param {string} photographer.city The city where the photographer is based.
 * @param {string} photographer.country The country where the photographer is based.
 * @param {string} photographer.tagline The tagline of the photographer.
 * @param {number} photographer.price The daily price rate of the photographer.
 * @returns {HTMLElement} An article element populated with the photographer's data.
 */
function photographerTemplate (photographer) {
  const article = document.createElement('article');
  article.className = 'photographer-article';

  const img = document.createElement('img');
  img.src = photographer.portrait;
  img.alt = `Portrait of ${photographer.name}`;
  img.className = 'photographer-portrait';
  article.appendChild(img);

  const name = document.createElement('h2');
  name.textContent = photographer.name;
  article.appendChild(name);

  const location = document.createElement('h3');
  location.textContent = `${photographer.city}, ${photographer.country}`;
  location.className = 'photographer-location';
  article.appendChild(location);

  const tagline = document.createElement('p');
  tagline.textContent = photographer.tagline;
  tagline.className = 'photographer-tagline';
  article.appendChild(tagline);

  const price = document.createElement('p');
  price.textContent = `${photographer.price}€/jour`;
  price.className = 'photographer-price';
  article.appendChild(price);

  return article;
}
