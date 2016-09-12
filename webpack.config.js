const babelLoader           = require('babel-loader');
const babelTransformRuntime = require('babel-plugin-transform-runtime');

const path        = require("path");
const glob        = require('glob');
const webpack     = require('webpack');

const ENTRY_PATTERN = "./assets/scripts/**/entry.jsx";
const VENDOR_CHUNK  = "vendor";
const VENDORS = [
  "react",
  "react-dom"
];

var webpackEntry = {};

// common bundles
glob.sync(ENTRY_PATTERN).forEach((file) => {
  var entryName = path.dirname(file).match(/([^\/]+\/)*([^\/]+)/).pop();
  webpackEntry[entryName] = file;
});

// vendor
webpackEntry[VENDOR_CHUNK] = VENDORS;

module.exports = {
  entry: webpackEntry,
  output: {
    path    : __dirname,
    filename: "[name].bundle.js"
  },
  babel: {
    presets: ['es2015', 'react'],
    plugins: ['transform-runtime']
  },
  module: {
    loaders: [
      // babel loader
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime']
        }
      },
      
      // sass loader
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },

      // css loader
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
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