<template>
    <div>
        <div class="top_box">
            <h2>报价已关闭</h2>
            <div class="time_box">
                <div class="block st_box">
                    起始时间
                    <el-date-picker
                    @change="sttime()"
                    v-model="st_time"
                    align="right"
                    type="date"
                    placeholder="起始时间"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
                <div class="block en_box">
                    结束时间
                    <el-date-picker
                    @change="entime()"
                    v-model="en_time"
                    align="right"
                    type="date"
                    placeholder="结束时间"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
                <div class="block">
                  <el-button type="primary" @click="filt()">查询</el-button>
                </div>
            </div>
        </div>
        <div class="form_box">
        <el-table
        :data="tableData"
        border>
            <el-table-column
                prop="number"
                label="序号"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="casenumber"
                label="案件编号"
                min-width="70">
            </el-table-column>
            <el-table-column
                prop="address"
                label="发生地点"
                min-width="140">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户姓名"
                min-width="60">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="用户手机号"
                min-width="70">
            </el-table-column>
            <el-table-column
                prop="papers"
                label="证件信息"
                min-width="90">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="time"
                label="出险时间"
                min-width="90">
            </el-table-column>
            <el-table-column
                prop="par"
                label="用户保险详情"
                min-width="90">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" v-show="scope.row.isshow"  @click="toUrl(scope.row.insuranceUrl)">保险详情</el-button>  
                    <el-button  type="text" size="small" v-show="!scope.row.isshow">无</el-button>                   
                </template>
            </el-table-column>
            <el-table-column
                prop="plan"
                label="当前进度"
                min-width="60">
            </el-table-column>
            <el-table-column
                prop="node"
                label="当前节点"
                min-width="60">
            </el-table-column>
            <el-table-column
                prop="get_time"
                label="回复时间"
                min-width="90">
            </el-table-column>
            <!-- <el-table-column
                prop="op"
                label="操作"
                min-width="100">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="topar(scope.$index)">查看详情</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        </div>
    </div>
</template>

<script>
import formVue from "./form.vue";
import qs from "qs";
import { Message } from "element-ui";
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';
import strutils from "../util/strutils.js";

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  data() {
    return {
      typeId: this.$route.query.typeId,
      tableData: [],
      obj: [],
      victimList: [],
      caseid: [],
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      st_time: "",
      en_time: "",
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    filt() {
      this.getData(this.st_time, this.en_time + 86400000);
    },
    sttime() {
      this.st_time = this.st_time * 1;
      if (this.en_time + 86400000 < this.st_time && this.en_time != "") {
        Message.error("结束时间不能早于起始时间");
      }
      // this.getData(this.st_time, 0);
      // console.log(this.st_time);
    },
    entime() {
      this.en_time = this.en_time * 1;
      if (this.en_time + 86400000 < this.st_time && this.en_time != "") {
        Message.error("结束时间不能早于起始时间");
      }
      // this.getData(0, this.en_time);
    },
    getData(st, et) {
      this.tableData = [];
      let that = this;
      let n = 0;
      let sex = "";
      let isshow = false;
      let stTime = st || this.st_time;
      let enTime = et || this.en_time;
      let tl='';
      if (stTime && enTime) {
        tl=tl+`&startTs=${stTime}&endTs=${enTime}`;
      } 
      fetch(constants.domain+"rescue/case/list_reject_case", {
          method: "POST",
          body: `token=${this.token}&typeId=${this.typeId}&submit=1`+tl,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            console.log("colse 请求了listrejectcase");
            return res.json();
          })
          .then(function(data) {
            if (data.obj) {
              data.obj.map(v => {
                if(v==null)
                  return;
                console.log(v.obj);
                n = n + 1;
                if (v.victimList[0].obj.gender == "1") {
                  sex = "男";
                } else {
                  sex = "女";
                }
                if (
                  v.victimList[0].obj.insurancePolicyNo &&
                  v.victimList[0].obj.insurancePolicyNo != ""
                ) {
                  isshow = true;
                } else {
                  isshow = false;
                }
                var pt=constants.pt2txt(v.obj.caseState);
                if(v.solutionState == 3){
                    pt.phase = "指挥中心关闭报价";
                    pt.node = "报价已关闭";
                  }
                that.tableData.push({
                  number: n, //序号
                  casenumber: v.obj.caseNo, //案件编号
                  address: v.generalLocation ? v.generalLocation.addr : "", //地址
                  username: constants.strHidden(v.victimList[0].obj.victimName,1), //姓名
                  phone: constants.strHidden(v.obj.reporterContact), //联系方式
                  papers: v.victimList[0].obj.idNo, //身份证号
                  sex: sex, //性别
                  time: constants.time(v.obj.incidentTs), //出险时间
                  isshow: isshow, //保单
                  insuranceUrl:v.insuranceUrl,
                  plan: pt.phase, //进度
                  node: pt.node, //节点
                  get_time: constants.time(v.rInstiFeedbackTs),
                  op: "查看并操作",
                  insuranceUrl:v.insuranceUrl, //用户保险详情链接
                });
                that.caseid.push(v.obj.id);
                that.obj.push(v.obj);
                that.victimList.push(v.victimList[0]);
              });
            }
          });
    },
    topar(i) {
      //this.$router.push("lookinf");
      this.$router.push({
        name: "lookinf",
        params: {
          token: this.token
        },
        query: {
          typeId: this.typeId,
          caseid: this.caseid[i]
        }
      });
    },
    toUrl(url) {
      window.open(url);
    },
    
  },
  mounted() {
    window.localStorage.setItem(
      "case",
      JSON.stringify({
        case: "Offer"
      })
    );
    this.getData();
  }
};
</script>

<style scoped>
@import url("../../css/table.css");
</style>