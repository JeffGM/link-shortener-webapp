import { Account } from "../application/domain/Account/Account.js";

export default class AccountRepositoryAdapter {
    constructor(databasePort) {
        this.databasePort = databasePort;
    }

    saveAccount(account) {
        let accountSerialized = account.getSerialized();
        this.databasePort.insertOne('account', accountSerialized);
    }

    getAccountByUsername(username) {
        let rawAccount = this.databasePort.selectOne('account', {username: username});
        if (!rawAccount) {
            return;
        }

        return new Account(rawAccount[0]["username"], rawAccount[0]["email"], rawAccount[0]["password"])
    }
}