<template>
    <div>
        <CaseVue :insti="insti" :token="token"/>
        <h2>
          监管机构
        </h2>
        <ManageVue :insti="insti" :token="token"/>
        <BorardVue/>
        <FunVue/>
    </div>
</template>

<script>
import CaseVue from "../common_reg/case.vue";
import ManageVue from "../common_reg/manage.vue";
import BorardVue from "../common_reg/bulletin_borard.vue";
import FunVue from "../common_reg/fun.vue";
import qs from "qs";
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