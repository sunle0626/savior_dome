<template>
    <div>
    <div class="form_box">
        <h2>设置服务流程</h2>
        <div class="box">  
            <h3>一、医疗救援</h3>
            <ul class="sa_box">
                <li>
                    <div class="icon_box">
                        <img src="../../../static/images/savior_icon_01.png" alt="">
                        <small>医疗救援</small>
                    </div>
                    <span @click="setsavior=true">
                        编辑
                    </span>
                </li>
                <li>
                    <div class="icon_box">
                        <img src="../../../static/images/savior_icon_01.png" alt="">
                        <small>住院安排</small>
                    </div>
                    <span @click="setsavior=true">
                        编辑
                    </span>
                </li>
                <li>
                    <div class="icon_box">
                        <img src="../../../static/images/savior_icon_01.png" alt="">
                        <small>医疗送返/转运</small>
                    </div>
                    <span @click="setsavior=true">
                        编辑
                    </span>
                </li>
                <li>
                    <div class="icon_box">
                        <img src="../../../static/images/savior_icon_01.png" alt="">
                        <small>其他医疗救援</small>
                    </div>
                    <span @click="setsavior=true">
                        编辑
                    </span>                    
                </li>
            </ul>
        </div>
    </div>
        <el-dialog class="set_box"
        title="编辑服务流程"
        :visible.sync="setsavior"
        width="50%"
        center>
        <div class="set_savior_box">
            <p>一、门诊急救医</p>
            <ul class="savior_box">
                <li><img @click="set($event)" src="../../../static/images/savior_icons/e_r_0.png" alt="">
                <p>医疗咨询</p></li>
                <li><img @click="set($event)" src="../../../static/images/savior_icons/e_r_0.png" alt="">
                <p>医疗咨询</p></li>
                <li><img @click="set($event)" src="../../../static/images/savior_icons/e_r_0.png" alt="">
                <p>医疗咨询</p></li>
                <li><img @click="set($event)" src="../../../static/images/savior_icons/e_r_0.png" alt="">
                <p>医疗咨询</p></li>
                <li><img @click="set($event)" src="../../../static/images/savior_icons/e_r_0.png" alt="">
                <p>医疗咨询</p></li>
            </ul>
        </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      setsavior: false,
      tableData: [
        {
          number: 1,
          name: "平安保险",
          start: "2019 01 01  24:00",
          end: "2019 01 01  24:00",
          pattern: "大包",
          cost: "10000",
          currency: "RMB",
          agreement: ""
        }
      ]
    };
  },
  methods:{
      set(){

      }
  }
};
</script>

<style scoped>
.sa_box {
  display: flex;
  justify-content: space-between;
}
.sa_box li {
  width: 22%;
  height: 50px;
  line-height: 50px;
  border: 1px solid #00abfa;
  border-radius: 3px;
}
.sa_box li div {
  line-height: 55px;
}
span {
  color: #00abfa;
}
.savior_box{
    margin-top: 18px;
    display: flex;
    justify-content: space-between;
}
.savior_box p{
    text-align: center;
}
</style>