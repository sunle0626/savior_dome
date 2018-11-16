<template>
    <div>
    <header class="header">
        <img src="./images/overseas_bg.png" alt="">
        <div class="nav">
            <div class="nav_left">
                <img src="../../../static/img/images/logo_.png" alt="">
            </div>
            <div class="nav_right">
                <ul>
                    <li @click="index()" class="pointer_box">
                        首页
                    </li>
                    <li @click="dowapp()"  class="pointer_box">
                        大救星APP
                    </li>
                    <li @click="contact()" class="pointer_box">
                        合作咨询
                    </li>
                    <li class="pointer_box">
                        <p class="btn_l" @click="listlogin()">登录</p>
                    <ol class="login">
                        <span></span>
                        <li class="login_btn btn" @click="login(0)">救援机构入口</li>
                        <li class="login_btn btn" @click="login(2)">监管机构入口</li>
                        <li class="login_btn btn" @click="login(1 )">指挥中心入口</li>
                    </ol>
                    </li>
                </ul>
            </div>
        </div>
        <div class="dbox">
            <p>景区景点解决方案</p>
        </div>
        <div class="points_box">
            <p>基于江泰·大救星救援云平台的安全风险系统、救援服务经验、人景事识别计算方案配合普通型、山岳型、郊野型等类型景区进行安全预警、风险预案、紧急救援、人员疏散等全方面定制化解决方案。</p>
        </div>
    </header>
    <main class="main">
       <ul class="list">
           <li>
               <img src="./images/Scenicspot_icon_01.png" alt="">
               <h4>普通型</h4>
               <p>基于云数据，解决用户随时救援需求，提供实时有效救援服务，景区进行监管，提高游客体验和安全防护。</p>
           </li>
           <li>
               <img src="./images/Scenicspot_icon_02.png" alt="">
               <h4>山岳型</h4>
               <p>充分利用江泰·大救星救援云平台数据，进行安全线路风险评估，依托LBS、风险预警、电子围栏等技术应用，提供针对不同景区的综合安全、救援解决方案。</p>
           </li>
           <li>
               <img src="./images/Scenicspot_icon_03.png" alt="">
               <h4>郊野型</h4>
               <p>针对郊野景区的特点，基于救援云数据，进行安全线路风险评估，依托LBS、风险预警、电子围栏等技术应用，提供综合安全、救援解决方案</p>
           </li>
       </ul>
       <p class="btn_node">
           <button @click="dialogFormVisible=true">建立合作</button>
       </p>
    </main>
    <footer class="footer">
        <div class="con_box">
            <div class="nav_box">
                <p class="pointer_box btn" @click="login(0)">救援机构入口</p>
                <p class="pointer_box btn" @click="login(2)">监管机构入口</p>
                <p class="pointer_box btn" @click="login(1)">指挥中心入口</p>
            </div>
            <p class="txt pointer_box">机构版APP下载</p>
            <p @click="contact()" class="txt pointer_box">合作查询</p>
            <p @click="feedback()" class="txt pointer_box">意见反馈</p>
            <p @click="aboutus()" class="txt pointer_box">关于大救星</p>
            <div class="rq_one">
                <p>下载大救星</p>
                <img src="../../../static/img/images/rq_code_dow.png" alt="">
            </div>
            <div class="rq_two">
                <p>微信公众号</p>
                <img src="../../../static/img/images/rq_code_public.png" alt="">
            </div>
        </div>
        <div class="footer_bottom">
            大救星版权所有@2018
        </div>
    </footer>
        <div class="login_box" >
          <h2>大救星救援云平台</h2>
          <div class="login_area">
            <h2>登录</h2>
            <form class="login_div">
                <p><input type="text" id="id_box" placeholder="请输入ID" v-model="user"></p>
                <p><input type="password" id="pwd_box" placeholder="请输入密码" v-model="pwd"></p>
                <span class="btn_cancel div_btn" @click="tobtn('cancel')">取消</span>
                <span class="btn_login div_btn" @click="tobtn('login')">登录</span>
            </form>
          </div>  
        </div>
      <el-dialog title="建立合作" :visible.sync="dialogFormVisible" center>
            <el-form :model="form" :rules='rules'>
                <el-form-item label="公司名称" class="input">
                <el-input v-model="form.name" autocomplete="off" placeholder="输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="公司网站或简介" class="textarea">
                <!-- <el-input v-model="form.url" autocomplete="off"></el-input> -->
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="输入公司网站或者简介"
                  v-model="form.textarea">
                </el-input>
                </el-form-item>
                <el-form-item label="联系人姓名" class="input" prop="contacts">
                <el-input v-model="form.contacts" autocomplete="off" placeholder="输入公司联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" class="input"  prop="information">
                <el-input v-model="form.information" autocomplete="off" placeholder="输入联系人电话"></el-input>
                </el-form-item>
                <el-form-item label="合作意向" class="input">
                <el-input v-model="form.intention" autocomplete="off" placeholder="输入您的合作意向"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false;successdialog=true">提交信息</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提交成功" :visible.sync="successdialog" center>
          <p class="p_node">
              <img class="img_node" src="./images/success_icon.png" alt=""> 
          </p>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from "element-ui";
