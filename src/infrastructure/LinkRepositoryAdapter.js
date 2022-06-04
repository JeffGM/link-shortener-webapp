export default class LinkRepositoryAdapter {
    constructor(databasePort) {
        this.databasePort = databasePort;
    }

    saveLink(link) {
        let linkSerialized = link.getSerialized();
        this.databasePort.insertOne('link', linkSerialized);
    }
}