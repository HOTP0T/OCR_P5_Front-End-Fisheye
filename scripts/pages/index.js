<<<<<<< HEAD
async function getPhotographers() {
  const response = await fetch('./data/db.json');
  const data = await response.json(); // Récupérer les données depuis le fichier JSON
  return data.photographers; // Renvoyer uniquement les photographes
=======
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
    userCardDOM.addEventListener('click', () => {
      window.location.href = `photographer.html?id=${photographer.id}`;
    });
    photographersSection.appendChild(userCardDOM);
  });
>>>>>>> server_version
}

<<<<<<< HEAD
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  // Affiche les photographes
  displayData(photographers);
}

init();
=======
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
>>>>>>> server_version
