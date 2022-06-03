export class Account {
    constructor(username, email, password) {
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

    getSerialized() {
        return {
            username: this.getUsername(),
            email: this.getEmail(),
            password: this.getPassword()
        }
    }
}