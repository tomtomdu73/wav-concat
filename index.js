var ffmpeg = require('fluent-ffmpeg')
var version = require('./package.json').version

module.exports = exports = function (inputs, opts) {
  return new Wavconcat(inputs, opts)
}

exports.VERSION = version
exports.ffmpeg = ffmpeg

function Wavconcat(inputs, opts) {
  this.inputs = inputs || []
  this.opts = opts || {}
}

Wavconcat.prototype.concat = function (file) {
  if (file) {
    this.opts.output = file
  }
  return concat(this.inputs, this.opts)
}

function concat(inputs, opts) {

  var renderer = ffmpeg();

  inputs.forEach(element => {
    renderer.addInput(element)      
  });

  var output = opts.output
  if (output) {
    return renderer.mergeToFile(output)
  }

  return renderer
}
