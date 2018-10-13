<template>
    <div class="header">
        <div class="header_logo">
            <img src="../../../static/images/com_images/logo.png" alt="">
            <div class="tit">
                <p>大救星救援平台</p>
                <p>DajJiuing Rescue Platform</p>
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
        <div class="header_set">
            <div class="language_box" >
               <span @click="languge()">中文</span> 
                <i class="bottom-arrow"></i>
                <div class="la_box">
                  <p @click="lok()">中文</p>
                  <p @click="lok()">English</p>
                </div>
            </div>
            <div class="set_box">
                个人设置
            </div>
            <div class="logout_box" @click="logout">
                注销
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["insti"],
  data() {
    return {
      userid: 0,
      usertype: "救援机构",
      username: "平安财险"
    };
  },
  methods: {
    logout() {
      this.$router.push({
        name: "Index",
        params: {
          time: new Date().getTime()
        }
      });
      localStorage.clear();
      console.log("注销");
    },
    languge() {
      let labox = document.querySelector(".la_box");
      labox.style.display = "block";
    },
    lok() {
      let labox = document.querySelector(".la_box");
      labox.style.display = "none";
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #ccc;
}
.header_logo {
  width: 30%;
  float: left;
  margin-left: 200px;
}
.header_logo img,
.header_logo .tit {
  margin-top: 12px;
  float: left;
}
.header_logo img {
  height: 42px;
  width: auto;
}
.header_logo .tit {
  margin-left: 15px;
}
.header_user,
.header_set {
  height: 100%;
  line-height: 65px;
  float: left;
}
.header_user div,
.header_set div {
  float: left;
  margin-left: 35px;
}
.header_user div {
  color: #666666;
}
.header_set div {
  color: #00abfa;
}
.bottom-arrow:before {
  content: "";
  border: 7px solid #00abfa;
  border-bottom: none;
  border-right-color: transparent;
  border-left-color: transparent;
  position: relative;
  top: -50px;
  left: 26px;
  border-radius: 2px;
}
.language_box {
  position: relative;
}
.la_box {
  display: none;
  position: absolute;
  top: 60px;
  left: -60px;
  width: 100px;
  background: #fff;
  border: 1px solid #ccc;
}
.la_box p {
  height: 40px;
  line-height: 40px;
}
.la_box p:hover {
  background: #00abfa;
  color: #fff;
}
</style>