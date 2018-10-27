<template>
    <div>
	<div class="contentMenu">
		<div class="marginl10 padding-10">
			<img src="images/back.png" alt="" class="zh-back" >
			<span class="back-page">返回上一页</span>
		</div>
		<h4 class="marginl10">转交救援公司获取报价</h4>
		<h5 class="marginl10">A、案件基本信息<span class="padding-20">案件编号：AJJ293223</span></h5>
    <div>
		<table class="padding-bj pad-0-10 newTab" cellpadding="8" border="1">
			<tr>
				<td>报案时间：2018 09.09 10:00</td>
				<td>报案客户：朱老板</td>
				<td>性别：男</td>
			</tr>
			<tr>
				<td>报案电话：＋86 123238437</td>
				<td>出险时间：2018 09.09 10:00</td>
				<td></td>
			</tr>
			<tr>
				<td>证件号码：3425435356546</td>
				<td>保单号码：3425435356546</td>
				<td><span style="color:#00a8fd">保单详情</span></td>
			</tr>
			<tr>
				<td>案件信息来源：一键救命</td>
				<td>来源说明：一键救命线下创立案件</td>
				<td></td>
			</tr>
		</table>

    </div>

    <h5 class="marginl10">B、出险信息</h5>
    <div class="com_2">
      <div>出险地：中国北京市门头沟平安路江泰保险大厦</div>
      <div>事故类型：风险灾害</div>
      <div>是否团险：是</div>
      <div>受伤部位：腿部</div>
      <div>天气灾害：气象灾害</div>
      <div>
	  <span style="vertical-align:top">事故经过</span>
		<el-input style="width: 88%;padding: 0px 10px;" type="textarea" value="根据该病人的情况，我们建议立即启动当地救援机构开始救援"></el-input>
	  </div>
    </div>

    <h5 class="marginl10">C、服务清单</h5>
    <span class="yljy">1、医疗救援</span>
    <div style="margin-left: 65px;font-size: 12px;">
      <el-checkbox name="type" disabled checked></el-checkbox> 医疗机构推介
      <div class="czsm">
        说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家
      </div>
      <div>
        <el-checkbox name="type" disabled checked></el-checkbox> 出诊服务
        <div class="czsm">
          说明：请帮助推荐最近的一流医院，需要骨科牛逼的专家
        </div>
      </div>
    </div>
    <span class="yljy">2、费用担保</span>
    <div style="margin-left: 65px;font-size: 12px; ">
      <div style="">
        <el-checkbox name="type" disabled checked></el-checkbox>
        医疗费用担保或非医疗费用担保
        <span style="margin-left:50px;">限额：<span style="color:#f97709">$200</span></span>
      </div>
    </div>

    <h5 class="marginl10">D、保险公司授权说明及文件</h5>
	<div class="fjdiv" style="margin: 10px 25px;">
			<div >
			<div class="fjred">同意启动，附件是授权文件</div>
			<img src="images/fj.png" alt="" class="fjimg fjns" >
			  附件(1)
			</div>
			<img src="images/r.png" alt="" class="zh-scfj" >
			<div style="margin-left: 15px;">
			  指挥中心上传的文件
			</div>
			<div class="ddcx">
			  下载
			</div>
		</div>

    <h5 class="marginl10">E、相关救援说明(指挥中心添加)</h5>
    <div>
      <el-input style="margin: 10px 45px;width: 90%;" type="textarea" placeholder="请抓紧报价，非常感谢，附件是说明文件"></el-input>
    </div>
	
	<div class="fjdiv" style="margin-left: 5%;">
			<div >
			<img src="images/fj.png" alt="" class="fjimg" >
			  附件
			</div>
			<img src="images/e.png" alt="" class="zh-scfj" >
			<div class="ddcx" style="margin-left: 42px;">
			  上传附件
			</div>
		</div>

    <div style="text-align: center;margin-top:20px;padding-bottom:20px;">
      <el-button type="primary" style="width: 200px;" @click="centerDialogVisible = true">确认转发救援公司</el-button>
    </div>
	</div>

	<el-dialog title="获取报价" :visible.sync="centerDialogVisible" width="30%" center>
	  <span>您正在向三家救援机构获取报价，确认转发</span>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="centerDialogVisible = false" size="medium" style="width:170px;">取 消</el-button>
	    <el-button type="primary" @click="centerDialogVisible = false" size="medium" style="width:170px;">确 定</el-button>
	  </span>
	</el-dialog>
    </div>
</template>

<script>
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
      value: "",
      centerDialogVisible: false
    };
  },
  mounted: function() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.contentMenu{
    text-align: start;
}
</style>