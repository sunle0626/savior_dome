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
                min-width="80%">
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
                min-width="80%">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                min-width="50%">
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
                prop="node"
                label="当前节点"
                min-width="60%">
            </el-table-column>
            <el-table-column
                prop="get_time"
                label="启动救援时间"
                min-width="90%">
            </el-table-column>
            <el-table-column
                prop="op"
                label="操作"
                min-width="110%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="topar(scope.$index)">查看并操作</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { Message } from "element-ui";
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
      victimList: [],
    };
  },
  methods: {
    topar(index) {
      let that = this;
      console.log(that.obj);
      this.$router.push({
        name: "Par",
        params: {
          token: that.token,
        },
        query: {
          typeId:that.typeId,
          caseid:that.tableData[index].caseid,
        }
      });
    },
    
    toUrl(url) {
      //window.open(url);
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
              .data}&typeId=${this.typeId}&status=140&submit=0`+tl,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            console.log("请求了await");
            return res.json();
          })
          .then(function(data) {
            console.log(data);
            if (data.obj) {
              data.obj.map(v => {
                if(v==null)
                  return;
                if (!v.solutionState) {
                  n = n + 1;
                  if (v.victimList[0].obj.gender == 1) {
                    sex = "男";
                  } else {
                    sex = "女";
                  }
                  if (
                    v.victimList[0].obj.insurancePaper &&
                    v.victimList[0].obj.insurancePaper != ""
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
                    caseid:v.obj.id,
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.generalLocation?v.generalLocation.addr:'', //地址
                    username: constants.strHidden(v.victimList[0].obj.victimName,1), //姓名
                    phone: constants.strHidden(v.obj.reporterContact), //联系方式
                    papers: constants.strHidden(v.victimList[0].obj.idNo)||"无", //身份证号
                    sex: sex, //性别
                    time: constants.time(v.obj.incidentTs), //出险时间
                    isshow: isshow, //保单
                    insuranceUrl:v.insuranceUrl,
                    plan: pt.phase, //进度
                    node: pt.node, //节点
                    get_time: constants.time(v.rescueInitTs),
                    op: "查看并操作"
                  });
                  console.log(v.obj);
                  that.obj.push(v.obj);
                  that.victimList.push(v.victimList[0]);
                }
              });
            }
          });
    }
  },
  watch: {
    en_time(nv, ov) {
      console.log(nv, ov);
      // this.getData(0, nv + 86400000);
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
      console.log(nv);
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
</style>