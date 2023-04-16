export function setAdminAccount(payload) {
	sessionStorage.setItem('admin-account', JSON.stringify(payload));
}

export function getAdminAccount() {
	return JSON.parse(sessionStorage.getItem('admin-account'));
}

export function resetAdminAccount() {
	sessionStorage.removeItem('admin-account');
}

export function setPlayerAccount(payload) {
	sessionStorage.setItem('player-account', JSON.stringify(payload));
}

export function getPlayerAccount() {
	return JSON.parse(sessionStorage.getItem('player-account'));
}

export function resetPlayerAccount() {
	sessionStorage.removeItem('player-account');
}
