import $http from '@/utils/request.js'


export function getJoinStatus(data) {
	let url = "/orange/user/project"
	let initData = data ;
	return $http.post({
		url,
		data: initData
	});

}

export function getProjectDetail(data) {
	let url = "/orange/project"
	let initData = data ;
	return $http.post({
		url,
		data: initData
	});

}

export function joinProject(data) {
	let url = "/orange/applyProject"
	let initData = data ;
	return $http.post({
		url,
		data: initData
	});

}