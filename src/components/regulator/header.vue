<template>
    <div class="header">
        <div class="header_logo">
            <img src="../../../static/images/com_images/logo.png" alt="">
            <div class="tit">
                <p>大救星救援平台</p>
                <p>DaJiuXing Rescue Platform</p>
            </div>
        </div>
        <div class="header_user">
            <div class="header_idbox">
                登录ID：{{insti.id||userid}}
            </div>
            <div class="header_userbox">
                身份：{{insti.category||usertype}}
            </div>
            <div class="header_namebox">
                名称：{{insti.name||username}}
            </div>
        </div>
        <div class="header_set pointer_box">
            <div class="language_box pointer_box" >
               <span>中文</span> 
                <!-- <div class="la_box">
                  <p @click="lok()">中文</p>
                  <p @click="lok()">English</p>
                </div> -->
            </div>
            <div class="set_box pointer_box">
                个人设置
            </div>
            <div class="logout_box pointer_box" @click="logout">
                注销
            </div>
        </div>
    </div>
</template>

<script>
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  props: ["insti"],
  data() {
    return {
      userid: 0,
      usertype: "监管机构",
      username: "平安财险"
    };
  },
  methods: {
    logout() {
      fetch(constants.domain+"rescue/user/logout", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log("logout:" + data);
        });
      this.$router.push({
        name: "Index",
        params: {
          time: new Date().getTime()
        }
      });
      window.localStorage.clear();
      console.log("注销");
    },
    // languge() {
    //   let labox = document.querySelector(".la_box");
    //   labox.style.display = "block";
    // },
    lok() {
      let labox = document.querySelector(".la_box");
      labox.style.display = "none";
    }
  }
};
</script>

<style scoped>
@import url(../../css/header.css);
.pointer_box{
    cursor: pointer;
}
</style>