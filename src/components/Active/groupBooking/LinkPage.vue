<template>
  <div class="link-page">
    <link-header v-if="isJoin"></link-header>
    <home-header v-else></home-header>
    <gb-product :isCloud="true" v-if="!isBuy" :team-leader-company-id="teamLeaderCompanyId"></gb-product>
    <gb-myhost v-else :product-groups="productGroups"></gb-myhost>
    <gb-added :create-time="createTime" :commander="commander" :participationPersonColumns="participationPersonColumns" :participation-person-data="participationPersonData" :is-buy="isBuy"></gb-added>
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
  import homeHeader from '../../../components/Active/groupBooking/gb-element/gb-home-header'
  import linkHeader from '../../../components/Active/groupBooking/gb-element/gb-link-header'
  import gbProduct from '../../../components/Active/groupBooking/gb-element/gb-product'
  import gbMyhost from '../../../components/Active/groupBooking/gb-element/gb-myhost'
  import gbAdded from '../../../components/Active/groupBooking/gb-element/gb-added'
  import gbFlow from '../../../components/Active/groupBooking/gb-element/gb-flow'
  import gbAward from '../../../components/Active/groupBooking/gb-element/gb-award'
  import gbAdvantage from '../../../components/Active/groupBooking/gb-element/gb-advantage'
  import gbRule from '../../../components/Active/groupBooking/gb-element/gb-rule'
  import gbFooter from  '../../../components/Active/groupBooking/gb-element/gb-footer'
  import axios from '../../../util/iaxios'
  import $store from '../../../vuex'

  export default {
    components: {
      homeHeader,
      linkHeader,
      gbProduct,
      gbMyhost,
      gbAdded,
      gbFlow,
      gbAward,
      gbAdvantage,
      gbRule,
      gbFooter
    },
        beforeRouteEnter(to, from, next) {
          let teamLeaderCompanyId = location.href.match(/=(\S*)/) ? location.href.match(/=(\S*)/)[1] : sessionStorage.getItem('teamLeaderCompanyId')
          //sessionStorage.removeItem('teamLeaderCompanyId')
          sessionStorage.setItem('teamLeaderCompanyId', teamLeaderCompanyId)
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
                    next(vm => {
                      vm.setMember()
                      vm.setInfo()
                    })
                    break
                  default:
                    next(vm => {
                      vm.setInfo()
                    })
                }
              } else {
                next(vm => {
                  vm.setInfo()
                })
              }
            })
          } else {
            next(vm => {
              vm.setInfo()
            })
          }
        },
    data() {
      return {
        isJoin: false,
        isBuy: false,
        participationPersonColumns: ['云朵', '加入时间', '状态'],
        participationPersonData: [
        ],
        createTime: '',
        commander: '',
        teamLeaderCompanyId: '',
        productGroups: []
      }
    },
    methods: {
      setInfo() {
        var params = {}
        this.teamLeaderCompanyId = sessionStorage.getItem('teamLeaderCompanyId')
        if (this.teamLeaderCompanyId) {
          params.companyId = this.teamLeaderCompanyId
        }
        axios.get('activity/teamMemberList.do', {
          params
        }).then(response => {
          if (response.data.status == 1) {
            this.commander = response.data.result.list_teamHeader[0].companyname
            this.createTime = response.data.result.list_teamHeader[0].createtime
            this.participationPersonData = response.data.result.list_Members
          }
        })
      },
      setMember() {
        this.isJoin = true
        this.isBuy = true
        axios.get('activity/teamMemberList.do').then(response => {
          if (response.data.status == 1) {
            let params = response.data.result.freevmConfig
            params.templatename = response.data.result.zonTem.templatename
            if (response.data.result.zonTem.templatename.charAt(0).toLocaleUpperCase() == 'C') {
              params.templatename = 'Centos'
            } else {
              params.templatename = 'Windows'
            }
            params.zonename = response.data.result.zonTem.zonename
            this.productGroups.push(params)
          }
        })
      }
    },
    computed: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .link-page {
    background: #FFF;
    .center {
      padding: 0rem .24rem;
    }
  }
</style>
