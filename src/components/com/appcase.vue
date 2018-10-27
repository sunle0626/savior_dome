<template>
    <div>
	<div class="contentMenu">
		<div style="height:5px"></div>
		<div class="app-aj">
			<div class="appdc">待处理案件:(3) <span class="app-ba">此处案件为大救星APP用户报案，请尽快处理</span></div>
			<div class="clan">
				<el-checkbox name="type" ></el-checkbox>
				<span>2018-09-02 13:18</span>
				<span>由用户<a class="mingc">张三</a>报案</span>
				<span>【门急诊就医】</span>
				<span>出险人:李四,在保</span>
				<span>出险地:阿富汗</span>
				<span>服务诉求:
					<el-popover
					    placement="bottom"
					    width="200"
					    trigger="hover"
					    content="我不行了，快来救我，啊啊啊啊啊啊。。">
					<a slot="reference" class="mingc col_b">我已经...</a>
					</el-popover>
				</span>
			</div>
			<div class="clan">
				<el-checkbox name="type" checked></el-checkbox>
				<span>2018-09-02 13:18</span>
				<span>由用户<a class="mingc">张三</a>报案</span>
				<span>【门急诊就医】</span>
				<span>出险人:李四,在保</span>
				<span>出险地:阿富汗</span>
				<span>服务诉求:
					<el-popover
					    placement="bottom"
					    width="200"
					    trigger="hover"
					    content="我不行了，快来救我，啊啊啊啊啊啊。。">
					<a slot="reference" class="mingc col_b">我已经...</a>
					</el-popover>
				</span>
			</div>
		</div>
		<h4 class="marginl10 margint10">创建案件并启动救援</h4>
		<h5 class="marginl10 margint-10">A、案件基本信息<span class="padding-20">案件编号：AJJ293223</span><span class="padding-20 lisave">从历史案件信息中创建</span></h5>
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
						<td></td>
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
					<td>
						<span class="">出险人证件:</span>
						<el-input placeholder="请输入内容"></el-input>
						<span class="must">*</span>
						<el-button type="primary" size="mini">查询保单</el-button>
					</td>
					<td>
						<span class="">保单号码:</span>
						<el-input placeholder="请输入内容"></el-input>
						<span class="must">*</span>
						<el-button type="primary" size="mini" >保单详情</el-button>
					</td>
					<td></td>
				</tr>
				<tr>
					<td colspan = "2">
						<span class="">所属保险公司:</span>
						<el-select v-model="value" style="width:100px;" placeholder="自动带入"  >
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<span class="must">*</span>
						<el-select v-model="value" style="width:100px;" placeholder="纯服务"  >
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<span class="must">* <span style="font-size:10px;">当前保险公司不在合作期内，请知晓</span></span>
					</td>
				</tr>
				<tr>
					<td colspan = "2">
						<span class="">出险地:</span>
						<el-select v-model="value" style="width:75px;" placeholder="境内"  >
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<span class="must">*</span>
						<el-select v-model="value" style="width:120px;" placeholder="请选择国家"  >
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<span class="must">*</span>
						<el-select v-model="value" style="width:130px;" placeholder="地名地名地名"  >
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<span class="must">*</span>
						<el-input placeholder="其他详细地址" style="width:150px;"></el-input>
						<span class="must">*</span>
					</td>
					<td></td>
				</tr>
				<tr>
					<td>
						<span class="">事故类型:</span>
						<el-select v-model="value" placeholder="请选择"  >
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<span class="must">*</span>
					</td>
					<td></td>
				</tr>
				<tr>
					<td></td>
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
			<span class="must">*</span>
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
			<el-table-column property="sex" label="性别" min-width="30"></el-table-column>
			<el-table-column property="date" label="出现时间" min-width="80"></el-table-column>
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
// import "./js/elementUI/index.js";
import "./js/jquery-2.1.1.min.js";
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
.lisave {
  font-size: 10px;
  color: #399cff;
}
</style>