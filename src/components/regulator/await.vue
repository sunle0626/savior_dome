<template>
    <div>
        <div class="top_box">
            <h2>等待授权启动救援案件</h2>
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
                    
                  <el-button type="primary" @click="filt()">查询</el-button>
                </div>
            </div>
        </div>
        <formVue :token="token" :st_time="st_time" :en_time="en_time" :flag="flag" :sereen="sereen" :typeId="typeId"/>
    </div>
</template>

<script>
import formVue from "./form.vue";
export default {
  data() {
    return {
      sereen: false,
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      st_time: "",
      en_time: "",
      flag: this.$route.params.flag,
      typeId: this.$route.query.typeId,
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
      if (this.st_time && !this.en_time) {
        this.sereen = false;
      } else if (this.en_time && !this.st_time) {
        this.sereen = false;
      } else if (!this.st_time && !this.en_time) {
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
      console.log(this.en_time);
    }
  },
  mounted() {
    window.localStorage.setItem(
      "case",
      JSON.stringify({
        case: "RegAwait"
      })
    );
  }
};
</script>

<style scoped>
.el-button{
    padding: 6px 30px;
}
.top_box {
  width: 100%;
}
.top_box h2 {
  font-size: 22px;
  color: #333;
  font-weight: normal;
  text-align: left;
  margin-bottom: 15px;
}
.top_box .time_box {
  font-size: 16px;
}
.time_box > div {
  float: left;
  color: #333;
  /* padding: 10px 0; */
  padding-bottom: 10px;
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