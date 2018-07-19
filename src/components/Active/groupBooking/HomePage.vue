<template>
  <div class="home-page">
    <x-header>首页</x-header>
    <home-header></home-header>
    <div class="center">
      <gb-flow></gb-flow>
      <gb-award></gb-award>
      <gb-advantage></gb-advantage>
      <gb-rule></gb-rule>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader} from 'vux'
  import homeHeader from '../../../components/Active/groupBooking/gb-element/gb-home-header'
  import gbFlow from '../../../components/Active/groupBooking/gb-element/gb-flow'
  import gbAward from '../../../components/Active/groupBooking/gb-element/gb-award'
  import gbAdvantage from '../../../components/Active/groupBooking/gb-element/gb-advantage'
  import gbRule from '../../../components/Active/groupBooking/gb-element/gb-rule'

  export default {
    components: {
      XHeader,
      homeHeader,
      gbFlow,
      gbAward,
      gbAdvantage,
      gbRule
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
