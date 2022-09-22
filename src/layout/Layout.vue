<template>
  <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-container>
      <el-aside width="230px"> 
        <app-aside> </app-aside>
      </el-aside>
      <el-main>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppHeader from "./AppHeader/header.vue";
import AppAside from "./AppAside/aside.vue";
import AppMain from "./AppMain/main.vue";
export default {
  name: "Layout",
  components: {
    AppHeader,
    AppAside,
    AppMain,
  },
};
</script>
<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #2d3a4b;
  color: #fff;
  line-height: 50px;
  height: 50px !important;
  padding: 0;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
</style>