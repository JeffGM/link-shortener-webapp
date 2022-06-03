export default class MysqlDatabasePort {
    constructor(driver, host, user, password, database, port) {
        this.connection = new driver({
            host     : host,
            user     : user,
            password : password,
            database : database,
            port     : port
          });
    }

    insertOne(entityName, withParams) {
        let sqlStatement = 'INSERT INTO ' + entityName + '(';
        let paramsNames = Object.keys(withParams);
        let paramsValues = Object.values(withParams);

        sqlStatement += paramsNames.join(',') + ') VALUES(';
        sqlStatement += '"' + paramsValues.join('","') + '")';

        return this.#executeStatement(sqlStatement);
    }

    selectOne(entityName, byParams) {
        return this.select(entityName, byParams, 1);
    }

    select(entityName, byParams, limit) {
        let sqlStatement = 'SELECT * FROM "' + entityName;

        if (byParams) {
            sqlStatement += ' WHERE';
            let paramsCount = Object.keys(byParams).length;
            let currentParam = 1;

            Object.keys(byParams).forEach(function(paramName) {
                let paramValue = obj[paramName];
                sqlStatement += ' ' + paramName + '= "' + this.connection.escape(paramValue);
                if (currentParam > 1 && currentParam != paramsCount) {
                    sqlStatement += ' AND';
                }

                currentParam++;
            });
        }

        sqlStatement += ' LIMIT ' + limit
        return this.#executeStatement(sqlStatement);
    }

    #executeStatement(sqlStatement) {
        let result = this.connection.query(sqlStatement);
        return result;
    }
}