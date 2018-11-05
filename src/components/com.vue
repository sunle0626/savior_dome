<template>
    <div>
        <headerVue :insti="insti"/>
        <keep-alive>
          <router-view/>
        </keep-alive>
    </div>
</template>

<script>
import headerVue from "./common_com/header.vue";
export default {
  data() {
    return {
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      insti:
        this.$route.params.insti ||
        JSON.parse(window.localStorage.getItem("insti"))
    };
  },
  components: {
    headerVue,
  },
  mounted() {
    // console.log(this.$route.params)
    // let insti = this.insti;
    // let token = this.token;
    // this.$router.push({
    //   name: "ComIndex",
    //   params: {
    //     insti,
    //     token
    //   }
    // });
  }
};
</script>

<style scoped>
</style>