<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header>负载均衡</x-header>
    <div class="box" v-if="list!=''">
      <Group>
        <cell v-for="(item,index) in list" :key="index" :title="item.name" is-link></cell>
      </Group>
    </div>
    <p v-else style="color: #ccc;text-align: center;font-size: .3rem;margin: 50% auto;">暂无数据</p>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, CellBox, XHeader} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      CellBox,
      XHeader
    },
    data () {
      window.scrollTo(0, 0);
      return {
        list: [],
        address: '',
      }
    },
    methods: {
//      push(item){
//        this.address = 'ipdetail'
//        var params = {
//          vpcid: item.vpcId,
//        }
//        this.$router.push({path: this.address, query: params})
//      },
      setData(value){
        for (var type in value) {
          value[type].forEach(e => {
            this.list.push(e)
          })
        }
      }
    },
    beforeRouteEnter(to, from, next){
      axios.get('loadbalance/listLoadBalanceRole.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      }).then(response => {
        next(vm => {
          vm.setData(response.data.result)
        })
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .box {
    background: rgba(243, 243, 243, 1);
    margin-bottom: 1rem;
  }
</style>
