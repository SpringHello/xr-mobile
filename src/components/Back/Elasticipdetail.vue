<template>
  <div id="ipdetails">
    <x-header></x-header>
    <div class="host" style="margin-bottom: .2rem;">
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
          <li>创建时间 <span>{{details.createtime}}</span></li>
        </ul>
      </div>
    </div>
    <div class="opreat">
      <Group>
        <p class="title">IP操作</p>
        <div v-if="(details.computername || details.natgatewayname ||details.loadbalancerolename)">
          <cell title="绑定资源" is-link>{{details.computername || details.natgatewayname ||details.loadbalancerolename}}
          </cell>
          <p class="unbound" @click="showUnbund(details)">解绑资源 <span class="span"></span></p>
        </div>
        <div v-else>
          <popup-picker title="绑定资源" :data="list" v-model="value6" :columns="3" value-text-align="right"
                        @on-show="showBound()" show-name @on-change="Bounded"></popup-picker>
          <p class="unbound" @click="resetIP(details.id)">释放弹性IP <span class="span"></span></p>
        </div>
      </Group>
    </div>

    <div style="height: 1rem"></div>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {CellFormPreview, Group, Cell, XHeader, XSwitch, Confirm, Toast, PopupPicker, Alert} from 'vux'

  export default{
    components: {
      CellFormPreview,
      Group,
      Cell,
      XHeader,
      XSwitch,
      Confirm,
      Toast,
      PopupPicker,
      Alert
    },
    beforeRouteEnter(to, from, next){
      axios.get('network/listPublicIpById.do', {
        params: {
          ipId: to.params.ipId,
          zoneId: $store.state.zone.zoneid,
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          next(vm => {
            vm.setData(response.data.result[0])
          })
        }
      })


    },
    data (){
      window.scrollTo(0, 0);
      return {
        show: true,
        value6: [],
        list: [{name: '绑定云主机', value: 'host', parent: 0}, {name: '绑定NAT网关', value: 'NAT', parent: 0},],
        details: {},

      }
    },
    methods: {
      //获取数据
      setData(ips){
        if (ips) {
          this.details = ips
        }
      },
      //解绑资源
      showUnbund(details){
        if (details.status == 4) {
          this.$vux.toast.text('解绑中', 'middle')
        } else {
          this.$vux.confirm.show({
            title: '解绑资源',
            content: '<p style="text-align: center;">确认解绑该IP?</p>',
            onConfirm: () => {
              var url = ''
              var params = {}
              switch (details.usetype) {
                case 4:
                  url = 'network/unboundElasticIP.do'
                  params = {
                    zoneId: $store.state.zone.zoneid,
                    publicIp: details.publicip,
                    natGatewayId: details.natgatewayid
                  }
                  break;
                case 3:
                  url = 'network/natGatewayUnboundTargetIP.do'
                  params = {
                    zoneId: $store.state.zone.zoneid,
                    publicIp: details.publicip,
                    natGatewayId: details.natgatewayid
                  }
                  break;
                case 1:
                  url = 'network/disableStaticNat.do'
                  params = {
                    zoneId: $store.state.zone.zoneid,
                    VMId: details.computerid,
                  }
                  break
              }
              details.status = 4
              axios.get(url, {params}).then(response => {
                  this.$router.push('/ruicloud/belasticip')
                  if (response.status == 200 && response.data.status == 1) {
                    this.$vux.toast.text(response.data.message, 'middle')
                  }
                  else {
                    this.$vux.toast.text(response.data.message, 'middle')
                  }
                }
              )
            }
          })
        }
      },
      // 确认释放弹性IP
      resetIP(id){
        if (id != null) {
          this.$vux.confirm.show({
            title: '确认',
            content: '您正将“' + this.details.publicip + '”移入回收站，移入回收站之后我们将为您保留两个小时，两小时后我们将自动清空回收站中实时计费资源。',
            onConfirm: () => {
              axios.get('network/delPublic.do', {
                params: {
                  id,
                  zoneId: $store.state.zone.zoneid
                }
              }).then(response => {
                  if (response.status == 200 && response.data.status == 1) {
                    this.$router.push('/ruicloud/belasticip')
                    this.$vux.toast.text(response.data.message, 'middle')
                  }
                  else {
                    this.$vux.toast.text(response.data.message, 'middle')
                  }
                }
              )
            }
          })
        }
      },
      //显示绑定资源
      showBound(){
        if (this.details.status == 3) {
          this.$vux.toast.text('绑定中', 'middle')
        } else {
          //获取绑定主机列表
          axios.get('information/listVirtualMachines.do', {
            params: {
              vpcId: this.details.vpcid,
              num: 0,
              zoneId: $store.state.zone.zoneid
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              response.data.result.open.list.forEach(item => {
                this.list.push({name: item.instancename, value: item.computerid, parent: 'host'})
              })
            }
          })
          //获取绑定nata网关列表
          axios.get('network/listNatGateway.do', {
            params: {
              vpcId: this.details.vpcid,
              zoneId: $store.state.zone.zoneid
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              response.data.result.forEach(item => {
                this.list.push({name: item.natname, value: (item.id).toString(), parent: 'NAT'})
              })
            }
          })
        }
      },
      //确认绑定
      Bounded(key){
        if (key[0] == 'host') {
          axios.get('network/enableStaticNat.do', {
            params: {
              ipId: this.details.publicipid,
              VMId: key[1],
              zoneId: $store.state.zone.zoneid
            }
          }).then(response => {
            this.$router.push('/ruicloud/belasticip')
            if (response.status == 200 && response.data.status == 1) {
              this.$vux.toast.text(response.data.message, 'middle')
            } else {
              this.$vux.toast.text(response.data.message, 'middle')

            }
          })
        }
        else if (key[0] == 'NAT') {
          axios.get('network/bindingElasticIP.do', {
            params: {
              publicIp: this.details.publicip,
              natGatewayId: key[1],
              zoneId: $store.state.zone.zoneid
            }
          }).then(response => {
            this.$router.push('/ruicloud/belasticip')
            if (response.status == 200 && response.data.status == 1) {
              this.$vux.toast.text(response.data.message, 'middle')
            } else {
              this.$vux.toast.text(response.data.message, 'middle')
            }
          })
        }
      },
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host {
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #e7e7e7;
    border-top: 1px solid #e7e7e7;
    .host-item {
      .title {
        margin-left: .3rem;
        padding: .23rem 0 .2rem 0;
        font-size: .32rem;
        font-weight: normal;
        color: #333;
        line-height: .45rem;
        border-bottom: 1px solid #e7e7e7;
      }
      ul {
        li {
          margin-left: .3rem;
          padding: .24rem .3rem .24rem 0;
          border-bottom: 1px solid #e7e7e7;
          list-style: none;
          font-size: .28rem;
          color: #333;
          span {
            display: inline-block;
            font-size: .28rem;
            color: #666;
            float: right;
          }
          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }
    &:first-of-type {
      border-top: none;
    }
  }

  .opreat {
    background: rgba(255, 255, 255, 1);
    .title {
      margin-left: .3rem;
      padding: .23rem 0 .2rem 0;
      font-size: .32rem;
      font-weight: normal;
      color: #222;
      line-height: .45rem;
      border-bottom: 1px solid #e7e7e7;
    }
    .unbound {
      margin-left: .3rem;
      padding: .23rem .35rem .2rem 0;
      font-size: .28rem;
      font-weight: normal;
      color: #222;
      line-height: .45rem;
      border-top: 1px solid #e7e7e7;
      span {
        float: right;
        font-size: .28rem;
        color: #999;
      }
      .span {
        width: .15rem;
        height: .15rem;
        border-right: 2px solid #C7C7C7;
        border-bottom: 2px solid #C7C7C7;
        transform: translateY(.15rem) rotate(311deg);
        float: right;
      }
    }

  }

</style>
