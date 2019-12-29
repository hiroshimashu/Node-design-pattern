const fs = require('fs');
function readJSON(filename, callback) {
	fs.readFile(filename, 'utf-8', (err, data) => {
		let parsed;
		if (err) return callback(err);

		try {
			parsed = JSON.parse(data);
		} catch (err) {
			return callback(err);
		}
		callback(null, parsed);
	});
}

let cb = (err, data) => {
	if (err) {
		return console.error(err);
	}

	console.log(data);
};

readJSON('valid.json', cb);
readJSON('invalid.json', cb);
