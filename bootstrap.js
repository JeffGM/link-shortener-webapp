import JwtUtils from "./src/application/utils/JwtUtils.js";
import StringCryptoUtils from "./src/application/utils/StringCryptUtils.js"
import AccountService from "./src/application/domain/Account/AccountService.js";
import AccountRepositoryAdapter from "./src/infrastructure/AccountRepositoryAdapter.js";
import bcrypt from 'bcrypt';

let jwtUtils = new JwtUtils("my-secret-pass");
let stringCryptoUtils = new StringCryptoUtils(bcrypt);

let accountRepositoryAdapter = new AccountRepositoryAdapter();
let accountService = new AccountService(accountRepositoryAdapter, stringCryptoUtils, accountRepositoryAdapter);

let dependencyContainer = {
    "stringCryptoUtils": stringCryptoUtils,
    "jwtUtils": jwtUtils,
    "accountRepository": accountRepositoryAdapter,
    "accountService": accountService
};

export default dependencyContainer;