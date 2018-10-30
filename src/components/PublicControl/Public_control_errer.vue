<template>
    <div>
        <!-- 错误提示 -->
        <!-- 调用组件
        传参
        flag = true // 弹出提示框 // 可以不传
        content = "指定字符串" //提示框内容
        t = new Date() //时间，监听是否变化
          -->
        <el-dialog
            title="错误提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <p>{{content}}</p>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: ["content", "flag", "t"],
  data() {
    return {
      dialogVisible: false
    };
  },
  watch: {
    t(n, o) {
      this.dialog();
    }
  },
  methods: {
    dialog() {
      console.log(this.dialogVisible);
      this.dialogVisible = true;
      let that = this;
      setTimeout(function() {
        that.dialogVisible = false;
      }, 3000);
      console.log(this.dialogVisible);
    }
  },
  mounted() {
    console.log(this.flag);
  }
};
</script>

<style scoped>
</style>