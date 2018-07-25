<template>
  <div id="mine">
    <router-link :to="userInfo?'account':'login'">
      <header class="header-wrapper">
        <div>
          <div class="login-left">
            <img src="../assets/img/mine/avatar.png" class="avator">
            <span class="userInfo" v-if="userInfo">{{userInfo.realname}}</span>
            <span class="userInfo" v-else>请点击登录</span>
          </div>
          <p class="login-right"></p>
        </div>
      </header>
    </router-link>
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
    <div class="group">
      <!--<group v-for="(cellList,index) in groupList" :key="index">-->
      <!--<cell-box v-for="(cell,i) in cellList" :key="i" is-link :link="cell.url">-->
      <!--<div class="cell">-->
      <!--<img :src="cell.img">-->
      <!--<div>-->
      <!--<p style="font-size: .24rem;padding-right: 3rem"><label>{{cell.title}}</label></p>-->
      <!--</div>-->
      <!--<badge text="15" v-if="cell.title=='消息中心'"></badge>-->
      <!--</div>-->
      <!--</cell-box>-->
      <!--</group>-->

      <!--版块一-->
      <div>
        <div class="r-item" @click="approve">
          <div>
            <img src="../assets/img/mine/rezheng.png">
            <p>实名认证</p>
          </div>
        </div>
        <div class="s-item" @click="setUP">
          <div>
            <img src="../assets/img/mine/shezhi.png">
            <p>安全设置</p>
          </div>
        </div>
      </div>
      <!--版块二-->
      <div>
        <div class="dd-item" @click="orders">
          <div>
            <img src="../assets/img/mine/dingdan.png">
            <p>订单管理</p>
          </div>
        </div>
        <div class="xf-item" @click="onOpen">
          <div>
            <img src="../assets/img/mine/xiaofei.png">
            <p>当月消费</p>
          </div>
        </div>
        <div class="fp-item" @click="invoice">
          <div>
            <img src="../assets/img/mine/fapiao.png">
            <p>发票管理</p>
          </div>
        </div>
      </div>
      <!--版块三-->
      <div>
        <div class="xx-item" @click="XXclick">
          <div>
            <img src="../assets/img/mine/xiaoxi.png">
            <p>消息中心</p>
            <badge :text='nums' v-if="$store.state.userInfo && nums>0"></badge>
          </div>
        </div>
      </div>
      <!--版块四-->
      <div>
        <div class="r-item" @click="onOpen">
          <div>
            <img src="../assets/img/mine/yijian.png">
            <p>意见反馈</p>
          </div>
        </div>
        <div class="s-item" @click="showKF=true">
          <div>
            <img src="../assets/img/mine/dianhua.png">
            <p>客服电话</p>
          </div>
        </div>
      </div>
      <!--版块五-->
      <div v-if="$store.state.userInfo">
        <div class="xx-item" @click="showTC=true">
          <div>
            <img src="../assets/img/mine/tuichu.png">
            <p>安全退出</p>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 1.2rem;"></div>
    <actionsheet v-model="showKF" :menus="menusKF" show-cancel :close-on-clicking-mask="false"></actionsheet>
    <actionsheet v-model="showTC" :menus="menusTC" show-cancel :close-on-clicking-mask="false"
                 @on-click-menu="clickExit"></actionsheet>

    <toast v-model="show" type="text" is-show-mask text="暂未开放" position="middle" width="25%"></toast>
  </div>
</template>

