<template>
  <div id="invoice">
    <x-header>发票管理</x-header>
    <div>
      <Group>
        <cell title="发票申请" is-link link="applyinvoice"></cell>
        <cell title="发票申请记录" is-link link="traceinvoice"></cell>
        <cell title="增票资质认证" is-link link="ticketVali"></cell>
      </Group>
    </div>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, XInput} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      XInput
    },
    data(){
      window.scrollTo(0, 0);
      return {}
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
