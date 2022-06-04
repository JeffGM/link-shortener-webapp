export default class LinkStatistics {
    constructor(numberOfClicks = 0, profit = 0) {
        this.numberOfClicks = numberOfClicks;
        this.profit = profit;
    }

    getNumberOfClicks() {
        return this.numberOfClicks;
    }

    getProfit() {
        return this.profit;
    }
}