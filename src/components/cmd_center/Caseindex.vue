<template>
    <!-- 导航跳转有bug -->
    <div class="case_wrap">
        <el-container>
        <el-aside width="200px">
        <el-menu
        default-active="ComAwait" router>
        <router-link :to="{name:'ComIndex',params:{token:token,insti:insti}}" class="b_index">返回首页</router-link>
        <div class="nav_box">
        <router-link class="up" :to="{name:'ComAwait',params:{token:token},query:{typeId:typeId}}">{{typeName}}</router-link>
        <!-- <router-link :to="{name:'ComIndex',params:{token:token,insti:insti}}" class="b_index">返回首页</router-link> -->
        <router-link class="ha" :to="{name:'appcase',params:{token:token},query:{typeId:typeId}}">创建案件</router-link>
        <router-link class="up" :to="{name:'ComAwait',params:{token:token},query:{typeId:typeId}}">{{typeName}}管理</router-link>
        <router-link class="ha" :to="{name:'ComAwait',params:{token:token},query:{typeId:typeId}}">未启动救援案件列表</router-link>
        <router-link class="ha" :to="{name:'ComOffer',params:{token:token},query:{typeId:typeId}}">已启动救援案件管理</router-link>
        <router-link class="ha" :to="{name:'ComRescue',params:{token:token},query:{typeId:typeId}}">救援中案件管理</router-link>
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
      typeId: this.$route.query.typeId,
      typeName:""
    };
  },
  methods: {
    back() {}
  },
  mounted() {
    console.log("com caseIndex:"+this.typeId);
    let that = this;
    fetch(constants.domain+"rescue/service_plan/get_service",{
          method: "POST",
          body: `token=${this.token ||
            JSON.parse(window.localStorage.getItem("data"))
              .data}&id=${this.typeId}`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(function(res) {
            return res.json();
        }).then(function(data){
          if(data.code == 0){
            that.typeName = data.obj.name;
          }else{
            console.log("center case index getService error:"+data.code);
          }
        })
  },
  updated(){
    this.typeId = this.$route.query.typeId;
  }
};
</script>

<style scoped>
@import url(../../css/caseindex.css);
/* .nav_box a:first-child {
  border: 1px solid #fff;
  background: #f7f8fb;
  padding-left: 1vw;
  color: #333;
  font-size: 1vw;
} */
/* a {
  text-decoration: none;
  color: #666666;
  display: block;
  height: 2.3vw;
  line-height: 2.3vw;
  text-align: left;
  padding-left: 1.6vw;
  box-sizing: border-box;
  font-size: 0.72vw;
}
.b_index {
  margin-bottom: 1vw;
  line-height: 2vw;
  background: #fff;
  font-size: 0.9vw;
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
} */
</style>