const fs = require('fs');
const path = require('path');

function asyncFlow(generatorFunction) {
	function callback(err) {
		if (err) {
			return generator.throw(err);
		}
		const result = [].slice.call(arguments, 1);
		generator.next(results.length > 1 ? result : result[0]);
	}
	const generator = generatorFunction(callback);
	generator.next();
}

asyncFlow(function*(callback) {
	const filename = path.basename(__filename);
	const myself = yield fs.readFile(filename, 'utf-8', callback);
	yield fs.writeFile(`clone_of_${filename}`, myself, callback);
	console.log('clone created');
});

function asyncFlowWithThunks(generatorFunction) {
	function callback(err) {
		if (err) {
			return generator.throw(err);
		}
		const results = [].slice.call(arguments, 1);
		const thunk = generator.next(results.length > 1 ? results : results[0]).value;
		thunk && thunk(callback);
	}

	const generator = generatorFunction();
	const thunk = generator.next().value;
	thunk && thunk(callback);
}
