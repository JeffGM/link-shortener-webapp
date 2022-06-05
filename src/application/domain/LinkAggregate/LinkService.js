import Link from "./Link.js";

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

    addLinkPassword(owner, shortenedUrl, password) {
        this.#validateLinkPasswordParams(owner, shortenedUrl, password);

        let link = this.linkRepositoryAdapter.getLinkByUsernameAndShortenedUrl(owner, shortenedUrl);

        if (!link) {
            throw new Error("Couldn't find specified link!");
        }
        
        let encryptedPassword = this.stringCryptUtils.encrypt(password);
        this.linkRepositoryAdapter.updateLinkPassword(owner, shortenedUrl, encryptedPassword);
    }

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

    #validateLinkPasswordParams(owner, shortenedUrl, password) {
        if (!owner) {
            throw new Error("A owner must be specified to add a link password!");
        }
        if (!shortenedUrl) {
            throw new Error("User must specify which link to add the password to!");
        }
        if (!password) {
            throw new Error("User must provide a link password!");
        }
        if (password.length < 1) {
            throw new Error("Link password must have at least one character!");
        }
    }
}