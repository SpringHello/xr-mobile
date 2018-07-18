<template>
  <div class="home-page">
    <home-header></home-header>
    <div class="center">
      <gb-flow></gb-flow>
      <gb-award></gb-award>
      <gb-advantage></gb-advantage>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import homeHeader from '../../../components/Active/groupBooking/gb-element/gb-home-header'
  import gbFlow from '../../../components/Active/groupBooking/gb-element/gb-flow'
  import gbAward from '../../../components/Active/groupBooking/gb-element/gb-award'
  import gbAdvantage from '../../../components/Active/groupBooking/gb-element/gb-advantage'

  export default {
    components: {
      homeHeader,
      gbFlow,
      gbAward,
      gbAdvantage
    },
    data() {
      return {}
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .home-page {
    background: #FFF;
    .center {
      padding: 0rem .24rem;
    }
  }

</style>
