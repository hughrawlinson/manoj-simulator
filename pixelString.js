(function() {
  'use strict';
  const displayConfig = require('./displayConfig.json');
  const R = require('ramda');

  const pixelString = {
    pixelStringToDisplayArray: function(str) {
      return R.compose(R.splitEvery(3), R.map(c => {
        return c.charCodeAt(0);
      }))(str);
    },

    validatePixelString: function(str) {
      if (str.length % displayConfig.pixelDimension !== 0) {
        throw new Error("Invalid Pixel Count");
      }
      // if (!validPixelStringLengthConfig(str,displayConfig)) {
      //     throw new Error("Invalid Length");
      // }
    }
  };

  const pixelCountConfig = config => config.x * config.y;
  const validPixelStringLengthConfig = (str, config) =>
    pixelCountConfig(config) == pixelLengthConfig(str, config);
  const pixelLengthConfig = config => pixelCountConfig * config.pixelDimension;

  module.exports = pixelString;
})();
