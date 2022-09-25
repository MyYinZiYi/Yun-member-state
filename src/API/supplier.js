/**
 * 供应商列表的接口
 */

//引入request
import request from "../request/request";

/**
 * 请求供应商管理列表查询接口
 * @param currentPage
 * @param pageSize
 * @param data
 * @returns {AxiosPromise}
 */

const supplierList = (currentPage, pageSize, data) => {
    return request({
        url: `/supplier/list/search/${currentPage}/${pageSize}`,
        method: "POST",
        data
    });
};
/**
 * 添加供应商列表接口
 * @param data
 * @returns {AxiosPromise}
 */
const addSupplier = (data) => {
    return request({
        url: "/supplier",
        method: "POST",
        data
    });
};

// 编辑供应商接口
const editSupplier = (id, data) => {
    return request({
        url: `/supplier/${id}`,
        method: "PUT",
        data
    });
};


// 查询单个供应商接口
const findSupplier = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "GET"
    })
}

//删除单个供应商管理接口、
const delSupplier = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "DELETE"
    })
}
export default {
    supplierList,
    addSupplier,
    findSupplier,
    delSupplier,
    editSupplier,
};