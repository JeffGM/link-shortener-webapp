export default class AccountRepositoryAdapter {
    constructor(databasePort) {
        this.databasePort = databasePort;
    }

    saveAccount(account) {
        let accountSerialized = account.getSerialized();
        this.databasePort.insertOne('account', accountSerialized);
    }


    getAccountByUsername(username) {
        console.log("found account by username!"); //TODO: implement
    }
}