//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
import {
	codeToToken
} from '@/api/user'
import {
	getToken,
	setToken,
	removeToken,
} from '@/utils/auth'
Vue.use(Vuex)

const store = new Vuex.Store({ //全局变量定义
	state: {
		userName: "11",
		userLogo: "",
		userStatus: 0,//0 资料为空 1.资料不完整  2 资料不完整、(手机、真实姓名) 3. 资料完全 
		userId: '',
		token: '',
	},
	mutations: {
		SET_USERNAME: (state, userName) => {
			state.userName = userName
		},
		SET_USERLOGO: (state, userLogo) => {
			state.userLogo = userLogo
		},
		SET_USERSTATUS: (state, userStatus) => {
			state.userStatus = userStatus
		},
		SET_USERID: (state, userId) => {
			state.userId = userId
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		}
	},
	actions: {
		//组件调用 this.$store.dispatch('user/useIdToToken', userId)
		// get user token
		codeToToken({
			commit
		}, data ) {
			return new Promise(resolve => {
				codeToToken(data.url,data.code).then(response => {
					console.log(response.data )
					let token = response.data.data.token;
					let userStatus = response.data.data.userStatus;
					commit('SET_TOKEN', token)
					commit('SET_USERSTATUS', userStatus)
					setToken(token)
					console.log( getToken())
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
})
export default store
