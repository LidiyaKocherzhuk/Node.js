const users = require("../db/users");

const includeEmail = (req, res, next) => {

    try {

        users.forEach(item => {
            if (item.email === req.body.email) {
                throw new Error("Not valid")
            }
            next();
        });

    } catch (err) {
        res.redirect(`/error?error=${err.message}`);
    }

};

const includeAll = (req, res, next) => {
    try {

        const {firstName, lastName, email, password, age, city} = req.body;
        if (!firstName || !lastName) {
            throw new Error("Must be firstName and lastName!")
        }
        if (!email || !email.includes("@")) {
            throw new Error("Not Valid!")
        }
        if (password < 6) {
            throw new Error("Not Valid (password must be min 6 chars!)");
        }
        if (!age || age<18) {
            throw new Error("Not Valid (Age mast be min 18)!")
        }
        if (!city) {
            throw new Error("Not Valid!")
        }

        next();

    } catch (err) {
        res.redirect(`/error?error=${err.message}`);
    }

};

module.exports = {includeEmail, includeAll};