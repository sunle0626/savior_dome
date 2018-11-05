<template>
    <div class="purchase_box">
        <h3>当前采购服务</h3>
        <ul>
            <li v-for="(v,ind) in purchasedata" :key="ind">
                <img :src="v.icon" alt="">
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
  margin-top: 18px;
  box-sizing: border-box;
  padding: 20px 13%;
  /* height: 100px; */
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
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}
li{
    height: 80px;
    background: #fff;
    margin: 20px 0;
    border-radius: 10px;
    border: 1px solid #e6e6e6;
    line-height: 80px;
    color: #666666;
    width: 21%;
    margin-right: 5%;
}
li:nth-child(4n){
    margin-right: 0;
}
</style>