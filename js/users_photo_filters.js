'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;


  var imgFilters = document.querySelector('.img-filters');
  var imgButtons = imgFilters.querySelectorAll('.img-filters__button');
  imgFilters.classList.remove('img-filters--inactive');


  var ImgFilterMethods = {
    'filter-popular': function (data) {
      var newData = window.copyArray(data);
      return newData;
    },
    'filter-new': function (data) {
      var newData = window.copyArray(data);
      return window.shuffleArray(newData).splice(0, 10);
    },
    'filter-discussed': function (data) {
      var newData = window.copyArray(data);
      newData.sort(function (a, b) {
        var next = a.comments.length;
        var prev = b.comments.length;
        return prev - next;
      });
      return newData;
    }
  };


  var container = window.picturesContainer;
  var updatePictureElements = function (data, elemId) {
    var imgUpload = container.querySelector('.img-upload');
    var picturesTitle = container.querySelector('.pictures__title');

    container.removeChild(picturesTitle);
    container.removeChild(imgUpload);
    container.innerHTML = '';
    container.appendChild(picturesTitle);
    container.appendChild(imgUpload);

    var filteredPictures = ImgFilterMethods[elemId](data);
    window.renderPictureElements(filteredPictures);
  };

  var onFiltersButtonClick = window.debounce(function (filter) {
    updatePictureElements(window.pictures, filter);
  }, DEBOUNCE_INTERVAL);


  var addFiltersButtonListener = function (elem) {
    elem.addEventListener('click', function () {
      var imgFiltersActiveButton = imgFilters.querySelector('.img-filters__button--active');
      imgFiltersActiveButton.classList.remove('img-filters__button--active');
      elem.classList.add('img-filters__button--active');

      onFiltersButtonClick(elem.id);
    });
  };

  imgButtons.forEach(function (btn) {
    addFiltersButtonListener(btn);
  });
})();
