
class signInController {

    signInEmailPassword({user}, res) {
        res.redirect(`/users/${user.id}`);
    }

}

module.exports = new signInController();