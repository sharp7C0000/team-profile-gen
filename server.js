'use strict';

const Config = require('./config.js'); 
const Hapi   = require('hapi');
const Path   = require('path');

// to compile jsx component
require("babel-register")({
  "presets": ["es2015", "react"]
});

const Mongoose = require('mongoose');
const Models   = require('./models.js');

const React          = require('react');
const ReactDOMServer = require('react-dom/server');

const createStore = require('redux').createStore;

const Provider = require('react-redux').Provider;

const ViewApp = require('./assets/scripts/view/components/app.jsx').default;
const viewApp = require('./assets/scripts/view/redux/reducers').default;

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
    title: 'Team Profile Page Generator',
    mode : process.env.NODE_ENV
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
  path: '/public/{param*}',
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

        let members = doc.members.map((m) => {

          let image = null;

          if(m.image) {
            image = `data:image;base64,${m.image.toString('base64')}`;
          }

          return {
            image   : image,
            name    : m.name,
            position: m.position,
            desc    : m.desc
          }
        });
        
        const preloadedState = { page: {
            title  : doc.title,
            members: members
          }
        };

        // Create a new Redux store instance
        const store = createStore(viewApp, preloadedState)

        // Grab the initial state from our Redux store
        const finalState = store.getState()

        reply.view('view', {
          page  : doc, 
          pageId: request.params.pageId,
          
          preloadedState: finalState,
          markup        : ReactDOMServer.renderToString(React.createElement(Provider, {store: store}, 
            React.createElement(ViewApp)
          ))
        });
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
        
        const pageUrl = request.connection.info.protocol + '://' + request.info.host + "/view/" + page._id;

        reply({
          // if success send page id and url
          data: {
            id    : page._id,
            url   : pageUrl
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



