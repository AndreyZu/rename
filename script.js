/**
 * Settings
 * string - add string to the end of the name.
 * replace - replace forbidden chars.
 * random - add random string to the end of the name.
 * dir - directory with the files to rename.
 * @type {{random: boolean, string: string, replace: boolean, dir: string, fs: module:fs}}
 */
const settings = {
    string: 'test',
    replace: true,
    random: false,
    dir: './files/',
    fs: require('fs')
};

/**
 * Add random string to the name.
 * @param length {number}
 * @returns {string}
 */
function randomString(length = 12) {
    let result = [];
    const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const CHAR_LENGTH = CHARS.length;

    for (let i = 0; i < length; i++) {
        result.push(CHARS.charAt(Math.floor(Math.random() * CHAR_LENGTH)));
    }

    return result.join('');
}

/**
 * Replace forbidden chars in the name.
 * @param name
 * @returns {*}
 */
function replaceChars (name) {
    return name
        .replace(/[ ]/ig, '_')
        .replace(/[х]/ig, 'x')
        .replace(/[а-яё]/ig, '');
}

function readFileNames (settings) {
    const fileNames = settings.fs.readdirSync(settings.dir, ['utf-8', true]);

    return fileNames.length > 0 ? fileNames : null;
}

function renameFiles (fileNames, settings) {
    if (!fileNames) {
        return console.log('There are no files to rename.');
    }

    fileNames.forEach(file => {
        const fileStrings = file.split('.');
        const fileName = fileStrings[0];
        const fileExtantion = fileStrings[1];

        const newName = (settings.replace ? replaceChars(fileName) : fileName)
            + '_' + settings.string
            + (settings.random ? '_' + randomString() : '')
            + '.' + fileExtantion;

        settings.fs.rename(settings.dir + file, './done/' + newName, err => {
            if (err) {
                throw new Error(`Could not rename file ${err}`);
            }
        });
    });
    console.log('OK.');
}

renameFiles (readFileNames (settings), settings);
