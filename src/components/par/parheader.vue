<template>
        <div class="case_box">
                <p><b>A、案件基本信息</b> <span>案件编号：{{casenumber}}</span></p>
                <ul>
                    <li v-for="(v,ind) in inf" :key="ind">
                        <span v-if="v.flag" class="btn_box" @click="tourl(v.url)">
                            {{v.data}}
                        </span>
                        <span v-else>
                            {{v}}
                        </span>
                    </li>
                </ul>
          </div>
</template>

<script>

import qs from "qs";
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  props: ["caseid", "token"],
  data() {
    return {
      inf:{},
      casenumber:"",
      usertype: JSON.parse(window.localStorage.getItem("usertype")).data
    }
  },
  methods:{
    
    tourl(url){
      if(url!=""){
        window.open(url);
      }
    }
  },
  
  mounted(){
    let z = this;
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
        z.casenumber = data.obj.obj.caseNo;
        let o = data.obj.obj;
        let victimList = data.obj.victimList[0].obj;
        let reportUser = o.reportUser || "";
        let reportPhone = o.reporterContact || "";
        if(z.usertype == 0){
          reportUser = constants.strHidden(reportUser,1);
          reportPhone = constants.strHidden(reportPhone);
        }

        z.inf = {
        time: "报案时间：" + constants.time(o.reportTs),
        user: "报案客户：" + reportUser,
        sex: "性别：男",
        phone: "报案电话：" + reportPhone,
        instime: "出险时间：" + constants.time(o.incidentTs),
        null: "-",
        card: "证件号码：" + (victimList.idNo || ""),
        number: "保单号码：" + (victimList.insurancePolicyNo || ""),
        pardata: {
          flag: true,
          data: "保单详情",
          url:(victimList.insurancePaper||"")
        },
        belong: "所属保险公司：" + (data.obj.victimList[0].insuranceCompany || ""),
        source: "案件信息来源：" + (o.caseSrc || ""),
        exp: "来源说明：" + (o.caseSrcDesc || "")
      };
    });
    
  }

};
</script>
<style scoped>
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
</style>
