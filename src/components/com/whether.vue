<template>
    <div>
	<div class="contentMenu">
		<h4 class="marginl10 margint10">创建案件并启动救援</h4>
		<h5 class="marginl10 margint-10">A、案件基本信息</h5>
		<div class="marginl10">
			<div style="">
				<table class="padding-bj pad-0-10" cellpadding="5">
					<tr>
						<td>
							报案时间:
							<el-date-picker type="date" placeholder="选择日期" > </el-date-picker>
							<span class="must">*</span>
						</td>
						<td>
							报案客户:
							<el-input placeholder="请输入内容"></el-input>
							<span class="must">*</span>
						</td>
						<td>
							性别:
							<el-select v-model="value" placeholder="请选择"  >
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<span class="must">*</span>
						</td>
					</tr>
					<tr>
						<td>
							报案电话:
							<el-input placeholder="请输入内容"></el-input>
							<span class="must">*</span>
						</td>
						<td colspan = "2">
							出险时间:
							<el-date-picker type="date" placeholder="北京时间" style="width: 26%;"> </el-date-picker>
							<span class="must">*</span>
							<el-input placeholder="系统控件" style="width:20%"></el-input>
							<span class="must">*</span>
						</td>
					</tr>
					<tr>
						<td>
							证件号码:
							<el-select v-model="value" placeholder="请选择" style="width: 35%;">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<span class="must">*</span>
							<el-button type="primary" size="mini">查询保单</el-button>
						</td>
						<td colspan = "2">
							保单号码:
							<el-input placeholder="请输入内容" style="width: 26%;"></el-input>
							<span class="must">*</span>
							<el-button type="primary" size="mini" >保单详情</el-button>
						</td>
					</tr>
					<tr>
						<td>
							案件信息来源:
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<span class="must">*</span>
						</td>
						<td>
							来源说明:
							<el-input placeholder="请输入内容"></el-input>
							<span class="must">*</span>
						</td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>
		
		<h5 class="marginl10">B、出险信息</h5>
		<div class="marginl10">
		<table class="padding-bj pad-0-10" cellpadding="5">
					<tr>
						<td>
							<span class="">出险人姓名:</span>
							<el-input placeholder="请输入内容"></el-input>
							<span class="must">*</span>
						</td>
						<td>
							<span class="">性别:</span>
							<el-select v-model="value" placeholder="请选择"  >
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<span class="must">*</span>
						</td>
						<td></td>
					</tr>
					<tr>
						<td colspan = "2">
							<span class="">事故类型:</span>
							<el-select v-model="value" placeholder="请选择"  >
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<span class="must">*</span>
						</td>
						<td></td>
					</tr>
				</table>
				</div>
		<div class="marginl10">
			<table class="padding-bj pad-0-10" cellpadding="5">
				<tr>
					<td style="min-width:90px">死亡人数(人):</td>
					<td><el-input placeholder="3" style="width:40px"></el-input></td>
					<td>1、联系人姓名 <el-input placeholder="张先生"></el-input></td>
					<td>联系人证件号码 <el-input placeholder=" "></el-input></td>
					<td>联系人手机号 <el-input placeholder=" "></el-input></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td>2、联系人姓名 <el-input placeholder="张先生"></el-input></td>
					<td>联系人证件号码 <el-input placeholder=" "></el-input></td>
					<td>联系人手机号 <el-input placeholder=" "></el-input></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td>3、联系人姓名 <el-input placeholder="张先生"></el-input></td>
					<td>联系人证件号码 <el-input placeholder=" "></el-input></td>
					<td>联系人手机号 <el-input placeholder=" "></el-input></td>
				</tr>
			</table>
		</div>
		<div class="marginl10">
			<table class="padding-bj pad-0-10" cellpadding="5">
				<tr>
					<td style="min-width:90px;">受伤人数(人):</td>
					<td ><el-input placeholder="" style="width:40px"></el-input></td>
					<td>1、联系人姓名 <el-input placeholder="张先生"></el-input></td>
					<td>联系人证件号码 <el-input placeholder=" "></el-input></td>
					<td>联系人手机号 <el-input placeholder=" "></el-input></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td>2、联系人姓名 <el-input placeholder="张先生"></el-input></td>
					<td>联系人证件号码 <el-input placeholder=" "></el-input></td>
					<td>联系人手机号 <el-input placeholder=" "></el-input></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td>3、联系人姓名 <el-input placeholder="张先生"></el-input></td>
					<td>联系人证件号码 <el-input placeholder=" "></el-input></td>
					<td>联系人手机号 <el-input placeholder=" "></el-input></td>
				</tr>
			</table>
		</div>
		<div class="jsk">
			<span class="back-wc">受伤部位:</span>
			<el-input placeholder="如有请填写" style="width:140px;"></el-input>
		</div>
		<div class="jsk">
			<span class="back-wc">天气灾害:</span>
			<el-radio-group v-model="radio10" size="mini">
				<el-radio label="1" border>是</el-radio>
				<el-radio label="2" border>否</el-radio>
			</el-radio-group>
			<span class="back-wc" style="padding-left:40px;">灾害事故标签:</span>
			<el-select v-model="value" placeholder="气象灾害"  style="width:140px;">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<span class="must">*</span>
		</div>
		<div class="jsk">
			<span class="back-wc" style="vertical-align: top;">事故经过:</span>
			<el-input type="textarea" placeholder="请输入内容" v-model="value" style="width: 88%;"> </el-input>
		</div>
		<div style="text-align: center;margin-top:20px;padding-bottom:20px;">
		  <el-button type="primary" style="width: 200px;" @click="centerDialogVisible = true">创立案件</el-button>
		</div>
	</div>
	
	<el-dialog title="从历史案件导入" :visible.sync="centerDialogVisible" center>
		<span class="back-wc">从案件编号导入:</span>
		<el-input placeholder="请输入案件编号" style="width:140px;"></el-input>
		<el-date-picker type="date" placeholder="系统控件" style="width:140px;float:right"> </el-date-picker>
		<span class="back-wc" style="float:right;margin-top:5px;">按日期选择:</span>
		<el-table :data="gridData" style="margin-top:15px;" border>
			<el-table-column property="xu" label="序号" min-width="30"></el-table-column>
			<el-table-column property="code" label="案件编号" min-width="50"></el-table-column>
			<el-table-column property="address" label="发生地点" min-width="80"></el-table-column>
			<el-table-column property="name" label="用户姓名" min-width="50"></el-table-column>
			<el-table-column property="phone" label="用户手机号" min-width="60"></el-table-column>
			<el-table-column property="info" label="证件信息" min-width="80"></el-table-column>
			<el-table-column property="sex" label="性别" min-width="50"></el-table-column>
			<el-table-column property="date" label="出现时间" min-width="50"></el-table-column>
			<el-table-column label="案件类型" min-width="80">
				<template slot-scope="{ row, column, $index }">
					<el-button type="text" size="small">
						门急诊医疗
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="80">
				<template slot-scope="{ row, column, $index }">
					<el-button type="text" size="small">
						导入此案件
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="centerDialogVisible = false">确定提交</el-button>
		</span>
	</el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      value: "",
      radio10: "",
      centerDialogVisible: false,
      gridData: [
        {
          xu: "1",
          code: "AJ0001",
          address: "美国纽约第五大厦",
          name: "网易黄博士",
          phone: "+86 134764787",
          info: "身份证 5454514251414",
          sex: "男",
          date: "2018年6月5日 18:00"
        }
      ],
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
      tableData: [
        {
          date: "2016.05.02 20:22",
          name: "安盛救援服务有限公司登陆帐号：1827372",
          jie: "医疗救援出诊服务",
          xi: "出诊安排安盛附属医院骨科"
        },
        {
          date: "2016.05.02 20:22",
          name: "安盛救援服务有限公司登陆帐号：1827372",
          jie: "医疗救援出诊服务",
          xi: "出诊安排安盛附属医院骨科"
        },
        {
          date: "2016.05.02 20:22",
          name: "安盛救援服务有限公司登陆帐号：1827372",
          jie: "服务清单变更",
          xi: "服务清单变更：新增遗体转运"
        }
      ]
    };
  },	mounted:function() {
		
	},
	methods:{
		onSubmit() {
			console.log('submit!');
		}
	}
};
</script>

<style scoped>
@import url("./style.css");
@import url("./js/elementUI/index.css");
.margint10 {
  padding-top: 10px;
}
.el-input,
.el-select {
  width: 50%;
}
.el-input__inner,
.el-input--suffix {
  width: 100%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 50%;
}
</style>