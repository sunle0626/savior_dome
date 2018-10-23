<template>
    <div>
    <div class="form_box">
        <h2>保险公司合同设定</h2>
        <span @click="isset=true">编辑</span>
        <el-table
        :data="tableData"
        border>
            <el-table-column
                prop="number"
                label="序号"
                width="70%">
            </el-table-column>
            <el-table-column
                prop="name"
                label="保险公司"
                width="100%">
            </el-table-column>
            <el-table-column
                prop="start"
                label="合作起期"
                width="80%">
            </el-table-column>
            <el-table-column
                prop="end"
                label="合作到期"
                width="80%">
            </el-table-column>
            <el-table-column
                prop="pattern"
                label="合作模式"
                width="80%">
            </el-table-column>
            <el-table-column
                prop="cost"
                label="授权费用"
                width="80%">
            </el-table-column>
            <el-table-column
                prop="currency"
                label="币种"
                width="70%">
            </el-table-column>
            <el-table-column
                prop="agreement"
                label="协议"
                width="80%">
                <template slot-scope="scope">
                <el-button  type="text" size="small" @click="dow(scope.$index)">下载</el-button>
            </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                width="100%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="topar(scope.$index)">编辑</el-button>
                    <el-button  type="text" size="small" @click="topar(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="contract"
                label="签约保险产品"
                width="120%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="topar(scope.$index)">平安畅游产品</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="policy"
                label="保单用户数据"
                width="120%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="topar(scope.$index)">共14条数据</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
        <el-dialog class="set_box"
        title="编辑保险产品"
        :visible.sync="isset"
        width="50%"
        center>
        <div class="p_box">
            <p><label for="name">产品名称:<input type="text" name="name" id="name" v-model="nametxt" placeholder=''><span class="rspan">*</span></label></p>
            <p><label for="contacts">A、方案名称:<input type="text" name="contacts" id="contacts" v-model="contactstxt" placeholder=''><span class="rspan">*</span></label></p>
            <p><label for="information">产品条款:<input type="text" name="information" id="information" v-model="informationtxt" placeholder=''><span class="rspan">*</span><label for="num">保额<input type="text" name="num" id="num"></label></label><span class="rspan">*</span></p>
            <p>
                <el-button type="primary" @click="isset = false">确认提交</el-button>
            </p>
            
        </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isset: false,
       nametxt: "",
      contactstxt: "",
      informationtxt: "",
      mailboxtxt: "",
      tableData: [
        {
          number: 1,
          name: "平安保险",
          start: "2019 01 01  24:00",
          end: "2019 01 01  24:00",
          pattern: "大包",
          cost: "10000",
          currency: "RMB",
          agreement: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
.set_box .span {
  margin-left: 10px;
  color: #333;
}
.rspan {
  color: #df1717;
}
.set_box p{
    line-height: 66px;
}
.set_box p label{
    font-size: 18px;
    color: #333
}
.set_box p:last-child{
    text-align: center;
}
</style>