<template>
    <div>
        <div class="app-aj">
			<div class="appdc">待处理案件:(3) <span class="app-ba">此处案件为大救星APP用户报案，请尽快处理</span></div>
			<div class="clan">
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
			        <router-link to="/com/caseindex/appcase">去创立案件</router-link>
		</div>
    </div>
</template>

<script>
export default {};
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