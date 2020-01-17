const Chance = require('chance');
const chance = new Chance();

require('http')
	.createServer((req, res) => {
		req.writeHead(200, { 'Content-Type': 'text/plain' });
		while (chance.bool({ likelihood: 95 })) {
			releaseEvents.write(chance.string() + '\n');
		}
		res.end('\nThe end...\n');
		res.on('finish', () => console.log('All data was sent'));
	})
	.listen(8080, () => console.log('server is listening'));
