<template>
  <div id="balancedetail">
    <x-header></x-header>
    <Group class="box">
      <cell title="负载均衡基础信息" class="basic"></cell>
      <cell title="负载均衡名称" :value="balanceData.lbname || balanceData.name"></cell>
      <cell title="状态"
            :value="balanceData.status == 5 ? '删除中' : balanceData.status == 6 ? '解绑主机中' :balanceData.status ==7? '绑定主机中':'正常'"></cell>
      <cell title="网络类型" :value="balanceData.type=='internalLoadbalance' ? '内网负载均衡' : '公网负载均衡'"></cell>
      <cell title="公网/内网IP" :value="balanceData.networkip || balanceData.belongpublicip"></cell>
      <cell title="创建时间" :value="balanceData.createtime"></cell>
      <cell title="区域" :value="balanceData.zonename"></cell>
    </Group>

    <Group>
      <cell title="负载均衡规则" class="basic"></cell>
      <cell title="算法"
            :value="balanceData.algorithm == 'leastconn' ? '最小连接数算法' : balanceData.algorithm == 'source' ? '源算法' : '轮询算法'"></cell>
      <cell title="内网端口" :value="balanceData.privateport" v-if="balanceData.privateport"></cell>
      <cell title="外网端口" :value="balanceData.publicport" v-if="balanceData.publicport"></cell>
      <cell title="源端口" :value="balanceData.sourceport" v-if="balanceData.sourceport"></cell>
      <cell title="实例端口" :value="balanceData.instanceport" v-if="balanceData.instanceport"></cell>
    </Group>

    <Group>
      <cell title="负载均衡主机" is-link class="basic" @click.native="balhost"></cell>
    </Group>
  </div>
</template>

<script>
  import {Group, Cell, XHeader} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader
    },
    data (){
      let balanceData = JSON.parse(sessionStorage.getItem('balanceData'))
      return {
        balanceData,
      }
    },
    methods: {
      //跳转负载均衡主机
      balhost(){
        sessionStorage.setItem('databal', JSON.stringify(this.balanceData))
        this.$router.push('Balancehost')
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
