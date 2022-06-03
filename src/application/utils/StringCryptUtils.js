export default class StringCryptUtils {
    constructor(bcrypt) {
        this.bcrypt = bcrypt;
        this.saltRounds = 10;
    } 

    async encrypt(stringToEncrypt) {
        return await this.bcrypt.hash(stringToEncrypt, this.saltRounds, function(err, hash) {
            if (err) {
              throw new Error("An error ocurred while hashing the string!");
            }
            return hash;
        });
    }

    async compare(stringToCheck, hashedString) {
        return await bcrypt.compare(stringToCheck, hashedString, function(err, result) {
            if (err) {
                throw new Error("An error ocurred while comparing the strings!");
            }

            return result;
        });
    }
}