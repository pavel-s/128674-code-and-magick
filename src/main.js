'use strict';
require('./reviews/form');
require('./game');
require('./reviews/reviews');
var gallery = require('./gallery');
var photoGalleryImages = document.querySelectorAll('.photogallery-image img');
var photoGallery = document.querySelector('.photogallery');

var pics = gallery.getGalleryPictures(photoGalleryImages);

var Gallery = new gallery.Gallery(pics);

photoGallery.onclick = function(evt) {
  if (evt.target.hasAttribute('data-number')) {
    Gallery.showGallery(+evt.target.dataset.number);
  }
};
