<template>
    <div style="background: #f2f2f2">
        <caseVue :insti="insti" :token="token"/>
        <manageVue :insti="insti" :token="token"/>
        <!-- <borardVue/> -->
        <funVue/>
    </div>
</template>

<script>
import caseVue from "./case.vue";
import manageVue from "./manage.vue";
import borardVue from "./bulletin_borard.vue";
import funVue from "./fun.vue";
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
    
    ///1.0/rescue/service_plan/level_service
  }
};
</script>

<style scoped>
</style>