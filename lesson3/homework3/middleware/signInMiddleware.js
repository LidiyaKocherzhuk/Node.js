const users = require("../db/users");

function includeEmail (req, res, next) {
    try {

        const userId = users.find(user =>
            user.email === req.body.email && user.password === req.body.password);

        if (!userId) {
            throw new Error("Not Found email or password!");
        }
        console.log(userId);
        req.user = userId;
        next();
    }

    catch (err) {
        res.redirect(`/error?error=${err.message}`);
    }

}

module.exports = includeEmail;