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
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  data() {
    let that = this;
    return {
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseid: this.$route.query.caseid,
      obj: {},
      objdata: {
        add: "出险地:",
        type: "事故类型：风险灾害 ",
        part: "受伤部位：腿部 ",
        weather: "天气灾害：气象灾害 "
      },
      acc_list: [],
      checkList: [],
      def: "",
      bid: [],
      inf: null
    };
  },
  methods: {

  },
  mounted() {
    let that = this;

  fetch(constants.domain+"rescue/case/detail_case", {
      method: "POST",
      body: `token=${this.token}&caseId=${this.caseid}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
          let addr = "";
          if (data.obj.generalLocation) {
            addr = data.obj.generalLocation.addr || "";
          }
          that.objdata = {
            add:
              "出险地:" +
              (data.obj.caseCountry || "") +
              (data.obj.caseCity || "") +
              addr,
            type: "事故类型：" + (data.obj.obj.accidentType||""),
            part: "受伤部位：" + (data.obj.victimList[0].obj.injuredPart||""),
            weather: "天气灾害：" + (data.obj.obj.weatherTag || "无")
          };
          that.def = data.obj.obj.incidentDesc;
      })
    fetch(constants.domain+"rescue/bidding/bidders", {
      method: "POST",
      body: `token=${this.token}&caseId=${this.caseid}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.bid = data.obj;
      });
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
  padding: 0 40px;
}
.data_wrap ul {
  width: 100%;
  height: 250px;
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
  margin-top: 15px;
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
  height: 36px;
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
}
</style>