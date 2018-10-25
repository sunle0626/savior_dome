<template>
    <div class="pardata_box">
        <div class="data_wrap">
            <ul>
                <li v-for="(v,ind) in objdata" :key="ind">
                    {{v||''}}
                </li>
                <li>
                    <span>事故经过：</span>
                    <textarea name="pass" id="passnode" cols="30" rows="10" v-model="def">
                    </textarea>
                </li>
            </ul>
        </div>
        <div class="req_box">
           <p><b>B、救援请求</b></p>
           <div class="box_req">
               <ul>
                   <li>
                       <b>A、已申请报价服务机构</b>
                       <div class="org_box">
                            <p v-for="(v,ind) in bid" :key="ind">
                             {{v.instiCountry}} ------{{v.insti.category}}------{{v.insti.name}}</p>
                       </div>
                   </li>
                   <li>
                       <b>B、服务清单</b>
                       <div class="rescue_box">
                         <div class="box" v-for="(v,ind) in obj" :key="ind">
                          <p v-if="v.dict.parentId===0">{{v.dict.name}}</p>
                         </div>
                         <div class="box">
                           <el-checkbox-group v-model="checkList">
                              <el-checkbox label="医疗机构推介" disabled checked v-for="(v,ind) in obj" :key="ind" v-if="ind>0">
                                    <span class="res_div">{{v.dict.name}}</span>
                                    <br/>
                                    <span class="res_box">说明：{{v.obj.description}}</span>
                                </el-checkbox>
                            </el-checkbox-group>
                         </div>
                           <p></p>
                            <p>2、费用担保</p>
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="医疗机构推介" disabled checked>
                                    <span class="db_div">医疗费用担保或非医疗费用担保</span>
                                    <span class="db_box">限额<b>$10000</b></span>
                                </el-checkbox>
                            </el-checkbox-group>
                       </div>
                   </li>
               </ul>
           </div>
           <p><b>C、江泰指挥中心救援整体说明</b></p>
           <div class="box_exp">
             <p><span class="res_box_exp">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span></p>
             <div class="exp_box">
                <span>附件({{acc_list.length}})</span>
                  <div class="acc_box">
                      <ul>
                          <li v-for="(v,ind) in acc_list" :key="ind">
                              <img :src="v.url" alt="">
                              <p>{{v.txt}}</p>
                              <a :href="v.dow" :download="v.dow">下载</a>
                          </li>
                      </ul>
                  </div>
             </div>
           </div>
            <p><b>D、添加整体说明</b></p>
           <div class="com_exp">
              <textarea name="exp" id="exp" cols="30" rows="10" v-model="exp">
            </textarea>
             <div class="exp_box">
                <span>附件</span>
                <div class="up_acc">
                  <ul>
                    <li v-for="(v,i) in up_acc" :key="i">
                      <img v-if="v.flag" :src="v.url" alt="">
                      <img v-else :src="v.icon" alt="">
                      <p>{{v.txt}}</p>
                      <span class="up_span" @click="upacc=true" v-if="i==0">上传</span>
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
          <p class="p"><el-button center type="button" size="small" @click="up(),upacc=false">确定</el-button></p>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    let that = this;
    return {
      upacc: false,
      exp: "同意附件是授权文件",
      objId: null,
      token: this.$route.params.token,
      init: this.$route.params.init,
      caseId: this.$route.params.caseId,
      obj: this.$route.params.obj,
      txts: "",
      objdata: {
        add: "出险地:",
        type: "事故类型：风险灾害 ",
        no: "是否团险：是",
        part: "受伤部位：腿部 ",
        weather: "天气灾害：气象灾害 "
      },
      acc_list: [
        {
          url: "../../../../static/images/eles_icon.png",
          txt: "指挥中心上传的附件"
        }
      ],
      up_acc: [
        {
          url: "",
          txt: "",
          flag: true
        }
      ],
      checkList: [],
      def: "",
      bid: [],
      inf: null,
      url: ""
    };
  },
  methods: {
    apply() {
      let that = this;
      let tUploadCnts = [];
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/bidding/author_rescue",
          qs.stringify({
            token: this.token, //token值     
            caseId: this.caseId, //caseid
            stateText: this.exp //说明
          })
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code === 0) {
            that.up_acc.map(v => {
              tUploadCnts.push({
                objType: 1,
                url: v.url,
                objId: that.caseId,
                description: v.txt
              });
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
              path: "/reg/caseindex/await",
              name: "RegAwait",
              params: {
                token: this.token,
                obj: this.inf,
                data: this.obj
              }
            });
          }
        });
    },
    up() {
      console.log(this.url);
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
        this.up_acc.push({
          flag: true,
          url: this.url,
          txt: this.txts
        });
      } else {
        this.up_acc.push({
          flag: false,
          url: this.url,
          txt: this.txts,
          icon: "../../../../static/images/eles_icon.png"
        });
      }
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
            that.url = res.data.obj;
          });
      };
    }
  },
  mounted() {
    console.log(this.$route.params);
    let that = this;
    let addr = "";
    if (that.init.generalLocation) {
      addr = that.init.generalLocation.addr;
    }
    this.objdata = {
      add:
        "出险地:" +
        (that.init.caseCountry || "") +
        (that.init.caseCity || "") +
        addr,
      type: "事故类型：" + (that.init.obj.accidentType || ""),
      no: "是否团险：" + (that.init.obj.caseInsured ? "是" : "无"),
      part: "受伤部位：" + (that.init.victimList[0].obj.injuredPart || ""),
      weather: "天气灾害：" + (that.init.obj.weatherTag || "无")
    };
    this.def = that.init.obj.incidentDesc;
    fetch("http://api.test.dajiuxing.com.cn/rescue/bidding/bidders", {
      method: "POST",
      body: `token=${this.token}&caseId=${this.caseId}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.bid = data.obj;
      });
    fetch(
      "http://api.test.dajiuxing.com.cn/rescue/bidding/view_case_solution",
      {
        method: "POST",
        body: `token=${this.token}&caseId=${this.caseId}`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.inf = data.obj;
        that.objId = data.obj.id;
        if (that.obj.length <= 0) {
          that.obj = data.obj2;
        }
        console.log(data);
        // that.upload();
      });
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
}
.data_wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
}
.data_wrap ul {
  width: 100%;
}
.data_wrap ul li {
  height: 50px;
  line-height: 50px;
}
.data_wrap ul li:last-child textarea {
  width: 80%;
  height: 80px;
  border: 0;
  border: 1px solid #d9ddde;
  border-radius: 5px;
  font-size: 15px;
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
.req_box > p > b {
  font-size: 14px;
}
.exp_box {
  box-sizing: border-box;
  padding: 10px 32px;
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
  justify-content: space-around;
}
.up_acc ul li {
  text-align: center;
  width: 22%;
}
.up_acc ul li img {
  display: inline-block;
  width: 90px;
  height: 120px;
}
</style>