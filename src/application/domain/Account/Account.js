class Account {
    constructor(username, email, password) {
        this.validateFields(username, email, password);
        this.username = username;
        this.email = email;
        this.password = password;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    validateFields(username, email, password) {
        if (!username) {
            throw new Error("Account must have an username!");
        }
        if (!email) {
            throw new Error("Account must have an email!");
        }
        if (!password) {
            throw new Error("Account must have an password!");
        }
        if (password.lenght < 8) {
            throw new Error("Account password must have at least 8 characters!");
        }
    }
}