const users = require("../db/users");

class usersController {

    usersQuery({query}, res) {
        if (Object.keys(query).length) {
            filteredUsers(query, res);
            return;
        }
        res.render("users", {users});
    }

    userId({params}, res) {

        const {userId} = params;
        const user = users.find(user => user.id.toString() === userId)
        if (!user) {
            const error = `Not found user with ${userId} id !!!`;
            res.redirect(`/error?error=${error}`);
        }
        res.render("user_id", {user});
    }

}

const filteredUsers = (query, res) => {

    let filteredUsers = users;

    if (query.city) {
        filteredUsers = filteredUsers.filter(item => item.city === query.city);
    }
    if (query.age) {
        filteredUsers = filteredUsers.filter(item => item.age.toString() === query.age);
    }

    if (filteredUsers.length) {
        res.render("users", {users: filteredUsers});
    }else {
        res.redirect(`/error?error="Not found!!!"`)
    }

};

module.exports = new usersController();