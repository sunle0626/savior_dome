<template>
    <div class="inf_wrap">
        <p class="back_box" @click="back()">
          <img src="../../../static/images/back.png" alt="">
          返回上一页
          </p>
        <div class="box_req">
            <h2>回复方案及报价详情</h2>
            <div class="req_box">
                <b>救援方案</b>
                <div class="acc_box">
                    <p><img class="fj_box" src="../../../static/images/fj.png" alt="">附件({{acc_list.length}})</p>
                    <ul>
                        <li v-for="(v,ind) in acc_list" :key="ind">
                            <img :src="v.icon" alt="">
                            <p>{{v.description}}</p>
                            <a :href="v.url" :download="v.url">下载</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="offer_box">
              <p>
                <span>
                  救援机构总报价：<b>${{obj.totalFee||0}}</b>
                </span>
                <span>
                  救援费用：<b>${{obj.rescueFee||0}}</b>
                </span>
                <span>
                  医疗费用：<b>${{obj.medicFee||0}}</b>
                </span>
                <span>
                  案件服务费用：<b>${{obj.caseFee||0}}</b>
                </span>
                </p>
            </div>
            <div class="offer_box" v-if="!flag">
              <p>
                <span>
                  保险公司收到的价格：<b>${{totalFee||0}}</b>
                </span>
                <span>
                  救援费用：<b>${{rescueFee||0}}</b>
                </span>
                <span>
                  医疗费用：<b>${{medicFee||0}}</b>
                </span>
                <!-- <span>
                  案件服务费用：<b>${{caseFee||0}}</b>
                </span> -->
                </p>
            </div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="flag">
                    <el-form-item label="整体报价:">
                        <el-input v-model="totalFee" readonly></el-input>
                        <!-- <span>*</span> -->
                    </el-form-item>
                    <el-form-item label="救援费用:">
                        <el-input v-model="rescueFee" @input="upnum(rescueFee)" placeholder='请输入金额($)'></el-input>
                        <!-- <span>*</span> -->
                    </el-form-item>
                    <el-form-item label="医疗费用:">
                        <el-input v-model="medicFee" @input="upnum(medicFee)" placeholder='请输入金额($)'></el-input>
                        <!-- <span>*</span> -->
                    </el-form-item>
                    <!-- <el-form-item label="案件服务费用:">
                        <el-input v-model="caseFee" @input="upnum(caseFee)" placeholder='请输入金额($)'></el-input>
                    </el-form-item> -->
                </el-form>
            <div class="rescue_box"  v-for="(item,ind) in checkList" :key="ind">
                <p>{{ind+1}} 、{{item.name}}</p>
                <el-checkbox-group v-for="(v,ind) in item.list" :key="ind">
                    <el-checkbox checked="checked" disabled>
                        <span class="res_div">{{v.dict.name}}</span>
                        <br/>
                        <span class="res_box" v-show="v.obj.fee==-1">无限额</span>
                        <span class="res_box" v-show="v.obj.fee>0">限额：{{v.obj.fee}}</span>
                        <br v-if="v.obj.fee!=0"/>
                        <span class="res_box">说明：{{v.obj.description}}</span>
                        <br/>
                        <span class="res_box">回复：{{v.obj.reply}}</span>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="upbtn_box">
              <a href="javascript:void(0)" v-if="flag" @click="reject(obj.solutionNo)">不选择此家报价</a>
            <el-button type="primary" @click="back()">关闭报价详情</el-button>
            <el-button type="primary" v-if="flag" @click="adopt(obj.solutionNo)">同意该公司报价，转交保险公司授权</el-button>
            <!-- span @click="toalter">修改报价</span -->
            </div>
           </div>
    </div>
</template>

