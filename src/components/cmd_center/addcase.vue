<template>
    <div>
      <div class="app-aj wrap" v-if="casenum">
			<div class="appdc" style="padding-left: 15px;">待处理案件:({{casenum}}) <span class="app-ba wrap-app">此处案件为大救星APP用户报案，请尽快处理</span></div>
			<span v-for="item in caselst" :key=item.id>
			<div class="clan box">
				<span>{{item.time}}</span>
        <p class="p">
				<span>由用户<a class="mingc">{{item.reportUser}}</a>报案</span>
				<span>【{{item.incidentTypeStr}}】</span>
				<!-- <span>出险人:李四,在保</span> -->
				<span>出险地:{{item.address||""}}</span>
				<!-- span>服务诉求:
					<el-popover
					    placement="bottom"
					    width="200"
					    trigger="hover"
					    content="我不行了，快来救我，啊啊啊啊啊啊。。">
					<a slot="reference" class="mingc col_b">我已经...</a>
					</el-popover>
				</span -->
        </p>

        <router-link style="color: #00abfa" class="app_box" :to="{name:'appcase',params:{token:token,caseId:item.caseId},query: {typeId:item.typeId}}">去创立案件</router-link>
			</div>
			
			</span>
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
  props: ["token", "typeId"],
  data() {
    return {
      casenum: 0,
      caselst: []
    };
  },
  methods: {
    
    toadd(caseid) {
      this.$router.push({
        name: "appcase",
        params: {
          token: this.token,
          caseId: caseid
        },
        query: {
          typeId: this.$route.query.typeId
        }
      });
    }
  },
  mounted() {
    let that = this;
    fetch(constants.domain+"rescue/case/case_count", {
      method: "POST",
      body: `token=${this.token}&status=90`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        if (data.code == 0) {
          console.log("addcase vue casenum:" + data.obj);
          that.casenum = data.obj;
        }
      });
    fetch(constants.domain+"rescue/case/list_case", {
      method: "POST",
      body: `token=${this.token}&status=90`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        if (data.code == 0) {
          console.log("addcase vue listcase:" + data.obj);
          if (data.code == 0 && data.obj) {
            for (var i = 0; i < data.obj.length; i++) {
              if (i == 1) break;
              var w = data.obj[i];
              var o = {};
              o.caseId = w.obj.id;
              o.time = constants.time(w.obj.reportTs);
              o.reportUser = w.obj.reportUser;
              if (w.generalLocation && w.generalLocation.addr)
                o.address = w.generalLocation.addr;
              o.incidentTypeStr = w.incidentTypeStr;
              o.typeId = w.obj.incidentType;
              that.caselst.push(o);
            }
          }
        }
      });
  }
};
</script>

<style scoped>
.wrap {
  text-align: start;
  color: #333;
}
.app-aj {
  border: 2px solid #409eff;
  box-sizing: border-box;
  margin: 0 180px;
  font-size: 15px;
}
.app-aj div {
  padding: 10px;
}
.appdc {
  font-size: 16px;
  font-weight: 500;
}
.clan span {
  padding: 0px 5px;
}
.wrap-app {
  font-size: 15px;
  margin-left: 20px;
  color: #df1717;
}
.app_box {
  position: absolute;
  right: 370px;
  width: 150px;
  text-align: center;
}
.box {
  display: flex;
  /* justify-content:space-between */
}
.box span:first-child {
  width: 190px;
}
.p{
  width: 550px;
  overflow: hidden;
}
</style>