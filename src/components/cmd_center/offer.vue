<template>
    <div>
        <div class="top_box">
            <h2>已启动救援案件管理</h2>
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
          <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div v-for="(v,i) in tableData[props.$index].list" :key="i" v-if="props.row.state==120 || props.row.state==130 || props.row.state==140 || v.bidding.state==2">
                <span>{{v.insti.name}}</span>
                <span v-if="typeof v.solution !=='undefined'">
                  整体报价${{v.solution.totalFee||0}}
                   救援费用:${{v.solution.rescueFee||0}}
                  医疗费用:${{v.solution.medicFee||0}}
                  案件服务费用:${{v.solution.caseFee||0}}
                </span>
                <!-- <span v-else>
                  <img src="../../../static/images/loading.gif" alt="">
                  <span class="span_box">
                    …
                  </span>
                </span> -->

                <span v-if="props.row.state==140&& v.bidding.state ==0">
                  等待报价
                </span>
                <span v-if="props.row.state==140&& v.bidding.state ==1">
                  已报价
                </span>
                <!--span v-if="props.row.state==140&& v.bidding.state ==2">
                  已通过
                </span -->
                <span v-if="v.bidding.state ==3">
                  已关闭
                </span>
                <span v-if="props.row.state==150 && v.bidding.state==2">
                  (费用等待审核)
                </span>
                <span v-if="props.row.state==160 && v.bidding.state==2">
                  (费用审核通过)
                </span>
                <!-- <span v-if="props.row.state==160">
                  开始救援
                </span> -->
                <span class="span_box" @click="pass(props.row.caseid,v)" v-if="props.row.state==160 && v.bidding.state ==2">授权该救援机构开始救援</span>
                <!-- <span class="span_box" @click="adopt(v.bidding.solutionNo,props.row)" v-if="props.row.state==140 && v.bidding.state==1">
                  同意该公司报价转交保险授权</span> -->
                <span class="span_box" @click="toplook(props.row.caseid,v.bidding.id)" v-if="typeof v.solution !='undefined'">报价详情</span>
                <span class="span_box" @click="reject(v.bidding.solutionNo,props.row)" v-if="props.row.state==140&&(v.bidding.state==1 || v.bidding.state ==0)">
                  关闭报价</span>
                <span class="span_box" @click="exp(props.row.stateText3);expVisible=true" v-if="props.row.state==160 && v.bidding.state ==2">授权说明</span>
              </div>
            </el-form>
          </template>
        </el-table-column>
            <el-table-column
                prop="number"
                label="序号"
                min-width="50"
                type="index"
                :index='1'>
            </el-table-column>
            <el-table-column
                prop="casenumber"
                label="案件编号"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="address"
                label="案件地点"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户信息"
                min-width="90">
            </el-table-column>
            <el-table-column
                prop="papers"
                label="证件信息"
                min-width="90">
            </el-table-column>
            <el-table-column
                prop="open"
                label="案件来源"
                min-width="50">
            </el-table-column>
            <el-table-column
                prop="plan"
                label="案件状态"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="par"
                label="用户是否投保"
                min-width="90">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" v-show="scope.row.isshow"  @click="toUrl(scope.row.insuranceUrl)">保险详情</el-button>  
                    <el-button  type="text" size="small" v-show="!scope.row.isshow">无</el-button>                   
                </template>
            </el-table-column>
            <el-table-column
                prop="get_time"
                label="启动救援时间"
                min-width="110">
            </el-table-column>
            <el-table-column
                prop="op"
                label="操作"
                min-width="160">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="topinf(scope.row.caseid)">案件详情</el-button>
                    <el-button  v-if="scope.row.state==130" type="text" size="small" @click="topar(scope.row.caseid,scope.$index)">转交救援公司获取报价</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <el-dialog
          title="授权说明"
          :visible.sync="expVisible"
          class="exp_dialog"
          width="50%"
          center
          >
          <p style="text-align:center">{{exptxt}}</p>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import funVue from "./fun.vue";
