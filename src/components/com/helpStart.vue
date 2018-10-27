<template>
    <div>
	<div class="contentMenu">
		<div class="marginl10 padding-10">
			<img src="../../../static/images/back.png" alt="" class="zh-back" >
			<span @click="back()" class="back-page">返回上一页</span>
		</div>
		<h4 class="marginl10">启动救援机构</h4>
		<h5 class="marginl10">A、案件基本信息<span class="padding-20">案件编号：AJJ293223</span></h5>
		<div class="yh_cb padding-5">用户承保信息：已承保<span class="padding-40">保单号码：209209392</span><span class="bd_de">保单详情</span></div>
		<div >
			<table class="padding-10" >
				<tr>
					<td><span class="qdmc">启动第三方机构名称：</span></td>
					<td>
						<el-select v-model="value" placeholder="默认当前国家">
						  <el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						  </el-option>
						</el-select>
					</td>
					<td>
						<el-select v-model="value" placeholder="救援公司名称">
						  <el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						  </el-option>
						</el-select>
					</td>
					<td><el-input size="mini" placeholder="救援公司名称" suffix-icon="el-icon-search" style="width:140px;"></el-input></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td>
						<el-select v-model="value" placeholder="救援公司名称">
						  <el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						  </el-option>
						</el-select>
					</td>
					<td><el-input size="mini" placeholder="救援公司名称" suffix-icon="el-icon-search" style="width:140px;"></el-input></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td>
						<el-select v-model="value" placeholder="救援公司名称">
						  <el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						  </el-option>
						</el-select>
					</td>
					<td><el-input size="mini" placeholder="救援公司名称" suffix-icon="el-icon-search" style="width:140px;"></el-input></td>
				</tr>
			</table>
		  
		</div>
		

		<h5 class="marginl10">B、服务清单</h5>
		<span style="font-size: 12px; margin-left: 32px;font-weight: bold;">1、门急诊救援</span>
		<div style="margin-left: 73px;font-size:13px;padding: 10px 0px;">
		  <el-checkbox name="type" checked></el-checkbox> 医疗费用担保
		  <span class="zh-xe">限额：200$</span>
			<div style="margin-left:18px;">
			  <span class="zh-xe zh-sm">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
			  <el-input style="width:90%" type="textarea" placeholder="添加回复"></el-input>
			</div>
		  <el-checkbox name="type" style="margin: 10px 0px;"></el-checkbox> 无限额
		  <div>
			<el-checkbox name="type"  checked></el-checkbox> 收集医疗单据
			<span class="zh-xe">限额：200$</span>
			<div style="margin-left:18px;">
			  <span class="zh-xe zh-sm">说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家</span>
			  <el-input style="width:90%" type="textarea" placeholder="添加回复"></el-input>
			</div>
		  </div>
		</div>

		<h5 class="marginl10">C、启动救援整体说明</h5>
		<div style="margin-left: 91px; ">
		  <el-input style="width: 90%;" type="textarea" placeholder="根据该病人的情况，我们建议立即启动当地救援机构开始救援"></el-input>
		</div>

		<div class="fjdiv">
			<div >
			<img src="./images/fj.png" alt="" class="fjimg" >
			  附件<span class="fjred"><i style="margin-right:5px;">*</i>请上传附件</span>
			</div>
			<img src="./images/e.png" alt="" class="zh-scfj" >
			<div style="margin-left: 25px;">
			  上传方案及报价
			</div>
		</div>
		
		<div style="text-align: center;margin-top:20px;padding-bottom:20px;">
		  <el-button type="primary" style="width: 200px;">确认提交</el-button>
		  <span style="margin-left: 10px; color: #399cff;font-size: 13px;">暂无保险公司，授权通过</span>
		</div>
		</div>
    </div>
</template>

<script>
// import "./js/elementUI/index.js";
import "./js/jquery-2.1.1.min.js";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  mounted: function() {},
  methods: {
    back() {
      this.$router.push({
        name: "ComAwait"
      });
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
@import url("./style.css");
/* @import url("./js/elementUI/index.css"); */
.el-input-group {
  width: 29%;
}
.selecti {
  text-align: right;
  margin-right: 5px;
}
</style>