class Account {
    constructor(email, password) {
        this.validateFields(email, password);
        this.email = email;
        this.password = password;
    }
    
    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    validateFields(email, password) {
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