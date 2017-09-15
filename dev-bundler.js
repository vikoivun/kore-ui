/* eslint-disable no-var */


var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./conf/webpack.config.js');

module.exports = function () {
  var bundleStart = null;
  var compiler = webpack(config);
  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });
  compiler.plugin('done', () => {
    console.log(`Bundled in ${Date.now() - bundleStart}ms!`);
  });

  var bundler = new WebpackDevServer(compiler, {
    historyApiFallback: true,
    hot: true,
    inline: true,
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
      timings: false,
      version: false,
    },
  });

  bundler.listen(8080, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
};
