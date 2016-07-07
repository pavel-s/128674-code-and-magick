'use strict';

var getReviewElement = require('./getReviewElement');

function Review(data, container) {
  this.data = data;
  this.container = container;
  this.element = getReviewElement(this.data, this.container);

  this.onClick = this.onClick.bind(this);
  this.remove = this.remove.bind(this);

  this.element.addEventListener('click', this.onClick);
  this.container.appendChild(this.element);
}

Review.prototype.onClick = function(evt) {
  var activeQuiz = this.container.querySelector('.review-quiz-answer-active');

  if (evt.target.classList.contains('review-quiz-answer')) {
    if (activeQuiz) {
      activeQuiz.classList.remove('review-quiz-answer-active');
    }
    evt.target.classList.add('review-quiz-answer-active');
  }
};

Review.prototype.remove = function() {
  this.element.removeEventListener('click', this.onClick);
  this.element.parentNode.removeChild(this.element);
};

module.exports = Review;
