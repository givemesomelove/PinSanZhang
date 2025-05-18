const ws = require('nodejs-websocket')
const loginDb = require('./loginDb')

let websocket = ws.createServer((client)=> {
    client.on('text', (msg)=> {
        console.log("客户端发来消息, " + msg);
        client.sendText("服务器收到消息, " + msg);
    })
    client.on('error', (err)=> {
        console.log("发生错误, " + err)
    })
    client.on('close', (code, reason)=> {
        console.log("连接关闭, " + code + " " + reason)
    })
})

websocket.listen(3000);
console.log("websocket server is running at port 3000");

loginDb.getInstance().getUserInfo(1).then((result)=> {
    console.log(result);
}).catch((err)=> {
    console.log(err);
});