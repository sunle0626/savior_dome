<template>
    <div>
        <div class="contentMenu">
            <div style="height:5px"></div>
            <div v-if="apptodo>0" class="app-aj">
                <div class="appdc padding-20">待处理案件:({{apptodo}}) <span class="app-ba">此处案件为大救星APP用户报案，请尽快处理</span></div>

                <div v-for="(acase,idx) in apptodolst" :key="idx">
                    <div class="clan">
                        <el-checkbox name="appcaselst" @change="checked=>handleAppCase(checked, idx)"
                                     v-model="apptodolst[idx].checked"></el-checkbox>
                        <span>{{time(acase.obj.reportTs)}}</span>
                        <span>由用户<a class="mingc">{{acase.obj.reportUser}}</a>报案</span>
                        <span>【{{acase.incidentTypeStr}}】</span>
                        <span>出险人:{{acase.victimList!=null&&acase.victimList.length>0?acase.victimList[0].obj.victimName:""}},{{acase.victimList!=null&&acase.victimList.length>0&&judgeNull(acase.victimList[0].insuranceCompany)?"":"在保"}}</span>
                        <span>出险地:{{acase.victimList!=null&&acase.victimList.length>0?acase.generalLocation.addr:""}}</span>
                        <span>服务诉求:
							<el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="hover"
                                    :content="acase.obj.desc">
							<a slot="reference" class="mingc col_b">{{judgeNull(acase.obj.desc)?'':(acase.obj.desc.substring(0,3)+"...")}}</a>
							</el-popover>
						</span>
                    </div>
                </div>
            </div>
            <h4 class="marginl10 margint10">创建案件并启动救援</h4>
            <h5 class="marginl10 margint-10">A、案件基本信息<span class="padding-20 span_node">案件编号：{{reportcase.caseNo}}</span><span
                    class="padding-20 lisave span_node" @click="centerDialogVisible=true">从历史案件信息中创建</span></h5>
            <div class="marginl10">
                <div>
                    <table class="padding-bj pad-0-10" cellpadding="5">
                        <tr>
                            <td>
                                报案时间:
                                <el-date-picker type="datetime" placeholder="选择日期"
                                                v-model="reportcase.reportTs" class="marginl10"></el-date-picker>
                                &nbsp;
                                <span class="must">*</span>
                            </td>
                            <td>
                                报案客户:
                                <el-input placeholder="请输入报案者姓名" v-model="reportcase.reportUser" class="marginl10"></el-input>
                                &nbsp;
                                <span class="must">*</span>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                报案电话:
                                <el-input placeholder="请输入报案者联系电话" v-model="reportcase.reporterContact" class="marginl10"></el-input>
                                &nbsp;
                                <span class="must">*</span>
                            </td>
                            <td colspan="2">
                                出险时间:
                                <el-date-picker type="datetime" placeholder="出险时间" v-model="reportcase.incidentTs"
                                class="marginl10"
                                ></el-date-picker>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                案件信息来源:
                                <el-select v-model="reportcase.caseSrc" placeholder="请选择" class="marginl10">
                                    <el-option v-for="item in casesrclst" :key="item" :label="item"
                                               :value="item"></el-option>
                                </el-select>
                                <span class="must">*</span>
                            </td>
                            <td>
                                来源说明:
                                <el-input placeholder="请输入来源说明" v-model="reportcase.caseSrcDesc" class="marginl10"></el-input>
                                &nbsp;
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
                            <el-input placeholder="请输入出险人姓名" v-model="reportcase.victimName" class="marginl10"></el-input>
                            &nbsp;
                            <span class="must">*</span>
                        </td>
                        <td>
                            <span class="">性别:</span>
                            <el-select v-model="reportcase.genderExpr" @change="genderselect" placeholder="请选择" class="marginl10 w100">
                                <el-option v-for="item in genderlst" :key="item.value" :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                            &nbsp;
                            <span class="must">*</span>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <span class="">出险人证件:</span>
                            <el-input placeholder="请输入出险人证件" v-model="reportcase.idNo" class="marginl10"></el-input>
                            &nbsp;
                            <span class="must">*</span>
                            &nbsp;
                            <el-button type="primary" size="small" @click="getinsurance()">查询保单</el-button>
                        </td>
                        <td>
                            <span class="">保单号码:</span>
                            <el-input placeholder="请输入保单号码" v-model="reportcase.insurancePolicyNo" class="marginl10"></el-input>
                            &nbsp;
                            <span class="must">*</span>
                            &nbsp;
                            <el-button type="primary" size="small" @click="showinsurance()">保单详情</el-button>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span class="">所属保险公司:</span>
                            <el-select v-model="reportcase.insuranceCompanyId" class="marginl10 w213" placeholder="保险公司">
                                <el-option v-for="item in companies" :key="item.insti.id" :label="item.insti.name"
                                           :value="item.insti.id"></el-option>
                            </el-select>
                            <span class="must" v-if="tcm[reportcase.insuranceCompanyId]!=null&&tcm[reportcase.insuranceCompanyId].inContract!=1">* <span class="f10">当前保险公司不在合作期内，请知晓</span></span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <span class="">出险地:</span>
                            <el-select v-model="reportcase.siteabroadExpr" @change="caseabroad()" class="w75" 
                                       placeholder="境内">
                                <el-option v-for="item in abroad" :key="item" :label="item"
                                           :value="item"></el-option>
                            </el-select>
                            <span class="must" v-if="reportcase.siteabroadExpr=='境外'">*</span>
                            <el-select v-model="reportcase.nation" v-if="reportcase.siteabroadExpr=='境外'"
                                       @change="loadcounties()" class="w120"  placeholder="请选择国家">
                                <el-option v-for="item in countries" :key="item.value" :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                            
                            <span class="must">*</span>
                            <el-select v-model="reportcase.city" class="w130" placeholder="请选择地区">
                                <el-option v-for="item in counties" :key="item.cityCode" :label="item.cityName"
                                           :value="item.cityCode"></el-option>
                            </el-select>
                            
                            <span class="must">*</span>
                            <el-input placeholder="其他详细地址" v-model="reportcase.addr" class="w303"></el-input>
                            
                            <span class="must">*</span>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <span class="">事故类型:</span>
                            <el-select v-model="reportcase.accidentType" placeholder="请选择">
                                <el-option v-for="item in accidentTypes" :key="item" :label="item"
                                           :value="item"></el-option>
                            </el-select>
                            &nbsp;
                            <span class="must">*</span>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                      <td>
                         <span class="back-wc">受伤部位:</span>
                         <el-input placeholder="如有请填写" v-model="reportcase.injuredPart" class="w140" ></el-input>
                      </td>
                    </tr>

                </table>
            </div>
            <div class="p1026 h50">
                <span class="back-wc">天气灾害:</span>
                <el-radio-group v-model="reportcase.weatherIncident" size="mini">
                    <el-radio :label="1" border>是</el-radio>
                    <el-radio :label="2" border>否</el-radio>
                </el-radio-group>
                <div v-if="reportcase.weatherIncident == 1" style="display: inline-block;" class="h50">
                    &nbsp;
                    <span class="must">*</span>
                    <span class="back-wc padding-40">灾害事故标签:</span>
                    <el-select placeholder="气象灾害" v-model="reportcase.weatherTag" class="w140" >
                        <el-option v-for="item in disasters" :key="item" :label="item"
                                  :value="item"></el-option>
                    </el-select>
                    &nbsp;
                    <span class="must">*</span>
                </div>
            </div>
            <div class="p1026">
                <span class="back-wc" style="vertical-align: top;">事故经过:</span>
                <el-input type="textarea" placeholder="请输入内容" v-model="reportcase.incidentDesc" class="w88100"></el-input>
            </div>
            <div style="text-align: center;margin-top:20px;padding-bottom:20px;">
                <el-button type="primary" class="w200" @click="submitcase">创立案件</el-button>
            </div>
        </div>

        <el-dialog title="从历史案件导入" :visible.sync="centerDialogVisible" center>
            <span class="back-wc">从案件编号导入:</span>
            <el-input placeholder="请输入案件编号" class="w140" ></el-input>
            <el-date-picker type="date" placeholder="系统控件" class="w140" style="float:right"></el-date-picker>
            <span class="back-wc mgt5" style="float:right;">按日期选择:</span>
            <el-table :data="gridData" class="mgt15"  border>
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
import strutils from "./js/strutils.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      typeId: this.$route.query.typeId,
      apptodo: 0,
      apptodolst: [],
      token: this.$route.params.token,
      value: "",
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

      reportcase: {
        reportUser: "",
        reportTs: "",
        reporterContact: "",
        incidentTs: "",
        caseSrc: "",
        caseNo: "",
        caseInsured: -1,
        siteabroadExpr: "境内",
        nation: "+86",
        city: "",
        addr: "",
        weatherIncident: 2,
        weatherTag: "气象灾害",
        accidentType: "意外伤害",
        victimName: "",
        genderExpr: "",
        insurancePolicyNo: "",
        idNo: "",
        insuranceCompanyId: 1,
        injuredPart: "",
        incidentDesc: "",
        regulatorId: 1,
        incidentType: 1
      },
      policy: null,
      companies: [
        {
          insti: {
            name: "江泰救援",
            id: "1"
          },
          inContract: 1
        }
      ],

      casesrclst: [
        "一键救命",
        "电话求救",
        "保险公司转接",
        "其他",
        "保单卡报案",
        "安全中心报案"
      ],

      abroad: ["境内", "境外"],
      genderlst: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],
      genderlst: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],
      countries: [
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
        { label: "中国", value: "+86" },
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
      counties: [],
      disasters: ["气象灾害", "海洋灾害", "洪水灾害", "地质灾害", "其他"],
      accidentTypes: ["意外伤害", "突发疾病", "财产损失"],
      tcm: [
        null,
        {
          name: "江泰救援",
          id: "1"
        }
      ]
    };
  },
  mounted: function() {
    this.loadcompanies();
    this.loadcounties();
    this.loadAppCases();
  },
  methods: {
    genderselect() {
      if (this.reportcase.genderExpr == "女") {
        this.reportcase.gender = 2;
      } else {
        this.reportcase.gender = 1;
      }
    },

    handleAppCase(checked, idx) {
      var z = this;
      if (checked) {
        var ow = z.apptodolst[idx];
        for (var i = 0; i < z.apptodolst.length; ++i) {
          var o1 = z.apptodolst[i];
          if (i != idx) {
            o1.checked = false;
          } else {
            o1.checked = true;
          }
        }
        if (ow != null) {
          var o = ow.obj;
          z.reportcase.id = o.id;
          z.reportcase.reportUser = o.reportUser;
          if (o.reportTs != null) z.reportcase.reportTs = o.reportTs;
          z.reportcase.reporterContact = o.reporterContact;
          if (o.incidentTs != null) z.reportcase.incidentTs = o.incidentTs;
          z.reportcase.caseSrc = o.caseSrc;
          z.reportcase.caseNo = o.caseNo;
          z.reportcase.caseInsured = o.caseInsured;
          if (ow.generalLocation != null) {
            var loc = ow.generalLocation;
            z.reportcase.siteabroadExpr = loc.nation == "+86" ? "境内" : "境外";
            z.reportcase.nation = loc.nation;
            z.reportcase.city = loc.city;
            z.reportcase.addr = loc.addr;
          } else {
            z.reportcase.siteabroadExpr = "";
            z.reportcase.nation = "";
            z.reportcase.city = "";
            z.reportcase.addr = "";
          }

          z.reportcase.weatherIncident = o.weatherIncident;
          z.reportcase.weatherTag = o.weatherTag;
          z.reportcase.accidentType = o.accidentType;

          if (ow.victimList != null && ow.victimList.length > 0) {
            var vict = ow.victimList[0].obj;
            z.reportcase.victimName = vict.victimName;
            z.reportcase.genderExpr = vict.gender == 1 ? "男" : "女";
            z.reportcase.gender = vict.gender;
            z.reportcase.insurancePolicyNo = vict.insurancePolicyNo;
            z.reportcase.idNo = vict.idNo;
            if (vict.insuranceCompanyId != null) {
              z.reportcase.insuranceCompanyId = vict.insuranceCompanyId;
            } else {
              z.reportcase.insuranceCompanyId = 1;
            }
          } else {
            z.reportcase.victimName = "";
            z.reportcase.genderExpr = "";
            z.reportcase.gender = "";
            z.reportcase.insurancePolicyNo = "";
            z.reportcase.idNo = "";
            z.reportcase.insuranceCompanyId = 1;
          }
          z.reportcase.regulatorId = z.reportcase.insuranceCompanyId;
          z.reportcase.injuredPart = o.injuredPart;
          z.reportcase.incidentDesc = o.incidentDesc;
        }
      }
    },
    loadcounties() {
      console.log("load counties.");
      var z = this;
      var cmd = new Object();
      cmd.url = "http://api.test.dajiuxing.com.cn/rescue/case/counties";
      cmd.data = new Object();
      cmd.data.country = this.reportcase.nation;
      cmd.data.token = this.token;
      cmd.succ = function(r) {
        z.counties = r;
      };
      s2c(cmd);
    },

    loadcompanies() {
      var z = this;
      var cmd = new Object();
      cmd.url = "http://api.test.dajiuxing.com.cn/rescue/user/list_regulator";
      cmd.data = new Object();
      cmd.data.token = this.token;
      cmd.succ = function(r) {
        z.companies = r;
        var ntcm = new Object();
        for (var i = 0; i < r.length; ++i) {
          var nt = r[i];
          ntcm[nt.insti.id] = nt;
        }
        z.tcm = ntcm;
      };
      s2c(cmd);
    },
    getinsurance() {
      var z = this;
      var cmd = new Object();
      cmd.url = "http://api.test.dajiuxing.com.cn/rescue/policy/view";
      cmd.data = new Object();
      cmd.data.idNo = this.reportcase.idNo;
      cmd.data.token = this.token;
      cmd.succ = function(r) {
        if (r != null) {
          z.policy = r;
          z.reportcase.insurancePolicyNo = r.docNo;
          z.reportcase.caseInsured = 1;
          z.reportcase.victimName = r.name;
          if (r.regulatorId != null) {
            z.reportcase.insuranceCompanyId = r.regulatorId;
            z.reportcase.regulatorId = r.regulatorId;
          }
        }
      };
      s2c(cmd);
    },
    showinsurance() {
      if (this.policy != null) {
        window.open(this.policy.detailUrl);
      }
    },

    caseabroad() {
      if (this.reportcase.siteabroadExpr == "境内") {
        this.reportcase.nation = "+86";
        this.loadcounties();
      } else {
        this.reportcase.nation = "";
      }
    },

    loadAppCases() {
      console.log("fuck");
      var z = this;
      var cmd = new Object();
      cmd.url =
        "http://api.test.dajiuxing.com.cn/rescue/case/list_case_collection";
      cmd.data = new Object();
      cmd.data.status = 90;
      cmd.data.token = this.token;
      cmd.succ = function(r) {
        z.apptodo = r.length;
        var rr = [];
        for (var i = r.length - 1, j = 0; i >= 0 && j < 2; --i, ++j) {
          var o1 = r[i];
          o1.checked = false;
          rr[j] = o1;
        }
        z.apptodolst = rr;
      };
      s2c(cmd);
    },
    successTo() {
      this.$router.push({
        name: "ComAwait",
        params: {
          token: this.token
        },
        query: {
          typeId: this.typeId
        }
      });
    },
    submitcase() {
      var z = this;
      console.log("reportcase:" + JSON.stringify(this.reportcase));
      if (stil.judgeNull(this.reportcase.reportTs)) {
        Message.error("报案时间不能为空");
        return;
      }
      if (stil.judgeNull(this.reportcase.reportUser)) {
        Message.error("报案客户不能为空");
        return;
      }
      if (stil.judgeNull(this.reportcase.reporterContact)) {
        Message.error("报案电话不能为空");
        return;
      }
      if (stil.judgeNull(this.reportcase.incidentTs)) {
        Message.error("出险时间不能为空");
        return;
      }
      if (stil.judgeNull(this.reportcase.caseSrc)) {
        Message.error("请选择案件信息来源");
        return;
      }
      if (stil.judgeNull(this.reportcase.caseSrcDesc)) {
        Message.error("来源说明不能为空");
        return;
      }
      if (stil.judgeNull(this.reportcase.victimName)) {
        Message.error("出险人姓名不能为空");
        return;
      }
      if (stil.judgeNull(this.reportcase.genderExpr)) {
        Message.error("请选择出险人性别");
        return;
      }
      if (stil.judgeNull(this.reportcase.idNo)) {
        Message.error("出险人证件不能为空");
        return;
      }
      if (stil.judgeNull(this.reportcase.insurancePolicyNo)) {
        Message.error("保单号码不能为空");
        return;
      }
      if (
        stil.judgeNull(this.reportcase.nation) ||
        stil.judgeNull(this.reportcase.city) ||
        stil.judgeNull(this.reportcase.addr)
      ) {
        Message.error("出险地不能为空");
        return;
      }
      if (this.typeId) this.reportcase.incidentType = this.typeId;
      var cmd = new Object();
      cmd.url = "http://api.test.dajiuxing.com.cn/rescue/case/create";
      cmd.data = new Object();
      cmd.data = this.reportcase;
      cmd.data.token = this.token;
      cmd.succ = function(r) {
        console.log("创立案件成功");
        z.successTo();
      };
      s2c(cmd);
    },
    time: time,
    judgeNull: function(val) {
      return stil.judgeNull(val);
    }
  }
};

