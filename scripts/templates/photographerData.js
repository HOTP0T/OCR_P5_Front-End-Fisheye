console.log('🤖 ~ Hello from photographerData.js');
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
    console.error("Failed to fetch photographer details:", error);
  }
}

function displayPhotographerDetails(photographer) {
  document.getElementById('photographer-name').textContent = photographer.name;
  document.getElementById('photographer-location').textContent = `${photographer.city}, ${photographer.country}`;
  document.getElementById('photographer-tagline').textContent = photographer.tagline;
  const img = document.createElement('img');
  img.src = photographer.portrait;
  document.getElementById('photographer-image').appendChild(img);
}


