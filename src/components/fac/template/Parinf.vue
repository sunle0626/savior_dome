<template>
    <div class="pardata_box">
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
</template>

<script>
import qs from "qs";
export default {
  data() {
    let that = this;
    return {
      objId: null,
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      init: this.$route.params.init,
      caseId: this.$route.params.caseId,
      obj: this.$route.params.obj,
      objdata: {
        add: "出险地:",
        type: "事故类型：风险灾害 ",
        part: "受伤部位：腿部 ",
        weather: "天气灾害：气象灾害 "
      },
      acc_list: [],
      checkList: [],
      def: "",
      bid: [],
      inf: null
    };
  },
  methods: {
    toinf() {
      console.log({
        token: this.token,
        init: this.init,
        obj: this.inf,
        data: this.obj,
        caseId: this.caseId
      });
      let that = this;
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/bidding/view_insti_solution",
          qs.stringify({
            token: this.token,
            caseId: this.caseId
          })
        )
        .then(res => {
          console.log(this.$route.params);
          // if (res.data.code === 101006) {
          //   that.$router.push({
          //     path: "/fac/caseindex/inf",
          //     name: "Inf",
          //     params: {
          //       token: this.token,
          //       init:this.init,
          //       obj: this.inf,
          //       data: this.obj,
          //       caseId: this.caseId
          //     }
          //   });
          // }
        });
    },
    upload() {
      let that = this;
      fetch("http://api.test.dajiuxing.com.cn/rescue/case/upload_cnts", {
        method: "POST",
        body: `token=${this.token}&objType=1&objId=${this.objId}`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          console.log(data);
          data.obj.map(function(v) {
            that.acc_list.push({
              url:
                "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=9db129d85c3d269731d30e5d65fbb24f/64380cd7912397dd9c198c165482b2b7d0a287bb.jpg",
              txt: v.description,
              dow: v.url
            });
          });
        });
    }
  },
  mounted() {
    let that = this;
    let addr = "";
    if (that.init.generalLocation) {
      addr = that.init.generalLocation.addr || "";
    }
    this.objdata = {
      add:
        "出险地:" +
        (that.init.caseCountry || "") +
        (that.init.caseCity || "") +
        addr,
      type: "事故类型：" + (that.init.obj.accidentType||""),
      part: "受伤部位：" + (that.init.victimList[0].obj.injuredPart||""),
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
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
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
}
</style>