<script>
import qs from "qs";
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';
import err from "../util/error2msg.js";
import { Message } from "element-ui";

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  data() {
    return {
      exp: "",
      token: this.$route.params.token||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseid: this.$route.query.caseid,
      bidId:this.$route.query.bidId,
      acc_list: [],
      formInline: {
        user: "",
        region: ""
      },
      checkList: [],
      parentObj: [],
      flag: false,
      obj: {
        totalFee: 0,
        rescueFee: 0,
        medicFee: 0,
        caseFee: 0
      },
      totalFee: 0,
      rescueFee: 0,
      medicFee: 0,
      caseFee: 0,
      typeId:this.$route.query.typeId
    };
  },
  methods: {
    error2msg(errcode){
      var errmsg = err;
      var msg = errmsg.tomsg(errcode);
      Message.error(msg);
    },
    upnum(val) {
      if (isNaN(val)) {
        Message.error("请输入数字，而非其他");
      } else {
        console.log(this.medicFee * 1, this.caseFee * 1, this.rescueFee * 1);
        if (!this.caseFee) {
          this.caseFee = 0;
        }
        if (!this.medicFee) {
          this.medicFee = 0;
        }
        if (!this.rescueFee) {
          this.rescueFee = 0;
        }
        this.medicFee = this.medicFee * 1;
        this.caseFee = this.caseFee * 1;
        this.rescueFee = this.rescueFee * 1;
        this.totalFee = this.medicFee + this.caseFee + this.rescueFee;
      }
    },
    reject(solutionNo) {
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
          if(res.data.code != 0){
              that.error2msg(res.data.code);
          }else{
            Message({
                  message: "关闭成功",
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
          }
        });
    },
    adopt(solutionNo) {
      console.log(solutionNo);
      this.axios
        .post(
          constants.domain+"rescue/bidding/update_bidding_state",
          qs.stringify({
            token: this.token,
            solutionNo,
            status: 1,
            totalFee: this.totalFee,
            medicFee: this.medicFee,
            caseFee: this.caseFee,
            rescueFee: this.rescueFee
          })
        )
        .then(res => {
          if(res.data.code != 0){
              that.error2msg(res.data.code);
          }else{
            Message({
                  message: "授权成功",
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
          }
        });
    },
    back() {
      this.$router.push({ name: "ComOffer" , query:{typeId:this.typeId}});
    },
    toalter() {
      this.$router.push("/regulator/caseindex/alter?typeId="+this.typeId);
    }
  },
  mounted() {
    let that = this;
    let n = 0;
    fetch(
      constants.domain+"rescue/bidding/view_solution",
      {
        method: "POST",
        body: `token=${this.token}&biddingId=${this.bidId}`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
      .then(function(res) {
        //console.log(res);
        return res.json();
      })
      .then(function(data) {
        that.obj = data.obj;
        that.flag = data.obj.state == 1;
        data.obj2.map(v => {
          if (v.dict.parentId == "0") {
            var obj = {};
            obj.id = v.dict.parentId;
            obj.childId = v.dict.id;
            obj.name = v.dict.name;
            obj.list = [];
            that.checkList.push(obj);
          } else {
            that.checkList.map(o => {
              if (v.dict.parentId == o.childId) {
                //console.log(v.dict.parentId)
                o.list.push(v);
              }
            });
          }
        });

        if(that.flag){
          that.totalFee=that.obj.totalFee;
          that.rescueFee = that.obj.rescueFee;
          that.medicFee = that.obj.medicFee;
          that.caseFee = that.obj.caseFee;
        }else{
          that.axios
              .post(
                constants.domain+"rescue/bidding/view_case_solution",
                qs.stringify({
                  token: that.token,
                  caseId: that.caseid,
                  state:4
                })
              )
              .then(res => {
                var o  = res.data.obj;
                that.totalFee= o.totalFee;
                that.rescueFee = o.rescueFee;
                that.medicFee = o.medicFee;
                that.caseFee = o.caseFee;
              });
        }
        //获取救援方案
        fetch(constants.domain+"rescue/case/upload_cnts", {
          method: "POST",
          body: `token=${that.token}&objId=${data.obj.id}&objType=2`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            //console.log(res);
            return res.json();
          })
          .then(function(data) {
            data.obj.map(v => {
              if(constants.isPic(v.url)){
                v.icon=v.url;
              }else{
                v.icon=v.icon;
              }
              that.acc_list.push(v);
            });
          });

        fetch(constants.domain+"rescue/case/upload_cnts", {
          method: "POST",
          body: `token=${that.token}&objId=${data.obj.caseId}&objType=1`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            //console.log(res);
            return res.json();
          })
          .then(function(data) {
            data.obj.map(v => {
              if(constants.isPic(v.url)){
                v.icon=v.url;
              }else{
                v.icon=v.icon;
              }
              that.acc_list.push(v);
            });
          });
      });
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #999;
}
.ex_box textarea {
  margin-left: 5%;
  width: 90%;
  height: 80px;
  margin-top: 18px;
  border: 0;
  border: 1px solid #d9ddde;
  border-radius: 5px;
  font-size: 15px;
}
.back_box {
  text-align: left;
  font-size: 14px;
  line-height: 45px;
  color: #666;
  cursor: pointer;
}
.inf_wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 5px 15px;
  text-align: left;
}
.box_req > h2 {
  font-size: 20px;
  margin-top: 5px;
  line-height: 45px;
  text-align: left;
  color: #333;
}
.req_box {
  box-sizing: border-box;
  padding: 0 15px;
}
.req_box b {
  font-size: 14px;
  color: #333;
  font-weight: 500;
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
  padding: 0 10px;
}
.acc_box > p {
  color: #333;
  line-height: 40px;
  font-size: 15px;
}
span {
  color: #df1717;
  margin-left: 2px;
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
.el-form {
  margin-top: 15px;
}
.el-input {
  width: 120px;
  height: 30px;
}
.el-form-item__label {
  font-size: 14px;
}
.rescue_box {
  box-sizing: border-box;
  padding: 0 20px;
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
.el-textarea {
  display: block;
  width: 160%;
  margin-top: 20px;
}
.upbtn_box {
  text-align: center;
  margin-top: 15px;
}
.upbtn_box span {
  color: #00abfa;
  margin-left: 5px;
}
.offer_box {
  line-height: 44px;
}
.offer_box span {
  margin-left: 35px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
.offer_box span b {
  color: #ff7200;
  margin-left: 3px;
}
</style>