export default class Ad {
    constructor(id, base64Image, costPerView) {
        this.base64Image = base64Image;
        this.costPerView = costPerView;
        this.id = id;
    }

    getId() {
        return this.id;
    }
    
    getImage() {
        return this.base64Image;
    }

    getCostInCents() {
        return this.costPerView;
    }
}