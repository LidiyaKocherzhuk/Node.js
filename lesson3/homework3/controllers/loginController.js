const users = require("../db/users");

class loginController {

    loginUser({body}, res) {
        body.id = users.length ? users[users.length-1].id + 1 : 1;
        users.push(body);
        res.redirect("/users");
    }

}

module.exports = new loginController();