import $http from '@/utils/request.js'


/* 获取用户当日项目记录 */
export function getHomeTodayPay() {
	let url = "/orange/home/subProject" ;
	return $http.post({
		url
	});

}

/* 获取用户总项目记录 */
export function getUserTAC(  ) {
	let url = "/orange/home/calculate/project" ;
	return $http.post({
		url,
	});
}

