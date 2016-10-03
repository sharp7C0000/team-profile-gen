'use strict';

const Config = require('./config.js'); 
const Hapi   = require('hapi');
const Path   = require('path');

const Mongoose = require('mongoose');
const Models   = require('./models.js');

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
    Models.Page.findOne({_id: request.params.pageId}, function (err, doc){
      if(err || !doc) {
        console.log(err);
        reply(err).code(404);
      } else {
        reply.view('view', {page: doc, pageId: request.params.pageId});
      }
    });
  }
});

// POST : saving page
server.route({
  method: 'POST',
  path  : '/new/',
  config: {
    // TODO : payload validation
    payload: {
      maxBytes: 10048576
    }
  },
  handler (request, reply) {

    // Get Members
    const counter = Array.from(Array(parseInt(request.payload.totalMember)).keys());
    const members = counter.map((v, i) => {
      return new Models.Member({
        name    : request.payload[`member[${v}].name`],
        position: request.payload[`member[${v}].position`],
        desc    : request.payload[`member[${v}].desc`],
        image   : request.payload[`member[${v}].image`]
      });
    });

    const newPage = new Models.Page({
      title  : request.payload.title,
      members
    });
    
    newPage.save((err, page) => {
      if (err) {
        console.log(err);
        reply([err.message]).code(500);
      } else {
        reply({
          // if success send url
          data: {
            url: page._id
          }
        }).code(200);
      }
    });
  }
});


///////////////////////////////////////////////////////
////////////// some wall ~~~ //////////////////////////
//////////////////////////////////////////////////////

// Create DB connection
// TODO : Validate db config option

let dbOption = {};
if(Config.db.auth) {
  dbOption = {
    user: Config.db.auth.username,
    pass: Config.db.auth.password,
    auth: {
      authdb: Config.db.auth.authdb
    }
  }
}

Mongoose.connect(`mongodb://${Config.db.host}:${Config.db.port}/${Config.db.dbName}`, dbOption);

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log("Connected DB Success.. Now Open server");

  /** Running server **/
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });

});



