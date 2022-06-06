export default class WebNavigationAdapter {
    static presentLoginPage(req, res, dependencyContainer) {
        let path = dependencyContainer["path"];
        res.sendFile(path.join(path.resolve() + '/src/views/login.html'))
    }

    static presentRegisterPage(req, res, dependencyContainer) {
        let path = dependencyContainer["path"];
        res.sendFile(path.join(path.resolve() + '/src/views/cadastro.html'))
    }

    static presentBaseUrl(req, res, dependencyContainer) {
        let path = dependencyContainer["path"];
        res.sendFile(path.join(path.resolve() + '/src/views/cadastro.html'))
    }

    static presentDashboard(req, res, dependencyContainer) {
        let path = dependencyContainer["path"];
        res.sendFile(path.join(path.resolve() + '/src/views/cadastro.html'))
    }

    static presentAdPage(req, res, dependencyContainer) {
        let path = dependencyContainer["path"];
        res.sendFile(path.join(path.resolve() + '/src/views/link-redirect-ad.html'))
    }
}