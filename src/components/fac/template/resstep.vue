<template>
    <div class="res_box">
        <p class="back_box" @click="back()">
        <img src="../../../../static/images/back.png" alt="">
        返回上一页
        </p>
        <h2>开始救援</h2>
        <div class="step_box">
            <p>流程示意</p>
            <el-steps :active="2" align-center>
                <el-step title="启动当地救援公司" ></el-step>
                <el-step title="医疗费用担保" ></el-step>
                <el-step title="收集医疗单据" ></el-step>
                <el-step title="传递相关医疗单据到保险公司" ></el-step>
            </el-steps>
            <p>救援服务清单</p>
            <div class="det_box">
            <p>1、医疗救援</p>
            <el-steps direction="vertical" :active="1" class="box">
                <el-step title="A、医疗机构推荐"></el-step>
                <el-step title="B、出诊服务"></el-step>
                <el-step title="C、医疗报告的索取和翻译"></el-step>
            </el-steps>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.res_box{
    text-align: left;
}
p{
    line-height: 25px;
}
.det_box{
    height: 350px;
    box-sizing: border-box;
    padding: 10px 15px;
}
.back_box {
  text-align: left;
  font-size: 14px;
  line-height: 45px;
  color: #666;
  cursor: pointer;
}
.res_box > h2 {
  font-size: 20px;
  color: #333;
  font-weight: 600;
  line-height: 45px;
}
.box{
    margin-left: 100px;
    margin-top: -20px;
}
</style>