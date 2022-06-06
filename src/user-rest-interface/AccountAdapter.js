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

    static login(req, res, dependencyContainer) {
        let username = req.body.username;
        let password = req.body.password;
        let authToken;

        try {
            authToken = dependencyContainer["accountService"].login(username, password);
        } catch(err) {
            return res.status(403).send(err.message);
        }

        var newDate = new Date();
        var expDate = newDate.setMonth(newDate.getMonth() + 1)
        res.cookie('id', authToken, { sameSite: true, maxAge: expDate });

        return res.json({authToken: authToken});
    }
}