var stil = new strutils();

function time(str) {
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

function forpst(obj) {
  if (stil.judgeNull(obj)) return "";
  var ks = Object.keys(obj);
  var postdata = "";
  for (var i = 0; i < ks.length; ++i) {
    var d = obj[ks[i]];
    if (d == null) continue;
    if (d.constructor == Array) {
      for (var j = 0; j < d.length; ++j) {
        postdata += ks[i] + "=" + encodeURIComponent(d[j]);
        if (j != d.length - 1) {
          postdata += "&";
        }
      }
    } else if (d.constructor == Date) {
      postdata += ks[i] + "=" + d.getTime();
    } else {
      postdata += ks[i] + "=" + encodeURIComponent(d);
    }
    if (i != ks.length - 1) {
      postdata += "&";
    }
  }
  return postdata;
}

function s2c(cmd) {
  fetch(cmd.url, {
    method: "POST",
    body: forpst(cmd.data),
    mode: "cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
    .then(function(res) {
      //console.log(res);
      return res.json();
    })
    .then(function(data) {
      if (data.code != 0) {
        var handled = false;
        if (cmd.transerr != null) {
          handled = cmd.transerr(data.code);
        }
        if (!handled) {
          var errtxt = e2t(data.code);
          console.log(errtxt);
        }
      } else {
        cmd.succ(data.obj);
      }
    });
}

function e2t(errcode) {
  errcode = "ERR_" + errcode;
  if ("ERR_100001" == errcode) return "参数异常，请重新提交";
  if ("ERR_101000" == errcode) return "登录过期，请重新登录";
  if ("ERR_102000" == errcode) return "用户类型错误";
  if ("ERR_102002" == errcode) return "找不到此机构";
  if ("ERR_102003" == errcode) return "合约已失效";
  if ("ERR_102004" == errcode) return "案件状态错误，无法更新";
  if ("ERR_102005" == errcode) return "案件更新失败";
  if ("ERR_102006" == errcode) return "找不到此机构";
  if ("ERR_102007" == errcode) return "机构保存错误";
  if ("ERR_102008" == errcode) return "找不到此机构合约";
  if ("ERR_102009" == errcode) return "找不到此机构收费方式";
  if ("ERR_102010" == errcode) return "合约保存错误";
  if ("ERR_102011" == errcode) return "找不到此用户";
  if ("ERR_102012" == errcode) return "此案件已创立";
  if ("ERR_101001" == errcode) return "找不到此案件";
  if ("ERR_101002" == errcode) return "找不到方案";
  if ("ERR_101003" == errcode) return "您没有操作权限，请联系管理员";
  if ("ERR_102000" == errcode) return "找不到当前操作状态";
  if ("ERR_101004" == errcode) return "找不到案件出险人";
  if ("ERR_101010" == errcode) return "找不到此方案对应的服务清单";
  if ("ERR_101005" == errcode) return "此案件未推送机构";
  if ("ERR_101006" == errcode) return "救援机构尚未提交方案";
  if ("ERR_101007" == errcode) return "此案已审核，不能修改";
  if ("ERR_101008" == errcode) return "请勿重新提交方案";
  if ("ERR_101009" == errcode) return "找不到此上传资源，无法修改";
  if ("ERR_100000" == errcode) return "未知错误";
  return errcode;
}
</script>


<style scoped >
@import url("./style.css");
/* @import url("./js/elementUI/index.css"); */
input.el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
}
td {
  padding-top: 10px;
  padding-bottom: 10px;
}
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
.w140 {
  width: 140px;
}
.w213 {
  width: 213px;
}
.w120 {
  width: 120px;
}
.f10 {
  font-size: 10px;
}
.w75 {
  width: 75px;
}
.w130 {
  width: 130px;
}
.w303 {
  width: 303px;
}
.w88100 {
  width: 88%;
}
.w200 {
  width: 200px;
}
.mgt5 {
  margin-top: 5px;
}
.mgt15 {
  margin-top: 15px;
}
.p1026 {
  padding: 10px 26px;
}
.h50 {
  height: 50px;
  line-height: 50px;
}
.span_node {
  font-weight: normal;
  font-size: 14px;
}
.w100{
  width: 100px;
}
</style>