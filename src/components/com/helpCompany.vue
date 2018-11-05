<template>
    <div>
	<div class="contentMenu">
		<div class="marginl10 padding-10">
			<img src="./images/back.png" alt="" class="zh-back" >
			<span class="back-page" @click="back()">返回上一页</span>
		</div>
		<h4 class="marginl10">转交救援公司获取报价</h4>
		<h5 class="marginl10">A、案件基本信息<span class="padding-20">案件编号：AJJ293223</span></h5>
    <div>
    <div class="case_box">
      <ul>
          <li v-for="(v,ind) in inf" :key="ind">
              <span v-if="v.flag" class="btn_box">
                  {{v.data}}
              </span>
              <span v-else>
                  {{v}}
              </span>
          </li>
      </ul>
    </div>
    <h5 class="marginl10">B、出险信息</h5>
    <div class="data_wrap">
    <ul>
        <li v-for="(v,ind) in objdata" :key="ind">
            {{v||''}}
        </li>
        <li>
            <span>事故经过：</span>
            <textarea name="pass" id="passnode" cols="30" rows="10" v-model="def" disabled="disabled">
            </textarea>
        </li>
      </ul>
    </div>

    </div>
    <br/>
    <h5 class="marginl10">C、服务清单</h5>
    <div class="rescue_box"  v-for="(item,ind) in checkList" :key="ind">
        <p>{{ind+1}} 、{{item.name}}</p>
        <el-checkbox-group v-for="(v,ind) in item.list" :key="ind">
            <el-checkbox checked="checked" disabled>
                <span class="res_div">{{v.dict.name}}</span>
                <br/>
                <span class="res_box">说明：{{v.obj.description}}</span>
                <br/>
                <span class="res_box" v-show="v.obj.fee!=0">限额：{{v.obj.fee}}</span>
            </el-checkbox>
        </el-checkbox-group>
    </div>
    <h5 class="marginl10">D、保险公司授权说明及文件</h5>
	<div class="fjdiv" style="margin: 10px 50px;">
			<div >
			<div class="fjred">同意启动，附件是授权文件</div>
			<img src="../../../static/images/fj.png" alt="" class="fjimg fjns" >
			  附件(1)
			</div>
			<img src="../../../static/images/eles_icon.png" alt="" class="zh-scfj" >
			<div style="margin-left: 15px;">
			  指挥中心上传的文件
			</div>
			<div class="ddcx">
			  下载
			</div>
		</div>

    <h5 class="marginl10">E、相关救援说明(指挥中心添加)</h5>
    <div>
      <el-input style="margin: 10px 60px;width: 90%;" type="textarea" placeholder="请抓紧报价，非常感谢，附件是说明文件"></el-input>
    </div>
	
	<div class="fjdiv" style="margin-left: 6%;">
			<div >
			<img src="../../../static/images/fj.png" alt="" class="fjimg" >
			  附件
			</div>
			<img src="images/e.png" alt="" class="zh-scfj" >
			<div class="ddcx" style="margin-left: 42px;">
          <ul>
            <li v-for="(v,ind) in acc_list" :key="ind">
                <img v-if="v.flag" :src="v.url" alt="">
                <img v-else :src="v.icon" alt="">
                <p>{{v.txt}}</p>
                <a @click="imgVisible=true" v-if="ind==0">上传附件</a>
                <!-- <input type="file" name="file" id="filebox" @change="handleGetFile($event)"> -->
            </li>
        </ul>
			</div>
		</div>

    <div style="text-align: center;margin-top:20px;padding-bottom:20px;">
      <el-button type="primary" style="width: 200px;" @click="centerDialogVisible = true">确认转发救援公司</el-button>
    </div>
	</div>

	<el-dialog title="获取报价" :visible.sync="centerDialogVisible" width="30%"  center>
	  <p style="text-align: center;"><span>您正在向救援机构获取报价，确认转发</span></p> 
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="centerDialogVisible = false" size="medium" style="width:170px;">取 消</el-button>
	    <el-button type="primary" @click="centerDialogVisible = false;tooffer()" size="medium" style="width:170px;">确 定</el-button>
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
      <p class="p"><el-button center type="button" size="small" @click="up(),imgVisible=false">确定</el-button></p>
