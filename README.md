# wav-concat

Wav-concat [node.js](http://nodejs.org) module to concat multiple wav audio files using [ffmpeg](http://ffmpeg.org)

wav-contat provides a programmatic interface to do basically the same as calling `ffmpeg` via CLI like:
```
ffmpeg -i audio1.wav audio2.wav audio3.wav -y -filter_complex concat=n=3:v=0:a=1 out.wav

```

## Requirements

- **[ffmpeg](http://ffmpeg.org)** 

You can download static builds of ffmpeg from [here](http://johnvansickle.com/ffmpeg/).

If you want to use `wav-concat` in Heroku, you could use the [ffmpeg2](https://github.com/h2non/heroku-buildpack-ffmpeg2) buildpack

## Install

```bash
npm install wav-concat
```

## Usage

```js
var wavconcat = require('wav-concat')

var songs = [
  'audio1.wav',
  'audio2.wav',
  'audio3.wav'
]

wavconcat(songs)
  .concat('out.wav')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Audio created in:', output)
  })
```

Take a look to the [programmatic API](#api) for more details

## API

### wav-concat(images, [ options ])
Return: `wavconcat`

wav-concat constructor. You should pass an `array<string>` with the desired audio files.

Supported audio formats: `wav`

#### wav-concat#concat(output)

Merge wav files and generate the output audio to the given file path.

### wav-concat.VERSION
Type: `string`

Current package semantic version

### wav-concat.ffmpeg
Type: `function`

[fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) API constructor

## License

[MIT](http://opensource.org/licenses/MIT) © Thomas Cosialls
