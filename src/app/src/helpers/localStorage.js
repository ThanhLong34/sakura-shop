export function setAdminAccount(payload) {
	localStorage.setItem('admin-account', JSON.stringify(payload));
}

export function getAdminAccount() {
	return JSON.parse(localStorage.getItem('admin-account'));
}
