const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

const urls = require('./urls.js');

function download(props) {
  return new Promise((resolve, reject) => {
    const stream = ytdl(props.url);

    const proc = new ffmpeg({ source: stream });

    proc.setFfmpegPath('/usr/local/bin/ffmpeg');

    proc.saveToFile(`./source/${props.name}.mp3`)
        .on('error', (error) => reject(error))
        .on('end', () => resolve());
  });
}

async function init() {
  for (const url of urls) {
    try {
      console.log('', url.name);
      await download(url);
      console.log('done');
    } catch (e) {
      console.error(e);
      continue;
    }
  }
}

init();
