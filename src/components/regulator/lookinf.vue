<template>
    <div class="inf_wrap">
        <p class="back_box" @click="back()">
          <img src="../../../static/images/back.png" alt="">
          返回上一页
          </p>
        <ParheaderVue :caseid="caseid" :token="token"/>
        <div class="box_req">
            <h2>B.回复方案及报价详情</h2>
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
                  保险公司收到的价格：<b>${{obj.totalFee||0}}</b>
                </span>
                <span v-if="contractType==2">
                  救援费用：<b>${{obj.rescueFee||0}}</b>
                </span>
                <span>
                  医疗费用：<b>${{obj.medicFee||0}}</b>
                </span>
                <!-- <span>
                  案件服务费用：<b>${{obj.caseFee||0}}</b>
                </span> -->
                </p>
            </div>
            <div class="rescue_box"  v-for="(item,ind) in checkList" :key="ind">
                <p>{{ind+1}} 、{{item.name}}</p>
                <el-checkbox-group v-for="(v,ind) in item.list" :key="ind">
                    <el-checkbox checked="checked" disabled>
                        <span class="res_div">{{v.dict.name}}</span>
                        <br/>
                        <span class="res_box">说明：{{v.obj.description}}</span>
                        <br/>
                        <span class="res_box">回复：{{v.obj.reply}}</span>
                        <!--br/>
                        <span class="res_box" v-show="v.obj.fee!=0">限额：{{v.obj.fee}}</span -->
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="ex_box">
            <textarea name="exp" id="exp" cols="30" rows="10" v-model="exp" placeholder="添加说明">
            </textarea>
            </div>
            <div class="upbtn_box">
            <el-button type="primary" @click="flag=true;apply()">授权通过，启动救援</el-button>
            <!-- span @click="toalter">修改报价</span -->
            </div>
           </div>
    </div>
</template>

<script>
import qs from "qs";
import { Message } from "element-ui";
import err from "../util/error2msg.js";
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
      exp:'',
      token: this.$route.params.token||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseid: this.$route.query.caseid,
      acc_list: [],
      formInline: {
        user: "",
        region: ""
      },
      checkList: [],
      parentObj: [],
      flag: false,
      obj:{
        totalFee:0,
        rescueFee:0,
        medicFee:0,
        caseFee:0
      },
      contractType:1
    };
  },
  methods: {
    error2msg(errcode){
      var errmsg = err;
      var msg = errmsg.tomsg(errcode);
      Message.error(msg);
    },
    back() {
      this.$router.push("/regulator/caseindex/offer?typeId="+this.$route.query.typeId);
    },
    apply() {
      let that = this;
      this.axios
        .post(
          constants.domain+"rescue/bidding/authorize_solution",
          qs.stringify({
            token: this.token,
            caseId: this.caseid,
            status:1,
            stateText3:this.exp
          })
        )
        .then(res => {
          console.log(res.data);
         if (res.data.code === 0) {
          Message({
                message: "授权成功",
                type: "success"
              });
            that.$router.push({
              path: "/regulator/caseindex/offer",
              name: "RegOffer",
              params: {
                token: that.token,
                obj: that.inf,
                data: that.obj
              },
            query: {
              typeId:that.$route.query.typeId
            }
            });
          }else{
            that.error2msg(res.data.code);
          }
        });
    },
    toalter() {
      this.$router.push("/regulator/caseindex/alter?typeId="+this.$route.query.typeId);
    }
  },
  mounted() {
    let that = this;
    let n = 0;

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
        if(data.code == 0){
            that.contractType = data.obj.obj.contractType||1;
        }
     });


    fetch(
      constants.domain+"rescue/bidding/view_case_solution",
      {
        method: "POST",
        body: `token=${this.token}&caseId=${this.caseid}&state=4`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
      .then(function(res) {
        //console.log(res);
        return res.json();
      })
      .then(function(data) {
        that.obj = data.obj
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
                v.icon='../../../static/images/eles_icon.png';
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
                v.icon='../../../static/images/eles_icon.png';
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
  margin-top: 38px;
  border: 0;
  border: 1px solid #d9ddde;
  border-radius: 5px;
  font-size: 15px;
  padding: 5px;
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
.rescue_box>.el-checkbox-group{
  margin-left: 40px;
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
.offer_box{
  line-height: 44px;
}
.offer_box span{
  margin-left: 35px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}
.offer_box span b{
  color: #ff7200;
  margin-left: 3px;
}
</style>