const db = require('./common/Db')

class LoginDb extends db {
    static getInstance() {
        if (!LoginDb.instance) {
            LoginDb.instance = new LoginDb();
        }
        return LoginDb.instance;
    }

    constructor() {
        super();

        this.connectSql();
    }

    getUserInfo(id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM user_info WHERE user_id=${id}`;
            this.myQuery(sql, resolve, reject);
        })
    }
}

module.exports = LoginDb;