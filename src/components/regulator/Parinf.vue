<template>
    <div class="pardata_box">
        <div class="data_wrap">
            <ul>
                <li v-for="(v,ind) in objdata" :key="ind">
                    {{v||''}}
                </li>
                <li>
                    <span>事故经过：</span>
                    <textarea name="pass" id="passnode" cols="30" rows="10" v-model="def" disabled='disabled'>
                    </textarea>
                </li>
            </ul>
        </div>
        <div class="req_box">
           <p><b>B、救援请求</b></p>
           <div class="box_req">
               <ul>
                   <!-- <li>
                       <b>A、已申请报价服务机构</b>
                       <div class="org_box">
                            <p v-for="(v,ind) in bid" :key="ind" 
                            style="font-size:14px"
                            >
                            {{ind+1}}、 {{v.instiCountry}}&emsp;&emsp;&emsp;&emsp;{{v.insti.category}}&emsp;&emsp;&emsp;&emsp;{{v.insti.name}}</p>
                       </div>
                   </li> -->
                   <li>
                       <b>A、服务清单</b>
                       <div class="rescue_box">
                         <div class="box" v-for="(v,ind) in obj" :key="ind">
                          <p style="line-height: 30px;font-size: 14px;" v-if="v.dict.parentId===0">1、{{v.dict.name}}</p>
                         </div>
                         <div class="box">
                           <el-checkbox-group v-model="checkList">
                              <el-checkbox label="医疗机构推介" disabled checked v-for="(v,ind) in obj" :key="ind" v-if="ind>0">
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
                   </li>
               </ul>
           </div>
           <p><b>B、江泰指挥中心救援整体说明</b></p>
           <div class="box_exp">
             <p><span class="res_box_exp">说明：{{stateText}}</span></p>
             <div class="exp_box">
                <span style="font-size:14px" v-if="acc_list.length>0"><img class="fj_box" src="../../../static/images/fj.png" alt="">附件({{acc_list.length}})</span>
                  <div class="acc_box">
                      <ul>
                          <li v-for="(v,ind) in acc_list" :key="ind">
                              <img :src="v.icon" alt="">
                              <p>{{v.description}}</p>
                              <a :href="v.url" :download="v.url">下载</a>
                          </li>
                      </ul>
                  </div>
             </div>
           </div>
            <p><b>C、添加整体说明</b></p>
           <div class="com_exp">
              <textarea name="exp" id="exp" cols="30" rows="10" v-model="exp">
            </textarea>
             <div class="exp_box2">
                <span><img class="fj_box" src="../../../static/images/fj.png" alt="" style="padding-right:10px;vertical-align: middle;">附件</span>
                <div class="up_acc">
                  <ul>
                    <li v-for="(v,i) in up_acc" :key="i">
                      <img :src="v.icon" alt="">
                      <p>{{v.description}}</p>
                      <span class="up_span" @click="upacc=true" v-if="i==0">上传</span>
                      <p><a @click="up_acc.splice(i,1)" v-if="i>0">删除</a></p>
                    </li>
                  </ul>
                </div>
             </div>
           </div>
          <div class="upbtn_box">
            <el-button type="primary" @click="apply">通过救援请求</el-button>
          </div>
        </div>
        <el-dialog
          title="上传附件"
          :visible.sync="upacc"
          class="img_dialog"
          width="50%"
          center>
            <p><span>附件名称</span><el-input
              type="text"
              placeholder="上传方案及报价"
              v-model="txts"
              ></el-input></p>
              <p>
              <span>
                附件地址
              </span>
              <input type="file" name="file" id="filebox" @change="handleGetFile($event)">
            </p>
          <p class="p"><el-button center type="button" size="small" @click="uploadFile(),upacc=false">确定</el-button></p>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import { Message } from "element-ui";
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  data() {
    let that = this;
    return {
      file:null,
      upacc: false,
      exp: "",
      token: this.$route.params.token||
        JSON.parse(window.localStorage.getItem("data")).data,
      obj: [],
      txts: "",
      objdata: {
        add: "出险地:",
        type: "事故类型：风险灾害 ",
        part: "受伤部位：腿部 ",
        weather: "天气灾害：气象灾害 "
      },
      acc_list: [      
      ],
      up_acc: [
        {
          icon: "../../../static/images/eles_no.png",
          description: ""
        }
      ],
      checkList: [],
      def: "",
      bid: [],
      inf: null,
      url: "",
      caseid: this.$route.query.caseid,
      stateText:""
    };
  },
  methods: {
    apply() {
      let that = this;
      let tUploadCnts=this.up_acc.slice();
      tUploadCnts.shift();
      this.axios
        .post(
          constants.domain+"rescue/bidding/author_rescue",
          qs.stringify({
            token: this.token, //token值
            caseId: this.caseid, //caseid
            stateText2: this.exp, //说明
            upaccStr:JSON.stringify(tUploadCnts),        
          })
        )
        .then(res => {
          if (res.data.code === 0) {
            that.$router.push({
              path: "/regulator/caseindex/await",
              name: "RegAwait",
              params: {
                token: this.token
                // obj: this.inf,
                // data: this.obj
              },
              query: {
                typeId: this.$route.query.typeId
              }
            });
            
          }
        });
    },

    loadauxfiles(){
      let that = this;
      fetch(constants.domain+"rescue/case/upload_cnts", {
         method: "POST",
         body: `token=${that.token}&objId=${this.$route.query.caseid}&objType=1`,
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
                    v.icon="../../../static/images/eles_icon.png";
                  }
                  that.acc_list.push(v);
                });
              });
    },
    up() {
      console.log(this.url);
      let flag = constants.isPic(this.url);
        
      if (flag) {
        this.up_acc.push({
          url: this.url,
          description: this.txts,
          icon:this.url,
        });
      } else if (!flag) {
        if (this.url == "") {
          Message.error("请上传附件");
        } else {
          this.up_acc.push({
            url: this.url,
            description: this.txts,
            icon: "../../../static/images/eles_icon.png"
          });
        }
      }
    },
    handleGetFile(e) {      
      this.file = e.target.files[0];
      this.txts = this.file.name;
    },
    uploadFile(){
      let that = this;
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      let formdata = new FormData();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      formdata.append(
        "token",
        this.$route.params.token ||
          JSON.parse(window.localStorage.getItem("data")).data
      );
      reader.onload = function(e) {
        that.avatar = this.result;
        formdata.append("file", that.file);
        that.axios
          .post(
            constants.domain+"rescue/case/upload_file",
            formdata,
            config
          )
          .then(res => {
            that.url = res.data.obj;
            that.up();
          });
      };
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
        console.log("reg parinf detailcase : "+data.obj)
        that.stateText = data.obj.stateText;
        that.obj = data.obj2;
          let addr = "";
          if (data.obj.generalLocation) {
            addr = data.obj.generalLocation.addr || "";
          }
          that.objdata = {
            add:
              "出险地:" +
              (data.obj.caseCountry || "") +
              (data.obj.caseCity || "") +
              addr,
            type: "事故类型：" + (data.obj.obj.accidentType||""),
            part: "受伤部位：" + (data.obj.victimList[0].obj.injuredPart||""),
            weather: "天气灾害：" + (data.obj.obj.weatherTag || "无")
          };
          that.def = data.obj.obj.incidentDesc;
      })
    // fetch(constants.domain+"rescue/bidding/bidders", {
    //   method: "POST",
    //   body: `token=${this.token}&caseId=${this.caseid}`,
    //   mode: "cors",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
    // })
    //   .then(function(res) {
    //     return res.json();
    //   })
    //   .then(function(data) {
    //     that.bid = data.obj;
    //   });
    // fetch(
    //   constants.domain+"rescue/bidding/view_case_solution",
    //   {
    //     method: "POST",
    //     body: `token=${this.token}&caseId=${this.caseid}`,
    //     mode: "cors",
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" }
    //   }
    // )
    //   .then(function(res) {
    //     return res.json();
    //   })
    //   .then(function(data) {
    //     //that.inf = data.obj;
    //     //console.log(data.obj);
    //     if (that.obj.length <= 0) {
          
    //     }
    //     console.log(data);
    //     // that.upload();
    //   });

      this.loadauxfiles();
  }
};
</script>

