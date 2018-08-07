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
            loadbalanceType: this.balHostData.type == 'internalLoadbalance' ? '' : '1'
          }
        }).then(response => {
          this.balHostData = response.data.result
        })
      },
      // 绑定主机列表
      hosted(){
        axios.get('network/showLoadBalanceVM.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            netwrokId: this.balHostData.networkid,
            internalLoadbalance: this.balHostData.type == 'internalLoadbalance' ? '1' : '',
            loadbalanceId: this.balHostData.lbid || this.balHostData.loadbalanceroleid
          }
        }).then(response => {
          response.data.result.forEach(e => {
            this.addHost.push({name: e.computername, value: e.computerid})
          })
        })
      },
      //添加主机
      hostBind(){
        let url = '', params = {}
        if (this.balHostData.type == 'internalLoadbalance') {
          url = 'loadbalance/assignToInternalLoadBalancerRule.do'
          params = {
            VMIds: this.host[0],
            lbId: this.balHostData.lbid,
            _t: new Date().getTime()
          }
        } else {
          url = 'loadbalance/assignToLoadBalancerRule.do'
          params = {
            VMIds: this.host[0],
            roleId: this.balHostData.loadbalanceroleid,
            _t: new Date().getTime()
          }
        }
        axios.get(url, {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('balancedetail')
          }
        })
      },
    },
    created(){
      this.balhost();
      this.hosted();
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
