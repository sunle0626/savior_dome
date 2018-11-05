<template>
    <div class="manage_box">
        <h2>当前案件管理</h2>
        <div v-if="dataList.length<=0">
                <h3 class="no">暂无数据</h3>
        </div>
        <div v-else>
        <div v-for="(v,ind) in dataList" :key="ind">
        <div class="manage_case_box">
            <ul>
                <li >
                    <span>{{ind+1}}、</span>
                    <span>{{v.name}}</span>
                    <span>{{v.contact}}</span>
                    <span>{{v.typename}}</span>
                    <span>救援模式：{{v.contractTypeName}}</span>
                    <span class="op">当前操作方：保险公司</span>
                    <b @click="lookinf()">查看并处理</b>
                </li>
            </ul>
        </div>
        <div class="flow_box">
            <p>流程示意</p>
            <div class="step_box">
                <el-steps :active="2" align-center >
                    <el-step title="启动当地救援公司" ></el-step>
                    <el-step title="医疗费用担保" ></el-step>
                    <el-step title="收集医疗单据" ></el-step>
                    <el-step title="传递相关医疗单据到保险公司" ></el-step>
                </el-steps>
            </div>
            <div class="list_box">
                <el-table
                    :data="v.tableData"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="time"
                        label="时间"
                        width="140"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="oper"
                        label="操作方"
                        width="200"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="node"
                        label="操作节点"
                        width="240"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="detail"
                        label="操作细节"
                        width="260"
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
export default {
  props: ["insti", "token"],
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    lookinf() {},
    time(str) {
      var date = new Date(str); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D = date.getDate() + "日";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
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
    fetch("http://api.test.dajiuxing.com.cn/rescue/case/all_ongoing_case", {
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
          console.log(v.obj);

          objNew.contact = v.obj.obj.reporterContact;
          objNew.name = v.obj.victimList[0].obj.victimName;
          if (v.obj.obj.incidentType == 1) {
            objNew.typename = "门诊就医";
          }

          if (v.obj.contractType == 1) {
            objNew.contractTypeName = "大包";
          } else if (v.obj.contractType == 2) {
            objNew.contractTypeName = "小包";
          } else if (v.obj.contractType == 3) {
            objNew.contractTypeName = "纯服务";
          }
          //计算总耗时
          objNew.alltime = that.timeToStr(v.obj2[0].obj.updateAt);
          objNew.tableData = [];

          v.obj2.map(o => {
            objNew.tableData.push({
              oper: o.instiName + "账号" + o.passport, //操作方
              node: o.obj.opDesc, //操作节点
              detail: o.obj.opStateText, //操作细节
              nstate: "已完成", //当前状态
              time: that.time(o.obj.updateAt) //时间
            });
          });

          that.dataList.push(objNew);
        });
      });
  }
};
</script>

<style scoped>
.manage_box {
  margin-top: 25px;
  box-sizing: border-box;
  padding: 0 180px;
}
.manage_box h2 {
  font-size: 20px;
  font-weight: 500;
  text-align: start;
}
.manage_case_box {
  margin-top: 20px;
  border: 1px solid #00abfa;
}
.manage_case_box ul,
.manage_case_box ul li {
  width: 100%;
}
.manage_case_box ul li {
  height: 36px;
  line-height: 36px;
}
.manage_case_box ul li b {
  float: right;
  background: #00abfa;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  line-height: 36px;
  padding: 0 25px;
}
.manage_case_box ul li span {
  float: left;
}
.manage_case_box ul li span {
  margin-left: 80px;
}
.manage_case_box ul li span:first-child {
  margin-left: 15px;
}
.manage_case_box ul li span.op {
  color: #ff7200;
}
.flow_box {
  text-align: start;
  margin-top: 30px;
}
.flow_box p {
  font-size: 18px;
  font-weight: 500;
}
.step_box {
  margin-top: 10px;
  line-height: 24px;
  font-size: 15px;
  margin-bottom: 20px;
}
/* 步骤条、表格样式暂时无法修改，有空回来改 */
.time_box {
  height: 64px;
  font-size: 18px;
  line-height: 64px;
  color: #444;
  background: #fff;
  padding-left: 12px;
  border-bottom: 1px solid #eee;
}
.time_box span {
  color: #ff7200;
}
.no {
  line-height: 80px;
  color: #333;
}
</style>