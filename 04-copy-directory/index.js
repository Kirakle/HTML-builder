const path = require('path');
const fs = require('fs');

fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, () => {
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, () => { });
    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            fs.copyFile(
                path.join(__dirname, 'files', file),
                path.join(__dirname, 'files-copy', file),
                () => { }
            );
        });
    });
});

