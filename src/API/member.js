import request from "@/request/request"

//获取会员列表与查询分页接口
const getMemberList = (page,size,data) => {

    return request({
      url : `/member/list/search/${page}/${size}`,
      method : "POST",
      data
    })
  }

//删除会员接口


//添加会员接口


//编辑会员接口


//查询单个会员接口



export default {
    getMemberList,
}