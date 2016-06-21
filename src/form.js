'use strict';

(function() {
  var form = document.querySelector('.review-form');
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formSubmitButton = document.querySelector('.review-submit');
  var formReviewName = document.querySelector('.review-form-field-name');
  var formReviewMark = document.querySelectorAll('[name=review-mark]');
  var formReviewText = document.querySelector('.review-form-field-text');
  var formReviewLinks = document.querySelector('.review-fields');
  var formReviewNameLink = document.querySelector('.review-fields-name');
  var formReviewTextLink = document.querySelector('.review-fields-text');
  var browserCookies = require('browser-cookies');

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
    var savedReviewMark = +browserCookies.get('ReviewMark') || 3;
    
    formSubmitButton.disabled = true;
    formReviewMark.forEach(function(mark, i) {
      formReviewMark[i].checked = (i + 1 === savedReviewMark) ? true : false;
    });
    formReviewName.required = true;
    formReviewName.maxLength = 30;
    formReviewName.minLength = 2;
    formReviewName.pattern = '[A-Za-zА-Яа-яЁё _.]+';
    formReviewName.value = browserCookies.get('ReviewName') || '';
    formReviewText.maxLength = 500;
    formReviewText.minLength = 1;
    formReviewTextLink.classList.add('invisible');
    setLinksVisibility();
    
    formReviewMark.forEach(function(mark) {
      mark.onclick = function() {
        if (mark.value < 3) {
          formReviewText.required = true;
          formReviewTextLink.classList.remove('invisible');
          formSubmitButton.disabled = (formReviewName.validity.valid && formReviewText.validity.valid) ? false : true;
        } else {
          formReviewText.required = false;
          formReviewTextLink.classList.add('invisible');
          formSubmitButton.disabled = (formReviewName.validity.valid) ? false : true;
        }
        setLinksVisibility();
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
      setLinksVisibility();
    };

    formReviewText.oninput = function() {
      if (formReviewName.validity.valid && formReviewText.validity.valid) {
        formSubmitButton.disabled = false;
      } else {
        formSubmitButton.disabled = true;
      }
      setLinksVisibility();
    };

    function setLinksVisibility() {
      if (formReviewText.required) {
        if (formReviewName.validity.valid) {
          formReviewNameLink.classList.add('invisible');
        } else {
          formReviewNameLink.classList.remove('invisible');
        }

        if (formReviewText.validity.valid) {
          formReviewTextLink.classList.add('invisible');
        } else {
          formReviewTextLink.classList.remove('invisible');
        }

        if (formReviewNameLink.classList.contains('invisible') && formReviewTextLink.classList.contains('invisible')) {
          formReviewLinks.classList.add('invisible');
        } else {
          formReviewLinks.classList.remove('invisible');
        }

      } else {
        if (formReviewName.validity.valid) {
          formReviewNameLink.classList.add('invisible');
          formReviewLinks.classList.add('invisible');
        } else {
          formReviewNameLink.classList.remove('invisible');
          formReviewLinks.classList.remove('invisible');
        }
      }
    }
  }
  
  form.onsubmit = function() {
    browserCookies.set('ReviewMark', document.querySelector('[name=review-mark]:checked').value);
    browserCookies.set('ReviewName', formReviewName.value);
  };

})();
