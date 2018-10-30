<template>
    <div class="form_box">
        <el-table
        :data="tableData"
        border>
            <el-table-column
                prop="number"
                label="序号"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="casenumber"
                label="案件编号"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="address"
                label="发生地点"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户姓名"
                width="50%">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="用户手机号"
                width="70%">
            </el-table-column>
            <el-table-column
                prop="papers"
                label="证件信息"
                width="70%">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                width="40%">
            </el-table-column>
            <el-table-column
                prop="time"
                label="出险时间"
                width="90%">
            </el-table-column>
            <el-table-column
                prop="par"
                label="用户保险详情"
                width="70%">
                <template slot-scope="scope">
                   <el-button  type="text" size="small" v-show="scope.row.isshow"  @click="toUrl(scope.row.insuranceUrl)">保险详情</el-button>  
                    <el-button  type="text" size="small" v-show="!scope.row.isshow">无</el-button> 
                </template>
            </el-table-column>
            <el-table-column
                prop="plan"
                label="当前进度"
                width="80%">
            </el-table-column>
            <el-table-column
                prop="node"
                label="当前节点"
                width="60%">
            </el-table-column>
            <el-table-column
                prop="get_time"
                label="到达时间"
                width="90%">
            </el-table-column>
            <el-table-column
                prop="el"
                label="其他"
                width="90%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="close(scope.$index)">关闭当前案件</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="op"
                label="操作"
                width="90%">
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
import { Message } from "element-ui";
export default {
  props: ["token", "st_time", "en_time", "sereen"],
  data() {
    return {
      typeid:
        this.$route.params.typeId ||
        JSON.parse(window.localStorage.getItem("typeid")).id,
      tableData: [],
      obj: [],
      victimList: []
    };
  },
  methods: {
    tostatr(index) {
      this.$router.push({
        name: "helpStart",
        params: {
          token: this.token,
          caseid: this.obj[index].id
        }
      });
    },
    topar(index) {
      let that = this;
      console.log(that.obj);
      this.$router.push({
        path: "par",
        name: "ComPar",
        params: {
          token: that.token,
          obj: that.obj,
          victimList: that.victimList,
          index
        }
      });
    },
    close(index) {
      let that = this;
      console.log(that.obj);
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/case/close",
          qs.stringify({
            token: that.token,
            caseId: that.obj[index].id
          })
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code === 0) {
            //getData(that.st_time,that.en_time);
          }
        });
    },
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
      if (stTime && enTime) {
        fetch("http://api.test.dajiuxing.com.cn/rescue/case/list_case", {
          method: "POST",
          body: `token=${this.token ||
            JSON.parse(window.localStorage.getItem("tokon"))
              .obj}&typeId=${this.typeid}&status=100&startTs=${stTime}&endTs=${enTime}`,
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
                if (!v.solutionState) {
                  n = n + 1;
                  if (v.victimList[0].gender == 1) {
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
                  console.log(v.victimList)
                  that.tableData.push({
                    number: n, //序号
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.obj.locId, //地址
                    username: v.victimList[0].obj.victimName, //姓名
                    phone: v.victimList[0].obj.contact, //联系方式
                    papers: v.victimList[0].obj.idNo, //身份证号
                    sex: sex, //性别
                    time: that.time(v.obj.incidentTs), //出险时间
                    par: "等待启动救援", //状态
                    plan: "等待启动救援",
                    node: "等待报价",
                    get_time: that.time(v.obj.incidentTs),
                    op: "查看并操作"
                  });
                  console.log(v.obj);
                  that.obj.push(v.obj);
                  that.victimList.push(v.victimList[0]);
                }
              });
            }
          });
      } else {
        fetch("http://api.test.dajiuxing.com.cn/rescue/case/list_case", {
          method: "POST",
          body: `token=${this.token ||
            JSON.parse(window.localStorage.getItem("tokon"))
              .obj}&typeId=1&status=100`,
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
                if (!v.solutionState) {
                  n = n + 1;
                  if (v.victimList[0].gender == 1) {
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
                  that.tableData.push({
                    number: n, //序号
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.obj.locId, //地址
                    username: v.victimList[0].obj.victimName, //姓名
                    phone: v.victimList[0].obj.contact, //联系方式
                    papers: v.victimList[0].obj.idNo, //身份证号
                    sex: sex, //性别
                    time: that.time(v.obj.incidentTs), //出险时间
                    par: "等待救援公司报价中", //状态
                    plan: "等待救援公司报价中",
                    node: "等待报价",
                    get_time: that.time(v.obj.incidentTs),
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