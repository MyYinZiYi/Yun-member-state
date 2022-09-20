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

export default http