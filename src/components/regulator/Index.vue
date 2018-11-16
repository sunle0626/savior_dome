<template>
    <div  style="background: #f2f2f2">
        <CaseVue :insti="insti" :token="token"/>
        <ManageVue :insti="insti" :token="token"/>
        <!-- <BorardVue/> -->
        <FunVue/>
    </div>
</template>

<script>
import CaseVue from "./case.vue";
import ManageVue from "./manage.vue";
import BorardVue from "./bulletin_borard.vue";
import FunVue from "./fun.vue";
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
    CaseVue,
    ManageVue,
    BorardVue,
    FunVue
  },
  mounted() {

  }
};
</script>

<style scoped>
</style>