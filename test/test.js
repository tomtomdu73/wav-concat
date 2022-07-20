const fs = require('fs')
const expect = require('chai').expect
const wavconcat = require('../')
const files = 'test/audio'

describe('Start testing wav-concat...', function() {
    var songs = [
        files + '/part1.wav',
        files + '/part2.wav'
    ]
    
    var output = 'test/audio/out.wav'

    function clean() {
        fs.unlink(output, function () {})
    }

    before(clean)
    after(clean)

    it('1. Concatenation several wav files', function(done) {
        wavconcat(songs)
        .concat('test/audio/out.wav')
        .on('start', function (cmd) {
          expect(cmd).to.match(/part1.wav/)
          expect(cmd).to.match(/part2.wav/)
        })
        .on('error', done)
        .on('end', function () {
          expect(fs.existsSync(output)).to.be.true
          done()
        })
    });
});