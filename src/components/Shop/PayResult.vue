<template>
  <div id="payResult">
    <div v-if="status==1">
      <img src="../../assets/img/back/success.png">
      <h3>支付成功</h3>
      <p>请稍等，正在为您配置资源…</p>
      <router-link :to="resorceList">查看资源</router-link>
    </div>
    <div v-else>
      <img src="../../assets/img/back/fail.png">
      <h3>支付失败</h3>
      <p>抱歉，你的订单支付失败，请重新支付</p>
      <router-link to="home" class="fail">重新支付</router-link>
    </div>
  </div>
</template>

<script>
  import {XButton} from 'vux'
  export default{
    components: {
      XButton
    },
    data () {
      return {
        status: sessionStorage.getItem('status'),
        resorceList: sessionStorage.getItem('resorceList')
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #payResult {
    background-color: #FFF;
    div {
      text-align: center;
      padding: 2.87rem 0 5rem 0;
      h3 {
        font-size: .36rem;
        color: rgba(51, 51, 51, 1);
        line-height: .5rem;
        font-weight: normal;
        padding-top: .4rem;
      }
      p {
        font-size: .28rem;
        color: rgba(153, 153, 153, 1);
        line-height: .4rem;
        padding: .22rem 0 .66rem 0;
      }
      a {
        width: 90%;
        font-size: .36rem;
        color: rgba(255, 255, 255, 1);
        line-height: .5rem;
        padding: .19rem 0;
        background: rgba(74, 144, 226, 1);
        border-radius: .1rem;
        display: block;
        margin: auto;
      }
      .fail {
        background: rgba(233, 79, 79, 1);
      }
    }
  }
</style>
