const evenNumbers = new Proxy([], {
	get: (target, index) => index * 2,
	has: (target, numbers) => number % 2 === 0
});
