module.exports = class ZmqManager {
    constructor(socket) {
        this.socket = socket;
        this.inBoundMiddleware = []
        this.outBoundMiddleware = [];
        socket.on('message', message => {
            this.executeMiddleware(this.inBoundMiddleware, {
                date: message
            })
        })
    }

    send(date) {
        constmessage = {
            data: data
        };

        this.executeMiddleware(this.outBoundMiddleware, message, () => {
            this.socket.send(message.data);
        })
    }

    use(middleware) {
        if (middleware.inbound) {
            this.inBoundMiddleware.push(middleware.inbound);
        }
        if (middleware.outBound) {
            this.outBoundMiddleware.push(middleware.outBound);
        }
    }

    executeMiddleware(middleware, arg, finish) {
        function iterator(index) {
            if (index === middleware.lenght) {
                return finish && finish();
            }
            middleware[index].call(this, arg, err => {
                if (err) {
                    return console.log('There was an error: ' + err.message);
                }
                iterator.call(this, ++index);
            })
        }
        iterator.call(this, 0);
    }
}