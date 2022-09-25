import request from "@/request/request"

//登录接口
export const login = (data = {}) => {
    return request({
        url: '/admin/login',
        method: "POST",
        data
    })
}

//用户信息接口
export const userInfo = () => {
    return request({
        url: '/admin/getUserInfo',
        method: "GET"
    })
}

//退出后台接口
export const logout = () => {
    return request({
        url: "/admin/logout",
        method: "POST"
    })
}
