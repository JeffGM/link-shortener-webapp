import AccountAdapter from "./AccountAdapter.js";
import LinkAdapter from "./LinkAdapter.js";
import WebNavigationAdapter from "./WebNavigationAdapter.js";

export default function(app, dependencyContainer) {
    //api requests
    app.post('/account', (req, res) => AccountAdapter.createAccount(req, res, dependencyContainer))
    app.post('/login', (req, res) => AccountAdapter.login(req, res, dependencyContainer))
    app.post('/link', (req, res) => LinkAdapter.createLink(req, res, dependencyContainer))
    app.post('/password', (req, res) => LinkAdapter.addLinkPassword(req, res, dependencyContainer))

    //web pages
    app.get('/login', (req, res) => WebNavigationAdapter.presentLoginPage(req, res, dependencyContainer))
}