<style scoped>
.img_dialog p {
  width: 100%;
  line-height: 48px;
}
.img_dialog p .el-input {
  width: 80%;
  margin-left: 3%;
}
.img_dialog p span {
  color: #333;
}
.img_dialog p input[type="file"] {
  margin-left: 3%;
}
.p {
  text-align: center;
}
a {
  text-decoration: none;
  color: #00abfa;
}
.up_span {
  color: #00abfa;
  cursor: pointer;
}
.data_wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 40px;
}
.data_wrap ul {
  width: 100%;
  height: 250px;
}
.data_wrap ul li {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.data_wrap ul li:last-child textarea {
  width: 80%;
  height: 80px;
  border: 0;
  border: 1px solid #d9ddde;
  border-radius: 5px;
  font-size: 15px;
  margin-top: 15px;
}
.data_wrap ul li:last-child span,
.data_wrap ul li:last-child textarea {
  float: left;
}
.com_exp textarea {
  margin-left: 5%;
  width: 90%;
  height: 80px;
  border: 0;
  border: 1px solid #d9ddde;
  border-radius: 5px;
  font-size: 15px;
}
.req_box > p {
  margin-top: 15px;
  line-height: 45px;
  text-align: left;
}
.res_box_exp {
  margin-left: 32px;
  font-size: 14px;
  color: #999;
}
.box_exp {
  padding-left: 20px;
}
.exp_box {
  box-sizing: border-box;
  padding: 10px 35px;
}
.exp_box2 {
  box-sizing: border-box;
  padding: 10px 45px;
}
.box_req {
  margin-left: 32px;
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
  padding: 0 20px;
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
.upbtn_box {
  text-align: center;
  margin-top: 18px;
}
.up_acc ul {
  display: flex;
  /* justify-content: space-around; */
  flex-wrap: wrap;
}
.up_acc ul li {
  text-align: center;
  width: 22%;
}
.up_acc ul li p {
  line-height: 16px;
  font-size: 14px;
  box-sizing: border-box;
  padding: 0 10px;
}
.up_acc ul li img {
  display: inline-block;
  width: 90px;
  height: 120px;
  border: 1px solid #eee;
}
</style>