<template>
    <div>
<header class="header">
            <img src="../../static/img/images/banner.png" alt="">
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
            <form> 
               <p class="user">您的身份:</p> 
               <span class="radio_box" style=" margin-left: 0.1875vw">
                    <input type="radio" id="radio_1" name="radio">
                    <label for="radio_1"></label>
                    <em>报案人</em>
                </span>
                <span class="radio_box">
                        <input type="radio" id="radio_2" name="radio">
                        <label for="radio_2"></label>
                        <em>投保人</em>
                </span>
                <span class="radio_box">
                        <input type="radio" id="radio_3" name="radio">
                        <label for="radio_3"></label>
                        <em>服务商</em>
                </span>
                <span class="radio_box">
                        <input type="radio" id="radio_4" name="radio">
                        <label for="radio_4"></label>
                        <em>保险公司</em>
                </span>
                <span class="radio_box">
                        <input type="radio" id="radio_5" name="radio">
                        <label for="radio_5"></label>
                        <em>合作单位</em>
                </span>     
                <span class="radio_box">
                        <input type="radio" id="radio_6" name="radio">
                        <label for="radio_6"></label>
                        <em>星使</em>
                </span>   
                <span class="radio_box">
                        <input type="radio" id="radio_7" name="radio">
                        <label for="radio_7"></label>
                        <em>没用过大救星</em>
                </span>                             
                <div class="of_box">
                    您的建议是有关于：
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                </div>
                <div class="fill_box">
                    <p class="xxx">请填写您的建议</p>
                    <label for="username"><span>姓名:</span><input type="text" name="username" id="username" placeholder="请输入您的姓名 "></label>
                    <label for="tel"><span>联系方式:</span><input type="text" name="tel" id="tel" placeholder="请留下您的联系方式，方便我们快速沟通反馈 "></label>
                </div>
                <div class="text">
                        <p>建议:</p>
                        <textarea name="" id="" cols="30" rows="10" placeholder="请填写你的建议"></textarea>
                </div>
            </form> 
    </main>
                <p class="p">
              <button @click="ok()">提交反馈</button>
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
            <p @click="feedback()" class="txt pointer_box pick_box">意见反馈</p>
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
      pwd: "",
      value:"产品功能",
      options: [
        {
          value: "产品功能",
          label: "产品功能"
        },
        {
          value: "客户服务",
          label: "客户服务"
        },
        {
          value: "规则制度",
          label: "规则制度"
        },
        {
          value: "救援服务",
          label: "救援服务"
        },
        {
          value: "星使服务",
          label: "星使服务"
        },
        {
          value: "价格相关",
          label: "价格相关"
        },
        {
          value: "其他",
          label: "其他"
        }
      ]
    };
  },
  methods: {
    ok(){
      Message.success('您已成功提交反馈')
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
.main {
  padding: 7.45vw 15vw 3vw;
}
.radio_box {
  font-size: 1vw;
  line-height: 1.875vw;
  margin-left: 4.0625vw;
}
.user {
  font-size: 1.375vw;
  line-height: 2.75vw;
}
.of_box {
  font-size: 1.375vw;
  padding: 1.875vw 0;
  text-align: start;
}
.of_box select {
  height: 3.125vw;
  width: 18.75vw;
  border: 0;
  font-size: 1.25vw;
  border-radius: 0.25vw;
  border: 0.0625vw solid #ccc;
}
.fill_box p {
  font-size: 1.375vw;
}
.fill_box label {
  display: block;
  height: 2.5vw;
  margin-top: 0.625vw;
}
.fill_box label + label {
  margin-top: 1vw;
}
.fill_box label span {
  float: left;
  text-align: start;
  line-height: 2.5vw;
  font-size: 1.125vw;
  width: 6.25vw;
}
.fill_box label input {
  float: left;
  height: 2.5vw;
  width: 24.375vw;
  border: 0;
  border-radius: 0.25vw;
  border: 0.0625vw solid #ccc;
}
.text {
  margin-top: 1.875vw;
  text-align: start;
}
.text p {
  float: left;
  font-size: 1.375vw;
  line-height: 2.75vw;
}
.text textarea {
  font-size: 1vw;
  padding: 0.8vw;
  float: left;
  margin-left: 3vw;
  margin-top: 1vw;
  width: 37.5vw;
  height: 11.875vw;
  border: 0;
  border-radius: 0.25vw;
  border: 0.0625vw solid #ccc;
}
.el-select-dropdown__item {
  text-align: center;
}
.xxx {
  margin-bottom: 1.2vw;
}
.p {
  padding: 1vw 0 3vw;
  text-align: center;
  background: #fff;
}
.p button {
  width: 18.75vw;
  height: 3.4375vw;
  border: 0;
  border-radius: 0.375vw;
  background: #00abfa;
  color: #fff;
  font-size: 1.25vw;
}
</style>