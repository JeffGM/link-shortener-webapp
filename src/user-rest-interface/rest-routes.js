import AccountAdapter from "./AccountAdapter.js";
import LinkAdapter from "./LinkAdapter.js";
import WebNavigationAdapter from "./WebNavigationAdapter.js";
import AuthMiddleware from "./AuthMiddleware.js";
import AdAdapter from "./AdAdapter.js";

export default function(app, dependencyContainer) {
    //api requests
    app.post('/account', (req, res) => AccountAdapter.createAccount(req, res, dependencyContainer))
    app.post('/login', (req, res) => AccountAdapter.login(req, res, dependencyContainer))
    app.post('/link', (req, res) => LinkAdapter.createLink(req, res, dependencyContainer))
    app.post('/password', (req, res) => LinkAdapter.addLinkPassword(req, res, dependencyContainer))
    app.post('/expiration', (req, res) => LinkAdapter.addLinkExpirationDate(req, res, dependencyContainer))
    app.get('/ad', (req, res) => AdAdapter.getAd(req, res, dependencyContainer))
    app.post('/ad', (req, res) => LinkAdapter.advertizeLink(req, res, dependencyContainer))
    
    app.post('/:owner/:code', (req, res) => LinkAdapter.followLink(req, res, dependencyContainer))
    app.get('/:owner/:code', (req, res) => LinkAdapter.followLink(req, res, dependencyContainer))

    app.post('/log-access', (req, res) => LinkAdapter.logLinkVisit(req, res, dependencyContainer))
    app.post('/log-profit', (req, res) => LinkAdapter.logLinkProfit(req, res, dependencyContainer))

    app.get('/statistics', 
    (req, res, next) => AuthMiddleware.authenticate(req, res, next, dependencyContainer), 
    (req, res) => LinkAdapter.getStatistics(req, res, dependencyContainer))

    //web pages
    app.get('/login', (req, res) => WebNavigationAdapter.presentLoginPage(req, res, dependencyContainer))
    app.get('/register', (req, res) => WebNavigationAdapter.presentRegisterPage(req, res, dependencyContainer))
    
    app.get('/dashboard',
        (req, res, next) => AuthMiddleware.authenticate(req, res, next, dependencyContainer), 
        (req, res) => WebNavigationAdapter.presentDashboard(req, res, dependencyContainer))
}