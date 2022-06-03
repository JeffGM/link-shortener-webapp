export default class StringCryptUtils {
    constructor(bcrypt) {
        this.bcrypt = bcrypt;
        this.saltRounds = 10;
    } 

    encrypt(stringToEncrypt) {
        return this.bcrypt.hashSync(stringToEncrypt, this.saltRounds);
    }

    compare(stringToCheck, hashedString) {
        return  bcrypt.compareSync(stringToCheck, hashedString);
    }
}