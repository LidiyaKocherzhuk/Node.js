// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)

const path = require("path");
const fs = require("fs");


// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
//

fs.mkdir(path.join(__dirname, "main"), err => {
    if (err) {
        console.log(err);
        throw err;
    }

    const createFolders = (name) => {
        fs.mkdir(path.join(__dirname, "main", name), err => {
            if (err) {
                console.log(err);
                throw err;
            }

            if (name === "online") {
                createFiles(name, "onlineUsers.txt");
            }

            if (name === "inPerson")
                createFiles(name, "inPersonUsers.txt");
        });
    }
    createFolders("online");
    createFolders("inPerson");
});

// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user
// ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;

const onlineUsers = [
    {name: "Vasiya", age: 25, city: "Lviv"},
    {name: "Olha", age: 12, city: "Kiev"},
    {name: "Kateryna", age: 35, city: "Odesa"},
]
const inPersonUsers = [
    {name: "Petro", age: 40, city: "Rivne"},
    {name: "Roman", age: 15, city: "Kiev"},
]

// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
// але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.

const createFiles = (folder, nameFile) => {

    fs.writeFile(path.join(__dirname, "main", folder, nameFile), "", (err => {
            if (err) {
                console.log(err,);
                throw err;
            }

            if (nameFile === "onlineUsers.txt") {
                appFile(onlineUsers, folder, nameFile);
            }

            if (nameFile === "inPersonUsers.txt") {
                appFile(inPersonUsers, folder, nameFile);
            }

            rename(path.join(__dirname, "main", "online", "onlineUsers.txt"),
                path.join(__dirname, "main", "inPerson", "inPersonUsers.txt"));
        }
    ));
};


const appFile = (arr, folder, nameFile) => {

    for (let i = 0; i < arr.length; i++) {
        const user = arr[i];
        for (const key in user) {

            fs.appendFile(path.join(__dirname, "main", folder, nameFile),
                `${key}=${user[key]}\n`, (err => {

                        if (err) {
                            console.log(err,);
                            throw err;
                        }
                    }
                ))
        }
    }
};


// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)

const rename = (firstFile, secondFile) => {

        const deleteFileValue = (nameFile) => {
            fs.truncate(nameFile, err => {
                if (err) {
                    console.log(err,);
                    throw err;
                }
            })
        };

        deleteFileValue(firstFile);
        deleteFileValue(secondFile);

        appFile(onlineUsers, "inPerson", "inPersonUsers.txt");
        appFile(inPersonUsers, "online", "onlineUsers.txt");
};




