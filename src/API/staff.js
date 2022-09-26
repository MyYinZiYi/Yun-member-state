/**
 * 员工列表的接口
 */

//引入request
import request from "../request/request";

/**
 * 请求员工管理列表查询接口
 */

const staffList = (currentPage, pageSize, data) => {
    return request({
        url: `/staff/list/search/${currentPage}/${pageSize}`,
        method: "POST",
        data
    });
};
/**
 * 添加员工列表接口
 */
const addStaff = (data) => {
    return request({
        url: "/staff",
        method: "POST",
        data
    });
};

// 编辑员工接口
const editStaff = (id, data) => {
    return request({
        url: `/staff/${id}`,
        method: "PUT",
        data
    });
};


// 查询单个员工接口
const findStaff = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "GET"
    })
}

//删除单个员工管理接口、
const delStaff = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "DELETE"
    })
}
export default {
    staffList,
    addStaff,
    editStaff,
    findStaff,
    delStaff
};