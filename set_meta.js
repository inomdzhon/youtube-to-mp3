const path = require('path');
const fs = require('fs');
const ffmetadata = require("ffmetadata");

function setMetaData(filePath, metadata) {
  return new Promise((resolve, reject) => {
    ffmetadata.write(filePath, metadata, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve(`Data written: ${filePath}`);
      };
    });
  })
}

function getMetaData(filePath) {
  return new Promise((resolve, reject) => {
    ffmetadata.read(filePath, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      };
    });
  })
}

async function init(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (!file.includes('.mp3')) {
      continue;
    }

    const artistAndSong = file.replace(/\.mp3/, '').split('-');

    try {
      const result = await setMetaData(path.resolve(dir, file), {
        artists: artistAndSong[0] ? artistAndSong[0].trim() : '',
        title: artistAndSong[1] ? artistAndSong[1].trim() : '',
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

init('all');
