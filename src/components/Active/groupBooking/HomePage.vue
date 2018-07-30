<template>
  <div class="home-page">
    <x-header>首页</x-header>
    <home-header></home-header>
    <gb-product :isCloud="false"></gb-product>
    <div class="center">
      <gb-flow></gb-flow>
      <gb-award></gb-award>
      <gb-advantage></gb-advantage>
      <gb-rule></gb-rule>
    </div>
    <gb-footer></gb-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '../../../util/iaxios'
  import {XHeader} from 'vux'
  import homeHeader from '../../../components/Active/groupBooking/gb-element/gb-home-header'
  import gbProduct from '../../../components/Active/groupBooking/gb-element/gb-product'
  import gbFlow from '../../../components/Active/groupBooking/gb-element/gb-flow'
  import gbAward from '../../../components/Active/groupBooking/gb-element/gb-award'
  import gbAdvantage from '../../../components/Active/groupBooking/gb-element/gb-advantage'
  import gbRule from '../../../components/Active/groupBooking/gb-element/gb-rule'
  import gbFooter from  '../../../components/Active/groupBooking/gb-element/gb-footer'
  import $store from '../../../vuex'

  export default {
    components: {
      XHeader,
      homeHeader,
      gbProduct,
      gbFlow,
      gbAward,
      gbAdvantage,
      gbRule,
      gbFooter
    },
    beforeRouteEnter(to, from, next) {
      if ($store.state.userInfo) {
        let url = 'activity/boughtVM.do'
        axios.get(url, {
          params: {
            activityNum: '21'
          }
        }).then(res => {
          if (res.data.status == 1) {
            switch (res.data.result) {
              case 1:
                next({path: '/ruicloud/shareLink'})
                break
              case 2:
                next({path: '/ruicloud/activityLink'})
                break
              default:
                next()
            }
          } else {
            next()
          }
        })
      } else {
        next()
      }
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
