const fs = require("fs");
const path = require("path");

//****
// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали
// запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

// fs.writeFile(path.join(__dirname, "file.txt"), "my txt file", (err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.readFile(path.join(__dirname, "file.txt"), "utf8", (err1, data) => {
//         if (err1) {
//             console.log(err1);
//             throw err1;
//         }
//         fs.writeFile(path.join(__dirname, "file2.txt"), "", (err2 => {
//             if (err2) {
//                 console.log(err2);
//                 throw err2;
//             }
//             fs.appendFile(path.join(__dirname, "file2.txt"), data, (err3 => {
//                 if (err3) {
//                     console.log(err3);
//                     throw err3;
//                 }
//             }));
//         }));
//     });
// }));

//****
// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
// старий файл видаліть після того як все завершиться. Також вийде callback hell
//

// fs.appendFile(path.join(__dirname, "task2", "file1.txt"), " 2. Створіть файл ( можете вручну ) заповніть його якимись даними\n" +
//     "Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,\n" +
//     "старий файл видаліть після того як все завершиться. Також вийде callback hell", (err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//
//     fs.readFile(path.join(__dirname, "task2", "file1.txt"), "utf8",
//         (err1, data) => {
//             if (err1) {
//                 console.log(err1);
//                 throw err1;
//             }
//
//             fs.mkdir(path.join(__dirname, "task2", "file2"), err2 => {
//                 if (err2) {
//                     console.log(err2);
//                     throw err2;
//                 }
//
//                 fs.writeFile(path.join(__dirname, "task2", "file2", "file2.txt"), data,
//                     err3 => {
//                         if (err3) {
//                             console.log(err3);
//                             throw err3;
//                         }
//
//                         fs.unlink(path.join(__dirname, "task2", "file1.txt"),
//                             err4 => {
//                                 if (err4) {
//                                     console.log(err4);
//                                     throw err4;
//                                 }
//                             });
//                     });
//             });
//         });
// }));

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якiсь дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли
// тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх
// перейменувати і додати до назви префікс _new

// for (let i = 1; i < 4; i++) {
//     fs.mkdir(path.join(__dirname, "task3",`folder${i}`), {recursive: true}, err => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     });
// }
//
// for (let i = 1; i < 3; i++) {
//     fs.appendFile(path.join(__dirname, "task3", `file${i}.txt`), "3. Створіть папку (можете вручну) напишіть" +
//         " скріпт який створить в ній якiсь дані\n" +
//         "// (можуть бути нові папки і файли(в файли запишіть якусь дату) )",err => {
//
//     })
// }

const test = (wayTo) => {

    fs.readdir(path.join(__dirname, wayTo), (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }

        data.forEach(value => {
            fs.lstat(path.join(__dirname, wayTo, value), (err1, stat) => {
                if (err1) {
                    console.log(err1);
                    throw err1;
                }
                else if (stat.isFile()) {
                    fs.truncate(path.join(__dirname, wayTo, value), err2 => {
                        if (err2) {
                            console.log(err2);
                            throw err2;
                        }
                    });
                }
                else {
                    fs.rename(path.join(__dirname, wayTo, value), path.
                    join(__dirname, wayTo, `new_${value}`), err3 => {
                        if (err3) {
                            console.log(err3);
                            throw err3;
                        }
                    })
                }
            });
        });
    })
};

test("task3")