/**
 * @fileoverview This file is the entry point for the main page of the photo gallery app.
 * It handles the initialization of the app by loading and displaying photographer
 * profiles from a remote source and setting up interactions.
*/

// console.log('👾 ~ Hello from index.js');

/**
 * Displays each photographer's data on the main page and makes them clickable.
 * Each photographer's information is presented in a user card that, when clicked,
 * redirects the user to a detailed page about the photographer.
 *
 * @param {Object[]} photographers - An array of objects containing photographers' data.
 */
async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const userCardDOM = photographerTemplate(photographer);
    
    const navigateToDetailPage = () => {
      window.location.href = `photographer.html?id=${photographer.id}`;
    };

    userCardDOM.addEventListener('click', navigateToDetailPage);

    userCardDOM.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        navigateToDetailPage();
      }
    });

    // Make the card focusable
    userCardDOM.tabIndex = 0;

    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Initializes the main page by fetching and displaying photographers' data.
 * This function fetches photographers' data, checks if it exists, and then
 * calls displayData to render each photographer's information on the page.
 */
async function init () {
  const data = await getPhotographers();
  if (data && data.record && data.record.photographers) {
    displayData(data.record.photographers);
  }
  // console.log('🚀 ~ init ~ data:', data)
}

init();
