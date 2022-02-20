// декілька ендпоінтів зробити
//
// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле),
// password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект
// робити на сторінку з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то
// редірект на еррор пейдж
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age
// і city
// 3. /user/:id сторінка з інфою про одного юзера
//
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");
const {use} = require("express/lib/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", ".hbs");
app.engine(".hbs", engine({defaultLayout: false}));
app.set("views", path.join(__dirname, "static"));

let users = [
    {
        firstName: 'Glenna',
        lastName: 'Mcmillan',
        email: 'rexyrodi@mailinator.com',
        password: 'Ducimus dolorum inc',
        age: 75,
        city: 'Rivne'
    },
    {
        firstName: 'Yolanda',
        lastName: 'Talley',
        email: 'vome@mailinator.com',
        password: 'Exercitation minus e',
        age: 25,
        city: 'Kiev'
    },
    {
        firstName: 'Uta',
        lastName: 'Short',
        email: 'kugoreda@mailinator.com',
        password: 'Sit dolorum odit est',
        age: 32,
        city: 'Lviv'
    }
];
let error = ``;


app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {

    includeEmail(users, req.body.email, res);
    users.push(req.body);
    res.redirect("/users");

});

app.get("/users", (req, res) => {

    if (Object.keys(req.query).length) {
        queryFilter(req.query, res);
        return;
    }
    res.render("users", {users});

});

app.get("/users/:userId", (req, res) => {

    const {userId} = req.params;
    const user = users.find((user, id) => (id + 1).toString() === userId);
    if (!user) {
        error = `Not found user with ${userId} id !!!`;
        res.redirect("/error");
    }
    res.render("user_id", {user});

});

//<CLASSWORK>
// Необхідно розширити ваше ДЗ:
//     - додайте ендпоінт signIn який буде приймати email і password і якщо все вірно то редірект
//     на сторінку цього

app.get("/signIn", (req, res) => {
    res.render("signIn");
});

app.post("/signIn", ({body}, res) => {

    const userId = users.find((user, id) => {
        if (user.email === body.email && user.password === body.password) {
            return id;
        }
    });

    if (!userId) {
        error = 'Wrong email or password!';
        res.redirect('/error');
        return;
    }

    res.redirect(`/users/${userId}`);

})

// </CLASSWORK>

app.get("/error", (req, res) => {
    res.render("error", {error});
});

app.listen(3100, () => {
    console.log("Server has started on PORT 3100");
});


const includeEmail = (arr, email, res) => {

    arr.forEach(item => {
        if (item.email === email) {
            error = "Not Found!!!"
            res.redirect("/error")
        }
    });

};

const queryFilter = (query, res) => {

    let filteredUsers = [...users];

    if (query.city) {
        filteredUsers = filteredUsers.filter(item => item.city === query.city);
    }
    if (query.age) {
        filteredUsers = filteredUsers.filter(item => item.age.toString() === query.age);
    }

    res.render("users", {users:filteredUsers});

}

