const FS = require('fs');

const DIR = './files/';
const STRING = '_test';


function readFileNames (FS, DIR) {
  const fileNames = FS.readdirSync(DIR, ['utf-8', true]);

  return fileNames.length > 0 ? fileNames : null;
}


function renameFiles (fileNames, FS, DIR, STRING) {
  if (!fileNames) {
    return console.log('There are no files to rename.');
  }

  fileNames.forEach(file => {
    const fileStrings = file.split('.');
    const fileName = fileStrings[0];
    const fileExtantion = fileStrings[1];

    const newName = fileName + STRING + '.' + fileExtantion;

    FS.rename(DIR + file, './DONE/' + newName, err => {
      if (err) {
        throw console.error(err);
        return;
      }
    });
  });
  console.log('OK.');
}

renameFiles (readFileNames (FS, DIR), FS, DIR, STRING);
