'use strict';

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

function spiderLinks(currentUrl, body, nesting, callback) {
	if (nesting === 0) {
		process.nextTick(callback);
	}

	const links = utilities.getPageLinks(currentUrl, body);
	if (links.length === 0) {
		return process.nextTick(callback);
	}

	let completed = 0,
		hasErrors = false;

	function done(err) {
		if (err) {
			hasErrors = true;
			return callback(err);
		}
		if (++completed === links.length && !hasErrors) {
			return callback();
		}
	}

	links.forEach(function(link) {
		spiderLinks(link, nesting - 1, done);
	});
}
