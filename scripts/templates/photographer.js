/**
 * Description placeholder
 * @date 4/1/2024 - 10:40:39 PM
 *
 * @param {*} data
 * @returns {{ data: any; getUserCardDOM: () => any; }}
 */
function photographerTemplate(data) {
  const { name, id: photographerId, city: photographerCity, country: photographerCountry, tagline: photographerTagline, price: photographerPrice, portrait: photographerPortrait } = data;

  const picture = `${photographerPortrait}`;
  const idURL = `${photographerId}`;
  const cityURL = `${photographerCity}`;
  const countryURL = `${photographerCountry}`;
  const taglineURL = `${photographerTagline}`;
  const priceURL = `${photographerPrice}`;

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