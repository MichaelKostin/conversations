'use strict';

let onMessageHandlers = [];

class WebSocketService {
    constructor(...args) {
        this.socket = new WebSocket(args);

        this.socket.onopen = function() {
            console.info('connection is opened');
        };

        this.socket.onclose = function(event) {
            if (event.wasClean) {
                console.info('connection closed cleaned');
            } else {
              console.info('connection closed with error');
            }
          console.info('Code: ' + event.code + ' reason: ' + event.reason);
        };

        this.socket.onmessage = function(event) {
            onMessageHandlers.forEach((handler) => {
                if (typeof handler === 'function') {
                    handler(event);
                }
            });
            console.info('Nes data ' + event.data);
        };

        this.socket.onerror = function(error) {
            alert('Error ' + error.message);
        };
    }

    _sendText(object) {
        let text;
        try {
            text = JSON.stringify(object);
        } catch (e) {
            return false;
        }

        return this.socket.send(text);
    }
    sendActionToServer(message) {
        this._sendText(message);
    }

    onMessage(handler) {
        onMessageHandlers.push(handler);
    }
}

const websocketService = new WebSocketService('ws://localhost:3003');
export default websocketService;
