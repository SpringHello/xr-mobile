<template>
  <div style="margin-bottom: 2.25rem;background:rgba(243,243,243,1);">
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

    <div class="control">
      <div class="control-header">
        <p>我的资源</p>
      </div>
      <div class="control-content">
        <div v-for="(item,index) in controls" :key="index" class="content" @click="conPush(item.type)">
          <img src="">
          <p>{{item.title}}</p>
        </div>
      </div>

      <!--备案-->
      <div class="record">
        <group>
          <cell is-link>
            <span slot="title" class="cell-item">查看备案进度</span>
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
        controls: [
          {img: '', title: '云服务器', type: 'host'},
          {img: '', title: '云硬盘', type: 'disk'},
          {img: '', title: '负载均衡', type: 'balance'},
          {img: '', title: '弹性IP', type: 'ip'},
          {img: '', title: '镜像服务', type: 'mirror'},
          {img: '', title: 'NAT网关', type: 'nat'},
        ],
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
          response.data.result[0].items[0].url = `Sourcedetail?type=host`
          this.resources = response.data.result[0].items[0]
          response.data.result[3].items[0].url = `Sourcedetail?type=disk`
          this.disks = response.data.result[3].items[0]
          response.data.result[1].items[1].url = `Sourcedetail?type=ip`
          this.ip = response.data.result[1].items[1]
          response.data.result[1].items[2].url = `Sourcedetail?type=balance`
          this.balance = response.data.result[1].items[2]
        }
      },
      conPush(url){
        if ($store.state.userInfo) {
          this.$router.push({path:'Sourcedetail',query:{type:url}})
        } else {
          this.$router.push('login')
        }
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

  .control {
    background: rgba(255, 255, 255, 1);
    .control-header {
      font-size: .9rem;
      color: #000;
      padding: .5rem 1rem;
      border-bottom: 1px solid #D9D9D9;
    }
    .control-content {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border-bottom: 1px solid #d9d9d9;
      div {
        width: 30%;
        text-align: center;
        margin-bottom: 1rem;
        img {
          display: block;
          width: 1.5rem;
          height: 1.5rem;
          margin: 0 auto;
          background: #ccc;
        }
        p {
          padding-top: 16px;
          font-size: .8rem;
          color: #222;
        }
      }
    }

    //备案
    .record {
      /*.record-header{*/
      /*font-size: .8rem;*/
      /*color: #222;*/
      /*padding: .5rem 1rem;*/
      /*border-bottom: 1px solid #e7e7e7;*/
      /*border-top: 1px solid #e7e7e7;*/
      /*}*/
      .cell-item {
        font-size: .8rem;
        color: #222;
      }
    }
  }


</style>

