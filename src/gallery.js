'use strict';

function Gallery() {
  var self = this;
  this.pictures = [];
  this.galleryContainer = document.querySelector('.overlay-gallery');
  this.controlLeft = this.galleryContainer.querySelector('.overlay-gallery-control-left');
  this.controlRight = this.galleryContainer.querySelector('.overlay-gallery-control-right');
  this.controlClose = this.galleryContainer.querySelector('.overlay-gallery-close');
  this.galleryPreview = this.galleryContainer.querySelector('.overlay-gallery-preview');
  this.galleryImg = document.createElement('img');
  this.galleryNumberCurrent = this.galleryContainer.querySelector('.preview-number-current');
  this.galleryNumberTotal = document.querySelector('.preview-number-total');
  this.galleryPictureCurrent = null;
  this.KEY_CODE_ESC = 27;

  this.galleryPreview.appendChild(this.galleryImg);

  this.showGallery = function(pic) {
    var i;

    if (pic.isNumber) {
      i = pic;
    } else {
      i = self.pictures.indexOf(location.origin + '/' + pic);
    }

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
      self.changeUrl(--self.galleryPictureCurrent);
    }
  };

  this.showNextPicture = function() {
    if (self.galleryPictureCurrent < self.pictures.length - 1) {
      self.changeUrl(++self.galleryPictureCurrent);
    }
  };

  this.changeUrl = function(i) {
    location.hash = '#photo/' + self.pictures[i].match(/img\/\S+/);
  };

  this.closeGallery = function() {
    self.galleryContainer.classList.add('invisible');
    self.controlLeft.removeEventListener('click', self.showPrevPicture);
    self.controlRight.removeEventListener('click', self.showNextPicture);
    self.controlClose.removeEventListener('click', self.closeGallery);
    window.removeEventListener('click', self.closeGalleryEsc);
    location.hash = '';
  };

  this.closeGalleryEsc = function(evt) {
    if (evt.which === self.KEY_CODE_ESC) {
      self.closeGallery();
    }
  };

  this.setGalleryNumberCurrent = function(i) {
    self.galleryNumberCurrent.innerHTML = i + 1;
  };

  this.restoreFromHash = function() {
    if (location.hash) {
      var hash = location.hash.match(/#photo\/(\S+)/);
      if (hash !== null) {
        self.showGallery(hash[1]);
      } else {
        self.closeGallery();
      }
    }
  };

  window.addEventListener('hashchange', this.restoreFromHash);
  document.addEventListener('DOMContentLoaded', this.restoreFromHash);

  this.getGalleryPictures = function(imagesArray) {
    imagesArray.forEach(function(img, i) {
      self.pictures.push(img.src);
      img.dataset.number = i;
    });

    self.galleryNumberTotal.innerHTML = this.pictures.length;
  };
}

module.exports = {
  Gallery: Gallery
};
