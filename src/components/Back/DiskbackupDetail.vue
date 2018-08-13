<template>
  <div>
    <x-header>硬盘备份</x-header>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {XHeader, XInput, Group, Cell} from 'vux'
  export default{
    components: {
      XHeader,
      XInput,
      Group,
      Cell
    },
    beforeRouteEnter(to, from, next){
      axios.get('Snapshot/listDiskSnapshots.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
          page: 1,
          pageSize: 15
        }
      }).then(response => {
        next(vm => {
          vm.setData(response.data.result)
        })
      })
    },
    data(){
      return {}
    },
    methods: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
