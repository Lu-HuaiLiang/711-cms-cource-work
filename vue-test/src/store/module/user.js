import { setToken } from '@/lib/util'
import { login,authorization } from '@/api/index'
import store from '@/store'

const state = {
	username:  '',
	role: -1
}

const mutations = {
	SET_USERNAME (state, username) {
		state.username = username
	},
	SET_ROLE (state, role) {
		state.role = role
	},
	ClEAR_MANAGER(state) {
		state.role = -1
		state.username =  ''
	},
	SET_RULES (state, rules) {
		state.rules = rules
	}
}	

const actions = {
	// updateUserName ({commit,state,rootState,dispatch})
	login({commit},{username,password}) {
		return new Promise((resolve,reject)=>{
			login({username,password}).then(res=>{
				if (res.code === 200 && res.data.token) {
					setToken(res.data.token)
					resolve(res)
				} else {
					reject(res)
				}
			})
		})
	},
	authorization({commit}) {
		return new Promise((resolve,reject)=>{
			authorization().then(res=>{
				if (res.code === 200) {
					setToken(res.data.token)
					resolve(res.data.rules.page)
          			commit('SET_RULES', res.data.rules.component)
				} else {
					this.$Message.error('authorization获取失败');
					reject()
				}
			})
		})
	},
	logout ({commit}) {
		if (store.state.router.hasGetRules === true) {
			store.commit('CHANGE_HASGETRULES')
			store.commit('ClEAR_ROUTER')
		}
		setToken('')
	}
}

export default {
    state,
    mutations,
    actions
}