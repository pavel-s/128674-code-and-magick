'use strict';

//Фильтрация списка отзывов

var filterList = require('./filter-list');
var RECENT_FILTER_DATE = new Date();
var DAYS_AGO = 4;

RECENT_FILTER_DATE.setDate(RECENT_FILTER_DATE.getDate() - DAYS_AGO);

function getFilteredReviews(reviews, filter) {
  var reviewsToFilter = reviews.slice(0);
  switch (filter) {

    case filterList.BAD:
      reviewsToFilter = reviewsToFilter.filter(function(data) {
        return data.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;

    case filterList.GOOD:
      reviewsToFilter = reviewsToFilter.filter(function(data) {
        return data.rating > 2;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case filterList.POPULAR:
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
    case filterList.RECENT:
      reviewsToFilter = reviewsToFilter.filter(function(data) {
        return Date.parse(data.date) > RECENT_FILTER_DATE;
      }).sort(function(a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
  }
  return reviewsToFilter;
}

module.exports = getFilteredReviews;
