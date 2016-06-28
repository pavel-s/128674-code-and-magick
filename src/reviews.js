'use strict';
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;
var IMAGE_LOAD_TIMEOUT = 10000;
var REVIEW_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
var ratings = [
  'review-rating-two',
  'review-rating-three',
  'review-rating-four',
  'review-rating-five'
];
reviewsFilter.classList.add('invisible');

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var getReviewElement = function(data, container) {
  var review = elementToClone.cloneNode(true);
  var authorImage = new Image(124, 124);
  var authorImageLoadTimeout;

  container.appendChild(review);

  authorImage.onload = function() {
    review.querySelector('.review-author').src = authorImage.src;
    clearTimeout(authorImageLoadTimeout);
  };

  authorImage.onerror = function() {
    review.classList.add('review-load-failure');
    clearTimeout(authorImageLoadTimeout);
    authorImage.src = '';
  };

  authorImage.src = data.author.picture;
  review.querySelector('.review-author').alt = data.author.name;

  authorImageLoadTimeout = setTimeout(function() {
    authorImage.src = '';
    review.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  review.querySelector('.review-rating').classList.add(ratings[data.rating - 2]);
  review.querySelector('.review-text').textContent = data.description;
  reviewsFilter.classList.remove('invisible');

  return review;
};

var renderReviews = function(reviews) {
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsList);
  });
};

var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };
  
  xhr.onloadstart = function() {
    
  };

  xhr.open('GET', REVIEW_LOAD_URL);
  xhr.send();
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  renderReviews(reviews);
});
