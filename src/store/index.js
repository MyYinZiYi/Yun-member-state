import Vue from 'vue'
import Vuex from 'vuex'
import { login, userInfo }from "../API/user.js"
import { setToken, getToken, setUserInfo, getUserInfo } from "../request/auth"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || "",
    userInfo: getUserInfo() || ""
  },
  getters: {
    token(state) {
      return state.token
    },
    userInfo(state) {
      console.log("---",state.userInfo)
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      setUserInfo(userInfo)
    }
  },
  actions: {
    async login({ commit }, LoginForm) {
      try {
        const response = await login(LoginForm)
        commit("SET_TOKEN", response.token)
        return response.token
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleUserInfo({ commit }) {
      try {
        const UserInfo = await userInfo()
        commit("SET_USER_INFO", UserInfo)
        return UserInfo
      } catch (e) {
        console.log(e.message);
      }
    }
    // DIS_SET_TOKEN({ commit }, token) {
    //   commit("SET_TOKEN", token)
    // },
    // DIS_SET_USER_INFO({ commit }, userInfo) {
    //   commit("SET_USER_INFO", userInfo)
    // }
  },
  modules: {
  }
})
