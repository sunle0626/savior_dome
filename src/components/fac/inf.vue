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
                    <p><img class="fj_box" src="../../../static/images/fj.png" alt="">附件<span>*请上传救援方案附件</span></p>
                    <ul>
                        <li v-for="(v,ind) in acc_list" :key="ind">
                            <img :src="v.icon" alt="">
                            <p>{{v.description}}</p>
                            <a @click="imgVisible=true" v-if="ind==0">上传附件</a>
                            <p><a @click="acc_list.splice(ind,1)" v-if="ind>0">删除</a></p>
                            <!-- <input type="file" name="file" id="filebox" @change="handleGetFile($event)"> -->
                        </li>
                    </ul>
                </div>
            </div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="整体报价:">
                        <el-input v-model="totalFee" readonly></el-input>
                        <!-- <span>*</span> -->
                    </el-form-item>
                    <el-form-item label="医疗垫付:">
                        <el-input v-model="medicFee" @input="upnum(medicFee)" placeholder='请输入金额($)'></el-input>
                        <!-- <span>*</span> -->
                    </el-form-item>
                    <el-form-item label="案件费用:">
                        <el-input v-model="caseFee" @input="upnum(caseFee)" placeholder='请输入金额($)'></el-input>
                        <!-- <span>*</span> -->
                    </el-form-item>
                    <el-form-item label="救援费用:">
                        <el-input v-model="rescueFee" @input="upnum(rescueFee)" placeholder='请输入金额($)'></el-input>
                        <!-- <span>*</span> -->
                    </el-form-item>
                </el-form>
                <div class="rescue_box">
                    <p>1、{{parentDictName}}</p>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="" disabled checked v-for="(v,ind) in data" :key="ind" v-if="v.dict.parentId!=0">
                            <span class="res_div">{{v.dict.name}}</span>
                            <br/>
                            <span class="res_box" v-show="v.obj.fee==-1">无限额</span>
                            <span class="res_box" v-show="v.obj.fee>0">限额：{{v.obj.fee}}</span>
                            <br v-if="v.obj.fee!=0"/>
                            <span class="res_box">说明：{{v.obj.description}}</span>
                            <br/>
                            <el-input
                            rows="3"
                            type="textarea"
                            placeholder="添加回复"
                            v-model="txt[ind-1]"
                            @input="txtdata"
                            ></el-input>
                        </el-checkbox>
                    </el-checkbox-group>
                        <div class="upbtn_box">
                        <el-button type="primary" @click="flag=true">提交报价及方案报价及方案</el-button>
                        <span @click="cancel()">取消回复</span>
                        </div>
                </div>
           </div>
           <el-dialog
            title="确认回复"
            :visible.sync="flag"
            width="30%"
            center>
            <p style="text-align:center">确认提交后，不可修改，是否确认提交</p>
            <span slot="footer" class="dialog-footer">
                <el-button class="button" style="border-clock:#409EFF" @click="flag = false">修改一下</el-button>
                <el-button class="button" type="primary"  @click="flag = false;tooffer()">确 定</el-button>
            </span>
            </el-dialog>
            <el-dialog
              title="上传方案"
              :visible.sync="imgVisible"
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
                  <p class="p"><el-button center type="button" size="small" @click="uploadFile(),imgVisible=false">确定</el-button></p>
            </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import { Message } from "element-ui";
