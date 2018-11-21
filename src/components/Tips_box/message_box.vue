<template>
    <div>
        <!-- 消息弹出框 -->
        <!-- 调用组件
        传参
        obj={
          flag: true,//是否弹出提示框
          title:'XX框',//弹出框的标题
          // 可传入参数 一个对象 用来放置接口请求的入参
          data:{
          }
        }
        -->
        <ul class="list">
            <li v-for="(v,i) in list" :key="i" v-if="v.flag">
                <i class="el-icon-close pointer_box" @click="v.flag=false;list.splice(i,1);setreader(v.id);"></i>
                <h3>最新进展</h3>
                <p>事件：{{v.descrition}}</p>
                <p>时间：{{v.time}}</p>
                <el-button class="btn" type="primary" size="mini" @click="v.flag=false;list.splice(i,1);setreader(v.id);lookover(v.url)">查看详情</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
import { Notification } from "element-ui";
import constants from "../util/constants.js";
import "isomorphic-fetch";
import Promise from "promise-polyfill";
export default {
  props: ["token"],
  data() {
    return {
      list: [
        // {
        //   flag: true,
        //   id: 1,
        //   descrition: "授权进度授权进度授权进度授权进度授权进度授权进度授权进度授权进度授权进度授权进度授权进度授权进度授权进度授权进度",
        //   time: "2018年9月9日 18:00"
        // }
      ]
    };
  },
  methods: {
    lookover(url) {
      // 点击查看详情
      window.location.href = url;
    },
    setreader(id){
      // fetch(constants.domain + "rescue/notice/set_read", {
      //   method: "POST",
      //    body: `token=${this.token ||
      //       JSON.parse(window.localStorage.getItem("data"))
      //         .data}&noticeId=`+id,
      //   mode: "cors",
      //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
      // })
      //   .then(res => {
      //     return res.json();
      //   })
    }
  },
  mounted() {
    console.log("message box mounted.");
    let that = this;
    // 请求接口
    setInterval(function(){
      var t = that.token;
      if(t){

      }else{
        if(window.localStorage.getItem("data")){
          t = JSON.parse(window.localStorage.getItem("data"))
              .data;
        }
      }
      fetch(constants.domain + "rescue/notice/unread_list", {
        method: "POST",
         body: `token=`+t+`&read=1`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if(data.code ==0){
            for(var i=0;i<data.obj.length;i++){
              var o = data.obj[i];
              that.list.push({
                  flag: true,
                  id: o.id,
                  descrition: o.description,
                  time: constants.time(o.createAt),
                  url: o.url
              })
            }
          }
        });
      // that.list.push({
      //     flag: true,
      //     id: that.list.length+1,
      //     descrition: "授权进度:"+that.list.length+1,
      //     time: "2018年9月9日 18:00"
      // })
      // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"+that.list.length);
    },10000);
  }
};
</script>

<style scoped>
.list {
  position: fixed;
  right: 1vw;
  bottom: 1vw;
  z-index: 998;
}
.list li {
  position: relative;
  padding: 0.5vw;
  border: 0.0625vw #ccc solid;
  margin-top: 2vw;
  background: #fff;
  width: 20vw;
  min-height:10vw;
  border-radius: 0.3vw;
}
.list li h3 {
  font-size: 1.05vw;
  line-height: 3.1vw;
}
.list li p {
  font-size: 1vw;
  line-height: 1.8vw;
}
.list li i {
  position: absolute;
  right: 0.5vw;
  top: 0.5vw;
}
.pointer_box {
  cursor: pointer;
}
.btn{
    margin-top: 0.9vw;
}
</style>