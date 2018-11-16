<template>
    <div class="par_wrap">
        <p class="back_box" @click="back()">
          <img src="../../../static/images/back.png" alt="">
          返回上一页</p>
        <div class="box">
            <h2>查看并操作</h2>
            <ParheaderVue :caseid="caseid" :token="token"/>
            <div class="swi_box">
                <div class="top_box">
                    <p>
                        <router-link :to="{name:'parinf',params:{token:token},query: {typeId:this.$route.query.typeId,caseid:this.caseid}}">出险信息</router-link>
                        <router-link :to="{name :'parcase',params:{token:token},query: {typeId:this.$route.query.typeId,caseid:this.caseid}}">案件进展</router-link>
                    </p>
                </div>
                <div class="bottom_box">
                  <keep-alive>
                    <router-view></router-view>
                  </keep-alive>
                </div>
                        <div class="req_box">
           <p><b>B、救援请求</b></p>
           <div class="box_req">
               <ul>
                   <li>
                   </li>
                   <li>
                       <b>服务清单</b>
                       <div class="acc_box">
                           <p><img class="fj_box" src="../../../static/images/fj.png" alt="" style="padding-right:10px;vertical-align: middle;">相关附件({{acc_list.length}})</p>
                           <ul>
                               <li v-for="(v,ind) in acc_list" :key="ind">
                                   <img :src="v.icon" alt="">
                                   <p>{{v.description}}</p>
                                   <a :href="v.url" :download="v.url">下载</a>
                               </li>
                           </ul>
                       </div>
                       <div class="rescue_box">
                         <div class="box" v-for="(v,ind) in obj2" :key="ind">
                        <p v-if="v.dict&&v.dict.parentId===0">{{ind+1}}、{{v.dict.name}}</p>
                         <div v-if="v.dict&&v.dict.parentId===0" class="box">
                           <el-checkbox-group v-model="checkList">
                              <el-checkbox label="医疗机构推介" disabled checked v-for="(v,ind) in obj2" :key="ind" v-if="ind>0&&v.dict">
                                    <span class="res_div">{{v.dict.name}}</span>
                                    <br/>
                                    <span class="res_box" v-show="v.obj.fee==-1">无限额</span>
                                    <span class="res_box" v-show="v.obj.fee>0">限额：{{v.obj.fee}}</span>
                                    <br v-if="v.obj.fee!=0"/>
                                    <span class="res_box">说明：{{v.obj.description}}</span>
                                </el-checkbox>
                            </el-checkbox-group>
                         </div>
                         </div>
                           <!-- <p></p>
                            <p>2、费用担保</p>
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="医疗机构推介" disabled checked>
                                    <span class="db_div">医疗费用担保或非医疗费用担保</span>
                                    <span class="db_box">限额<b>$10000</b></span>
                                </el-checkbox>
                            </el-checkbox-group> -->
                       </div>
                   </li>
               </ul>
               <div class="upbtn_box">
                   <el-button type="primary" v-if="flag" @click="toinf">回复报价及方案</el-button>
                   <el-button type="primary" v-if="!flag" @click="back">关闭详情</el-button>
               </div>
           </div>
        </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';
