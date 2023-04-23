export const arrayShuffledByProbability = (array, probability) => {
	// Clone array
	const _array = [...array];

	// Sort the _array based on the probability of each item
	_array.sort((item1, item2) => item2[probability] - item1[probability]);

	// Shuffle the _array based on the probability of each item
	let remainingProbability = _array.reduce((sum, item) => sum + item[probability], 0);
	for (let i = 0; i < _array.length - 1; i++) {
		const random = Math.floor(Math.random() * remainingProbability);
		let j = i;
		let probabilitySum = _array[i][probability];
		while (random >= probabilitySum && j < _array.length - 1) {
			j++;
			probabilitySum += _array[j][probability];
		}
		[_array[i], _array[j]] = [_array[j], _array[i]];
		remainingProbability -= _array[i][probability];
	}

	return _array;
};
