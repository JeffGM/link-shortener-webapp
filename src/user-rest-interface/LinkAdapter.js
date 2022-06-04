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
}