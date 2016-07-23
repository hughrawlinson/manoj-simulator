(function() {
  'use strict';
  const Hapi = require('hapi');
  const displayConfig = require('./displayConfig');
  const pixelString = require('./pixelString');

  const createServer = function(send) {
    const server = new Hapi.Server();
    server.connection({
      port: displayConfig.port || 3000
    });

    // Handle display request
    server.route({
      method: 'POST',
      path: '/',
      handler: function(request, reply) {
        try {
          pixelString.validatePixelString(request.payload);
        } catch (e) {
          reply("422: Unprocessable Entity")
            .code(422);
          return;
        }
        const displayArray = pixelString.pixelStringToDisplayArray(request.payload);
        send(displayArray);
        reply("Ok");
      }
    });

    // Provide display configuration
    server.route({
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        reply(displayConfig);
      }
    });

    server.start((err) => {
      if (err) {
        throw err;
      }
    });
  };

  module.exports = createServer;
})();
