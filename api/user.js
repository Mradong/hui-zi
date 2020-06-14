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
	let upUserInfo = {
		"name": "",
		"nickName": data.nickName,
		"headUrl": data.avatarUrl,
		"mobile": "",
	}
	return $http.post({
		url,
		data: upUserInfo
	});

}

// export function logout() {
//   // return request({
//   //   url: '/vue-admin-template/user/logout',
//   //   method: 'post'
//   // })
// }
