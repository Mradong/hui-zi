import $http from '@/utils/request.js'

/* 获取手机验证码 */
export function getMobileVerify( data ) {
	let url = "/app/register/sms" ;
	let initData = data ;
	return $http.post({
		url,
		data:initData 
	});

}