import { Message } from "element-ui";
import err from "../util/error2msg.js";
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  data() {
    return {
      typeId:this.$route.query.typeId,
      tableData: [
        {
          number: 0,
          casenumber: 1,
          address: "法国巴黎",
          username: "黄老板+86 13089776848",
          papers: "身份证230123199310022736",
          open: "电话报案",
          plan: "等待客户授权",
          get_time: "2016-09-21  08:50:08",
          caseid: 7,
          isshow: true
        },
        {
          number: 0,
          casenumber: 1,
          address: "法国巴黎",
          username: "黄老板+86 13089776848",
          papers: "身份证230123199310022736",
          open: "电话报案",
          plan: "等待客户授权",
          caseid: 7,
          get_time: "2016-09-21  08:50:08",
          isshow: true
        }
      ],
      expVisible: false,
      exptxt: "",
      obj: [],
      victimList: [],
      token:
        this.$route.params.token ||
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
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    error2msg(errcode){
      var errmsg = err;
      var msg = errmsg.tomsg(errcode);
      Message.error(msg);
    },
    exp(txt) {
      this.exptxt = txt;
    },
    pass(caseid,v) {
      v.state=160;
      console.log(caseid);
      this.axios
        .post(
          constants.domain+"rescue/bidding/authorize_rescue_start ",
          qs.stringify({
            token: this.token,
            caseId: caseid
          })
        )
        .then(res => {

          if(res.data.code == 0){
            Message({
                message: "操作成功",
                type: "success"
              });
            // this.$router.push({
            //   name: "ComOffer",
            //   params: {
            //     time: new Date()
            //   },
            //   query: {
            //     typeId:this.typeId
            //   }
            // });
            window.location.reload();
          }else{
            this.error2msg(res.data.code);
          }
        });
        // this.$router.go(0)
    },
    adopt(solutionNo, v) {
      v.state = 150;
      this.axios
        .post(
          constants.domain+"rescue/bidding/update_bidding_state",
          qs.stringify({
            token: this.token,
            solutionNo,
            status: 1
          })
        )
        .then(res => {
          if(res.data.code == 0){
            Message({
                message: "操作成功",
                type: "success"
              });
            this.$router.push({
              name: "ComOffer",
              params: {
                time: new Date()
              },
              query: {
                typeId:this.typeId
              }
            });
          }else{
            this.error2msg(res.data.code);
          }
        });
    },
    reject(solutionNo, v) {
      this.axios
        .post(
          constants.domain+"rescue/bidding/update_bidding_state",
          qs.stringify({
            token: this.token,
            solutionNo,
            status: 2
          })
        )
        .then(res => {
          if(res.data.code == 0){
            Message({
                message: "操作成功",
                type: "success"
              });
            this.$router.push({
              name: "ComOffer",
              params: {
                time: new Date()
              },
              query: {
                typeId:this.typeId
              }
            });
          }else{
            this.error2msg(res.data.code);
          }
        });
    },
    topinf(obj) {
      let that = this;
      that.victimList.map((v, i) => {
        if (v.obj.caseId == obj) {
          this.$router.push({
            name: "ComPar",
            params: {
              token: that.token,
              obj: that.obj,
              victimList: that.victimList,
              index: i
            },
            query: {
              typeId:this.typeId,
              caseid: obj
            }
            
          });
        }
      });
    },
    toplook(obj,bidId) {
      this.$router.push({
        name: "Comlookinf",
        params: {
          token: this.token
        },
        query: {
          typeId:this.$route.query.typeId,
          caseid: obj,
          bidId:bidId
        }
      });
    },
    topar(obj, index) {
      this.$router.push({
        name: "helpCompany",
        params: {
          token: this.token,
          index,
          obj: this.obj,
          victimList: this.victimList
        },
        query: {
          typeId:this.$route.query.typeId,
          caseid: obj
        }
      });
    },
    toUrl(url) {
      window.open(url);
    },
    filt() {
      this.getData(this.st_time, this.en_time + 86400000);
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
    getData(st, et) {
      this.tableData = [];
      let that = this;
      let n = 0;
      let sex = "";
      let isshow = false;
      let stTime = st || this.st_time;
      let enTime = et || this.en_time;
      let plan = "";
      let list = [];
      let tl='';
      if (stTime && enTime) {
        tl=tl+`&startTs=${stTime}&endTs=${enTime}`;
      } 

      let nl=0;

      fetch(constants.domain+"rescue/case/list_case", {
          method: "POST",
          body: `token=${this.token}&typeId=${
            this.typeId
          }&status=120&status=130&status=140&status=150&status=160`+tl,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            console.log("请求了offer no start");
            return res.json();
          })
          .then(function(data) {
            if (data.obj) {
              data.obj.map((v, i) => {
                async function getout(state) {
                  that.axios
                    .post(
                      constants.domain+"rescue/bidding/list_bidding",
                      qs.stringify({
                        token: that.token,
                        caseId: v.obj.id
                      })
                    )
                    .then(res => {
                      list = res.data.obj;
                      if (
                          v.victimList[0].obj.insurancePolicyNo &&
                          v.victimList[0].obj.insurancePolicyNo != ""
                      ) {
                          isshow = true;
                      } else {
                          isshow = false;
                      }

                      var pt=constants.pt2txt2(state);
                      that.tableData.push({
                        state: v.obj.caseState,
                        caseid: v.obj.id,
                        number: i + 1, //序号
                        casenumber: v.obj.caseNo, //案件编号
                        address: v.generalLocation?v.generalLocation.addr:'', //地址
                        username:
                          v.victimList[0].obj.victimName +
                          (v.obj.reporterContact || ""), //用户信息
                        papers: v.victimList[0].obj.idNo||"无", //身份证号
                        plan: pt.phase, //状态
                        open: v.obj.caseSrc,
                        node: pt.node,
                        get_time: constants.time(v.obj.incidentTs),
                        op: "查看并操作",
                        insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                        isshow: isshow,
                        list: list,
                        w:v.obj.updateAt,
                      });
                      nl--;  
                      if(nl==0){
                        console.log("sortting!!");
                        that.tableData.sort(sortcase); 
                      }                 
                    });
                }
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
                var pt=constants.pt2txt2(v.obj.caseState);
                if(v.obj.caseState==140||v.obj.caseState==150||v.obj.caseState==160){
                  nl++;
                  getout(v.obj.caseState);
                }else{
                  that.tableData.push({
                      state: v.obj.caseState,
                      caseid: v.obj.id,
                      number: i + 1, //序号
                      casenumber: v.obj.caseNo, //案件编号
                      address: v.generalLocation?v.generalLocation.addr:'', //地址
                      username:
                      v.victimList[0].obj.victimName +
                        (v.obj.reporterContact || ""), //用户信息
                      papers: v.victimList[0].obj.idNo, //身份证号
                      plan: pt.phase, //进度
                      node: pt.node, //节点
                      isshow: isshow,
                      open: v.obj.caseSrc,
                      get_time: constants.time(v.obj.incidentTs),
                      op: "查看并操作",
                      insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                      w:v.obj.updateAt,
                    });
                  
                  
                } 
                that.caseid = v.obj.id;
                that.obj.push(v.obj);
                that.victimList.push(v.victimList[0]);
              });              
            }
          });
    }
  },
  mounted() {
    window.localStorage.setItem(
      "case",
      JSON.stringify({
        case: "Comoffer"
      })
    );
    this.getData();
  }
};

function sortcase(a,b){
  return b.w-a.w;
}

</script>

<style scoped>
.el-button{
    padding: 10px 40px;
}
.el-table__expanded-cell {
  padding: 0;
}
.top_box {
  width: 100%;
}
.top_box h2 {
  font-size: 22px;
  color: #333;
  font-weight: normal;
  text-align: left;
  margin-bottom: 15px;
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
  margin-left: 5px;
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
.span_box {
  margin-left: 10px;
  color: #00abfa;
  /* display: inline-block;
  width: 100px; */
  text-align: center;
}
.el-button+.el-button{
  margin: 0;
}
.span_box{
  color: #00abfa
}
</style>