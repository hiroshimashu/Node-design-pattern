const fs = rquire('fs');
const zlib = require('zlib');

const file = process.argv[2];

fs.readFile(file, (err, buffer) => {
	zlib.gzip(buffer, (err, buffer) => {
		fs.writeFile(file + '.gz', buffer, err => {
			console.log('success');
		});
	});
});
