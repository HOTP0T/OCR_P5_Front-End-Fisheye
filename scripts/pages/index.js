console.log("👾 ~ Hello from index.js");
// Displays each photographer's data on the main page and make them clickable
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const userCardDOM = photographerTemplate(photographer);
    userCardDOM.addEventListener('click', () => {
      window.location.href = `photographer.html?id=${photographer.id}`;
    });
    photographersSection.appendChild(userCardDOM);
  });
}

// Initializes the main page by fetching and displaying photographers
async function init() {
  const data = await getPhotographers();
  if (data && data.record && data.record.photographers) {
    displayData(data.record.photographers);
  }
  console.log("🚀 ~ init ~ data:", data)
}

init();
