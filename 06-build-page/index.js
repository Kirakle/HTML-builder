const fs = require('fs');
const path = require('path');

const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

// Assets 

fs.rm(path.join(__dirname, 'project-dist'), { recursive: true }, () => {

    fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
        if (err) throw err;
    });

    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => { });

    const copyFilesFromFolder = (folder, targetFolder) => {
        fs.readdir(path.join(__dirname, folder), { withFileTypes: true }, (err, files) => {
            if (err) console.log(err);
            files.forEach(file => {

                if (file.isFile()) {
                    fs.copyFile(path.join(__dirname, folder, file.name), path.join(__dirname, targetFolder, file.name), err => {
                        if (err) console.log(err);
                    });
                } else {
                    fs.mkdir(path.join(__dirname, targetFolder, file.name), () => { });
                    copyFilesFromFolder(`${folder}/${file.name}`, `${targetFolder}/${file.name}`);
                }

            });
        });
    };
    copyFilesFromFolder('assets', 'project-dist/assets');
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


// fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
//     if (err) throw err;
// });

// const copyFilesFromFolder = (folder) => {
//     fs.readdir(folder, (err, files) => {
//         if (err) throw err;
//         files.forEach((file) => {
//             console.log(file);
//             fs.stat(path.join(folder, file), (err, stat) => {
//                 if (err) throw err;
//                 if (stat.isFile()) {
//                     let rigthAdress = folder.slice(0, 51) + 'project-dist\\' + folder.slice(58, folder.length);
//                     // console.log('**********');
//                     // console.log(path.join(folder, file));
//                     // console.log(path.join(rigthAdress, file));
//                     // console.log('**********');

//                     fs.copyFile(
//                         path.join(folder, file),
//                         path.join(rigthAdress, file),
//                         () => {}
//                     );
//                 };
//                 if (stat.isDirectory()) {
//                     let rigthAdress = folder.slice(0, 51) + 'project-dist\\' + folder.slice(58, folder.length);
//                     fs.mkdir(path.join(rigthAdress, path.parse(folder).name, file), { recursive: true }, err => {
//                         if (err) throw err;
//                     });
//                     copyFilesFromFolder(path.join(folder, file));
//                 };
//             });
//         });
//     });
// };

// copyFilesFromFolder(path.join(__dirname, 'assets'), 'assets');
