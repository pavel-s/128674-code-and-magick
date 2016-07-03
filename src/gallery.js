'use strict';

var galleryContainer = document.querySelector('.overlay-gallery');
var galleryPictures = [];
var controlLeft = galleryContainer.querySelector('.overlay-gallery-control-left');
var controlRight = galleryContainer.querySelector('.overlay-gallery-control-right');
var controlClose = galleryContainer.querySelector('.overlay-gallery-close');
var galleryPreview = galleryContainer.querySelector('.overlay-gallery-preview');
var galleryImg = document.createElement('img');
var galleryNumberCurrent = galleryContainer.querySelector('.preview-number-current');
var galleryNumberTotal = document.querySelector('.preview-number-total');
var galleryPictureCurrent;
var KEY_CODE_ESC = 27;

galleryPreview.appendChild(galleryImg);

function getGalleryPictures(imagesArray) {
  imagesArray.forEach(function(img, i) {
    galleryPictures.push(img.src);
    img.dataset.number = i;
  });
  galleryNumberTotal.innerHTML = galleryPictures.length;
}

function showGallery(i) {
  galleryContainer.classList.remove('invisible');
  setGalleryNumberCurrent(i);
  showPicture(i);

  controlLeft.addEventListener('click', showPrevPicture);
  controlRight.addEventListener('click', showNextPicture);
  controlClose.addEventListener('click', closeGallery);
  window.addEventListener('keydown', closeGalleryEsc);
}

function showPicture(i) {
  setGalleryNumberCurrent(i);
  galleryImg.src = galleryPictures[i];
  galleryPictureCurrent = i;
}

function showPrevPicture() {
  if (galleryPictureCurrent > 0) {
    showPicture(--galleryPictureCurrent);
  }
}

function showNextPicture() {
  if (galleryPictureCurrent < galleryPictures.length - 1) {
    showPicture(++galleryPictureCurrent);
  }
}

function closeGallery() {
  galleryContainer.classList.add('invisible');
  controlLeft.removeEventListener('click', showPrevPicture);
  controlRight.removeEventListener('click', showNextPicture);
  controlClose.removeEventListener('click', closeGallery);
  window.removeEventListener('click', closeGalleryEsc);
}

function closeGalleryEsc(evt) {
  if (evt.which === KEY_CODE_ESC) {
    closeGallery();
  }
}

function setGalleryNumberCurrent(i) {
  galleryNumberCurrent.innerHTML = i + 1;
}

module.exports = {
  showGallery: showGallery,
  getGalleryPictures: getGalleryPictures
};
