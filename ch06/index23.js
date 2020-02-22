// The target
const statusUpdateService = {
	statusUpdates: {},
	sendUpdate: function(status) {
		console.log('Status send: ' + status);
		let id = Math.floor(Math.random() * 1000000);
		statusUpdateService.statusUpdates[id] = status;
		return id;
	},
	destroyUpdate: id => {
		console.log('Status removed: ' + id);
		delete statusUpdateService.statusUpdates[id];
	}
};

// The command

function createSendStatusCmd(service, status) {
	let postId = null;

	const command = () => {
		postId = service.sendUpdate(status);
	};

	command.updo = () => {
		if (postId) {
			service.destroyUpdate(postId);
			postId = null;
		}
	};

	command.serialize = () => {
		return { type: 'status', action: 'post', status: status };
	};

	return command;
}

// The invoker
class invoker {
	constructor() {
		this.history = [];
	}

	run(cmd) {
		this.history.push(cmd);
		cmd();
		console.log('Command executed', cmd.serialize());
	}

	delay(cmd, delay) {
		setTimeout(() => {
			this.run(cmd);
		}, delay);
	}

	undo() {
		const cmd = this.history.pop();
		cmd.undo();
		console.log('Command undone', cmd.serialize());
	}

	runRemotely(cmd) {
		request.post('http://localhost:3000/cmd', { json: cmd.serialize() }, err => {
			console.log('Command executed remotely', cmd.serialize());
		});
	}
}

const invoker = new invoker();
const command = createSendStatusCmd(statusUpdateService, 'HI');
invoker.run(command);
invoker.delay(command, 2000);
invoker.undo();
invoker.runRemotely(command);
