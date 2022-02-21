const users = require("../db/users");

function includeEmail(req, res, next) {
    try {

        const user = users.find(user =>
            user.email === req.body.email && user.password === req.body.password);

        if (!user) {
            throw new Error("Not Found user!");
        }

        req.user = user;
        next();

    } catch (err) {
        res.redirect(`/error?error=${err.message}`);
    }

}

module.exports = includeEmail;