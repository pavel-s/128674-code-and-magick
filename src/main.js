'use strict';
require('./reviews/form');
require('./game');
require('./reviews/reviews');
var gallery = require('./gallery');
var photoGalleryImages = document.querySelectorAll('.photogallery-image img');
var photoGallery = document.querySelector('.photogallery');

gallery.getGalleryPictures(photoGalleryImages);

photoGallery.onclick = function(evt) {
  if (evt.target.hasAttribute('data-number')) {
    gallery.showGallery(+evt.target.dataset.number);
  }
};
