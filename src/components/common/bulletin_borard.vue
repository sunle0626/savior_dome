<template>
    <div class="borard_box">
        <div class="con_box">
            <img src="../../../static/images/com_images/icon_06.png" alt="">
            <div class="box_bull">
                <h4>关于各位服务商自行补充资料的通知</h4>
                <p>平台正式上线，请各位补充自己材料，如果逾期为补充资料，则自动进行降级，截止时间2019年12月31</p>
            </div>
            <div class="time_box">
                2018.09.09
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.borard_box {
  width: 100%;
  float: left;
}
.con_box {
  width: 78%;
  padding:  20px 40px;
  margin-left: 11%;
  margin-right: 11%;
  float: left;
  border-bottom: 1px solid #ccc;
}
.con_box .box_bull,
.con_box img {
  float: left;
}
.con_box img {
  margin-left: 5px;
}
.con_box .box_bull {
  margin-left: 20px;
  text-align: left;
  line-height: 26px;
}
.box_bull h4 {
  font-size: 18px;
  color: #444;
  font-weight: normal;
}
.box_bull p {
  font-size: 14px;
  color: #777;
}
.time_box {
  float: right;
  line-height: 48px;
  font-size: 14px;
  color: #777;
  padding-right: 5px;
}
</style>