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
                    <h5>大救星：“一键救援”改变中国人出行方式</h5>
                    <p style="text-indent:2em;">国家旅游局数据显示，2015年中国公民出境1.28亿人次，2016年将达到1.8亿人次，预计2020年将达到5亿人次以上。中国公民出境人数迅猛增长，遇到的风险也不断增加，小到各种突发意外事故和意外疾病，大到军事冲突、自然灾害、突发公共卫生事件、社会动荡和恐怖袭击，越来越多的风险对远离亲人和故土的中国公民的生命和财产安全构成了威胁。</p>
                    <h6>出境公民风险日益凸显，亟待建立多元化解决体系</h6>
                    <p  style="text-indent:2em;">在境外遇到各种风险时，中国公民首先想到的是领事保护。仅2015年，中国在全球范围内妥善处理了近6万起涉及中国公民权益与安危的领事保护案件，外交部全球领事保护与服务应急呼叫中心12308热线累计接听并处理来电十几万次。</p>
                    <p  style="text-indent:2em;">而随着“走出去”公民人数的快速增加，以领事救助为主的海外救助承载的压力几何增长。从全国旅行社责任统保示范项目的报案数据也能看出其中端倪，2014年全年受理境外报案1466件，而2016年前11个月境外报案已达2433件，与2014年相比翻了一番。</p>
                    <p  style="text-indent:2em;">而目前领事救助受到诸如法律界限、人力、物力等多方限制，无法及时满足和全部满足出境公民的求助需求，难免发生覆盖面不足或是鞭长莫及的情况。此外，出境公民一旦发生重大或紧急情况，其户籍所在地政府也需要赶赴事发地参与救助，手续繁琐，效率也无法保证，也给各级政府带来了压力。</p>
                    <p  style="text-indent:2em;">2014年10月2日，一辆载有中国游客的大巴在南非发生交通事故，造成3死数伤。当地医院在救治过程中产生了数千万元人民币的巨额费用，由于费用支付问题，最后一名伤者在当地医院被拖了近一年才得以回国。期间，大使馆、外交部、旅游局、北京市和组团社进行了多方协调，才使问题获得解决。</p>
                    <p  style="text-indent:2em;">在境外的中国公民中，除出境旅游人群外，还有大量留学生、劳务人员等群体，长期在境外学习、工作，让这些群体面临的风险更加多样与复杂，近年来中国留学生境外遇害的事件也屡屡见诸报端。</p>
                    <p style="text-indent:2em;">数据显示，中国公民在境外涉及意外重病和意外重伤的出险率约在千分之三左右，约为30万—50万人次。而另有80%的出国人员会在旅游、商务、劳务、留学和探亲活动中产生其它求助需求，如海外医疗、运动防护、航班延误、证件丢失、安保服务、向导服务、法律服务、生活服务等等。但中国出境公民购买旅行意外保险的比例不足50%，现状令人担忧。</p>
                    <p style="text-indent:2em;">中国政府近年来组织的数次撤侨行动都有效保障了中国出境公民的生命安全，赢得了国际国内舆论的赞誉。中国无疑正逐步与国际惯例接轨，令人鼓舞。但是，除了重大灾难和动荡外，危及中国出境公民海外安全的突发性个案，目前尚未见成熟的应对体系。如何用市场化手段填补这一需求，让陷入困境的中国公民得到有效的救援，成为政府、社会、企业需要共同携手解决的问题。</p>
                    <p style="text-indent:2em;">中国旅游研究院院长戴斌认为，随着我国出境游进入“亿人次时代”，加快建立我国出境旅游安全保障体系刻不容缓。要形成个人、企业、非政府组织、政府协同合作的中国公民海外救援体系。</p>
                    <h6>“一键救援”助力中国公民走出去</h6>
                    <p style="text-indent:2em;">正是基于上述，江泰以其近十年运行全国旅行社责任险的经验，本着“成全别人，成就自己”的理念，决定开启中国公民海外救援服务事业。诚如江泰全球救援联盟主席、江泰救援服务有限公司董事长沈开涛所说：“中国脚步和中国的海外利益走到哪里，我们的保护与服务就跟到哪里。”今年三月成立的江泰救援服务有限公司和由其组建的“江泰全球救援服务联盟”标志着江泰在救援服务事业方面迈出的第一步。经过将近一年的潜心努力，中国公民全球救援服务第一平台——“大救星”终于诞生了。</p>
                    <p style="text-indent:2em;">“大救星”是一个基于移动端互联网的生态圈，它包括了用户、江泰全球救援联盟，中国公民全球救援指挥中心，移动端APP和微信公众号，由江泰救援机构、全球救援机构、星使（也就是大救星的服务使者，是遍布世界各地、可随时提供服务的个体救援服务者）构成的服务网络，金融保险和全球支付功能。它通过整合生态圈里各方面的资源，以移动端为载体，为用户提供一键式救援服务。用户在需要时，只需点击手机下载的大救星APP上的“一键救援”，即可快速获得由星使和各类救援服务商所提供的所需服务并完成线上支付，以解燃眉之急。</p>
                    <p style="text-indent:2em;">“大救星”将这紧急救援这一公益性事业实现平台化、市场化、保险化、国际化，在政府救援和商业救援之外，在中国境外公民、救援机构以及海外个人服务者之间构建了新的救援服务生态。</p>
                    <p style="text-indent:2em;">“大救星”的服务包括了“四救十六项服务”：一是对意外重伤、意外重病的“救命”，二是对门诊医疗、住院医疗、海外医疗、健康保险、医美养生的“救治”，三是提供安保、家庭护理和运动防护的“救护”，四是对向导、翻译、导购、生活秘书、法律、留学问题等的“救助”。它们即包含了与生命和健康相关的救援服务，又包含了在旅行过程中所产生的其它救助服务。</p>
                    <p style="text-indent:2em;">作为政府救援的有力补充力量，“大救星”通过互联网平台为载体，用市场化模式运作，截止2016年12月，已直接联通了面临着各种风险的境外中国居民和70余个国家的专业救援机构及“大救星”服务使者。今年3月，江泰救援服务有限公司邀请全球救援公司、安保公司、包机公司等加入联盟，同时走访了全球70余个国家，开展个人服务者招募工作，为全球无缝隙、全天候24小时“四救”服务做了充分的准备。这些工作，为有效减轻各级政府部门和中国驻外各级领事馆的工作压力奠定了基础。</p>
                    <p style="text-indent:2em;">在紧急救助过程中，被救助人也无须过多担心救助费用方面的问题。购买了江泰救援保险的被救助人，紧急救助中发生的大部分费用将由保险公司支付；没有购买江泰救援保险，但在可提供担保人的被救助人，费用将由江泰救援服务有限公司垫付；在极端突发情况下，被救助人无法提供担保和现金支付的前提下，救助费用将由江泰全球救援慈善基金支付。</p>
                    <p style="text-indent:2em;">大救星的诞生将为出境的亿万中国公民提供安心、健康和快乐。</p>

                    <h6>“星使”守护同胞：拳拳之心 眷眷之情</h6>
                    <p style="text-indent:2em;">出国旅行对多数人来说，最大的障碍是语言沟通与环境陌生。在发生危急情况或出现困难而需要求助时，会因此遇到诸多不便，甚至耽误宝贵的救援时间。</p>
                    <p style="text-indent:2em;">而为了解决这个痛点，大救星充分利用一亿多居住、生活和工作在海外的华人资源，发挥他们各有的专业技能和熟悉当地环境、精通当地语言和风俗的优势，将他们整合起来，通过大救星平台为中国公民在海外期间提供随时随地的救援和救助服务。他们是一群热爱公益事业，对同胞有着拳拳之心的可爱的人。</p>
                    <p style="text-indent:2em;">无论你是谁，无论你在世界哪个角落，不管是需要就医，还是需要翻译，或是需要法律援助等等，只要打开“大救星”，就能快速呼叫附近会中文的“大救星”服务使者-星使，前来帮你解决各类难题。“星使”的加入使救援真正做到无地不在，无时不在。</p>
                    <p style="text-indent:2em;">试想，当一名老先生旅行海外突发中风，语言不通与陌生环境所带来的茫然，将拖延最佳抢救时间，重者则可能失去生命。然而，通过大救星移动端则可以第一时间呼叫星使前来救援，在星使的协助下脱离危险。</p>
                    <p style="text-indent:2em;">意中旅游事务促进会会长史译已在欧洲从事旅游工作18年，早年公派欧洲调研，后任欧华时报、新华时报、欧洲商旅报总编的他对于华人同胞在异国他乡孤立无援的处境感同身受。作为大救星意大利星使代表的他表示，大救星平台将海外救援工作移动化操作，极大缩短了同胞们海外求助的时长，信息的共享让海外救援能够第一时间被触达，解决了传统救援模式单一、被动、耗时、沟通困难、资金无人垫付等一系列落实障碍，为国人出境免除了不少后顾之忧。而自己身为一名华人，不仅为这一海外救援创新模式倍感欣喜，更是迫不及待参与到星使行列中，成为中国海外救援体系里的一名“小救星”，随时乐意用自己的绵薄之力为到意的祖国同胞提供服务。</p>
                    <p style="text-indent:2em;">此次“大救星”上线，肩负着“有求必救”公益使命，更是将共享经济与公益使命的结合发挥到极致，让更多的专业机构以及有能力帮助他人的使者一同合作，让中国公民在海外有求必应，让“星使”用成全别人，成就自己的公益之心点亮每一颗被守护的星星。
                    据悉，目前“大救星”服务已首批覆盖了103个国家，包括一带一路64个国家、中国主要投资目的地国家、中国公民前往人数最多的前30个目的地国家和中国主要工程承包目的地国家。
                    </p>
                    <p style="text-indent:2em;">据沈开涛董事长透露，下一步，“大救星”服务将向中国境内的外国公民开放,为到中国来的外国人提供救援服务，再将来为全世界的人在世界各地提供全球救援服务。无论你是哪国人，无论你在什么地方，只要你下载了大救星移动端，并点击一键救援，都可以快速获得救命、救治、救护、救助等救援服务。</p>
                    <p style="text-indent:2em;">“大救星”希望用“公益之心”改变中国人海外生活方式，祝你平安！祝你健康！</p>
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