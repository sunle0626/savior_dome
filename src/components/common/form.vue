<template>
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
                label="到达时间"
                width="90">
            </el-table-column>
            <el-table-column
                prop="op"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="topar(scope.$index)">查看并操作</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  props: ["token",'st_time','en_time'],
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
        path: "par",
        name: "Par",
        params: {
          token: that.token,
          obj: that.obj,
          victimList: that.victimList,
          index
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
    }
  },
  mounted() {
    let that = this;
    let n = 0;
    let sex = "";
    let isshow = false;
    console.log(this.st_time)
    fetch("http://api.test.dajiuxing.com.cn/rescue/case/list_case", {
      method: "POST",
      body: `token=${this.token ||
        JSON.parse(window.localStorage.getItem("tokon"))
          .obj}&typeId=1&status=140`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        console.log('请求了await');
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
                par: "等待保险 公司授权", //状态
                plan: "等待保险 公司授权",
                node: "等待 授权",
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
};
</script>

<style scoped>
</style>