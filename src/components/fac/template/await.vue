<template>
    <div>
        <div class="top_box">
            <h2>等待方案报价案件</h2>
            <div class="time_box">
                <div class="st_box">
                    起始时间
                    <span>
                        就只有天数，没有小时
                    </span>
                </div>
                <div class="en_box">
                    起始时间
                    <span>
                        就只有天数，没有小时
                    </span>
                </div>
            </div>
        </div>
        <formVue/>
    </div>
</template>

<script>
import formVue from "../../common/form.vue";
export default {
  components: {
    formVue
  }
};
</script>

<style scoped>
.top_box{
    width: 100%;
}
.top_box h2{
    font-size: 22px;
    color: #333;
    font-weight: normal;
    text-align: left;
}
.top_box .time_box{
    font-size: 16px;
}
.time_box>div{
    float: left;
    color: #333;
    padding: 10px 0;
    margin-left: 50px;
}
.time_box>div:first-child{
    margin-left: 10px;
}
.time_box>div span{
    width: 220px;
    border: 1px solid #999;
    color: #999;
    display: inline-block;
    border-radius: 3px;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
}
</style>