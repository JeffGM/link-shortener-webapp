export default class AdService {
    constructor(adRepositoryAdapter) {
        this.adRepositoryAdapter = adRepositoryAdapter;
    }

    getRandomAd() {
        let randomAd = this.adRepositoryAdapter.getRandomAd();
        return randomAd;
    }

    getAdCost(adId) {
        let ad = this.adRepositoryAdapter.getAd(adId);
        return ad.getCostInCents() / 100;
    }
}