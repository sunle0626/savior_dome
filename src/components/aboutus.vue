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
                <li @click="aboutus()" class="pick pointer_box">关于我们</li>
                <li @click="news()" class="pointer_box">新闻中心</li>
                <li @click="league()" class="pointer_box">全球救援联盟</li>
                <li @click="stars()" class="pointer_box">星使服务</li>
            </ul>
        </nav>
        <section class="section">
            <div class="about_box">
                <h3>关于我们</h3>
                <p>大救星是中国公民全球救援云平台，平台设立了全球救援指挥中心，为中国公民提供全方位全天候24小时的包括医疗、安保、护理、向导、法律、防护、咨询、秘书等十多项救援服务。在大救星平台，同时活跃了大量的“星使”群体，为国人提供个性化线下陪同服务。</p>
                <p>大救星致力于同政府单位、救援服务商、保险单位、银行、律师事务所、企业园区以及社会群体协作互补，通过智慧、智能、高效创新方案解决中国人全球出行的风险预警、安全保障、救援服务。大救星正同越来越多的救援产业链企业建立合作联盟，联手打造救援服务大平台。</p>
                <p>在全球范围内，大救星已经建立了横跨全救援产业链的全球救援联盟，构建了随时触及全球出行国人的救援网络，覆盖了233个国家和地区。2016年，大救星上线了移动端APP——大救星，开启了由电话救援到网络救援的升级，实现了从保救分离到防范、保障、救援的融合。我们将持续升级优化服务，在打造中国人全球救援第一平台的道路上，不断前行。</p>
            </div>
            <div class="vision_box">
                <h3>愿景</h3>
                <p>
                    <span>中国公民全球第一救援指挥中心</span>
                    <span>改变中国公民海外生活方式的领航企业</span>
                </p>
            </div>
            <div class="mission_box">
                <h3>使命</h3>
                <p>中国公民海外出行 有求必救</p>
            </div>
        </section>
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
    news() {
      this.$router.push({
        name: "news"
      });
    },
    league() {
      this.$router.push({
        name: "league"
      });
    },
    stars() {
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
@import url(../../static/css/global.css);
.section h3 {
  font-size: 1.375vw;
  font-weight: 500;
  color: #333;
}
.section .about_box p {
  font-size: 1vw;
  margin-top: 1.5625vw;
  color: #333;
}
.section .vision_box p,
.section .mission_box p {
  font-size: 1vw;
  margin-top: 1.125vw;
  color: #333;
}
.section .vision_box p span {
  font-size: 1vw;
  display: block;
}
span + span {
  margin-top: 0.5vw;
}
</style>