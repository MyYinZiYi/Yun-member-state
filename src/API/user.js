import request from "@/request/request"

export const login = (data = {}) => {
    return request({
        url: '/amdin/login',
        method: "POST",
        data
    })
}

export const userInfo = () => {
    return request({
        url: '/admin/getUserinfo',
        method: "GET",
    })
}

export const logout = () => {
    return request({
        url: '/admin/logout',
        method: "POST",
    })
}