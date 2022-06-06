import LinkConfig from "./LinkConfig.js"
import LinkStatistics from "./LinkStatistic.js"

// Aggregate's root
export default class Link {
    constructor(originalUrl, shortenedUrl, owner) {
        this.originalUrl = originalUrl;
        this.shortenedUrl = shortenedUrl;
        this.owner = owner;
        this.activated = true;
        this.stats = new LinkStatistics({});
        this.config = new LinkConfig({});
    }

    getOriginalUrl() {
        return this.originalUrl;
    }

    getShortenedUrl() {
        return this.shortenedUrl;
    }

    getOwner() {
        return this.owner;
    }

    getActivated() {
        return this.activated;
    }

    deactivate() {
        this.activated = false;
    }

    getStats() {
        return this.stats;
    }

    getConfig() {
        return this.config;
    }

    updateNumberOfClicks(numberOfClicks) {
        this.config = new LinkStatistics({numberOfClicks});
    }

    updateProfit(profit) {
        this.config = new LinkStatistics({profit});
    }

    updateAd(ad) {
        this.config = new LinkConfig({ad});
    }

    updatePassword(password) {
        this.config = new LinkConfig({password});
    }

    updateExpirationDate(expirationDate) {
        this.config = new LinkConfig({expirationDate});
    }

    getSerialized() {
        return {
            originalUrl: this.getOriginalUrl(),
            shortenedUrl: this.getShortenedUrl(),
            owner: this.getOwner(),
            activated: this.getActivated(),
            numberOfClicks: this.getStats().getNumberOfClicks(),
            profit: this.getStats().getProfit(),
            ad: this.getConfig().getAd(),
            password: this.getConfig().getPassword(),
            expirationDate: this.getConfig().getExpirationDate()
        }
    }
}