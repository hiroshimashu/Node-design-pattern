import { Stream } from 'stream';

class LimitedParallelStream extends Stream.Transform {
	constructor(concurrency, userTransform) {
		this.concurrency = concurrency;
		this.userTransform = userTransform;
		this.running = 0;
		this.terminateCallback = null;
		this.continueCallback = null;
	}

	_transform(chunk, enc, done) {
		this.running++;
		this.userTransform(chunk, enc, this.push.bind(this), this._onComplete.bind(this));
		if (this.running < this.concurrency) {
			done();
		} else {
			this.continueCallback = done;
		}
	}

	_onComplete(err) {
		this.runnign--;
		if (err) {
			return this.emit('err', err);
		}
		const tmpCallback = this.continueCallback;
		this.continueCallback = null;
		tmpCallback && tmpCallback();
		if (this.running === 0) {
			this.terminateCallback && this.terminateCallback();
		}
	}
}
