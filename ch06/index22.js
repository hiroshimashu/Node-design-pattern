import { unwatchFile } from 'fs';

const reply = zmq.socket('rep');
reply.bind('tcp://127.0.0.1:5000');

const zmqm = ZmqMiddlewareManager(reply);

zmqm.use(jsonMiddleware.json());
zmqm.use({
	inbound: function(message, next) {
		if (message.data.action === 'ping') {
			this.send({ action: 'pong', echo: message.data.echo });
		}
		next();
	}
});
