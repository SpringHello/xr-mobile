<template>
  <div id="balance-host">
    <x-header></x-header>
    <Group>
      <cell v-for="(item,index) in balHostData" :key="index" :title="item.computername" inline-desc="正常"></cell>
    </Group>
    <Group>
      <popup-picker title="添加主机" :data="addHost" v-model="host" @on-change="hostBind"></popup-picker>
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
    data(){
      return {
        balHostData: JSON.parse(sessionStorage.getItem('databal')),
        //添加主机
        addHost: [],
        host: [],
      }
    },
    methods: {
      //查询该负载均衡下的主机
      balhost(){
        axios.get('loadbalance/listVmByRoleId.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            roleId: this.balHostData.loadbalanceroleid || this.balHostData.lbid,
            loadbalanceType: this.balHostData._internal ? '' : '1'
          }
        }).then(response => {
          this.balHostData = response.data.result
        })
      },
      // 负载均衡绑定主机
      host(){
        axios.get('network/showLoadBalanceVM.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            netwrokId: this.balHostData.networkid,
            internalLoadbalance: this.balHostData._internal ? '1' : '',
            loadbalanceId: this.balHostData.loadbalanceroleid
          }
        }).then(response => {
          response.data.result.forEach(e => {
            this.addHost.push({name: e.computername, value: e.computerid})
          })
        })
      },
      //添加主机
      hostBind(){
      },
    },
    created(){
      this.balhost()
      this.host()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
