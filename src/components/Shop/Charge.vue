<template>
  <div id="charges">
    <x-header>充值中心</x-header>
    <Group>
      <x-input title="充值金额" placeholder="请输入充值金额" type="number" @on-blur="NumberReg" v-model="money"></x-input>
      <popup-picker title="支付方式" :data="chargeType" v-model="charge" placeholder="请选择支付方式" :columns="3"
                    show-name></popup-picker>
    </group>
    </Group>

    <div style="padding: .8rem .3rem 0 .3rem;">
      <x-button type="primary" @click.native="CHARGE">充值</x-button>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {XHeader, Group, XInput, PopupPicker, XButton} from 'vux'
  export default{
    components: {
      XHeader,
      Group,
      XInput,
      PopupPicker,
      XButton
    },
    data (){
      return {
        chargeType: [
          {name: '微信支付', value: 'wxpay'},
          {name: '支付宝', value: 'alipay'},
        ],
        charge: [],
        money: 10,
        type: '',
      }
    },
    methods: {
      NumberReg(val){
        if (val < 10) {
          this.$vux.toast.text('最小金额为10', 'middle')
        }
      },
      //充值
      CHARGE(){
        if (this.money < 10) {
          this.$vux.toast.text('最小金额为10', 'middle')
          return
        }
        if (this.charge[0] == null) {
          this.$vux.toast.text('请选择支付方式', 'middle')
          return
        }
        switch (this.charge[0]) {
          case 'wxpay':
            this.type = 'wxpay'
            break;
          case 'alipay':
            this.type = 'alipay'
            break;
        }
        console.log(this.type)
        axios.get(``, {}).then()
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
