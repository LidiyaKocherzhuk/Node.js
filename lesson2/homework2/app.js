const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");

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
        city: 'Earum'
    },
    {
        firstName: 'Yolanda',
        lastName: 'Talley',
        email: 'vome@mailinator.com',
        password: 'Exercitation minus e',
        age: 25,
        city: 'Proident'
    },
    {
        firstName: 'Uta',
        lastName: 'Short',
        email: 'kugoreda@mailinator.com',
        password: 'Sit dolorum odit est',
        age: 32,
        city: 'Et'
    }
];


app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/users", (req, res) => {
    res.render("users", {users})
});

// app.get("/user/:useId",(req,res)=>{
//
// })

app.post("/login", (req, res) => {
    includeEmail(users, req.body.email, res);
    users.push(req.body);
    res.redirect("/users");
    console.log(req.body)
});

app.get("/error_email", (req,res)=>{
    res.render("error_email");
})

app.get("/not_found", (req,res)=>{
    res.render("not_found");
})


app.listen(3100, () => {
    console.log("Server has started on PORT 3100");
});


const includeEmail = (arr, email, res) => {
    arr.map(value => {
        if (value.email === email) {
            res.redirect("/errorEmail")
        }
    })
}