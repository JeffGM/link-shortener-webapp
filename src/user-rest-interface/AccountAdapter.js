export default class AccountAdapter {
    static createAccount(req, res, dependencyContainer) {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;

        try {
            dependencyContainer["accountService"].createAccount(username, email, password);
        } catch(err) {
            return res.status(422).send(err.message);
        }

        return res.send(200, "Success!");
    }
}