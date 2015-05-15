/*eslint-disable no-var*/
'use strict';

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var nodeModulesDir = path.resolve(__dirname, '../node_modules');
var bowerComponentsDir = path.resolve(__dirname, '../bower_components');

function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

module.exports = function(options) {
  options.lint = fs.existsSync(path.resolve(__dirname, '/../.eslintrc')) && options.lint !== false;

  var cssLoaders = 'style!css!autoprefixer?browsers=last 2 versions';
  var lessLoaders = cssLoaders + '!less';

  if (options.production) {
    cssLoaders = extractForProduction(cssLoaders);
    lessLoaders = extractForProduction(lessLoaders);
  }

  return {
    entry: (
      options.production ?
      path.resolve(__dirname, '../app/index.js') :
      [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        path.resolve(__dirname, '../app/index.js')
      ]
    ),
    debug: !options.production,
    devtool: options.devtool,
    output: {
      path: (
        options.production ?
        path.resolve(__dirname, '../dist') :
        path.resolve(__dirname, '../build')
      ),
      publicPath: options.production ? '' : 'http://localhost:8080/',
      filename: options.production ? 'app.[hash].js' : 'app.js'
    },
    module: {
      preLoaders: options.lint ? [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint'
        }
      ] : [],
      loaders: [
        {
          test: /\.js$/,
          exclude: [nodeModulesDir, bowerComponentsDir],
          loaders: options.production ? ['babel'] : ['react-hot', 'babel']
        },
        {
          test: /\.css$/,
          loader: cssLoaders
        },
        {
          test: /\.less$/,
          loader: lessLoaders
        },
        {
          test: /\.png$/,
          loader: 'url?limit=100000&mimetype=image/png'
        },
        {
          test: /\.svg$/,
          loader: 'url?limit=100000&mimetype=image/svg+xml'
        },
        {
          test: /\.gif$/,
          loader: 'url?limit=100000&mimetype=image/gif'
        },
        {
          test: /\.jpg$/,
          loader: 'file'
        },
        {
          test: /\.woff$|.woff2$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf$/,
          loader: 'file-loader'
        },
        {
          test: /\.eot$/,
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.json']
    },
    plugins: options.production ? [
      // Important to keep React file size down
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('app.[hash].css'),
      new HtmlWebpackPlugin({
        template: './conf/template.html',
        favicon: '../app/images/favicon.ico',
        production: true
      })
    ] : [
      new HtmlWebpackPlugin({
        template: './conf/template.html',
        favicon: './app/images/favicon.ico'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
