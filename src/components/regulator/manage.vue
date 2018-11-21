<template>
    <div class="manage_box">
        <h2>当前案件管理</h2>
        <div v-if="dataList.length<=0">
                <h3 class="no">暂无数据</h3>
        </div>
        <div v-else>
        <div v-for="(v,ind) in dataList" :key="ind"  class="manage_list_box">
        <div class="manage_case_box">
            <ul>
                <li >
                  <span style="padding:0">{{ind+1}}、</span>
                    <span style="padding:0">{{v.name}}</span>
                    <span>{{v.contact}}</span>
                    <span>{{v.typename}}</span>
                    <span>救援模式：{{v.contractTypeName}}</span>
                    <span class="op">当前操作方：{{v.op}}</span>
                    <b class="pointer_box" @click="lookinf(v.typeId,v.caseState,v.solutionState)">查看并处理</b>
                </li>
            </ul>
        </div>
        <div class="flow_box">
            <p>流程示意</p>
            <div class="step_box">
                <el-steps :active="v.serviceIndex" align-center >
                    <el-step v-for="(k,index) in v.serviceLst" :key="index" :title="k.name" ></el-step>
                </el-steps>
                <!-- <template >
                <el-steps :space="200" :active="v.serviceIndex"  finish-status="success" >
                    <el-step  :title="k.name"></el-step>
                    
                </el-steps>
                </template> -->
            </div>
            <div class="list_box">
                <el-table
                    :data="v.tableData"
                    style="width: 100%"
                    border
                    >
                    <el-table-column
                        prop="time"
                        label="时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="oper"
                        label="操作方"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="node"
                        label="操作节点"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="detail"
                        label="操作细节"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="nstate"
                        label="当前状态"
                        align="center">
                    </el-table-column>
                </el-table>
                <div class="time_box">
                    已耗时：
                    <span>{{v.alltime}}</span>
                </div>
            </div>
        </div>
        </div>

        </div>
    </div>
</template>

<script>
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  props: ["insti", "token"],
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    lookinf(tid,caseState,solutionState) {
      console.log("reg manager tid:"+tid+" caseState:"+caseState+" solutionState:"+solutionState);
      var routerName = "RegAwait";
      if(caseState == 130 || caseState == 140 || caseState == 150){
        routerName = "RegOffer";
      }
      if(caseState == 180){
        routerName = "RegRescue";
      }

      this.$router.push({
        name: routerName,
        params: {
          token: this.token
        },
        query: {
          typeId: tid
        }
      });

    },
    timeToStr(time) {
      var timeNow = new Date().getTime();
      var date3 = timeNow - time;
      //计算出相差天数
      var days = Math.floor(date3 / (24 * 3600 * 1000));
      //计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000));
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000));
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000);
      return days + "天 " + hours + "小时 " + minutes + " 分钟";
    }
  },
  mounted() {
    let that = this;
    let nodeName = "";
    //console.log(this.token);
    fetch(constants.domain+"rescue/case/regulationGoingCase", {
      method: "POST",
      body: `token=${this.token}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        //console.log(res);
        return res.json();
      })
      .then(function(data) {
        //console.log(data.obj.length);

        data.obj.map(v => {
          var objNew = {};

          objNew.contact = v.obj.obj.reporterContact;
          objNew.name = v.obj.victimList[0].obj.victimName;
          objNew.typename = v.obj.incidentTypeStr;
          objNew.caseState = v.obj.obj.caseState;
          objNew.solutionState = v.obj.solutionState;
          objNew.typeId = v.obj.obj.incidentType;
          console.log("reg manage objNew caseState:"+v.obj.obj.caseState)
          objNew.op = constants.state2op(v.obj.obj.caseState);
          if (v.obj.contractType == 1) {
            objNew.contractTypeName = "大包";
          } else if (v.obj.contractType == 2) {
            objNew.contractTypeName = "小包";
          } else if (v.obj.contractType == 3) {
            objNew.contractTypeName = "纯服务";
          }
          //计算总耗时
          objNew.alltime = that.timeToStr(v.obj2.operation[0].obj.updateAt);
          objNew.tableData = [];
          v.obj2.operation.map(o => {
            objNew.tableData.push({
              oper: o.instiName + "账号" + o.passport, //操作方
              node: o.obj.opDesc, //操作节点
              detail: o.obj.opStateText, //操作细节
              nstate: "已完成", //当前状态
              time: constants.time(o.obj.updateAt) //时间
            });
          });
          objNew.serviceLst = [];
          objNew.serviceIndex = 0;
          v.obj2.serviceLst.map(o => {
            objNew.serviceLst.push({
              name: o.dict.name, //结点名称
              state: o.obj.state
            });
            if(o.obj.state && o.obj.state == 1){
              objNew.serviceIndex+=1;
            }
          });
          that.dataList.push(objNew);
        });
      });
  }
};
</script>

<style scoped>
@import url(../../css/manage.css);
</style>