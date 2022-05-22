const fs = require('fs');
const path = require('path');

fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    (err) => {
        if (err) throw err;
    }
);

function addStyles(file) {
    fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (error, data) => {
        if (error) return console.error(error.message);
        fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            `${data}\n`,
            err => {
                if (err) throw err;
            }
        );
    });
};

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) console.log(err.message);
    for (let i = 0; i < files.length; i++) {
        fs.stat(path.join(__dirname, 'styles', files[i]), (err, stat) => {
            if (err) console.log(err.message);
            if (stat.isFile() && path.parse(files[i]).ext.slice(1) === 'css') {
                addStyles(files[i]);
            };
        });
    };
});