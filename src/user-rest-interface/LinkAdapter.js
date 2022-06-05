export default class LinkAdapter {
    static createLink(req, res, dependencyContainer) {
        let owner = req.body.username;
        let originalUrl = req.body.url;
        let shortenedUrl;

        try {
            shortenedUrl = dependencyContainer["linkService"].createLink(owner, originalUrl);
        } catch(err) {
            return res.status(422).send(err.message);
        }

        return res.send(200, "Success! -> " + shortenedUrl);
    }

    static addLinkPassword(req, res, dependencyContainer) {
        let owner = req.body.username;
        let shortenedUrl = req.body.url;
        let password = req.body.password;

        try {
            dependencyContainer["linkService"].addLinkPassword(owner, shortenedUrl, password);
            console.log("Returned from addLinkPassword service");
        } catch(err) {
            return res.status(422).send(err.message);
        }

        return res.send(200, "Success!");
    }
}