<template>
    <div>
        <caseVue :insti="insti" :token="token"/>
        <manageVue/>
        <borardVue/>
        <funVue/>
    </div>
</template>

<script>
import caseVue from "../common/case.vue";
import manageVue from "../common/manage.vue";
import borardVue from "../common/bulletin_borard.vue";
import funVue from "../common/fun.vue";
export default {
  data() {
    return {
      token: this.$route.params.token,
      insti: this.$route.params.insti
    };
  },
  components: {
    caseVue,
    manageVue,
    borardVue,
    funVue
  },
  mounted() {
    //   /1.0/rescue/case/all_ongoing_case
    console.log(this.token);
    // fetch(
    //   "http://api.test.dajiuxing.com.cn/1.0/rescue/case/all_ongoing_case?token=" +
    //     this.token
    // )
    //   .then(function(res) {
    //     console.log(res);
    //     return res.json()
    //   })
    //   .then(function(data) {
    //       console.log(data)
    //   });
    // fetch("http://api.test.dajiuxing.com.cn/1.0/rescue/service_plan/all_service", {
    //   method: "POST",
    //   body: `token=${this.token}`,
    //   mode: "cors",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
    // })
    //   .then(function(res) {
    //       console.log(res)
    //     return res.json();
    //   })
    //   .then(function(data) {
    //     console.log(data);
    //   });
    ///1.0/rescue/service_plan/level_service
  }
};
</script>

<style scoped>
</style>