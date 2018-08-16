<template>
  <div id="account">
    <x-header>账户余额</x-header>
    <header class="header-wrapper">
      <div>
        <p class="money">¥{{remainder}}</p>
        <p>账户可用余额</p>
      </div>
      <p>
        <x-button mini type="primary" link="Charge">充值</x-button>
      </p>
    </header>
    <Group>
      <cell-box v-for="(cell,i) in cellList" :key="i" is-link :link="cell.url">
        <div class="cell">
          <img :src="cell.img">
          <div>
            <p style="font-size: .32rem;"><label>{{cell.title}}</label></p>
          </div>
        </div>
      </cell-box>
    </Group>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, XHeader, XButton, CellBox} from 'vux'
  export default{
    components: {
      Group,
      XHeader,
      XButton,
      CellBox
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    data(){
      window.scrollTo(0, 0);
      return {
        remainder: sessionStorage.getItem('money'),
        cellList: [
          {img: require('../../assets/img/account/money.png'), title: '充值中心', url: 'Charge'},
          {img: require('../../assets/img/account/chagre.png'), title: '代金券', url: 'vouchers'}
        ],
      }
    },
    methods: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .header-wrapper {
    background: url(../../assets/img/console/Mask@2x.png) no-repeat center;
    background-size: cover;
    padding: .6rem .6rem .89rem .5rem;
    color: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: .24rem;
      color: rgba(255, 255, 255, 1);
      line-height: .33rem;
    }
    .money {
      font-size: .56rem;
      line-height: .78rem;
    }
    .weui-btn_primary {
      background: #4A90E2;
    }
    .weui-btn_primary:active {
      background: #4A90E2;
    }
  }

  .cell {
    display: flex;
    align-items: center;
    img {
      width: .48rem;
      display: block;
      margin-right: .4rem
    }
  }
</style>
