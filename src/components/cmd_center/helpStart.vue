<template>
    <div>
	<div class="contentMenu">
		<div class="marginl10 padding-10">
			<img src="../../../static/images/back.png" alt="" class="zh-back" >
			<span @click="back()" class="back-page">返回上一页</span>
		</div>
		<h4 class="marginl10">启动救援机构</h4>
		<h5 class="marginl10">A、案件基本信息<span class="padding-20 span_node">案件编号：{{obj.casenum}}</span></h5>
		<div v-for="item in obj.victimLst"  :key="item.id" class="yh_cb padding-5">用户承保信息：<span v-if="item.insurancePolicyNo">已承保</span><span v-else>未承保</span><span class="padding-40">保单号码：{{item.insurancePolicyNo}}</span><span class="bd_de" @click="toUrl(item.insurancePaper)">保单详情</span></div>
		
		<div >
			<table class="padding-10" >
				<tr>
					<td><span class="qdmc">启动第三方机构名称：</span></td>
					<td>
						<el-select v-model="value"  @change="search()" placeholder="默认当前国家" filterable>
						  <el-option
							v-for="item in countries" :key="item.value" :label="item.label"
                                           :value="item.value">
						  </el-option>
						</el-select>
					</td>
					<td>
						<el-select v-model="assistId1" placeholder="救援公司名称" filterable>
						  <el-option
							v-for="item in assistOptions1"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						  </el-option>
						</el-select>
					</td>
					<!-- <td><el-input v-model="kw1" size="mini" placeholder="救援公司名称" style="width:140px;">
						<i slot="suffix" class="el-icon-search el-input__icon" @click="search(1)"></i></el-input></td> -->
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td>
						<el-select v-model="assistId2" placeholder="救援公司名称" filterable>
						  <el-option
							v-for="item in assistOptions2"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						  </el-option>
						</el-select>
					</td>
					<!-- <td><el-input size="mini" v-model="kw2" placeholder="救援公司名称" style="width:140px;">
						<i slot="suffix" class="el-icon-search el-input__icon" @click="search(2)"></i></el-input></td> -->
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td>
						<el-select v-model="assistId3" placeholder="救援公司名称" filterable>
						  <el-option
							v-for="item in assistOptions3"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						  </el-option>
						</el-select>
					</td>
					<!-- <td><el-input size="mini" v-model="kw3" placeholder="救援公司名称" style="width:140px;">
						<i slot="suffix" class="el-icon-search el-input__icon" @click="search(3)"></i></el-input></td> -->
				</tr>
			</table>
		  
		</div>
		

		<h5 class="marginl10">B、服务清单</h5>
		<span style="font-size: 12px; margin-left: 32px;font-weight: bold;">1、{{parentTypeName}}</span>
		<div style="margin-left: 73px;font-size:13px;padding: 10px 0px;">
		  <div v-for="(item,index) in serviceLst" :key="item.id">
			<el-checkbox name="type" v-model="serviceId[index]"></el-checkbox> {{item.name}}    
			<div style="margin-left:18px;margin-top:15px;margin-bottom:15px">
        <p v-if="item.fee>0" class="limit_box"><span>限额($):<el-input v-model="serviceLimitNum[index]" size="mini" :readonly="serviceLimit[index]"></el-input></span><span><el-checkbox @change="changeserviceLimit(index,item.id)" v-model="serviceLimit[index]" name="type" checked></el-checkbox>无限额</span></p>
			  <el-input style="width:90%" type="textarea" v-model="serviceTxt[index]" placeholder="添加说明"></el-input>
			</div>
		  </div>
		</div>

		<h5 class="marginl10">C、启动救援整体说明</h5>
		<div style="margin-left: 91px; margin-top:20px">
		  <el-input style="width: 90%;" type="textarea" v-model="stateText" placeholder="根据该病人的情况，我们建议立即启动当地救援机构开始救援"></el-input>
		</div>

		<div class="fjdiv">
			<div >
			<img src="./images/fj.png" alt="" class="fjimg" >
			  附件<span class="fjred"><i style="margin-right:5px;"></i>请上传附件</span>
			</div>
      <div class="acc_box">
      <ul>
          <li v-for="(v,ind) in acc_list" :key="ind">
              <img :src="v.icon" alt="">
              <p>{{v.description}}</p>
              <p><a @click="imgVisible=true" v-if="ind==0">上传附件</a></p>
              <p><a @click="acc_list.splice(ind,1)" v-if="ind>0">删除</a></p>
               <!-- <input type="file" name="file" id="filebox" @change="handleGetFile($event)"> -->
          </li>
      </ul>
      </div>
		</div>
    <el-dialog
      title="上传附件"
      :visible.sync="imgVisible"
      class="img_dialog"
      width="50%"
      center>
      <p><span>附件名称</span><el-input
          type="text"
          placeholder="上传方案及报价"
          v-model="txts"
          ></el-input></p>
          <p>
            <span>
              附件地址
            </span>
            <input type="file" name="file" id="filebox" @change="handleGetFile($event)">
          </p>
          <p class="p"><el-button center type="button" size="small" @click="uploadFile(),imgVisible=false">确定</el-button></p>
    </el-dialog>
		<div style="text-align: center;margin-top:20px;padding-bottom:20px;">
		  <el-button type="primary" style="width: 200px;" @click="onSubmit()">确认提交</el-button>
		  <span style="margin-left: 10px; color: #399cff;font-size: 13px;">暂无保险公司，授权通过</span>
		</div>
		</div>
    </div>
