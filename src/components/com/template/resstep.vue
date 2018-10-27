<template>
	<div class="contentMenu">
    <p class="back_box" @click="back()">
    <img src="../../../../static/images/back.png" alt="">
    返回上一页
    </p>
		<h4 class="marginl10">救援详情</h4>
		<h5 class="marginl10 margint-10">流程示意</h5>
		<el-steps :active="2" align-center>
		  <el-step title="启动当地" description="救援公司"></el-step>
		  <el-step title="医疗费用" description="担保"></el-step>
		  <el-step title="收集医疗" description="单据"></el-step>
		  <el-step title="传递相关医疗单据" description="到保险公司"></el-step>
		</el-steps>
		<h5 class="marginl10">服务清单</h5>
		<div class="padding-40">
			<span class="back-wc">医疗救援：</span>
			<img src="../images/finished.png" alt="" class="zh-wc" >
			<span class="back-wc">医疗机构推介</span>
			<img src="../images/finished.png" alt="" class="zh-wc" >
			<span class="back-wc">门诊与住院预约</span>
			<img src="../images/unfinished.png" alt="" class="zh-wc" >
			<span class="back-wc">出诊服务</span>
		</div>
		<h5 class="marginl10">案件节点流程</h5>
		
		<el-table :data="tableData" style="width: 100%">
		  <el-table-column align="center" prop="date" label="时间" min-width="90"> </el-table-column>
		  <el-table-column align="center" prop="name" label="操作方" min-width="140"> </el-table-column>
		  <el-table-column align="center" prop="jie" label="操作节点" min-width="75"> </el-table-column>
		  <el-table-column align="center" prop="xi" label="操作细节" min-width="100"> </el-table-column>
		  <el-table-column align="center" prop="img" label="相关单据及图片" min-width="210">
			<template slot-scope="{ row, column, $index }">
				<div v-show="$index != 2">
					<div class="floatl">
						<img src="../images/12.jpg" alt="" style="width: 35px;height: 30px">
						<div>单据发票</div>
					</div>
					<div class="floatl">
						<img src="../images/12.jpg" alt="" style="width: 35px;height: 30px">
						<div>单据发票</div>
					</div>
					<div class="floatl">
						<img src="../images/12.jpg" alt="" style="width: 35px;height: 30px">
						<div>单据发票</div>
					</div>
					<i class="el-icon-arrow-right" style="font-size: 25px;padding-top: 18px;"></i>
				</div>
			</template>
		  </el-table-column>
		  <el-table-column align="center" prop="address" label="指挥中心添加附件" min-width="125px">
			<template slot-scope="{ row, column, $index }">
				<div v-show="$index != 2">
					<div class="floatl">
						<img src="../images/e.png" alt="" style="width: 35px;height: 30px">
						<div style="font-size:12px;">邮件沟通</div>
					</div>
					<div class="floatl">
						<img src="../images/r.png" alt="" style="width: 35px;height: 30px">
						<div style="font-size:12px;">上传</div>
					</div>
				</div>
			</template>
		  </el-table-column>
		  <el-table-column align="center" prop="address" label="备注" min-width="70">
			<template slot-scope="{ row, column, $index }">
				<el-button v-show="$index != 0" type="text" size="small">
					添加
				</el-button>
				<div v-show="$index == 0">出诊安排安盛附属</div>
			</template>
		  </el-table-column>
		</el-table>
		
		<div style="height:180px;">
		<table class="padding-bj" cellpadding="10">
			<tr>
				<td>A、报价</td>
				<td>整体报价：<span class="col-bj">$10000</span></td>
				<td>医疗垫付：<span class="col-bj">$10000</span></td>
				<td>案件费用：<span class="col-bj">$10000</span></td>
				<td>救援费用：<span class="col-bj">$10000</span></td>
			</tr>
			<tr>
				<td>B、实际费用</td>
				<td>整体报价：<span class="col-bj">$10000</span></td>
				<td>医疗垫付：<span class="col-bj">$10000</span></td>
				<td>案件费用：<span class="col-bj">$10000</span></td>
				<td>救援费用：<span class="col-bj">$10000</span></td>
			</tr>
			<tr>
				<td></td>
				<td>整体报价：<span class="col-bj">$10000</span></td>
				<td>其他费用：<span class="col-bj">$10000</span></td>
				<td  colspan='2'>其他费用说明：<span class="col-bj">客户要求购买鲜花一束</span></td>
			</tr>
		</table>
		</div>
		
	</div>
    <!-- </div> -->
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      token:
        this.$route.params.token ||
        JSON.parse(window.localStorage.getItem("data")).data,
      caseId: this.$route.params.caseId,
      stepdata: [],
      centerDialogVisible: false,
      feedata: {
        totalFee:10000,
        rescueFee:10000,
        medicFee:10000,
        caseFee:10000
      },
      tableData: [],
      imageUrl: "",
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "RegRescue",
        params: {
          token:
            this.$route.params.token ||
            JSON.parse(window.localStorage.getItem("data")).data,
          caseid: this.$route.params.caseid
        }
      });
    },
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
    }
  },
  mounted() {
    let that = this;
    this.axios
      .post(
        "http://api.test.dajiuxing.com.cn/rescue/bidding/view_case_solution",
        qs.stringify({
          token: that.token,
          caseId: that.caseId
        })
      )
      .then(res => {
        that.flag = true;
        that.feedata = res.data.obj;
        that.stepdata = res.data.obj2;
        that.loading = false;
      });
    this.axios
      .post(
        "http://api.test.dajiuxing.com.cn/rescue/case/case_progress",
        qs.stringify({
          token: this.$route.params.token,
          caseId: this.$route.params.caseId
        })
      )
      .then(data => {
        data.data.obj.map((v, i) => {
          console.log(v.obj.operatorType);
          let type = "";
          if (v.obj.operatorType === 0) {
            type = "供应商";
          } else if (v.obj.operatorType === 1) {
            type = "指挥中心";
          } else if (v.obj.operatorType === 2) {
            type = "监管机构";
          }
          that.tableData.push({
            date: that.time(v.obj.updateAt),
            node: v.obj.opStateText,
            det: "",
            field: type + "",
            cost: "",
            corr: [
              {
                url: null,
                txt: ""
              }
            ]
          });
        });
      });
  }
};
</script>

<style scoped>
@import url("../style.css");
</style>