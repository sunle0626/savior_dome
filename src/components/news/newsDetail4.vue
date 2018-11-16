<template>
    <div>
                <header class="header">
                <img src="../../../static/img/images/banner1.png" alt="">
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
                <div class="newsDetail" >
                <h5>2017中国企业走出去全球救援服务论坛暨“一带一路”商机与对策圆满召开</h5>
                <p style="text-indent:2em;">2017中国企业走出去全球救援服务论坛暨“一带一路”商机与对策于3月22日在六朝古都南京圆满召开。本次会议由江泰全球救援联盟主办，中国产业海外发展协会协办。太平洋亚洲旅行协会主席安德鲁·琼斯先生（Andrew Nigel Jones）、斯里兰卡驻华大使卡鲁纳塞纳·科迪图瓦库先生及来自全球25个国家和地区的50余家救援/救助相关服务公司近百名代表，和国内近千名涉旅企业代表、专家学者参加了本次大会。39位国内外演讲嘉宾就全球和中国旅游业发展趋势、全球救援服务行业的发展、中国公民（包括游客、商务人员、劳务人员、留学人员、探亲访友者等）在境外期间所遇到的各种风险和问题、部分国家的医疗救助体系、星使服务、航空医疗转运服务、旅行服务、留学服务、安保服务、法律服务、“一带一路”有关国家的旅游投资机会、救援保险等议题进行了精彩演讲。</p>
                <img src="../../../static/img/images/news5.jpg"/>
                <p  style="text-indent:2em;">上百家媒体，包括新华社、人民日报、中央电视台、人民网、中新社、光明日报、参考消息、中国日报等，派记者对会议进行了报道，搜狐视频进行了全程网络视频直播。</p>

                <p  style="text-indent:2em;">江泰全球救援联盟主席、江泰救援服务有限公司董事长兼首席执行官沈开涛在致辞中，向与会嘉宾和代表详细阐述了中国公民走出去的发展历程，可能遇到的各种潜在风险，如政治，战争，疾病，自然灾害，恐怖袭击等，他们对境外救援和救助服务需求的紧迫感，以及江泰在应对这种需求时所作的努力。沈开涛董事长还向会议重点介绍了已经上线的救援服务系统“大救星”及其运营模式和服务，并热烈欢迎有关各方积极加入到大救星的体系当中，通过共享共赢的方式，为走出去的中国公民提供全面、优质的救援和救助服务。</p>
                <img src="../../../static/img/images/news5_1.jpg"/>
                <p  style="text-indent:2em;">太平洋亚洲旅行协会主席安德鲁·琼斯先生和斯里兰卡驻华大使卡鲁纳塞纳·科迪图瓦库阁下分别就亚太地区新生代旅游者旅行模式的变化和斯里兰卡旅游住宿以及基础设施的投资机会进行了介绍。</p>

                <p  style="text-indent:2em;">参会人员对会议演讲议题的内容表现出了极大的兴趣，认为丰富了知识，开拓了视野，对江泰的服务、实力和能力及大救星有了更深的了解，为未来合作打下了更坚实的基础。</p>

                <span>2017.3.22</span>
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
    </div>
</template>

<script>
import { Message } from "element-ui";
import constants from "../util/constants.js";
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
@import url(../../../static/css/global.css);
.news > h5 {
  width: 100%;
  font-size: 22px;
  text-align: center;
  height: 82px;
  line-height: 82px;
  font-weight: normal;
  color: #00abfa;
  margin-top: 10px;
}
.news > ul {
  width: 100%;
}
.news > ul > li {
  width: 100%;
  height: 170px;
  margin-bottom: 20px;
  background: #fff;
  cursor: pointer;
  border-bottom: 0.0625vw solid #333;
}
.news > ul > li:last-child {
  border: 0;
}
.news > ul > li > img {
  display: block;
  float: left;
  margin-left: 20px;
  margin-top: 10px;
  width: 180px;
  height: 150px;
  margin-right: 20px;
}
.news > ul > li > div {
  float: left;
  height: 150px;
  margin-top: 10px;
  width: 580px;
}
.news > ul > li > div > p:nth-child(1) {
  height: 58px;
  line-height: 62px;
  font-size: 17px;
  color: #333;
}
.news > ul > li > div > p:nth-child(2) {
  line-height: 30px;
  font-size: 14px;
  width: 580px;
  color: #666;
  height: 60px;
}
.news > ul > li > div > span {
  display: block;
  float: right;
  height: 22px;
  font-size: 14px;
  color: #888;
  line-height: 30px;
}
</style>