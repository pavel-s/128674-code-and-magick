'use strict';

var getReviewElement = require('./getReviewElement');

function Review(data, container) {
  this.data = data;
  this.element = getReviewElement(this.data, container);

  this.click = function(evt) {
    var activeQuiz = container.querySelector('.review-quiz-answer-active');

    if (evt.target.classList.contains('review-quiz-answer')) {
      if (activeQuiz) {
        activeQuiz.classList.remove('review-quiz-answer-active');
      }
      evt.target.classList.add('review-quiz-answer-active');
    }
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.click);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.click);
  container.appendChild(this.element);
}

module.exports = Review;
