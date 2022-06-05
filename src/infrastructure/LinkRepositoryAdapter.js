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
        let byParams = {
            owner: owner,
            shortenedUrl: shortenedUrl
        };
        let queryResult = this.databasePort.selectOne('link', byParams);
        let link = this.#createLinkEntityFromQueryResult(queryResult);
        return link;
    }

    updateLinkPassword(owner, shortenedUrl, password) {
        let byParams = {
            password: password
        };
        let where = {
            owner: owner,
            shortenedUrl: shortenedUrl
        };
        this.databasePort.updateOne('link', byParams, where);
    }

    updateLinkExpirationDate(owner, shortenedUrl, expirationDate) {
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
        let link = new Link(originalUrl, shortenedUrl, owner);
        
        if (activated === 'false') {
            link.deactivate();
        }
        if (numberOfClicks !== 0 || profit !== 0) {
            link.updateStats(numberOfClicks, profit);
        }
        if (ad || password || expirationDate) {
            link.updateConfig(ad, password, expirationDate);
        }

        return link;
    }
}