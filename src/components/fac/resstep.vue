<template>
    <div class="res_box">
        <p class="back_box" @click="back()">
        <img src="../../../static/images/back.png" alt="">
        返回上一页
        </p>
        <h2>开始救援</h2>
        <div class="step_box" v-if="!loading">
            <p>流程示意</p>
            <el-steps :active="stid" align-center>
                <el-step v-for="(v,ind) in stepdata" :title="v.dict.name" :key="ind" v-if="v.dict.parentId!=0"></el-step>
            </el-steps>
            <!-- <ul class="step_ul">
              <li class="step_li" v-for="(v,ind) in stepdata" :key="ind" v-if="v.dict.parentId!=0">
                <div class="step_div">
                <b>{{ind}}</b>
                <p>{{v.dict.name}}</p>
                </div>
                <p class="step_p"></p>
              </li>
            </ul> -->
            <p>救援服务清单</p>
            <div class="det_box">
              <p v-for="(v,ind) in stepdata" :key="ind" v-if="v.dict.parentId===0">
                  {{v.dict.name}}
              </p>
              <el-steps direction="vertical" :active="stid+1" class="box" :space="320">
                  <el-step v-for="(v,ind) in stepdata" :key="ind" :title="v.dict.name" v-if="v.dict.parentId===stepdata[0].dict.id">
                  </el-step>
              </el-steps>
            </div>
            <div class="_box">
              <div class="a_box" v-for="(v,ind) in stepdata" :key="ind" v-if="v.dict.parentId===stepdata[0].dict.id">
                <div class="f_box f_box_1" ref="fb" v-if="v.obj.state!=1">
                  <div class="node_box">
                    <p v-for="(val,i) in v.solutionSvrPointList" :key="i" v-if="i<5">
                      节点{{i+1}}：{{val.description}}
                    </p>
                  </div>
                  <span @click="st(ind)">开始操作</span>
                  <span @click="morenode(ind)">其他</span>
                </div>
                <div class="img_box" v-if="v.obj.state==1">
                  <div class="node_box">
                    <p v-for="(val,i) in v.solutionSvrPointList" :key="i" v-if="i<5" class="node_p">
                      节点{{i+1}}： <span class="node_span">{{val.description}}</span>
                    </p>
                  </div>
                  <div class="des_node">
                    <p>操作说明:{{v.obj.description}}</p>
                    <div class="des_img_box">
                      <span>相关单据上传</span>
                      <div class="des_img"  v-for="(v,i) in imglist[ind-1].list" :key="i"  v-if="v.url">
                          <img :src="v.url">
                          <span>{{v.description}}</span>
                      </div>
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p class="p acc"><el-button center type="primary"  @click="acc()">救援完成</el-button></p>
        </div>
      <el-dialog
        title="案件操作"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        <div class="c_box">
          <p style="font-weight: 600;">添加操作说明</p>
           <el-input
            rows="3"
            type="textarea"
            placeholder="操作进展"
            v-model="txt"
            @input="txtdata"
            ></el-input>
        </div>
        <div class="i_box">
          <p style="font-weight: 600;">相关单据上传</p>
          <ul>
            <li v-for="(img,i) in urllist" :key="i">
              <img class="imgbox"  :src="img.url" alt="">
              <p>{{img.description}}</p>
              <p><a @click="urllist.splice(i,1)">删除</a></p>
            </li>
            <li>
              <div class="up_box">
                <span for="upimg" class="upspan" @click="upimg()">+</span>   
              </div>
              <P>添加</P>
            </li>
          </ul>
        </div>
         <p class="p"><el-button center type="primary"  @click="oknode()">完成该操作</el-button></p>
      </el-dialog>
      <el-dialog
        title="案件操作"
        :visible.sync="imgVisible"
        width="50%"
        center>
        <p><span>图片名称:</span><el-input
            type="text"
            placeholder="医疗单据"
            v-model="txts"
            @input="txtsdata"
            ></el-input></p>
            <p>
              <span>
                图片地址:
              </span>
              <input type="file" name="file" id="filebox" @change="filedata($event)">
            </p>
            <p class="p"><el-button center type="primary"  @click="up()">确定</el-button></p>
      </el-dialog>
      <el-dialog class="acc_box"
        title="完成救援案件"
        :visible.sync="isacc"
        width="50%"
        center>
        <p>A、报价   
        <span class="span">整体报价 <small v-if="flag">${{feedata.totalFee}}</small></span>
        <span class="span">医疗垫付 <small v-if="flag">${{feedata.medicFee}}</small></span>
        <span class="span">案件费用 <small v-if="flag">${{feedata.caseFee}}</small></span>
        <span class="span">救援费用 <small v-if="flag">${{feedata.rescueFee}}</small></span>
        </p>
        <div class="p_box">
          <p>B、实际费用</p>
          <label for="zt">整体报价:<el-input type="text" name="zt" id="zt" v-model="zttxt" readonly></el-input><span class="rspan">*</span></label>
          <label for="yl">医疗垫付:<el-input type="text" name="yl" id="yl" v-model="yltxt" placeholder='请输入金额($)' @input="upnum(yltxt)"></el-input></label>
          <label for="aj">案件费用:<el-input type="text" name="aj" id="aj" v-model="ajtxt" placeholder='请输入金额($)' @input="upnum(ajtxt)"></el-input><!--span class="rspan">*</span --></label>
          <label for="jy">救援费用:<el-input type="text" name="jy" id="jy" v-model="jytxt" placeholder='请输入金额($)' @input="upnum(jytxt)"></el-input><!-- span class="rspan">*</span--></label>
          <label for="qt">其他费用:<el-input type="text" name="qt" id="qt" v-model="qttxt" placeholder='请输入金额($)' @input="upnum(qttxt)"></el-input></label>
          <el-input
            rows="3"
            type="textarea"
            placeholder="其他费用说明"
            v-model="qt"
            @input="setqt"
            ></el-input>
            <p class="p"><el-button center type="primary"  @click="accup()">确认提交</el-button></p>
        </div>
      </el-dialog>
      <el-dialog
        title="案件操作"
        :visible.sync="elseDialog"
        width="30%"
        center>
        <p class="node" v-for="(v,ind) in nodelist" :key="ind">
          <span>添加节点</span>
          <el-input class="input_box" type="text" placeholder="请添加节点" v-model="v.description"></el-input>
          <small class="add_span" v-if="ind==nodelist.length-1" @click="addNode($event,ind)"><span>+</span> 添加</small>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="elseDialog = false,upnode()">完成该操作</el-button>
        </span>
      </el-dialog>
      <div class="loading" v-if="loading">
        <img src="../../../static/images/loading.gif" alt="">
      </div>
    </div>
