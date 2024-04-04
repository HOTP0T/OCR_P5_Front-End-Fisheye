async function getPhotographerDetails(photographerId) {
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
    const data = await response.json();
    // Adjusted for JSONBin.io v3 API response structure
    const photographer = data.record.photographers.find(p => p.id === parseInt(photographerId, 10));
    const media = data.record.media.filter(m => m.photographerId === parseInt(photographerId, 10));
    return { photographer, media };
  } catch (error) {
    console.error("Failed to fetch photographer details:", error);
  }
}


function displayPhotographerDetails(photographer) {
  // Example implementation - adjust according to your actual HTML structure
  document.getElementById('photographer-name').textContent = photographer.name;
  document.getElementById('photographer-location').textContent = `${photographer.city}, ${photographer.country}`;
  document.getElementById('photographer-tagline').textContent = photographer.tagline;
  document.getElementById('photographer-price').textContent = `Price: ${photographer.price}`;
  const img = document.createElement('img');
  img.src = photographer.portrait;
  document.getElementById('photographer-image').appendChild(img);
}

function displayPhotographerMedia(media) {
  const mediaContainer = document.getElementById('media-container');
  media.forEach(item => {
    const mediaElement = document.createElement('div');
    mediaElement.className = 'media-item';

    const title = document.createElement('h3');
    title.textContent = item.title;
    mediaElement.appendChild(title);

    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      mediaElement.appendChild(img);
    } else if (item.video) {
      const video = document.createElement('video');
      video.controls = true;
      const source = document.createElement('source');
      source.src = item.video;
      video.appendChild(source);
      mediaElement.appendChild(video);
    }

    const likes = document.createElement('span');
    likes.textContent = `${item.likes} likes`;
    const likeButton = document.createElement('button');
    likeButton.innerHTML = '&#x2764;';
    likeButton.onclick = () => {
      item.likes += 1; // Increment the likes
      likes.textContent = `${item.likes} likes`; // Update the likes display
    };

    mediaElement.appendChild(likes);
    mediaElement.appendChild(likeButton);
    mediaContainer.appendChild(mediaElement);
  });
}

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');
  if (!photographerId) {
    console.error('Photographer ID is required.');
    return;
  }

  const { photographer, media } = await getPhotographerDetails(photographerId);
  if (photographer && media) {
    displayPhotographerDetails(photographer);
    displayPhotographerMedia(media);
  } else {
    console.error('Failed to load photographer details or media.');
  }
}

init();
