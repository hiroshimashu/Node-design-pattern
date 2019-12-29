const fs = require('fs');
const cache = {};

function consitentReadSync(filename) {
	if (cache[filename]) {
		return cache[filename];
	} else {
		cache[filename] = fs.readFileSync(filename, 'utf8');
		return cache[filename];
	}
}

console.log(consitentReadSync('./data.txt'));
console.log(consitentReadSync('./data.txt'));

// Basicall, you should implement sync function using Direct style
