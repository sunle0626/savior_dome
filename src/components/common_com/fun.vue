<template>
    <div class="fun_box">
        <h2>功能查询</h2>
        <div class="fun_list">
            <div class="fun_one fun">
                <img src="../../../static/images/com_images/icon_07.png" alt="">
                <span>已完成案件查询</span>
            </div>
            <div class="fun_two fun">
                <img src="../../../static/images/com_images/icon_08.png" alt="">
                <span>财务结算查询</span>
            </div>
            <div class="fun_two fun">
                <img src="../../../static/images/com_images/icon_08.png" alt="">
            <span @click="todr()">保单导入</span>
            </div>
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
      window.location.href = "/rescue/user/wListRegulators";
    },
    toserve() {
      window.location.href = "/rescue/user/wToService";
    },
    todr() {
      window.location.href = "/rescue/user/wToService";
    }
  }
};
</script>

<style scoped>
.fun_box {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 20px 180px;
  float: left;
  width: 100%;
  background: #fff;
}
.fun_box h2 {
  font-size: 20px;
  font-weight: 500;
  text-align: start;
}
.fun_box .fun_list {
  width: 100%;
  float: left;
  margin: 30px 0;
}
.fun_list .fun {
  float: left;
  margin: 20px 35px;
}
.fun img,
.fun span {
  float: left;
}
.fun img {
  height: 72px;
  width: auto;
}
.fun span {
  line-height: 72px;
  margin-left: 10px;
}
</style>