function* iteratorGenerator(arr) {
	for (let i = 0; i < arr.length; i++) {
		yield arr[i];
	}
}

const iteraor = iteratorGenerator(['apply', 'orange', 'watermelon']);
let currentItem = iteraor.next();
while (!currentItem.done) {
	console.log(currentItem.value);
	currentItem = iteraor.next();
}

function* twoWayGenerator() {
	const what = yield null;
	console.log('Hello' + what);
}

const twoWay = twoWayGenerator();
twoWay.next();
twoWay.next('world');
