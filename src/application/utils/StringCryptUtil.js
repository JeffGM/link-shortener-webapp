class StringCryptUtil {
    constructor(bcrypt) {
        this.bcrypt = bcrypt;
        this.saltRounds = 10;
    } 

    encrypt(stringToEncrypt) {
        return await this.bcrypt.hash(stringToEncrypt, this.saltRounds, function(err, hash) {
            if (err) {
              throw new Error("An error ocurred while hashing the string!");
            }
            return hash;
        });
    }

    compare(stringToCheck, hashedString) {
        return await bcrypt.compare(stringToCheck, hashedString, function(err, result) {
            if (err) {
                throw new Error("An error ocurred while comparing the strings!");
            }

            return result;
        });
    }
}