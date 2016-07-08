'use strict';

function Gallery() {
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

  this.pageUrl = this.getPageUrl(location.href);

  this.galleryPreview.appendChild(this.galleryImg);

  this.getPageUrl = this.getPageUrl.bind(this);
  this.showGallery = this.showGallery.bind(this);
  this.showPicture = this.showPicture.bind(this);
  this.showPrevPicture = this.showPrevPicture.bind(this);
  this.showNextPicture = this.showNextPicture.bind(this);

  this.changeUrl = this.changeUrl.bind(this);
  this.closeGallery = this.closeGallery.bind(this);
  this.closeGalleryEsc = this.closeGalleryEsc.bind(this);
  this.setGalleryNumberCurrent = this.setGalleryNumberCurrent.bind(this);
  this.restoreFromHash = this.restoreFromHash.bind(this);
  this.getGalleryPictures = this.getGalleryPictures.bind(this);

  window.addEventListener('hashchange', this.restoreFromHash);
  document.addEventListener('DOMContentLoaded', this.restoreFromHash);
}

Gallery.prototype.getPageUrl = function(href) {
  var url = href.match(/(\S+)#photo/);
  return url ? url[1] : href;
};

Gallery.prototype.showGallery = function(pic) {
  var i;

  if (typeof pic === 'number') {
    i = pic;
  } else {
    i = this.pictures.indexOf(this.pageUrl + pic);
  }

  this.galleryContainer.classList.remove('invisible');
  this.setGalleryNumberCurrent(i);
  this.showPicture(i);

  this.controlLeft.addEventListener('click', this.showPrevPicture);
  this.controlRight.addEventListener('click', this.showNextPicture);
  this.controlClose.addEventListener('click', this.closeGallery);
  window.addEventListener('keydown', this.closeGalleryEsc);
};

Gallery.prototype.showPicture = function(i) {
  this.setGalleryNumberCurrent(i);
  this.galleryImg.src = this.pictures[i];
  this.galleryPictureCurrent = i;
};

Gallery.prototype.showPrevPicture = function() {
  if (this.galleryPictureCurrent > 0) {
    this.changeUrl(--this.galleryPictureCurrent);
  }
};

Gallery.prototype.showNextPicture = function() {
  if (this.galleryPictureCurrent < this.pictures.length - 1) {
    this.changeUrl(++this.galleryPictureCurrent);
  }
};

Gallery.prototype.changeUrl = function(i) {
  location.hash = '#photo/' + this.pictures[i].match(/img\/\S+/);
};

Gallery.prototype.closeGallery = function() {
  this.galleryContainer.classList.add('invisible');
  this.controlLeft.removeEventListener('click', this.showPrevPicture);
  this.controlRight.removeEventListener('click', this.showNextPicture);
  this.controlClose.removeEventListener('click', this.closeGallery);
  window.removeEventListener('click', this.closeGalleryEsc);
  location.hash = '';
};

Gallery.prototype.closeGalleryEsc = function(evt) {
  if (evt.which === this.KEY_CODE_ESC) {
    this.closeGallery();
  }
};

Gallery.prototype.setGalleryNumberCurrent = function(i) {
  this.galleryNumberCurrent.innerHTML = i + 1;
};

Gallery.prototype.restoreFromHash = function() {
  if (location.hash) {
    var hash = location.hash.match(/#photo\/(\S+)/);
    if (hash !== null) {
      this.showGallery(hash[1]);
    } else {
      this.closeGallery();
    }
  }
};

Gallery.prototype.getGalleryPictures = function(imagesArray) {
  imagesArray.forEach(function(img, i) {
    this.pictures.push(img.src);
    img.dataset.number = i;
  }, this);

  this.galleryNumberTotal.innerHTML = this.pictures.length;
};

module.exports = {
  Gallery: Gallery
};
