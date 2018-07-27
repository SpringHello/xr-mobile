<template>
  <div style="background:rgba(243,243,243,1);">
    <header class="header-wrapper">
      <p>控制台</p>
      <div style="display: flex">
        <router-link class="userInfo" to="home">
          <div>
            <span v-if="userInfo">{{alarm}}</span>
            <span v-else>0</span>
            <span>告警</span>
          </div>
        </router-link>
        <router-link class="userInfo" :to="$store.state.userInfo?'workorder':'login'">
          <div>
            <span v-if="userInfo">{{work}}</span>
            <span v-else>0</span>
            <span>工单</span>
          </div>
        </router-link>
        <router-link class="userInfo" to="home">
          <div>
            <span v-if="userInfo">{{renewal}}</span>
            <span v-else>0</span>
            <span>待续费</span>
          </div>
        </router-link>
      </div>
    </header>
    <div class="accountInfo">
      <div @click="account">
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

    <div style="height: 1rem;"></div>
    <toast v-model="showPositionValue" type="text" is-show-mask text="暂未开放" position="middle" width="25%"></toast>
  </div>
</template>

<script>
  import {Swiper, XButton, Tab, TabItem, Grid, GridItem, Group, Cell, CellBox, Toast} from 'vux'
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
      CellBox,
      Toast
    },
    beforeRouteEnter(to, from, next){
      let wall = axios.post('device/DescribeWalletsBalance.do', {
        zoneId: $store.state.zone.zoneid
      })
      let account = axios.get('user/userAccountInfo.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      })
      Promise.all([wall, account]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
    data () {
      window.scrollTo(0, 0);
      return {
        type: '',
        remainder: '',
        voucher: '',
        work: '',
        alarm: 0,
        renewal: '',
        controls: [
          {img: require('../assets/img/console/yunfuwu.png'), title: '云服务器', url: '/ruicloud/bhost'},
          {img: require('../assets/img/console/yunyipan.png'), title: '云硬盘', url: '/ruicloud/bdisk'},
          {img: require('../assets/img/console/tanip.png'), title: '弹性IP', url: '/ruicloud/belasticip'},
          {img: require('../assets/img/console/fuzaijunh.png'), title: '负载均衡', url: ''},
          {img: require('../assets/img/console/jingxiang.png'), title: '镜像服务', url: ''},
          {img: require('../assets/img/console/nat.png'), title: 'NAT网关', url: ''},
        ],
        showPositionValue: false,
      }
    },
    methods: {
      setData(values){
        if (values[0].status == 200 && values[0].data.status == 1) {
          this.remainder = values[0].data.data.remainder
          this.voucher = values[0].data.data.voucher
        }
        if (values[1].status == 200 && values[1].data.status == 1) {
          this.work = values[1].data.result[1].items[0].value
          this.renewal = values[1].data.result[1].items[2].value
          values[1].data.result[2].items.forEach(item => {
            this.alarm += parseInt(item.value)
          })
        }
      },
      conPush(item){
        if ($store.state.userInfo) {
          if (item.url != '') {
            this.$router.push({path: item.url})
          }
          else {
            this.showPositionValue = true
          }
        } else {
          this.$router.push('login')
        }
      },
      //账户余额
      account(){
        if ($store.state.userInfo) {
          sessionStorage.setItem('money', this.remainder)
          this.$router.push('account')
        } else {
          this.$router.push('login')
        }
      },
      //备案
//      toRecord(){
//          if($store.state.userInfo){
//              this.$router.push('records')
//          }else{
//            this.$router.push('login')
//          }
//      }

    },
    computed: mapState([
      // 映射 this.count 为 store.state.count
      'userInfo'
    ])
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
          &:first-of-type {
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
        border-right: 1px solid #e7e7e7;
      }
      > p {
        font-size: .24rem;
        text-align: center;
        color: #222;
      }
      .money {
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
      border-bottom: 1px solid #e7e7e7;
    }
    .control-content {
      padding: .24rem .69rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border-bottom: 1px solid #e7e7e7;
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
  /*.record {*/
  /*div{*/
  /*border-bottom: 1px solid #D9D9D9;*/
  /*border-top: 1px solid #D9D9D9;*/
  /*padding: .24rem .34rem;*/
  /*background: #FFF;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
  /*.cell-item {*/
  /*font-size: .28rem;*/
  /*color: #222;*/
  /*line-height: .4rem;*/
  /*}*/
  /*.link{*/
  /*display:block;*/
  /*width: .2rem;*/
  /*height: .2rem;*/
  /*border-left: 1px solid #D9D9D9;*/
  /*border-bottom: 1px solid #D9D9D9;*/
  /*transform: translateY(.01rem) rotate(-135deg);*/
  /*}*/
  /*}*/
  /*}*/
</style>

