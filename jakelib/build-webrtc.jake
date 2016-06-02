/* global task:false */
'use strict';

var config = require('./config');
var execSync = require('child_process').execSync;
var ninja = require('./ninja');
var log = require('./log');
var path = require('path');

var OUT_LIB = config.OUT_LIB;
var WEBRTC_CHECKOUT_SRC = config.WEBRTC_CHECKOUT_SRC;
var WEBRTC_OUT = config.WEBRTC_OUT;

directory(OUT_LIB);

task('build-webrtc', ['checkout-webrtc', OUT_LIB], function() {
  log('Running ninja');
  ninja(WEBRTC_OUT, { cwd: WEBRTC_CHECKOUT_SRC });

  log('Merging libs');
  var mergeLibsCmd = execSync([
    'python',
    path.join(WEBRTC_CHECKOUT_SRC, 'webrtc', 'build', 'merge_libs.py'),
    WEBRTC_OUT,
    path.join(OUT_LIB, 'libwebrtc.a')].join(' '));
  execSync(mergeLibsCmd, { stdio: 'inherit' });
});
