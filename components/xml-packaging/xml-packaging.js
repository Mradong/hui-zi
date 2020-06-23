import md5 from './md5/MD5.js'
import { getToken } from '@/utils/auth'

export default class axios {
	constructor(obj) {
		// 公共链接
		this.baseUrl = obj.baseUrl;
		// // 是否开启 提示
		// this.open_loding = obj.open_loding || true;
		// 是否加入加入请求头
		this.header_as = obj.header || '';
		//  是否开启 请求拦截
		this.por_Br = obj.promise || true;
		// token
		this.token = getToken();
		// 是否开启 解析 jsp 数据格式
		this.dataType = obj.dataType ? '' : 'json',
		
		this.sig = obj.sig
		
		
		this.EncrypBr = obj.EncrypBr || false
	}
	async get(obj) {
		let Alldata = await this.url_dispose(obj);
		return new Promise((resolve, reject) => {
			this.asiox_beg('GET', Alldata, (state, data) => {
				if (state) {
					// console.log(state && data.data != '',state , data.data == '');
					// console.log(data);
					resolve(data)
				} else {
					this.finish_Loading(true)
					// console.log(data);
					reject(data)
				}
			})
		})
	}
	async post(obj) {
		let Alldata = await this.url_dispose(obj);
		return new Promise((resolve, reject) => {
			this.asiox_beg('POST', Alldata, (state, data) => {
				if (state) {
					// console.log(state && data.data != '',state , data.data == '');
					resolve(data)
				} else {
					this.finish_Loading(true)
					reject(data)
				}
			})
		})
	}
	async delete(obj) {
		let Alldata = await this.url_dispose(obj);
		return new Promise((resolve, reject) => {
			this.asiox_beg('DELETE', Alldata, (state, data) => {
				if (state) {
					// console.log(state && data.data != '',state , data.data == '');
					resolve(data)
				} else {
					this.finish_Loading(true)
					reject(data)
				}
			})
		})
	}
	async upFile(obj) {
		let Alldata = await this.url_dispose(obj, 2);
		// console.log(Alldata);
		return new Promise((resolve, reject) => {
			this.asiox_beg('', Alldata, (state, data) => {
				if (state) {
					// console.log(state && data.data != '',state , data.data == '');
					resolve(data)
				} else {
					this.finish_Loading(true)
					reject(data)
				}
			}, 2)
		})
	}
	// 发送请求
	asiox_beg(type, ALL_data, claback, index = 1) {
		this.token = getToken();
		this.front_loading(ALL_data.por_Br)
		var that = this;
		if (index == 1) {
			if(type =="POST" ){
				let {
					url,
					data,
					dataType
				} = ALL_data;
				uni.request({
					url,
					data,
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
						'token': that.token
					},
					method: type,
					dataType,
					success(res) {
						
						that.finish_Loading(false, res)
						claback(true, res)
					},
					fail(errer) {
						that.finish_Loading(true, errer)
						claback(false, errer)
					}
				})
			}
			else{
				let {
					url,
					data,
					header,
					dataType
				} = ALL_data;
				uni.request({
					url,
					data,
					header,
					method: type,
					dataType,
					success(res) {
						that.finish_Loading(false, res)
						claback(true, res)
					},
					fail(errer) {
						that.finish_Loading(true, errer)
						claback(false, errer)
					}
				})
			}

		} else if (index == 2) {
			uni.uploadFile({
				url: ALL_data.url,
				filePath: ALL_data.filePath,
				name: 'file',
				formData: ALL_data.formData,
				header: ALL_data.header,
				success: res => {
					that.finish_Loading(false, res)
					claback(true, res)
				},
				fail: errer => {
					that.finish_Loading(true, errer)
					claback(false, errer)
				}
			});
		}
	}
	// 处理用户信息
	async url_dispose(obj, index = 1) {
		var Alldata = [];
		if (index == 1) {
			if (obj.data != undefined) {
				let Alldata_data = await this.parameter_encrypt(obj.data)
				obj['data'] = Alldata_data;
			}
			if (obj.formData != undefined) {
				let Alldata_data = await this.parameter_encrypt(obj.formData)
				obj['formData'] = Alldata_data;
			}
			if (obj.token == undefined) {
				Alldata = {
					url: this.baseUrl + obj.url,
					data: obj.data,
					header: {
						'content-type': this.header_as,
						token: this.token
					},
					por_Br: this.por_Br
				}
				if (obj.contentType != undefined) {
					Alldata = {
						url: this.baseUrl + obj.url,
						data: obj.data,
						header: {
							'content-type': obj.contentType,
							'token': this.token
						},
						por_Br: this.por_Br
					}
				}
			} else {
				if (obj.contentType != undefined) {
					Alldata = {
						url: this.baseUrl + obj.url,
						data: obj.data,
						header: {
							'content-type': obj.contentType,
							'token': this.token
						},
						por_Br: this.por_Br
					}
				}
				Alldata = {
					url: this.baseUrl + obj.url,
					data: obj.data,
					header: {
						'content-type': this.header_as,
						'token': obj.token
					},
					por_Br: this.por_Br
				}

			}
		} else if (index == 2) {
			if (obj.formData != undefined) {
				let Alldata_data = await this.parameter_encrypt(obj.formData)
				obj['formData'] = Alldata_data;
			}
			Alldata = {
				url: this.baseUrl + obj.url,
				formData: obj.formData,
				filePath: obj.filePath,
				header: {
					'content-type': obj.contentType || this.header_as,
					token: obj.token || this.token
				},
				por_Br: this.por_Br
			}
		}
		return Alldata
	}

	/* 处理参数 并且加密 */
	parameter_encrypt(arys) {
		if (!this.EncrypBr) return arys;
		let sig =  this.sig;
		return new Promise((ra, re) => {
			let newkey = Object.keys(arys).sort();
			let newObj = {};
			let str_data = '';
			let md5_mi = ''
			for (let i = 0; i < newkey.length; i++) {
				newObj[newkey[i]] = arys[newkey[i]];
				if (i == 0) {
					str_data = newkey[i] + '=' + arys[newkey[i]]
				} else if (i == newkey.length - 1) {
					str_data += '&' + newkey[i] + '=' + arys[newkey[i]] + `&${sig}`
				} else {
					str_data += '&' + newkey[i] + '=' + arys[newkey[i]]
				}
				
			}
			md5_mi = md5.hax_md5(str_data)
			newObj['sign'] = md5_mi.toLocaleLowerCase()
			ra(newObj)
		})

	}
	// 结束拦截
	finish_Loading(Br, data) {
		if (Br) {
			uni.hideLoading()
			uni.showToast({
				title: '数据加载失败',
				duration: 2000,
				icon: 'none'
			})
		} else {

			uni.hideLoading()
		}
		uni.hideNavigationBarLoading()
	}
	// 请求拦截
	front_loading(Br) {
		if (Br) {
			uni.showNavigationBarLoading()
			uni.showLoading({
				title: '正在加载中',
				mask: true
			})
		}
	}
}
