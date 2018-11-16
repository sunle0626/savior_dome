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
                    <h5>沈开涛董事长拜访联合国世界旅游组织总部</h5>
                    <p>沈开涛董事长拜访联合国世界旅游组织总部</p>
                    <img src="../../../static/img/images/new1.jpg"/>
                    <p class="two">西班牙当地时间2016年7月7日上午，江泰保险经纪股份有限公司和江泰救援服务有限公司沈开涛董事长一行五人在马德里联合国世界旅游组织总部拜会了该组织执行主任祝善忠先生和亚太部主任徐京先生。</p>
                    <p class="two">联合国世界旅游组织是联合国负责推动世界旅游发展的政府间组织，现有包括中国在内的150个正式成员国（政府成员）、以及其它上百家企业附属成员和联系成员。</p>
                    <p class="two">会谈中，沈开涛董事长向祝善忠执行主任和亚太部徐京主任详细介绍了江泰在过去16年里从无到有、从小到大的发展历程，以及当前正在开展的为中国企业走出去服务、为中国公民走出去服务、为中国私人投资者走出去服务的国际布局和为此搭建的三个电子商务平台-大救星、优投和代代富。此次西班牙之行的重点，正是为了发展我们的救援服务商和星使队伍，以使今年8月底开始上线的大救星救援服务能够落地。</p>
                    <p class="two">沈开涛董事长还表达了江泰对全球海岛旅游安全问题的关注，因为越来越多的中国人喜欢前往本国和外国的海岛度假，而海岛旅游与大陆旅游相比隐藏着很多特殊安全风险，如由于海岛医疗设施不健全，普遍存在自然灾害和医疗紧急救援风险，希望能与世界旅游组织共同举办一些活动，来唤起和提高大家对海岛旅游的安全意识和风险防范与紧急救援意识。</p>
                    <img src="../../../static/img/images/new2.jpg"/>
                    <p class="two">祝善忠执行主任对江泰代表团的到访表示了热烈欢迎，并介绍了联合国世界旅游组织的性质、成员架构，以及在推动世界旅游，特别是亚洲地区旅游发展的过程中所做的工作。祝善忠执行主任高度评价江泰旅行社责任保险全国统保示范项目对中国旅游安全和风险管理里所发挥的重要作用，赞赏江泰正在建设的大救星电子商务平台，和沈开涛董事长在其中所表现出的超前思维和前瞻性。他表示，由于他本人在世界旅游组织中专门分管丝绸之路旅游发展，沿线国家同时也包含了中国政府正在倡导和推动的“一带一路”的国家，因此，愿意和江泰共同合作，通过联合举办一些论坛、研讨会等活动，就“一带一路”沿线国家的旅游安全风险和防范问题进行研究。同时，海岛旅游安全也一直是世界旅游组织所关注的问题，双方在这方面同样也可以开展合作。</p>
                    <p class="two">最后，双方同意会后保持紧密联系，研究具体方案，落实双方的合作意向，为推动全球旅游安全共同努力。</p>
                    <span>2016.10.25</span>
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