console.log("👾 ~ Hello from index.js");
// Fetches photographers data from the JSON
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
