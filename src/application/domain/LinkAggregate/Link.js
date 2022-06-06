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
        this.config.numberOfClicks = numberOfClicks;
    }

    updateProfit(profit) {
        this.stats.profit = profit;
    }

    updateAd(ad) {
        this.config.ad = ad;
    }

    updatePassword(password) {
        this.config.password = password;
    }

    updateExpirationDate(expirationDate) {
        this.config.expirationDate = expirationDate;
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