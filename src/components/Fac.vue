<template>
    <div>
        <headerVue :insti="insti"/>
        <router-view/>
    </div>
</template>

<script>
import headerVue from "./common/header.vue";
import IndexVue from "./fac/Index.vue";
export default {
  data() {
    return {
      token: this.$route.params.token,
      insti: this.$route.params.insti
    };
  },
  components: {
    headerVue,
    IndexVue
  },
  mounted() {
    let insti = this.insti;
    let token = this.token;
    this.$router.push({
      path: "/fac/index",
      name: "FacIndex",
      params: {
        insti,
        token
      }
    });
  }
};
</script>

<style scoped>
</style>