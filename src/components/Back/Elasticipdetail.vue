<template>
  <div>
    <x-header></x-header>
    <div class="host">
      <div class="host-item">
        <h6 class="title">IP基础信息</h6>
        <ul>
          <li>IP地址 <span>{{details.publicip}}</span></li>
          <li>带宽 <span>{{details.bandwith}}M</span></li>
          <li>状态
            <span>
              {{(details.status==1 || details.status==3 ||details.status==4)? '正常':details.status==0? '欠费':details.status==-1? '异常' :details.status==2?'创建中':details.status==5? '升级中':'--'}}
            </span>
          </li>
          <li>IP价格
            <span v-if="details.caseType!=null">{{details.caseType==1? '包年('+details.cpCase+'/年)':details.caseType==2? '包月('+details.cpCase+'/月)' : '实时('+details.cpCase+'/时)'}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="host">
      <div class="host-item">
        <h6 class="title">IP网络详情</h6>
        <ul>
          <li>所属VPC <span>{{details.vpcname}}</span></li>
          <li>IP用途 <span>{{details.usetype == 0 ? '未使用' : details.usetype == 1 ? '绑定主机' : details.usetype == 2 ? '负载均衡' : details.usetype == 3 ? '源NAT' : 'NAT网关'}}</span>
          </li>
          <li>绑定资源
            <span style="color: #4A90E2;">{{details.computername || details.natgatewayname || details.loadbalancerolename}}</span>
            <span style="color: #4A90E2 " v-if="details.usetype == 0">--</span>
          </li>
          <li>创建时间 <span>{{details.createtime}}</span></li>
        </ul>
      </div>
    </div>


    <div class="opreat">
      <h6 class="title">IP操作</h6>
      <p @click="showUnbund(details)" class="unbound" v-if="details.usetype==1">解绑IP <span></span></p>
      <p  class="unbound" v-if="details.usetype==0" @click='push(details.vpcid)'>绑定资源 <span></span></p>
      <p  class="unbound" @click="resetIP(details.id)">释放IP <span></span></p>
    </div>

    <toast v-model="showOK" type="text" is-show-mask :text="messageOK" position="middle" width="70%"></toast>
    <toast v-model="showError" type="text" is-show-mask :text="messageError" position="middle" width="65%"></toast>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import { CellFormPreview, Group, Cell, XHeader, XSwitch, Confirm, Toast,CellBox} from 'vux'
  function getIP(cb, ipId) {
    axios.get('network/listPublicIpById.do', {
      params: {
        ipId,
        zoneId: $store.state.zone.zoneid,
      }
    }).then(response => {
      if (response.status == 200 && response.data.status == 1) {
        let ips = response.data.result[0]
        cb(ips)
      }
    })

  }
  export default{
    components: {
      CellFormPreview,
      Group,
      Cell,
      XHeader,
      XSwitch,
      Confirm,
      Toast,
      CellBox
    },
    beforeRouteEnter(to, from, next){
      let cb = (ips) => {
        next(vm => {
          vm.setData(ips)
        })
      }
      getIP(cb, to.params.ipId)
    },
    data (){
      window.scrollTo(0, 0);
      return {
        details: {},
        showOK: false,
        messageOK: '',
        showError: false,
        messageError: ''
      }
    },
    methods: {
      //获取数据
      setData(ips){
        if (ips) {
          this.details = ips
        }
      },
      //解绑弹窗
      showUnbund(details){
        this.$vux.confirm.show({
          title: '解绑资源',
          content: '确认解绑该IP?',
          onConfirm : ()=> {
            var url = ''
            var params = {}
            switch (details.usetype) {
              case 4 :
                url = 'network/unboundElasticIP.do'
                params = {
                  zoneId: $store.state.zone.zoneid,
                  publicIp: details.publicip,
                  natGatewayId: details.natgatewayid
                }
                break
              case 3 :
                url = 'network/natGatewayUnboundTargetIP.do'
                params = {
                  zoneId: $store.state.zone.zoneid,
                  publicIp: details.publicip,
                  natGatewayId: details.natgatewayid
                }
                break
              case 1 :
                url = 'network/disableStaticNat.do'
                params = {
                  zoneId: $store.state.zone.zoneid,
                  VMId: details.computerid,
                }
                break
            }
            details.status = 4
            axios.get(url, {params}).then(response => {
              let cb = (data) => {
                this.setData(data)
              }
              getIP(cb, this.$route.params.ipId)
              if (response.status == 200 && response.data.status == 1) {
                this.showOK = true
                this.messageOK = response.data.message
              } else {
                this.showError = true
                this.messageError = response.data.message
              }
            })
          }
        })
      },
      // 释放弹性IP
      resetIP(id){
        axios.get('network/delPublic.do', {
          params: {
            id,
            zoneId: $store.state.zone.zoneid

          }
        }).then(response => {
          if (response.status != 200 || response.data.status != 1) {
            this.showError = true
            this.messageError = response.data.message
          } else {
            this.$vux.confirm.show({
              title: '确认',
              content: '您正将“' + this.details.publicip + '”移入回收站，移入回收站之后我们将为您保留两个小时，两小时后我们将自动清空回收站中实时计费资源。',
              onConfirm: () => {
                this.showOK = true
                this.messageOK = response.data.message
              }
            })
          }
        })
      },
      //跳转绑定资源页面
      push(id){
        let address = `/ruicloud/boundresources/${id}`
        this.$router.push({path: address})
      }
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host {
    background: rgba(243, 243, 243, 1);
    .host-item {
      .title {
        padding: .23rem 0 .2rem .3rem;
        background: rgba(255, 255, 255, 1);
        font-size: .32rem;
        font-weight: normal;
        color: #222;
        line-height: .45rem;
        border-bottom: 1px solid #D9D9D9;
      }
      ul {
        background: rgba(255, 255, 255, 1);
        margin-bottom: .2rem;
        li {
          padding: .24rem .3rem;
          border-bottom: 1px solid #D9D9D9;
          list-style: none;
          font-size: .28rem;
          color: #333;
          span {
            display: inline-block;
            font-size: .28rem;
            color: #666;
            float: right;
          }
        }
      }
    }
  }

  .opreat {
    padding-bottom: 1.5rem;
    .title {
      padding: .23rem 0 .2rem .3rem;
      background: rgba(255, 255, 255, 1);
      font-size: .32rem;
      font-weight: normal;
      color: #222;
      line-height: .45rem;
      border-bottom: 1px solid #D9D9D9;
    }
    .unbound{
          padding: .23rem .25rem .2rem .3rem;
          background: rgba(255, 255, 255, 1);
          font-size: .32rem;
          font-weight: normal;
          color: #222;
          line-height: .45rem;
          border-bottom: 1px solid #D9D9D9;
         span{
           width: .15rem;
           height: .15rem;
           border-right: 1px solid #999999;
           border-bottom: 1px solid #999999;
           transform: translateY(.15rem) rotate(311deg);
           float: right;
         }
      }

    }

</style>
