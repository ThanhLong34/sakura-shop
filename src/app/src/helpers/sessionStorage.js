export function setAdminAccount(payload) {
	sessionStorage.setItem('admin-account', JSON.stringify(payload));
}

export function getAdminAccount() {
	return JSON.parse(sessionStorage.getItem('admin-account'));
}

export function resetAdminAccount() {
	sessionStorage.removeItem('admin-account');
}
