<template>
    <div>
 <header class="header">
                <img src="../../static/img/images/banner2.png" alt="">
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
                        <li @click="contact()" class="pointer_box pick_box">
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
            <h2>联系方式</h2>
            <ul>
                <li>
                    <img src="../../static/img/images/icon_01.png" alt="">
                    <div class="list_box">
                        <h3>大救星总部</h3>
                        <p>地址：北京市门头沟区石龙经济开发区莲石湖西路98号9号楼</p>
                        <p>电话：（010）69808888-6002</p>
                    </div>
                </li>
                <li>
                    <img src="../../static/img/images/icon_02.png" alt="">
                    <div class="list_box">
                        <h3>保险单位合作</h3>
                        <p>电话：（010）69808888-9872</p>
                        <p>邮箱：chenjie@jiangtai.com</p>
                    </div>
                </li>
                <li>
                    <img src="../../static/img/images/icon_03.png" alt="">
                    <div class="list_box">
                        <h3>服务商加盟</h3>
                        <p><span @click="league()" class="pointer_box">联盟介绍 </span><span @click="league()" class="pointer_box">申请加盟</span></p>
                    </div>
                </li>
                <li>
                    <img src="../../static/img/images/icon_04.png" alt="">
                    <div class="list_box">
                        <h3>星使申请</h3>
                        <p><span class="pointer_box" @click="stars()">成为星使</span></p>
                    </div>
                </li>
                <li>
                    <img src="../../static/img/images/icon_05.png" alt="">
                    <div class="list_box">
                        <h3>报案救援求助</h3>
                        <p>电话：（010）68189191</p>
                    </div>
                </li>
                <li>
                    <img src="../../static/img/images/icon_06.png" alt="">
                    <div class="list_box">
                        <h3>意见建议反馈</h3>
                        <p><span @click="feedback()" class="pointer_box">意见反馈</span></p>
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
            <p @click="contact()" class="txt pointer_box pick_box">合作查询</p>
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
        stars(){
      this.$router.push({
        name: "stars"
      });
    },
    league() {
      this.$router.push({
        name: "league"
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
h3,
p {
  text-align: start;
}
.main {
  display: block;
  padding: 7.45vw 15vw 6vw 21vw;
}
.main h2 {
  font-size: 1.625vw;
  margin-left: 1.25vw;
  color: #333;
}
.main ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.main ul li {
  width: 40%;
  display: flex;
  padding: 1.875vw 0.9375vw;
}
.main ul li img {
  width: 3.75vw;
  height: 3.75vw;
}
.main ul li .list_box {
  margin-left: 0.9375vw;
}
.main ul li .list_box h3 {
  font-size: 1.25vw;
  color: #333;
  line-height: 3.75vw;
}
.main ul li .list_box p {
  color: #666;
  font-size: 1.1vw;
  margin-top: 0.3125vw;
}
.main ul li .list_box p + p {
  margin-top: 0.6vw;
}
.main ul li .list_box p span {
  color: #ff860f;
  text-decoration: underline;
  text-decoration-color: #ff860f;
}
.main ul li .list_box p span + span {
  margin-left: 2.1875vw;
}
</style>