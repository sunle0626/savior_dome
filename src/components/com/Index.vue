<template>
    <div>
        <CaseVue :insti="insti" :token="token"/>
        <h2>
          指挥中心
        </h2>
        <ManageVue :insti="insti" :token="token"/>
        <BorardVue/>
        <FunVue/>
    </div>
</template>

<script>
import CaseVue from "../common_com/case.vue";
import ManageVue from "../common_com/manage.vue";
import BorardVue from "../common_com/bulletin_borard.vue";
import FunVue from "../common_com/fun.vue";
import qs from "qs";
export default {
  data() {
    return {
      token: this.$route.params.token,
      insti: this.$route.params.insti
    };
  },
  components: {
    CaseVue,
    ManageVue,
    BorardVue,
    FunVue
  },
  mounted() {
    //   /1.0/rescue/case/all_ongoing_case
    console.log(this.token);
    // this.axios
    //   .post(
    //     "http://api.test.dajiuxing.com.cn/1.0/rescue/case/all_ongoing_case",
    //     qs.stringify({
    //       token: this.token
    //     })
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });
    ///1.0/rescue/service_plan/level_service
  }
};
</script>

<style scoped>
</style>