<template>
    <div>
        <div class="top_box">
            <h2>等待方案报价案件</h2>
            <div class="time_box">
                <div class="block st_box">
                    起始时间
                    <el-date-picker
                    @change="sttime()"
                    v-model="st_time"
                    align="right"
                    type="date"
                    placeholder="起始时间"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
                <div class="block en_box">
                    结束时间
                    <el-date-picker
                    @change="entime()"
                    v-model="en_time"
                    align="right"
                    type="date"
                    placeholder="结束时间"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
                <div class="block">
                  <el-button type="primary" plain @click="filt()">查询</el-button>
                </div>
            </div>
        </div>
        <!-- <formVue v-if="sereen" :token="token"></formVue> -->
        <formVue :token="token" :st_time="st_time" :en_time="en_time" :flag="flag"/>
        
    </div>
</template>

<script>
import formVue from "../../common/form.vue";
import funVue from "../../common/fun.vue";
export default {
  data() {
    return {
      sereen: true,
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      st_time: new Date() * 1,
      en_time: new Date() * 1,
      flag: this.$route.params.flag,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  components: {
    formVue
  },
  methods: {
    filt() {
      if (this.st_time) {
        this.sereen = false;
      } else if (this.en_time) {
        this.sereen = false;
      } else {
        this.sereen = true;
      }
    },
    sttime() {
      this.st_time = this.st_time * 1;
    },
    entime() {
      this.en_time = this.en_time * 1;
    }
  },
  mounted() {
    console.log(this.en_time);
    window.localStorage.setItem(
      "case",
      JSON.stringify({
        case: "Await"
      })
    );
  }
};
</script>

<style scoped>
.top_box {
  width: 100%;
}
.top_box h2 {
  font-size: 22px;
  color: #333;
  font-weight: normal;
  text-align: left;
}
.top_box .time_box {
  font-size: 16px;
}
.time_box > div {
  float: left;
  color: #333;
  padding: 10px 0;
  margin-left: 50px;
}
.time_box > div:first-child {
  margin-left: 10px;
}
.time_box > div span {
  width: 220px;
  border: 1px solid #999;
  color: #999;
  display: inline-block;
  border-radius: 3px;
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
}
</style>