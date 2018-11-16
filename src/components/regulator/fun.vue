<template>
    <div class="fun_box">
        <h2>功能查询</h2>
        <div class="fun_list">
            <div class="fun_one fun pointer_box">
                <img src="../../../static/images/com_images/icon_07.png" alt="">
                <span @click="tofinish">已完成案件查询</span>
            </div>
            <!-- <div class="fun_two fun pointer_box">
                <img src="../../../static/images/com_images/icon_08.png" alt="">
                <span>财务结算查询</span>
            </div> -->
            <div class="fun_th fun pointer_box">
                <img src="../../../static/images/com_images/icon_10.png" alt="">
                <span>保单导入</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    tofinish(){
        this.$router.push({
          name: "RegFinish",
          params: {
          token: this.$route.params.token||
          JSON.parse(window.localStorage.getItem("data")).data
          }
        });
      }
  }
};
</script>

<style scoped>
@import url(../../css/fun.css);
</style>