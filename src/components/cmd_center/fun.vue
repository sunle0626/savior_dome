<template>
    <div class="fun_box">
        <h2>功能查询</h2>
        <div class="fun_list">
            <div class="fun_one fun">
                <img src="../../../static/images/com_images/icon_07.png" alt="">
                <span @click="tofinish">已完成案件查询</span>
            </div>
            <!-- <div class="fun_two fun">
                <img src="../../../static/images/com_images/icon_08.png" alt="">
                <span>财务结算查询</span>
            </div>
            <div class="fun_two fun">
                <img src="../../../static/images/com_images/icon_08.png" alt="">
            <span @click="todr()">保单导入</span>
            </div> -->
            <div class="fun_two fun">
                <img src="../../../static/images/com_images/icon_08.png" alt="">
            <span @click="toadd()">保险公司合同管理</span>
            </div>
            <div class="fun_two fun">
                <img src="../../../static/images/com_images/icon_08.png" alt="">
            <span @click="toserve()">设置授权费用</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data
    };
  },
  methods: {
    toadd() {
      window.location.href = "/rescue/user/wListRegulators?token="+this.token;
    },
    toserve() {
      window.location.href = "/rescue/user/wToService?token="+this.token;
    },
    todr() {
      window.location.href = "/rescue/user/wToService?token="+this.token;
    },
    tofinish(){
      this.$router.push({
        name: "ComFinish",
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