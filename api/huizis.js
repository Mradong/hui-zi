import $http from '@/utils/request.js'


export function getProjects() {
	let url = "/orange/projects"
	return $http.post({
		url
	});
}

export function getUserInfo() {
	let url = "/orange/getUserInfo"
	return $http.post({
		url
	});
}
