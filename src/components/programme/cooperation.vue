<template>
    <div>
        <el-dialog title="建立合作" :visible.sync="dialogFormVisible" center>
            <el-form :model="form">
                <el-form-item label="公司名称">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司网站或简介">
                <el-input v-model="form.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名">
                <el-input v-model="form.contacts" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                <el-input v-model="form.information" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="合作意向">
                <el-input v-model="form.intention" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false;successdialog=true">提交信息</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提交成功" :visible.sync="successdialog" center>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: ["dialogFormVisible"],
  watch: {
    dialogFormVisible(n) {
      this.dialogFormVisible = n;
      console.log(1);
    }
  },
  data() {
    return {
      form: {},
      successdialog: false
    };
  }
};
</script>

<style scoped>
</style>