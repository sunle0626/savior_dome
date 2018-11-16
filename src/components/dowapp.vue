<template>
    <div>
        <header class="header">
            <img src="../../static/img/images/bg.png" alt="">
            <div class="nav">
                <div class="nav_left">
                    <img src="../../static/img/images/logo_.png" alt="">
                </div>
                <div class="nav_right">
                    <ul>
                        <li @click="index()" class="pointer_box">
                            首页
                        </li>
                        <li @click="dowapp()"  class="pick_box pointer_box">
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
            <div class="phone_box">
                <img src="../../static/img/images/phone.png" alt="">
            </div>
            <div class="font_box">
                <img src="../../static/img/images/font.png" alt="">
            </div>
            <div class="btn_box">
                <img src="../../static/img/images/ios .png" alt="">
                <img src="../../static/img/images/android.png" alt="">
            </div>
            <div class="dow_box">
                  <img src="../../static/img/images/QR.png" alt="">
                  <p>扫描二维码&nbsp;下载大救星app</p>
            </div>
        </header>
        <main class="main">
            <ul>
                <li>
                    <img src="../../static/img/images/sos.png" alt="">
                    <div>
                        <h4>一键救援，报案即救援</h4>
                        <p>大救星是国家批示的中国公民全球第一救援指挥中心，自建了完善高效的报案响应机制，任何类型、任何时间的报案都能秒级授理，努力做到有报案必救援</p>
                    </div>
                </li>
                <li>
                    <img src="../../static/img/images/card.png" alt="">
                    <div>
                        <h4>在线保单卡，安全随身行</h4>
                        <p>独立研发的在线保单卡功能，能自动识别用户当前保单信息、保单范围等，支持保险咨询、关联报案等智能网络保障服务，大大提高保险报案救援效率</p>
                    </div>
                </li>
                <li>
                    <img src="../../static/img/images/star.png" alt="">
                    <div>
                        <h4>本地星使，个性化服务</h4>
                        <p>分布在全球233个国家地区本地星使，随时满足你的救援、向导、陪同、就医、翻译、咨询等本地线上线下救援、服务需求</p>
                    </div>
                </li>
                <li>
                    <img src="../../static/img/images/orie.png" alt="">
                    <div>
                        <h4>全方位救援，求救即得救</h4>
                        <p>江泰全球救援联盟拥有上万家安保公司、医疗机构、航空公司、律师事务所、旅行社等联盟成员，能有效支持24h、全事件、全球范围的紧急突发救援事件，努力做到求救即能得救。</p>
                    </div>
                </li>
            </ul>
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
import constants from './util/constants.js';
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
/* @import "../css/index.css"; */
.phone_box {
  position: absolute;
  top: 6.25vw;
  left: 18.75vw;
  width: 18.75vw;
  z-index: 3;
}
.font_box {
  position: absolute;
  top: 10.625vw;
  right: 9.375vw;
  width: 50vw;
}
.font_box img {
  width: 100%;
}
.phone_box img {
  width: 100%;
}
.btn_box {
  position: absolute;
  width: 18.75vw;
  top: 16.875vw;
  left: 41.25vw;
}
.btn_box img {
  display: block;
  width: 100%;
}
.dow_box {
  position: absolute;
  text-align: center;
  width: 15vw;
  top: 17.1875vw;
  right: 16.25vw;
}
.dow_box img {
  width: 10vw;
}
.dow_box p {
  color: #fff;
  text-align: center;
}
.main ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.main{
  padding: 7.45vw 15vw 8vw;
}
.main ul li {
  width: 45%;
  margin-top: 5vw;
  display: flex;
}
.main ul li :nth-child(2n){
  margin-left: 5%;
}
.main ul li img {
  width: 6.25vw;
  height: 6.25vw;
}
.main ul li div h4 {
  font-size: 1.25vw;
  color: #333;
}
.main ul li div p {
  margin-top: 0.75vw;
  font-size: 1vw;
  color: #666;
}
</style>