<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import TesAPI from "../API/api";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      page: 1,
      size: 10,
    };
  },
  created() {
    //会员
    TesAPI.getMemberList(this.page, this.size)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //供应商
    TesAPI.getMesearchList(this.page, this.size)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
