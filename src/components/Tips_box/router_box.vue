<template>
    <div>
        <!-- 正确弹窗 -->
        <!-- 调用组件
        传参
        routerobj={
          flag: true,//弹出提示框
          title:'XX框',//确认框的标题
          txt: "是否提交",//确认框的提示内容
          name: "要跳转的路由名称",//确认后跳转路由
          params|query: "路由参数",//跳转路由参数,两者可以都传
        }
          -->
        <el-dialog
            :title="routerobj.title"
            :visible.sync="routerobj.flag"
            width="30%">
            <span>{{routerobj.txt}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="routerobj.flag = false">取 消</el-button>
                <el-button type="primary" @click="routerobj.flag = false;ok()">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>

<script>
export default {
  props: ["routerobj"],
  methods: {
    ok() {
      //判断是否传入路由参数
      //存在传入路由名称
      if (this.routerobj.name !== "") {
        //跳转路由
        // this.$router.push({
        //     name:this.routerobj.name,
        //     params:this.routerobj.params,
        //     query:this.routerobj.query
        // })
      }else{
        return
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>