// TODO ADD JSOC
/**
 * Description placeholder
 * @async
 * @returns {unknown}
 */
async function getPhotographers() {
  // Récupère les données des photographes depuis le fichier JSON
  return fetch('/data/db.json').then((response) => response.json());
}
console.log(getPhotographers());

// TODO ADD JSOC
/**
 * Description placeholder
 * @async
 * @param {*} photographers
 * @returns {*}
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// TODO ADD JSOC
/**
 * Description placeholder
 * @async
 * @returns {*}
 */
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  // Affiche les photographes
  displayData(photographers);
}

init();
