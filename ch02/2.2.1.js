module.exports = (() => {
	const privateFoo = () => {};
	const privateBar = () => [];

	const exportd = {
		publicFoo: () => {},
		publicBar: () => []
	};

	return exportd;
})();
