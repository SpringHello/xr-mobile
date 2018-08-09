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
      window.scrollTo(0, 0);
      return {
        chargeType: [
          {name: '微信支付', value: 'wxpay'},
          {name: '支付宝', value: 'alipay'},
        ],
        charge: [],
        money: 10,
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
            let params = {
              total_fee: this.money,
              type: 'JSAPI',
              code: sessionStorage.getItem('wx-code'),
            }
            if (sessionStorage.getItem('wx-openid')) {
              params.openid = sessionStorage.getItem('wx-openid')
            }
            axios.get('wx/wxpayapi.do', {
              params
            }).then(response => {
              sessionStorage.setItem('wx-openid', response.data.result.openid)
              let onBridgeReady = () => {
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId": response.data.result.appid,     //公众号名称，由商户传入
                    "timeStamp": response.data.result.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr": response.data.result.nonce_str, //随机串
                    "package": `prepay_id=${response.data.result.prepay_id}`,
                    "signType": "MD5",         //微信签名方式：
                    "paySign": response.data.result.sign //微信签名
                  },
                  (res) => {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      //使用以上方式判断前端返回,微信团队郑重提示：
                      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                      this.$router.push('payresult')
                      sessionStorage.setItem('status', '1')
                      sessionStorage.setItem('resorceList', this.resorceList)
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                      this.$router.push('payresult')
                      sessionStorage.setItem('status', '0')
                      sessionStorage.setItem('resorceList', this.resorceList)
                    }
                  }
                );
              }

              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              } else {
                onBridgeReady();
              }
            })
            break;
          case 'alipay':
            window.open(`https://pan.xrcloud.net/ruicloud/zfb/appzf.do?total_fee=${this.money}`)
            break;
        }

      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
