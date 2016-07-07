'use strict';

//Создание DOM элемента отзыва

var templateElement = document.querySelector('template');
var elementToClone;
var ratings = [
  'review-rating-two',
  'review-rating-three',
  'review-rating-four',
  'review-rating-five'
];
var IMAGE_LOAD_TIMEOUT = 10000;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

var getReviewElement = function(data) {
  var review = elementToClone.cloneNode(true);
  var authorImage = new Image(124, 124);
  var authorImageLoadTimeout;

  authorImage.onload = function() {
    review.querySelector('.review-author').src = authorImage.src;
    clearTimeout(authorImageLoadTimeout);
  };

  authorImage.onerror = function() {
    review.classList.add('review-load-failure');
    clearTimeout(authorImageLoadTimeout);
  };

  authorImage.src = data.author.picture;
  review.querySelector('.review-author').alt = data.author.name;

  authorImageLoadTimeout = setTimeout(function() {
    authorImage.src = '';
    review.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  review.querySelector('.review-rating').classList.add(ratings[data.rating - 2]);
  review.querySelector('.review-text').textContent = data.description;

  return review;
};

module.exports = getReviewElement;
