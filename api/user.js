import $http from '@/utils/request.js'


export function codeToToken(url, code) {
	let userVXcode = {
		"jsCode": code
	}
	return $http.post({
		url,
		data: userVXcode
	});

}

export function upUserInfo(data) {
	let url = "/app/create"
	let initData = data ;
	return $http.post({
		url,
		data: initData
	});

}
