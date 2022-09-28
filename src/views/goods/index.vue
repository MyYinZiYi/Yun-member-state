<template>
  <div class="mt-2">
    <el-form
      :inline="true"
      ref="queryForm"
      :model="goodsQueryParams"
      class="demo-form-inline"
    >
      <el-form-item prop="name">
        <el-input
          v-model="goodsQueryParams.name"
          placeholder="商品名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="goodsQueryParams.code"
          placeholder="商品编号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          v-model="goodsQueryParams.supplierName"
          placeholder="选择供应商"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchQuery">查询</el-button>
        <el-button type="primary" @click="openDialog">新增</el-button>
        <el-button @click="reset('queryForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="goodsList" border style="width: 100%" height="380">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="code" label="商品编码"></el-table-column>
      <el-table-column prop="spec" label="商品规格"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="openDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="delGoods(scope.row.id)"
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
        <el-form-item label="商品名称" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input
            v-model="dialogFormParams.code"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input
            v-model="dialogFormParams.spec"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input
            v-model="dialogFormParams.retailPrice"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input
            v-model="dialogFormParams.purchasePrice"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input
            v-model="dialogFormParams.storageNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            v-model="dialogFormParams.supplierName"
            autocomplete="off"
            placeholder="选择供应商"
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
import GoodsApi from "../../API/goods"

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
      goodsQueryParams: {
        name: "",
        supplierName: "",
        code: "",
      },
      //页码渲染的数据
      goodsList: [],
      // 控制弹框的显示隐藏
      dialogFormVisible: false,
      //  弹框的数据
      dialogFormParams: {
        name: "",
        code: "",
        spec: "",
        retailPrice: 0,
        purchasePrice: 0,
        storageNum: 0,
        supplierName: "",
      },
      //弹框的标题
      dialogTitle: "",
      //弹框的正则校验
      dialogRules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "商品编码不能为空", trigger: "blur" },
        ],
        retailPrice: [
          { required: true, message: "零售价不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //获取商品列表的数据
    async getGoodsList() {
      try {
        const { rows, count } = await GoodsApi.goodsList(
          this.currentPage,
          this.pageSize,
          this.goodsQueryParams
        );
        this.goodsList = rows;
        this.total = count;
      } catch (error) {
        console.log(error.message);
      }
    },
    //分配每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getGoodsList();
    },
    //跳转页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoodsList();
    },
    //查询
    searchQuery() {
      this.currentPage = 1;
      this.getGoodsList();
    },
    //重置表单
    reset(Form) {
      this.$refs[Form].resetFields();
    },
    //打开弹框
    openDialog(id) {
      this.dialogFormVisible = true;
      if (typeof id === "number") {
        this.findGoodsId(id);
        this.dialogTitle = "商品编辑";
      } else {
        this.dialogTitle = "商品添加";
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
          ? this.handleEditGoods()
          : this.handleAddGoods();
      });
    },
    //删除单个按钮
    delGoods(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await GoodsApi.delGoods(id);
            this.$message.success("删除成功");
            this.getGoodsList();
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
    //商品添加
    async handleAddGoods() {
      try {
        const response = await GoodsApi.addGoods(this.dialogFormParams);
        this.reset("dialogForm");
        this.getGoodsList();
        this.dialogFormVisible = false;
        this.$message.success("添加成功");
      } catch (error) {
        console.log(error.maessage);
      }
    },
    async findGoodsId(id) {
      try {
        const response = await GoodsApi.findGoods(id);
        // console.log(response);
        this.dialogFormParams = response;
      } catch (error) {
        console.log(error.message);
      }
    },
    //商品编辑
    async handleEditGoods() {
      try {
        const response = await GoodsApi.editGoods(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.getGoodsList();
        this.reset("dialogForm");
        this.$message.success("编辑成功");
        this.dialogFormVisible = false;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  created() {
    this.getGoodsList();
  },
};
</script>
<style scoped lang="scss">
</style>