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
                <li @click="league()" class="pick pointer_box">全球救援联盟</li>
                <li @click="stars()" class="pointer_box">星使服务</li>
            </ul>
        </nav>
        <section class="section">
            <div class="league_box">
                <p>全球救援联盟于2016年创立，是由江泰救援服务有限公司（以下简称江泰救援）发起，并联合了全球知名的救援企业、航空公司、安保公司、律师事务所、旅行社等企业团体组织成立的，为中国公民提供全球范围救援服务的组织。江泰救援作为中国公民全球救援指挥中心，每年为联盟成员提供全球233个国家地区范围内的有关救援、安保、医疗、转运、旅游服务、财产安全等全救援链上的国人需求。加入我们，共建全球安保救援生态，服务更多出行国人。</p>
            </div>
            <div class="add_box">
                <h3>秉持“共享共赢”宗旨，全球救援联盟每个成员可以享受：</h3>
                <ul>
                    <li>
                      <img src="../../static/images/1_list.png" alt="">
                      加入中国走出去发展的大机遇</li>
                    <li>
                      <img src="../../static/images/2_list.png" alt="">
                      获得全球范围内更多出行国人的救援需求</li>
                    <li>
                      <img src="../../static/images/3_list.png" alt="">
                      依托联盟平台，相互委托，达成更多合作</li>
                    <li>
                      <img src="../../static/images/4_list.png" alt="">
                      每年举行联盟年会，共享资源与信息</li>
                </ul>
            </div>                                                                                                                                                                                                       
        </section>    
    </main>
    <p class="p_box">
      <button @click="iscover=true">立即加入全球救援</button>
    </p>
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
    <div v-if="iscover" class="cover">
        <div class="modal">
            <h2>服务商加盟</h2>
            <form>
                <label for="name">
                    <span>
                        <small>公司名称:</small>
                        <small>Company name</small>
                    </span>
                    <input type="text" name="" id="name" placeholder="输入公司名称">
                </label>
                <label for="type">
                    <span>
                        <small>服务类型:</small>
                        <small>Service type</small>
                    </span>
                    <input type="text" name="" id="type" placeholder="输入公司服务类型">
                </label>
                <label for="Country">
                    <span>
                        <small>国家:</small>
                        <small>Country</small>
                    </span>
                    <input type="text" name="" id="Country" placeholder="输入公司所服务的国家">
                </label>
                <label for="Contact">
                    <span>
                        <small>联系人姓名:</small>
                        <small>Contact name</small>
                    </span>
                    <input type="text" name="" id="Contact" placeholder="输入公司联系人">
                </label>
                <label for="Tel">
                    <span>
                        <small>电话:</small>
                        <small>Tel</small>
                    </span>
                    <input type="text" name="" id="Tel" placeholder="输入联系人电话">
                </label>
                <label for="Email">
                    <span>
                        <small>邮箱:</small>
                        <small>Company name</small>
                    </span>
                    <input type="text" name="" id="Email" placeholder="输入公司邮箱">
                </label>
                <label for="Message">
                    <span>
                        <small>信息:</small>
                        <small>Message</small>
                    </span>
                    <input type="text" name="" id="Message" placeholder="输入公司邮箱">
                </label>
            </form>
            <p><button @click="iscover=false;ok()">提交信息</button></p>
        </div>
        <span @click="iscover=false" class="remove pointer_box">
            ×
        </span>
    </div>
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
      iscover: false,
      flag: true,
      usertype: "",
      user: "",
      pwd: ""
    };
  },
  methods: {
    ok() {
      Message.success("您已成功提交信息");
    },
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
  },
  mounted() {
    // let btn = document.querySelector(".btn");
    // let cover = document.querySelector(".cover");
    // let modal = document.querySelector(".modal");
    // let remove = document.querySelector(".remove");
    // btn.onclick = function() {
    //   cover.style.display = "block";
    // };
    // remove.onclick = function() {
    //   cover.style.display = "none";
    // };
  }
};
</script>

<style scoped>
@import url(../../static/css/global.css);
.section > div:first-child {
  margin-top: 0.9vw;
}
.section .league_box p {
  font-size: 1.125vw;
  color: #666;
}
.section .add_box h3 {
  font-size: 1.375vw;
  color: #333;
}
.section .add_box ul {
  margin-top: 0.9375vw;
}
.section .add_box ul li {
  font-size: 1.125vw;
  position: relative;
  line-height: 3vw;
  height: 3vw;
  color: #333;
  display: flex;
  align-items: center;
}
.section .add_box ul li img {
  height: 1.5vw;
  margin-right: 1vw;
  width: 1.5vw;
}
.p_box {
  padding-bottom: 3.15vw;
  background: #fff;
  text-align: center;
}
.p_box button {
  width: 18.75vw;
  height: 3.4375vw;
  border: 0;
  border-radius: 0.375vw;
  background: #00abfa;
  color: #fff;
  font-size: 1.25vw;
}
.cover {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 997;
  background: rgba(0, 0, 0, 0.3);
}
.modal {
  position: absolute;
  top: 50%;
  margin-top: -21.25vw;
  left: 50%;
  margin-left: -28.125vw;
  background: #fff;
  width: 56.25vw;
  height: 42.5vw;
  z-index: 998;
  border-radius: 0.3125vw;
  border: 0.0625vw solid #d9ddde;
}
.remove {
  position: fixed;
  top: 2vw;
  right: 17vw;
  width: 2.5vw;
  height: 2.5vw;
  font-size: 1.875vw;
  color: #ccc;
  text-align: center;
  line-height: 2.5vw;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
}
.modal h2 {
  width: 100%;
  text-align: center;
  margin-top: 0.625vw;
  line-height: 3.125vw;
  font-size: 1.25vw;
  color: #333;
}
.modal form {
  width: 100%;
  padding: 1vw 5vw 2vw;
  box-sizing: border-box;
}
.modal form label {
  display: block;
  width: 100%;
  height: 2.8125vw;
  margin-top: 1.875vw;
}
.modal form label:first-child {
  margin-top: 0;
}
.modal form label span {
  float: left;
  width: 11.25vw;
}
.modal form label span small {
  display: inline-block;
  width: 100%;
}
.modal form label span small:first-child {
  font-size: 1vw;
  color: #303030;
}
.modal form label span small:last-child {
  font-size: 0.875vw;
  color: #777;
}
.modal form label input {
  float: left;
  height: 2.8125vw;
  width: 28.125vw;
  border: 0;
  border-radius: 0.3125vw;
  border: 0.0625vw solid #ccc;
  padding-left: 0.9vw;
}
.modal > p {
  width: 100%;
  text-align: center;
}
.modal > p button {
  width: 17.5vw;
  height: 3.125vw;
  border: 0;
  border-radius: 0.25vw;
  background: #00abfa;
  font-size: 1.3125vw;
  color: #fff;
}
</style>