'use strict';

//Загрузка отзывов

var reviewsSection = document.querySelector('.reviews');
var XHR_LOAD_TIMEOUT = 15000;

var getReviews = function(url, callback) {
  var xhr = new XMLHttpRequest();
  var xhrTimeout;

  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    clearTimeout(xhrTimeout);
    reviewsSection.classList.remove('reviews-load-failure');
    reviewsSection.classList.remove('reviews-list-loading');
    callback(loadedData);
  };

  xhr.onloadstart = function() {
    reviewsSection.classList.add('reviews-list-loading');
  };

  xhr.onerror = function() {
    clearTimeout(xhrTimeout);
    reviewsSection.classList.remove('reviews-list-loading');
    reviewsSection.classList.add('reviews-load-failure');
  };

  xhrTimeout = setTimeout(function() {
    reviewsSection.classList.remove('reviews-list-loading');
    reviewsSection.classList.add('reviews-load-failure');
  }, XHR_LOAD_TIMEOUT);

  xhr.open('GET', url);
  xhr.send();
};

module.exports = getReviews;
