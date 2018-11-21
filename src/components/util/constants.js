
const domain = "http://api.test.dajiuxing.com.cn/";
//救援公司用
var pt2txt = function (pts) {
    var pt = new Object;
    pt.pts=pts;
    if (pts == 100) { pt.node = "案件已创立"; pt.phase = "指挥中心，案件创立"; }
    if (pts == 110) { pt.node = "案件已完成"; pt.phase = "救援机构，完成救援"; }
    if (pts == 111) { pt.node = "案件已关闭"; pt.phase = "指挥中心，关闭案件"; }
    if (pts == 112) { pt.node = "拒绝启动救援"; pt.phase = "监管机构，拒绝启动救援"; }
    if (pts == 113) { pt.node = "案件已取消"; pt.phase = "指挥中心，取消报价"; }
    if (pts == 120) { pt.node = "启动救援"; pt.phase = "指挥中心，启动救援"; }
    if (pts == 130) { pt.node = "同意启动救援"; pt.phase = "监管机构，同意启动救援"; }
    if (pts == 140) { pt.node = "等待报价"; pt.phase = "指挥中心，提交救援机构，等待报价"; }
    if (pts == 150) { pt.node = "确认报价"; pt.phase = "指挥中心，确认报价，等待监管机构确认"; }
    if (pts == 160) { pt.node = "方案采纳"; pt.phase = "监管机构，授权通过报价方案"; }
    if (pts == 180) { pt.node = "开始救援"; pt.phase = "指挥中心，确认开始救援"; }
    if (pts == 90) { pt.node = "App报案"; pt.phase = "App用户，报案" }

    return pt;
};

// 指挥中心用
var pt2txt2 = function (pts) {
    var pt = new Object;
    pt.pts=pts;
    if (pts == 100) { pt.node = "案件已创立"; pt.phase = "指挥中心，案件创立"; }
    if (pts == 110) { pt.node = "案件已完成"; pt.phase = "救援机构，完成救援"; }
    if (pts == 111) { pt.node = "案件已关闭"; pt.phase = "指挥中心，关闭案件"; }
    if (pts == 112) { pt.node = "拒绝启动救援"; pt.phase = "监管机构，拒绝启动救援"; }
    if (pts == 113) { pt.node = "案件已取消"; pt.phase = "指挥中心，取消报价"; }
    if (pts == 120) { pt.node = "等待监管机构启动授权"; pt.phase = "指挥中心，启动救援"; }
    if (pts == 130) { pt.node = "同意启动救援"; pt.phase = "监管机构，同意启动救援"; }
    if (pts == 140) { pt.node = "等待报价"; pt.phase = "指挥中心，提交救援机构，等待报价"; }
    if (pts == 150) { pt.node = "确认报价"; pt.phase = "指挥中心，确认报价，等待监管机构确认"; }
    if (pts == 160) { pt.node = "方案采纳"; pt.phase = "监管机构，授权通过报价方案"; }
    if (pts == 180) { pt.node = "开始救援"; pt.phase = "指挥中心，确认开始救援"; }
    if (pts == 90) { pt.node = "App报案"; pt.phase = "App用户，报案" }

    return pt;
};

// 监管中心用
var pt2txt3 = function (pts) {
    var pt = new Object;
    pt.pts=pts;
    if (pts == 100) { pt.node = "案件已创立"; pt.phase = "指挥中心，案件创立"; }
    if (pts == 110) { pt.node = "案件已完成"; pt.phase = "救援机构，完成救援"; }
    if (pts == 111) { pt.node = "案件已关闭"; pt.phase = "指挥中心，关闭案件"; }
    if (pts == 112) { pt.node = "拒绝启动救援"; pt.phase = "监管机构，拒绝启动救援"; }
    if (pts == 113) { pt.node = "案件已取消"; pt.phase = "指挥中心，取消报价"; }
    if (pts == 120) { pt.node = "等待启动授权"; pt.phase = "指挥中心，启动救援"; }
    if (pts == 130) { pt.node = "同意启动救援"; pt.phase = "监管机构，同意启动救援"; }
    if (pts == 140) { pt.node = "等待报价"; pt.phase = "指挥中心，提交救援机构，等待报价"; }
    if (pts == 150) { pt.node = "确认报价"; pt.phase = "指挥中心，确认报价，等待监管机构确认"; }
    if (pts == 160) { pt.node = "方案采纳"; pt.phase = "监管机构，授权通过报价方案"; }
    if (pts == 180) { pt.node = "开始救援"; pt.phase = "指挥中心，确认开始救援"; }
    if (pts == 90) { pt.node = "App报案"; pt.phase = "App用户，报案" }

    return pt;
};

var time=function(ts) {
    if(ts==null)
        return '';
    var d = new Date(ts); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = d.getFullYear() + "年";
    var M =
      (d.getMonth() + 1 < 10
        ? "0" + (d.getMonth() + 1)
        : d.getMonth() + 1) + "月";
    var D = d.getDate() + "日";
    var h = d.getHours() + ":";
    var m = d.getMinutes() + ":";
    var s = d.getSeconds();
    // console.log(Y +"-" + M + "-" +D +"-"+ h +"-"+ m +"-"+ s)
    if(d.getHours()==0&&d.getMinutes()==0&&d.getSeconds()==0){
      return Y + M + D;
    }
    return Y + M + D + h + m + s;
  };

  var strHidden =function(str,len){
    if(str == null || str == undefined || str == "") return '';
    var h = "*";
    var size = str.length;
    var r = "";
    if(len){
      if(size<=len){
        for(var i=0;i<size;i++){
            r+=h;
        }
      }else{
        r = str.substr(0,len);
        for(var i=0;i<(size-len);i++){
          r+=h;
        }
      }
    }else{
      for(var i=0;i<size;i++){
        r+=h;
      }
    }
    return r;
  };

  var isPic=function(s){
    if(s==null||s=="")
        return false;
    var ss=s.toUpperCase();
    return endWith(ss,"JPG")||endWith(ss,"PNG");
  };

  function endWith(str,s){
    if(s==null||s==""||str==null||str==""||str.length==0||s.length>str.length)
        return false;
    if(str.substring(str.length-s.length)==s)
        return true;
    else
        return false;
  };

  var state2op = function (caseState,state) {
    var op = "";
    if (caseState == 100) { op = "指挥中心"; }
    if (caseState == 120) { op = "监管机构"; }
    if (caseState == 130) { op = "指挥中心"; }
    if (caseState == 140) {
       op = "指挥中心"; 
       if(state!=null && state == 0){
         op = "救援机构";
       }
    }
    if (caseState == 150) { op = "监管机构"; }
    if (caseState == 160) { op = "指挥中心"; }
    if (caseState == 180) { op = "救援机构"; }

    return op;
};
export default {domain,pt2txt,time,pt2txt2,pt2txt3,isPic,strHidden,state2op}
