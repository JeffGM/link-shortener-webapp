import LinkService from "../application/domain/LinkAggregate/LinkService.js";

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
        } catch(err) {
            return res.status(422).send(err.message);
        }

        return res.send(200, "Success!");
    }

    static addLinkExpirationDate(req, res, dependencyContainer) {
        let owner = req.body.username;
        let shortenedUrl = req.body.url;
        let expirationDate = req.body.date;

        try {
            dependencyContainer["linkService"].addLinkExpirationDate(owner, shortenedUrl, expirationDate);
        } catch(err) {
            return res.status(422).send(err.message);
        }

        return res.send(200, "Success!");
    }

    static advertizeLink(req, res, dependencyContainer) {
        let owner = req.body.username;
        let shortenedUrl = req.body.url;
        let ad = req.body.ad;

        try {
            dependencyContainer["linkService"].advertizeLink(owner, shortenedUrl, ad);
        } catch(err) {
            return res.status(422).send(err.message);
        }

        return res.send(200, "Success!");
    }

    static logLinkVisit(req, res, dependencyContainer) {
        try {
            let url = req.body.url.slice(1);
            let owner = url.split('/')[0];

            dependencyContainer["linkService"].logLinkAccess(owner, url);
        } catch(err) {
            return res.status(422).send("Link not found!");
        }
        return res.send(200, "Success!");
    }

    static logLinkProfit(req, res, dependencyContainer) {
        try {
            let url = req.body.url.slice(1);
            let owner = url.split('/')[0];
            let adId = req.body.adId;

            dependencyContainer["linkService"].logLinkProfit(owner, url, adId);
        } catch(err) {
            return res.status(422).send("Link or ad not found!");
        }
        return res.send(200, "Success!");
    }

    static getStatistics(req, res, dependencyContainer) {
        let owner = req.owner;

        try {
            let result = dependencyContainer["linkService"].getStatistics(owner);
            return res.json(result);
        } catch(err) {
            return res.status(500).send("Error!");
        }
    }

    static followLink(req, res, dependencyContainer) {
        let owner = req.params.owner;
        let url = req.originalUrl.slice(1);
        let password = req.body.password;
        let seenAd = req.body.seenAd;

        let path = dependencyContainer["path"];

        try {
            let action = dependencyContainer["linkService"].followLink(owner, url, password, seenAd);

            if (action == LinkService.AD_REQUIRED) {
                return res.sendFile(path.join(path.resolve() + '/src/views/link-redirect-ad.html'))
            } else if (action == LinkService.PASSWORD_REQUIRED) {
                return res.sendFile(path.join(path.resolve() + '/src/views/link-redirect-password.html'))
            } else {
                if (!password && !seenAd) {
                    res.status(301).redirect(action)
                } else {
                    return res.json({url: action})
                }
            }
        } catch(err) {
            return res.status(422).send("Link not found!");
        }
    }
}