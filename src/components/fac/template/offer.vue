<template>
    <div>
        <div class="top_box">
            <h2>等待救援中</h2>
            <div class="time_box">
                <div class="st_box">
                    起始时间
                    <span>
                        就只有天数，没有小时
                    </span>
                </div>
                <div class="en_box">
                    起始时间
                    <span>
                        就只有天数，没有小时
                    </span>
                </div>
            </div>
        </div>
        <div class="form_box">
        <el-table
        :data="tableData"
        border>
            <el-table-column
                prop="number"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="casenumber"
                label="案件编号"
                width="70">
            </el-table-column>
            <el-table-column
                prop="address"
                label="发生地点"
                width="70">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户姓名"
                width="60">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="用户手机号"
                width="70">
            </el-table-column>
            <el-table-column
                prop="papers"
                label="证件信息"
                width="90">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                width="50">
            </el-table-column>
            <el-table-column
                prop="time"
                label="出险时间"
                width="90">
            </el-table-column>
            <el-table-column
                prop="par"
                label="用户保险详情"
                width="90">
                <template slot-scope="scope">
                    <el-button  type="text" size="small">保险详情/无</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="plan"
                label="当前进度"
                width="60">
            </el-table-column>
            <el-table-column
                prop="node"
                label="当前节点"
                width="60">
            </el-table-column>
            <el-table-column
                prop="get_time"
                label="回复时间"
                width="90">
            </el-table-column>
            <el-table-column
                prop="op"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button  type="text" size="small">查看报价详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
import formVue from "../../common/form.vue";
export default {
  components: {
    formVue
  },
  data() {
    return {
      tableData: [
        {
          number: 1,
          casenumber: "AJ200101",
          address: "美国纽约 第五大道",
          username: "网易 黄博士",
          phone: "+98 139 000000",
          papers: "身份证 829743 297432",
          sex: "男",
          time: "2018年 6月5日  18:00",
          par: "保险详情/无",
          plan: "等待指挥 中心确认",
          node: "指挥中心 确认",
          get_time: "2018年 8月24日  20:00 耗时： 00:56 "
        },
        {
          number: 2,
          casenumber: "AJ200101",
          address: "美国纽约 第五大道",
          username: "网易 黄博士",
          phone: "+98 139 000000",
          papers: "身份证 829743 297432",
          sex: "男",
          time: "2018年 6月5日  18:00",
          par: "保险详情/无",
          plan: "等待保险 公司授权",
          node: "等待保险 公司授权",
          get_time: "2018年 8月24日  20:00 耗时： 00:56 "
        }
      ]
    };
  }
};
</script>

<style scoped>
.top_box {
  width: 100%;
}
.top_box h2 {
  font-size: 22px;
  color: #333;
  font-weight: normal;
  text-align: left;
}
.top_box .time_box {
  font-size: 16px;
}
.time_box > div {
  float: left;
  color: #333;
  padding: 10px 0;
  margin-left: 50px;
}
.time_box > div:first-child {
  margin-left: 10px;
}
.time_box > div span {
  width: 220px;
  border: 1px solid #999;
  color: #999;
  display: inline-block;
  border-radius: 3px;
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
}
</style>