</el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import { Message } from "element-ui";
import err from "../../../static/error2msg.js";
export default {
  data() {
    return {
      imgVisible: false,
      def: "",
      txts: "",
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseid: this.$route.params.caseid,
      obj: this.$route.params.obj[this.$route.params.index],
      victimList: this.$route.params.victimList[this.$route.params.index],
      checkList: [],
      data: null,
      inf: null,
      objdata: [],
      acc_list: [
        {
          url: "",
          txt: ""
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      url:'',
      centerDialogVisible: false,
      typeId:this.$route.query.typeId
    };
  },
  mounted: function() {
    let that = this;
    that.setdata();
    fetch(
      "http://api.test.dajiuxing.com.cn/rescue/bidding/view_case_solution",
      {
        method: "POST",
        body: `token=${this.token}&caseId=${this.caseid}`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.data = data;
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
        console.log(data);
        // that.upload();
      });
  },
  methods: {
    back() {
      let that = this;
      console.log(that.token);
      this.$router.push({
        name: "ComOffer",
        params: {
          token: that.token
        }
      });
    },
    setdata() {
      let that = this;
      let addr = "";
      console.log(this.caseid);
      fetch("http://api.test.dajiuxing.com.cn/rescue/case/detail_case", {
        method: "POST",
        body: `token=${this.token}&caseId=${that.caseid}`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          that.init = data.obj;
          that.obj = data.obj;
          that.victimList = data.obj.victimList;
          console.log(data)
          if (that.init.generalLocation) {
            addr = that.init.generalLocation.addr;
          }
          that.objdata = {
            add:
              "出险地:" +
              (that.init.caseCountry || "") +
              (that.init.caseCity || "") +
              addr,
            type: "事故类型：" + (that.init.obj.accidentType || ""),
            part:
              "受伤部位：" + (that.victimList[0].obj.injuredPart || ""),
            weather: "天气灾害：" + (that.init.obj.weatherTag || "无")
          };
          that.def = that.init.obj.incidentDesc;
          that.inf = {
            time: "报案时间" + that.timestampToTime(that.init.obj.reportTs),
            user: "报案客户：" + (that.init.obj.reportUser || ""),
            sex: "性别：男",
            phone: "报案电话：" + (that.init.obj.reporterContact || ""),
            instime: "出险时间：" + that.timestampToTime(that.init.obj.incidentTs),
            null: "-",
            card: "证件号码：" + (that.victimList[0].obj.idNo || ""),
            number:
              "保单号码：" + (that.victimList[0].obj.insurancePolicyNo || ""),
            pardata: {
              flag: true,
              data: "保单详情"
            },
            belong: "所属保险公司：" + (that.victimList.insuranceCompany || ""),
            source: "案件信息来源：" + (that.obj.caseSrc || ""),
            exp: "来源说明：" + (that.obj.caseSrcDesc || "")
          };
        });
    },
    error2msg(errcode){
      var errmsg = new err();
      var msg = errmsg.tomsg(errcode);
      Message.error(msg);
    },
    tooffer() {
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/bidding/submit_bidding",
          qs.stringify({
            token: this.token,
            caseId: this.caseid
          })
        )
        .then(res => {
          console.log(res);
          if(res.data.code == 0){
            Message({
                message: "操作成功",
                type: "success"
              });
            this.$router.push({
              name:'ComOffer',
              query: {
                typeId:this.typeId
              }
              
            })
          }else{
            this.error2msg(res.data.code);
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
            fetch("http://api.test.dajiuxing.com.cn/rescue/case/upload_cnts", {
              method: "POST",
              body: `token=${that.token}&objId=${that.data.obj.id}&objType=1`,
              mode: "cors",
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
              .then(function(res) {
                //console.log(res);
                return res.json();
              })
              .then(function(data) {
                data.obj.map(v => {
                  that.acc_list.push(v);
                });
              });
            console.log(that.acc_list);
            // that.acc_list[0].url = res.data.obj;
            that.url = res.data.obj;
          });
      };
    },
    timestampToTime(timestamp) {
      if (timestamp) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        var h = date.getHours() + ":";
        var m = date.getMinutes() + ":";
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
      } else {
        return "";
      }
    },
    up() {
      console.log(this.url)
      let flag =
        this.url.endsWith("png") ||
        this.url.endsWith("jpg") ||
        this.url.endsWith("jpeg") ||
        this.url.endsWith("gif");
      console.log(
        this.url.endsWith("png") ||
          this.url.endsWith("jpg") ||
          this.url.endsWith("jpeg") ||
          this.url.endsWith("gif")
      );
      if (flag) {
        this.acc_list.push({
          flag: true,
          url: this.url,
          txt: this.txts
        });
      } else {
        if (this.url === "") {
          Message.error("请上传附件");
        } else {
          this.acc_list.push({
            flag: false,
            url: this.url,
            txt: this.txts,
            icon: "../../../../static/images/eles_icon.png"
          });
        }
      }
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
@import url("./style.css");
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
.el-input-group {
  width: 29%;
}
.selecti {
  text-align: right;
  margin-right: 5px;
}
.newTab td {
  padding: 10px 0px 10px 40px;
}
.rescue_box {
  box-sizing: border-box;
  padding: 0 50px;
}
.rescue_box > p {
  line-height: 40px;
  font-size: 14px;
}
.rescue_box .el-checkbox-group{
  padding-left: 28px;
}
.el-checkbox__inner {
  margin-bottom: 60px;
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
  margin-top: 15px
}
.data_wrap ul li:last-child span,
.data_wrap ul li:last-child textarea {
  float: left;
}
</style>