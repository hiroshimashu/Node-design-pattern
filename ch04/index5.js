function* makeGenenrator() {}

function* fruitGenerator() {
	yield 'apple';
	yield 'orange';
	yield 'watermelon';
}

const newFruitGenerator = fruitGenerator();
