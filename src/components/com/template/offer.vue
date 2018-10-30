<template>
    <div>
        <div class="top_box">
            <h2>授权通过等待方案报价案件</h2>
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
          <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div v-for="(v,i) in props.row.list" :key="i">
                <span>{{v.insti.name}}</span>
                <span v-if="props.row.state!=140&&typeof v.solution !='undefined'">
                  整体报价${{v.solution.totalFee||0}}
                   救援费用:${{v.solution.rescueFee||0}}
                  医疗费用:${{v.solution.medicFee||0}}
                  案件服务费用:${{v.solution.caseFee||0}}
                </span>
                <span v-else>
                  <img src="../../../../static/images/loading.gif" alt="">
                  <span class="span_box">
                    …
                  </span>
                </span>
                <span v-if="props.row.state==150">
                  (费用等待审核)
                </span>
                <span v-if="props.row.state==104">
                  (报价已关闭)
                </span>
                <span v-if="props.row.state==160">
                  (费用审核通过)
                </span>                
              </div>
              <div v-for="(v) in props.row.list" :key="v.bidding.id" v-if="props.row.state==160">
                <span class="span_box" @click="pass(props.row.caseid)">授权该救援机构开始救援</span>
                <span class="span_box" @click="exp(props.row.stateText);expVisible=true">授权说明</span>
              </div>
              <div v-for="(v,i) in props.row.list" :key="v.bidding.id" v-if="props.row.state==120">
                <span class="span_box" @click="adopt(v.bidding.solutionNo)">同意该公司报价转交保险授权</span>
                <span class="span_box" @click="toplook(props.row.caseid,i)">报价详情</span>
                <span class="span_box" @click="reject(v.bidding.solutionNo,props.row)">关闭报价</span> 
              </div>
              <div v-for="(v) in props.row.list" :key="v.bidding.id" v-if="props.row.state==140">
                <span>等待报价</span>
              </div>
              <div v-for="(v,i) in props.row.list" :key="v.bidding.id" v-if="props.row.state==150">
                <span class="span_box" @click="toplook(props.row.caseid,i)">报价详情</span>
              </div>
            </el-form>
          </template>
        </el-table-column>
            <el-table-column
                prop="number"
                label="序号"
                width="50"
                type="index"
                :index='1'>
            </el-table-column>
            <el-table-column
                prop="casenumber"
                label="案件编号"
                width="80">
            </el-table-column>
            <el-table-column
                prop="address"
                label="案件地点"
                width="80">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户信息"
                width="90">
            </el-table-column>
            <el-table-column
                prop="papers"
                label="证件信息"
                width="90">
            </el-table-column>
            <el-table-column
                prop="open"
                label="案件来源"
                width="50">
            </el-table-column>
            <el-table-column
                prop="plan"
                label="案件状态"
                width="100">
            </el-table-column>
            <el-table-column
                prop="par"
                label="用户是否投保"
                width="90">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" v-show="scope.row.isshow"  @click="toUrl(scope.row.insuranceUrl)">保险详情</el-button>  
                    <el-button  type="text" size="small" v-show="!scope.row.isshow">无</el-button>                   
                </template>
            </el-table-column>
            <el-table-column
                prop="get_time"
                label="启动救援时间"
                width="110">
            </el-table-column>
            <el-table-column
                prop="op"
                label="操作"
                width="160">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="topinf(scope.row.caseid)">案件详情</el-button>
                    <el-button  v-if="scope.row.state==130" type="text" size="small" @click="topar(scope.row.caseid)">转交救援公司获取报价</el-button>
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
          <p>{{exptxt}}</p>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import funVue from "../../common_com/fun.vue";
