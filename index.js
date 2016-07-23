(function() {
  'use strict';

  const app = require('./app')();
  const server = require('./server')(app.send);
})();
