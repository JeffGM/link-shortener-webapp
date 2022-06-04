import AccountAdapter from "./AccountAdapter.js";

export default function(app, dependencyContainer) {
    app.post('/account', (req, res) => AccountAdapter.createAccount(req, res, dependencyContainer))
}