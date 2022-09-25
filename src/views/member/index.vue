<template>
  <div class="mt-2">
    <el-form :inline="true" :model="memberQueryParams" ref="memberQueryForm">
      <el-form-item prop="cardNum">
        <el-input
          v-model="memberQueryParams.cardNum"
          placeholder="会员卡号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="memberQueryParams.name"
          placeholder="会员姓名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="memberQueryParams.payType" placeholder="支付类型">
          <el-option
            v-for="(item, index) in payType"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          v-model="memberQueryParams.birthday"
          type="date"
          placeholder="出生日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryMember">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button @click="handleReset('memberQueryForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="memberList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template v-slot="scope">
          {{ scope.row.payType | filterPayType }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-2"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import MemberApi from "@/API/member";
import MemberEnum from "../../enum/menber";
export default {
  data() {
    return {
      memberList: [],
      //   页码
      page: 1,
      //   条数
      size: 10,
      //   总条数
      total: 0,
      //   查询的参数
      memberQueryParams: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      payType: MemberEnum.payType,
    };
  },
  created() {
    this.getMemberList();
  },
  filters: {
    filterPayType(value) {
      const data = MemberEnum.payType.find((item, index) => {
        return item.type === value;
      });
      return data ? data.name : "";
    },
  },
  methods: {
    async getMemberList() {
      const { rows, total } = await MemberApi.getMemberList(
        this.page,
        this.size,
        this.memberQueryParams
      );
      this.total = total;
      this.memberList = rows;
    },
    // 实现条数
    handleSizeChange(size) {
      this.size = size;
      this.getMemberList();
    },
    // 实现页码
    handleCurrentChange(page) {
      this.page = page;
      this.getMemberList();
    },
    // 查询功能
    handleQueryMember() {
      this.page = 1;
      this.getMemberList();
    },
    // 表单重置
    handleReset(formName) {
      this.$refs[formName].resetFields();
    },
    //列表删除
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await MemberApi.deleteMemberList(id);
            this.$message.success("删除成功")
            this.getMemberList()
          } catch(e){
            console.log(e.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
</style>