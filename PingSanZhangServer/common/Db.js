const mysql = require('mysql2');
const { execSync } = require('child_process');
const net = require('net');
const config = require('./../config/production.js'); // 根据环境加载配置
const { Client } = require('ssh2');

class Database {
    constructor() {
        this._mysql = null;
        this.sshClient = new Client();
    }

    // 建立SSH隧道
    connectSSH() {
        return new Promise((resolve, reject) => {
            const { ecsUser, ecsHost, ecsPassword, localPort, rdsHost, rdsPort } = config.sshTunnel;
    
            this.sshClient.on('ready', () => {
                console.log('SSH隧道连接成功');
    
                // 创建本地服务器监听 localPort
                net.createServer((socket) => {
                    this.sshClient.forwardOut(
                        socket.remoteAddress,
                        socket.remotePort,
                        rdsHost,
                        rdsPort,
                        (err, stream) => {
                            if (err) {
                                console.error('端口转发失败:', err.message);
                                socket.destroy();
                                return;
                            }
                            socket.pipe(stream).pipe(socket);
                        }
                    );
                }).listen(localPort, '127.0.0.1', () => {
                    console.log(`本地端口 ${localPort} 已监听`);
                    resolve();
                });
            }).on('error', (err) => {
                console.error('SSH连接失败:', err.message);
                reject(err);
            }).connect({
                host: ecsHost,
                port: 22,
                username: ecsUser,
                password: ecsPassword
            });
        });
    }

    connectSql() {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(config.db);
            connection.connect((err) => {
                if (err) {
                    console.error('数据库连接失败:', err.message);
                    reject(err);
                    return;
                }
                console.log('数据库连接成功');
                this._mysql = connection;
                resolve();
            });
        });
    }

    // 初始化：先SSH后DB
  async init() {
    try {
      await this.connectSSH();
      await this.connectSql();
      console.log('所有连接就绪');
    } catch (err) {
      console.error('初始化失败:', err.message);
      process.exit(1);
    }
  }

    myQuery(sql) {
        return new Promise((resolve, reject) => {
            this._mysql.query(sql, (err, result) => {
                if (err) {
                    console.error('查询失败:', err.message);
                    reject(err);
                } else {
                    console.log('查询成功');
                    resolve(result);
                }
            });
        });
    }
}

// 使用示例
const db = new Database();
db.init().then(() => {
    db.myQuery('SELECT 1 + 1 AS solution').then(result => {
        console.log('Result:', result);
    });
});