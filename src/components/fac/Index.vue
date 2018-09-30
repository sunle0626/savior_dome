<template>
    <div>
        <caseVue :insti="insti" :token="token"/>
        <manageVue :insti="insti" :token="token"/>
        <borardVue/>
        <funVue/>
    </div>
</template>

<script>
import caseVue from "../common/case.vue";
import manageVue from "../common/manage.vue";
import borardVue from "../common/bulletin_borard.vue";
import funVue from "../common/fun.vue";
import qs from "qs";
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
    caseVue,
    manageVue,
    borardVue,
    funVue
  },
  mounted() {
    //   /1.0/rescue/case/all_ongoing_case
    console.log(this.token);
    this.axios
      .post(
        "/rescue/case/all_ongoing_case",
        qs.stringify({
          token: this.token
        })
      )
      .then(res => {
        console.log(res);
      });
    ///1.0/rescue/service_plan/level_service
  }
};
</script>

<style scoped>
</style>