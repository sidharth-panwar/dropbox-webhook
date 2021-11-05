const ACCESS_TOKEN = '';
const dropbox = require('dropbox');
const _ = require('underscore');
const dbx = new dropbox.Dropbox({ accessToken: ACCESS_TOKEN });

async function start() {
    var response = await dbx.filesListFolder({ path: '/highlights/inbox' });
    _.each(response.result.entries, await processCSV);
}

async function processCSV(entry) {

    var response = await dbx.filesDownload({ path: entry.path_lower });
    var fileStr = response.result.fileBinary.toString('utf8');

    //Create a new md file in processed folder
    var mdPath = entry.path_lower.replace('/inbox', '/processed');
    mdPath = entry.path_lower.replace('.csv', '.md').replace('/inbox', '/processed');

    var lines = fileStr.split('"\r\n');

    var mdFile = '';
    _.each(lines, (line) => {

        var items = line.split('",');

        if (items.length < 20) return;

        var timestamp = items[5].replaceAll(/[T:Z"]/g, '');

        //annotations are comments that I've made for the highlight
        var annotation = items[19].slice(1);

        var highlightText = items[20].slice(1);
        var mdHighlight = `- ${timestamp} ${highlightText}\n`;

        if (!!annotation && annotation.length > 0)
            mdHighlight += `\t- ${annotation}\n`;

        mdFile += mdHighlight;
    });
    dbx.filesUpload({ path: mdPath, contents: mdFile });
    dbx.filesMoveV2({ from_path: entry.path_lower, to_path: entry.path_lower.replace('/inbox', '/processed') });
}

start();