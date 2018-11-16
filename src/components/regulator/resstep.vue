<template>
    <div class="res_box">
        <p class="back_box" @click="back()">
        <img src="../../../static/images/back.png" alt="">
        返回上一页
        </p>
        <h2>开始救援</h2>
        <div class="step_box">
            <p style="font-weight: 600;">流程示意</p>
            <el-steps :active="el_index" align-center>
                <el-step v-for="(v,ind) in stepdata" :title="v.dict.name" :key="ind" v-if="v.dict.parentId!=0"></el-step>
            </el-steps>
            <p style="font-weight: 600;">服务清单</p>
            <div class="det_box">
              <ul>
                  <li v-for="(v,ind) in stepdata" :key="ind" :title="v.dict.name" v-if="v.dict.parentId===0">
                      {{v.dict.name}}:
                  </li>
                  <li  v-else-if="v.dict.parentId==stepdata[0].dict.id">
                    <img v-if="v.obj.state===1" src="../../../static/images/savior_list_y.png" alt="">
                    <img v-else src="../../../static/images/savior_list_n.png" alt="">
                    {{v.dict.name}}
                  </li>
              </ul>
            <p style="font-weight: 600;">案件结点流程</p>
            </div>
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
            prop="moredetail"
            label="详细流程"
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
              <el-button type="text" @click="centerDialogVisible=true" class="addimg">
                 
              </el-button>
              </template>
            </el-table-column>
        </el-table>
            <div class="offer_box">
              <p>
                <small>A、报价</small>
                <span >
                  整体报价<b>${{feedata.totalFee||0}}</b>
                </span>
                <span >
                  救援费用：<b>${{feedata.rescueFee||0}}</b>
                </span>
                <span>
                  医疗费用：<b>${{feedata.medicFee||0}}</b>
                </span>
                <!-- <span>
                  案件服务费用：<b>${{feedata.caseFee||0}}</b>
                </span> -->
                </p>
            </div>
        </div>
        
        <el-dialog
          title="更多"
          :visible.sync="centerDialogVisible"
          width="50%"
          center>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import constants from '../util/constants.js';
export default {
  data() {
    return {
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      stepdata: [],
      el_index:0,
      centerDialogVisible: false,
      feedata: {
        totalFee:0,
        rescueFee:0,
        medicFee:0,
        caseFee:0
      },
      tableData: [],
      imageUrl: "",
      caseid:this.$route.query.caseid,
      contractType:1
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "RegRescue",
        params: {
          token:
            this.$route.params.token ||
            JSON.parse(window.localStorage.getItem("data")).data,
        },
        query: {
          typeId:this.$route.query.typeId,
          caseid: this.caseid
        }
      });
    },
  },
  mounted() {
    let that = this;
    fetch(constants.domain+"rescue/case/detail_case", {
      method: "POST",
      body: `token=${this.token}&caseId=${this.caseid}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        if(data.code == 0){
            that.contractType = data.obj.obj.contractType||1;
        }
     });
    this.axios
      .post(
        constants.domain+"rescue/bidding/view_case_solution",
        qs.stringify({
          token: that.token,
          caseId: that.caseid,
          state:4
        })
      )
      .then(res => {
        that.flag = true;
        if(res.data.obj)
          that.feedata = res.data.obj;
        that.stepdata = res.data.obj2;
        for(var i=0;i<that.stepdata.length;i++){
          var o = that.stepdata[i].obj;
          if(o.state && o.state==1){
              that.el_index+=1;
          }
        }
        that.loading = false;
      });
    this.axios
      .post(
        constants.domain+"rescue/case/case_progress",
        qs.stringify({
          token: this.token,
          caseId: this.caseid
        })
      )
      .then(data => {
        data.data.obj.map((v, i) => {
          console.log(v.obj.operatorType);
          let type = "";
          if (v.obj.operatorType === 0) {
            type = "供应商";
          } else if (v.obj.operatorType === 1) {
            type = "";
          } else if (v.obj.operatorType === 2) {
            type = "监管机构";
          }
          var corr = [];
          if(v.obj.opPhotoUrls){
            corr = corr = JSON.parse(v.obj.opPhotoUrls);
          }
          console.log("resstep v.id: " +v.obj.id+ " opurl:"+corr)
          that.tableData.push({
            date: constants.time(v.obj.updateAt),
            node: v.obj.opStateText,
            det: v.obj.opDesc,
            field: type+" "+v.instiName,
            moredetail: v.moredetail,
            corr:corr
          });
        });
      });
  }
};
</script>

<style scoped>
.offer_box {
  line-height: 50px;
}
.offer_box p {
  line-height: 50px;
  border: 1px solid #eee;
  border-top: 0;
  padding-left: 10px;
}
.offer_box p small {
  display: inline-block;
  width: 140px;
  font-size: 16px;
}
.offer_box span {
  margin-left: 35px;
  color: #333;
  font-size: 16px;
}
.offer_box span b {
  color: #ff7200;
  margin-left: 3px;
}
span {
  font-size: 14px;
}
span small {
  color: #ff7200;
}
.acc_box .span {
  margin-left: 10px;
  color: #333;
}
.rspan {
  color: #df1717;
}
.upspan {
  font-size: 64px;
}
label {
  display: block;
  float: left;
  width: 33%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 2px;
}
label input {
  width: 130px;
  margin-left: 5px;
  height: 25px;
  border: 0;
  border-radius: 3px;
  border: 1px solid #ccc;
}
.p {
  text-align: center;
}
.a-upload {
  padding: 4px 10px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: #888;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
.a-upload:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none;
}
.res_box {
  text-align: left;
}
p {
  line-height: 25px;
}
.det_box {
  box-sizing: border-box;
  padding: 10px 15px;
}
.det_box ul {
  width: 100%;
}
/* .det_box ul li {
  width: 20%;
  line-height: 30px;
  margin-left: 2%;
} */
.back_box {
  text-align: left;
  font-size: 14px;
  line-height: 45px;
  color: #666;
  cursor: pointer;
}
.res_box > h2 {
  font-size: 20px;
  color: #333;
  font-weight: 600;
  line-height: 45px;
}
.box {
  margin-left: 100px;
  margin-top: -20px;
}
.a_box {
  position: absolute;
  top: 330px;
  width: 50%;
  left: 700px;
  height: 100px;
}
.f_box {
  position: absolute;
  width: 300px;
  /* left: 280px; */
  bottom: 0;
}
.f_box input {
  display: block;
}
.acc {
  margin-top: 80px;
}
.imgbox {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  display: block;
}
.f_box > span {
  color: #00abfa;
  margin-left: 18px;
}
ul {
  height: 50px;
}
ul > li {
  text-align: center;
  float: left;
  margin-left: 10px;
  width: 15%;
}
ul > li:first-child{
  width: 10%;
    font-weight: 600;
}
ul > li p {
  width: 100%;
  text-align: center;
}
.up_box {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  display: block;
  font-size: 64px;
  color: #ccc;
  text-align: center;
  line-height: 80px;
}
.img_box img {
  width: 80px;
  height: 80px;
  margin: 5px;
}
.img_box {
  position: absolute;
  top: -20px;
}
</style>