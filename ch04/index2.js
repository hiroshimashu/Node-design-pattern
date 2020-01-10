import { request } from 'https';
import { writeFile, readFile } from 'fs';

function downLoad(url, filename) {
	console.log(`Downloading ${url}`);
	let body;
	return request(url)
		.then(response => {
			body = response.body;
			return mkdirp(path.dirname(filename));
		})
		.then(() => writeFile(filename, body))
		.then(() => {
			console.log(`Downloading and saved: ${url}`);
			return body;
		});
}

function spider(url, nesting) {
	let filename = utilities.urlToFilename(url);
	return readFile(filename, 'utf-8').then(
		body => SpiderLinkgs(url, body, nesting),
		err => {
			if (err.code !== 'ENOENT') {
				throw err;
			}

			return downLoad(url, filename).then(body => spiderLinks(url, body, nesting));
		}
	);
}

function spiderLinks(currentUrl, body, nesting) {
	let promise = Promise.resoleve();
	if (nesting === 0) {
		return promise;
	}
	const links = utilities.getPageLinks(currentUrl, body);
	links.forEach(link => {
		promise = promise.then(() => spider(link, nesting - 1));
	});
}
