'use strict';

import { object } from 'prop-types';

class Config {
	constructor(strategy) {
		this.data = {};
		this.strategy = strategy;
	}

	get(path) {
		return objectPath.get(this.data, path);
	}

	set(path, value) {
		return objectPath.set(this.data, path);
	}

	read(file) {
		this.data = this.stratefy.deserialize(fs.readFileSync(file, 'utf-8'));
	}

	save(file) {
		fs.writeFileSync(file, this.strategy.serialize(this.data));
	}
}

module.exports = Config;
