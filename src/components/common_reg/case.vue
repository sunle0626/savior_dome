<template>
    <div class="case_box">
        <div class="top_box">
            <div class="wel_box">
                尊敬的{{insti.name||username}}，欢迎登录
            </div>
            <div class="view_box">
                <span>进行中案件:<b>{{casename}}</b><b>({{casenum}})</b></span>
                <small @click="lookinf">立即查看</small>
            </div>
        </div>
        <div class="bottom_box">
            <ul class="bottom_ul">
                <li v-for="(v,ind) in case_list" :key="ind">
                    <img :src="v.icon" alt="">
                    <h3>
                        {{v.txt}}
                    </h3>
                    <p>
                        {{v.tit}}
                    </p>

                    <b v-if="v.num" @click="tocase(ind)">
                        案件管理({{v.num}})
                    </b>
                    <b v-else @click="tocase(ind)">
                        案件管理
                    </b>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  props: ["insti", "token"],
  data() {
    return {
      username: "XXX",
      casename: "门诊治疗",
      casenum: 0,
      name: "",
      case_list: [
        {
          txt: "医疗救援",
          tit: "包含门急诊就医、住院安排医疗转运全流程",
          num: "",
          id: 0,
          icon: "./static/images/com_images/icon_01.png"
        },
        {
          txt: "门急诊就医",
          tit: "客人门诊急诊就医服务",
          num: "",
          id: 1,
          icon: "./static/images/com_images/icon_02.png"
        },
        {
          txt: "住院安排",
          tit: "协助安排当地的住院服务",
          num: "",
          id: 2,
          icon: "./static/images/com_images/icon_03.png"
        },
        {
          txt: "医疗转运/送返",
          tit: "安排当地门诊及治疗",
          num: "",
          id: 3,
          icon: "./static/images/com_images/icon_04.png"
        },
        {
          txt: "星使服务",
          tit: "可安排当地向导陪同服务",
          num: "",
          id: 4,
          icon: "./static/images/com_images/icon_05.png"
        }
      ]
    };
  },
  methods: {
    tocase(ind) {
      let token = this.token;
      let insti = this.insti;
      window.localStorage.setItem(
        "case",
        JSON.stringify({
          case: "Await"
        })
      );
      if (this.case_list[ind].num > 0) {
        this.$router.push({
          name: "Await",
          params: {
            token: token,
            insti: insti,
            flag: true
          }
        });
      } else {
        this.$router.push({
          name: "Await",
          params: {
            token: token,
            insti: insti,
            flag: false
          }
        });
      }
    },
    lookinf() {
      let token = this.token;
      let insti = this.insti;
      this.$router.push({
        name: "Await",
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
        console.log(data.obj);
        arr.map(function(v) {
          console.log(data.obj[v]);
          if (data.obj[v]) {
            that.case_list[v].num = data.obj[v];
            that.casenum += data.obj[v];
          }
          console.log(data.obj[v]);
        });
      });
    if (this.name) {
      this.$router.push({
        name: this.name,
        params: {
          token: this.token,
          insti: this.insti
        }
      });
      window.localStorage.removeItem("case");
    } else {
      console.log(0);
    }
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
  font-size: 22px;
  color: #666;
}
.view_box {
  float: right;
  margin-right: 180px;
  font-size: 22px;
  color: #666;
}
.view_box b:first-child {
  font-weight: 500;
  color: #000;
  font-size: 20px;
}
.view_box b:last-child {
  font-weight: 500;
  font-size: 18px;
  color: #ff8e32;
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
}
.bottom_ul {
  width: 76%;
  height: 270px;
  margin-left: 12%;
  margin-right: 12%;
}
.bottom_ul li {
  width: 20%;
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
  height: 50px;
  padding: 0 15px;
  color: #999;
}
.bottom_ul li b {
  color: #ff7200;
  font-size: 16px;
  text-decoration: underline;
}
</style>