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
        firstName: "firstName",
        lastName: "lastName",
        email: "email@uuu.o",
        password: "password",
        age: 25,
        city: "city",
        id:1
    },
]
let error = ``;


app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", ({body}, res) => {

    includeEmail(users, body.email, res);
    body.id = users.length ? users[users.length-1].id + 1 : 1;
    users.push(body);
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
    const user = users.find(user => user.id.toString() === userId);
    if (!user) {
        error = `Not found user with ${userId} id !!!`;
        res.redirect("/error");
    }
    res.render("user_id", {user});

});

app.get("/signIn", (req, res) => {
    res.render("signIn");
});

app.post("/signIn", ({body}, res) => {

    const user = users.find(user => user.email === body.email && user.password === body.password);

    if (!user) {
        error = 'Wrong email or password!';
        res.redirect('/error');
        return;
    }

    res.redirect(`/users/${user.id}`);

})

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

    let filteredUsers = users;

    if (query.city) {
        filteredUsers = filteredUsers.filter(item => item.city === query.city);
    }
    if (query.age) {
        filteredUsers = filteredUsers.filter(item => item.age.toString() === query.age);
    }
    if (!filteredUsers.length) {
        error = "Not Found";
        res.redirect("/error");
    }

    res.render("users", {users:filteredUsers});

}

