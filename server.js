/*eslint-disable no-var*/
'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./conf/webpack.config');

var server = new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  hot: true,
  publicPath: config.output.publicPath,
  quiet: false,
  noInfo: false,
  stats: {
    assets: false,
    chunkModules: false,
    chunks: true,
    colors: true,
    hash: false,
    progress: false,
    timings: true,
    version: false
  }
});

server.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
