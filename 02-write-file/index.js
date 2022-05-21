const path = require('path');
const fs = require('fs');
const process = require('process');
const { stdout, stdin, exit } = process;
const readline = require('readline');

stdout.write('Введите что-угодно\n');
fs.writeFile(
    path.join(__dirname, 'text.txt'), '',
    (err) => {
        if (err) throw err;
    }
);

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

rl.on('line', (text) => {
    switch (text) {
        case 'exit':
            console.log('Скрипт выполнен');
            exit();
        default:
            fs.appendFile(path.join(__dirname, 'text.txt'), `${text}\n`, () => { });
            break;
    }
}).on('close', () => {
    console.log('Скрипт выполнен');
    exit();
});


// 2 вариант, без прощального сообщения при ctrl + c
// const { stdout, stdin, exit } = process;
// const fs = require('fs');
// const path = require('path');

// process.on('exit', () => stdout.write('Скрипт выполнен'));

// stdout.write('Введите что-угодно\n');

// function init() {
//     fs.writeFile(
//         path.join(__dirname, 'text.txt'), '',
//         (err) => {
//             if (err) throw err;
//             console.log('Файл был создан');
//         }
//     );
// }

// function create(text) {
//     fs.access(path.join(__dirname, 'text.txt'), fs.constants.F_OK, (err) => {
//         if (err) init();

//         fs.readFile(path.join(__dirname, 'text.txt'), (error, data) => {
//             if (error) return console.error(error.message);
//             let changedText = data + text;

//             fs.writeFile(path.join(__dirname, 'text.txt'), changedText, (error) => {
//                 if (error) return console.error(error.message);
//             });
//         });

//     });
// };


// stdin.on('data', data => {
//     data.toString();
//     if (data.toString() === 'exit' || data.toString() === 'exit\n' || data.toString() === 'exit\r' || data.toString() === 'exit\r\n') {
//         exit();
//     }
//     create(data.toString());
// });

