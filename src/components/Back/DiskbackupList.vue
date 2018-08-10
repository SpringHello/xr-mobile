<template>
  <div id="BackupList">
    <x-header>硬盘备份</x-header>
    <div class="backList">
      <Group>
        <cell v-for="(item,index) in backupData" :key="item.id" :title="item.snapshotname" is-link
              :inline-desc="item.addtime" @click.native=""></cell>
      </Group>
    </div>

    <Group>
      <cell title="新建备份" is-link></cell>
    </Group>
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
      return {
        backupData: []
      }
    },
    methods: {
      //获取备份数据
      setData(response){
        this.backupData = response
      },
      //备份详情
      backupDetail(){
        this.$router.push('/ruicloud/DiskbackupDetail')
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
