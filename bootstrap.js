import JwtUtils from "./src/application/utils/JwtUtils.js";
import StringCryptoUtils from "./src/application/utils/StringCryptUtils.js"
import urlShorteningUtils from "./src/application/utils/UrlShorteningUtils.js"
import AccountService from "./src/application/domain/Account/AccountService.js";
import AccountRepositoryAdapter from "./src/infrastructure/AccountRepositoryAdapter.js";
import LinkService from "./src/application/domain/LinkAggregate/LinkService.js";
import LinkRepositoryAdapter from "./src/infrastructure/LinkRepositoryAdapter.js";
import MysqlDatabasePort from "./src/application/port/MysqlDatabasePort.js";
import bcrypt from 'bcrypt';
import mysql from 'sync-mysql';
import jwt from 'jsonwebtoken';
import path from 'path';
import WebNavigationAdapter from "./src/user-rest-interface/WebNavigationAdapter.js";
import AdService from "./src/application/domain/Ad/AdService.js";
import AdRepositoryAdapter from "./src/infrastructure/AdRepositoryAdapter.js";

let mysqlDatabasePort = new MysqlDatabasePort(mysql, "localhost", "root", "admin", "pds", 3306);
let jwtUtils = new JwtUtils(jwt, "my-secret-pass");
let stringCryptoUtils = new StringCryptoUtils(bcrypt);

let accountRepositoryAdapter = new AccountRepositoryAdapter(mysqlDatabasePort);
let accountService = new AccountService(accountRepositoryAdapter, stringCryptoUtils, jwtUtils);

let linkRepositoryAdapter = new LinkRepositoryAdapter(mysqlDatabasePort);
let linkService = new LinkService(linkRepositoryAdapter, stringCryptoUtils, urlShorteningUtils);

let adRepositoryAdapter = new AdRepositoryAdapter(mysqlDatabasePort);
let adService = new AdService(adRepositoryAdapter);

let webNavigationAdapter = new WebNavigationAdapter(path);

let dependencyContainer = {
    "stringCryptoUtils": stringCryptoUtils,
    "jwtUtils": jwtUtils,
    "urlShorteningUtils": urlShorteningUtils,
    "accountRepository": accountRepositoryAdapter,
    "accountService": accountService,
    "linkRepository": linkRepositoryAdapter,
    "linkService": linkService,
    "webNavigationAdapter": webNavigationAdapter,
    "adService": adService,
    "adRepositoryAdapter": adRepositoryAdapter,
    "path": path
};

export default dependencyContainer;