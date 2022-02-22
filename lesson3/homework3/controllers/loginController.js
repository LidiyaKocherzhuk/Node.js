const users = require("../db/users");

class loginController {

    loginUser(req, res) {
        req.body.id = users.length ? users[users.length-1].id + 1 : 1;
        users.push(req.body);
        res.redirect("/users");
    }

}

module.exports = new loginController();