</template>

<script>
import qs from "qs";
// import "./js/elementUI/index.js";
import { Message } from "element-ui";
import err from "../util/error2msg.js";
import "isomorphic-fetch";
import constants from '../util/constants.js';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}
export default {
  data() {
    return {
      imgVisible:false,
      txts:'',
      countries: [
        { label: "中国", value: "+86" },
        { label: "美国", value: "+1" },
        { label: "加拿大", value: "+01" },
        { label: "俄罗斯", value: "+7" },
        { label: "哈萨克斯坦", value: "+07" },
        { label: "埃及", value: "+20" },
        { label: "南非", value: "+27" },
        { label: "希腊", value: "+30" },
        { label: "荷兰", value: "+31" },
        { label: "比利时", value: "+32" },
        { label: "法国", value: "+33" },
        { label: "西班牙", value: "+34" },
        { label: "匈牙利", value: "+36" },
        { label: "意大利", value: "+39" },
        { label: "罗马尼亚", value: "+40" },
        { label: "瑞士", value: "+41" },
        { label: "奥地利", value: "+43" },
        { label: "英国", value: "+44" },
        { label: "丹麦", value: "+45" },
        { label: "瑞典", value: "+46" },
        { label: "挪威", value: "+47" },
        { label: "波兰", value: "+48" },
        { label: "德国", value: "+49" },
        { label: "秘鲁", value: "+51" },
        { label: "墨西哥", value: "+52" },
        { label: "古巴", value: "+53" },
        { label: "阿根廷", value: "+54" },
        { label: "巴西", value: "+55" },
        { label: "智利", value: "+56" },
        { label: "哥伦比亚", value: "+57" },
        { label: "委内瑞拉", value: "+58" },
        { label: "马来西亚", value: "+60" },
        { label: "澳大利亚", value: "+61" },
        { label: "印度尼西亚", value: "+62" },
        { label: "菲律宾", value: "+63" },
        { label: "新西兰", value: "+64" },
        { label: "新加坡", value: "+65" },
        { label: "泰国", value: "+66" },
        { label: "日本", value: "+81" },
        { label: "韩国", value: "+82" },
        { label: "越南", value: "+84" },        
        { label: "土耳其", value: "+90" },
        { label: "印度", value: "+91" },
        { label: "巴基斯坦", value: "+92" },
        { label: "阿富汗", value: "+93" },
        { label: "斯里兰卡", value: "+94" },
        { label: "缅甸", value: "+95" },
        { label: "伊朗", value: "+98" },
        { label: "南苏丹", value: "+211" },
        { label: "摩洛哥", value: "+212" },
        { label: "阿尔及利亚", value: "+213" },
        { label: "突尼斯", value: "+216" },
        { label: "利比亚", value: "+218" },
        { label: "冈比亚", value: "+220" },
        { label: "塞内加尔", value: "+221" },
        { label: "毛里塔尼亚", value: "+222" },
        { label: "马里", value: "+223" },
        { label: "几内亚", value: "+224" },
        { label: "科特迪瓦", value: "+225" },
        { label: "布基纳法索", value: "+226" },
        { label: "尼日尔", value: "+227" },
        { label: "多哥", value: "+228" },
        { label: "贝宁", value: "+229" },
        { label: "毛里求斯", value: "+230" },
        { label: "利比里亚", value: "+231" },
        { label: "塞拉利昂", value: "+232" },
        { label: "加纳", value: "+233" },
        { label: "尼日利亚", value: "+234" },
        { label: "乍得", value: "+235" },
        { label: "中非共和国", value: "+236" },
        { label: "喀麦隆", value: "+237" },
        { label: "佛得角", value: "+238" },
        { label: "圣多美和普林西比", value: "+239" },
        { label: "赤道几内亚", value: "+240" },
        { label: "加蓬", value: "+241" },
        { label: "刚果", value: "+242" },
        { label: "刚果民主共和国", value: "+243" },
        { label: "安哥拉", value: "+244" },
        { label: "几内亚比绍", value: "+245" },
        { label: "圣赫勒拿岛", value: "+247" },
        { label: "塞舌尔", value: "+248" },
        { label: "苏丹", value: "+249" },
        { label: "卢旺达", value: "+250" },
        { label: "埃塞俄比亚", value: "+251" },
        { label: "索马里", value: "+252" },
        { label: "吉布提", value: "+253" },
        { label: "肯尼亚", value: "+254" },
        { label: "坦桑尼亚", value: "+255" },
        { label: "乌干达", value: "+256" },
        { label: "布隆迪", value: "+257" },
        { label: "莫桑比克", value: "+258" },
        { label: "桑给巴尔", value: "+259" },
        { label: "赞比亚", value: "+260" },
        { label: "马达加斯加", value: "+261" },
        { label: "留尼汪", value: "+262" },
        { label: "津巴布韦", value: "+263" },
        { label: "纳米比亚", value: "+264" },
        { label: "马拉维", value: "+265" },
        { label: "莱索托", value: "+266" },
        { label: "博茨瓦纳", value: "+267" },
        { label: "科摩罗和马约特", value: "+269" },
        { label: "圣赫勒拿岛", value: "+290" },
        { label: "厄立特里亚", value: "+291" },
        { label: "阿鲁巴", value: "+297" },
        { label: "法罗群岛", value: "+298" },
        { label: "格陵兰岛", value: "+299" },
        { label: "直布罗陀", value: "+350" },
        { label: "葡萄牙", value: "+351" },
        { label: "卢森堡", value: "+352" },
        { label: "爱尔兰", value: "+353" },
        { label: "冰岛", value: "+354" },
        { label: "阿尔巴尼亚", value: "+355" },
        { label: "马耳他", value: "+356" },
        { label: "塞浦路斯", value: "+357" },
        { label: "芬兰", value: "+358" },
        { label: "保加利亚", value: "+359" },
        { label: "立陶宛", value: "+370" },
        { label: "拉脱维亚", value: "+371" },
        { label: "爱沙尼亚", value: "+372" },
        { label: "摩尔多瓦", value: "+373" },
        { label: "亚美尼亚", value: "+374" },
        { label: "白俄罗斯", value: "+375" },
        { label: "安道尔", value: "+376" },
        { label: "摩纳哥", value: "+377" },
        { label: "圣马力诺", value: "+378" },
        { label: "梵蒂冈", value: "+379" },
        { label: "乌克兰", value: "+380" },
        { label: "塞尔维亚", value: "+381" },
        { label: "黑山", value: "+382" },
        { label: "克罗地亚", value: "+384" },
        { label: "克罗地亚", value: "+385" },
        { label: "斯洛文尼亚", value: "+386" },
        { label: "波斯尼亚黑塞哥维那", value: "+387" },
        { label: "马其顿共和国", value: "+389" },
        { label: "捷克", value: "+420" },
        { label: "斯洛伐克", value: "+421" },
        { label: "列支敦士登", value: "+423" },
        { label: "福克兰群岛（即马尔维纳斯群岛）", value: "+500" },
        { label: "南乔治亚岛和南桑威奇群岛", value: "+0500" },
        { label: "伯利兹", value: "+501" },
        { label: "危地马拉", value: "+502" },
        { label: "萨尔瓦多", value: "+503" },
        { label: "洪都拉斯", value: "+504" },
        { label: "尼加拉瓜", value: "+505" },
        { label: "哥斯达黎加", value: "+506" },
        { label: "巴拿马", value: "+507" },
        { label: "圣皮埃尔和密克隆群岛", value: "+508" },
        { label: "海地", value: "+509" },
        { label: "瓜德罗普", value: "+590" },
        { label: "玻利维亚", value: "+591" },
        { label: "圭亚那", value: "+592" },
        { label: "厄瓜多尔", value: "+593" },
        { label: "法属圭亚那", value: "+594" },
        { label: "巴拉圭", value: "+595" },
        { label: "马提尼克", value: "+596" },
        { label: "苏里南", value: "+597" },
        { label: "乌拉圭", value: "+598" },
        { label: "荷属圣马丁", value: "+599" },
        { label: "东帝汶", value: "+670" },
        { label: "关岛", value: "+1671" },
        { label: "文莱达鲁萨兰国", value: "+673" },
        { label: "瑙鲁", value: "+674" },
        { label: "巴布亚新几内亚", value: "+675" },
        { label: "汤加", value: "+676" },
        { label: "所罗门群岛", value: "+677" },
        { label: "瓦努阿图", value: "+678" },
        { label: "斐济", value: "+679" },
        { label: "帕劳", value: "+680" },
        { label: "瓦利斯和富圖納群島", value: "+681" },
        { label: "库克群岛", value: "+682" },
        { label: "纽埃", value: "+683" },
        { label: "美属萨摩亚", value: "+684" },
        { label: "萨摩亚", value: "+685" },
        { label: "基里巴斯", value: "+686" },
        { label: "新喀里多尼亚", value: "+687" },
        { label: "图瓦卢", value: "+688" },
        { label: "法属波利尼西亚", value: "+689" },
        { label: "托克劳", value: "+690" },
        { label: "密克罗尼西亚联邦", value: "+691" },
        { label: "马绍尔群岛", value: "+692" },
        { label: "朝鲜", value: "+850" },
        { label: "香港", value: "+852" },
        { label: "澳门", value: "+853" },
        { label: "柬埔寨", value: "+855" },
        { label: "老挝", value: "+856" },
        { label: "孟加拉国", value: "+880" },
        { label: "台湾", value: "+886" },
        { label: "马尔代夫", value: "+960" },
        { label: "黎巴嫩", value: "+961" },
        { label: "约旦", value: "+962" },
        { label: "叙利亚", value: "+963" },
        { label: "伊拉克", value: "+964" },
        { label: "科威特", value: "+965" },
        { label: "沙特阿拉伯", value: "+966" },
        { label: "也门", value: "+967" },
        { label: "阿曼", value: "+968" },
        { label: "巴勒斯坦", value: "+970" },
        { label: "阿拉伯联合酋长国", value: "+971" },
        { label: "以色列", value: "+972" },
        { label: "巴林", value: "+973" },
        { label: "卡塔尔", value: "+974" },
        { label: "不丹", value: "+975" },
        { label: "蒙古", value: "+976" },
        { label: "尼泊尔", value: "+977" },
        { label: "塔吉克斯坦", value: "+992" },
        { label: "土库曼斯坦", value: "+993" },
        { label: "阿塞拜疆", value: "+994" },
        { label: "格鲁吉亚", value: "+995" },
        { label: "吉尔吉斯斯坦", value: "+996" },
        { label: "乌兹别克斯坦", value: "+998" },
        { label: "巴巴多斯", value: "+1246" },
        { label: "安圭拉", value: "+1264" },
        { label: "安提瓜和巴布达", value: "+1268" },
        { label: "美属维尔京群岛", value: "+1340" },
        { label: "开曼群岛", value: "+1345" },
        { label: "百慕大", value: "+1441" },
        { label: "格林纳达", value: "+1473" },
        { label: "特克斯和凯科斯群岛", value: "+1649" },
        { label: "蒙塞拉特岛", value: "+1664" },
        { label: "北马里亚纳群岛", value: "+1670" },
        { label: "圣卢西亚", value: "+1758" },
        { label: "多米尼克", value: "+1767" },
        { label: "圣文森特和格林纳丁斯", value: "+1784" },
        { label: "波多黎各", value: "+1787" },
        { label: "多米尼加共和国", value: "+1809" },
        { label: "特立尼达和多巴哥", value: "+1868" },
        { label: "圣基茨和尼维斯", value: "+1869" },
        { label: "牙买加", value: "+1876" },
        { label: "巴哈马", value: "+001" },
        { label: "斯威士兰", value: "+268" }
      ],
      acc_list: [
        {
          description: "",
          icon:"../../../static/images/eles_no.png"
        }
      ],
      assistOptions1: [],
      assistOptions2: [],
      assistOptions3: [],
      value: "",
      kw1: "",
      kw2: "",
      kw3: "",
      assistId1: "",
      assistId2: "",
      assistId3: "",
      token: this.$route.params.token||
          JSON.parse(window.localStorage.getItem("data")).data,
      caseid: this.$route.query.caseid,
      serviceLst: [],
      stateText: "",
      serviceId: [],
      serviceTxt: [],
      serviceLimit:[],
      serviceLimitNum:[],
      obj: {
        casenum: "AJJ293223",
        victimLst: []
      },
      typeId:this.$route.query.typeId,
      parentTypeName:""
    };
  },
  methods: {
    changeserviceLimit(ind,id){
        console.log(this.serviceLimitNum)
    },
    error2msg(errcode){
      var errmsg = err;
      var msg = errmsg.tomsg(errcode);
      Message.error(msg);
    },
    handleGetFile(e) {      
      this.file = e.target.files[0];
      this.txts = this.file.name;
    },

    uploadFile(){
      let that = this;
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      let formdata = new FormData();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      formdata.append(
        "token",
        this.$route.params.token ||
          JSON.parse(window.localStorage.getItem("data")).data
      );
      reader.onload = function(e) {
        that.avatar = this.result;
        formdata.append("file", that.file);
        that.axios
          .post(
            constants.domain+"rescue/case/upload_file",
            formdata,
            config
          )
          .then(res => {
            that.url = res.data.obj;
            that.up();
          });
      };
      // console.log(that.avatar);
    },
    back() {
      this.$router.push({
        name: "ComAwait"
        ,
        query: {
          typeId:this.typeId
        }
      });
    },
    toUrl(url) {
      window.open(url);
    },
    search(index) {
      let that = this;
      console.log("search nation:" + this.value);
      var kw = "";
      if (index) {
        if (index == 1) kw = this.kw1;
        if (index == 2) kw = this.kw2;
        if (index == 3) kw = this.kw3;
      }
      var nation = encodeURIComponent(this.value);
      fetch(constants.domain+"rescue/user/search_assist", {
        method: "POST",
        body: `token=${this.token}&nation=` + nation + `&kw=` + kw,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(function(res) {
          //console.log(res);
          return res.json();
        })
        .then(function(data) {
          console.log(data.obj);

          if (data.obj) {
            if (index) {
              if (index == 1) that.assistOptions1 = data.obj;
              if (index == 2) that.assistOptions2 = data.obj;
              if (index == 3) that.assistOptions3 = data.obj;
            } else {
              that.assistOptions1 = data.obj;
              that.assistOptions2 = data.obj;
              that.assistOptions3 = data.obj;
            }
          }
        });
    },
    onSubmit() {
      console.log(
        "submit!  assistId1:" +
          this.assistId1 +
          " assistId2:" +
          this.assistId2 +
          " assistId3:" +
          this.assistId3
      );

      var instituteIds = [];
      if (this.assistId1) {
        instituteIds.push(this.assistId1);
      }
      if (this.assistId2) {
        instituteIds.push(this.assistId2);
      }
      if (this.assistId3) {
        instituteIds.push(this.assistId3);
      }
      var services = [];
      for (var i = 0; i < this.serviceLst.length; i++) {
        var s = {};
        if (this.serviceId[i]) {
          s.serviceId = this.serviceLst[i].id;
          if (this.serviceTxt.length > 0) {
            s.description = this.serviceTxt[i];
          }
          if(this.serviceLst[i].fee>0){
            if(this.serviceLimit[i]){
              s.fee = -1;
            }else{
              if(!this.serviceLimitNum[i] || isNaN(this.serviceLimitNum[i])){
                Message.error("请选择限额!");
                return;
              }else{
                s.fee = this.serviceLimitNum[i];
              }
            }
          }else{
            s.fee = 0;
          }

          services.push(s);
        }
      }
      if(instituteIds.length == 0){
        Message.error("请选择启动的机构");
        return;
      }
      if(services.length == 0){
        Message.error("请选择服务清单");
        return;
      }
      var instituteIdStr = JSON.stringify(instituteIds);
      var servicesStr = JSON.stringify(services);
      var tuploadcnt=this.acc_list.slice();
      tuploadcnt.shift(); // 第一个是临时变量
      var uploadcntStr=JSON.stringify(tuploadcnt);
      console.log(
        "serviceId:" +
          this.serviceId +
          " serviceTxt:" +
          this.serviceTxt.length +
          " instituteIds:" +
          instituteIds +
          " services:" +
          servicesStr + 
          " serviceLimitNum:"+
          this.serviceLimitNum +
          "serviceLimit:"+
          this.serviceLimit
      );
      this.axios
        .post(
          constants.domain+"rescue/bidding/submit_author",
          qs.stringify({
            token: this.token,
            id: this.caseid,
            stateText: this.stateText,
            instiIdsStr: instituteIdStr,
            services: servicesStr,
            uploadcnt:uploadcntStr,
          })
        )
        .then(res => {
          console.log(res.data);
          if (res.data.code === 0) {
            Message({
                message: "操作成功",
                type: "success"
              });
            this.$router.push({
              name: "ComAwait",
              params: {
                token: this.token
              },
              query: {
                typeId:this.typeId
              }
            });
          }else{
            error2msg(res.data.code);
          }
        });
    },
     up() {
      let flag = constants.isPic(this.url);        
      if (flag) {
        this.acc_list.push({
          flag: true,
          url: this.url,
          description: this.txts,
          icon:this.url
        });
      } else {
        if (this.url === "") {
          Message.error("请上传附件");
        } else {
          this.acc_list.push({
            flag: false,
            url: this.url,
            description: this.txts,
            icon: "../../../static/images/eles_icon.png"
          });
        }
      }
    },
  },
  mounted: function() {
    let that = this;
    fetch(constants.domain+"rescue/case/detail_case", {
      method: "POST",
      body: `token=${this.token}&caseId=${this.caseid}`,
      mode: "cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(function(res) {
        //console.log(res);
        return res.json();
      })
      .then(function(data) {
        console.log("data:" + data.obj);

        if (data.code == 0) {
          console.log("caseNo:" + data.obj.obj.caseNo);
          that.obj.incidentType = data.obj.obj.incidentType;
          that.obj.casenum = data.obj.obj.caseNo;
          for (var i = 0; i < data.obj.victimList.length; i++) {
            that.obj.victimLst.push(data.obj.victimList[i].obj);
          }
        }
      });

    fetch(constants.domain+"rescue/service_plan/get_service",{
          method: "POST",
          body: `token=${this.token ||
            JSON.parse(window.localStorage.getItem("data"))
              .data}&id=${this.typeId}`,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(function(res) {
            return res.json();
        }).then(function(data){
          if(data.code == 0){
            that.parentTypeName = data.obj.name;
          }else{
            console.log("center helpStart getService error:"+data.code);
          }
        })

    fetch(
      constants.domain+"rescue/service_plan/level_service",
      {
        method: "POST",
        body: `token=${this.token}&parentId=${this.typeId}`,
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
      .then(function(res) {
        //console.log(res);
        return res.json();
      })
      .then(function(data) {
        if (data.obj) {
          that.serviceLst = data.obj;
        }
      });

    this.search(1);
    this.search(2);
    this.search(3);
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
ul li {
  width: 23%;
  margin-left: 2%;
  text-align: center;
}
ul li img {
 width: 100%;
}
.span_node{
  font-weight: normal;
}
ul li.el-select-dropdown__item{
  width: 100%;
}
.acc_box {
  box-sizing: border-box;
  padding: 10px 10px;
}
.acc_box > p {
  color: #333;
  line-height: 40px;
  font-size: 15px;
}
.acc_box ul li {
  display: inline-block;
  width: 20%;
  text-align: center;
}
.acc_box ul li p {
  text-align: center;
  line-height: 36px;
  height: 36px;
  font-size: 14px;
}
.acc_box ul li img {
  width: 90px;
  height: 120px;
}
.acc_box ul li a {
  color: #00abfa;
  font-size: 14px;
}
.limit_box{
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.limit_box span .el-input{
  width: 100px;
  height: 30px;
  margin-left: 15px;
  margin-right: 15px;
}
.limit_box span .el-checkbox{
  margin-right: 5px;
}
</style>