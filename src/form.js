'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formSubmitButton = document.querySelector('.review-submit');
  var formReviewName = document.querySelector('.review-form-field-name');
  var formReviewMark = document.querySelectorAll('[name=review-mark]');
  var formReviewText = document.querySelector('.review-form-field-text');
  var formReviewNameLink = document.querySelector('.review-fields-name');
  var formReviewTextLink = document.querySelector('.review-fields-text');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formInit();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  function formInit() {
    formSubmitButton.disabled = true;
    formReviewName.required = true;
    formReviewName.maxLength = 30;
    formReviewName.minLength = 2;
    formReviewName.pattern = '[A-Za-zА-Яа-яЁё _.]+';
    formReviewText.maxLength = 500;
    formReviewText.minLength = 1;
    formReviewTextLink.classList.add('invisible');

    formReviewMark.forEach(function(mark) {
      mark.onclick = function() {
        if (mark.value < 3) {
          formReviewText.required = true;
          formReviewTextLink.classList.remove('invisible');
        } else {
          formReviewText.required = false;
          formReviewTextLink.classList.add('invisible');
        }
      };
    });

    formReviewName.oninput = function() {
      if (formReviewText.required) {
        if (formReviewName.validity.valid && formReviewText.validity.valid) {
          formSubmitButton.disabled = false;
        } else {
          formSubmitButton.disabled = true;
        }
      } else {
        if (formReviewName.validity.valid) {
          formSubmitButton.disabled = false;
        } else {
          formSubmitButton.disabled = true;
        }
      }

      if (formReviewName.validity.valid) {
        formReviewNameLink.classList.add('invisible');
      } else {
        formReviewNameLink.classList.remove('invisible');
      }
    };

    formReviewText.oninput = function() {
      if (formReviewName.validity.valid && formReviewText.validity.valid) {
        formSubmitButton.disabled = false;
      } else {
        formSubmitButton.disabled = true;
      }

      if (formReviewText.validity.valid) {
        formReviewTextLink.classList.add('invisible');
      } else {
        formReviewTextLink.classList.remove('invisible');
      }
    };
  }

})();
