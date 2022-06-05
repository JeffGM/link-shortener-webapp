export default class WebNavigationAdapter {
    static presentLoginPage(req, res, dependencyContainer) {
        let path = dependencyContainer["path"];
        res.sendFile(path.join(path.resolve() + '/src/views/login.html'))
    }
}