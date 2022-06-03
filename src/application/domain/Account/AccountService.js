import Account from "Account.js";

class AccountService {
    constructor(accountRepositoryAdapter, stringEncryptor) {
        this.accountRepositoryAdapter = accountRepositoryAdapter;
        this.stringEncryptor = stringEncryptor;
    }

    createAccount(email, password) {
        let isEmailValid = this.validateEmail(email);
        if (!isEmailValid) {
            throw new Error("Invalid email!")
        }

        let newAccount = new Account(email, password);   
        this.accountRepositoryAdapter.saveAccount(newAccount);
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}