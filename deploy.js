/*eslint-disable no-var*/
'use strict';

// Postinstall will also run when npm install is run locally
// so we make sure deploy only happens in production
if (process.env.NODE_ENV === 'production') {
  var childProcess = require('child_process');
  console.log('Deploying...');
  return childProcess.exec(
    './node_modules/.bin/webpack --config conf/webpack.production.js',
    function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
  );
}
