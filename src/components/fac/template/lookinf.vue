<template>
    <div class="inf_wrap">
        <p class="back_box" @click="back()">
          <img src="../../../../static/images/back.png" alt="">
          返回上一页
          </p>
        <div class="box_req">
            <h2>回复方案及报价详情</h2>
            <div class="req_box">
                <b>救援方案</b>
                <div class="acc_box">
                    <p>附件({{acc_list.length}})</p>
                    <ul>
                        <li v-for="(v,ind) in acc_list" :key="ind">
                            <img :src="v.url" alt="">
                            <p>{{v.txt}}</p>
                            <a :href="v.dow">下载</a>
                        </li>
                    </ul>
                </div>
            </div>
                <div class="rescue_box">
                    <p>1、医疗救援</p>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="医疗机构推介" disabled checked>
                            <span class="res_div">医疗机构推介</span>
                            <br/>
                            <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                            <br/>
                            <span class="res_box">回复：我们建议三级甲等医院，有牛逼的专家，稍微贵一些，还在保险条款之内</span>
                        </el-checkbox>
                        <el-checkbox label="门诊与住院预约" disabled checked>
                            <span class="res_div">门诊与住院预约</span>
                            <br/>
                            <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                            <br/>
                            <span class="res_box">回复：我们建议三级甲等医院，有牛逼的专家，稍微贵一些，还在保险条款之内</span>
                        </el-checkbox>
                        <el-checkbox label="出诊服务" disabled checked>
                            <span class="res_div">出诊服务</span>
                            <br/>
                            <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                            <br/>
                            <span class="res_box">回复：我们建议三级甲等医院，有牛逼的专家，稍微贵一些，还在保险条款之内</span>
                        </el-checkbox>
                        <el-checkbox label="医疗报告的索取与翻译" disabled checked>
                            <span class="res_div">医疗报告的索取与翻译</span>
                            <br/>
                            <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                            <br/>
                            <span class="res_box">回复：我们建议三级甲等医院，有牛逼的专家，稍微贵一些，还在保险条款之内</span>
                        </el-checkbox>
                        <el-checkbox label="遗体转运" disabled checked>
                            <span class="res_div">遗体转运</span>
                            <br/>
                            <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                            <br/>
                            <span class="res_box">回复：无</span>
                        </el-checkbox>
                    </el-checkbox-group>
                    <p>2、费用担保</p>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="医疗机构推介" disabled checked>
                            <span class="db_div">医疗费用担保或非医疗费用担保</span>
                            <span class="db_box">限额<b>$10000</b></span>
                            <p>说明：无</p>
                        </el-checkbox>
                    </el-checkbox-group>
                        <div class="upbtn_box">
                        <el-button type="primary" @click="flag=true;back()">关闭详情</el-button>
                        <span @click="toalter">修改报价</span>
                        </div>
                </div>
           </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      acc_list: [
        {
          url:
            "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=9db129d85c3d269731d30e5d65fbb24f/64380cd7912397dd9c198c165482b2b7d0a287bb.jpg",
          txt: "指挥中心上传的文件"
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      checkList: [],
      flag:false
    };
  },
  methods: {
    back() {
      this.$router.push("/fac/caseindex/offer");
    },
    toalter(){
      this.$router.push("/fac/caseindex/alter");
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #999;
}
.back_box {
  text-align: left;
  font-size: 14px;
  line-height: 45px;
  color: #666;
  cursor: pointer;
}
.inf_wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 5px 15px;
  text-align: left;
}
.box_req > h2 {
  font-size: 20px;
  margin-top: 5px;
  line-height: 45px;
  text-align: left;
  color: #333;
}
.req_box {
  box-sizing: border-box;
  padding: 0 15px;
}
.req_box b {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
.org_box {
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 15px;
}
.org_box p {
  line-height: 40px;
  color: #333;
}
.acc_box {
  box-sizing: border-box;
  padding: 0 10px;
}
.acc_box > p {
  color: #333;
  line-height: 40px;
  font-size: 15px;
}
span {
  color: #df1717;
  margin-left: 2px;
}
.acc_box ul li {
  display: inline-block;
  width: 20%;
  text-align: center;
}
.acc_box ul li p {
  text-align: center;
  line-height: 36px;
  font-size: 14px;
}
.acc_box ul li img {
  width: 90px;
  height: 120px;
}
.acc_box ul li a {
  color: #00abfa;
  font-size: 14px;
}
.el-form {
  margin-top: 15px;
}
.el-input {
  width: 120px;
  height: 30px;
}
.el-form-item__label {
  font-size: 14px;
}
.rescue_box {
  box-sizing: border-box;
  padding: 0 20px;
}
.rescue_box > p {
  line-height: 40px;
  font-size: 14px;
}
.res_div {
  position: relative;
  top: 18px;
}
.res_box {
  position: relative;
  top: 20px;
  font-size: 14px;
  color: #999;
}
.el-checkbox-group {
  position: relative;
  box-sizing: border-box;
  padding: 0 15px;
}
.el-checkbox {
  width: 100%;
  margin-bottom: 20px;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.db_div,
.res_div {
  font-size: 14px;
  color: #333;
}
.db_box {
  font-size: 14px;
  color: #333;
  margin-left: 30px;
}
.db_box b {
  color: #ff7200;
  margin-left: 8px;
}
.el-textarea {
  display: block;
  width: 160%;
  margin-top: 20px;
}
.upbtn_box {
  text-align: center;
      margin-top: 15px;
}
.upbtn_box span{
    color: #00abfa;
    margin-left: 5px;
}
</style>