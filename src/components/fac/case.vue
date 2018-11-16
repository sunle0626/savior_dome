<template>
    <div class="case_box">
        <div class="top_box">
            <div class="wel_box">
                尊敬的{{insti.name||username}}，欢迎登录
            </div>
            <div class="view_box">
                <span>进行中案件:</span>
                <!-- <small @click="lookinf">立即查看</small> -->
                  <el-select v-model="casename" placeholder="立即查看" @change="tocase(casename)">
                    <el-option
                      v-for="item in case_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      >
                      <span style="float: left">{{item.name}}</span>
                      <span style="float: right; color: #8492a6; font-size: 0.8125vw">({{num_list[item.id]}})</span>
                    </el-option>
                  </el-select>
            </div>
        </div>
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

                    <b  class="pointer_box" v-if="num_list[v.id]" @click="tocase(v.id)">
                        案件管理({{num_list[v.id]}})
                    </b>
                    <b  class="pointer_box" v-else @click="tocase(v.id)">
                        案件管理
                    </b>
                </li>
            </ul>
        </div>
        <!-- <Messagebox :obj='obj'/> -->
        <!-- 此处调用了消息框 -->
    </div>
</template>

<script>
import "isomorphic-fetch";
import constants from "../util/constants.js";
import Promise from "promise-polyfill";
// import Messagebox from "../Tips_box/message_box.vue";

if (!window.Promise) {
  window.Promise = Promise;
}
import { Message } from "element-ui";
export default {
  // components: {
  //   Messagebox
  // },
  props: ["insti", "token"],
  data() {
    return {
      username: "XXX",
      casename: "案件管理",
      casenum: 0,
      name: "",
      num_list: [],
      case_list: [],
      typeId: 1,
      // obj: {
      //   flag:true,
      //   title:'最新进展',
      //   token: 'L2000000000400edc56e3300000Nxl4ORf4D'
      // }
    };
  },
  updated() {
    this.casename = "";
  },
  methods: {
    to(item) {
      console.log(item);
    },
    tocase(id) {
      let token = this.token;
      let insti = this.insti;
      this.typeId = id;
      let name = "";
      console.log(this.case_list);
      this.case_list.map(v => {
        if (v.id == id) {
          name = v.name;
        }
      });
      window.localStorage.setItem(
        "case",
        JSON.stringify({
          case: "Await"
        })
      );
      this.$router.push({
        name: "Await",
        params: {
          token: token,
          insti: insti,
          flag: false
        },
        query: {
          typeId: id,
          name: name
        }
      });
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
    let that = this;
    fetch(constants.domain + "rescue/service_plan/level_service", {
      method: "POST",
      body: `token=${this.token}&parentId=0`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        that.case_list = data.obj;
        console.log(data);
        fetch(constants.domain + "rescue/case/batch_case_count", {
          method: "POST",
          body: `token=${this.token}&status=140&status=150&status=180`,
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
      });
  }
};
</script>

<style scoped>
@import url(../../css/case.css);
/* .case_box {
  width: 100%;
  background: #f2f2f2;
}
.top_box {
  height: 5vw;
  line-height: 5vw;
}
.wel_box {
  float: left;
  margin-left: 11.6vw;
  font-size: 20px;
  color: #666;
}
.view_box {
  float: right;
  margin-right: 11.5vw;
  font-size: 1.14vw;
  color: #666;
}
.view_box span{
    color: #333333;
	opacity: 0.88;
    font-size: 20px;
}
.view_box b:first-child {
  font-weight: 500;
  color: #000;
  font-size: 1.125vw;
  margin-left: 0.625vw;
}
.view_box b:last-child {
  font-weight: 500;
  font-size: 1.125vw;
  color: #ff8e32;
  margin-right: 0.625vw;
}
.view_box small {
  display: inline-block;
  height: 1.625vw;
  width: 5.625vw;
  line-height: 1.625vw;
  border-radius: 0.9375vw;
  color: #fff;
  background: #ff8e32;
  font-size: 0.875vw;
}
.bottom_box {
  width: 100%;
}
.bottom_ul {
  width: 76%;
  height: 15vw;
  margin-left: 12%;
  margin-right: 12%;
  padding-top: 2.5vw;
  display: flex;
  justify-content: space-around;
}
.bottom_ul li {
  width: 20%;
  float: left;
  text-align:center;
}
.bottom_ul li img{
  width: 5.5vw;
}
.bottom_ul li h3 {
  font-size: 1.2vw;
  margin-top: 0.625vw;
  font-weight: 500;
  color: #333;
}
.bottom_ul li p {
  box-sizing: border-box;
  margin-top: 0.625vw;
  font-size: 0.9vw;
  padding: 0 0.9375vw;
  height: 3vw;
  padding-bottom: 10px;
  color: #999;
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
}
.bottom_ul li b {
  color: #ff7200;
  font-size: 1vw;
  display: inline-block;
  text-decoration: underline;
} */
/* .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    color: #00abfa!important;
    background-color: #fff;
} */
</style>