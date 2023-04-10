export function getInputNumberValue(strValue) {
	if (typeof strValue === "string") {
		return parseInt(strValue.split(",").join(""));
	}

	return parseInt(strValue);
}
