<template>
  <div class="Login-wrapper">
    <div class="Login-form">
      <h2 class="Login-title">积云会员管理系统</h2>
      <el-form ref="form" :rules="rules" :model="LoginForm" label-width="50px">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="LoginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="LoginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>


export default {
  data() {
    return {
      LoginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleLoginSubmit() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.handleLogin();
      });
    },
    async handleLogin() {
      const token = await this.$store.dispatch("login", this.LoginForm)
      if(!token) return
      const userInfo =await this.$store.dispatch("handleUserInfo")
      if(!userInfo) return
      this.$message.success("登录成功")
      this.$router.push("/")
    },
    // async handleLogin() {
    // try {
    //   const response = await login(this.LoginForm);
    //   this.$store.dispatch("DIS_SET_TOKEN", response.token);
    //   const userInfo = await getUserInfo();
    //   this.$store.dispatch("DIS_SET_USER_INFO",userInfo)
    //   this.$router.push("/")
    // } catch (e) {
    //   console.log(e.message);
    // }
    // },
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
.Login-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}
.el-form {
  margin-top: 20px;
}
.el-button {
  margin-right: 40px;
}
</style>