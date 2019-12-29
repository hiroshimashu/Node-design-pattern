const fs = require('fs');
const cache = {};

function consistentReadAsync(filename, callback) {
	if (cache[filename]) {
		process.nextTick(() => callback[filename]);
	} else {
		fs.readFile(filename, 'utf-8', (err, data) => {
			cache['filename'] = data;
			callback(data);
		});
	}
}

console.log(
	consistentReadAsync('data.txt', data => {
		console.log(data);
		consistentReadAsync('data.txt', data => console.log(data));
	})
);
