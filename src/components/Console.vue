<template>
  <div style="margin-bottom: 2.25rem;">
    <header class="header-wrapper">
      <div style="display: flex">
        <img class="avator" src="">
        <router-link class="userInfo" to="home" v-if="userInfo">{{userInfo.realname}}</router-link>
        <router-link class="userInfo" to="login?from=Mine" v-else>请点击登录</router-link>
      </div>
    </header>
    <div class="accountInfo">
      <div>
        <p v-if="userInfo">￥{{remainder}}</p>
        <p v-else>￥0</p>
        <p>账户余额</p>
      </div>
      <div>
        <p v-if="userInfo">￥{{voucher}}</p>
        <p v-else>￥0</p>
        <p>现金券余额</p>
      </div>
    </div>
    <!--导航-->
    <div class="cons-nav">
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item v-for="(item,index) in controlNav" :link="item.url" :key="index">
          <img slot="icon" src="">
          <span slot="label" class="grid-item">{{ item.title }}</span>
        </grid-item>
      </grid>
    </div>
    <!--资源-->
    <div class="resources">
      <h6 class="title">我的资源</h6>
      <div class="cellbox">
        <group>
          <cell v-for="(item,index) in myResources" :title="item.name" :inline-desc="$store.state.zone.zonename" is-link
                class="cell-title" :key="index">
            <span class="cell-right"  @click="push(item)">查看详情</span>
          </cell>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
  import {Swiper, XButton, Tab, TabItem, Grid, GridItem, Group, Cell, CellBox} from 'vux'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {mapState} from 'vuex'
  export default {
    components: {
      Swiper,
      XButton,
      Tab,
      TabItem,
      Grid,
      GridItem,
      Group,
      Cell,
      CellBox
    },
    data () {
      return {
        type: '',
        remainder: '',
        voucher: '',
        controlNav: [
          {title: '告警', url: '/warn'},
          {title: '工单', url: '/workOrder'},
          {title: '充值', url: '/recharge'},
        ],
        myResources: []
      }
    },
    methods: {
      setData(values){
        var response = values[0]
        if (response.status == 200 && response.data.status == 1) {
          this.remainder = response.data.data.remainder
          this.voucher = response.data.data.voucher
        }
        var response = values[1]
        if (response.status == 200 && response.data.status == 1) {
          this.myResources = response.data.result
        }
      },
      //查看详情
      push(item){
        if(item.name=='云计算'){this.type='server'}
        if(item.name=='云网络'){this.type='network'}
        if(item.name=='云安全'){this.type='security'}
        if(item.name=='云存储'){this.type='storage'}
        if(item.name=='云运维'){this.type='operations'}
        this.$router.push({path:'Sourcedetail',query:{type:this.type}})
      }
    },
    computed: mapState([
      // 映射 this.count 为 store.state.count
      'userInfo'
    ]),
    beforeRouteEnter(to, from, next){
      var money = axios.post('device/DescribeWalletsBalance.do', {
        zoneId: $store.state.zone.zoneid
      })
      var sources = axios.get('user/userSourceManager.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
      Promise.all([money, sources]).then((values) => {
        next(vm => {
        vm.setData(values)
    })
      next(vm => {
        vm.setData(values)
    })
    })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .header-wrapper {
    background-color: #616161;
    height: 4rem;
    padding: 1rem 1.2rem;
    .avator {
      width: 2rem;
      height: 2rem;
      background-color: #ccc;
      margin-right: 1rem;
      vertical-align: middle;
    }
    .userInfo {
      line-height: 2rem;
      font-size: .7rem;
      color: #fff;
      width: 100%;
      position: relative;
      &:after {
        content: '';
        display: inline-block;
        position: absolute;
        width: .5rem;
        height: .5rem;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        transform: translateY(-50%) rotate(-135deg);
        top: 50%;
        right: 0rem;
      }
    }
  }

  .accountInfo {
    display: flex;
    padding: .5rem;
    background-color: #fff;
    margin-bottom: 1rem;
    > div {
      width: 50%;
      &:first-of-type {
        border-right: 1px solid rgba(216, 216, 216, 1);
      }
      > p {
        font-size: .7rem;
        text-align: center;
      }
    }
  }

  .cons-nav {
    .grid-item {
      font-size: .7rem;
      color: rgba(34, 34, 34, 1);
      line-height: 1.6rem;
    }
  }

  .resources {
    padding: .5rem 0;
    .title {
      padding: .5rem 1rem 0rem 1rem;
      font-size: .8rem;
      font-weight: normal;
      color: #000;
      /*border-bottom: 1px solid #e7e7e7;*/
    }
    .cellbox {
      .cell-title {
        font-size: .8rem;
      }
      .cell-right {
        font-size: .7rem;
        color: rgba(102, 102, 102, 1);
        line-height: 1.4rem;
      }
    }
  }

</style>

