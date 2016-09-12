'use strict';

const Config = require('./config.js'); 
const Hapi   = require('hapi');
const Path   = require('path');

// TODO : check Config is valid
const server = new Hapi.Server();
server.connection({ host: Config.host, port: Config.port });

/** Install template engine **/
server.register(require('vision'), (err) => {
  
  if (err) {
    throw err;
  }

  server.views({
    engines   : { ejs: require('ejs') },
    relativeTo: __dirname,
    path      : 'views'
  });
});

/** routes **/

// GET : index
// desc - randering index page
server.route({
  method: 'GET',
  path  : '/',
  handler (request, reply) {
    reply.view('index', { title: 'My home page' });
  }
});


///////////////////////////////////////////////////////
////////////// some wall ~~~ //////////////////////////
//////////////////////////////////////////////////////

/** Running server **/
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});