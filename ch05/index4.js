process.stdin
	.on('data', chunk => {
		console.log('chunk read');
	})
	.on('end', () => {
		console.log('end!!');
	});
