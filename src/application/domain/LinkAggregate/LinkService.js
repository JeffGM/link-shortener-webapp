import Link from "./Link.js"

export default class LinkService {
    constructor(linkRepositoryAdapter, stringCryptUtils, urlShorteningUtils) {
        this.linkRepositoryAdapter = linkRepositoryAdapter;
        this.stringCryptUtils = stringCryptUtils;
        this.urlShorteningUtils = urlShorteningUtils;
    }

    createLink(owner, originalUrl) {
        this.#validateNewLinkFields(owner, originalUrl);

        let shortenedUrl = this.urlShorteningUtils(originalUrl);
        let newLink = new Link(originalUrl, shortenedUrl, owner);

        try {
            this.linkRepositoryAdapter.saveLink(newLink);
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new Error("Original url already registered");
            }
        }

        return shortenedUrl;
    }

    // followLink() {

    // }

    // advertizeLink() {

    // }

    // addLinkPassword() {

    // }

    // addLinkExpirationDate() {

    // }

    // checkLinkStats() {

    // }

    #validateNewLinkFields(owner, originalUrl) {
        if (!owner) {
            throw new Error("Link must have an owner!");
        }
        if (!originalUrl) {
            throw new Error("Link must have an original url!");
        }
    }
}