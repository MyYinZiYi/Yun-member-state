<template>
  <div>
    <router-link to="/" class="link">
      <img class="logo" src="@/assets/previewc.gif" alt="LoGo" width="25px" />
      <span class="comtany">会员管理系统</span>
    </router-link>
    <!-- 下拉菜单 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ $store.getters.userInfo.username || ""
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changPass" icon="el-icon-edit"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item command="logout" icon="el-icon-user"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "AppHeader",
  methods: {
    handleCommand(command) {
      switch (command) {
        case "changPass":
          this.handleChangePass();
          break;
        case "logout":
          this.handleLogout();
          break;
      }
    },
    handleChangePass() {
      olert("修改密码");
    },
    async handleLogout() {
      try {
        const response = await this.$store.dispatch("handleLogout");
        this.$router.push("login");
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>
<style scoped>
.el-dropdown {
  float: right;
  margin-right: 30px;
  color: #fff;
}
.logo {
  vertical-align: middle;
}
.link {
  text-decoration: none;
  color: #fff;
  line-height: 50px;
  margin-left: 30px;
}
.comtany {
  margin-left: 5px;
  vertical-align: middle;
}
</style>