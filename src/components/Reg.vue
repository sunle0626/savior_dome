<template>
    <div>
        <headerVue :insti="insti"/>
          <router-view/>
          <Messagebox :token="token"/>
    </div>
</template>

<script>
import headerVue from "./regulator/header.vue";
import Messagebox from "./Tips_box/message_box.vue";
export default {
  data() {
    return {
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      insti:
        this.$route.params.insti ||
        JSON.parse(window.localStorage.getItem("insti")),
    };
  },
  components: {
    headerVue,
    Messagebox
  },
  mounted() {
    // let insti = this.insti;
    // let token = this.token;
    // this.$router.push({
    //   name: "RegIndex",
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