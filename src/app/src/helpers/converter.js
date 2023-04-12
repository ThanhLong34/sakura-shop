export function getInputNumberValue(strValue) {
	if (typeof strValue === "string") {
		return parseInt(strValue.split(",").join(""));
	}

	return parseInt(strValue);
}

export async function createImageFileFromUrl(url) {
	const response = await fetch(url);
	const blob = await response.blob();

	const metadata = {
		type: blob.type,
	};

	const file = new File([blob], "ImageFileFromUrl", metadata);
	file.objectURL = url;
	
	return file;
}
