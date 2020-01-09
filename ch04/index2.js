import { request } from 'https';
import { writeFile } from 'fs';

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