<script>
  import {Group, CellBox, Badge, Actionsheet, Toast} from 'vux'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {mapState} from 'vuex'
  export default {
    components: {
      Group,
      CellBox,
      Badge,
      Actionsheet,
      Toast
    },
    data () {
      window.scrollTo(0, 0);
      return {
        //认证信息
        authInfo: $store.state.authInfo,
        //未开放
        show: false,
        remainder: '',
        voucher: '',
        groupList: [
          [
            {title: '实名认证', img: require('../assets/img/mine/rezheng.png')},
            {title: '安全设置', img: require('../assets/img/mine/shezhi.png')}
          ],
          [
            {title: '订单管理', img: require('../assets/img/mine/dingdan.png')},
            {title: '当月消费', img: require('../assets/img/mine/xiaofei.png')}
          ],
          [
            {title: '消息中心', url: '/newscenter', img: require('../assets/img/mine/xiaoxi.png')}
          ],
          [
            {title: '意见反馈', img: require('../assets/img/mine/yijian.png')},
            {title: '客服电话', img: require('../assets/img/mine/dianhua.png')}
          ],
          [
            {title: '安全退出', img: require('../assets/img/mine/tuichu.png')}
          ],
        ],
        nums: '',  // 消息个数
        //客服电话
        showKF: false,
        menusKF: {
          menu1: '<span style="color:red">热线 400-050-5565</span>',
        },
        //退出
        showTC: false,
        menusTC: {
          menu1: '<span style="color:red">退出当前帐号</span>',
        },

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
          this.nums = response.data.noReadTotal
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
      //实名认证
      approve(){
        if ($store.state.userInfo) {
          if ($store.state.authInfo) {
            this.$router.push('CertficaOK')
          } else {
            this.$router.push('certification')
          }

        } else {
          this.$router.push('login')
        }
      },
      //安全设置
      setUP(){
        if ($store.state.userInfo) {
          this.$router.push('setting')
        } else {
          this.$router.push('login')
        }
      },
      //发票管理
      invoice(){
        if ($store.state.userInfo) {
          this.$router.push('invoice')
        } else {
          this.$router.push('login')
        }
      },
      //当月消费
      expense(){
        if ($store.state.userInfo) {
          this.$router.push('expense')
        } else {
          this.$router.push('login')
        }
      },
      //订单管理
      orders(){
        if ($store.state.userInfo) {
          this.$router.push('orders')
        } else {
          this.$router.push('login')
        }
      },
      //意见反馈
      feedback(){
        if ($store.state.userInfo) {
          this.$router.push('feedback')
        } else {
          this.$router.push('login')
        }
      },
      //消息中心
      XXclick(){
        if ($store.state.userInfo) {
          this.$router.push('newscenter')
        } else {
          this.$router.push('login')
        }
      },
      //退出账号
      clickExit(key){
        if (key != 'cancel') {
          axios.get('user/logout.do').then(response => {
            $store.commit('setAuthInfo', {authInfo: null, userInfo: null})
            this.$router.push('login')
          })
        }
      },
      //暂未开放
      onOpen(){
        if ($store.state.userInfo) {
          this.show = true
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
      var device = axios.post('device/DescribeWalletsBalance.do', {
        zoneId: $store.state.zone.zoneid
      })
      var newcounts = axios.post('user/getEventNotifyList.do', {
        isRead: '2',
        zoneId: $store.state.zone.zoneid,
        page: 1,
        rows: 15
      })

      Promise.all([device, newcounts]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .header-wrapper {
    background-color: #081633;
    line-height: 0;
    padding-left: .48rem;
    padding-right: .3rem;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .4rem 0;
      .login-left {
        display: flex;
        align-items: center;
        img {
          width: 1rem;
          height: 1rem;
          display: block;
        }
        .userInfo {
          font-size: .36rem;
          color: #fff;
          padding-left: .32rem;

        }
      }
      p {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        transform: translateY(-.05rem) rotate(-135deg);
      }
    }
  }

  .accountInfo {
    display: flex;
    background-color: #fff;
    margin-bottom: .24rem;
    padding: .24rem 0;
    > div {
      width: 50%;
      color: #222;
      &:first-of-type {
        border-right: 1px solid #e7e7e7;
      }
      > p {
        font-size: .24rem;
        text-align: center;
      }
      .money {
        font-size: .32rem;
        color: #E6001B;
      }
    }
  }

  .group {
    /*.cell {*/
    /*display: flex;*/
    /*align-items: center;*/
    /*img {*/
    /*width: .48rem;*/
    /*display: block;*/
    /*margin-right:.24rem*/
    /*}*/
    /*}*/
    > div {
      & {
        border-top: 1px solid #e7e7e7;
      }
      p {
        &::after {
          content: '';
          display: inline-block;
          width: .14rem;
          height: .14rem;
          border-left: 1px solid #C7C7CC;
          border-bottom: 1px solid #C7C7CC;
          transform: translateY(.165rem) rotate(-135deg);
          position: absolute;
          right: .4rem;
        }
      }
    }
    .r-item {
      padding-top: .2rem;
      background: #FFF;
      padding-left: .3rem;
      div {
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        border-bottom: 1px solid #e7e7e7;
        img {
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p {
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .s-item {
      padding-top: .2rem;
      background: #FFF;
      border-bottom: 1px solid #e7e7e7;
      margin-bottom: .2rem;
      div {
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        padding-left: .3rem;
        img {
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p {
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .dd-item {
      padding-top: .2rem;
      background: #FFF;
      padding-left: .3rem;
      div {
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        border-bottom: 1px solid #e7e7e7;
        img {
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p {
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .xf-item {
      padding-top: .2rem;
      background: #FFF;
      padding-left: .3rem;
      div {
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        border-bottom: 1px solid #e7e7e7;
        img {
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p {
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .fp-item {
      padding-top: .2rem;
      background: #FFF;
      border-bottom: 1px solid #e7e7e7;
      margin-bottom: .2rem;
      div {
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        padding-left: .3rem;
        img {
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p {
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .xx-item {
      padding-top: .2rem;
      background: #FFF;
      border-bottom: 1px solid #e7e7e7;
      margin-bottom: .2rem;
      div {
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        padding-left: .3rem;
        img {
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p {
          font-size: .28rem;
          color: #222;
          padding-right: 3.5rem;
        }

      }
    }
  }
</style>
