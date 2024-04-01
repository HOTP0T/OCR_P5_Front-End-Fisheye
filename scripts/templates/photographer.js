// TODO ADD JSOC
/**
 * Description placeholder
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

  // console log to check the data
  console.log(data);

// TODO ADD JSOC
/**
 * Description placeholder
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