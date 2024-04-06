console.log("👾 ~ Hello from indexData.js");
// Fetch photographers data from the API
async function getPhotographers() {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b/660d15e2ad19ca34f854284c', {
      headers: {
        // KEYS SHOULD NEVER APPEAR IN CLIENT SIDE CODE, THIS IS JUST FOR DEVELOPMENT PURPOSES ONLY
        'X-Master-Key': '$2a$10$qbfGIDJdT4VtlhBqXNLnXO5PaWdVaDRbrEJjAk6T5riM8VLv7mP.a'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch photographers:", error);
  }
}
// Function to generate HTML content for a photographer
function photographerTemplate(photographer) {
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

  const location = document.createElement('p');
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