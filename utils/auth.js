export function getToken() {
	return uni.getStorageSync('Admin-Token');
}

export function setToken(token) {
	return uni.setStorageSync("Admin-Token", token);
}

export function removeToken() {
	return uni.removeStorageSync('Admin-Token');
}

export function getRemind() {
	return uni.getStorageSync('Today-Remind');
}

export function setRemind(remind) {
	return uni.setStorageSync("Today-Remind", remind);
}

export function removeRemind() {
	return uni.removeStorageSync('Today-Remind');
}