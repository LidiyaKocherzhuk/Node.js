const users = require("../db/users");

class loginController {

    loginUser({body}, res) {
        users.push(body);
        console.log(body)
        res.redirect("/users");
    }

}

module.exports = new loginController();