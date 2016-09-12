'use strict';

const Config = require('./config.js'); 
const Hapi   = require('hapi');

// TODO : check Config is valid
const server = new Hapi.Server();
server.connection({ host: Config.host, port: Config.port });

// routes.. 
server.route({
  method: 'GET',
  path  : '/',
  handler (request, reply) {
    reply('Hello, world!');
  }
});

server.start((err) => {
  if (err) {
      throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});