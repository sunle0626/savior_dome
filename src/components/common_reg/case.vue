<template>
    <div class="case_box">
        <div class="top_box">
            <div class="wel_box">
                尊敬的{{insti.name||username}}，欢迎登录
            </div>
            <div class="num_box">
              当前服务剩余<b style="margin:0 5px">{{time}}</b>天
              <span style="margin:0 10px">续费</span>
            </div>
            <div class="view_box">
                <span>进行中案件:<b>{{casename}}</b><b>({{casenum}})</b></span>
                <small class="pointer_box" @click="lookinf">立即查看</small>
            </div>
        </div>
        <purchase :purchasedata='purchasedata'/>
        <div class="bottom_box">
            <ul class="bottom_ul">
                <li v-for="(v,ind) in case_list" :key="ind">
                    <img :src="v.icon" alt="">
                    <h3>
                        {{v.name}}
                    </h3>
                    <p>
                        {{v.descrition}}
                    </p>
                    <!-- {{v.id}} -->
                    <b class="pointer_box" v-if="num_list[v.id]" @click="tocase(v.id)">
                        案件管理({{num_list[v.id]}})
                    </b>
                    <b class="pointer_box" v-else @click="tocase(v.id)">
                        案件管理
                    </b>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Message } from "element-ui";
import purchase from "./purchase.vue";
export default {
  components: {
    purchase
  },
  props: ["insti", "token"],
  data() {
    return {
      username: "XXX",
      casename: "门诊治疗",
      casenum: 0,
      name: "",
      time: 0,
      case_list: [],
      purchasedata: [],
      num_list: [],
      typeId:1
    };
  },
  methods: {
    tocase(id) {
      let token = this.token;
      let insti = this.insti;
      window.localStorage.setItem(
        "case",
        JSON.stringify({
          case: "RegAwait"
        })
      );
      // if (this.case_list[ind].num > 0) {
      //   this.$router.push({
      //     name: "RegAwait",
      //     params: {
      //       token: token,
      //       insti: insti,
      //       flag: true
      //     }
      //   });
      // } else {
        this.typeId = id;
        this.$router.push({
          name: "RegAwait",
          params: {
            token: token,
            insti: insti,
            flag: false
          },
          query: {
            typeId:id
          }
        });
      // }
    },
    lookinf() {
      let token = this.token;
      let insti = this.insti;
      this.$router.push({
        name: "RegAwait",
        params: {
          token: token,
          insti: insti
        }
      });
    }
  },
  mounted() {
    let data = "";
    if (JSON.parse(window.localStorage.getItem("case"))) {
      data = JSON.parse(window.localStorage.getItem("case")).case;
    }
    this.name = data;
    // console.log(this.token);
    let that = this;
    let arr = [1, 2, 3, 4, 5];
    fetch("http://api.test.dajiuxing.com.cn/rescue/user/get_contract", {
      method: "POST",
      body: `token=${this.token}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log(data);
        let time = data.obj.tsEnd - data.obj.tsStart;
        that.time = parseInt(time / 86400000000);
      });
    fetch("http://api.test.dajiuxing.com.cn/rescue/user/regulator_service", {
      method: "POST",
      body: `token=${this.token}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        that.purchasedata = data.obj;
      });
    fetch(
      "http://api.test.dajiuxing.com.cn/rescue/service_plan/level_service",
      {
        method: "POST",
        body: `token=${this.token}&parentId=0`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        that.case_list = data.obj;
        console.log(data);
      });
    fetch("http://api.test.dajiuxing.com.cn/rescue/case/batch_case_count", {
      method: "POST",
      body: `token=${this.token}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        console.log(res);
        return res.json();
      })
      .then(function(data) {
        that.num_list = data.obj;
        console.log(that.num_list);
      });
    // if (this.name) {
    //   this.$router.push({
    //     name: this.name,
    //     params: {
    //       token: this.token,
    //       insti: this.insti
    //     }
    //   });
    //   window.localStorage.removeItem("case");
    // } else {
    //   console.log(0);
    // }
  }
};
</script>

<style scoped>
.case_box {
  width: 100%;
  background: #f2f2f2;
}
.top_box {
  height: 80px;
  line-height: 80px;
}
.wel_box {
  float: left;
  margin-left: 200px;
  font-size: 18px;
  color: #666;
}
.view_box {
  float: right;
  margin-right: 180px;
  font-size: 18px;
  color: #666;
}
.num_box {
  float: left;
  margin-left: 190px;
  font-size: 16px;
  color: #666;
}
.num_box b {
  color: #ff7200;
  font-weight: normal;
  font-size: 22px;
}
.num_box span {
  background: #ff7200;
  color: #fff;
  border: 1px solid #ff7200;
  border-radius: 15px;
  padding: 3px 15px;
}
.view_box b:first-child {
  font-weight: 500;
  color: #000;
  font-size: 18px;
  margin-left: 10px;
}
.view_box b:last-child {
  font-weight: 500;
  font-size: 18px;
  color: #ff8e32;
  margin-right: 10px;
}
.view_box small {
  display: inline-block;
  height: 26px;
  width: 90px;
  line-height: 26px;
  border-radius: 15px;
  color: #fff;
  background: #ff8e32;
  font-size: 14px;
}
.bottom_box {
  width: 100%;
  padding-top: 18px;
  background: #fff;
}
.bottom_ul {
  width: 76%;
  height: 270px;
  margin-left: 12%;
  margin-right: 12%;
  padding-top: 40px;
  display: flex;
  justify-content: space-around;
}
.bottom_ul li {
  width: 18%;
  float: left;
}
.bottom_ul li h3 {
  font-size: 18px;
  margin-top: 10px;
  font-weight: 500;
  color: #333;
}
.bottom_ul li p {
  box-sizing: border-box;
  margin-top: 10px;
  height: 80px;
  padding: 0 15px;
  color: #999;
}
.bottom_ul li b {
  color: #ff7200;
  font-size: 16px;
  text-decoration: underline;
}
@media screen and (min-width: 1280px) and (max-width: 1366px){
  .bottom_ul li p {
    font-size: 16px;
  }
  .bottom_ul li b {
    font-size: 12px;
  }
}
</style>