export default {
  data() {
    return {
      typeid:
        this.$route.params.typeId ||
        JSON.parse(window.localStorage.getItem("typeid")).id,
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
    exp(txt) {
      this.exptxt = txt;
    },
    pass(caseid) {
      console.log(caseid);
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/bidding/authorize_rescue_start ",
          qs.stringify({
            token: this.token,
            caseId: caseid
          })
        )
        .then(res => {
          console.log(res);
          this.$router.push({
            name: "ComOffer",
            params: {
              time: new Date()
            }
          });
        });
    },
    adopt(solutionNo, v) {
      v.state = 150;
      console.log(solutionNo);
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/bidding/update_bidding_state",
          qs.stringify({
            token: this.token,
            solutionNo,
            status: 1
          })
        )
        .then(res => {
          console.log(res);
          this.$router.push({
            name: "ComOffer",
            params: {
              time: new Date()
            }
          });
        });
    },
    reject(solutionNo, v) {
      v.state = 104;
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/bidding/update_bidding_state",
          qs.stringify({
            token: this.token,
            solutionNo,
            status: 2
          })
        )
        .then(res => {
          console.log(res);
          this.$router.push({
            name: "ComOffer",
            params: {
              time: new Date()
            }
          });
        });
    },
    topinf(obj) {
      let that = this;
      console.log(obj);
      console.log(that.victimList);
      that.victimList.map((v, i) => {
        if (v.obj.caseId == obj) {
          this.$router.push({
            name: "ComPar",
            params: {
              token: that.token,
              obj: that.obj,
              victimList: that.victimList,
              index: i
            }
          });
        }
      });
    },
    toplook(obj) {
      this.$router.push({
        name: "Comlookinf",
        params: {
          caseid: obj,
          token: this.token
        }
      });
    },
    topar(obj) {
      console.log();
      //this.$router.push("lookinf");
      console.log(obj);
      this.$router.push({
        name: "helpCompany",
        params: {
          caseid: obj,
          token: this.token
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
      if (stTime && enTime) {
        fetch("http://api.test.dajiuxing.com.cn/rescue/case/list_case", {
          method: "POST",
          body: `token=${this.token}&typeId=${
            this.typeid
          }&status=120&status=130&status=112&status=114&status=120&status=150&status=160&startTs=${stTime}&endTs=${enTime}`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            console.log("请求了offer stTime enTime");
            return res.json();
          })
          .then(function(data) {
            console.log(data);
            data.obj.map((v, i) => {
              console.log(v);
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
              if (v.obj.caseState == 120) {
                that.tableData.push({
                  state: 0,
                  caseid: v.obj.id,
                  number: i + 1, //序号
                  casenumber: v.obj.caseNo, //案件编号
                  address: v.obj.locId, //地址
                  username:
                    v.victimList[0].obj.victimName +
                    (v.victimList[0].obj.contact || ""), //用户信息
                  papers: v.victimList[0].obj.idNo, //身份证号
                  plan: "等待客户授权", //状态
                  open: v.obj.caseSrc,
                  node: "等待报价",
                  get_time: that.time(v.obj.incidentTs),
                  op: "查看并操作",
                  insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                  isshow: isshow
                });
              } else if (v.obj.caseState == 130) {
                that.tableData.push({
                  state: 1,
                  caseid: v.obj.id,
                  number: i + 1, //序号
                  casenumber: v.obj.caseNo, //案件编号
                  address: v.obj.locId, //地址
                  username:
                    v.victimList[0].obj.victimName +
                    (v.victimList[0].obj.contact || ""), //用户信息
                  papers: v.victimList[0].obj.idNo, //身份证号
                  plan: "客户授权通过", //状态
                  open: v.obj.caseSrc,
                  node: "等待报价",
                  get_time: that.time(v.obj.incidentTs),
                  op: "查看并操作",
                  insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                  isshow: isshow
                });
              } else if (v.obj.caseState == 112) {
                that.tableData.push({
                  state: 0,
                  caseid: v.obj.id,
                  number: i + 1, //序号
                  casenumber: v.obj.caseNo, //案件编号
                  address: v.obj.locId, //地址
                  username:
                    v.victimList[0].obj.victimName +
                    (v.victimList[0].obj.contact || ""), //用户信息
                  papers: v.victimList[0].obj.idNo, //身份证号
                  plan: "客户拒绝请求", //状态
                  open: v.obj.caseSrc,
                  node: "等待报价",
                  get_time: that.time(v.obj.incidentTs),
                  op: "查看并操作",
                  insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                  isshow: isshow
                });
              } else if (v.obj.caseState == 140) {
                that.axios
                  .post(
                    "http://api.test.dajiuxing.com.cn/rescue/bidding/list_bidding",
                    qs.stringify({
                      token: that.token,
                      caseId: v.obj.id
                    })
                  )
                  .then(res => {
                    list = res.data.obj;
                  });
                setTimeout(function() {
                  that.tableData.push({
                    state: 5,
                    caseid: v.obj.id,
                    number: i + 1, //序号
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.obj.locId, //地址
                    username:
                      v.victimList[0].obj.victimName +
                      (v.victimList[0].obj.contact || ""), //用户信息
                    papers: v.victimList[0].obj.idNo, //身份证号
                    plan: "等待救援公司报价", //状态
                    open: v.obj.caseSrc,
                    node: "等待报价",
                    get_time: that.time(v.obj.incidentTs),
                    op: "查看并操作",
                    insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                    isshow: isshow,
                    list: list
                  });
                }, 500);
              } else if (v.obj.caseState == 150) {
                that.axios
                  .post(
                    "http://api.test.dajiuxing.com.cn/rescue/bidding/list_bidding",
                    qs.stringify({
                      token: that.token,
                      caseId: v.obj.id
                    })
                  )
                  .then(res => {
                    list = res.data.obj;
                  });
                setTimeout(function() {
                  that.tableData.push({
                    state: 2,
                    caseid: v.obj.id,
                    number: i + 1, //序号
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.obj.locId, //地址
                    username:
                      v.victimList[0].obj.victimName +
                      (v.victimList[0].obj.contact || ""), //用户信息
                    papers: v.victimList[0].obj.idNo, //身份证号
                    plan: "等待费用审核", //状态
                    open: v.obj.caseSrc,
                    node: "等待报价",
                    get_time: that.time(v.obj.incidentTs),
                    op: "查看并操作",
                    insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                    isshow: isshow,
                    list: list
                  });
                }, 500);
              } else if (v.obj.caseState == 160) {
                that.axios
                  .post(
                    "http://api.test.dajiuxing.com.cn/rescue/bidding/list_bidding",
                    qs.stringify({
                      token: that.token,
                      caseId: v.obj.id
                    })
                  )
                  .then(res => {
                    list = res.data.obj;
                  });
                setTimeout(function() {
                  that.tableData.push({
                    state: 4,
                    caseid: v.obj.id,
                    number: i + 1, //序号
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.obj.locId, //地址
                    username:
                      v.victimList[0].obj.victimName +
                      (v.victimList[0].obj.contact || ""), //用户信息
                    papers: v.victimList[0].obj.idNo, //身份证号
                    plan: "费用审核通过", //状态
                    open: v.obj.caseSrc,
                    node: "等待报价",
                    get_time: that.time(v.obj.incidentTs),
                    op: "查看并操作",
                    insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                    isshow: isshow,
                    list: list
                  });
                }, 500);
              }
              console.log(v.obj.caseState);
              console.log(v.obj);
              that.caseid = v.obj.id;
              that.obj.push(v.obj);
              that.victimList.push(v.victimList[0]);
            });
          });
      } else {
        fetch("http://api.test.dajiuxing.com.cn/rescue/case/list_case", {
          method: "POST",
          body: `token=${this.token}&typeId=${
            this.typeid
          }&status=120&status=130&status=112&status=140&status=150&status=160`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            console.log("请求了offer no start");
            return res.json();
          })
          .then(function(data) {
            console.log("请求了offer no start data:" + data.obj);
            if (data.obj) {
              data.obj.map((v, i) => {
                console.log(v);
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
                if (v.obj.caseState == 120) {
                  that.tableData.push({
                    state: 120,
                    caseid: v.obj.id,
                    number: i + 1, //序号
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.obj.locId, //地址
                    username:
                      v.victimList[0].obj.victimName +
                      (v.victimList[0].obj.contact || ""), //用户信息
                    papers: v.victimList[0].obj.idNo, //身份证号
                    plan: "等待客户授权", //状态
                    open: v.obj.caseSrc,
                    node: "等待报价",
                    get_time: that.time(v.obj.incidentTs),
                    op: "查看并操作",
                    insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                    isshow: isshow
                  });
                } else if (v.obj.caseState == 130) {
                  that.tableData.push({
                    state: 130,
                    caseid: v.obj.id,
                    number: i + 1, //序号
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.obj.locId, //地址
                    username:
                      v.victimList[0].obj.victimName +
                      (v.victimList[0].obj.contact || ""), //用户信息
                    papers: v.victimList[0].obj.idNo, //身份证号
                    plan: "客户授权通过", //状态
                    open: v.obj.caseSrc,
                    node: "等待报价",
                    get_time: that.time(v.obj.incidentTs),
                    op: "查看并操作",
                    insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                    isshow: isshow
                  });
                } else if (v.obj.caseState == 112) {
                  that.tableData.push({
                    state: 112,
                    caseid: v.obj.id,
                    number: i + 1, //序号
                    casenumber: v.obj.caseNo, //案件编号
                    address: v.obj.locId, //地址
                    username:
                      v.victimList[0].obj.victimName +
                      (v.victimList[0].obj.contact || ""), //用户信息
                    papers: v.victimList[0].obj.idNo, //身份证号
                    plan: "客户拒绝请求", //状态
                    open: v.obj.caseSrc,
                    node: "等待报价",
                    get_time: that.time(v.obj.incidentTs),
                    op: "查看并操作",
                    insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                    isshow: isshow
                  });
                } else if (v.obj.caseState == 140) {
                  that.axios
                    .post(
                      "http://api.test.dajiuxing.com.cn/rescue/bidding/list_bidding",
                      qs.stringify({
                        token: that.token,
                        caseId: v.obj.id
                      })
                    )
                    .then(res => {
                      list = res.data.obj;
                    });
                  setTimeout(function() {
                    that.tableData.push({
                      state: 140,
                      caseid: v.obj.id,
                      number: i + 1, //序号
                      casenumber: v.obj.caseNo, //案件编号
                      address: v.obj.locId, //地址
                      username:
                        v.victimList[0].obj.victimName +
                        (v.victimList[0].obj.contact || ""), //用户信息
                      papers: v.victimList[0].obj.idNo, //身份证号
                      plan: "等待救援公司报价", //状态
                      open: v.obj.caseSrc,
                      node: "等待报价",
                      get_time: that.time(v.obj.incidentTs),
                      op: "查看并操作",
                      insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                      isshow: isshow,
                      list: list
                    });
                  }, 500);
                } else if (v.obj.caseState == 150) {
                  that.axios
                    .post(
                      "http://api.test.dajiuxing.com.cn/rescue/bidding/list_bidding",
                      qs.stringify({
                        token: that.token,
                        caseId: v.obj.id
                      })
                    )
                    .then(res => {
                      list = res.data.obj;
                    });
                  setTimeout(function() {
                    that.tableData.push({
                      state: 150,
                      caseid: v.obj.id,
                      number: i + 1, //序号
                      casenumber: v.obj.caseNo, //案件编号
                      address: v.obj.locId, //地址
                      username:
                        v.victimList[0].obj.victimName +
                        (v.victimList[0].obj.contact || ""), //用户信息
                      papers: v.victimList[0].obj.idNo, //身份证号
                      plan: "等待费用审核", //状态
                      open: v.obj.caseSrc,
                      node: "等待报价",
                      get_time: that.time(v.obj.incidentTs),
                      op: "查看并操作",
                      insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                      isshow: isshow,
                      list: list
                    });
                  }, 500);
                } else if (v.obj.caseState == 160) {
                  that.axios
                    .post(
                      "http://api.test.dajiuxing.com.cn/rescue/bidding/list_bidding",
                      qs.stringify({
                        token: that.token,
                        caseId: v.obj.id
                      })
                    )
                    .then(res => {
                      list = res.data.obj;
                    });
                  setTimeout(function() {
                    that.tableData.push({
                      state: 160,
                      caseid: v.obj.id,
                      number: i + 1, //序号
                      casenumber: v.obj.caseNo, //案件编号
                      address: v.obj.locId, //地址
                      username:
                        v.victimList[0].obj.victimName +
                        (v.victimList[0].obj.contact || ""), //用户信息
                      papers: v.victimList[0].obj.idNo, //身份证号
                      plan: "费用审核通过", //状态
                      open: v.obj.caseSrc,
                      node: "等待报价",
                      get_time: that.time(v.obj.incidentTs),
                      op: "查看并操作",
                      insuranceUrl: v.victimList[0].obj.insurancePaper, //用户保险详情链接
                      isshow: isshow,
                      list: list
                    });
                  }, 500);
                }
                console.log(v.obj.caseState);
                console.log(v.obj);
                that.caseid = v.obj.id;
                that.obj.push(v.obj);
                that.victimList.push(v.victimList[0]);
              });
            }
          });
      }
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
        case: "Comoffer"
      })
    );
    this.getData();
  }
};
</script>

<style scoped>
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
.span_box {
  margin-left: 10px;
  color: #00abfa;
  /* display: inline-block;
  width: 100px; */
  text-align: center;
}
</style>