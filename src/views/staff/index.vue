<template>
  <div class="mt-2">
    <el-form
      :inline="true"
      ref="queryForm"
      :model="staffQueryParams"
      class="demo-form-inline"
    >
      <el-form-item prop="username">
        <el-input
          v-model="staffQueryParams.username"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="staffQueryParams.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchQuery">查询</el-button>
        <el-button type="primary" @click="openDialog">新增</el-button>
        <el-button @click="reset('queryForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="staffList" border style="width: 100%" height="380">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="salary" label="薪酬"></el-table-column>
      <el-table-column prop="entryDate" label="入职时间"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="openDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="delStaff(scope.row.id)"
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
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="dialogFormParams.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="dialogFormParams.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input
            v-model="dialogFormParams.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary">
          <el-input
            v-model="dialogFormParams.salary"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="dialogFormParams.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
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
import StaffApi from "../../API/staff"

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
      staffQueryParams: {
        name: "",
        username: "",
      },
      //页码渲染的数据
      staffList: [],
      // 控制弹框的显示隐藏
      dialogFormVisible: false,
      //  弹框的数据
      dialogFormParams: {
        uaername: "",
        name: "",
        age: "",
        address: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      //弹框的标题
      dialogTitle: "",
      //弹框的正则校验
      dialogRules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取员工列表的数据
    async getStaffList() {
      try {
        const { rows, count } = await StaffApi.staffList(
          this.currentPage,
          this.pageSize,
          this.staffQueryParams
        );
        this.staffList = rows;
        this.total = count;
      } catch (error) {
        console.log(error.message);
      }
    },
    //分配每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStaffList();
    },
    //跳转页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStaffList();
    },
    //查询
    searchQuery() {
      this.currentPage = 1;
      this.getStaffList();
    },
    //重置表单
    reset(Form) {
      this.$refs[Form].resetFields();
    },
    //打开弹框
    openDialog(id) {
      this.dialogFormVisible = true;
      if (typeof id === "number") {
        this.findStaffID(id);
        this.dialogTitle = "员工编辑";
      } else {
        this.dialogTitle = "员工添加";
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
          ? this.handleEdidStaff()
          : this.handleAddStaff();
      });
    },
    //删除单个按钮
    delStaff(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await StaffApi.delStaff(id);
            this.$message.success("删除成功");
            this.getStaffList();
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
    //员工添加
    async handleAddStaff() {
      try {
        const response = await StaffApi.addStaff(this.dialogFormParams);
        this.reset("dialogForm");
        this.getStaffList();
        this.dialogFormVisible = false;
        this.$message.success("添加成功");
      } catch (error) {
        console.log(error.maessage);
      }
    },
    async findStaffID(id) {
      try {
        const response = await StaffApi.findStaff(id);
        // console.log(response);
        this.dialogFormParams = response;
      } catch (error) {
        console.log(error.message);
      }
    },
    //员工编辑
    async handleEdidStaff() {
      try {
        const response = await StaffApi.editStaff(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.getStaffList();
        this.reset("dialogForm");
        this.$message.success("编辑成功");
        this.dialogFormVisible = false;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  created() {
    this.getStaffList();
  },
};
</script>
<style scoped lang="scss"></style>