<template>
    <div class="pardata_box">
        <div class="data_wrap">
            <ul>
                <li v-for="(v,ind) in objdata" :key="ind">
                    {{v}}
                </li>
                <li>
                    <span>事故经过：</span>
                    <textarea name="pass" id="passnode" cols="30" rows="10">
                        
                    </textarea>
                </li>
            </ul>
        </div>
        <div class="req_box">
           <p><b>B、救援请求</b></p>
           <div class="box_req">
               <ul>
                   <li>
                       <b>A、已申请报价服务机构</b>
                       <div class="org_box">
                            <p>A、意大利------救援公司------安联救援意大利分公司</p>
                            <p>B、意大利------救援公司------安联救援意大利分公司</p>
                       </div>
                   </li>
                   <li>
                       <b>B、服务清单</b>
                       <div class="acc_box">
                           <p>相关附件({{acc_list.length}})</p>
                           <ul>
                               <li v-for="(v,ind) in acc_list" :key="ind">
                                   <img :src="v.url" alt="">
                                   <p>{{v.txt}}</p>
                                   <a :href="v.dow">下载</a>
                               </li>
                           </ul>
                       </div>
                       <div class="rescue_box">
                           <p>1、医疗救援</p>
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="医疗机构推介" disabled checked>
                                    <span class="res_div">医疗机构推介</span>
                                    <br/>
                                    <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                                </el-checkbox>
                                <el-checkbox label="门诊与住院预约" disabled checked>
                                    <span class="res_div">门诊与住院预约</span>
                                    <br/>
                                    <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                                </el-checkbox>
                                <el-checkbox label="出诊服务" disabled checked>
                                    <span class="res_div">出诊服务</span>
                                    <br/>
                                    <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                                </el-checkbox>
                                <el-checkbox label="医疗报告的索取与翻译" disabled checked>
                                    <span class="res_div">医疗报告的索取与翻译</span>
                                    <br/>
                                    <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                                </el-checkbox>
                                <el-checkbox label="遗体转运" disabled checked>
                                    <span class="res_div">遗体转运</span>
                                    <br/>
                                    <span class="res_box">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
                                </el-checkbox>
                            </el-checkbox-group>
                            <p>2、费用担保</p>
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="医疗机构推介" disabled checked>
                                    <span class="db_div">医疗费用担保或非医疗费用担保</span>
                                    <span class="db_box">限额<b>$10000</b></span>
                                </el-checkbox>
                            </el-checkbox-group>
                       </div>
                   </li>
               </ul>
               <div class="upbtn_box">
                   <el-button type="primary" @click="toinf">回复报价及方案</el-button>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      objdata: {
        add: "出险地：中国北京市门头沟平安路江泰保险大厦 ",
        type: "事故类型：风险灾害 ",
        no: "是否团险：是",
        part: "受伤部位：腿部 ",
        weather: "天气灾害：气象灾害 "
      },
      acc_list: [
        {
          url:
            "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=9db129d85c3d269731d30e5d65fbb24f/64380cd7912397dd9c198c165482b2b7d0a287bb.jpg",
          txt: "指挥中心上传的文件",
          dow:
            "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=9db129d85c3d269731d30e5d65fbb24f/64380cd7912397dd9c198c165482b2b7d0a287bb.jpg"
        },
        {
          url:
            "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=9db129d85c3d269731d30e5d65fbb24f/64380cd7912397dd9c198c165482b2b7d0a287bb.jpg",
          txt: "指挥中心上传的文件",
          dow:
            "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=9db129d85c3d269731d30e5d65fbb24f/64380cd7912397dd9c198c165482b2b7d0a287bb.jpg"
        },
        {
          url:
            "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=9db129d85c3d269731d30e5d65fbb24f/64380cd7912397dd9c198c165482b2b7d0a287bb.jpg",
          txt: "指挥中心上传的文件",
          dow:
            "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=9db129d85c3d269731d30e5d65fbb24f/64380cd7912397dd9c198c165482b2b7d0a287bb.jpg"
        }
      ],
      checkList: []
    };
  },
  methods: {
    toinf() {
      this.$router.push("/fac/caseindex/inf");
    }
  },
  mounted() {
    console.log(document.querySelector(".tj"));
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #00abfa;
}
.data_wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
}
.data_wrap ul {
  width: 100%;
}
.data_wrap ul li {
  height: 50px;
  line-height: 50px;
}
.data_wrap ul li:last-child textarea {
  width: 80%;
  height: 80px;
  border: 0;
  border: 1px solid #d9ddde;
  border-radius: 5px;
  font-size: 15px;
}
.data_wrap ul li:last-child span,
.data_wrap ul li:last-child textarea {
  float: left;
}
.req_box > p {
  margin-top: 15px;
  line-height: 45px;
  text-align: left;
}
.box_req ul li b {
  font-size: 14px;
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
  padding: 0 20px;
}
.acc_box > p {
  color: #333;
  line-height: 40px;
  font-size: 15px;
}
.acc_box ul li {
  display: inline-block;
  width: 20%;
  text-align: center;
}
.acc_box ul li p {
  text-align: center;
  line-height: 36px;
}
.acc_box ul li img {
  width: 90px;
  height: 120px;
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
.upbtn_box {
  text-align: center;
}
</style>