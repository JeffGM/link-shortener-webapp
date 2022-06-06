import Link from "../application/domain/LinkAggregate/Link.js";

export default class LinkRepositoryAdapter {
    constructor(databasePort) {
        this.databasePort = databasePort;
    }

    saveLink(link) {
        let linkSerialized = link.getSerialized();
        this.databasePort.insertOne('link', linkSerialized);
    }

    getLinkByUsernameAndShortenedUrl(owner, shortenedUrl) {
        console.log("Entered getLinkByUsernameAndShortenedUrl");
        let byParams = {
            owner: owner,
            shortenedUrl: shortenedUrl
        };
        let queryResult = this.databasePort.selectOne('link', byParams);
        if (queryResult.length === 0) {
            return;
        }
        let link = this.#createLinkEntityFromQueryResult(queryResult[0]);
        return link;
    }

    updateLinkPassword(link) {
        const {password, owner, shortenedUrl} = link.getSerialized();
        let byParams = {
            password: password
        };
        let where = {
            owner: owner,
            shortenedUrl: shortenedUrl
        };
        this.databasePort.updateOne('link', byParams, where);
    }

    updateLinkExpirationDate(link) {
        const {expirationDate, owner, shortenedUrl} = link.getSerialized();
        let byParams = {
            expirationDate: expirationDate
        };
        let where = {
            owner: owner,
            shortenedUrl: shortenedUrl
        };
        this.databasePort.updateOne('link', byParams, where);
    }

    #createLinkEntityFromQueryResult({
        originalUrl,
        shortenedUrl,
        owner,
        activated,
        numberOfClicks,
        profit,
        ad,
        password,
        expirationDate
    }) {
        console.log("Entered createLinkEntityFromQueryResult");
        let link = new Link(originalUrl, shortenedUrl, owner);
        
        if (activated === 'false') {
            link.deactivate();
        }
        if (numberOfClicks !== 0) {
            link.updateNumberOfClicks(numberOfClicks);
        }
        if (profit !== 0) {
            link.updateProfit(profit);
        }
        if (ad) {
            link.updateAd(ad);
        }
        if (password) {
            link.updatePassword(password);
        }
        if (expirationDate) {
            link.updateExpirationDate(expirationDate);
        }

        return link;
    }
}