</template>

<script>
import qs from "qs";
import { Message } from "element-ui";
import constants from "../util/constants.js";
export default {
  data() {
    return {
      zttxt: "0",
      yltxt: "",
      ajtxt: "",
      jytxt: "",
      qttxt: "",
      qt: "",
      nodelist: [{ description: "", solutionSvrId: "" }],
      loading: true,
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseid: this.$route.query.caseid,
      stepdata: [],
      urllist: [],
      txt: "",
      txts: "",
      file: "",
      fileurl: "",
      centerDialogVisible: false,
      imgVisible: false,
      elseDialog: false,
      id: 0,
      stid: 0,
      num: 0,
      isacc: false,
      feedata: null,
      flag: false,
      imglist: [],
      btn_flag: false,
      serviceId: 0,
      serviceFinish:1
    };
  },
  methods: {
    upnode() {
      let nlst = this.nodelist.slice();
      console.log(JSON.stringify(this.nodelist));
      if (nlst.length < 5) {
        this.axios
          .post(
            constants.domain + "rescue/case/create_svr_point",
            qs.stringify({
              token: this.token,
              solutionSvrPoints: JSON.stringify(nlst)
            })
          )
          .then(res => {
            console.log(res);
            window.location.reload();
          });
      } else {
        Message.error("请不要输入过多节点，默认显示五条");
      }
    },
    addNode(e, i) {
      let parent = e.target.parentNode;
      this.nodelist.push({
        description: "",
        solutionSvrId: this.serviceId
      });
    },
    morenode(i) {
      this.serviceId = this.stepdata[i].obj.id;
      this.elseDialog = true;
      for (var j = 0; j < this.nodelist.length; ++j) {
        if (this.nodelist[j].solutionSvrId != this.serviceId) {
          this.nodelist = [
            {
              solutionSvrId: this.serviceId,
              description: ""
            }
          ];
          return;
        }
      }
    },
    upnum(val) {
      if (isNaN(val)) {
        Message.error("请输入数字，而非其他");
      } else {
        if (!this.jytxt) {
          this.jytxt = 0;
        }
        if (!this.yltxt) {
          this.yltxt = 0;
        }
        if (!this.ajtxt) {
          this.ajtxt = 0;
        }
        if(!this.qttxt){
          this.qttxt = 0;
        }
        this.jytxt = this.jytxt*1;
        this.yltxt = this.yltxt*1;
        this.ajtxt = this.ajtxt*1;
        this.qttxt = this.qttxt*1;
        this.zttxt = this.jytxt + this.yltxt + this.ajtxt+this.qttxt;
      }
    },
    accup() {
      let that = this;
      if(that.serviceFinish==0){
        Message.error("请完成所有操作！");
        return;
      }
      if (!this.jytxt) {
          this.jytxt = 0;
        }
        if (!this.yltxt) {
          this.yltxt = 0;
        }
        if (!this.ajtxt) {
          this.ajtxt = 0;
        }
        if(!this.qttxt){
          this.qttxt = 0;
        }
        this.jytxt = this.jytxt*1;
        this.yltxt = this.yltxt*1;
        this.ajtxt = this.ajtxt*1;
        this.qttxt = this.qttxt*1;
        this.zttxt = this.jytxt + this.yltxt + this.ajtxt+this.qttxt;
        if(this.zttxt == 0){
          Message.error("请输入金额！");
          return;
        }
      this.axios
        .post(
          constants.domain + "rescue/case/finish",
          qs.stringify({
            token: this.token,
            id: this.caseid,
            totalFee: this.zttxt,
            rescueFee: this.jytxt,
            medicFee: this.yltxt,
            caseFee: this.ajtxt,
            otherFee: this.qttxt,
            otherFeeDesc: this.qt
          })
        )
        .then(res => {
          if (res.data.code === 0) {
            this.isacc = false;
            this.$router.push({
              name: "Rescue",
              params: {
                token: this.$route.token
              },
              query: {
                typeId: this.$route.query.typeId
              }
            });
          }
        });
    },
    setqt() {},
    getdata() {},
    acc() {
      if(this.serviceFinish==0){
        Message.error("请完成所有操作！");
        return;
      }
      this.isacc = true;
    },
    test() {
      let tUploadCnts = this.imglist.slice();
      console.log("test:" + JSON.stringify(tUploadCnts));
    },
    oknode() {
      let odom = document.querySelectorAll(".a_box")[this.num - 1];
      // let dom = document.querySelectorAll(".a_box")[this.num];
      odom.style.visibility = "visible";
      console.log(odom);
      // dom.style.visibility = "visible";
      // dom.style.top = odom.offsetTop + 320 + "px";
      let that = this;
      let tUploadCnts = this.urllist.slice();
      let obj = Object.assign({}, this.stepdata[this.num].obj);
      obj.tUploadCnts = JSON.stringify(tUploadCnts);
      obj.description = this.txt;
      obj.token = this.token;
      this.axios
        .post(
          constants.domain + "rescue/case/conclude_phase",
          qs.stringify(obj)
        )
        .then(obj => {
          window.location.reload();
        });
    },
    up() {
      let that = this;
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      let formdata = new FormData();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      formdata.append("token", this.token);
      reader.onload = function(e) {
        formdata.append("file", that.file);
        that.axios
          .post(constants.domain + "rescue/case/upload_file", formdata, config)
          .then(res => {
            that.fileurl = res.data.obj;
            that.imglist[that.num - 1].list.push(that.fileurl);
            that.urllist.push({
              url: that.fileurl,
              description: that.txts
            });
            that.imgVisible = false;
            that.centerDialogVisible = true;
          });
      };
    },
    txtdata() {},
    txtsdata() {},
    filedata(e) {
      this.file = e.target.files[0];
      this.txts = this.file.name;
    },
    upimg() {
      this.imgVisible = true;
      this.centerDialogVisible = false;
    },
    hendnode(e) {
      console.log(e.target);
    },
    dialogImageUrl() {},
    dialogVisible() {},
    st(i) {
      this.num = i;
      // this.txt = this.stepdata[i].obj.description;
      this.id = this.stepdata[i].obj.id;
      this.centerDialogVisible = true;
      console.log(this.stepdata[i].obj.id);
    },
    back() {
      this.$router.push({
        name: "Rescue",
        params: {
          token:
            this.$route.params.token ||
            JSON.parse(window.localStorage.getItem("data")).data
        },
        query: {
          typeId: this.$route.query.typeId
        }
      });
    }
  },
  mounted() {
    console.log(this.$route.params);
    let that = this;
    this.axios
      .post(
        constants.domain + "rescue/bidding/view_insti_solution",
        qs.stringify({
          token: that.token,
          caseId: that.caseid
        })
      )
      .then(res => {
        that.flag = true;
        that.feedata = res.data.obj;
        that.stepdata = res.data.obj2;
        let n = 0;
        let arr = [];
        that.stepdata.map((v, i) => {
          arr.push(v.obj.state);
          if(v.dict.parentId!=0){
            if (v.obj.state && v.obj.state == 1) {
              that.stid = i;
              console.log(v.obj.state);
            }else{
              that.serviceFinish = 0;
            }
          }

          console.log("serviceFinish:"+that.serviceFinish)
          if (i != 0) {
            that.imglist.push({
              list: v.uploadCntList
            });
            if (v.uploadCntList.length > 0) {
              this.num = i;
            }
          }
        });
        for (let index = 0; index < arr.length; index++) {
          if (arr[index] != 0) {
          } else {
            n = index + 1;
          }
        }
        if (n == 0) {
          that.btn_flag = true;
        }
        that.loading = false;
      });
  }
};
</script>