import constants from "../util/constants.js";
export default {
  data() {
    return {
       rules: {
        contacts: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        information: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ]
      },
      flag: true,
      usertype: "",
      user: "",
      pwd: "",
      form: {},
      successdialog: false,
      dialogFormVisible: false
    };
  },
  methods: {
    feedback() {
      this.$router.push({
        name: "feedback"
      });
    },
    aboutus() {
      this.$router.push({
        name: "aboutus"
      });
    },
    dowapp() {
      this.$router.push({
        name: "dowapp"
      });
    },
    index() {
      this.$router.push({
        name: "Index"
      });
    },
    contact() {
      this.$router.push({
        name: "contact"
      });
    },
    listlogin() {
      let login_list = document.querySelector(".login");
      if (this.flag) {
        login_list.style.display = "block";
        this.flag = false;
      } else {
        login_list.style.display = "none";
        this.flag = true;
      }
    },
    login(v) {
      console.log(v);
      let login_box = document.querySelector(".login_box");
      login_box.style.display = "block";
      this.usertype = v;
    },
    tobtn(v) {
      let that = this;
      if (v === "cancel") {
        let login_box = document.querySelector(".login_box");
        login_box.style.display = "none";
      } else {
        // 先匹配密码正则
        // if (!this.pwd.match(/^[a-zA-Z]\w{5,17}$/)) {
        //   Message.error(
        //     "密码请以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
        //   );
        // }
        // 请求 判断角色
        // 0 救援机构 fac
        // 1 指挥中心
        // 2 监管机构
        fetch(constants.domain + "rescue/user/login", {
          method: "POST",
          body: `username=${this.user}&pwd=${this.pwd}`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            if (data.code === 0) {
              console.log(that.usertype);
              if (Number(data.obj.user.type) == Number(that.usertype)) {
                if (that.usertype == 0) {
                  Message({
                    message: "救援机构登录成功",
                    type: "success"
                  });
                  window.localStorage.setItem(
                    "data",
                    JSON.stringify({
                      data: data.obj.token
                    })
                  );
                  window.localStorage.setItem(
                    "insti",
                    JSON.stringify(data.obj.user.insti)
                  );
                  that.$router.push({
                    name: "FacIndex",
                    params: {
                      token: data.obj.token,
                      insti: data.obj.user.insti
                    }
                  });
                } else if (that.usertype === 2) {
                  Message({
                    message: "监管机构登录成功",
                    type: "success"
                  });
                  window.localStorage.setItem(
                    "data",
                    JSON.stringify({
                      data: data.obj.token
                    })
                  );
                  window.localStorage.setItem(
                    "insti",
                    JSON.stringify(data.obj.user.insti)
                  );
                  that.$router.push({
                    name: "RegIndex",
                    params: {
                      token: data.obj.token,
                      insti: data.obj.user.insti
                    }
                  });
                } else if (that.usertype === 1) {
                  Message({
                    message: "指挥中心登录成功",
                    type: "success"
                  });
                  window.localStorage.setItem(
                    "data",
                    JSON.stringify({
                      data: data.obj.token
                    })
                  );
                  window.localStorage.setItem(
                    "insti",
                    JSON.stringify(data.obj.user)
                  );
                  console.log(data, data.obj);
                  that.$router.push({
                    name: "ComIndex",
                    params: {
                      token: data.obj.token,
                      insti: data.obj.user
                    }
                  });
                }
              } else {
                if (that.usertype == 0 && data.obj.user.type != 0) {
                  Message.error("登录失败，该用户不属于救援机构");
                } else if (that.usertype == 1 && data.obj.user.type != 1) {
                  Message.error("登录失败，该用户不属于指挥中心");
                } else if (that.usertype == 2 && data.obj.user.type != 2) {
                  Message.error("登录失败，该用户不属于监管机构");
                }
              }
            } else if (data.code === 200026) {
              //   alert("登录失败,用户名或密码错误");
              Message.error("登录失败，用户名或密码错误");
            } else {
              Message.error("登录失败，未知错误");
              //   alert("登录失败,其他错误");
            }
            console.log(data);
          });
      }
    }
  }
};
</script>

<style scoped>
@import url(./css/programme.css);
.points_box p{
    text-align: center;
    line-height: 1.45vw;
    padding: 4vw 21.3vw;
    font-size: 1.04vw;
}
.main .list li{
    height: 19vw;
}
.main .list li p{
    padding: 0 2vw;
}
</style>