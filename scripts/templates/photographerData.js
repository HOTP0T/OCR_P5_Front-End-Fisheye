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
  document.getElementById('photographer-price').textContent = `${photographer.price}€/jour`;
  const img = document.createElement('img');
  img.src = photographer.portrait;
  document.getElementById('photographer-image').appendChild(img);
}

function displayPhotographerMedia(media) {
  const mediaContainer = document.getElementById('media-container');

  // Sort media by type, images first and then videos
  const sortedMedia = [...media].sort((a, b) => (a.image && b.video) ? -1 : (a.video && b.image) ? 1 : 0);

  sortedMedia.forEach(item => {
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
}
