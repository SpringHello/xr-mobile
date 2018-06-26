<template>
 <div>
   <x-header>绑定资源</x-header>
   <group>
     <x-switch title="绑定资源" v-model="show"></x-switch>
   </group>
   <div v-if="show" class="opreat">
     <group>
       <popup-picker title="绑定云主机" :data="listHost" :columns="2" v-model="valueHost" show-name></popup-picker>
       <popup-picker title="绑定NAT网关" :data="listNat" :columns="2" v-model="valueNat" show-name></popup-picker>
     </group>
   </div>
 </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {XHeader,XSwitch,Group,PopupPicker } from 'vux'
  export default {
    components: {
      XHeader,
      XSwitch,
      Group,
      PopupPicker
    },
    beforeRouteEnter(to, from, next){
        var host=axios.get('information/listVirtualMachines.do',{
          params:{
            zoneId: $store.state.zone.zoneid,
            vpcId:to.params.id,
            num: 0
          }
      })
      var nat=axios.get('network/listNatGateway.do',{
        params:{
          vpcId:to.params.id,
          zoneId: $store.state.zone.zoneid
        }
      })
      Promise.all([host,nat]).then(values =>{
          next(vm =>{
              vm.setData(values)
          })

      })
    },
    data () {
      return {
        show:false,
        valueHost:[],
        listHost:[],
        valueNat:[],
        listNat:[],
//        id:this.$route.params.ipId,
      }
    },
    methods:{
        //获取绑定资源列表
      setData(values){
         var response=values[0]
        if (response.status == 200 || response.data.status == 1){
          //云主机资源列表
         for(let type in  response.data.result){
            response.data.result[type].list.forEach(list =>{
              this.listHost.push({name:list.computername,value:list.vpcid,parent:0})
            })
         }
        }
          response=values[1]
        if (response.status == 200 || response.data.status == 1){
          //nat网关资源列表
          response.data.result.forEach(list =>{
              this.listNat.push({name:list.natname,value:list.vpcid,parent:0})
          })
        }
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .opreat{
  }

</style>