import constants from '../util/constants.js';
import err from "../util/error2msg.js";
export default {
  data() {
    return {
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      data:[],
      parentDictName:"",
      fileList: [],
      acc_list: [
        {
          icon: "../../../static/images/eles_no.png",
          description: "",
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      checkList: [],
      flag: false,
      obj: {},
      victimList: {},
      totalFee: 0,
      medicFee: "",
      caseFee: "",
      rescueFee: "",
      txt: [],
      txts: "",
      file: null,
      avatar: null,
      url: "",
      imgVisible: false,
      typeId:this.$route.query.typeId,
      caseid:this.$route.query.caseid
    };
  },
  methods: {
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
    up() {
      let flag =constants.isPic(this.url);
      if (flag) {
        this.acc_list.push({
          url: this.url,
          description: this.txts,
          icon:this.url
        });
      } else {
        if (this.url === "") {
          Message.error("请上传附件");
        } else {
          this.acc_list.push({
            url: this.url,
            description: this.txts,
            icon: "../../../static/images/eles_icon.png"
          });
        }
      }
    },
    cancel() {
      this.$router.push({
        name: "Await",
        params: {
          token: this.token
        },
        query: {
          typeId:this.typeId
        }
      });
    },
    handleGetFile(e) {      
      this.file = e.target.files[0];
      this.txts = this.file.name;
      console.log(this.txts+"-"+this.file.name);
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
            console.log(that.acc_list);
            that.url = res.data.obj;
            that.up();
          });
      };
    },
    txtdata() {},
    back() {
      this.$router.push({
        name: "Par",
        params: {
          token: this.$route.params.token
        },
        query: {
          typeId:this.typeId,
          caseid:this.caseid
        }
      });
    },
    tooffer() {
      let that = this;
      let services = [];
      let tUploadCnts = this.acc_list.slice();
      tUploadCnts.shift();
      services.push({
        serviceId: that.data[0].obj.serviceId,
        description: that.data[0].obj.description,
        fee: that.data[0].obj.fee
      });
      that.txt.map((v, i) => {
        services.push({
          id:that.data[i + 1].obj.id,
          serviceId: that.data[i + 1].obj.serviceId,
          description: that.data[i + 1].obj.description,
          fee: that.data[i + 1].obj.fee,
          reply: v
        });
      });
      console.log(services);
      if (!this.totalFee || this.totalFee == 0) {
        Message.error("请添写报价!");
      } else {
        if (this.totalFee == this.rescueFee + this.caseFee + this.medicFee) {
          this.axios
            .post(
              constants.domain+"rescue/bidding/bid_bill",
              qs.stringify({
                token:
                  this.$route.params.token ||
                  JSON.parse(window.localStorage.getItem("data")).data,
                caseId: this.caseid,
                totalFee: this.totalFee,
                medicFee: this.medicFee,
                caseFee: this.caseFee,
                rescueFee: this.rescueFee,
                services: JSON.stringify(services),
                tUploadCnts: JSON.stringify(tUploadCnts),
              })
            )
            .then(data => {
              if(data.data.code != 0){
                var errmsg = err;
                var msg = errmsg.tomsg(data.data.code);
                Message.error(msg);
                return;
              }
              that.$router.push({
                path: "/fac/caseindex/offer",
                name: "Offer",
                params: {
                  token: this.$route.params.token
                },
                query: {
                  typeId:this.$route.query.typeId
                }
              });              
            });
        } else {
          Message.error("请确认输入的数值，总价必须是其他三项之和");
        }
      }
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
        if(data.code == 0){
          for(var i=0;i<data.obj2.length;i++){
            let o = data.obj2[i];
            if(o.dict && o.dict.parentId == 0){
              that.parentDictName = o.dict.name;
              break;
            }
          }

          that.data = data.obj2;
        }else{
            let errmsg = err.tomsg(data.code);
            Message.error(errmsg);
        }
      });

    fetch(constants.domain+"rescue/bidding/view_insti_solution", {
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
          
        }else if(data.code == 101002){
          //第一次报价
        }else{
          let errmsg = err.tomsg(data.code);
          Message.error(errmsg);
        }
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
.acc_box ul {
  display: flex;
}
.acc_box ul li {
  width: 23%;
  margin-left: 2%;
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
  width: 350%;
  margin-top: 20px;
}
.upbtn_box {
  text-align: center;
}
.upbtn_box span {
  color: #00abfa;
  margin-left: 5px;
}
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
.el-button.el-button--default{
  border-color: #409EFF;
  color: #409EFF
}
.el-button.el-button--default.button,.el-button.el-button--primary.button{
  width: 100px;
}
</style>