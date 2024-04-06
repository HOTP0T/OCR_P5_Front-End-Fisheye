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
    console.log("🚀 ~ init ~ photographer:", photographer)
    console.log("🚀 ~ init ~ media:", media)
}

init();