(function() {
  const {
    ipcRenderer
  } = require('electron');
  const R = require('ramda');
  var gaussian = require('gaussian');
  var distribution = gaussian(0.5, 0.1);

  var canvas = document.getElementById('display');
  var ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  var displayConfig = require('./displayConfig.json');
  ipcRenderer.on('info', function(event, data) {
    const d = new ImageData(new Uint8ClampedArray(R.compose(R.flatten, R.map(a => {
      return R.append(255)(a);
    }))(data)), displayConfig.x, displayConfig.y);
    console.log(d);
    ctx.putImageData(scaleImageData(d, displayConfig.res),0,0);
  });

  function scaleImageData(imageData, scale) {
    var scaled = ctx.createImageData(imageData.width * scale, imageData.height * scale);

    for(var row = 0; row < imageData.height; row++) {
      for(var col = 0; col < imageData.width; col++) {
        var sourcePixel = [
          imageData.data[(row * imageData.width + col) * 4 + 0],
          imageData.data[(row * imageData.width + col) * 4 + 1],
          imageData.data[(row * imageData.width + col) * 4 + 2],
          imageData.data[(row * imageData.width + col) * 4 + 3]
        ];
        for(var y = 0; y < scale; y++) {
          var destRow = row * scale + y;
          for(var x = 0; x < scale; x++) {
            var destCol = col * scale + x;
            for(var i = 0; i < 4; i++) {
              let value = sourcePixel[i];
              if(i === 3){
                value = value * distribution.pdf(y/scale) * distribution.pdf(x/scale);
              }
              scaled.data[(destRow * scaled.width + destCol) * 4 + i] = value;
            }
          }
        }
      }
    }

    return scaled;
  }
})();
