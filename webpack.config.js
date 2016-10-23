const babelTransformRuntime = require('babel-plugin-transform-runtime');

const path    = require("path");
const glob    = require('glob');
const webpack = require('webpack');

const ENTRY_PATTERN = "./assets/**/main.jsx";
const VENDOR_CHUNK  = "vendor";
const VENDORS = [
  "react",
  "react-dom",
  "redux",
  "react-redux"
];

var webpackEntry = {};

// vendor
webpackEntry[VENDOR_CHUNK] = VENDORS;

// common bundles
glob.sync(ENTRY_PATTERN).forEach((file) => {
  var entryName = path.dirname(file).match(/([^\/]+\/)*([^\/]+)/).pop();
  webpackEntry[entryName] = file;
});

module.exports = {
  entry: webpackEntry,
  
  output: {
    path         : path.join(__dirname, "/public"),
    filename     : "[name].bundle.js",
    publicPath   : "/assets/"
  },

  devServer: {
    host        : "0.0.0.0",
    port        : 6767,
    contentBase : "./assets",
    inline      : true,
    watchOptions: {
      aggregateTimeout: 300,
      poll            : 1000
    }
  },

  module: {
    loaders: [
      // babel loader
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime']
        }
      },
      // font loader
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(VENDOR_CHUNK, VENDOR_CHUNK + ".js")
  ]
};