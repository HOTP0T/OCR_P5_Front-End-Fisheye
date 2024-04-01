async function getPhotographers() {
  const response = await fetch('./data/db.json');
  const data = await response.json(); // Récupérer les données depuis le fichier JSON
  return data.photographers; // Renvoyer uniquement les photographes
}
console.log(getPhotographers());

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