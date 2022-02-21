const users = require("../db/users");

class signInController {

    signInEmailPassword({user}, res) {

        console.log(user)
        // res.redirect(`/user_id?user=${user}`);
    }

}

module.exports = new signInController();