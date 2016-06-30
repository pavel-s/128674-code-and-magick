'use strict';
var reviews = [];
var filteredReviews = [];
var reviewsControlsMore = document.querySelector('.reviews-controls-more');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsList = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;
var IMAGE_LOAD_TIMEOUT = 10000;
var XHR_LOAD_TIMEOUT = 15000;
var REVIEW_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
var ratings = [
  'review-rating-two',
  'review-rating-three',
  'review-rating-four',
  'review-rating-five'
];
var Filter = {
  ALL: 'reviews-all',
  BAD: 'reviews-bad',
  GOOD: 'reviews-good',
  POPULAR: 'reviews-popular',
  RECENT: 'reviews-recent'
};
var DEFAULT_FILTER = Filter.ALL;
var DAYS_AGO = 4;
var RECENT_FILTER_DATE = new Date();
RECENT_FILTER_DATE.setDate(RECENT_FILTER_DATE.getDate() - DAYS_AGO);
var PAGE_SIZE = 3;
var pageNumber = 0;

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

var renderReviews = function(reviewsToRender, page, replace) {
  if (replace) {
    reviewsList.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  if (reviewsToRender.length) {
    reviewsToRender.slice(from, to).forEach(function(review) {
      getReviewElement(review, reviewsList);
    });
  } else {
    var messageDiv = document.createElement('div');
    messageDiv.innerHTML = 'Таких отзывов не найдено. Попробуйте другой фильтр.';
    reviewsList.appendChild(messageDiv);
  }
  reviewsControlsMore.classList.toggle('invisible', to >= reviewsToRender.length);
};

function getFilteredReview(filter) {
  var reviewsToFilter = reviews.slice(0);
  switch (filter) {
    case Filter.BAD:
      reviewsToFilter = reviewsToFilter.filter(function(data) {
        return data.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case Filter.GOOD:
      reviewsToFilter = reviewsToFilter.filter(function(data) {
        return data.rating > 2;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case Filter.POPULAR:
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
    case Filter.RECENT:
      reviewsToFilter = reviewsToFilter.filter(function(data) {
        return Date.parse(data.date) > RECENT_FILTER_DATE;
      }).sort(function(a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
  }
  return reviewsToFilter;
}

function setFilterEnabled(filter) {
  filteredReviews = getFilteredReview(filter);
  pageNumber = 0;
  renderReviews(filteredReviews, pageNumber, true);
}

function setFiltersEnabled() {
  reviewsFilter.addEventListener('change', function(evt) {
    if (evt.target.hasAttribute('name')) {
      setFilterEnabled(event.target.id);
    }
  });
}

var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();
  var reviewsSection = document.querySelector('.reviews');
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

  xhr.open('GET', REVIEW_LOAD_URL);
  xhr.send();
};

function isNextPageAvailable(page, pageSize) {
  return page < Math.ceil(reviews.length / pageSize);
}

function showMoreReviews() {
  reviewsControlsMore.addEventListener('click', function() {
    if (isNextPageAvailable(pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderReviews(filteredReviews, pageNumber);
    }
  });
}

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltersEnabled();
  setFilterEnabled(DEFAULT_FILTER);
  showMoreReviews();
});
