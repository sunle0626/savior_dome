<template>
    <div>
        <div class="app-aj">
			<div class="appdc">待处理案件:({{casenum}}) <span class="app-ba">此处案件为大救星APP用户报案，请尽快处理</span></div>
			<span v-for="item in caselst" :key=item.id>
			<div class="clan">
				<span>{{item.time}}</span>
				<span>由用户<a class="mingc">{{item.reportUser}}</a>报案</span>
				<!-- span>【门急诊就医】</span>
				<span>出险人:李四,在保</span -->
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
			</div>
			<router-link :to="{name:'appcase',params:{token:token,caseId:item.caseId}}">去创立案件</router-link>
			</span>
		</div>
    </div>
</template>

<script>
export default {
	props: ["token"],
  data() {
    return {
      casenum:0,
	  caselst:[]
	};
  },
  methods: {
    time(str) {
      var date = new Date(str); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D = date.getDate() + "日";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
	},
	toadd(caseid){
		this.$router.push({
        name: "appcase",
        params: {
          token: this.token,
          caseId: caseid
        }
      });
	}
  },
  mounted() {
	let that = this;
    fetch("http://api.test.dajiuxing.com.cn/rescue/case/case_count", {
      method: "POST",
      body: `token=${this.token}&status=90`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    .then(function(res) {
		return res.json();
    })
    .then(function(data) {
		if(data.code == 0){
			console.log("addcase vue casenum:"+data.obj)
			that.casenum = data.obj;
		}
	});
	fetch("http://api.test.dajiuxing.com.cn/rescue/case/list_case", {
      method: "POST",
      body: `token=${this.token}&status=90`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    .then(function(res) {
		return res.json();
    })
    .then(function(data) {
		if(data.code == 0){
			console.log("addcase vue listcase:"+data.obj)
			if(data.code == 0  && data.obj){
				for(var i=0;i<data.obj.length;i++){
					 if(i == 1)
					 	break;
					var w = data.obj[i];
					var o = {};
					o.caseId = w.obj.id;
					o.time = that.time(w.obj.reportTs);
					o.reportUser = w.obj.reportUser;
					if(w.generalLocation && w.generalLocation.addr)
						o.address = w.generalLocation.addr;
					that.caselst.push(o);
				}
			}
		}
    });
  }

};
</script>

<style scoped>
.app-aj {
  height: 130px;
  border: 2px solid #409eff;
  box-sizing: border-box;
  margin: 0 180px;
  font-size: 15px;
}
.app-aj div {
  padding: 10px;
}
.appdc{
	font-size: 17px;
    font-weight: bold;
}
.clan span{
	padding:0px 5px;
}
</style>