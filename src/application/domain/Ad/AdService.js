export default class AdService {
    constructor(adRepositoryAdapter) {
        this.adRepositoryAdapter = adRepositoryAdapter;
    }

    getRandomAd() {
        let randomAd = this.adRepositoryAdapter.getRandomAd();
        return randomAd;
    }
}