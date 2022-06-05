import AccountAdapter from "./AccountAdapter.js";
import LinkAdapter from "./LinkAdapter.js";

export default function(app, dependencyContainer) {
    app.post('/account', (req, res) => AccountAdapter.createAccount(req, res, dependencyContainer))
    app.post('/link', (req, res) => LinkAdapter.createLink(req, res, dependencyContainer))
    app.post('/password', (req, res) => LinkAdapter.addLinkPassword(req, res, dependencyContainer))
    app.post('/expiration', (req, res) => LinkAdapter.addLinkExpirationDate(req, res, dependencyContainer))
}