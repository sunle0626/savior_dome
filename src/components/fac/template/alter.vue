<template>
    <div class="inf_wrap">
        <p class="back_box" @click="back()">
          <img src="../../../../static/images/back.png" alt="">
          返回上一页
          </p>
          <h2>修改报价</h2>
        <div class="box_req">
            <h2>方案及报价详情</h2>
            <div class="req_box">
                <b>救援方案</b>
                <div class="acc_box">
                    <p>附件<span>*请上传救援方案附件</span></p>
                    <ul>
                        <li v-for="(v,ind) in acc_list" :key="ind">
                            <img :src="v.url" alt="">
                            <p>{{v.txt}}</p>
                            <input type="file" name="file" id="filebox" @change="handleGetFile($event)">
                        </li>
                    </ul>
                </div>
            </div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="整体报价:">
                        <el-input v-model="totalFee" placeholder="请输入金额($)"></el-input>
                        <span>*</span>
                    </el-form-item>
                    <el-form-item label="医疗垫付:">
                        <el-input v-model="medicFee" placeholder="请输入金额($)"></el-input>
                        <span>*</span>
                    </el-form-item>
                    <el-form-item label="案件费用:">
                        <el-input v-model="caseFee" placeholder="请输入金额($)"></el-input>
                        <span>*</span>
                    </el-form-item>
                    <el-form-item label="救援费用:">
                        <el-input v-model="rescueFee" placeholder="请输入金额($)"></el-input>
                        <span>*</span>
                    </el-form-item>
                    </el-form>
                <div class="rescue_box" v-for="(item,ind) in checkList" :key="ind">
                    <p>{{item.name}}</p>
                    <el-checkbox-group v-for="(v,ind) in item.list" :key="ind">
                        <el-checkbox label="医疗机构推介" disabled checked>
                            <span class="res_div">{{v.dict.name}}</span>
                            <br/>
                            <span class="res_box">说明：{{v.obj.description}}</span>
                            <br/>
                            <el-input
                            rows="3"
                            type="textarea"
                            placeholder="添加回复"
                            v-model="v.obj.reply"></el-input>
                        </el-checkbox>
                        
                    </el-checkbox-group>
                        <div class="upbtn_box">
                        <el-button type="primary" @click="flag=true;">确定修改报价及方案</el-button>
                        <span @click="back">取消修改</span>
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
                <el-button type="primary" @click="flag = false;tooffer();back()">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      acc_list: [
        {
          url:
            "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=9db129d85c3d269731d30e5d65fbb24f/64380cd7912397dd9c198c165482b2b7d0a287bb.jpg",
          txt: "上传方案及报价"
        }
      ],
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseid: this.$route.params.caseid,
      rescueFee: "",
      medicFee: "",
      caseFee: "",
      totalFee: "",
      formInline: {
        user: "",
        region: ""
      },
      checkList: [],
      parentObj: [],
      flag: false,
      id: 0,
      txt: [],
      data: null,
      url: ""
    };
  },
  methods: {
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
            that.acc_list[0].url = res.data.obj;
            that.url = res.data.obj;
          });
      };
    },
    tooffer() {
      let that = this;
      let services = [];
      let tUploadCnts = [];
      this.checkList[0].list.map((v, i) => {
        console.log(that.data[i].obj);
        console.log(v.obj.reply);
        services.push({
          id: that.data[i + 1].obj.id,
          serviceId: that.data[i + 1].obj.serviceId,
          description: that.data[i + 1].obj.description,
          reply: v.obj.reply
        });
      });
      console.log(this.$route.params.caseid);
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/bidding/alter_bill_assist",
          qs.stringify({
            token:
              this.$route.params.token ||
              JSON.parse(window.localStorage.getItem("data")).data,
            caseId: this.$route.params.caseid,
            id: this.id,
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
            url: that.url,
            objId: that.id
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
        });
    },
    back() {
      this.$router.push({
        name: "lookinf",
        params: {
          token:
            this.$route.params.token ||
            JSON.parse(window.localStorage.getItem("data")).data,
          caseid: this.$route.params.caseid
        }
      });
    }
  },
  mounted() {
    let that = this;
    console.log(this.token);
    let n = 0;
    fetch(
      "http://api.test.dajiuxing.com.cn/rescue/bidding/view_insti_solution",
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
        console.log(data);
        that.id = data.obj.id;
        that.rescueFee = data.obj.rescueFee;
        that.medicFee = data.obj.medicFee;
        that.caseFee = data.obj.caseFee;
        that.totalFee = data.obj.totalFee;
        that.data = data.obj2;
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
</style>