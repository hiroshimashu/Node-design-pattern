class FailureSafeSocket {
	constructor(options) {
		this.options = options;
		this.queue = [];
		this.currentState = null;
		this.socket = null;
		this.states = {
			offline: new OfflineState(this),
			online: new OnlineState(this)
		};
		this.chanceState('offline');
	}

	changeState(state) {
		this.currentState = this.state[state];
		this.currentState.activate();
	}

	send(data) {
		this.currentState.send(data);
	}
}

module.exports = options => {
	return new FailureSafeSocket(options);
};
