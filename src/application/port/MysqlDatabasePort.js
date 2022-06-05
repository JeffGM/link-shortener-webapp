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

    // select(entityName, byParams, limit) {
    //     console.log("Entered select");
    //     let sqlStatement = 'SELECT * FROM "' + entityName;

    //     if (byParams) {
    //         sqlStatement += ' WHERE';
    //         let paramsCount = Object.keys(byParams).length;
    //         let currentParam = 1;

    //         Object.keys(byParams).forEach(function(paramName) {
    //             let paramValue = obj[paramName];
    //             sqlStatement += ' ' + paramName + '= "' + this.connection.escape(paramValue);
    //             if (currentParam > 1 && currentParam != paramsCount) {
    //                 sqlStatement += ' AND';
    //             }

    //             currentParam++;
    //         });
    //     }

    //     sqlStatement += ' LIMIT ' + limit
    //     return this.#executeStatement(sqlStatement);
    // }

    select(entityName, byParams, limit) {
        let sqlStatement = `SELECT * FROM ${entityName}`;
        let placeHolderValues = [];

        if (byParams) {
            sqlStatement += ' WHERE';

            Object.keys(byParams).forEach(function(paramName) {
                let paramValue = byParams[paramName];
                sqlStatement += ` ${paramName} = ?`;
                placeHolderValues.push(paramValue);
                sqlStatement += ' AND';
            });

        }

        sqlStatement = sqlStatement.slice(0, -4);
        sqlStatement += ` LIMIT ${limit}`;
        return this.#executeStatement(sqlStatement, placeHolderValues);
    }

    updateOne(entityName, byParams, where) {
        let sqlStatement = `UPDATE ${entityName} SET`;
        let placeHolderValues = [];

        Object.keys(byParams).forEach(function(paramName) {
            let paramValue = byParams[paramName];
            sqlStatement += ` ${paramName} = ?`;
            placeHolderValues.push(paramValue);
            sqlStatement += ',';
        });

        sqlStatement = sqlStatement.slice(0, -1);
        sqlStatement += ' WHERE';

        Object.keys(where).forEach(function(columnName) {
            let currentValue = where[columnName];
            sqlStatement += ` ${columnName} = ?`;
            placeHolderValues.push(currentValue);
            sqlStatement += ' AND';
        });


        sqlStatement = sqlStatement.slice(0, -4);
        return this.#executeStatement(sqlStatement, placeHolderValues);
    }

    #executeStatement(sqlStatement, placeHolderValues = []) {
        let result = this.connection.query(sqlStatement, placeHolderValues);
        return result;
    }
}