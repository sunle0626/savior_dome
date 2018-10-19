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
              <div class="box" v-for="(item,ind) in scope.row.corr" :key="ind" >
              <img :src="item.url" width="40" height="40" class="head_pic"/>
              <p>{{item.txt}}</p>
              </div>
              <el-button type="text" @click="centerDialog(scope.$index)" class="addimg">
                 
              </el-button>
             </template>
            </el-table-column>
        </el-table>

        <el-dialog
          title="更多"
          :visible.sync="centerDialogVisible"
          width="50%"
          center>
          <div class="box" v-for="(item,ind) in imgList" :key="ind" >
            <img :src="item.url" width="40" height="40" class="head_pic"/>
            <p>{{item.txt}}</p>
          </div>
          <el-dialog :visible.sync="dialog_Visible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      imageUrl: "",
      centerDialogVisible: false,
      dialog_Visible: false,
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      dialogImageUrl: "",
      ind: 0,
      imgList: []
    };
  },
  methods: {
    close() {
      this.$router.push("/fac/caseindex/par/parinf");
    },
    centerDialog(i) {
      this.ind = i;
      this.centerDialogVisible = true;
    },
    ImgSuccess(res, file, fileList) {
      this.tableData[this.ind].corr.unshift({
        url: res.obj,
        txt: ""
      });
      console.log(res.obj);
    },
    time(str) {
      var date = new Date(str); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D = date.getDate() + "日";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  mounted() {
    let that = this;
    this.axios
      .post(
        "http://api.test.dajiuxing.com.cn/rescue/case/case_progress",
        qs.stringify({
          token:
            this.$route.params.token ||
            JSON.parse(window.localStorage.getItem("data")).data,
          caseId: this.$route.params.caseId
        })
      )
      .then(data => {
        data.data.obj.map((v, i) => {
          console.log(v.obj.operatorType);
          let type = "";
          if (v.obj.operatorType === 0) {
            type = "供应商";
          } else if (v.obj.operatorType === 1) {
            type = "指挥中心";
          } else if (v.obj.operatorType === 2) {
            type = "监管机构";
          }
          that.tableData.push({
            date: that.time(v.obj.updateAt),
            node: v.obj.opStateText,
            det: "",
            field: type + "",
            cost: "",
            corr: [
              {
                url: null,
                txt: ""
              }
            ]
          });
        });
      });
  }
};
</script>

<style scoped>
.el-button {
  position: relative;
  top: -46px;
  width: 40px;
  height: 40px;
  font-size: 48px;
  color: #ccc;
}
.upbtn_box {
  margin-top: 25px;
  text-align: center;
}
.box {
  text-align: center;
}
.el-upload--picture-card {
  width: 260px;
  height: 260px;
}
</style>