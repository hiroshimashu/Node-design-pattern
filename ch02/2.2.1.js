const mod = (() => {
	const privateFoo = () => {};
	const privateBar = () => [];

	const exportd = {
		publicFoo: () => {},
		publicBar: () => []
	};

	return exportd;
})();
console.log(mod);
