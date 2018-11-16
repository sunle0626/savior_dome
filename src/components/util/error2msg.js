
const err2msg ={
    tomsg:function (errcode) {
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
      if ("ERR_101011" == errcode) return "已报价成功，请勿重复操作";
      if ("ERR_101012" == errcode) return "指挥中心已关闭此报价";
      if ("ERR_100000" == errcode) return "未知错误";
      return errcode;
    }
  }  
export default err2msg
