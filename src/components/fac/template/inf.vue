<template>
    <div class="inf_wrap">
        <p class="back_box" @click="back()">
          <img src="../../../../static/images/back.png" alt="">
          返回上一页
          </p>
        <div class="box_req">
            <h2>回复方案及报价详情</h2>
            <div class="req_box">
                <b>救援方案</b>
                <div class="acc_box">
                    <p>附件<span>*请上传救援方案附件</span></p>
                    <ul>
                        <li v-for="(v,ind) in acc_list" :key="ind">
                            <img :src="v.url" alt="">
                            <p>{{v.txt}}</p>
                            <a @click="imgVisible=true" v-if="ind==0">上传附件</a>
                            <!-- <input type="file" name="file" id="filebox" @change="handleGetFile($event)"> -->
                        </li>
                    </ul>
                </div>
            </div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="整体报价:">
                        <el-input v-model="totalFee"></el-input>
                        <span>*</span>
                    </el-form-item>
                    <el-form-item label="医疗垫付:">
                        <el-input v-model="medicFee" @input="upnum(medicFee)"></el-input>
                        <span>*</span>
                    </el-form-item>
                    <el-form-item label="案件费用:">
                        <el-input v-model="caseFee" @input="upnum(caseFee)"></el-input>
                        <span>*</span>
                    </el-form-item>
                    <el-form-item label="救援费用:">
                        <el-input v-model="rescueFee" @input="upnum(rescueFee)"></el-input>
                        <span>*</span>
                    </el-form-item>
                </el-form>
                <div class="rescue_box">
                    <p v-if="data[0].dict&&data[0].dict.parentId===0">1、{{data[0].dict.name}}</p>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="" disabled checked v-for="(v,ind) in data" :key="ind" v-if="ind>0&&v.dict">
                            <span class="res_div">{{v.dict.name}}</span>
                            <br/>
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
            <p>确认提交后，不可修改，是否确认提交</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="flag = false">修改一下</el-button>
                <el-button type="primary" @click="flag = false;tooffer()">确 定</el-button>
            </span>
            </el-dialog>
            <el-dialog
              title="上传方案"
              :visible.sync="imgVisible"
              class="img_dialog"
              width="50%"
              center>
              <p><span>图片名称</span><el-input
                  type="text"
                  placeholder="上传方案及报价"
                  v-model="txts"
                  ></el-input></p>
                  <p>
                    <span>
                      图片地址
                    </span>
                    <input type="file" name="file" id="filebox" @change="handleGetFile($event)">
                  </p>
                  <p class="p"><el-button center type="button" size="small" @click="up(),imgVisible=false">确定</el-button></p>
            </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import { Message } from "element-ui";
export default {
  data() {
    return {
      data: this.$route.params.data,
      fileList: [],
      acc_list: [
        {
          url: "",
          txt: ""
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      checkList: [],
      flag: false,
      obj: this.$route.params.obj2,
      victimList: this.$route.params.victimList,
      totalFee: this.$route.params.obj.totalFee,
      medicFee: this.$route.params.obj.medicFee,
      caseFee: this.$route.params.obj.caseFee,
      rescueFee: this.$route.params.obj.rescueFee,
      txt: [],
      txts: "",
      file: null,
      avatar: null,
      url: "",
      imgVisible: false
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
      // if (this.acc_list.length > 3) {
      //    Message.error("最多只能上传三个附件哦");
      // } else {
      this.acc_list.unshift({
        url: this.url,
        txt: this.txts
      });
      // }
    },
    cancel() {
      this.$router.push({
        name: "Await",
        params: {
          token: this.token
        }
      });
    },
    handleGetFile(e) {
      let that = this;
      this.file = e.target.files[0];
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
            "http://api.test.dajiuxing.com.cn/rescue/case/upload_file",
            formdata,
            config
          )
          .then(res => {
            // that.acc_list.push({
            //   url: res.data.obj,
            //   txt: ""
            // });
            console.log(that.acc_list);
            // that.acc_list[0].url = res.data.obj;
            that.url = res.data.obj;
          });
      };
    },
    txtdata() {},
    back() {
      this.$router.push({
        name: "Par",
        params: {
          token: this.$route.params.token,
          caseId: this.$route.params.obj.caseId,
          obj: this.obj,
          victimList: this.victimList
        }
      });
    },
    tooffer() {
      let that = this;
      console.log(this.$route.params.caseId);
      let services = [];
      let tUploadCnts = [];
      services.push({
        serviceId: that.data[0].obj.serviceId,
        description: that.data[0].obj.description,
        fee: that.data[0].obj.fee
      });
      that.txt.map((v, i) => {
        services.push({
          serviceId: that.data[i + 1].obj.serviceId,
          description: that.data[i + 1].obj.description,
          fee: that.data[i + 1].obj.fee,
          reply: v
        });
      });
      console.log(services);
      if (!this.caseFee || !this.medicFee || !this.totalFee) {
        Message.error("请完整填写必填项");
      } else {
        if (this.totalFee == this.rescueFee + this.caseFee + this.medicFee) {
          this.axios
            .post(
              "http://api.test.dajiuxing.com.cn/rescue/bidding/bid_bill",
              qs.stringify({
                token:
                  this.$route.params.token ||
                  JSON.parse(window.localStorage.getItem("data")).data,
                caseId: this.$route.params.caseId,
                totalFee: this.totalFee,
                medicFee: this.medicFee,
                caseFee: this.caseFee,
                rescueFee: this.rescueFee,
                services: JSON.stringify(services)
              })
            )
            .then(data => {
              console.log(data.data);
              tUploadCnts.push({
                objType: 2,
                url: this.url,
                objId: data.data.obj
              });
              console.log(tUploadCnts);
              this.axios
                .post(
                  "http://api.test.dajiuxing.com.cn/rescue/case/create_upload_cnt",
                  qs.stringify({
                    token:
                      this.$route.params.token ||
                      JSON.parse(window.localStorage.getItem("data")).data,
                    tUploadCnts: JSON.stringify(tUploadCnts)
                  })
                )
                .then(obj => {
                  console.log(obj);
                });
              that.$router.push({
                path: "/fac/caseindex/offer",
                name: "Offer",
                params: {
                  token: this.$route.params.token,
                  caseId: this.$route.params.obj.caseId
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
    console.log(this.$route.params);
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
</style>