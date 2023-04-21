export function arrayDestructuringNested(array) {
	return array.reduce((accumulator, currentValue) => {
		if (Array.isArray(currentValue)) return [...accumulator, ...currentValue];
		return [...accumulator, currentValue];
	}, []);
}
