<template>
    <div class="pardata_box">
        <div class="data_wrap">
            <ul>
                <li v-for="(v,ind) in objdata" :key="ind">
                    {{v||''}}
                </li>
                <li>
                    <span>事故经过：</span>
                    <textarea name="pass" id="passnode" cols="30" rows="10" v-model="def" disabled="disabled">
                    </textarea>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import { Message } from "element-ui";
export default {
  data() {
    let that = this;
    return {
      upacc: false,
      exp: "同意附件是授权文件",
      objId: null,
      token: this.$route.params.token,
      init: this.$route.params.init,
      caseId: this.$route.params.caseId,
      obj: this.$route.params.obj,
      txts: "",
      objdata: {
        add: "出险地:",
        type: "事故类型：风险灾害 ",
        part: "受伤部位：腿部 ",
        weather: "天气灾害：气象灾害 "
      },
      acc_list: [
        {
          url: "../../../../static/images/eles_icon.png",
          txt: "指挥中心上传的附件"
        }
      ],
      up_acc: [
        {
          url: "",
          txt: "",
          flag: true
        }
      ],
      checkList: [],
      def: "",
      bid: [],
      inf: null,
      url: ""
    };
  },
  methods: {},
  mounted() {

    console.log(this.init);
    let that = this;
    let addr = "";
    if (that.init.generalLocation) {
      addr = that.init.generalLocation.addr;
    }
    this.objdata = {
      add:
        "出险地:" +
        (that.init.caseCountry || "") +
        (that.init.caseCity || "") +
        addr,
      type: "事故类型：" + (that.init.obj.accidentType || ""),
      part: "受伤部位：" + (that.init.victimList[0].obj.injuredPart || ""),
      weather: "天气灾害：" + (that.init.obj.weatherTag || "无")
    };
    this.def = that.init.obj.incidentDesc;
    // fetch("http://api.test.dajiuxing.com.cn/rescue/bidding/bidders", {
    //   method: "POST",
    //   body: `token=${this.token}&caseId=${this.caseId}`,
    //   mode: "cors",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
    // })
    //   .then(function(res) {
    //     return res.json();
    //   })
    //   .then(function(data) {
    //     that.bid = data.obj;
    //   });
    // fetch(
    //   "http://api.test.dajiuxing.com.cn/rescue/bidding/view_case_solution",
    //   {
    //     method: "POST",
    //     body: `token=${this.token}&caseId=${this.caseId}`,
    //     mode: "cors",
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" }
    //   }
    // )
    //   .then(function(res) {
    //     return res.json();
    //   })
    //   .then(function(data) {
    //     that.inf = data.obj;
    //     that.objId = data.obj.id;
    //     if (that.obj.length <= 0) {
    //       that.obj = data.obj2;
    //     }
    //     console.log(data);
    //     // that.upload();
    //   });
  }
};
</script>

<style scoped>
.img_dialog p {
  width: 100%;
  line-height: 48px;
}
.img_dialog p .el-input {
  width: 80%;
  margin-left: 3%;
}
.img_dialog p span {
  color: #333;
}
.img_dialog p input[type="file"] {
  margin-left: 3%;
}
.p {
  text-align: center;
}
a {
  text-decoration: none;
  color: #00abfa;
}
.up_span {
  color: #00abfa;
  cursor: pointer;
}
.data_wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 40px;
}
.data_wrap ul {
  width: 100%;
}
.data_wrap ul li {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.data_wrap ul li:last-child textarea {
  width: 80%;
  height: 80px;
  border: 0;
  border: 1px solid #d9ddde;
  border-radius: 5px;
  font-size: 15px;
  margin-top: 15px
}
.data_wrap ul li:last-child span,
.data_wrap ul li:last-child textarea {
  float: left;
}
.com_exp textarea {
  margin-left: 5%;
  width: 90%;
  height: 80px;
  border: 0;
  border: 1px solid #d9ddde;
  border-radius: 5px;
  font-size: 15px;
}
.req_box > p {
  margin-top: 15px;
  line-height: 45px;
  text-align: left;
}
.res_box_exp {
  margin-left: 32px;
  font-size: 14px;
  color: #999;
}
.req_box > p > b {
  font-size: 14px;
}
.exp_box {
  box-sizing: border-box;
  padding: 10px 32px;
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
  font-size: 14px;
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
  margin-top: 18px;
}
.up_acc ul {
  display: flex;
  /* justify-content: space-around; */
  flex-wrap: wrap;
}
.up_acc ul li {
  text-align: center;
  width: 22%;
  font-size: 14px;
}
.up_acc ul li p {
  line-height: 16px;
  font-size: 14px;
  box-sizing: border-box;
  padding: 0 10px;
}
.up_acc ul li img {
  display: inline-block;
  width: 90px;
  height: 120px;
  border: 1px solid #eee;
}
</style>