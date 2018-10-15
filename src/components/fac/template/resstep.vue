<template>
    <div class="res_box">
        <p class="back_box" @click="back()">
        <img src="../../../../static/images/back.png" alt="">
        返回上一页
        </p>
        <h2>开始救援</h2>
        <div class="step_box" v-if="!loading">
            <p>流程示意</p>
            <el-steps :active="2" align-center>
                <el-step title="启动当地救援公司" ></el-step>
                <el-step title="医疗费用担保" ></el-step>
                <el-step title="收集医疗单据" ></el-step>
                <el-step title="传递相关医疗单据到保险公司" ></el-step>
            </el-steps>
            <p>救援服务清单</p>
            <div class="det_box">
            <p v-for="(v,ind) in stepdata" :key="ind" v-if="v.dict.parentId===0">
                {{v.dict.name}}
            </p>
            <el-steps direction="vertical" :active="stid" class="box">
                <el-step v-for="(v,ind) in stepdata" :key="ind" :title="v.dict.name" v-if="v.dict.parentId===1">
                </el-step>
            </el-steps>
            <div class="a_box" v-for="(v,ind) in stepdata" :key="ind" v-if="v.dict.parentId===1">
                <div class="f_box f_box_1" ref="fb" v-if="!v.obj.state">
                  <span @click="st(ind)">开始操作</span>
                  <span>其他</span>
                </div>
                <div class="img_box" v-if="v.obj.state==1">
                  <p>操作说明:{{v.obj.description}}</p>
                  <img :src="v.url" v-for="(v,i) in imglist[1].list" :key="i"  v-if="v.url">
                </div>
            </div>
            <!-- <div class="f_box f_box_1" ref="fb" v-else>
            </div> -->
            <!-- </div> -->

            <!-- <div class="f_box f_box_2" ref="fb" v-if="!stepdata[1].obj.state">
              <span @click="st(1)">开始操作</span>
              <span>其他</span>
            </div>
            <div class="f_box f_box_2" ref="fb" v-else>
              <div class="img_box">
                <p>操作说明:{{stepdata[2].obj.description}}</p>
                  <img :src="v.url" v-for="(v,i) in imglist[2].list" :key="i" v-if="v.url">
              </div>
            </div>
            <div class="f_box f_box_3" ref="fb" v-if="!stepdata[2].obj.state">
              <span @click="st(2)">开始操作</span>
              <span>其他</span>
            </div>
            <div class="f_box f_box_3" ref="fb" v-else>
              <div class="img_box">
                <p>操作说明:{{stepdata[3].obj.description}}</p>
                <img :src="v.url" v-for="(v,i) in imglist[3].list" :key="i"  v-if="v.url">
              </div>
            </div> -->
            </div>
            <p class="p acc"><el-button center type="button" size="small" @click="acc()">救援完成</el-button></p>
        </div>
      <el-dialog
        title="案件操作"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        <div class="c_box">
          <p>添加操作说明</p>
           <el-input
            rows="3"
            type="textarea"
            placeholder="操作进展"
            v-model="txt"
            @input="txtdata"
            ></el-input>
        </div>
        <div class="i_box">
          <p>相关单据上传</p>
          <ul>
            <li v-for="(img,i) in urllist" :key="i">
              <img class="imgbox"  :src="img.url" alt="">
              <p>{{img.txt}}</p>
            </li>
            <li>
              <div class="up_box">
                <span for="upimg" class="upspan" @click="upimg()">+</span>   
              </div>
              <P>添加</P>
            </li>
          </ul>
        </div>
         <p class="p"><el-button center type="button" size="small" @click="ok()">完成该操作</el-button></p>
      </el-dialog>
      <el-dialog
        title="案件操作"
        :visible.sync="imgVisible"
        width="50%"
        center>
        <p><span>图片名称</span><el-input
            type="text"
            placeholder="医疗单据"
            v-model="txts"
            @input="txtsdata"
            ></el-input></p>
            <p>
              <span>
                图片地址
              </span>
              <input type="file" name="file" id="filebox" @change="fliedata($event)">
            </p>
            <p class="p"><el-button center type="button" size="small" @click="up()">确定</el-button></p>
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
          <label for="zt">整体报价:<input type="text" name="zt" id="zt" v-model="zttxt" placeholder='请输入金额($)'><span class="rspan">*</span></label>
          <label for="yl">医疗垫付:<input type="text" name="yl" id="yl" v-model="yltxt" placeholder='请输入金额($)'></label>
          <label for="aj">案件费用:<input type="text" name="aj" id="aj" v-model="ajtxt" placeholder='请输入金额($)'><span class="rspan">*</span></label>
          <label for="jy">救援费用:<input type="text" name="jy" id="jy" v-model="jytxt" placeholder='请输入金额($)'><span class="rspan">*</span></label>
          <label for="qt">其他费用:<input type="text" name="qt" id="qt" v-model="qttxt" placeholder='请输入金额($)'></label>
          <el-input
            rows="3"
            type="textarea"
            placeholder="其他费用说明"
            v-model="qt"
            @input="setqt"
            ></el-input>
            <p class="p"><el-button center type="button" size="small" @click="accup()">确认提交</el-button></p>
        </div>
      </el-dialog>
      <div class="loading" v-if="loading">
        <img src="../../../../static/images/loading.gif" alt="">
      </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      zttxt: "",
      yltxt: "",
      ajtxt: "",
      jytxt: "",
      qttxt: "",
      qt: "",
      loading: true,
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseId: this.$route.params.caseId,
      stepdata: [],
      urllist: [],
      txt: "",
      txts: "",
      file: "",
      fileurl: "",
      centerDialogVisible: false,
      imgVisible: false,
      id: 0,
      stid: 0,
      num: 0,
      isacc: false,
      feedata: null,
      flag: false,
      imglist: []
    };
  },
  methods: {
    accup() {
      let that = this;
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/case/finish",
          qs.stringify({
            token: this.token,
            Id: this.caseId,
            totalFee: this.zttxt,
            rescueFee: this.jytxt,
            medicFee: this.yltxt,
            caseFee: this.ajtxt,
            otherFee: this.qttxt,
            otherFeedesc: this.qt
          })
        )
        .then(res => {
          if (res.data.code === 0) {
            this.isacc = false;
          }
        });
    },
    setqt() {},
    getdata() {},
    acc() {
      this.isacc = true;
    },
    ok() {
      let that = this;
      let tUploadCnts = [];
      let obj = {};
      console.log(this.urllist);
      this.urllist.map(v => {
        tUploadCnts.push({
          objType: 3,
          url: v.url,
          objId: this.id
        });
      });
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/case/create_upload_cnt",
          qs.stringify({
            token: this.token,
            tUploadCnts: JSON.stringify(tUploadCnts)
          })
        )
        .then(obj => {
          console.log(obj);
        });
      this.axios
        .post(
          "http://api.test.dajiuxing.com.cn/rescue/case/conclude_phase",
          qs.stringify(...obj, {
            ...this.stepdata[this.num].obj,
            ...{ description: this.txt, token: this.token }
          })
        )
        .then(obj => {
          console.log(obj);
          this.centerDialogVisible = false;
          this.axios
            .post(
              "http://api.test.dajiuxing.com.cn/rescue/bidding/view_insti_solution",
              qs.stringify({
                token: that.token,
                caseId: that.caseId
              })
            )
            .then(res => {
              console.log(res);
            });
        });
      // this.$router.push({
      //   name: "Rescue",
      //   params: {
      //     token: this.$route.token,
      //     caseId: this.$route.params.caseId
      //   }
      // });
    },
    up() {
      this.imglist[this.num].list.push(this.fileurl);
      console.log(this.imglist);
      this.urllist.push({
        url: this.fileurl,
        txt: this.txts
      });
      this.imgVisible = false;
      this.centerDialogVisible = true;
      console.log(this.urllist);
    },
    txtdata() {},
    txtsdata() {},
    fliedata(e) {
      let that = this;
      this.file = e.target.files[0];
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
          .post(
            "http://api.test.dajiuxing.com.cn/rescue/case/upload_file",
            formdata,
            config
          )
          .then(res => {
            that.fileurl = res.data.obj;
          });
      };
    },
    upimg() {
      this.imgVisible = true;
      this.centerDialogVisible = false;
    },
    hendnode(e) {
      console.log(e.target);
    },
    handleGetFile(e) {
      let that = this;
      this.file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = function(e) {
        that.urllist.push(this.result);
      };
    },
    dialogImageUrl() {},
    dialogVisible() {},
    st(i) {
      this.num = i;
      console.log(this.stepdata[i - 1].obj.id);
      console.log(this.stepdata);
      this.txt = this.stepdata[i - 1].obj.description;
      this.id = this.stepdata[i - 1].obj.id;
      this.centerDialogVisible = true;
      this.stid = i;
    }
  },
  mounted() {
    let that = this;
    this.axios
      .post(
        "http://api.test.dajiuxing.com.cn/rescue/bidding/view_insti_solution",
        qs.stringify({
          token: that.token,
          caseId: that.caseId
        })
      )
      .then(res => {
        that.flag = true;
        that.feedata = res.data.obj;
        that.stepdata = res.data.obj2;
        console.log(that.stepdata);
        that.stepdata.map((v, i) => {
          if (i != 0) {
            that.imglist.push({
              list: v.uploadCntList
            });
          }
        });
        console.log(that.imglist);
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
  height: 350px;
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
}
.f_box {
  position: relative;
  width: 300px;
  left: 280px;
  top: -330px;
}
.f_box_2 {
  position: relative;
  width: 300px;
  left: 280px;
  top: -200px;
}
.f_box_3 {
  position: relative;
  width: 300px;
  left: 280px;
  top: -70px;
}
.f_box input {
  display: block;
}
.acc {
  margin-top: 20px;
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
  top: -20px;
}
</style>