import Account from "Account.js";

class AccountService {
    constructor(accountRepositoryAdapter, stringEncryptorUtil, jwtUtil) {
        this.accountRepositoryAdapter = accountRepositoryAdapter;
        this.stringEncryptor = stringEncryptorUtil;
        this.jwtUtil = jwtUtil;
    }

    createAccount(username, email, password) {
        this.validateEmail(email);

        let encryptedPassword = this.stringEncryptorUtil.encrypt(password)
        let newAccount = new Account(username, email, encryptedPassword);   
        this.accountRepositoryAdapter.saveAccount(newAccount);
    }

    login(username, password) {
        this.validateLoginParams(username, password);
        let encryptedPassword = this.stringEncryptorUtil.encrypt(password);

        let loggedAccount = this.accountRepositoryAdapter.getAccountByUsernameAndPassword(username, encryptedPassword);

        if (!loggedAccount) {
            throw new Error("No account found with the specified credentials!");
        }

        return this.jwtUtil.getTokenForAccount(email);
    }

    validateLoginParams(email, password) {
        if (!email) {
            throw new Error("An email must be informed to log in!");
        }

        if (!password) {
            throw new Error("A password must be informed to log in!");
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isEmailValid = re.test(String(email).toLowerCase());
        if (!isEmailValid) {
            throw new Error("Invalid email!")
        }
    }
}