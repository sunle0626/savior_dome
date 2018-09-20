<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="时间"
            width="180"
            align="center">
            </el-table-column>
            <el-table-column
            prop="node"
            label="操作节点"
            width="180"
            align="center">
            </el-table-column>
            <el-table-column
            prop="det"
            label="操作细节"
            align="center">
            </el-table-column>
            <el-table-column
            prop="cost"
            label="费用"
            align="center">
            </el-table-column>
            <el-table-column
            prop="corr"
            label="相关单据及图片"
            align="center">
            </el-table-column>
        </el-table>
         <div class="upbtn_box">
            <el-button type="primary">回复报价及方案</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style scoped>
.upbtn_box {
  margin-top: 25px;
  text-align: center;
}
</style>