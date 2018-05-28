<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header></x-header>
    <div class="cellbox" v-if="$route.query.type=='server'">

      <group>
        <cell v-for="(item,index) in host" :inline-desc="item.serviceoffername" :title="item.computername" is-link
              class="cell-title" :key="index">
          <span class="cell-right" @click="push(item)">查看详情</span>
        </cell>
      </group>
    </div>
    <div class="cellbox" v-if="$route.query.type=='network'">

      <group>
        <cell v-for="(item,index) in tanIP" :inline-desc="item.publicip" :title="item.vpcname" is-link
              class="cell-title" :key="index">
          <span class="cell-right" @click="push(item)">查看详情</span>
        </cell>
      </group>
    </div>
    <div class="cellbox" v-if="$route.query.type=='security'">

      <group>
        <cell v-for="(item,index) in fireWall" :inline-desc="item.companyid" :title="item.acllistname" is-link
              class="cell-title" :key="index">
          <span class="cell-right" @click="push(item)">查看详情</span>
        </cell>
      </group>
    </div>
    <div class="cellbox" v-if="$route.query.type=='storage'">

      <group>
        <cell v-for="(item,index) in disk" :inline-desc="item.diskoffer" :title="item.diskname" is-link
              class="cell-title" :key="index">
          <span class="cell-right" @click="push(item)">查看详情</span>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, CellBox,XHeader } from 'vux'
  export default {
    components: {
      Group,
      Cell,
      CellBox,
      XHeader
    },
    data () {
      return {
        host: [],
        tanIP:[],
        fireWall:[],
        disk:[]
      }
    },
    methods: {
       push(item){

           sessionStorage.setItem('items', JSON.stringify(item))
           this.$router.push('hostDetail')
       },
      setData(values){
          var response=values[0]
        if (response.status == 200 && response.data.status == 1) {
          this.host = response.data.result.open.list
        }
        var response=values[1]
        if (response.status == 200 && response.data.status == 1) {
          this.tanIP = response.data.result
        }

        var response=values[2]
        if (response.status == 200 && response.data.status == 1) {
          this.fireWall = response.data.result
        }
        var response=values[3]
        if (response.status == 200 && response.data.status == 1) {
          this.disk = response.data.result
        }
      }
    },
    beforeRouteEnter(to, from, next){
      var host=axios.get('information/listVirtualMachines.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
       var tanIP=axios.get('network/listPublicIp.do',{
         params: {
           zoneId: $store.state.zone.zoneid
         }
       })
      var fireWall=axios.get('network/listAclList.do',{
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
      var disk=axios.get('Disk/listDisk.do',{
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
      Promise.all([host, tanIP,fireWall,disk]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      }, values => {
        next(vm => {
          vm.setData(values)
        })
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .cellbox {
    .cell-title {
      font-size: .75rem;
    }
    .cell-right {
      font-size: .7rem;
      color: rgba(102, 102, 102, 1);
      line-height: 1.4rem;
    }
  }
</style>
