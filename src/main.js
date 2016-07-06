'use strict';
require('./reviews/form');
require('./game');
require('./reviews/reviews');
var gallery = require('./gallery');
var photoGalleryImages = document.querySelectorAll('.photogallery-image img');
var photoGallery = document.querySelector('.photogallery');

var Gallery = new gallery.Gallery();
Gallery.getGalleryPictures(photoGalleryImages);

photoGallery.onclick = function(evt) {
  evt.preventDefault();
  if (evt.target.hasAttribute('data-number')) {
    location.hash = '#photo/' + evt.target.getAttribute('src');
  }
};
