

function photographerTemplate(data) {
    const { name, id: photographerId, city: photographerCity, country: photographerCountry, tagline: photographerTagline, price: photographerPrice, portrait: photographerPortrait } = data;

    const picture = `localhost:3000/photographers/portrait=${photographerPortrait}`;
    const idURL = `http://localhost:3000/photographers/id=${photographerId}`;
    const cityURL = `http://localhost:3000/photographers/city=${photographerCity}`;
    const countryURL = `http://localhost:3000/photographers/country=${photographerCountry}`;
    const taglineURL = `http://localhost:3000/photographers/tagline=${photographerTagline}`;
    const priceURL = `http://localhost:3000/photographers/price=${photographerPrice}`;

    /**
     * Description placeholder
     * @date 4/1/2024 - 9:39:40 PM
     *
     * @returns {*}
     */
    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { data, getUserCardDOM }
}