<template>
  <div id="pay">
    <x-header>选择支付方式</x-header>
    <div class="countdown">
      <p>下单后请24小时之内完成付款 超时未付款订单将被自动取消</p>
    </div>
    <Group>
      <cell title="应付金额：" :value='value' value-align="left"></cell>
      <x-switch :title="title" @on-change="showYE" v-model="remaining"></x-switch>
    </Group>

    <Group class="three">
      <p>第三方支付渠道</p>
      <radio :options="radios" @on-change="print" :disabled="disabled">
        <template slot-scope="props" slot="each-item">
          <img src="../../assets/img/back/zfb.png" class="vux-radio-icon" v-show="props.label=='支付宝支付'">
          <img src="../../assets/img/back/wx.png" class="vux-radio-icon" v-show="props.label=='微信支付'">
          {{ props.label }}
        </template>
      </radio>
    </Group>

    <div class="btn">
      <button @click="pay">确认支付</button>
    </div>
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
        vm.remainder = '¥' + vm.payData.remainder
        vm.value = '¥' + vm.payData.money
      })
    },
    data (){
      let userAgent = navigator.userAgent.toLowerCase()
      let radios = ['支付宝支付', '微信支付']
      if (userAgent.match(/MicroMessenger/i) == 'micromessenger') {
        radios = ['微信支付']
      }
      return {
        payData: {},
        value: '',
        remainder: '',
        remaining: true,
        //第三方支付
        radios,
        disabled: true,
        radioValue: '',
        //购买title跳转到资源列表
        resorceList: sessionStorage.getItem('titleName') == 'host' ? 'bhost' : sessionStorage.getItem('titleName') == 'disk' ? 'bdisk' : 'belasticip',
      }
    },
    methods: {
      //显示余额
      showYE(value){
        if (value) {
          this.remainder = '￥' + this.payData.remainder
        } else {
          this.remainder = '￥  0.00'
        }
      },

      print(value){
        this.radioValue = value
      },
      //支付
      pay(){
        if (this.disabled) {
          axios.get('information/payOrder.do', {
            params: {
              order: this.payData.order,
              ticket: this.payData.ticket,
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push('payresult')
              sessionStorage.setItem('status', (response.data.status).toString())
              sessionStorage.setItem('resorceList', this.resorceList)
            } else {
              this.$router.push('payresult')
              sessionStorage.setItem('status', (response.data.status).toString())
            }
          })
        } else {
          switch (this.radioValue) {
            case '支付宝支付':
              window.open(`zfb/appzf.do?total_fee=${this.payData.money}&orders=${this.payData.order}&ticket=${this.payData.ticket}`)
              break;
            case '微信支付':
              let params = {
                total_fee: this.payData.money,
                type: 'JSAPI',
                code: sessionStorage.getItem('wx-code'),
                orders: this.payData.order,
                ticket: this.payData.ticket
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
          }

        }

      },
    },
    computed: {
      title(){
        let cost = this.remaining ? this.remainder : '¥0.0'
        return `<span>账户余额：</span><span style="color: #E6001B;">${cost}</span>`
      }
    },
    watch: {
      remaining(){
        if (this.remaining) {
          if (this.payData.remainder >= this.payData.money) {
            this.disabled = true
          }
        } else {
          this.disabled = false
        }
      },
    }
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
        border-bottom: 1px solid #e7e7e7;
        font-size: .28rem;
        color: rgba(102, 102, 102, 1);
        line-height: .4rem;
      }
    }

    .btn {
      button {
        position: absolute;
        bottom: 0;
        background: rgba(219, 66, 50, 1);
        width: 100%;
        padding: .25rem 0;
        outline: none;
        border: none;
        font-size: .36rem;
        color: rgba(255, 255, 255, 1);
        line-height: .5rem;
      }
    }
  }
</style>
