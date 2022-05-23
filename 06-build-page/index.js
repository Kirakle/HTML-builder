const fs = require('fs');
const path = require('path');

const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;
});

// Styles

fs.writeFile(
    path.join(__dirname, 'project-dist', 'style.css'),
    '',
    (err) => {
        if (err) throw err;
    }
);

function addStyles(file) {
    fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (error, data) => {
        if (error) return console.error(error.message);
        fs.appendFile(
            path.join(__dirname, 'project-dist', 'style.css'),
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

// Assets 

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
    if (err) throw err;
});

fs.readdir(path.join(__dirname, 'assets'), (err, folders) => {
    if (err) throw err;
    folders.forEach(folder => {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder), { recursive: true }, err => {
            if (err) throw err;
        });
        fs.readdir(path.join(__dirname, 'assets', folder), (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                fs.copyFile(path.join(__dirname, 'assets', folder, file), path.join(__dirname, 'project-dist', 'assets', folder, file), (err) => { if (err) throw err });
            })
        });
    });
});

// html

fs.readFile(path.join(__dirname, 'template.html'), (err, html) => {
    if (err) throw new Error(err);
    let mainHtml = decoder.write(html);
    fs.readdir(path.join(__dirname, 'components'), (err, components) => {
        if (err) throw err;
        components.forEach(component => {
            fs.stat(path.join(__dirname, 'components', component), (err, stat) => {
                if (err) console.log(err.message);
                if (stat.isFile() && path.parse(component).ext.slice(1) === 'html') {
                    fs.readFile(path.join(__dirname, 'components', component), (err, componentHtml) => {
                        if (err) throw new Error(err);
                        componentHtml = decoder.write(componentHtml);
                        mainHtml = mainHtml.replace(`{{${path.parse(component).name}}}`, `${componentHtml}`);
                        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
                            if (err) throw err;
                        });
                        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), mainHtml, (err) => {
                            if (err) throw err;
                        });
                    });
                };
            });
        });
    });
});