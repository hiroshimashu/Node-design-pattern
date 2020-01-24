class Profiler {
	constructor(label) {
		this.label = label;
		this.lastTime = null;
	}

	start() {
		this.lastTime = process.hrtTime();
	}

	end() {
		const diff = process.hrtTime(this.lastTime);
		console.log('');
	}
}

module.exports = function(label) {
	if (process.env.NODE_ENV === 'production') {
		return {
			start: function() {},
			end: function() {}
		};
	} else if (process.env.NODE_ENV === 'develpment') {
		return new Profiler(label);
	} else {
		throw new Error('Must set NODE_ENV');
	}
};
