const path = require('path');

module.exports = {
    sshTunnel: {
        enable: true,
        ecsUser: 'root',          // ECS登录用户名（如root或自定义用户）
        ecsHost: '8.137.147.20',  // ECS公网IP
        ecsPassword: 'Lzh654321', // ECS登录密码（替换为实际密码）
        localPort: 3308,          // 本地转发端口
        rdsHost: 'rm-cn-s1149p55600075.rwlb.cn-chengdu.rds.aliyuncs.com', // RDS内网地址
        rdsPort: 3306             // RDS端口
    },
    db: {
        host: '127.0.0.1',        // 通过SSH隧道映射到本地的地址
        port: 3308,               // 本地转发端口（需与SSH隧道一致）
        user: 'root',             // RDS数据库账号
        password: 'Lzh654321',    // RDS数据库密码
        database: 'ping_san_zhang',
        authPlugins: {
            mysql_native_password: () => require('mysql2/lib/auth/mysql_native_password')
        }
    }
};