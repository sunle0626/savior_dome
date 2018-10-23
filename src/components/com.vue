<template>
    <div>
        指挥中心
        <router-link to="/Com/ComIndex">
            页面一
        </router-link>
        <router-link to="/Com/Comset/pact">
            保险公司合同管理
        </router-link>
        <router-link to="/com/Comset/serve">
            设置服务流程
        </router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>