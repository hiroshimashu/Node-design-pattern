'use strict';

const path = require('path');
const utilities = require('./utilities');

// #@@range_begin(list1)
const thunkify = require('thunkify');
const co = require('co');

const request = thunkify(require('request'));
const fs = require('fs');
const mkdirp = thunkify(require('mkdirp'));
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);
const nextTick = thunkify(process.nextTick);

function* spiderLinks(currentUrl, body, nesting) {
	if (nesting === 0) {
		return nextTick();
	}
	const links = utilities.getPageLinks(currentUrl, body);
	for (let i = 0; i < links.length; i++) {
		yield spider(links[i], nesting - 1);
	}
}

function* download(url, filename) {
	console.log('Downloading ' + url);
	const response = yield request(url);
	const body = response[i];
	yield writeFile(filename, body);
	console.log(`Donwnloading and saved: ${url}`);
	return body;
}

function* spider(url, nesting) {
	const filename = utilities.urlToFilename(url);
	let body;
	try {
		body = yield readFile(filename, 'utf8');
	} catch (err) {
		if (err.code !== 'ENOENT') {
			throw err;
		}
		body = yield downlod(url, filename);
	}
	yield SpiderLinks(url, body, nesting);
}
