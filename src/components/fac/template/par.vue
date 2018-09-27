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
                        <router-link to="/fac/caseindex/par/parcase" >案件进展</router-link>
                    </p>
                </div>
                <div class="bottom_box">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token: this.$route.params.token,
      obj: this.$route.params.obj[this.$route.params.index],
      victimList: this.$route.params.victimList[this.$route.params.index],
      casenumber: "AJ200101",
      inf: null,
      init: null,
      obj2:null
    };
  },
  methods: {
    timestampToTime(timestamp) {
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
    setdata() {
      console.log(this.obj)
      let that = this;
      this.inf = {
        time: "报案时间" + that.timestampToTime(that.obj.reportTs),
        user: "报案客户：" + that.obj.reportUser,
        sex: "性别：男",
        phone: "报案电话：" + that.victimList.obj.contact,
        instime: "出险时间：" + that.timestampToTime(that.obj.incidentTs),
        null: "-",
        card: "证件号码：" + that.victimList.obj.idNo,
        number: "保单号码：" + that.victimList.obj.insurancePolicyNo,
        pardata: {
          flag: true,
          data: "保单详情"
        },
        belong: "所属保险公司：" + that.init.obj.caseSrc,
        source: "案件信息来源：" + that.obj.caseSrc,
        exp: "来源说明：" + that.obj.caseSrcDesc
      };
    }
  },
  mounted() {
    console.log(this.victimList);
    this.casenumber = this.obj.caseNo;
    let that = this;
    fetch("http://api.test.dajiuxing.com.cn/1.0/rescue/case/detail_case", {
      method: "POST",
      body: `token=${this.token}&caseId=${that.victimList.obj.caseId}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.init = data.obj;
        that.obj2 = data.obj2;
        that.setdata();
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
</style>