<template>
    <div>
        <div class="top_box">
            <h2>等待授权中</h2>
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
                  <el-button type="primary" plain @click="filt()">查询</el-button>
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
                width="50">
            </el-table-column>
            <el-table-column
                prop="casenumber"
                label="案件编号"
                width="70">
            </el-table-column>
            <el-table-column
                prop="address"
                label="发生地点"
                width="70">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户姓名"
                width="60">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="用户手机号"
                width="70">
            </el-table-column>
            <el-table-column
                prop="papers"
                label="证件信息"
                width="90">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                width="50">
            </el-table-column>
            <el-table-column
                prop="time"
                label="出险时间"
                width="90">
            </el-table-column>
            <el-table-column
                prop="par"
                label="用户保险详情"
                width="90">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" v-show="scope.row.isshow"  @click="toUrl(scope.row.insuranceUrl)">保险详情</el-button>  
                    <el-button  type="text" size="small" v-show="!scope.row.isshow">无</el-button>                   
                </template>
            </el-table-column>
            <el-table-column
                prop="plan"
                label="当前进度"
                width="60">
            </el-table-column>
            <el-table-column
                prop="node"
                label="当前节点"
                width="60">
            </el-table-column>
            <el-table-column
                prop="get_time"
                label="回复时间"
                width="90">
            </el-table-column>
            <el-table-column
                prop="op"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="topar(scope.$index)">查看报价详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
import formVue from "../../common/form.vue";
import qs from "qs";
import { Message } from "element-ui";
export default {
  data() {
    return {
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
      if (stTime && enTime) {
        fetch("http://api.test.dajiuxing.com.cn/rescue/case/list_case", {
          method: "POST",
          body: `token=${
            this.token
          }&typeId=1&status=140&startTs=${stTime}&endTs=${enTime}`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
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
                    username: v.victimList[0].obj.name, //姓名
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
                  this.caseid = v.obj.id;
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
          body: `token=${this.token}&typeId=1&status=140`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            console.log("请求了await");
            return res.json();
          })
          .then(function(data) {
            if (data.obj) {
              data.obj.map(v => {
                if (v.solutionState && v.solutionState == "1") {
                  console.log(v.obj);
                  n = n + 1;
                  if (v.victimList[0].obj.gender == "1") {
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
                    username: v.victimList[0].obj.name, //姓名
                    phone: v.victimList[0].obj.contact, //联系方式
                    papers: v.victimList[0].obj.idNo, //身份证号
                    sex: sex, //性别
                    time: that.time(v.obj.incidentTs), //出险时间
                    par: "等待保险 公司授权", //状态
                    plan: "等待保险 公司授权",
                    node: "等待 授权",
                    get_time: that.time(v.obj.incidentTs),
                    op: "查看并操作",
                    insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                    isshow: isshow
                  });
                  that.caseid.push(v.obj.id);
                  that.obj.push(v.obj);
                  that.victimList.push(v.victimList[0]);
                }
              });
            }
          });
      }
    },
    topar(i) {
      //this.$router.push("lookinf");
      this.$router.push({
        name: "lookinf",
        params: {
          caseid: this.caseid[i],
          token: this.token
        }
      });
    },
    toUrl(url) {
      window.open(url);
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
    }
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
.top_box {
  width: 100%;
}
.top_box h2 {
  font-size: 22px;
  color: #333;
  font-weight: normal;
  text-align: left;
}
.top_box .time_box {
  font-size: 16px;
}
.time_box > div {
  float: left;
  color: #333;
  padding: 10px 0;
  margin-left: 50px;
}
.time_box > div:first-child {
  margin-left: 10px;
}
.time_box > div span {
  width: 220px;
  border: 1px solid #999;
  color: #999;
  display: inline-block;
  border-radius: 3px;
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
}
</style>