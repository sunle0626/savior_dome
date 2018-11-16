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
                <i class="el-icon-close pointer_box" @click="v.flag=false"></i>
                <h3>最新进展</h3>
                <p>事件：{{v.descrition}}</p>
                <p>时间：{{v.time}}</p>
                <el-button class="btn" type="primary" size="mini" @click="lookover()">查看详情</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
import { Notification } from "element-ui";
import constants from "../util/constants.js";
export default {
  props: ["obj"],
  data() {
    return {
      list: [
        {
          flag: true,
          id: 1,
          descrition: "授权进度",
          time: "2018年9月9日 18:00"
        }
      ]
    };
  },
  methods: {
    lookover() {
      // 点击查看详情
    }
  },
  mounted() {
    console.log(this.obj);
    // 请求接口
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
  height: 10vw;
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