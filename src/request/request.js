import axios from "axios";

const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 3000
})

// 请求拦截
http.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截
http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

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