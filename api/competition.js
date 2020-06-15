import $http from '@/utils/request.js'


/* 获取用户当日项目记录 */
export function getHomeTodayPay() {
	let url = "/orange/subProject/detail" ;
	return $http.post({
		url
	});

}

/* 获取用户总项目记录 */
export function getUserTAC( data ) {
	let url = "/orange/home/calculate/project" ;
	let initData = data ;
	return $http.post({
		url,
		data:initData
	});
}