<style scoped>
span {
  font-size: 14px;
}
span small {
  color: #ff7200;
}
.des_img_box{
  width: 100%;
}
.des_img_box>span,.des_img_box>div{
  float: left;
}
.des_img_box>div{
  width: 90px;
  text-align: center;
}
.des_img_box>span{
  font-size: 16px;
  margin-right: 13px;
}
.acc_box .span {
  margin-left: 10px;
  color: #333;
}
.rspan {
  color: #df1717;
  margin-left: 5px;
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
.node_p {
  height: 28px;
  line-height: 28px;
  margin: 8px 0;
}
.node_span {
  display: inline-block;
  width: 600px;
  height: 28px;
  line-height: 28px;
  border: 1px solid #d9ddde;
  padding-left: 10px;
  border-radius: 3px;
}
.des_node {
    border: 1px solid #d9ddde;
    box-sizing: border-box;
    padding-left: 10px;
    border-radius: 5px;
    position: absolute;
    width: 100%;
    height: 100%;
}
label input {
  width: 130px;
  margin-left: 5px;
  height: 25px;
  border: 0;
  border-radius: 3px;
  border: 1px solid #ccc;
}
.des_node p{
  height: 50px;
  margin-top: 5px;
}
.p {
  text-align: center;
  margin: 40px 0 10px;
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
    top: 390px;
    width: 50%;
    left: 35%;
    height: 150px;
    padding: 10px
}
/* ._box .a_box:not(:first-child) {
  visibility: hidden;
  top: 630px;
} */
._box .a_box:nth-child(2) {
  visibility: visible;
  top: 720px;
}
._box .a_box:nth-child(3) {
  visibility: visible;
  top: 1050px;
}
._box .a_box:nth-child(4) {
  visibility: visible;
  top: 1370px;
}
._box .a_box:nth-child(5) {
  visibility: visible;
  top: 1690px;
}
._box .a_box:nth-child(6) {
  visibility: visible;
  top: 2010px;
}
._box .a_box:nth-child(7) {
  visibility: visible;
  top: 2330px;
}
._box .a_box:nth-child(8) {
  visibility: visible;
  top: 2650px;
}
._box .a_box:nth-child(9) {
  visibility: visible;
  top: 2970px;
}
._box .a_box:nth-child(9) {
  visibility: visible;
  top: 3290px;
}
.f_box {
  position: absolute;
  width: 300px;
  /* left: 280px; */
  /* bottom: 0; */
}
.f_box input {
  display: block;
}
.acc {
  margin-top: 50px;
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
  height: 150px;
}
ul > li {
  width: 80px;
  text-align: center;
  float: left;
  margin-left: 10px;
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
  width: 100%;
  height: 100%;
  /* top: -20px; */
}
.el-dialog__body .el-input {
  width: 60%;
  margin-left: 15px;
}
.el-dialog__body > p {
  line-height: 42px;
}
input[type="file"] {
  margin-left: 12px;
}
.i_box {
  margin-top: 18px;
}
.el-input.input_box {
  width: 70%;
}
.add_span {
  color: #00abfa;
}
.step_box .el-steps .el-step__main .el-step__title{
    line-height: 25px;
}
/*.add_span span{
  display: inline-block;
  width: 10px;
  height: 10px;
  font-size: 10px;
  line-height: 42p;
  color: #00abfa;
  border: 1px solid #00abfa;
  border-radius: 50%
} */
.step_ul{
  width: 100%;
  height: 100px;
}
.step_ul .step_li{
  width: 20%;
  margin: 0;
  position: relative;
}
.step_ul .step_li b{
  position: relative;
  z-index:2;
  display:inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: #00abfa 2px solid;
  border-radius: 50%;
  background: #00abfa;
}
.step_ul .step_p{
  position: absolute;
  top: 15px;
  left: 0;
  height: 5px;
  width: 100%;
  background: #00abfa;
}
</style>