<template>
  <div class="header">
    <div>
      <img src="../../../../assets/img/active/groupBooking/gb-banner3.png"/>
      <img src="../../../../assets/img/active/groupBooking/gb-banner1.png"/>
      <p>首月购买只需59元，邀请好友上云，每成功一位，即赠送一个月，最多可领12个月 </p>
      <p>云主机特惠计划</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .header {
    > div {
      height: 3rem;
      background: #FA846E url('../../../../assets/img/active/groupBooking/gb-banner2.png') no-repeat center;
      background-size: 7.5rem 3rem;
      text-align: center;
      padding-top: .46rem;
      position: relative;
      p {
        font-size: .24rem;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(255, 255, 255, 1);
        line-height: .33rem;
      }
      p:nth-child(4) {
        position: absolute;
        top: .54rem;
        left: 2.9rem;
      }
      p:nth-child(3) {
        width: 4.66rem;
        margin: .39rem auto 0;
        font-size: .2rem;
        line-height: .3rem;
      }
      img {
        display: block;
        height: .51rem;
        margin: 0 auto;
      }
      img:nth-child(2) {
        height: .44rem;
        margin: .36rem auto 0;
      }
    }
  }
</style>
