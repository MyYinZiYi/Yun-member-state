import request from "@/request/request"

export const login=(data={})=>{
    return  request({
        url:'/amdin/login',
        method:"POST",
        data
    })
}

export const getUserInfo=()=>{
    return  request({
        url:'/admin/getUserinfo',
        method:"GET",
    })
}