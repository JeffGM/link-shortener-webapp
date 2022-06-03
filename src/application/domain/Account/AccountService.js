import { Account } from "./Account.js";

export default class AccountService {
    constructor(accountRepositoryAdapter, stringCryptUtils, jwtUtils) {
        this.accountRepositoryAdapter = accountRepositoryAdapter;
        this.stringCryptUtils = stringCryptUtils;
        this.jwtUtils = jwtUtils;
    }

    createAccount(username, email, password) {
        this.#validateNewAccountFields(username, email, password);

        let encryptedPassword = this.stringCryptUtils.encrypt(password)
        let newAccount = new Account(username, email, encryptedPassword);
        
        try {
            this.accountRepositoryAdapter.saveAccount(newAccount);
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new Error("Email or username already registered");
            }
        }
    }

    login(username, password) {
        this.#validateLoginParams(username, password);

        let desiredAccount = this.accountRepositoryAdapter.getAccountByUsername(username);

        if (!desiredAccount) {
            throw new Error("No account found with the specified credentials!");
        }

        let isTheSamePassword = this.stringCryptUtils.compare(password, desiredAccount.getPassword());

        if (!isTheSamePassword) {
            throw new Error("No account found with the specified credentials!");
        }

        return this.jwtUtils.getTokenForAccount(email);
    }

    #validateLoginParams(email, password) {
        if (!email) {
            throw new Error("An email must be informed to log in!");
        }

        if (!password) {
            throw new Error("A password must be informed to log in!");
        }
    }

    #validateNewAccountFields(username, email, password) {
        this.#validateEmail(email);

        if (!username) {
            throw new Error("Account must have an username!");
        }
        if (!password) {
            throw new Error("Account must have an password!");
        }
        if (password.length < 8) {
            throw new Error("Account password must have at least 8 characters!");
        }
    }

    #validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isEmailValid = re.test(String(email).toLowerCase());
        if (!isEmailValid) {
            throw new Error("Invalid email!")
        }
    }
}