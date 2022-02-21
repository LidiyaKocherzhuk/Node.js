const users = require("../db/users");

const includeEmail = ({body}, res, next) => {

    try {

        users.forEach(item => {
            if (item.email === body.email) {
                throw new Error("Not valid")
            }
            next();
        });

    } catch (err) {
        res.redirect(`/error?error=${err.message}`);
    }


};

module.exports = includeEmail;