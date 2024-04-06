// Lors du click de submit du formulaire, on vérifie les champs et on affiche un message d'erreur si nécessaire
document.querySelector("#formulaire").addEventListener("submit", function (event) {
  // empeche le default behaviour du formulaire lors du submit en cas derreur -> il ne refraichit pas la page
  event.preventDefault();

  // je declare autant de variables que de champs a verifier ainsi qu'aucune erreur by default
  var errors = false;

  // declaration des differents regex utiliser pour verifier les champs du formulaire
  var regexNames =
    /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$/;
  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // je declare les variables pour chaque champ du formulaire
  var first = document.querySelector("#first");
  var last = document.querySelector("#last");
  var email = document.querySelector("#email");
  var message = document.querySelector("#message");

  // je verifie chaque champ et affiche un message derreur si necessaire
  // si le champ est valide -> je cache le message derreur

  // Fonction de validation du prénom
  function validateName(field, errorClass) {
    if (field.value.trim().length < 2 || !regexNames.test(field.value.trim())) {
      document.querySelector(errorClass).style.display = "inline";
      errors = true;
    } else {
      document.querySelector(errorClass).style.display = "none";
    }
  }

  // Fonction de validation de l'email
  function validateEmail() {
    if (
      email.value.trim().length < 2 ||
      !email.validity.valid ||
      !regexEmail.test(email.value)
    ) {
      document.querySelector(".errorEmail").style.display = "inline";
      errors = true;
    } else {
      document.querySelector(".errorEmail").style.display = "none";
    }
  }

  function validateMessage() {
    if (message.value.trim().length < 2) {
      document.querySelector(".errorMessage").style.display = "inline";
      errors = true;
    } else {
      document.querySelector(".errorMessage").style.display = "none";
    }
}

  // Validation de chaque champ
  validateName(first, ".errorFirst");
  validateName(last, ".errorLast");
  validateEmail();
  validateMessage();
  validateEmail();

  // si aucune erreur, je lance la validation avec la fonction launchValidation (qui cache le formulaire et affiche le message de validation)
  if (!errors) {
    closeModal();
  }

  // je retourne si il y a des erreurs ou non
  return !errors;
});