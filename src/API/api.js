import request from "../request/request.js"

//会员接口
const getMemberList = (page = 1, size = 10, data = {}) => {
    return request({
        url: `/member/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}

//供应商接口
const getMesearchList = (page = 1, size = 10, data = {}) => {
    return request({
        url: `/member/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}
export default {
    getMemberList,
    getMesearchList
}