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
                <div class="rescue_box"  v-for="(item,ind) in checkList" :key="ind">
                    <p>{{item.name}}</p>
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
                </div >
                    <div class="upbtn_box" >
                        <el-button type="primary" @click="back()">关闭详情</el-button>
                        <span v-if="flag" @click="toalter">修改报价</span>
                        <span v-if="!flag">{{flagText}}</span>
                    </div>                
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
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseid: this.$route.query.caseid,
      thecase: {},
      acc_list: [], // 附件列表 todo
      checkList: [], // 
      flag: true,
      flagText:"",
      solution:null,
    };
  },
  methods: {
    back() {
      this.$router.push("/fac/caseindex/offer?typeId="+this.$route.query.typeId);
    },
    toalter() {
      this.$router.push({
        name: "alter",
        params: {          
          token: this.token
        },
        query: {
          caseid: this.caseid,
          typeId:this.$route.query.typeId
        }
      });
    },
    getuploadinfo(){

      let that = this;
      fetch(
        constants.domain+"rescue/case/upload_cnts",
        {
          method: "POST",
          body: `token=${this.token}&objType=2&&objId=${this.solution.id}`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      )
        .then(function(res) {
          //console.log(res);
          return res.json();
        })
        .then(function(data) {
          that.acc_list=data.obj;
          that.acc_list.map(v=>{
            if(constants.isPic(v.url)){
              v.icon=v.url;
            }else{
              v.icon='../../../static/images/eles_icon.png';
            }
          })
        });

        fetch(constants.domain+"rescue/case/upload_cnts", {
          method: "POST",
          body: `token=${that.token}&objId=${this.caseid}&objType=1`,
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
    }
  },
  mounted() {
    let that = this;
    fetch(
      constants.domain+"rescue/bidding/view_insti_solution",
      {
        method: "POST",
        body: `token=${this.token}&caseId=${this.caseid}`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
      .then(function(res) {
        //console.log(res);
        return res.json();
      })
      .then(function(data) {
        that.solution=data.obj;
        if(data.obj && data.obj.state && data.obj.state != 1){
            that.flag = false;
            if(data.obj.state == 2){
              that.flagText = "报价已采纳";
            }else{
               that.flagText = "报价已关闭";
            }
        }
        data.obj2.map(v => {
         
          if (v.dict.parentId == "0") {
             console.log("v.dict: 0:"+v.dict.name+" v.dict.id:"+v.dict.id);
            var obj = {};
            obj.id = v.dict.parentId;
            obj.childId = v.dict.id;
            obj.name = v.dict.name;
            obj.list = [];
            that.checkList.push(obj);
          } else {
            that.checkList.map(o => {
              console.log("v.dict: sub:"+v.dict.name+" childId:"+o.childId+" v.dict.parentId:"+v.dict.parentId);
              if (v.dict.parentId == o.childId) {
                console.log(v.dict.parentId);
                o.list.push(v);
              }
            });
          }
        });
        //获取救援方案
        that.getuploadinfo();
      });
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #999;
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
</style>