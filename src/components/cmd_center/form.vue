<template>
    <div class="form_box">
        <el-table
        :data="tableData"
        border>
            <el-table-column
                prop="number"
                label="序号"
                min-width="50%">
            </el-table-column>
            <el-table-column
                prop="casenumber"
                label="案件编号"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="address"
                label="发生地点"
                min-width="100%">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户姓名"
                min-width="50%">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="用户手机号"
                min-width="70%">
            </el-table-column>
            <el-table-column
                prop="papers"
                label="证件信息"
                min-width="70%">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                min-width="40%">
            </el-table-column>
            <el-table-column
                prop="time"
                label="出险时间"
                min-width="90%">
            </el-table-column>
            <el-table-column
                prop="par"
                label="用户保险详情"
                min-width="70%">
                <template slot-scope="scope">
                   <el-button  type="text" size="small" v-show="scope.row.isshow"  @click="toUrl(scope.row.insuranceUrl)">保险详情</el-button>  
                    <el-button  type="text" size="small" v-show="!scope.row.isshow">无</el-button> 
                </template>
            </el-table-column>
            <el-table-column
                prop="plan"
                label="当前进度"
                min-width="80%">
            </el-table-column>
            <el-table-column
                prop="el"
                label="其他"
                min-width="90%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="close(scope.$index)">关闭当前案件</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="op"
                label="操作"
                min-width="90%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="tostatr(scope.$index)">启动救援</el-button>
                    <el-button  type="text" size="small" @click="topar(scope.$index)">案件详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import qs from "qs";
import strutils from "../util/strutils.js";
import { Message } from "element-ui";
import err from "../util/error2msg.js";
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  props: ["token", "st_time", "en_time", "sereen","typeId"],
  data() {
    return {
      tableData: [],
      obj: [],
      victimList: []
    };
  },
  methods: {
    error2msg(errcode){
      var errmsg = err;
      var msg = errmsg.tomsg(errcode);
      Message.error(msg);
    },
    tostatr(index) {
      this.$router.push({
        name: "helpStart",
        params: {
          token: this.token
        },
        query: {
          typeId:this.typeId,
          caseid: this.obj[index].id
        }
      });
    },
    topar(index) {
      let that = this;
      this.$router.push({
        path: "par",
        name: "ComPar",
        params: {
          token: that.token,
          obj: that.obj,
          victimList: that.victimList,
          index
        },
        query: {
          typeId:this.typeId,
          caseid: this.obj[index].id
        }
      });
    },
    close(index) {
      let that = this;
      this.axios
        .post(
          constants.domain+"rescue/case/close",
          qs.stringify({
            token: that.token,
            caseId: that.obj[index].id
          })
        )
        .then(res => {
          if (res.data.code === 0) {
            Message({
                message: "关闭案件成功",
                type: "success"
              });
          }else{
            that.error2msg(res.data.code);
          }
        });
        this.$router.go(0)
    },
    
    toUrl(url) {
      window.open(url);
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
      fetch(constants.domain+"rescue/case/list_case", {
          method: "POST",
          body: `token=${this.token ||
            JSON.parse(window.localStorage.getItem("data"))
              .data}&typeId=${this.typeId}&status=100`+tl,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            if (data.code == 0) {
              data.obj.map(v => {
                
                  n = n + 1;
                  if (v.victimList[0].obj.gender == 1) {
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
                  var pt=constants.pt2txt2(v.obj.caseState);
                  that.tableData.push({
                    number: n, //序号
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.generalLocation?v.generalLocation.addr:'', //地址
                    username: v.victimList[0].obj.victimName, //姓名
                    phone: v.obj.reporterContact, //联系方式
                    papers: v.victimList[0].obj.idNo||"无", //身份证号
                    sex: sex, //性别
                    time: constants.time(v.obj.incidentTs), //出险时间
                    isshow: isshow, //保单
                    insuranceUrl:v.insuranceUrl,
                    plan: pt.phase, //进度
                    get_time: constants.time(v.obj.incidentTs),
                    op: "查看并操作"
                  });
                  that.obj.push(v.obj);
                  that.victimList.push(v.victimList[0]);
                
              });
            }else{
              that.error2msg(data.code);
            }
          });
    }
  },
  watch: {
    en_time(nv, ov) {
      if (this.en_time + 86400000 < this.st_time && this.en_time != "") {
        Message.error("结束时间不能早于起始时间");
      }
      //  this.getData(this.st_time, this.en_time + 86400000);
    },
    st_time(nv, ov) {
      console.log(nv, ov);
      if (this.en_time + 86400000 < this.st_time && this.en_time != "") {
        Message.error("结束时间不能早于起始时间");
      }
      // this.getData(nv, 0);
      //  this.getData(this.st_time, this.en_time + 86400000);
    },
    sereen(nv, ov) {
      if (nv) {
        this.getData(this.st_time, this.en_time + 86400000);
      }
    }
  },
  mounted() {
    if (this.st_time == "" && this.en_time == "") {
      this.getData();
    }
  }
};
</script>

<style scoped>
.el-button+.el-button{
  margin: 0;
}
</style>