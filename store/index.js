import Vue from "vue-native-core"
import Vuex from "vuex"
import * as types from './mutation-types'

Vue.use(Vuex)
import UserService from '../services/User'

export const store = new Vuex.Store({
    state: {
        isLogged: false
    },
    mutations: {
        [types.SET_LOGIN_STATE](state, isLogged) {
            state.isLogged = isLogged
        }
    },
    actions: {
        [types.CHECK_LOGIN]({ commit }) {
            return UserService.checkLogin().then(res => {
                commit(types.SET_LOGIN_STATE, res)
                return res
            })
        }
    }
});
