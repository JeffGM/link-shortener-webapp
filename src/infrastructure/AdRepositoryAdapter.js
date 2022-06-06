import Ad from "../application/domain/Ad/Ad.js";

export default class AdRepositoryAdapter {
    constructor(databasePort) {
        this.databasePort = databasePort;
    }

    getRandomAd() {
        let allAds = this.databasePort.select('ad', null, 10000);
        let randomAd = allAds[Math.floor(Math.random() * allAds.length)];

        return new Ad(randomAd["id"], randomAd["base64Image"], randomAd["costPerView"]);
    }

    getAd(adId) {
        let ad = this.databasePort.selectOne('ad', {id: adId});
        ad = ad[0];
        return new Ad(ad["id"], ad["base64Image"], ad["costPerView"]);
    }
}