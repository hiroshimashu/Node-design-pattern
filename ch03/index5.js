import { request } from 'https';
import { fstat } from 'fs';
import { isSpreadProperty } from '@babel/types';

function spiderLinks(currentUrl, boyd, nesting, callback) {
	if (nesting === 0) {
		return process.nextTick(callback);
	}

	let links = utilities.getPageLinks(currentUrl, body);
	function iterate(index) {
		if (index === links.length) {
			return callback();
		}

		spider(links[index], nesting - 1, function(err) {
			if (err) {
				return callback(err);
			}
			iterate(index + 1);
		});
		iterate(0);
	}
}

function download(url, filename, callback) {
	console.log(`Donwloading ${url}`);
	let body;

	async.series(
		[
			callback => {
				request(url, (err, response, resBody) => {
					if (err) {
						return callback(err);
					}
					body = resBody;
					callback();
				});
			},

			mkdirp.bind(null, path.dirname(filename)),

			callback => {
				fstat.writeFile(filename, body, callback);
			}
		],
		err => {
			if (err) {
				return callback(err);
			}
			console.log(`Downloaded and saved: ${url}`);
			callback(null, body);
		}
	);
}
