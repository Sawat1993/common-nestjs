
var path = require('path');
var rfs = require('rotating-file-stream');

export var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});
