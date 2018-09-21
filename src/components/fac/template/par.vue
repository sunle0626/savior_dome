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
                        <router-link to="/fac/caseindex/par/parinf">出险信息</router-link>
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
      casenumber: "AJ200101",
      inf: {
        time: "报案时间：2018 09.09 9:00",
        user: "报案客户：朱老板",
        sex: "性别：男",
        phone: "报案电话：+861987927197212",
        instime: "出险时间：2018 09.09 9:00",
        null: "-",
        card: "证件号码：32984329849832",
        number: "保单号码：32984329849832",
        pardata: {
          flag: true,
          data: "保单详情"
        },
        belong: "所属保险公司：泰康在线",
        source: "案件信息来源：一键救命",
        exp: "来源说明：一键救命线下创立案件"
      }
    };
  },
  methods: {
    back() {
      this.$router.push("/fac/caseindex/await");
    },
    up(v){
        console.log(v)
    }
  },
  mounted() {
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
.router-link-exact-activem,.router-link-active {
  color: #00abfa;
  background: #fff;
}
</style>