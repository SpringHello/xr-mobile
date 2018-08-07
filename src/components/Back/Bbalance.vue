<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header>负载均衡</x-header>
    <Group>
      <popup-picker title="节点选择" :data="nodeList" v-model="nodes" :columns="3" show-name></popup-picker>
    </Group>
    <div class="box" v-if="list!=''">
      <Group>
        <cell v-for="(item,index) in list" :key="index" :title="item.name" is-link
              :inline-desc="item._internal ? '类型:内网负载均衡' : '类型:公网负载均衡'"
              @click.native="push(item)"></cell>
      </Group>
    </div>
    <p v-else style="color: #ccc;text-align: center;font-size: .3rem;margin: 50% auto;">暂无数据</p>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, CellBox, XHeader, PopupPicker} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      CellBox,
      XHeader,
      PopupPicker
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
    },
    data () {
      window.scrollTo(0, 0);
      let nodeList = []
      let nodes = []
      $store.state.zoneList.forEach(e => {
        nodeList.push({name: e.zonename, value: e.zoneid})
      })
      nodes = [$store.state.zone.zoneid]
      return {
        list: [],
        //节点选择
        nodeList,
        nodes,
      }
    },
    methods: {
      push(item){
        sessionStorage.setItem('balanceData', JSON.stringify(item))
        this.$router.push({path: 'balancedetail'})
      },
      setData(value){
        this.list = []
        for (var type in value) {
          value[type].forEach(e => {
            this.list.push(e)
          })
        }
      }
    },
    watch: {
      nodes(){
        axios.get('loadbalance/listLoadBalanceRole.do', {
          params: {
            zoneId: this.nodes[0]
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.setData(response.data.result)
          }
        })
      },
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .box {
    background: rgba(243, 243, 243, 1);
    margin-bottom: 1rem;
    margin-top: .2rem;
  }
</style>
