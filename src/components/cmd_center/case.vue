<template>
    <div class="case_box">
        <div class="top_box">
            <div class="wel_box">
                尊敬的{{insti.name||username}}，欢迎登录
            </div>
            <div class="view_box">
                <span>进行中案件:</span>
                  <el-select v-model="casename" placeholder="立即查看" @change="tocase(casename)">
                    <el-option
                      v-for="item in case_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      >
                      <span style="float: left">{{item.name}}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">({{num_list[item.id]}})</span>
                    </el-option>
                  </el-select>
            </div>
        </div>
        <addcase :token="token" :typeId="typeId"/>
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

                    <b class="pointer_box" v-if="num_list[v.id]" @click="tocase(v.id)">
                        案件管理({{num_list[v.id]}})
                    </b>
                    <b class="pointer_box" v-else @click="tocase(v.id)">
                        案件管理
                    </b>
                    <b style="margin-left:20px;color:#00abfa" class="pointer_box" @click="toadd(v.id)">创立案件</b>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Message } from "element-ui";
import addcase from "./addcase.vue";
import "isomorphic-fetch";
import constants from "../util/constants.js";
import Promise from "promise-polyfill";

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  props: ["insti", "token"],
  components: {
    addcase
  },
  data() {
    return {
      username: "XXX",
      casename: "门诊治疗",
      casenum: 0,
      name: "",
      case_list: [],
      num_list: [],
      typeId: 1
    };
  },
  updated() {
    this.casename = "";
  },
  methods: {
    tocase(id) {
      let token = this.token;
      let insti = this.insti;
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
          case: "ComAwait"
        })
      );
      this.$router.push({
        name: "ComAwait",
        params: {
          token: token,
          insti: insti,
          flag: false
        },
        query: {
          typeId: id
        }
      });
    },
    lookinf() {
      let token = this.token;
      let insti = this.insti;
      this.$router.push({
        name: "ComAwait",
        params: {
          token: token,
          insti: insti
        },
        query: {
          typeId: this.typeId
        }
      });
    },
    toadd(id) {
      let token = this.token;
      let insti = this.insti;
      this.typeId = id;
      this.$router.push({
        name: "appcase",
        params: {
          token: token,
          insti: insti
        },
        query: {
          typeId: id
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
    fetch(constants.domain + "rescue/case/batch_case_count", {
      method: "POST",
      body: `token=${
        this.token
      }&status=100&status=120&status=130&status=112&status=140&status=150&status=160&status=180`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        that.num_list = data.obj;
      });
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
  height: 80px;
  line-height: 80px;
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
}
.bottom_ul {
  width: 76%;
  height: 15vw;
  margin-left: 12%;
  margin-right: 12%;
  padding-top: 40px;
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
  margin-top: 10px;
  font-weight: 500;
  color: #333;
}
.bottom_ul li p {
  box-sizing: border-box;
  margin-top: 10px;
  font-size: 0.9vw;
  padding: 0 15px;
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