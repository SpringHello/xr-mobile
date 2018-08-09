<template>
  <div id="balance-host">
    <x-header></x-header>

    <swipeout>
      <swipeout-item v-for="(item,index) in hostList" :key="`${item.id+Math.random()}`">
        <div slot="right-menu">
          <swipeout-button background-color="#E6001B" @click.native="moveOut(item.computerid)"
                           text="移除主机"></swipeout-button>
        </div>
        <div slot="content" class="content">
          <li>
            <div>
              <p>{{item.computername}}</p>
              <span>{{status}}</span>
            </div>
            <span class="right"></span>
          </li>
        </div>
      </swipeout-item>
    </swipeout>
    <Group>
      <popup-picker title="添加主机" :data="addHost" v-model="host" @on-change="hostBind" show-name
                    :columns="3"></popup-picker>
    </Group>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, PopupPicker, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      PopupPicker,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    data(){
      return {
        balHostData: JSON.parse(sessionStorage.getItem('databal')),
        //主机列表
        hostList: [],
        //状态
        status: '',
        //添加主机
        addHost: [],
        host: [],

      }
    },
    methods: {
      //该负载均衡下主机列表
      balhost(){
        axios.get('loadbalance/listVmByRoleId.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            roleId: this.balHostData.loadbalanceroleid || this.balHostData.lbid,
            loadbalanceType: this.balHostData.type == 'internalLoadbalance' ? '' : '1'
          }
        }).then(response => {
          this.hostList = response.data.result
          this.status = '主机状态：正常'
        })
      },
      // 显示绑定主机列表
      hosted(){
        axios.get('network/showLoadBalanceVM.do', {
          params: {
            zoneId: $store.state.zone.zoneid,
            netwrokId: this.balHostData.networkid,
            internalLoadbalance: this.balHostData.type == 'internalLoadbalance' ? '1' : '',
            loadbalanceId: this.balHostData.lbid || this.balHostData.loadbalanceroleid
          }
        }).then(response => {
          this.addHost = []
          response.data.result.forEach(e => {
            this.addHost.push({name: e.computername, value: e.computerid,})
          })
        })
      },
      //移除主机
      moveOut(computerid){
        let url = '', params = {};
        if (this.balHostData.type == 'internalLoadbalance') {
          url = 'loadbalance/removeFromInternalLoadBalancerRule.do'
          params = {
            VMIds: computerid,
            lbId: this.balHostData.lbid
          }
        } else {
          url = 'loadbalance/removeFromLoadBalancerRule.do'
          params = {
            VMIds: computerid,
            roleId: this.balHostData.loadbalanceroleid
          }
        }
        axios.get(url, {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text(response.data.message, 'middle')
            this.balhost();
            this.hosted();
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })
      },
      //添加主机
      hostBind(){
        let url = '', params = {}
        if (this.balHostData.type == 'internalLoadbalance') {
          url = 'loadbalance/assignToInternalLoadBalancerRule.do'
          params = {
            zoneId: $store.state.zone.zoneid,
            VMIds: this.host[0],
            lbId: this.balHostData.lbid,
            _t: new Date().getTime()
          }
        } else {
          url = 'loadbalance/assignToLoadBalancerRule.do'
          params = {
            zoneId: $store.state.zone.zoneid,
            VMIds: this.host[0],
            roleId: this.balHostData.loadbalanceroleid,
            _t: new Date().getTime()
          }
        }

        axios.get(url, {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text(response.data.message, 'middle')
            this.balhost();
            this.hosted();
          } else {
            this.$vux.toast.text(response.data.result, 'middle')
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
  .content {
    background-color: #FFF;
    line-height: 0;
    li {
      list-style: none;
      padding: .27rem .3rem;
      border-bottom: 1px solid #e7e7e7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        p {
          font-size: .32rem;
          color: rgba(34, 34, 34, 1);
          line-height: .45rem;
        }
        span {
          font-size: .24rem;
          color: rgba(153, 153, 153, 1);
          line-height: .33rem;
        }
      }
      .right {
        display: inline-block;
        width: .16rem;
        height: .16rem;
        border-left: 1px solid #c8c8c8;
        border-bottom: 1px solid #c8c8c8;
        transform: translate(0) rotate(-135deg);
      }
    }
  }
</style>
