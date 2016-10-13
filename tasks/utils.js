'use strict';

var argv = require('yargs').argv;
var os = require('os');

exports.getEnvName = function () {
    return argv.env || 'development';
};

exports.getPlatformName = function () {
    return "\"" + os.platform() + "\"";
};

exports.beepSound = function () {
    process.stdout.write('\u0007');
};
