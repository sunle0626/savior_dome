<template>
    <div class="par_wrap">
        <p class="back_box" @click="back()">
          <img src="../../../static/images/back.png" alt="">
          返回上一页</p>
        <div class="box">
            <h2>查看并操作</h2>
            <ParheaderVue :caseid="caseid" :token="token"/>
            <div class="swi_box">
                <div class="top_box">
                    <p>
                        <router-link :to="{name:'Regparinf',params:{token:token},query: {typeId:this.$route.query.typeId,caseid:this.caseid}}">出险信息</router-link>
                        <router-link :to="{name :'Regparcase',params:{token:token},query: {typeId:this.$route.query.typeId,caseid:this.caseid}}">案件进展</router-link>
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
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';
import ParheaderVue from "../par/parheader.vue";
if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  components: {
    ParheaderVue
  },
  data() {
    return {
      token: this.$route.params.token||
        JSON.parse(window.localStorage.getItem("data")).data,
      obj: {},
      victimList: null,
      casenumber: "AJ200101",
      inf: null,
      init: null,
      obj2: null,
      typeId:this.$route.query.typeId,
      caseid:this.$route.query.caseid
    };
  },
  methods: {
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
        path: "/regulator/caseindex/await",
        name: "RegAwait",
        params: {
          token: that.token
        },
        query: {
          typeId:this.$route.query.typeId
        }
      });
    },
    up(v) {
      console.log(v);
    },
    setdata() {
      let that = this;
      that.$router.push({
        name: "Regparinf",
        params: {
          token: that.token
        },
        query: {
          typeId:that.typeId,
          caseid:that.caseid
        }
      });
    }
  },
  mounted() {
    let that = this;
    // fetch(constants.domain+"rescue/case/detail_case", {
    //   method: "POST",
    //   body: `token=${this.token}&caseId=${that.caseid}`,
    //   mode: "cors",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
    // })
    //   .then(function(res) {
    //     return res.json();
    //   })
    //   .then(function(data) {
    //     that.init = data.obj;
    //     that.obj = data.obj.obj;
    //     that.obj2 = data.obj2;
    //     that.casenumber = data.obj.obj.caseNo;
    //     that.setdata();
    //   });
      that.$router.push({
        name: "Regparinf",
        params: {
          token: that.token
        },
        query: {
          typeId:that.typeId,
          caseid:that.caseid
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