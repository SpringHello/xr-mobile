<template>
  <div style="margin-bottom: 1.5rem;background:rgba(243,243,243,1);">
    <header class="header-wrapper">
      <p>控制台</p>
      <div style="display: flex">
        <router-link class="userInfo" to="home">
          <div>
            <span>0</span>
            <span>告警</span>
          </div>
        </router-link>
        <router-link class="userInfo" to="home">
          <div>
            <span>0</span>
            <span>工单</span>
          </div>
        </router-link>
        <router-link class="userInfo" to="login">
          <div>
            <span>0</span>
            <span>待续费</span>
          </div>
        </router-link>
      </div>
    </header>
    <div class="accountInfo">
      <div>
        <p v-if="userInfo" class="money">￥{{remainder}}</p>
        <p v-else class="money">￥0</p>
        <p>账户余额</p>
      </div>
      <div>
        <p v-if="userInfo" class="money">{{voucher}}</p>
        <p v-else class="money">0</p>
        <p>现金券余额</p>
      </div>
    </div>

    <div class="control">
      <div class="control-header">
        <p>我的资源</p>
      </div>
      <div class="control-content">
        <div v-for="(item,index) in controls" :key="index" class="content" @click="conPush(item)">
          <img :src="item.img">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
    <!--备案-->
    <div class="record">
      <div @click="toRecord">
          <p class="cell-item">查看备案进度</p><span class="link"></span>
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
      window.scrollTo(0, 0);
      return {
        type: '',
        remainder: '',
        voucher: '',
        controls: [
          {img: require('../assets/img/console/yunfuwu.png'), title: '云服务器', type: 'host', url: 'bhost'},
          {img: require('../assets/img/console/yunyipan.png'), title: '云硬盘', type: 'disk', url: 'bdisk'},
          {img: require('../assets/img/console/tanip.png'), title: '弹性IP', type: 'elasticip', url: 'belasticip'},
          {img: require('../assets/img/console/fuzaijunh.png'), title: '负载均衡', type: 'balance', url: 'bbalance'},
          {img: require('../assets/img/console/jingxiang.png'), title: '镜像服务', type: 'mirror', url: 'bmirror'},
          {img: require('../assets/img/console/nat.png'), title: 'NAT网关', type: 'nat', url: 'bnat'},
        ],
      }
    },
    methods: {
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.remainder = response.data.data.remainder
          this.voucher = response.data.data.voucher
        }
      },
      conPush(item){
        if ($store.state.userInfo) {
          this.$router.push({path: item.url, query: {type: item.type}})
        } else {
          this.$router.push('login')
        }
      },
      //备案
      toRecord(){
          if($store.state.userInfo){
              this.$router.push('records')
          }else{
            this.$router.push('login')
          }
      }

    },
    computed: mapState([
      // 映射 this.count 为 store.state.count
      'userInfo'
    ]),
    beforeRouteEnter(to, from, next){
      axios.post('device/DescribeWalletsBalance.do', {
        zoneId: $store.state.zone.zoneid
      }).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .header-wrapper {
    background: url(../assets/img/console/Mask@2x.png) no-repeat center;
    background-size: cover;
    padding: .26rem 1.3rem;
    color: #FFF;
    p {
      font-size: .36rem;
      text-align: center;
      margin-bottom: .35rem;
    }
    .userInfo {
      color: #fff;
      width: 100%;
      position: relative;
      div {
        span {
          line-height: .4rem;
          display: block;
          text-align: center;
          font-size: .28rem;
          &:first-of-type{
            font-size: .56rem;
            line-height: .78rem;
          }
        }
      }
    }
  }

  .accountInfo {
    display: flex;
    padding: .2rem;
    background-color: #fff;
    margin-bottom: .2rem;
    > div {
      width: 50%;
      &:first-of-type {
        border-right: 1px solid rgba(216, 216, 216, 1);
      }
      > p {
        font-size: .24rem;
        text-align: center;
        color: #222;
      }
       .money{
         color: #E6001B;
         font-size: .32rem;
         line-height: .45rem;
       }
    }
  }

  .control {
    background: rgba(255, 255, 255, 1);
    margin-bottom: .2rem;
    .control-header {
      font-size: .32rem;
      color: #000;
      padding: .23rem .3rem;
      border-bottom: 1px solid #D9D9D9;
    }
    .control-content {
      padding: .24rem .69rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border-bottom: 1px solid #d9d9d9;
      div {
        width: 30%;
        text-align: center;
        margin-bottom: .4rem;
        img {
          display: block;
          width: .8rem;
          height: .8rem;
          margin: 0 auto;
        }
        p {
          padding-top: .16rem;
          font-size: .28rem;
          color: #222;
          line-height: .4rem;
        }
      }
    }
  }

  //备案
  .record {
    div{
      border-bottom: 1px solid #D9D9D9;
      border-top: 1px solid #D9D9D9;
      padding: .24rem .34rem;
      background: #FFF;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cell-item {
        font-size: .28rem;
        color: #222;
        line-height: .4rem;
      }
      .link{
        display:block;
        width: .2rem;
        height: .2rem;
        border-left: 1px solid #D9D9D9;
        border-bottom: 1px solid #D9D9D9;
        transform: translateY(.01rem) rotate(-135deg);
      }
    }
  }
</style>

