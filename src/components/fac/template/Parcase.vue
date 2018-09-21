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
               <el-button type="text" @click="look">
               <div class="box" v-for="(item,ind) in scope.row.corr" :key="ind" >
                  <img :src="item.url" width="40" height="40" class="head_pic"/>
                  <p>{{item.txt}}</p>
               </div>
               </el-button>
             </template>
            </el-table-column>
        </el-table>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      imageUrl: ''
    };
  },
  methods: {
    close() {
      this.$router.push("/fac/caseindex/par/parinf");
    },
    look() {
      this.$alert('',
        "更多",
        {
          dangerouslyUseHTMLString: true
        }
      );
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 图片 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>