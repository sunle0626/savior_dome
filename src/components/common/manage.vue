<template>
    <div class="manage_box">
        <h2>当前案件管理</h2>
        <div class="manage_case_box">
            <ul>
                <li v-for="(v,ind) in manage_list" :key="ind">
                    <span>{{v.order}}、{{v.name}}</span>
                    <span>{{v.phone}}</span>
                    <span>{{v.type}}</span>
                    <span>救援模式：{{v.includetype}}</span>
                    <span class="op">当前操作方：{{v.usertype}}</span>
                    <b>查看并处理</b>
                </li>
            </ul>
        </div>
        <div class="flow_box">
            <p>流程示意</p>
            <div class="step_box">
                <el-steps :active="2" align-center >
                    <el-step title="启动当地救援公司" ></el-step>
                    <el-step title="医疗费用担保" ></el-step>
                    <el-step title="收集医疗单据" ></el-step>
                    <el-step title="传递相关医疗单据到保险公司" ></el-step>
                </el-steps>
            </div>
            <div class="list_box">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    >
                    <el-table-column
                        prop="time"
                        label="时间"
                        width="140"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="oper"
                        label="操作方"
                        width="200"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="node"
                        label="操作节点"
                        width="240"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="detail"
                        label="操作细节"
                        width="260"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="nstate"
                        label="当前状态"
                        align="center">
                    </el-table-column>
                </el-table>
                <div class="time_box">
                    已耗时：
                    <span>{{time}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      manage_list: [
        {
          order: 1,
          name: "黄老板",
          phone: "+851621665212121",
          type: "门急诊就医",
          includetype: "大包",
          usertype: "保险公司"
        }
      ],
      tableData: [
        {
          time: "2018.09.02 20:22",
          oper: "安盛救援服务有限公司登录账号：1827372",
          node: "医疗救援 出诊服务",
          detail: "出诊安排 安盛附属医院骨科",
          nstate: "已完成"
        },
        {
          time: "2018.09.02 20:22",
          oper: "安盛救援服务有限公司登录账号：1827372",
          node: "医疗救援 出诊服务",
          detail: "出诊安排 安盛附属医院骨科",
          nstate: "已完成"
        },
        {
          time: "2018.09.02 20:22",
          oper: "平台指挥中心 登录账号：1827372",
          node: " 服务清单 变更",
          detail: "服务清单变更 新增遗体转运",
          nstate: "未完成"
        }
      ],
      time: "1天20小时"
    };
  }
};
</script>

<style scoped>
.manage_box {
  margin-top: 25px;
  box-sizing: border-box;
  padding: 0 180px;
}
.manage_box h2 {
  font-size: 20px;
  font-weight: 500;
  text-align: start;
}
.manage_case_box {
  margin-top: 20px;
  border: 1px solid #00abfa;
}
.manage_case_box ul,
.manage_case_box ul li {
  width: 100%;
}
.manage_case_box ul li {
  height: 36px;
  line-height: 36px;
}
.manage_case_box ul li b {
  float: right;
  background: #00abfa;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  line-height: 36px;
  padding: 0 25px;
}
.manage_case_box ul li span {
  float: left;
}
.manage_case_box ul li span {
  margin-left: 45px;
}
.manage_case_box ul li span:first-child {
  margin-left: 15px;
}
.manage_case_box ul li span.op {
  color: #ff7200;
}
.flow_box {
  text-align: start;
  margin-top: 30px;
}
.flow_box p {
  font-size: 18px;
  font-weight: 500;
}
.step_box {
  margin-top: 10px;
  line-height: 24px;
  font-size: 15px;
}
/* 步骤条、表格样式暂时无法修改，有空回来改 */
.time_box {
    height: 48px;
    font-size: 24px;
    line-height: 48px;
    color: #444;
    border-bottom: 1px  solid #eee;

}
.time_box span{
    color: #ff7200
}
</style>