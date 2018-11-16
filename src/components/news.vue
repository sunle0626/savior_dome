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
                <li @click="news()" class="pick pointer_box">新闻中心</li>
                <li @click="league()" class="pointer_box">全球救援联盟</li>
                <li @click="stars()" class="pointer_box">星使服务</li>
                </ul>
            </nav>
            <section class="section">
                    <div class="news">
                            <h5>新闻中心</h5>
                            <ul>  
                                   <li @click="newsDetail4()">
                                    <img src="../../static/img/images/news5.jpg" />
                                    <div>
                                        <p>2017中国企业走出去全球救援服务论坛暨“一带一路”商机与对策圆满召开</p>
                                        <p>22017中国企业走出去全球救援服务论坛暨“一带一路”商机与对策于3月22日在六朝古都南京圆满召开......</p>
                                        <span>2017.3.22</span>
                                    </div>
                                </li>
                                  <li @click="newsDetail5()">
                                    <img src="../../static/img/images/news3.png" />
                                    <div>
                                        <p>玄武湖畔各界嘉宾云集 钟山脚下共话全球救援</p>
                                        <p>2017年3月22日，由江泰国际合作联盟和江泰全球救援联盟共同主办的“2017全球救援服务论坛”在南京召开。......</p>
                                        <span>2017.3.22</span>
                                    </div>
                                </li>
                                <li @click="newsDetail3()">
                                    <img src="../../static/img/images/news4.jpg" />
                                    <div>
                                        <p>2017江泰全球救援联盟年会于南京成功召开</p>
                                        <p>2017年3月20日下午，由江泰救援服务有限公司于去年3月发起成立的江泰全球救援联盟在风光迤逦......</p>
                                        <span>2017.3.20</span>
                                    </div>
                                </li>
                                <li @click="newsDetail()">
                                    <img src="../../static/img/images/news1.jpg" />
                                    <div>
                                        <p>沈开涛董事长拜访联合国世界旅游组织总部</p>
                                        <p>西班牙当地时间2016年7月7日上午，江泰保险经纪股份有限公司和江泰救援服务有限公司沈开涛董事长......</p>
                                        <span>2016.12.6</span>
                                    </div>
                                </li>
                                <li @click="newsDetail2()">
                                    <img src="../../static/img/images/news-djx.png" />
                                    <div>
                                        <p>大救星：“一键救援”改变中国人出行方式</p>
                                        <p>国家旅游局数据显示，2015年中国公民出境1.28亿人次，2016年将达到1.8亿人次，预计2020年将达到5亿......</p>
                                        <span>2016.10.25</span>
                                    </div>
                                </li>
                            </ul>
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
    newsDetail() {
      this.$router.push({
        name: "newsDetail"
      });
    },
    newsDetail3() {
      this.$router.push({
        name: "newsDetail3"
      });
    },
    newsDetail4() {
      this.$router.push({
        name: "newsDetail4"
      });
    },
    newsDetail5() {
      this.$router.push({
        name: "newsDetail5"
      });
    },
    newsDetail2() {
      this.$router.push({
        name: "newsDetail2"
      });
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
  }
};
</script>

<style scoped>
@import url(../../static/css/global.css);
.news > h5 {
  width: 100%;
  font-size: 1.375vw;
  height: 3vw;
  line-height: 3vw;
  font-weight: normal;
  color: #333;
  text-align: start;
  margin-top: 0.5vw;
  margin-left: 1vw;
}
.section>div:first-child {
    margin-top: 0;
}
.news > ul {
  width: 100%;
}
.news > ul > li {
  width: 100%;
  height: 10.625vw;
  margin-bottom: 1.25vw;
  background: #fff;
  cursor: pointer;
}
.news > ul > li:last-child {
  border: 0;
}
.news > ul > li > img {
  display: block;
  float: left;
  margin-left: 1.25vw;
  margin-top: 0.625vw;
  width: 11.25vw;
  height: 9.375vw;
  margin-right: 1.25vw;
}
.news > ul > li > div {
  float: left;
  height: 9.375vw;
  margin-top: 0.625vw;
  width: 36.25vw;
}
.news > ul > li > div > p:nth-child(1) {
  height: 3.625vw;
  line-height: 3.875vw;
  font-size: 1.0625vw;
  color: #333;
}
.news > ul > li > div > p:nth-child(2) {
  line-height: 1.875vw;
  font-size: 0.875vw;
  width: 36.25vw;
  color: #666;
  height: 3.75vw;
}
.news > ul > li > div > span {
  display: block;
  float: right;
  height: 1.375vw;
  font-size: 0.875vw;
  color: #888;
  line-height: 1.875vw;
}
</style>