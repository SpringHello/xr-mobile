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
        <ul>
          <li @click="push(resources)">
            <div class="soures">
              <img src="">
              <div>
                <p class="soures-title">{{resources.itemName}}</p>
                <span class="soures-desc">{{$store.state.zone.zonename + ' '+'数量：'+resources.used}}</span>
              </div>
            </div>
            <p class="check">查看详情</p>
          </li>
          <li @click="push(disks)">
            <div class="soures">
              <img src="">
              <div>
                <p class="soures-title">{{disks.itemName}}</p>
                <span class="soures-desc">{{$store.state.zone.zonename + ' '+'数量：'+disks.used}}</span>
              </div>
            </div>
            <p class="check">查看详情</p>
          </li>
          <li @click="push(ip)">
            <div class="soures">
              <img src="">
              <div>
                <p class="soures-title">{{ip.itemName}}</p>
                <span class="soures-desc">{{$store.state.zone.zonename + ' '+'数量：'+ip.used}}</span>
              </div>
            </div>
            <p class="check">查看详情</p>
          </li>
          <li @click="push(balance)">
            <div class="soures">
              <img src="">
              <div>
                <p class="soures-title">{{balance.itemName}}</p>
                <span class="soures-desc">{{$store.state.zone.zonename + ' '+'数量：'+balance.used}}</span>
              </div>
            </div>
            <p class="check">查看详情</p>
          </li>
        </ul>
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
        resources: {},//云服务器
        disks: {},//云硬盘
        ip: {},//弹性IP
        balance: {},//负载均衡
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
      //查看详情
      push(item){
        this.$router.push(item.url)
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
      padding: .5rem;
      font-size: .8rem;
      font-weight: normal;
      color: #000;
      border-bottom: 1px solid #e7e7e7;
    }
    ul {
      padding: .5rem;
      li {
        padding: .5rem 0;
        border-bottom: 1px solid #e7e7e7;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .soures {
          display: flex;
          img {
            width: 2.5rem;
            height: 2.5rem;
            margin-right: .5rem;
            background: #00aaff;
            vertical-align: middle;
          }
          > div {
            font-size: .7rem;
            .soures-title {
              color: rgba(34, 34, 34, 1);
            }
            .soures-desc {
              color: rgba(153, 153, 153, 1);
              line-height: 1.5rem;
            }
          }
        }
        .check {
          color: rgba(102, 102, 102, 1);
          font-size: .7rem;
          &::after {
            content: '';
            width: 10px;
            height: 10px;
            border-right: 1px solid #999999;
            border-bottom: 1px solid #999999;
            transform: translateY(.0rem) rotate(311deg);
            display: inline-block;
            margin-left: .3rem;
          }
        }
      }
    }
  }

</style>

