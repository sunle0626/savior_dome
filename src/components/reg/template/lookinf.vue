<template>
    <div class="inf_wrap">
        <p class="back_box" @click="back()">
          <img src="../../../../static/images/back.png" alt="">
          返回上一页
          </p>
        <div class="box_req">
            <h2>回复方案及报价详情</h2>
            <div class="req_box">
                <b>救援方案</b>
                <div class="acc_box">
                    <p>附件({{acc_list.length}})</p>
                    <ul>
                        <li v-for="(v,ind) in acc_list" :key="ind">
                            <img src="" alt="">
                            <p>指挥中心上传的文件</p>
                            <a :href="v.url" download="指挥中心上传的文件">下载</a>
                        </li>
                    </ul>
                </div>
            </div>
                <div class="rescue_box"  v-for="(item,ind) in checkList" :key="ind">
                    <p>{{item.name}}</p>
                    <el-checkbox-group v-for="(v,ind) in item.list" :key="ind">
                        <el-checkbox checked="checked" disabled>
                            <span class="res_div">{{v.dict.name}}</span>
                            <br/>
                            <span class="res_box">说明：{{v.obj.description}}</span>
                            <br/>
                            <span class="res_box">回复：{{v.obj.reply}}</span>
                            <br/>
                            <span class="res_box" v-show="v.obj.fee!=0">限额：{{v.obj.fee}}</span>
                        </el-checkbox>
                        
                    </el-checkbox-group>
                </div>
                        <div class="upbtn_box">
                        <el-button type="primary" @click="flag=true;back()">关闭详情</el-button>
                        <span @click="toalter">修改报价</span>
                        </div>
                
           </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token: this.$route.params.token,
      caseid: this.$route.params.caseid,
      acc_list: [],
      formInline: {
        user: "",
        region: ""
      },
      checkList: [],
      parentObj: [],
      flag: false
    };
  },
  methods: {
    back() {
      this.$router.push("/reg/caseindex/offer");
    },
    toalter() {
      this.$router.push("/reg/caseindex/alter");
    }
  },
  mounted() {
    let that = this;
    let n = 0;
    fetch(
      "http://api.test.dajiuxing.com.cn/1.0/rescue/bidding/view_insti_solution",
      {
        method: "POST",
        body: `token=${this.token}&caseId=${this.caseid}`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
      .then(function(res) {
        //console.log(res);
        return res.json();
      })
      .then(function(data) {
        //console.log(data.obj2);
        data.obj2.map(v => {
          if (v.dict.parentId == "0") {
            var obj = {};
            obj.id = v.dict.parentId;
            obj.childId = v.dict.id;
            obj.name = v.dict.name;
            obj.list = [];
            that.checkList.push(obj);
          } else {
            that.checkList.map(o => {
              if (v.dict.parentId == o.childId) {
                //console.log(v.dict.parentId)
                o.list.push(v);
              }
            });
          }
        });
        //获取救援方案
        fetch("http://api.test.dajiuxing.com.cn/1.0/rescue/case/upload_cnts", {
          method: "POST",
          body: `token=${that.token}&objId=${data.obj.id}&objType=2`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            //console.log(res);
            return res.json();
          })
          .then(function(data) {
            data.obj.map(v => {
              that.acc_list.push(v);
            });
          });
      });
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #999;
}
.back_box {
  text-align: left;
  font-size: 14px;
  line-height: 45px;
  color: #666;
  cursor: pointer;
}
.inf_wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 5px 15px;
  text-align: left;
}
.box_req > h2 {
  font-size: 20px;
  margin-top: 5px;
  line-height: 45px;
  text-align: left;
  color: #333;
}
.req_box {
  box-sizing: border-box;
  padding: 0 15px;
}
.req_box b {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
.org_box {
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 15px;
}
.org_box p {
  line-height: 40px;
  color: #333;
}
.acc_box {
  box-sizing: border-box;
  padding: 0 10px;
}
.acc_box > p {
  color: #333;
  line-height: 40px;
  font-size: 15px;
}
span {
  color: #df1717;
  margin-left: 2px;
}
.acc_box ul li {
  display: inline-block;
  width: 20%;
  text-align: center;
}
.acc_box ul li p {
  text-align: center;
  line-height: 36px;
  font-size: 14px;
}
.acc_box ul li img {
  width: 90px;
  height: 120px;
}
.acc_box ul li a {
  color: #00abfa;
  font-size: 14px;
}
.el-form {
  margin-top: 15px;
}
.el-input {
  width: 120px;
  height: 30px;
}
.el-form-item__label {
  font-size: 14px;
}
.rescue_box {
  box-sizing: border-box;
  padding: 0 20px;
}
.rescue_box > p {
  line-height: 40px;
  font-size: 14px;
}
.res_div {
  position: relative;
  top: 18px;
}
.res_box {
  position: relative;
  top: 20px;
  font-size: 14px;
  color: #999;
}
.el-checkbox-group {
  position: relative;
  box-sizing: border-box;
  padding: 0 15px;
}
.el-checkbox {
  width: 100%;
  margin-bottom: 20px;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.db_div,
.res_div {
  font-size: 14px;
  color: #333;
}
.db_box {
  font-size: 14px;
  color: #333;
  margin-left: 30px;
}
.db_box b {
  color: #ff7200;
  margin-left: 8px;
}
.el-textarea {
  display: block;
  width: 160%;
  margin-top: 20px;
}
.upbtn_box {
  text-align: center;
  margin-top: 15px;
}
.upbtn_box span {
  color: #00abfa;
  margin-left: 5px;
}
</style>