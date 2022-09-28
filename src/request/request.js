import axios from "axios";

const exceptionMessage = {
    1000: '用户名或者密码发生错误',
    3000: ''
}

import { Message } from "element-ui"
import store from "@/store";
import { Loading } from "element-ui"

const loading = {
    loadingInstance: null,
    open() {
        if (!this.loadingInstance) {
            this.loadingInstance = Loading.service({
                target: '.el-main',
                text: '拼命加载中...',
                background: "rgba(0,0,0,0.4)"
            })
        }
    },
    close() {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
            this.loadingInstance = null
        }
    }
}

const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 3000
})

// 请求拦截
http.interceptors.request.use(function (config) {
    const token = store.getters.token
    // 当token存在的时候，则将token通过请求头发送给后台
    if (token) config.headers.authorization = "Bearer " + token
    loading.open()
    return config;
}, function (error) {
    loading.close()
    return Promise.reject(error);
});

// 响应拦截
http.interceptors.response.use(function (response) {
    loading.close()
    if (response.status < 400) {
        if (response.data.data) {
            return response.data.data
        } else {
            return response.data.msg
        }

    }
    if (response.status === 401) {
        // TODO token过期处理
        // 清空本地的token和vuex以及用户信息
        store.commit("SET_TOKEN", "")
        store.commit("SET_USER_INFO", "")
        removeTokenAndUserInfo()
        // 跳转到登录页
        router.replace("/login")
        return
    }
    _showError(response.data.code, response.data.message)
    return response;
}, function (error) {
    loading.close()
    return Promise.reject(error);
});

const _showError = (errorCode, message) => {
    let title
    title = exceptionMessage[errorCode] || message || '发生未知错误'
    Message.error(title)
}

const request = (options) => {
    options.method = options.method || "get"
    if (options.method.toLowerCase() === "get") {
        options.params = options.data || options.params
        delete options.data
    }
    http.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API

    return http(options)
}

export default request