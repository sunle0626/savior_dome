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
            prop="field"
            label="操作方"
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
             <template slot-scope="scope">
               <el-button type="text" @click="centerDialogVisible = true">
               <div class="box" v-for="(item,ind) in scope.row.corr" :key="ind" >
                  <img :src="item.url" width="40" height="40" class="head_pic"/>
                  <p>{{item.txt}}</p>
               </div>
               </el-button>
             </template>
            </el-table-column>
        </el-table>

        <el-dialog
          title="更多"
          :visible.sync="centerDialogVisible"
          width="50%"
          center>
          <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
           <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-dialog>
        
         <div class="upbtn_box">
            <el-button type="primary" @click="close()">关闭详情</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2018.09.2   20:22",
          node: "创立案件",
          det: "",
          field: "指挥中心 登录账号：298398213",
          cost: "$10000",
          corr: [
            {
              url:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537504208349&di=3957b799989d9bd5cb97480b65ace9f6&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dbfde6b1571f40ad101e9cfa03f457baa%2F63d9f2d3572c11df1c49e30e692762d0f703c207.jpg",
              txt: "就诊单据"
            }
          ]
        },
        {
          date: "2018.09.2   20:22",
          node: "启动救援",
          det: "发送服务清单： 1、奋达科技发打卡就； 2、什么什么",
          field: "指挥中心 登录账号：298398213",
          cost: "$10000",
          corr: [
            {
              url:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537504208349&di=3957b799989d9bd5cb97480b65ace9f6&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dbfde6b1571f40ad101e9cfa03f457baa%2F63d9f2d3572c11df1c49e30e692762d0f703c207.jpg",
              txt: "就诊单据"
            }
          ]
        },
        {
          date: "2018.09.2   20:22",
          node: "申请授权通过",
          det: "",
          field: "指挥中心 登录账号：298398213",
          cost: "$10000",
          corr: [
            {
              url:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537504208349&di=3957b799989d9bd5cb97480b65ace9f6&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dbfde6b1571f40ad101e9cfa03f457baa%2F63d9f2d3572c11df1c49e30e692762d0f703c207.jpg",
              txt: "就诊单据"
            }
          ]
        },
        {
          date: "2018.09.2   20:22",
          node: "授权通过",
          det: "",
          field: "指挥中心 登录账号：298398213",
          cost: "$10000",
          corr: [
            {
              url:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537504208349&di=3957b799989d9bd5cb97480b65ace9f6&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dbfde6b1571f40ad101e9cfa03f457baa%2F63d9f2d3572c11df1c49e30e692762d0f703c207.jpg",
              txt: "就诊单据"
            }
          ]
        }
      ],
      imageUrl: "",
      centerDialogVisible: false
    };
  },
  methods: {
    close() {
      this.$router.push("/fac/caseindex/par/parinf");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // dialogImageUrl(){

    // },
    // dialogVisible(){
      
    // }
  }
};
</script>

<style scoped>
.upbtn_box {
  margin-top: 25px;
  text-align: center;
}
.box {
  text-align: center;
}
.el-upload--picture-card{
  width: 260px;
  height: 260px;
}
</style>