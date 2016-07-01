'use strict';

module.exports = {

  isNextPageAvailable: function(reviews, page, pageSize) {
    return page < Math.ceil(reviews.length / pageSize);
  },

  getCookiesExpires: function() {
    var nowDate = new Date();
    var birthdayDate = new Date(nowDate.getFullYear(), 9, 2);
    if (birthdayDate < nowDate) {
      return nowDate - birthdayDate;
    } else {
      if (birthdayDate.getMonth() <= nowDate.getMonth()) {
        return nowDate - birthdayDate;
      } else {
        birthdayDate.setFullYear(nowDate.getFullYear() - 1);
        return nowDate - birthdayDate;
      }
    }
  }
};