import ParheaderVue from "../par/parheader.vue";

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  components: {
    ParheaderVue
  },
  data() {
    return {
      solutionState: 0,
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseid:this.$route.query.caseid,
      obj:{},
      victimList:{},
      casenumber: "AJ200101",
      inf: null,
      obj2: null,
      acc_list: [],
      checkList: [],
      bid: [],
      flag:true,
      typeId:this.$route.query.typeId
    };
  },
  methods: {
    toinf() {
      let that = this;

      if (that.solutionState === 0) {
        that.$router.push({
          path: "/fac/caseindex/inf",
          name: "Inf",
          params: {
            token: this.token,
          },
        query: {
          typeId:this.$route.query.typeId,
          caseid:this.caseid
        }
        });
      }
    },
    back() {
      let that = this;
      this.$router.push({
        path: "/fac/caseindex/await",
        name: "Await",
        params: {
          token: that.token
        },
        query: {
          typeId:this.typeId
        }
      });
    },
    up(v) {
      console.log("par up:"+v);
    },
    getupload(solutionid) {
      let that = this;
      fetch(constants.domain+"rescue/case/upload_cnts", {
        method: "POST",
        body: `token=${this.token}&objType=1&objId=${this.caseid}`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          console.log("upload_cnt:"+data);
          data.obj.map(function(v) {
            if(constants.isPic(v.url)){
              v.icon=v.url;
            }else{
              v.icon='../../../static/images/eles_icon.png';
            }
            that.acc_list.push(v);
          });
        });
    },
    setdata() {
      let that = this;
      this.$router.push({
        name: "parinf",
        params: {
          token: this.token
        },
        query: {
          typeId:this.$route.query.typeId,
          caseid:this.caseid
        }
      });
    }
  },
  mounted() {
    let that = this;
    fetch(constants.domain+"rescue/case/detail_case", {
      method: "POST",
      body: `token=${this.token}&caseId=${this.caseid}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.init = data.obj;
        that.obj = data.obj.obj;
        that.obj2 = data.obj2;
        that.victimList = data.obj.victimList[0];
        that.flag = data.obj.solutionState == 0;
        that.setdata();
      });
    fetch(constants.domain+"rescue/bidding/bidders", {
      method: "POST",
      body: `token=${this.token}&caseId=${this.caseid}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.bid = data.obj;
      });

      this.getupload();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #999;
}
.par_wrap {
  width: 100%;
}
.back_box {
  text-align: left;
  font-size: 14px;
  line-height: 45px;
  color: #666;
  cursor: pointer;
}
.box {
  width: 100%;
  text-align: left;
}
.box > h2 {
  font-size: 20px;
  color: #333;
  font-weight: 600;
  line-height: 45px;
}
.box_req {
  margin-left: 32px;
}
.box_req ul li b {
  font-size: 14px;
}
.case_box {
  width: 100%;
}
.case_box p {
  line-height: 45px;
}
.case_box p span {
  margin-left: 20px;
}
.case_box ul {
  border: 1px solid #d9ddde;
}
.case_box ul li {
  width: 39%;
  text-align: start;
  text-indent: 1em;
  font-size: 14px;
  overflow: hidden;
  height: 42px;
  display: inline-block;
  line-height: 42px;
  border-right: #d9ddde 1px solid;
  border-top: #d9ddde 1px solid;
}
.case_box ul li:nth-child(3n) {
  border-right: 0;
  width: 20%;
}
.case_box ul li:first-child,
.case_box ul li:nth-child(2),
.case_box ul li:nth-child(3) {
  border-top: 0;
}
.btn_box {
  color: #00abfa;
  cursor: pointer;
}
.top_box {
  width: 100%;
}
.top_box p {
  width: 260px;
  background: #f2f5f8;
  margin: 30px auto;
  height: 40px;
  text-align: center;
}
.top_box p a {
  display: inline-block;
  width: 120px;
  height: 30px;
  margin-top: 5px;
  line-height: 30px;
  text-align: center;
}
.router-link-exact-activem,
.router-link-active {
  color: #00abfa;
  background: #fff;
}
.req_box > p {
  margin-top: 15px;
  line-height: 45px;
  text-align: left;
}
.box_req ul li b {
  font-size: 14px;
}
.org_box {
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 15px;
}
.org_box p {
  line-height: 40px;
  color: #333;
}
.acc_box {
  box-sizing: border-box;
  padding: 10px 10px;
}
.acc_box > p {
  color: #333;
  line-height: 40px;
  font-size: 15px;
}
.acc_box ul li {
  display: inline-block;
  width: 20%;
  text-align: center;
}
.acc_box ul li p {
  text-align: center;
  line-height: 36px;
  height: 36px;
  font-size: 14px;
}
.acc_box ul li img {
  width: 90px;
  height: 120px;
}
.acc_box ul li a {
  color: #00abfa;
  font-size: 14px;
}
.rescue_box {
  box-sizing: border-box;
  padding: 0 20px;
}
.rescue_box>.box > p {
  line-height: 40px;
  font-size: 14px;
}
.rescue_box .box .el-checkbox-group{
  margin-left: 10px;
}
.rescue_box>.el-checkbox-group{
  margin-left: 10px;
  margin-top: 10px;
}
.rescue_box > p {
  line-height: 40px;
  font-size: 14px;
}
.res_div {
  position: relative;
  top: 18px;
}
.res_box {
  position: relative;
  top: 20px;
  font-size: 14px;
  color: #999;
}
.el-checkbox-group {
  position: relative;
  box-sizing: border-box;
  padding: 0 15px;
}
.el-checkbox {
  width: 100%;
  margin-bottom: 20px;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.db_div,
.res_div {
  font-size: 14px;
  color: #333;
}
.db_box {
  font-size: 14px;
  color: #333;
  margin-left: 30px;
}
.db_box b {
  color: #ff7200;
  margin-left: 8px;
}
.upbtn_box {
  text-align: center;
}
</style>