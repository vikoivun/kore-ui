/*eslint-disable no-var*/
'use strict';

var webpackConfig = require('./webpack.config.js');

module.exports = function(options) {
  var karmaConfig = {
    frameworks: ['mocha', 'chai'],

    browsers: ['Chrome'],

    // Running tests with coverage migth take some time
    browserNoActivityTimeout: 60000,

    autoWatch: true,

    files: [
      '../app/**/__tests__/*.js'
    ],

    preprocessors: {
      '../app/**/__tests__/*.js': ['webpack']
    },

    webpackMiddleware: {
        noInfo: true
    },

    reporters: ['mocha'],

    plugins: [
      'karma-chai',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-webpack'
    ]
  };

  if (options.coverage) {
    // Needs to load first to prevent linting issues
    webpackConfig.module.preLoaders = [
      {
        test: /\.js$/,
        exclude: /(__tests__|node_modules)/,
        loader: 'isparta-instrumenter-loader'
      }
    ].concat(webpackConfig.module.preLoaders);

    karmaConfig.plugins.push('karma-coverage');

    karmaConfig.coverageReporter = {
      dir: '../coverage',
      reporters: options.coverageReporters || [
        {type: 'text'},
        {type: 'html'}
      ]
    };

    karmaConfig.reporters.push('coverage');
  }

  karmaConfig.webpack = webpackConfig;

  return karmaConfig;
};
