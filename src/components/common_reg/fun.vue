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
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.fun_box {
  margin-top: 25px;
  box-sizing: border-box;
  padding: 0 180px;
  float: left;
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
  margin:0 35px;
}
.fun img,.fun span{
    float: left;
}
.fun img {
  height: 72px;
  width: auto;
}
.fun span {
  line-height: 72px;
  margin-left: 10px
}
</style>