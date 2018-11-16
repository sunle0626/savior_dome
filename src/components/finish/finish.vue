<template>
    <div>
        <div class="top_box">
            <h2>已完成案件管理</h2>
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
            <el-table-column
                prop="op"
                label="操作"
                min-width="100">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="tores(scope.row.caseid)">救援详情</el-button>
                </template>
            </el-table-column>
        </el-table>
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
  data() {
    return {
      tableData: [],
      token: this.$route.params.token||
        JSON.parse(window.localStorage.getItem("data")).data,
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          }
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          }
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          }
        }
      ],
      st_time: "",
      en_time: "",
      usertype: JSON.parse(window.localStorage.getItem("usertype")).data,
      parArray:["FinishPar","ComFinishPar","RegFinishPar"],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    tores(obj) {
      this.$router.push({
        name: this.parArray[this.usertype],
        params: {
          token: this.token
        },
        query:{
          caseid: obj
        }
      });
    },
    sttime() {
      this.st_time = this.st_time * 1;
      // this.getData(this.st_time, 0);
      // console.log(this.st_time);
    },
    entime() {
      this.en_time = this.en_time * 1;
      // this.getData(0, this.en_time);
    },
    filt() {
      this.getData(this.st_time, this.en_time + 86400000);
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

      fetch(constants.domain+"rescue/case/list_closed_case", {
          method: "POST",
          body: `token=${this.token}&status=110&status=111&status=113`+tl,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            if (data.obj) {
              var plan = "";
              data.obj.map(v => {
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
                var phone = v.victimList[0].obj.victimName;
                var username = v.victimList[0].obj.victimName;
                if(that.usertype == 0){
                  username = constants.strHidden(v.victimList[0].obj.victimName,1); //姓名
                  phone = constants.strHidden(v.obj.reporterContact); //联系方式
                }

                that.tableData.push({
                  caseid: v.obj.id,
                  number: n, //序号
                  casenumber: v.obj.caseNo, //案件编号
                  address: v.generalLocation?v.generalLocation.addr:'', //地址
                  username: username, //姓名
                  phone: phone, //联系方式
                  papers: v.victimList[0].obj.idNo||"无", //身份证号
                  sex: sex, //性别
                  time: constants.time(v.obj.incidentTs), //出险时间
                  isshow: isshow, //保单
                  plan: pt.phase, //进度
                  node: pt.node, //节点
                  get_time: constants.time(v.rInstiFeedbackTs),
                  op: "查看并操作",
                  insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                });
                that.caseid = v.obj.id;
                // console.log(that.obj)
                // that.obj.push(v.obj);
                // that.victimList.push(v.victimList[0]);
              });
            }
          });
    },

  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
@import url("../../css/table.css");
</style>