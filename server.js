'use strict';

const Config = require('./config.js'); 
const Hapi   = require('hapi');
const Path   = require('path');

// TODO : check Config is valid
const server = new Hapi.Server();
server.connection({ host: Config.host, port: Config.port });

/** Install static serve **/
server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }
});

/** Install template engine **/
server.register(require('vision'), (err) => {
  
  if (err) {
    throw err;
  }

  const globalViewContext = {
    title: 'Team Profile Page Generator'
  };

  server.views({
    engines   : { ejs: require('ejs') },
    relativeTo: __dirname,
    path      : 'views',
    context   : globalViewContext
  });
});

/** routes **/

// GET : server public files
server.route({
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
});

// GET : rendering index page
server.route({
  method: 'GET',
  path  : '/',
  handler (request, reply) {
    reply.view('index');
  }
});

// GET : rendering new page
server.route({
  method: 'GET',
  path  : '/new/',
  handler (request, reply) {
    reply.view('new');
  }
});

// GET : rendering view page
server.route({
  method: 'GET',
  path  : '/view/{pageId}',
  handler (request, reply) {
    reply.view('view', {pageId: request.params.pageId});
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