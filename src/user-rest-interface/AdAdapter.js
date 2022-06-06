export default class AdAdapter {
    static getAd(req, res, dependencyContainer) {
        let ad = dependencyContainer["adService"].getRandomAd();

        return res.json({image: ad.getImage(), adId: ad.getId()})
    }
}