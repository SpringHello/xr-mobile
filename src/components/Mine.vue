<template>
  <div style="margin-bottom:1.5rem;">
    <header class="header-wrapper">
      <div>
       <img src="../assets/img/mine/avatar.png" class="avator">
       <div class="login-right">
         <router-link class="userInfo" to="home" v-if="userInfo">{{userInfo.realname}}</router-link>
         <router-link class="userInfo" to="login?from=Mine" v-else>请点击登录</router-link>
       </div>
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
        <div class="r-item">
          <div>
            <img src="../assets/img/mine/rezheng.png">
            <p>实名认证</p>
          </div>
        </div>
        <div class="s-item">
          <div>
            <img src="../assets/img/mine/shezhi.png">
            <p>安全设置</p>
          </div>
        </div>
      </div>
      <!--版块二-->
      <div>
        <div class="dd-item">
          <div>
            <img src="../assets/img/mine/dingdan.png">
            <p>订单管理</p>
          </div>
        </div>
        <div class="xf-item">
          <div>
            <img src="../assets/img/mine/xiaofei.png">
            <p>当月消费</p>
          </div>
        </div>
        <div class="fp-item">
          <div>
            <img src="../assets/img/mine/fapiao.png">
            <p>发票管理</p>
          </div>
        </div>
      </div>
      <!--版块三-->
      <div>
        <div class="xx-item" @click="$router.push('newscenter')">
          <div>
            <img src="../assets/img/mine/xiaoxi.png">
            <p>消息中心</p>
           <badge text="15"></badge>
          </div>
        </div>
      </div>
      <!--版块四-->
      <div>
        <div class="r-item">
          <div>
            <img src="../assets/img/mine/yijian.png">
            <p>意见反馈</p>
          </div>
        </div>
        <div class="s-item" @click="showHF=true">
          <div>
            <img src="../assets/img/mine/dianhua.png">
            <p>客服电话</p>
          </div>
        </div>
      </div>
      <!--版块五-->
      <div>
        <div class="xx-item">
          <div>
            <img src="../assets/img/mine/tuichu.png">
            <p>安全退出</p>
          </div>
        </div>
      </div>
    </div>

    <actionsheet v-model="showHF" :menus="menusKF" show-cancel></actionsheet>
  </div>
</template>

<script>
  import {Group, CellBox,Badge,Actionsheet} from 'vux'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {mapState} from 'vuex'
  export default {
    components: {
      Group,
      CellBox,
      Badge,
      Actionsheet
    },
    data () {
      scrollTo( 0, 0 )
      return {
        remainder: '',
        voucher: '',
        groupList: [
          [
            {title: '实名认证', img:require('../assets/img/mine/rezheng.png')},
            {title: '安全设置',img:require('../assets/img/mine/shezhi.png')}
          ],
          [
            {title: '订单管理',img:require('../assets/img/mine/dingdan.png')},
            {title: '当月消费',img:require('../assets/img/mine/xiaofei.png')}
          ],
          [
            {title: '消息中心', url: '/newscenter',img:require('../assets/img/mine/xiaoxi.png')}
          ],
          [
            {title: '意见反馈', img:require('../assets/img/mine/yijian.png')},
            {title: '客服电话', img:require('../assets/img/mine/dianhua.png')}
          ],
          [
            {title: '安全退出', img:require('../assets/img/mine/tuichu.png')}
          ],
        ],
        newsCounts:null,  // 消息个数
        showHF:false,
        menusKF: {
          menu1: '客服电话',
          menu2: '<span style="color:red">拨打 400-050-5565</span>'
        },

      }
    },
    methods: {
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.remainder = response.data.data.remainder
          this.voucher = response.data.data.voucher
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
        next(vm => vm.setData(response))
      })
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .header-wrapper {
    background-color: #081633;
    line-height: 0;
    padding-left: .48rem;
    >div{
      display: flex;
       padding: .4rem 0;
      img{
          width: 1rem;
          height: 1rem;
          display: block;
      }
      .login-right{
        line-height: .6rem;
        .userInfo {
          font-size: .24rem;
          color: #fff;
          padding-left: .32rem;
          &:after {
            content: '';
            display: inline-block;
            width: .11rem;
            height: .11rem;
            border-left: 1px solid #fff;
            border-bottom: 1px solid #fff;
            transform: translateY(-.05rem) rotate(-135deg);
            margin-left: 4.3rem;
          }
        }
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
        border-right: 1px solid rgba(216, 216, 216, 1);
      }
      > p {
        font-size: .24rem;
        text-align: center;
      }
      .money{
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


    .r-item{
      padding-top: .2rem;
      background: #FFF;
      padding-left: .3rem;
      div{
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        border-bottom: 1px solid #D9D9D9;
        img{
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p{
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .s-item{
      padding-top: .2rem;
      background: #FFF;
      border-bottom: 1px solid #D9D9D9;
      margin-bottom: .2rem;
      div{
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        padding-left: .3rem;
        img{
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p{
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .dd-item{
      padding-top: .2rem;
      background: #FFF;
      padding-left: .3rem;
      div{
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        border-bottom: 1px solid #D9D9D9;
        img{
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p{
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .xf-item{
      padding-top: .2rem;
      background: #FFF;
      padding-left: .3rem;
      div{
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        border-bottom: 1px solid #D9D9D9;
        img{
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p{
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .fp-item{
      padding-top: .2rem;
      background: #FFF;
      border-bottom: 1px solid #D9D9D9;
      margin-bottom: .2rem;
      div{
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        padding-left: .3rem;
        img{
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p{
          font-size: .28rem;
          color: #222;
        }

      }
    }
    .xx-item{
      padding-top: .2rem;
      background: #FFF;
      border-bottom: 1px solid #D9D9D9;
      margin-bottom: .2rem;
      div{
        display: flex;
        align-items: center;
        padding-bottom: .2rem;
        padding-left: .3rem;
        img{
          width: .48rem;
          display: block;
          margin-right: .24rem;
        }
        p{
          font-size: .28rem;
          color: #222;
          padding-right: 3rem;
        }

      }
    }
  }
</style>
