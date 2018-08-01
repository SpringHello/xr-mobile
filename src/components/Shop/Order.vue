<template>
  <div id="pay">
    <x-header>选择支付方式</x-header>
    <div class="countdown">
      <p>{{date}}</p>
      <p>下单后请24小时之内完成付款 超时未付款订单将被自动取消</p>
    </div>
    <Group>
      <cell title="应付金额：" :value='value' value-align="left"></cell>
      <x-switch title="账户余额" @on-change="showYE" v-model="remaining"></x-switch>
      <cell title="账户余额：" :value='remainder' value-align="left"></cell>
    </Group>

    <Group class="three">
      <p>第三方支付渠道</p>
      <radio :options="radios" @on-change=""></radio>
    </Group>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import {XHeader, XSwitch, Group, Cell, Radio} from 'vux'
  export default{
    components: {
      XHeader,
      XSwitch,
      Group,
      Cell,
      Radio
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.payData = JSON.parse(sessionStorage.getItem('payData'))
        vm.remainder = '￥' + vm.payData.remainder
        vm.value = '￥' + vm.payData.money
        vm.date = new Date().getTime()

      })
    },
    data (){
      return {
        payData: {},
        date: 0,
        value: '',
        remainder: '',
        remaining: true,
        //第三方支付
        radios: [
          {icon: '', key: 'zfb', value: '支付宝'},
          {icon: '', key: 'wx', value: '微信支付'},
        ]

      }
    },
    methods: {
      showYE(value){
        if (value) {
          this.remainder = '￥' + this.payData.remainder
        } else {
          this.remainder = '￥  0.00'
        }
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #pay {
    background: rgba(242, 242, 242, 1);
    .countdown {
      width: 50%;
      margin: 0 auto;
      padding: .78rem 0;
      p {
        font-size: .28rem;
        color: rgba(102, 102, 102, 1);
        line-height: .4rem;
      }
    }
    .three {
      background: rgba(255, 255, 255, 0.7);
      p {
        padding: .2rem .3rem;
        border-bottom: 1px solid #D9D9D9;
        font-size: .28rem;
        color: rgba(102, 102, 102, 1);
        line-height: .4rem;
      }
    }
  }
</style>
