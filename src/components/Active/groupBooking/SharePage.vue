<template>
  <div class="share-page">
    <x-header>分享</x-header>
    <share-header :start-time="startTime" :end-time="endTime"></share-header>
    <gb-member :active-link="activeLink" :host-duration="hostDuration" :participation-person-columns="participationPersonColumns"
               :participation-person-data="participationPersonData"></gb-member>
    <div class="center">
      <gb-award></gb-award>
      <gb-footer></gb-footer>
    </div>
    <!-- 支付成功弹窗 只有写内联样式才生效 以后再改 -->
    <div v-transfer-dom>
      <x-dialog v-model="paySuccess" :hide-on-blur="true">
        <div>
          <img src="../../../assets/img/active/groupBooking/gb-icon12.png" style="max-width:100%">
          <p style="font-size: .24rem; font-family: 'Microsoft YaHei', '微软雅黑';color: rgba(102, 102, 102, 1);line-height: .33rem;">支付成功！</p>
          <p style="font-size: .24rem; font-family: 'Microsoft YaHei', '微软雅黑';color: rgba(102, 102, 102, 1);line-height: .33rem;margin-bottom: .5rem">分享给好友获得免费赠送时长吧</p>
        </div>
        <div style="border: .01rem solid #D8D8D8;display: flex">
          <span @click="paySuccess = false"
                style="width:100%;color:rgba(74,144,226,1);font-size: .36rem;font-family: 'Microsoft YaHei', '微软雅黑';line-height: 1rem">知道了</span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import shareHeader from '../../../components/Active/groupBooking/gb-element/gb-share-header'
  import gbMember from '../../../components/Active/groupBooking/gb-element/gb-member'
  import gbAward from '../../../components/Active/groupBooking/gb-element/gb-award'
  import gbFooter from '../../../components/Active/groupBooking/gb-element/gb-footer'
  import {XDialog, XHeader} from 'vux'
  import axios from '../../../util/iaxios'

  export default {
    components: {
      XHeader,
      shareHeader,
      gbMember,
      gbAward,
      gbFooter,
      XDialog
    },
    /*    beforeRouteEnter(to, from, next) {
          if (this.$store.state.userInfo) {
            let info = axios.get('activity/teamMemberList.do')
            let start = axios.get('network/getTime.do')
            Promise.all([info, start]).then((result) => {
              next(vm => {
                vm.setInfo(result)
              })
            }).catch((error) => {
              console.log(error)
            })
          } else{
            next({path: '/ruicloud/groupBooking'})
          }
        },*/
    data() {
      return {
        paySuccess: false,
        productGroups: [],
        startTime: 0,
        endTime: 1564153131,
        activeLink: 'https://pan.xrcloud.net/ruicloud/activity?token=151203854566',
        participationPersonColumns: ['云朵', '加入时间', '状态'],
        participationPersonData: [
          {
            companyname: '1号',
            jointime: '121213'
          },
          {
            companyname: '2号',
            jointime: '12121341243'
          }
        ],
        hostDuration: 0,
      }
    },
    created() {
      if (sessionStorage.getItem('step') == 'step-one') {
        this.paySuccess = true
        sessionStorage.removeItem('step')
      }
    },
    methods: {
      setInfo(response) {
        if (response[0].data.status == 1 && response[1].data.status == 1) {
          this.startTime = response[1].data.result
          let endTime = response[0].data.result.list_teamHeader[0].endtime;
          let date = new Date(endTime.replace(/-/g, '/'));
          this.endTime = date.getTime();
          let params = response[0].data.result.freevmConfig
          params.templatename = response[0].data.result.zonTem.templatename
          if (response[0].data.result.zonTem.templatename.charAt(0).toLocaleUpperCase() == 'C') {
            params.templatename = 'Centos'
          } else {
            params.templatename = 'Windows'
          }
          params.zonename = response[0].data.result.zonTem.zonename
          this.productGroups.push(params)
          this.activeLink = response[0].data.result.list_teamHeader[0].url
          this.participationPersonData = response[0].data.result.list_Members
          this.hostDuration = response[0].data.result.list_teamHeader[0].receiveRecord
        }
      },
      iKnow() {
        this.paySuccess = false
      }
    },
    computed: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .share-page {
    background: #FFF;
    .center {
      padding: 0rem .24rem;
    }
  }
</style>
