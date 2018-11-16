<template>
    <!-- 导航跳转有bug -->
    <div class="case_wrap">
        <el-container>
        <el-aside width="15%">
        <el-menu
        :default-active="finishArray[usertype]" router>
        <router-link :to="{name:indexArray[usertype],params:{token:token}}" class="b_index">返回首页</router-link>
        <div class="nav_box">
        <router-link :to="{name:finishArray[usertype],params:{token:token}}">案件管理</router-link>
        <router-link class="ha" :to="{name:finishArray[usertype],params:{token:token}}">已完成救援案件列表</router-link>
        </div>
        </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
        </el-container>
    </div>
</template>

<script>
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  data() {
    return {
      token: this.$route.params.token||JSON.parse(window.localStorage.getItem("data")).data,
      insti: this.$route.params.insti||JSON.parse(window.localStorage.getItem("insti")),
      usertype: JSON.parse(window.localStorage.getItem("usertype")).data,
      finishArray:["Finish","ComFinish","RegFinish"],
      indexArray:["FacIndex","ComIndex","RegIndex"]
    };
  },
  methods: {
    back() {}
  },
  mounted() {
    let that = this;
    if(that.usertype ==0){
      that.routeNameType = "Finish";
    }
    if(that.usertype == 2){
      that.routeNameType = "RegFinish";
    }

  },
  updated(){
    this.typeId = this.$route.query.typeId;
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #666666;
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 30px;
  box-sizing: border-box;
  font-size: 14px;
}
.b_index {
  margin-bottom: 20px;
  background: #fff;
  font-size: 16px;
  text-align: center;
  padding: 0;
  color: #00abfa;
}
.case_wrap {
  box-sizing: border-box;
  padding: 0 8% 40px;
  background: #f7f8fb;
}
.nav_box {
  background: #fff;
}
.nav_box a:first-child {
  border: 1px solid #fff;
  background: #f7f8fb;
  padding-left: 20px;
  color: #333;
  font-size: 16px;
}
.nav_box a:nth-child(3) {
  border: 1px solid #fff;
  background: #f7f8fb;
  padding-left: 20px;
  color: #333;
  font-size: 16px;
}
.el-aside {
  margin-right: 30px;
  margin-top: 30px;
  background: #f7f8fb;
}
.el-menu {
  background: #f7f8fb;
  border: 0;
}
.el-main {
  background-color: #fff;
  margin-top: 30px;
  color: #333;
  text-align: center;
  padding-bottom: 50px;
}
.case_box {
  background: #00abfa;
  color: #fff;
}
.ha:hover {
  background: #00abfa;
  color: #fff;
}
.ha.router-link-exact-active.router-link-active {
  background: #00abfa;
  color: #fff;
}
</style>