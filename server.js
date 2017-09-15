/* eslint-disable no-var */


var express = require('express');
var path = require('path');

var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3000;
var publicPath = (
  isProduction ?
    path.resolve(__dirname, './dist') :
    path.resolve(__dirname, './build')
);

app.use(express.static(publicPath));

// Use dev server if we are not in production.
if (!isProduction) {
  var httpProxy = require('http-proxy');
  var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
  });
  var bundle = require('./dev-bundler.js');
  bundle();
  app.all('/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080',
    });
  });
  proxy.on('error', () => {
    console.log('Could not connect to proxy, please try again...');
  });
}

// Run the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
