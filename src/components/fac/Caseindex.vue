<template>
    <!-- 导航跳转有bug -->
    <div class="case_wrap">
        <el-container>
        <el-aside width="200px">
        <el-menu
        default-active="/fac/index" router>
        <el-menu-item index="/fac/index" @click="back">
            <span slot="title">返回首页</span>
        </el-menu-item>
        <el-menu-item class="case_box" index="/fac/caseindex/await">
            <span slot="title" >门诊案件管理</span>
        </el-menu-item>
        <el-menu-item index="/fac/caseindex/await">
            <span slot="title">等待授权启动救援案件</span>
        </el-menu-item>
        <el-menu-item index="/fac/caseindex/offer">
            <span slot="title">授权等待报价案件</span>
        </el-menu-item>
        <el-menu-item index="/fac/caseindex/rescue">
            <span slot="title">救援中案件管理</span>
        </el-menu-item>
        </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    methods:{
        back(){}
    },
    mounted() {
        console.log(this.$route.params.token)
    },
};
</script>

<style scoped>
.case_wrap {
  box-sizing: border-box;
  padding: 0 180px;
  background: #f6f6f6;
}
.el-aside{
    margin-right: 30px;
    margin-top: 30px;
}
.el-main {
  background-color: #fff;
  margin-top: 30px;
  color: #333;
  text-align: center;
  padding-bottom: 50px;
}
.case_box{
    background: #00abfa;
    color: #fff;
}
</style>