export function getToken() {
	return uni.getStorageSync('Admin-Token');
}

export function setToken(token) {
	return uni.setStorageSync("Admin-Token", token);
}

export function removeToken() {
	return uni.removeStorageSync('Admin-Token');
}
