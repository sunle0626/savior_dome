<template>
    <div class="par_wrap">
        <p class="back_box" @click="back()">
          <img src="../../../../static/images/back.png" alt="">
          返回上一页</p>
        <div class="box">
            <h2>查看并操作</h2>
            <div class="case_box">
                <p><b>A、案件基本信息</b> <span>案件编号：{{casenumber}}</span></p>
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
            <div class="swi_box">
                <div class="top_box">
                    <p>
                        <router-link :to="{name:'parinf',params:{token:token,init:init,caseId:obj.id,obj:obj2}}">出险信息</router-link>
                        <router-link :to="{name :'parcase',params:{token:token,caseId:obj.id}}">案件进展</router-link>
                    </p>
                </div>
                <div class="bottom_box">
                  <keep-alive>
                    <router-view></router-view>
                  </keep-alive>
                </div>
                        <div class="req_box">
           <p><b>B、救援请求</b></p>
           <div class="box_req">
               <ul>
                   <li>
                       <!-- <b>A、已申请报价服务机构</b>
                       <div class="org_box">
                            <p v-for="(v,ind) in bid" :key="ind">
                             {{v.instiCountry}} ------{{v.insti.category}}------{{v.insti.name}}</p>
                       </div> -->
                   </li>
                   <li>
                       <b>B、服务清单</b>
                       <div class="acc_box">
                           <p>相关附件({{acc_list.length}})</p>
                           <ul>
                               <li v-for="(v,ind) in acc_list" :key="ind">
                                   <img :src="v.url" alt="">
                                   <p>{{v.txt}}</p>
                                   <a :href="v.dow" :download="v.dow">下载</a>
                               </li>
                           </ul>
                       </div>
                       <div class="rescue_box">
                         <div class="box" v-for="(v,ind) in obj2" :key="ind">
                        <p v-if="v.dict&&v.dict.parentId===0">{{v.dict.name}}</p>
                         <div v-if="v.dict&&v.dict.parentId===0" class="box">
                           <el-checkbox-group v-model="checkList">
                              <el-checkbox label="医疗机构推介" disabled checked v-for="(v,ind) in obj2" :key="ind" v-if="ind>0&&v.dict">
                                    <span class="res_div">{{v.dict.name}}</span>
                                    <br/>
                                    <span class="res_box">说明：{{v.obj.description}}</span>
                                </el-checkbox>
                            </el-checkbox-group>
                         </div>
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
               <div class="upbtn_box">
                   <el-button type="primary" @click="toinf">回复报价及方案</el-button>
               </div>
           </div>
        </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      obj: this.$route.params.obj[this.$route.params.index],
      victimList: this.$route.params.victimList[this.$route.params.index],
      casenumber: "AJ200101",
      inf: null,
      init: null,
      obj2: null,
      acc_list: [],
      checkList: [],
      bid: []
    };
  },
  methods: {
    toinf() {
      let that = this;
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/bidding/view_insti_solution",
          qs.stringify({
            token: this.token,
            caseId: this.obj.id
          })
        )
        .then(res => {
          if (res.data.code === 101006) {
            that.$router.push({
              path: "/fac/caseindex/inf",
              name: "Inf",
              params: {
                token: this.token,
                init: this.init,
                obj: this.inf,
                data: this.obj,
                caseId: this.obj.id
              }
            });
          }
        });
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
    back() {
      let that = this;
      console.log(that.token);
      this.$router.push({
        path: "/fac/caseindex/await",
        name: "Await",
        params: {
          token: that.token
        }
      });
    },
    up(v) {
      console.log(v);
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
    },
    setdata() {
      console.log(this.$route.params.obj);
      let that = this;
      this.inf = {
        time: "报案时间" + that.timestampToTime(that.obj.reportTs),
        user: "报案客户：" + (that.obj.reportUser || ""),
        sex: "性别：男",
        phone: "报案电话：" + (that.victimList.obj.contact || ""),
        instime: "出险时间：" + that.timestampToTime(that.obj.incidentTs),
        null: "-",
        card: "证件号码：" + (that.victimList.obj.idNo || ""),
        number: "保单号码：" + (that.victimList.obj.insurancePolicyNo || ""),
        pardata: {
          flag: true,
          data: "保单详情"
        },
        belong: "所属保险公司：" + (that.victimList.insuranceCompany || ""),
        source: "案件信息来源：" + (that.obj.caseSrc || ""),
        exp: "来源说明：" + (that.obj.caseSrcDesc || "")
      };
      this.$router.push({
        name: "parinf",
        params: {
          token: this.token,
          init: this.init,
          caseId: this.obj.id,
          obj: this.obj2
        }
      });
    }
  },
  mounted() {
    this.casenumber = this.obj.caseNo;
    let that = this;
    fetch("http://api.test.dajiuxing.com.cn/rescue/case/detail_case", {
      method: "POST",
      body: `token=${this.token}&caseId=${that.victimList.obj.caseId}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data);
        that.init = data.obj;
        that.obj2 = data.obj2;
        that.setdata();
      });
    fetch("http://api.test.dajiuxing.com.cn/rescue/bidding/bidders", {
      method: "POST",
      body: `token=${this.token}&caseId=${this.obj.id}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.bid = data.obj;
      });        
    console.log(this.$route.params);
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #999;
}
.par_wrap {
  width: 100%;
}
.back_box {
  text-align: left;
  font-size: 14px;
  line-height: 45px;
  color: #666;
  cursor: pointer;
}
.box {
  width: 100%;
  text-align: left;
}
.box > h2 {
  font-size: 20px;
  color: #333;
  font-weight: 600;
  line-height: 45px;
}
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
  width: 33%;
  text-indent: 3em;
  display: inline-block;
  line-height: 42px;
  border-right: #d9ddde 1px solid;
  border-top: #d9ddde 1px solid;
}
.case_box ul li:nth-child(3n) {
  text-align: center;
  text-indent: 0;
  border-right: 0;
}
.case_box ul li:first-child,
.case_box ul li:nth-child(2),
.case_box ul li:nth-child(3) {
  border-top: 0;
}
.btn_box {
  color: #00abfa;
  cursor: pointer;
}
.top_box {
  width: 100%;
}
.top_box p {
  width: 260px;
  background: #f2f5f8;
  margin: 30px auto;
  height: 40px;
  text-align: center;
}
.top_box p a {
  display: inline-block;
  width: 120px;
  height: 30px;
  margin-top: 5px;
  line-height: 30px;
  text-align: center;
}
.router-link-exact-activem,
.router-link-active {
  color: #00abfa;
  background: #fff;
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