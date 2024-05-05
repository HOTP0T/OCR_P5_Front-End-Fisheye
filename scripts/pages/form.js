/**
 * @fileoverview Script handling form validation and submission.
 * Provides validation for a contact form, including name, email, and message fields.
 */

// console.log('👾 ~ Hello from form.js');

/**
 * Adds an event listener to the form submit event.
 * Performs validation on each field according to predefined regex patterns.
 * Displays error messages for invalid fields and prevents form submission if any validation fails.
 */
document.querySelector('#formulaire').addEventListener('submit', function (event) {
  // Prevents the default form submission behavior to handle validation manually.
  event.preventDefault();

  // Flag to track the presence of any validation errors.
  let errors = false;

  // Regex patterns for validating name and email fields.
  const regexNames = /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // DOM element references for each form field.
  const first = document.querySelector('#first');
  const last = document.querySelector('#last');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');

  /**
   * Validates a name field against the regexNames pattern.
   * Displays or hides the corresponding error message based on validation result.
   * @param {HTMLElement} field - The form input element to validate.
   * @param {string} errorClass - Selector for the error message element related to the field.
   */
  function validateName (field, errorClass) {
    if (field.value.trim().length < 2 || !regexNames.test(field.value.trim())) {
      document.querySelector(errorClass).style.display = 'inline';
      errors = true;
    } else {
      document.querySelector(errorClass).style.display = 'none';
    }
    console.log(field.value);
  }

  /**
   * Validates the email field against a predefined regex pattern.
   * Displays or hides the email error message based on the validation result.
   * @param {HTMLInputElement} email - The email input element to validate.
   * @param {RegExp} regexEmail - The regex pattern used to validate the email.
   * @returns {void}
   */
  function validateEmail () {
    if (
      email.value.trim().length < 2 ||
      !email.validity.valid ||
      !regexEmail.test(email.value)
    ) {
      document.querySelector('.errorEmail').style.display = 'inline';
      errors = true;
    } else {
      document.querySelector('.errorEmail').style.display = 'none';
    }
    console.log(email.value);
  }

  /**
   * Validates the message field to ensure it contains at least 2 characters.
   * Displays or hides the message error message based on the validation result.
   * @param {HTMLElement} message - The form input element to validate.
   * @param {string} errorClass - Selector for the error message element related to the field.
   * @returns {void}
   */
  function validateMessage () {
    if (message.value.trim().length < 2) {
      document.querySelector('.errorMessage').style.display = 'inline';
      errors = true;
    } else {
      document.querySelector('.errorMessage').style.display = 'none';
    }
    console.log(message.value);
  }

  // Perform validation for each form field.
  validateName(first, '.errorFirst');
  validateName(last, '.errorLast');
  validateEmail();
  validateMessage();

  // If no errors are found, close the modal.
  if (!errors) {
    closeModal();
  }

  return !errors;
});
