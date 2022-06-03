import Account from "Account.js";

class AccountService {
    constructor(accountRepositoryAdapter, stringEncryptorUtil, jwtUtil) {
        this.accountRepositoryAdapter = accountRepositoryAdapter;
        this.stringEncryptor = stringEncryptorUtil;
        this.jwtUtil = jwtUtil;
    }

    createAccount(email, password) {
        let isEmailValid = this.validateEmail(email);
        if (!isEmailValid) {
            throw new Error("Invalid email!")
        }

        let encryptedPassword = this.stringEncryptorUtil.encrypt(password)
        let newAccount = new Account(email, encryptedPassword);   
        this.accountRepositoryAdapter.saveAccount(newAccount);
    }

    login(email, password) {
        this.validateLoginParams(email, password);
        let encryptedPassword = this.stringEncryptorUtil.encrypt(password);

        let loggedAccount = this.accountRepositoryAdapter.getAccount(email, encryptedPassword);

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
        return re.test(String(email).toLowerCase());
    }
}