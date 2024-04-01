/**
 * Description placeholder
 * @date 4/1/2024 - 9:29:32 PM
 *
 * @async
 * @return {unknown}
 */
async function getPhotographers() {
  // Récupère les données des photographes depuis le fichier JSON
  return fetch('/data/db.json').then((response) => response.json());
}
console.log(getPhotographers());

/**
 * Description placeholder
 * @date 4/1/2024 - 9:30:22 PM
 *
 * @async
 * @param {*} photographers
 * @return {*}
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Description placeholder
 * @date 4/1/2024 - 9:30:29 PM
 *
 * @async
 * @return {*}
 */
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  // Affiche les photographes
  displayData(photographers);
}

init();
