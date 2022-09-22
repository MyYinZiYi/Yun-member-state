<template>
  <div>
    <app-link></app-link>
    <router-view></router-view>
  </div>
</template>
<script>
import AppLink from "./Link.vue";
export default {
  name: "AppMain",
  components: {
    AppLink
  },
  computed: {
    controllLink() {
      return !this.$router.path === "/index";
    },
  },
};
</script>
<style scoped>

</style>