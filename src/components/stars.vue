<template>
    <div>
        <header class="header">
                <img src="../../static/img/images/banner1.png" alt="">
                <div class="nav">
                    <div class="nav_left">
                        <img src="../../static/img/images/logo_.png" alt="">
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
            </header>
        <main class="main">
            <nav class="nav">
                <ul>
                <li @click="aboutus()" class="pointer_box">关于我们</li>
                <li @click="news()" class="pointer_box">新闻中心</li>
                <li @click="league()" class="pointer_box">全球救援联盟</li>
                <li @click="stars()" class="pick pointer_box">星使服务</li>
                </ul>
            </nav>
            <section class="section">
                <div class="serve_box">
                    <h3>星使服务</h3>
                    <p>星使服务是由江泰救援自研自建的本地服务，我们拥有完整的服务模式和星使培训体系，截至目前已经有近一千名熟悉本地服务的星使分布在全球各地，为国人提供当地救援、救助、陪同、向导、翻译、法律援助、住院安排、医疗就诊、转运等线上线下服务。依托于江泰救援平台，星使可以自行设定服务项目，自动接收来自国人的有酬求助、陪同邀请等。服务亿万国人的同时，还能赚取一笔收益，快来加入星使团队吧。</p>
                </div>
                <div class="what_box">
                    <h3>如何成为星使？</h3>
                    <div class="what_wrap">
                        <p class="title">✔ &nbsp; 下载大救星</p>
                        <p class="title_p">Android手机：国内手机从各大应用市场如360手机助手等应用下载，国外手机从Googleplay下载；</p>
                        <p class="title_p">苹果手机：从AppStore下载；</p>
                            <p class="title">✔ &nbsp; 要成为星使，需要进行以下5步操作。</p>
                            <p class="pt">1.	填写手机号码点击下一步。</p>
                            <img src="../../static/img/images/step1.png" />
                            <p class="pt">2.	收到验证码后输入验证码、设置密码登录成为用户。</p>
                            <img src="../../static/img/images/step2.png" />
                            <p class="pt">3.	点击左上角找到星使认证。</p>
                            <img src="../../static/img/images/step3.png" />
                            <img src="../../static/img/images/step4.png" />
                            <p class="pt">4.	依次填写星使认证相关资料。</p>
                            <img src="../../static/img/images/step5.png"/>
                            <p class="pt">5.	资料填写完成后点击右上角“提交”，等待星使认证审核。</p>
                            <img src="../../static/img/images/step6.png"/>
                    </div>
                </div>
            </section>
        </main>
        <p class="center">星使资料提交成功后，我们会在48小时内审核您的资料，通过审核后，系统会有相关信息通过大救星平台通知您。</p>
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
            <p @click="aboutus()" class="txt pointer_box pick_box">关于大救星</p>
                <div class="rq_one">
                    <p>下载大救星</p>
                    <img src="../../static/img/images/rq_code_dow.png" alt="">
                </div>
                <div class="rq_two">
                    <p>微信公众号</p>
                    <img src="../../static/img/images/rq_code_public.png" alt="">
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
    </div>
</template>

<script>
import { Message } from "element-ui";
import constants from "./util/constants.js";
export default {
  data() {
    return {
      flag: true,
      usertype: "",
      user: "",
      pwd: ""
    };
  },
  methods: {
    news(){
      this.$router.push({
        name: "news"
      });
    },
    league(){
      this.$router.push({
        name: "league"
      });
    },
    stars(){
      this.$router.push({
        name: "stars"
      });
    },
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
        fetch(constants.domain+"rescue/user/login", {
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
@import url(../../static/css/global.css);
.title_p{
  margin-left: 1.9vw;
}
.section  h3{
    font-size:1.375vw;
    font-weight: 500;
    color: #333;
}
.section .serve_box p{
    font-size: 1.125vw;
    color: #333;
    margin-top: 1.125vw;
}
.section .what_box .what_wrap{
    margin-top: 1.125vw;
}
.title{
    font-size: 1.125vw;
    height: 2.5vw;
    line-height: 2.5vw;
}
.pt{
    width: 50%;
    margin:2vw auto 0;
    font-size: 1.125vw;
    line-height: 2.125vw;
    font-weight: normal;
}
.what_wrap p{
    color: #333;
}
.what_wrap img{
    display: block;
    margin: 10px auto;
    width: 50%;
}
.center{
  padding-bottom: 3.125vw;
  background: #fff;
  text-align: center;
  box-sizing: border-box;
}
</style>