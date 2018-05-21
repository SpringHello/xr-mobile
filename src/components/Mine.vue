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
    <div class="group">
      <group v-for="(cellList,index) in groupList" :key="index">
        <cell-box v-for="(cell,i) in cellList" :key="i" is-link :link="cell.url">
          <div class="cell">
            <div>
              <img src="">
            </div>
            <div>
              <p style="font-size: .7rem"><label>{{cell.title}}</label></p>
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
            {title: '消息中心', url: '/home'}
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

  .group {
    .cell {
      display: flex;
      align-items: center;
      img {
        width: 1.5rem;
        height: 1.5rem;
        background-color: #00aaff;
        display: block;
        margin-right: .5rem
      }
    }
  }
</style>
