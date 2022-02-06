const path = require('path');
const fs = require('fs');
const cyrillicToTranslit = require('cyrillic-to-translit-js');

function init(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((oldName, index) => {
    const translatitName = cyrillicToTranslit().transform(oldName.replace(/\.mp3/, '').replace(/\(.+\)/g, ''));

    const newName = translatitName.split('-').reduce((acc, fileName, index) => {
      if (index > 0) {
        acc += '_';
      }

      acc += fileName.toLowerCase().trim().slice(0, 1);

      return acc;
    }, '');

    const oldFilePath = path.join(dir, oldName);
    const newFilePath = path.join(dir, `${newName}_${index}.mp3`);

    fs.renameSync(oldFilePath, newFilePath);
  });
}

init('all');
