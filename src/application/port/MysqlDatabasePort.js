export default class MysqlDatabasePort {
    constructor(host, user, password, database) {
        this.connection =  mysql.createConnection({
            host     : host,
            user     : user,
            password : password,
            database : database
          });
    }

    async insertOne(entityName, withParams) {
        let sqlStatement = 'INSERT INTO ' + entityName + '(';
        let paramsNames = Object.keys(withParams);
        let paramsValues = Object.values(withParams);

        sqlStatement += paramsNames.join(",") + ') VALUES(';
        sqlStatement += paramsValues.join(",");

        return this.#executeStatement(sqlStatement);
    }

    async selectOne(entityName, byParams) {
        return this.select(entityName, byParams, 1);
    }

    async select(entityName, byParams, limit) {
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

    async #executeStatement(sqlStatement) {
        return await connection.query(sqlStatement, function(err, rows, fields) {
            if (err) throw err;
            return rows;
        });
    }
}