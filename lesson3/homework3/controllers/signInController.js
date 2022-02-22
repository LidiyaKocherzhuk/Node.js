
class signInController {

    signInEmailPassword(req, res) {
        res.redirect(`/users/${req.user.id}`);
    }

}

module.exports = new signInController();