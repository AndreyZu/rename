/**
 * Settings
 * @property {string} string - add string to the end of the name.
 * @property {boolean} replace - replace forbidden chars.
 * @property {boolean} random - add random string to the end of the name.
 * @property {string} dir - directory with the files to rename.
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
 * @returns {string}
 */
function replaceChars (name) {
    return name
        .replace(/[ ()]/ig, '_')
        .replace(/[х]/ig, 'x')
        .replace(/[^a-z_0-9-]/ig, '');
}

function readFileNames (settings) {
    const fileNames = settings.fs.readdirSync(settings.dir, ['utf-8', true]);

    return fileNames.length > 0 ? fileNames : false;
}

function renameFiles (fileNames, settings) {
    if (!fileNames) {
        return console.log('There are no files to rename.');
    }

    fileNames.forEach(file => {
        const fileStrings = file.split('.');
        const FILE_NAME = fileStrings.length > 1 ? fileStrings.slice(0, fileStrings.length - 1).join('_') : fileStrings[0];
        const FILE_EXTENSION = fileStrings.length > 1 ? fileStrings[fileStrings.length - 1] : false;

        const NEW_NAME = (settings.replace ? replaceChars(FILE_NAME) : FILE_NAME)
            + (settings.string.length > 0 ? '_' + settings.string : '')
            + (settings.random ? '_' + randomString() : '')
            + (FILE_EXTENSION ? '.' + FILE_EXTENSION : '');

        settings.fs.rename(settings.dir + file, './done/' + NEW_NAME, err => {
            if (err) {
                throw new Error(`Could not rename file ${err}`);
            }
        });
    });
    console.log('OK.');
}

renameFiles (readFileNames (settings), settings);
