'use strict';

var galleryNumberTotal = document.querySelector('.preview-number-total');

function getGalleryPictures(imagesArray) {
  var galleryPictures = [];

  imagesArray.forEach(function(img, i) {
    galleryPictures.push(img.src);
    img.dataset.number = i;
  });

  galleryNumberTotal.innerHTML = galleryPictures.length;
  return galleryPictures;
}

function Gallery(pics) {
  var self = this;
  this.pictures = pics;
  this.galleryContainer = document.querySelector('.overlay-gallery');
  this.controlLeft = this.galleryContainer.querySelector('.overlay-gallery-control-left');
  this.controlRight = this.galleryContainer.querySelector('.overlay-gallery-control-right');
  this.controlClose = this.galleryContainer.querySelector('.overlay-gallery-close');
  this.galleryPreview = this.galleryContainer.querySelector('.overlay-gallery-preview');
  this.galleryImg = document.createElement('img');
  this.galleryNumberCurrent = this.galleryContainer.querySelector('.preview-number-current');
  this.galleryPictureCurrent = null;
  this.KEY_CODE_ESC = 27;

  this.galleryPreview.appendChild(this.galleryImg);

  this.showGallery = function(i) {
    self.galleryContainer.classList.remove('invisible');
    self.setGalleryNumberCurrent(i);
    self.showPicture(i);

    self.controlLeft.addEventListener('click', self.showPrevPicture);
    self.controlRight.addEventListener('click', self.showNextPicture);
    self.controlClose.addEventListener('click', self.closeGallery);
    window.addEventListener('keydown', self.closeGalleryEsc);
  };

  this.showPicture = function(i) {
    self.setGalleryNumberCurrent(i);
    self.galleryImg.src = self.pictures[i];
    self.galleryPictureCurrent = i;
  };

  this.showPrevPicture = function() {
    if (self.galleryPictureCurrent > 0) {
      self.showPicture(--self.galleryPictureCurrent);
    }
  };

  this.showNextPicture = function() {
    if (self.galleryPictureCurrent < self.pictures.length - 1) {
      self.showPicture(++self.galleryPictureCurrent);
    }
  };

  this.closeGallery = function() {
    self.galleryContainer.classList.add('invisible');
    self.controlLeft.removeEventListener('click', self.showPrevPicture);
    self.controlRight.removeEventListener('click', self.showNextPicture);
    self.controlClose.removeEventListener('click', self.closeGallery);
    window.removeEventListener('click', self.closeGalleryEsc);
  };

  this.closeGalleryEsc = function(evt) {
    if (evt.which === self.KEY_CODE_ESC) {
      self.closeGallery();
    }
  };

  this.setGalleryNumberCurrent = function(i) {
    self.galleryNumberCurrent.innerHTML = i + 1;
  };
}

module.exports = {
  Gallery: Gallery,
  getGalleryPictures: getGalleryPictures
};
