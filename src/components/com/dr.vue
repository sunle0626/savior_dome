<template>
    <div>
    <div class="form_box">
        <h2>设置服务流程</h2>
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
                <el-button  type="text" size="small">下载</el-button>
            </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                width="100%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small">编辑</el-button>
                    <el-button  type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="contract"
                label="签约保险产品"
                width="120%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small">平安畅游产品</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="policy"
                label="保单用户数据"
                width="120%">
                <template slot-scope="scope">
                    <el-button  type="text" size="small">共14条数据</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          number: 1,
          name: "平安保险",
          start:'2019 01 01  24:00',
          end:'2019 01 01  24:00',
          pattern:'大包',
          cost:'10000',
          currency:'RMB',
          agreement:'',

        }
      ]
    };
  }
};
</script>

<style scoped>
</style>