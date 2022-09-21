import axios from "axios";

const exceptionMessage = {
    1000: '用户名或者密码发生错误',
    3000: ''
}

import { Message } from "element-ui"
import store from "@/store";

const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 3000
})

// 请求拦截
http.interceptors.request.use(function (config) {
    const token = store.getters.token
    // 当token存在的时候，则将token通过请求头发送给后台
    if (token) config.headers.authorization = "Bearer " + token
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截
http.interceptors.response.use(function (response) {
    if (response.status < 400) {
        return response.data.data
    }
    if (response.status === 401) {
        // TODO token过期处理
        return
    }
    _showError(response.data.code, response.data.message)
    return response;
}, function (error) {
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