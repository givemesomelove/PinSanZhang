import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loginClient')
export class loginClient extends Component {
    start() {
        this._init();
    }

    update(deltaTime: number) {
        
    }

    private _init() {
        this.connectServer();
    }

    private connectServer() {
        const ws = new WebSocket("ws://127.0.0.1:3000");
        ws.onopen = () => {
            console.log("WebSocket connection opened.");
            ws.send("Hello, server!");
        };
        ws.onmessage = (data) => {
            console.log("Message from server: ", data.data);
            
        }
    }
}


