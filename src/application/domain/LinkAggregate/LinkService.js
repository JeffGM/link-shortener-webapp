import Link from "./Link.js";

export default class LinkService {
    static PASSWORD_REQUIRED = 1;
    static AD_REQUIRED = 2;

    constructor(adService, linkRepositoryAdapter, stringCryptUtils, urlShorteningUtils, urlIdGenerator) {
        this.linkRepositoryAdapter = linkRepositoryAdapter;
        this.stringCryptUtils = stringCryptUtils;
        this.urlShorteningUtils = urlShorteningUtils;
        this.urlIdGenerator = urlIdGenerator;
        this.adService = adService;
    }

    createLink(owner, originalUrl) {
        this.#validateNewLinkFields(owner, originalUrl);

        let shortenedUrl = this.urlShorteningUtils(owner, this.urlIdGenerator);
        let newLink = new Link(null, originalUrl, shortenedUrl, owner);

        try {
            this.linkRepositoryAdapter.saveLink(newLink);
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new Error("Original url already registered");
            }
        }

        return shortenedUrl;
    }

    followLink(owner, shortenedUrl, password, seenAd) {
        let {link} = this.linkRepositoryAdapter.getLinkByUsernameAndShortenedUrl(owner, shortenedUrl);

        if (!link) {
            throw new Error("Couldn't find specified link for this user!");
        }

        if (this.#linkNeedsToSeeAd(link, seenAd) && !password) {
            return LinkService.AD_REQUIRED;
        }

        if (this.#linkNeedsPassword(link, password)) {
            return LinkService.PASSWORD_REQUIRED;
        }

        return link.getOriginalUrl();
    }

    getStatistics(owner) {
        let allLinks = this.linkRepositoryAdapter.getAllLinksFromOwner(owner);

        let statistics = {
            access: [],
            profit: []
        };

        for(let i = 0; i < allLinks.length; i++) {
            let currentLink = allLinks[i];
            statistics.access.push(this.linkRepositoryAdapter.getAccessesFromLink(currentLink.getId()));
            statistics.profit.push(this.linkRepositoryAdapter.getProfitFromLink(currentLink.getId()));
        }

        return statistics;
    }

    #linkNeedsPassword(link, password) {
        if (link.getConfig().getPassword()) {
            if (!password) {
                return true;
            }
            return !this.stringCryptUtils.compare(password, link.getConfig().getPassword());
        }

        return false;
    }

    #linkNeedsToSeeAd(link, seenAd) {
        if (link.getConfig().getAd()) {
            return !seenAd;
        }

        return false;
    }

    advertizeLink(owner, shortenedUrl, ad) {
        this.#validateAdvertizeLinkParams(owner, shortenedUrl, ad);

        let {link} = this.linkRepositoryAdapter.getLinkByUsernameAndShortenedUrl(owner, shortenedUrl);
        if (!link) {
            throw new Error("Couldn't find specified link for this user!");
        }
        
        link.updateAd(ad);
        this.linkRepositoryAdapter.updateLinkAd(link);
    }

    addLinkPassword(owner, shortenedUrl, password) {
        this.#validateAddLinkPasswordParams(owner, shortenedUrl, password);

        let {link} = this.linkRepositoryAdapter.getLinkByUsernameAndShortenedUrl(owner, shortenedUrl);
        if (!link) {
            throw new Error("Couldn't find specified link for this user!");
        }
        
        let encryptedPassword = this.stringCryptUtils.encrypt(password);
        link.updatePassword(encryptedPassword);
        this.linkRepositoryAdapter.updateLinkPassword(link);
    }

    addLinkExpirationDate(owner, shortenedUrl, expirationDate) {
        this.#validateAddLinkExpirationDateParams(owner, shortenedUrl, expirationDate);

        let {link} = this.linkRepositoryAdapter.getLinkByUsernameAndShortenedUrl(owner, shortenedUrl);

        if (!link) {
            throw new Error("Couldn't find specified link for this user!");
        }

        link.updateExpirationDate(expirationDate);
        this.linkRepositoryAdapter.updateLinkExpirationDate(link);
    }

    logLinkAccess(owner, shortenedUrl) {
        let {link} = this.linkRepositoryAdapter.getLinkByUsernameAndShortenedUrl(owner, shortenedUrl);
        this.linkRepositoryAdapter.addAccessStatistic(link);
    }

    logLinkProfit(owner, shortenedUrl, adId) {
        let {link} = this.linkRepositoryAdapter.getLinkByUsernameAndShortenedUrl(owner, shortenedUrl);
        let profit = this.adService.getAdCost(adId);
        this.linkRepositoryAdapter.addProfitStatistic(link, profit);
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

    #validateAdvertizeLinkParams(owner, shortenedUrl, ad) {
        if (!owner) {
            throw new Error("A owner must be specified to add a link advert!");
        }
        if (!shortenedUrl) {
            throw new Error("User must specify which link to add the advert to!");
        }
        if (!ad) {
            throw new Error("User must provide a link advert!");
        }
    }
}