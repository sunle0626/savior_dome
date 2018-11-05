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
                label="到达时间"
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
    topar(index) {
      let that = this;
      console.log(that.obj);
      this.$router.push({
        name: "RegPar",
        params: {
          token: that.token,
          obj: that.obj,
          victimList: that.victimList,
          index
        },
        query: {
          typeId:this.typeId
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
            JSON.parse(window.localStorage.getItem("token"))
              .obj}&typeId=${this.typeId}&status=120&startTs=${stTime}&endTs=${enTime}`,
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
                    address: v.generalLocation?v.generalLocation.addr:'', //地址
                    username: v.victimList[0].obj.victimName, //姓名
                    phone: v.obj.reporterContact, //联系方式
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
              });
            }
          });
      } else {
        fetch("http://api.test.dajiuxing.com.cn/rescue/case/list_case", {
          method: "POST",
          body: `token=${this.token ||
            JSON.parse(window.localStorage.getItem("token"))
              .obj}&typeId=${this.typeId}&status=120`,
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
                    address: v.generalLocation?v.generalLocation.addr:'', //地址
                    username: v.victimList[0].obj.victimName, //姓名
                    phone: v.obj.reporterContact, //联系方式
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
    },
    st_time(nv, ov) {
      console.log(nv, ov);
      // this.getData(nv, 0);
    },
    sereen(nv, ov) {
      console.log(nv)
      if (nv) {
        this.getData(this.st_time, this.en_time + 86400000);
      }
    }
  },
  mounted() {  
    // if (this.flag) {
    this.getData();
    // } else {
    // }
  }
};
</script>

<style scoped>
</style>