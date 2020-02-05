// #@@range_begin(list1)
const EventEmitter = require('events');

class Roe extends EventEmitter {
	constructor(executor) {
		super();
		const emit = this.emit.bind(this);
		this.emit = undefined;
		executor(emit);
	}
}

const ticker = new Roe(emit => {
	let tickCount = 0;
	setInterval(() => emit('tick', tickCount++), 1000);
});

ticker.on('tick', tickCount => console.log(tickCount, 'TICK'));
