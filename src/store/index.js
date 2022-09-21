import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from "../request/auth"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || ""
  },
  getters: {
    token(state){
      return state.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    DIS_SET_TOKEN({ commit }, payload) {
      commit("SET_TOKEN", payload)
    }
  },
  modules: {
  }
})
