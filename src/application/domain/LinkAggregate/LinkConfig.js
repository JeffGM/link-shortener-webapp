export default class LinkConfig {
    constructor({ad = 0, password = null, expirationDate = null}) {
        this.ad = ad;
        this.password = password;
        this.expirationDate = expirationDate;
    }

    getAd() {
        return this.ad;
    }

    getPassword() {
        return this.password;
    }

    getExpirationDate() {
        return this.expirationDate;
    }
}