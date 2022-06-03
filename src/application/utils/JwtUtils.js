export default class JwtUtils {
    constructor(jwt, secretKey) {
        this.jwt = jwt;
        this.secretKey = secretKey;
    }

    getTokenForAccount(email) {
        return this.jwt.sign({account: email}, this.secretKey);
    }
}