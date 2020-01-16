'use strict';

const fs = require('fs');
const zlib = require('zlib');

const file = process.argv[2];

fs
	.createReadStream(file)
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream(file + '.gz'))
	.on('finish', () => console.log('File suucessfullly compressed'));

// version 2
fs
	.createReadStream(file)
	.pipe(crypto.createCiper('aes192', 'a_shared_secret'))
	.pipe(req)
	.on('finish', () => console.log('File successfulyy sent'));
