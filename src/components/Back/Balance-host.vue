<template>
  <div id="balance-host">
    <x-header></x-header>
    <Group>
      <cell v-for="(item,index) in balHostData" :key="index" :title="item.computername" inline-desc="正常"></cell>
    </Group>
    <Group>
      <popup-picker title="添加主机" :data="addHost" v-model="host"></popup-picker>
    </Group>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, PopupPicker} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      PopupPicker
    },
    beforeRouteEnter(to, from, next){
      //查询该负载均衡下的主机
      var balhost = axios.get('loadbalance/listVmByRoleId.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
          roleId: sessionStorage.getItem('roleId'),
          loadbalanceType: sessionStorage.getItem('loadbalanceType')
        }
      })
      // 负载均衡绑定主机
      var host = axios.get('network/showLoadBalanceVM.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
          netwrokId: sessionStorage.getItem('networkid'),
          internalLoadbalance: sessionStorage.getItem('internalLoadbalance'),
          loadbalanceId: sessionStorage.getItem('loadbalanceId')
        }
      })
      Promise.all([balhost, host]).then(response => {
        next(vm => {
          vm.balHostData = response[0].data.result
          vm.addHost = response[1].data.result
        })
      })
    },
    data(){
      return {
        balHostData: [],
        //添加主机
        addHost: [],
        host: [],
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
