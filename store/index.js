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
					let token = response.data.data.token;
					commit('SET_TOKEN', token)
					commit('SET_USERNAME', "hahah")
					setToken(token)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
})
export default store
