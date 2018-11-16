<template>
    <div class="wrap" @click="removelogin()">
        <header class="header">
            <img src="../../static/images/banner_bg.jpg" alt="">
            <div class="nav">
                <div class="nav_left">
                    <img src="../../static/images/logo.png" alt="">
                </div>
                <div class="nav_right">
                    <ul>
                        <li @click="index()" class="pointer_box pick_box">
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
                            <div class="dbox">
                    <h2>
                        大救星云平台
                    </h2>
                    <p>有求必救，全球救援服务第一平台</p>
                </div>
            <div class="points_box">
                <ul>
                    <li>
                        <div class="points_list_box">
                            <p>覆盖全球救援范围</p>
                            <p>救援机构遍布全球，支持全球救援</p>
                        </div>
                    </li>
                    <li>
                        <div class="points_list_box">
                            <p>操作更加便捷简洁</p>
                            <p>标准化流程，减少冗余操作流程清晰简洁</p>
                        </div>
                    </li>
                    <li>
                        <div class="points_list_box">
                            <p>全程救援流程透明化</p>
                            <p>救援过程全程线上节点透明化监管便捷，发现问题及时快捷处理</p>
                        </div>
                    </li>
                    <li>
                        <div class="points_list_box">
                            <p>费用更清晰明了</p>
                            <p>机构救援成本管理便捷方便，可导出全年及月度账单，监管单位更清晰费用节点</p>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
        <section class="section">
            <div class="top_innovation">
                <div class="tit_top_box">
                    <h2>
                        <img src="../../static/images/line_bg.png" alt="">
                        平台创新服务
                        <img src="../../static/images/line_bg_01.png" alt="">
                    </h2>
                </div>
                <p class="tit_box">
                    <span>星使服务</span>
                    <span>全国各地2000+名当地服务者作为星使为用户提供第一现场服务</span>
                </p>
                <div class="innovation_details">
                    <ul>
                        <li class="pointer_box">
                            <img src="../../static/images/icon_01.png" alt="">
                            <h3>陪同就医</h3>
                            <p>陪同用户去指定医院 服务沟通安抚事宜</p>
                        </li>
                        <li class="pointer_box">
                            <img src="../../static/images/icon_02.png" alt="">
                            <h3>当地向导</h3>
                            <p>陪同国外当地向导旅游事宜，按小时计费</p>
                        </li>
                        <li class="pointer_box">
                            <img src="../../static/images/icon_03.png" alt="">
                            <h3>当地接送机</h3>
                            <p>当地的华人帮你接送机 安全又熟悉</p>
                        </li>
                        <li class="pointer_box">
                            <img src="../../static/images/icon_04.png" alt="">
                            <h3>陪同报案 </h3>
                            <p>国外出了意外纠纷不要 慌,叫个星使来帮忙报案和当地警察沟通无障碍</p>
                        </li>
                        <li class="pointer_box">
                            <img src="../../static/images/icon_05.png" alt="">
                            <h3>翻译服务</h3>
                            <p>当地语言的陪同翻译 商务翻译，普通翻译</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="middle_box">
                <div class="tit_middle_box">
                    <h2>
                        <img src="../../static/images/line_bg.png" alt="">
                        五大救援场景
                        <img src="../../static/images/line_bg_01.png" alt="">
                    </h2>
                </div>
                <div class="middle_details">
                    <ul>
                        <li class="pointer_box">
                            <div></div>
                            <h3>Medical Assistance</h3>
                            <div class="img_box">
                                <img src="../../static/images/icon_08.png" alt="">
                            </div>
                            <p>医疗救援</p>
                        </li>
                        <li class="pointer_box">
                            <div></div>
                            <h3>Natural Disaster Assistance</h3>
                            <div class="img_box">
                                <img src="../../static/images/icon_09.png" alt="">
                            </div>
                            <p>灾害救援</p>
                        </li>
                        <li class="pointer_box">
                            <div></div>
                            <h3>Public Security Assistance</h3>
                            <div class="img_box">
                                <img src="../../static/images/icon_10.png" alt="">
                            </div>
                            <p>治安救援</p>
                        </li>
                        <li class="pointer_box">
                            <div></div>
                            <h3>Roadside Assistance</h3>
                            <div class="img_box">
                                <img src="../../static/images/icon_06.png" alt="">
                            </div>
                            <p>道路救援</p>
                        </li>
                        <li class="pointer_box">
                            <div></div>
                            <h3>Travel Assistance</h3>
                            <div class="img_box">
                                <img src="../../static/images/icon_07.png" alt="">
                            </div>
                            <p>旅行救援</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bottom_box">
                <div class="tit_bottom_box">
                    <h2>
                        <img src="../../static/images/line_bg.png" alt="">
                        不同行业定制专属方案
                        <img src="../../static/images/line_bg_01.png" alt="">
                    </h2>
                </div>
                <div class="bottom_scheme">
                    <img src="../../static/images/arrow_left.png" alt="">
                    <ul class="scheme_list">
                        <li @click="insurer()" class="pointer_box">
                            <img src="../../static/images/insurance_commpany.png" alt="">
                            <div>
                                <h3>保险公司</h3>
                                <div class="scheme_tit_box">
                                    为保险公司提供救援服务
                                </div>
                                <span>点击查看</span>
                            </div>
                        </li>
                        <li @click="TravelAgency()" class="pointer_box">
                            <img src="../../static/images/travel_agency.png" alt="">
                            <div>
                                <h3>旅行社</h3>
                                <div class="scheme_tit_box">
                                    为旅行机构的客户提供境外救援救助解决方案
                                </div>
                                <span>点击查看</span>
                            </div>
                        </li>
                        <li @click="Scenicspot()" class="pointer_box">
                            <img src="../../static/images/scenic_spots.png" alt="">
                            <div>
                                <h3>景区景点</h3>
                                <div class="scheme_tit_box">
                                    为景点景区提供景区救援方案
                                </div>
                                <span>点击查看</span>
                            </div>
                        </li>
                        <li @click="overseas()" class="pointer_box">
                            <img src="../../static/images/foreign_enterprises.png" alt="">
                            <div>
                                <h3>驻外企业</h3>
                                <div class="scheme_tit_box">
                                    为驻外企业提供整套园区解决方案
                                </div>
                                <span>点击查看</span>
                            </div>
                        </li>
                    </ul>
                    <img src="../../static/images/arrow.png" alt="">
                </div>
            </div>
        </section>
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
                    <img src="../../static/images/rq_code_dow.png" alt="">
                </div>
                <div class="rq_two">
                    <p>微信公众号</p>
                    <img src="../../static/images/rq_code_public.png" alt="">
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
import "isomorphic-fetch";
import constants from "./util/constants.js";
import Promise from "promise-polyfill";

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  data() {
    return {
      routerobj: {},
      flag: true,
      usertype: "",
      user: "",
      pwd: "",
      loginflag: false,
      Errercontent: "", //提示框显示的字符串
      Errerflag: false, //决定提示框是否显示的flag
      time: new Date() * 1 //时间，用来监听
    };
  },
  methods: {
    overseas(){
        this.$router.push({
            name:'overseas'
        })
    },
    Scenicspot(){
        this.$router.push({
            name:'Scenicspot'
        })
    },
    TravelAgency(){
        this.$router.push({
            name:'TravelAgency'
        })
    },
    insurer(){
        this.$router.push({
            name:'insurer'
        })
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
    removelogin() {
      let login_box = document.querySelector(".login_box");
      if (login_box && this.loginflag) {
        login_box.style.display = "none";
      }
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
      let login_list = document.querySelector(".login");
      login_list.style.display = "none";
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
                    "usertype",
                    JSON.stringify({
                      data: data.obj.user.type
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
                    "usertype",
                    JSON.stringify({
                      data: data.obj.user.type
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
                    "usertype",
                    JSON.stringify({
                      data: data.obj.user.type
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
  mounted() {}
};
</script>
<style>
@import "../css/index.css";
.pick_box{
    color: #00abf9;
}
</style>
