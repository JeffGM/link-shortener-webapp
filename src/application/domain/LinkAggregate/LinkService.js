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
        this.#validateAddLinkPasswordParams(owner, shortenedUrl, password);

        let link = this.linkRepositoryAdapter.getLinkByUsernameAndShortenedUrl(owner, shortenedUrl);

        if (!link) {
            throw new Error("Couldn't find specified link for this user!");
        }
        
        let encryptedPassword = this.stringCryptUtils.encrypt(password);
        this.linkRepositoryAdapter.updateLinkPassword(owner, shortenedUrl, encryptedPassword);
    }

    addLinkExpirationDate(owner, shortenedUrl, expirationDate) {
        this.#validateAddLinkExpirationDateParams(owner, shortenedUrl, expirationDate);

        let link = this.linkRepositoryAdapter.getLinkByUsernameAndShortenedUrl(owner, shortenedUrl);

        if (!link) {
            throw new Error("Couldn't find specified link for this user!");
        }

        this.linkRepositoryAdapter.updateLinkExpirationDate(owner, shortenedUrl, expirationDate);
    }

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

    #validateAddLinkPasswordParams(owner, shortenedUrl, password) {
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

    #validateAddLinkExpirationDateParams(owner, shortenedUrl, expirationDate) {
        if (!owner) {
            throw new Error("A owner must be specified to add a link expiration date!");
        }
        if (!shortenedUrl) {
            throw new Error("User must specify which link to add the expiration date to!");
        }
        if (!expirationDate) {
            throw new Error("User must provide a link expiration date!");
        }
        this.#validateDateFormat(expirationDate);
    }

    #validateDateFormat(date) {
        const re = /(\d{4})-(\d{2})-(\d{2})/;
        let isDateValid = re.test(String(date));
        if (!isDateValid) {
            throw new Error("Invalid date!")
        }
    }
}