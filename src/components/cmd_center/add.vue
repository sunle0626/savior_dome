<template>
    <div>
    <div class="form_box">
        <h2>新增保险公司客户</h2>
        <span class="add" @click="isadd =true">新增</span>
        <el-table
        :data="tableData"
        border>
            <el-table-column
                prop="number"
                label="序号"
                width="100%">
            </el-table-column>
            <el-table-column
                prop="name"
                label="保险公司名称"
                width="180%">
            </el-table-column>
            <el-table-column
                prop="contacts"
                label="联系人"
                width="120%">
            </el-table-column>
            <el-table-column
                prop="information"
                label="联系方式"
                width="120%">
            </el-table-column>
            <el-table-column
                prop="mailbox"
                label="操作联系邮箱"
                width="180%">
            </el-table-column>
            <el-table-column
                prop="username"
                label="登录账号"
                width="160%">
            </el-table-column>
            <el-table-column
                prop="setpwd"
                label="重置密码"
                width="120%">
                <template slot-scope="scope">
                <el-button  type="text" size="small" @click="topar(scope.$index)">重置</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog class="add_box"
        title="新增保险公司名单"
        :visible.sync="isadd"
        width="50%"
        center>
        <div class="p_box">
            <p> <label for="name">输入保险公司名称:<input type="text" name="name" id="name" v-model="nametxt" placeholder=''><span class="rspan">*确保全部称呼</span></label></p>
            <p> <label for="contacts">联系人:<input type="text" name="contacts" id="contacts" v-model="contactstxt" placeholder=''><span class="rspan">*</span></label></p>
            <p><label for="information">联系手机号:<input type="text" name="information" id="information" v-model="informationtxt" placeholder=''><span class="rspan">*</span></label></p>
            <p><label for="mailbox">操作邮箱:<input type="text" name="mailbox" id="mailbox" v-model="mailboxtxt" placeholder=''><span class="nrspan">收到登录密码和账号</span></label></p>
            <p>
                <el-button type="primary" @click="isadd = false">确认新增</el-button>
            </p>
            
        </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isadd: false,
      nametxt: "",
      contactstxt: "",
      informationtxt: "",
      mailboxtxt: "",
      tableData: [
        {
          number: 1,
          name: "平安保险",
          contacts: "杨大爷",
          information: "1380328209",
          mailbox: "ytj@jiangtai.com",
          username: "",
          setpwd: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
.add_box .span {
  margin-left: 10px;
  color: #333;
}
.rspan {
  color: #df1717;
}
.add_box p{
    line-height: 66px;
}
.add_box p label{
    position: relative;
    font-size: 18px;
    color: #333
}
.add_box p label input{
    position: absolute;
    left: 160px;
    width: 440px;
    top: 0px;
    height: 18px;
    border: 0;
    border-radius: 3px;
    border: 1px solid #deddde;
}
.add_box p label span{
    width: 150px;
    position: absolute;
    left: 610px;
    font-size: 16px;
    height: 18px;
}
.add_box p:last-child{
    text-align: center;
}
</style>