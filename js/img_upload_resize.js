'use strict';

(function () {
  window.imgUploadResize = function (overlay, overlayPreview) {
    var resize = overlay.querySelector('.img-upload__resize');
    var plus = resize.querySelector('.resize__control--plus');
    var minus = resize.querySelector('.resize__control--minus');
    var value = resize.querySelector('.resize__control--value');

    var SCALE_COUNTER = 100;
    var RATIO = 100;
    var MAX_VALUE = 100;
    var MIN_VALUE = 25;
    var STEP = 25;

    minus.addEventListener('click', function () {
      SCALE_COUNTER = SCALE_COUNTER > MIN_VALUE ? SCALE_COUNTER -= STEP : MIN_VALUE;
      overlayPreview.style.transform = 'scale(' + (SCALE_COUNTER / RATIO) + ')';

      value.value = SCALE_COUNTER + '%';
    });

    plus.addEventListener('click', function () {
      SCALE_COUNTER = SCALE_COUNTER < MAX_VALUE ? SCALE_COUNTER += STEP : MAX_VALUE;
      overlayPreview.style.transform = 'scale(' + (SCALE_COUNTER / RATIO) + ')';

      value.value = SCALE_COUNTER + '%';
    });

    window.resetPopupSize = function () {
      overlayPreview.style.transform = 'scale(1)';
      SCALE_COUNTER = 100;
      value.value = '100%';
    };
  };
})();
