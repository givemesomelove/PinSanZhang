const { authPlugins } = require("mysql2");

// 本地开发配置(链接本地 MySql)
module.exports = {
    db: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'ping_san_zhang',
        authPlugins: {
            mysql_native_password: () => require('mysql2/lib/auth/mysql_native_password')
        }
    }
}