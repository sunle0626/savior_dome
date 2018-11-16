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
<h5>2017江泰全球救援联盟年会于南京成功召开</h5>
<p style="text-indent:2em;">2017年3月20日下午，由江泰救援服务有限公司于去年3月发起成立的江泰全球救援联盟在风光迤逦的南京成功召开了首次年会。来自全球21个国家和地区的联盟成员代表出席了本次年会，另有20多家即将加入联盟的公司亦派代表作为观察员前来参会。</p>
<p  style="text-indent:2em;">江泰全球救援联盟主席沈开涛做了会议致辞。他在致辞中表示，江泰全球救援联盟是全球第一个专门为在境外的中国公民提供救援、救助服务的组织，他的成立是基于逐年上涨的中国出境人数以及出境中国公民日益增加的市场需求。随着中国公民出境人数的迅猛增长，中国公民出境遇到的风险也在不断增加，世界各地各种风险和安全事故频繁发生，如何保障出境中国公民在境外的安全，如何让陷入困境的中国公民得到有效的救援救助，成为政府、社会、企业以及广大人民十分关注的现实问题。面对前所未有的潜在市场规模与需求，江泰建立了一个集约化的救援服务平台，使在海外的中国公民的所有需求都能够通过这个平台获得满足，同时也给它的服务供应商带来了无限商机。在过去一年，江泰为扩大联盟的力量和全球化网络的建设，付出了巨大的努力，派出了13个团组，前往全球六大洲近100个国家进行考察，拜访了600多家机构，包括各类救援和救助服务商、中国驻外使领馆及其领事保护部门和中国驻外旅游办事处。同时在线上，江泰开发了名为“大救星”的基于移动互联网技术的手机APP，将用户、服务商、个体救援服务者（星使）、金融保险、支付功能、即时通讯功能及后台服务等要素，有机地整合为一体，构建了一个高效、便捷的中国公民境外救援服务生态。</p>
<img src="../../../static/img/images/news4.jpg"/>
<p  style="text-indent:2em;">随后江泰全球救援联盟秘书长、江泰救援服务有限公司副总经理陈洁对过去一年江泰全球救援联盟工作进行了回顾，并介绍了联盟的章程。陈洁表示自2016年3月20日联盟成立起至今，江泰派出了13组团出访海外进行考擦，足迹遍布了全球六大洲近100个国家，与600多家机构进行了面对面的商务洽谈，包含救援集团/公司、包机公司、医疗机构、安保公司、律师事务所和旅行社等各个领域的潜在合作伙伴。目前共有63家机构已经加入江泰全球救援联盟，100余家机构达成意向即将加入江泰全球救援联盟。未来江泰会继续大力发展联盟成员，建立和完善江泰全球救援联盟秘书部与全体成员之间的沟通机制，加速和推进江泰与联盟成员的业务联系，建立资源共享、市场共享、服务共享和利益共享的平台，为联盟成员带来无限商机。</p>
<p  style="text-indent:2em;">中国科学院地理科学与资源研究所席建超博士作为国家旅游局政策咨询专家、国家旅游“十三五规划”特聘专家受邀在年会的演讲中对中国出境旅游市场的现状进行了分析，并为在场嘉宾描绘了未来中国出境游市场的巨大蓝图。席博士表示2016年中国出境游人数1.22亿人次，约占全球国际旅游者总数的10%，同时出境旅游消费1098亿美元(约7600亿元人民币)，以全球10%的旅游人次，贡献了全球23.2%的旅游消费。预计到2020年，中国出境旅游市场保守估计在2.5亿人次，旅游消费达到2500亿美元市场。并且随着中国“一带一路”等政策的推动，中国出境旅游将成为旅游业和旅游企业发展的蓝海。</p>
<p  style="text-indent:2em;">2江泰保险经纪股份有限公司副总裁崔敬与副总裁张志安分别在会上介绍了与江泰救援服务有限公司合作推出的救援保险以及江泰保险经纪股份有限公司旅游渠道客户日益增加的境外救援、救助服务需求。意中旅游事务促进会会长史译作为身处海外的华人星使代表以其切身体会分享了其对出境游客旅行风险管理的深知灼见。三家来自德国、台湾的救援公司、安保公司、律所联盟成员代表也分别阐述了加入江泰全球救援联盟，携手为出境中国公民服务的强烈意愿。会议中，江泰全球救援联盟主席沈开涛还为出席了此次联盟年会的联盟成员颁发了联盟成员证书。</p>
<img src="../../../static/img/images/news4_1.jpg"/>
<p  style="text-indent:2em;">江泰全球救援联盟自成立以来首次年会的成功召开，全球多家联盟成员的积极参与无疑是对江泰全球救援联盟过去一年工作的肯定。2016年江泰搭建了强大的全球救援服务网络，运用互联网+思维与共享经济模式，建设了资源共享、市场共享、服务共享和利益共享的平台，将保险与救援服务完美结合，为加入江泰全球救援联盟的成员机构建立了信心，相信未来江泰全球救援联盟将携手联盟成员共同进步、共同发展、共同服务于为每一个走出去的中国公民，为海外中国公民提供安全、安心、安康的救援服务，填补中国公民海外商业化全球救援服务的空白，开创中国海外商业化救援服务的新篇章。</p>
<span>——江泰救援服务有限公司 李琼</span>
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