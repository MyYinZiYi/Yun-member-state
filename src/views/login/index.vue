<template>
  <div class="Login-wrapper">
    <div class="Login-form">
        <h2 class="Login-title">积云会员管理系统</h2>
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="账号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
    };
  },
};
</script>
<style scoped>
.Login-wrapper {
  background: url("C:\Users\以往\Desktop\Yun-member-state\src\assets\preview.jpg")
    no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.Login-form {
  width: 350px;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 160px auto;
  height: 200px;
  border-radius: 20px;
  padding: 28px;
}
.Login-title{
    font-size: 24px;
    font-weight: 700;
    text-align: center;
}
.el-form{
    margin-top: 20px;
}
.el-button{
    margin-right: 40px;
}
</style>