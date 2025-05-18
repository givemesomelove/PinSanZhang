const Mysql = require('mysql2');

class Db {
    constructor() {

    }

    connectSql() {
        let mysql = Mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'ping_san_zhang',
            authPlugins: {
                mysql_native_password: () => require('mysql2/lib/auth/mysql_native_password')
            }
        })
        mysql.connect((err) => {
            if (err) {
                console.log('数据库连接失败');
                return;
            }
            console.log('数据库连接成功');
        })
        this._mysql = mysql;
        console.log('db.js 数据库连接成功');
    }

    myQuery(sql, resolve, reject) {
        this._mysql.query(sql, (err, result) => {
            if (err) {
                console.log('查询失败');
                reject(err);
            } else {
                console.log('查询成功');
                resolve(result);
            }
        })
    }
}

module.exports = Db;