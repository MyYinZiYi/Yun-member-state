/**
 * 商品列表的接口
 */

//引入request
import request from "../request/request";

/**
 * 请求商品管理列表查询接口
 */

const goodsList = (currentPage, pageSize, data) => {
    return request({
        url: `/goods/list/search/${currentPage}/${pageSize}`,
        method: "POST",
        data
    });
};
/**
 * 添加商品列表接口
 */
const addGoods = (data) => {
    return request({
        url: "/goods",
        method: "POST",
        data
    });
};

// 编辑商品接口
const editGoods = (id, data) => {
    return request({
        url: `/goods/${id}`,
        method: "PUT",
        data
    });
};


// 查询单个商品接口
const findGoods = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "GET"
    })
}

//删除单个商品管理接口、
const delGoods = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "DELETE"
    })
}
export default {
    goodsList,
    addGoods,
    editGoods,
    findGoods,
    delGoods
};