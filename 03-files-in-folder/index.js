const fs = require('fs');
const path = require('path');


let fileinfo = '';
fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
    if (err) console.log(err.message);
    for (let i = 0; i < files.length; i++) {
        fs.stat(path.join(__dirname, 'secret-folder', files[i]), (err, stat) => {
            if (err) console.log(err.message);
            if (stat.isFile()) {
                fileinfo += path.parse(files[i]).name + ' - ' + path.parse(files[i]).ext.slice(1) + ' - ' + `${stat.size / 1000}kb` + '\n';
            }
            if (i === files.length - 1) console.log(fileinfo);
        });
    };
});

