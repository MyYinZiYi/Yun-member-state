<template>
  <div class="mt-2">
    <el-form
      :inline="true"
      ref="queryForm"
      :model="supplierQueryParams"
      class="demo-form-inline"
    >
      <el-form-item prop="name">
        <el-input
          v-model="supplierQueryParams.name"
          placeholder="供应商名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input
          v-model="supplierQueryParams.linkman"
          placeholder="联系人"
        ></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input
          v-model="supplierQueryParams.mobile"
          placeholder="练习电话"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchQuery">查询</el-button>
        <el-button type="primary" @click="openDialog">新增</el-button>
        <el-button @click="reset('queryForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="SupplierList" border style="width: 100%" height="380">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column prop="linkman" label="联系人"></el-table-column>
      <el-table-column prop="mobile" label="联系电话"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="openDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="delSupplier(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      class="mt_2"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        :model="dialogFormParams"
        ref="dialogForm"
        :rules="dialogRules"
        style="width: 400px"
        label-width="120px"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input
            v-model="dialogFormParams.linkman"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input
            v-model="dialogFormParams.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="dialogFormParams.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="determine('dialogForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SupplierApi from "../../API/supplier"

export default {
  name: "",
  components: {},
  data() {
    return {
      //页码
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      // 查询的参数
      supplierQueryParams: {
        linkman: "",
        name: "",
        mobile: "",
      },
      //页码渲染的数据
      SupplierList: [],
      // 控制弹框的显示隐藏
      dialogFormVisible: false,
      //  弹框的数据
      dialogFormParams: {
        mobile: "",
        name: "",
        linkman: "",
        remark: "",
      },
      //弹框的标题
      dialogTitle: "",
      //弹框的正则校验
      dialogRules: {
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取供应商列表的数据
    async getSupplierList() {
      try {
        const { rows, count } = await SupplierApi.supplierList(
          this.currentPage,
          this.pageSize,
          this.supplierQueryParams
        );
        this.SupplierList = rows;
        this.total = count;
      } catch (error) {
        console.log(error.message);
      }
    },
    //分配每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSupplierList();
    },
    //跳转页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSupplierList();
    },
    //查询
    searchQuery() {
      this.currentPage = 1;
      this.getSupplierList();
    },
    //重置表单
    reset(Form) {
      this.$refs[Form].resetFields();
    },
    //打开弹框
    openDialog(id) {
      this.dialogFormVisible = true;
      if (typeof id === "number") {
        this.findSupplierId(id);
        this.dialogTitle = "供应商编辑";
      } else {
        this.dialogTitle = "供应商添加";
      }
    },
    //关闭弹框
    cancelDialog() {
      this.reset("dialogForm");
      this.dialogFormVisible = false;
    },
    //弹框确定按钮
    determine() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogFormParams.id
          ? this.handleEdidSupplier()
          : this.handleAddSupplier();
      });
    },
    //删除单个按钮
    delSupplier(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await SupplierApi.delSupplier(id);
            this.$message.success("删除成功");
            this.getSupplierList();
          } catch (error) {
            console.log(error.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //供应商添加
    async handleAddSupplier() {
      try {
        const response = await SupplierApi.addSupplier(this.dialogFormParams);
        this.reset("dialogForm");
        this.getSupplierList();
        this.dialogFormVisible = false;
        this.$message.success("添加成功");
      } catch (error) {
        console.log(error.maessage);
      }
    },
    async findSupplierId(id) {
      try {
        const response = await SupplierApi.findSupplier(id);
        // console.log(response);
        this.dialogFormParams = response;
      } catch (error) {
        console.log(error.message);
      }
    },
    //供应商编辑
    async handleEdidSupplier() {
      try {
        const response = await SupplierApi.editSupplier(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.getSupplierList();
        this.reset("dialogForm");
        this.$message.success("编辑成功");
        this.dialogFormVisible = false;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  created() {
    this.getSupplierList();
  },
};
</script>
<style scoped lang="scss"></style>