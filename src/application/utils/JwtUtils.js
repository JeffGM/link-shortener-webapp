export default class JwtUtils {
    constructor(jwt, secretKey) {
        this.jwt = jwt;
        this.secretKey = secretKey;
    }

    getTokenForAccount(username) {
        return this.jwt.sign({account: username}, this.secretKey);
    }

    getAccountFromToken(token) {
        return this.jwt.verify(token, this.secretKey);
    }
}