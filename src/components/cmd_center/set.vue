<template>
    <div>
        <div class="case_wrap">
        <el-container>
        <el-aside width="18%">
        <el-menu
        default-active="add" router>
        <router-link :to="{name:'Com',params:{token:token,insti:insti}}" class="b_index">返回首页</router-link>
        <div class="nav_box">
        <router-link :to="{name:'add',params:{token:token}}">功能</router-link>
        <router-link class="ha" :to="{name:'add',params:{token:token}}">新增保险合作客户</router-link>
        <router-link class="ha" :to="{name:'pact',params:{token:token}}">保险公司合同管理</router-link>
        <router-link class="ha" :to="{name:'serve',params:{token:token}}">设置服务流程</router-link>
        </div>
        </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
        </el-container>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      insti:
        this.$route.params.insti ||
        JSON.parse(window.localStorage.getItem("insti"))
    };
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
  padding:0 180px 40px;
  background: #f6f6f6;
}
.nav_box {
  background: #fff;
}
.nav_box a:first-child {
  border: 1px solid #fff;
  background: #f6f6f6;
  padding-left: 20px;
  color: #000332;
  font-size: 16px;
}
.el-aside {
  margin-right: 30px;
  margin-top: 30px;
  background: #f6f6f6;
}
.el-menu {
  background: #f6f6f6;
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
.ha.up {
  background: #00abfa;
  color: #fff;
}
</style>