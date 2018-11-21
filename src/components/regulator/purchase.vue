<template>
    <div class="purchase_box">
        <h3>当前采购服务</h3>
        <ul>
            <li v-for="(v,ind) in purchasedata" :key="ind">
                <img :src="v.url" alt="">
                <span>{{v.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ["purchasedata"],
  data() {
    return {
    };
  },
  mounted() {
    // console.log(purchasedata);
  }
};
</script>

<style scoped>
.purchase_box {
  margin-top: 1.125vw;
  box-sizing: border-box;
  padding: 1.25vw 9.375vw;
  background: #f2f2f2;
}
.purchase_box h3 {
  font-weight: 600;
  text-align: left;
  color: #333333;
}
ul{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 1.25vw 3.625vw;;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    /* margin-top: 0.625vw; */
}
li{
    height: 4.375vw;
    background: #fff;
    margin: 1.25vw 0;
    font-size: 1vw;
    border-radius: 0.625vw;
    border: 0.0625vw solid #e6e6e6;
    line-height: 5vw;
    color: #666666;
    width: 22%;
    margin-left: 3.7%;
}
li:nth-child(4n+1){
    margin-left: 0;
}
li:nth-child(4n){
    margin-right: 0;
}
.purchase_box span{
    font-size: 1vw;
}
</style>