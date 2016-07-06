'use strict';

(function() {
  var filter = require('./filter/filter');
  var filterList = require('./filter/filter-list');
  var utils = require('./utils');
  var getReviews = require('./load');
  var Review = require('./review');
  var reviews = [];
  var filteredReviews = [];
  var renderedReviews = [];
  var reviewsControlsMore = document.querySelector('.reviews-controls-more');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var REVIEW_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
  var DEFAULT_FILTER = filterList.ALL;
  var PAGE_SIZE = 3;
  var pageNumber = 0;
  var savedFilter = localStorage.getItem('savedFilter');

  var messageDiv = document.createElement('div');
  messageDiv.innerHTML = 'Таких отзывов не найдено. Попробуйте другой фильтр.';

  reviewsFilter.classList.add('invisible');

  var renderReviews = function(reviewsToRender, page, replace) {
    if (replace) {
      if (renderedReviews.length) {
        renderedReviews.forEach(function(review) {
          review.remove();
        });
        renderedReviews = [];
      }
      if (reviewsList.contains(messageDiv)) {
        reviewsList.removeChild(messageDiv);
      }
    }

    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    if (reviewsToRender.length) {
      reviewsToRender.slice(from, to).forEach(function(review) {
        renderedReviews.push(new Review(review, reviewsList));
      });
    } else {
      reviewsList.appendChild(messageDiv);
    }
    reviewsControlsMore.classList.toggle('invisible', to >= reviewsToRender.length);
  };

  function setFilterEnabled(filterType) {
    filteredReviews = filter(reviews, filterType);
    pageNumber = 0;
    renderReviews(filteredReviews, pageNumber, true);
    var activeFilter = reviewsFilter.querySelector('#' + filterType);
    activeFilter.checked = true;
  }

  function setFiltersEnabled() {
    reviewsFilter.addEventListener('change', function(evt) {
      if (evt.target.hasAttribute('name')) {
        setFilterEnabled(event.target.id);
        localStorage.setItem('savedFilter', event.target.id);
      }
    });
  }

  function showMoreReviews() {
    reviewsControlsMore.addEventListener('click', function() {
      if (utils.isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
        pageNumber++;
        renderReviews(filteredReviews, pageNumber);
      }
    });
  }

  getReviews(REVIEW_LOAD_URL, function(loadedReviews) {
    reviews = loadedReviews;
    setFiltersEnabled();

    if (savedFilter === null) {
      setFilterEnabled(DEFAULT_FILTER);
    } else {
      setFilterEnabled(savedFilter);
    }

    showMoreReviews();
    reviewsFilter.classList.remove('invisible');
  });
})();
