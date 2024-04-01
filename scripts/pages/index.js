async function getPhotographers() {
    // Récupération des photographes depuis le fichier JSON
    const response = await fetch('./data/photographers.json');
    const photographe = await response.json();
    console.log(photographe);
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
        const { photographers } = await getPhotographers();
        // Affiche les photographes
        displayData(photographers);
    }
    
    init();
    