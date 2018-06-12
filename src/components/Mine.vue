<template>
  <div style="margin-bottom:1.5rem;">
    <header class="header-wrapper">
      <div>
       <img src="" class="avator">
       <div class="login-right">
         <router-link class="userInfo" to="home" v-if="userInfo">{{userInfo.realname}}</router-link>
         <router-link class="userInfo" to="login?from=Mine" v-else>请点击登录</router-link>
       </div>
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
    <div class="group">
      <group v-for="(cellList,index) in groupList" :key="index">
        <cell-box v-for="(cell,i) in cellList" :key="i" is-link :link="cell.url">
          <div class="cell">
            <img src="">
            <div>
              <p style="font-size: .24rem"><label>{{cell.title}}</label></p>
            </div>
          </div>
        </cell-box>
      </group>
    </div>
  </div>
</template>

<script>
  import {Group, CellBox} from 'vux'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {mapState} from 'vuex'
  export default {
    components: {
      Group,
      CellBox
    },
    data () {
      scrollTo( 0, 0 )
      return {
        remainder: '',
        voucher: '',
        groupList: [
          [
            {title: '实名认证', url: '/home'},
            {title: '安全设置', url: '/home'}
          ],
          [
            {title: '订单管理', url: '/home'},
            {title: '当月消费', url: '/home'}
          ],
          [
            {title: '消息中心', url: '/newscenter'}
          ],
          [
            {title: '意见反馈', url: '/home'},
            {title: '客服电话', url: '/home'}
          ]
        ]
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
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .header-wrapper {
    background-color: #626262;
    line-height: 0;
    padding-left: .48rem;
    >div{
      display: flex;
       padding: .4rem 0;
      img{
          width: .8rem;
          height: .8rem;
          display: block;
      }
      .login-right{
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
            transform: translateY(-5%) rotate(-135deg);
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
    }
  }

  .group {
    .cell {
      display: flex;
      align-items: center;
      img {
        width: .64rem;
        height: .64rem;
        display: block;
        margin-right:.24rem
      }
    }
  }
</style>
