<template>
  <div>
    <x-header>发票申请</x-header>

    <div class="top">
      <img src="../../assets/img/back/yjfk.png">
      <div>
        <p>1.您选择的发票金额不能小于10000元，请累计之后一并申请。</p>
        <p>2.发票寄出时间：每月20号统一寄出，15号之前申请的发票将在当月20号寄出，15号之后申请的发票将在次月20号寄出。</p>
      </div>
    </div>

    <div>
      <group title="发票类型">
        <radio :options="Invoices" v-model="value"></radio>
      </group>
    </div>


    <div v-if="value=='增值税普通发票'">
      <p class="money">实际可开发票金额：<span>¥{{invoice}}</span></p>
      <group label-width="6em" label-align="right" label-margin-right=".45rem">
        <x-input title="开票金额" placeholder="请输入开票金额" v-model="Froms.pmoney" required ref="from1"></x-input>
        <x-input title="发票抬头" placeholder="请输入发票抬头" v-model="Froms.ptitle" required ref="from1"></x-input>
        <x-input title="纳税人识别码" placeholder="请输入纳税人识别码" v-model="Froms.code" required ref="from1"></x-input>
        <x-input title="收件地址" placeholder="请输入收货地址" v-model="Froms.paddress" required ref="from1"></x-input>
        <x-input title="收件人" placeholder="请输入收件人名字" v-model="Froms.pname" required ref="from1"></x-input>
        <x-input title="联系电话" placeholder="请输入联系电话" v-model="Froms.pphone" required ref="from1"></x-input>
      </group>


      <div class="btn">
        <x-button type="primary" @click.native="invoiceMake">确认开票</x-button>
      </div>

    </div>

    <div v-else class="middle">
      <p class="money">实际可开发票金额：<span>¥{{invoice}}</span></p>
      <group>
        <x-input title="开票金额" placeholder="请输入开票金额" v-model="Froms.pmoney" required ref="from2"></x-input>
        <x-input title="发票抬头" placeholder="请输入发票抬头" v-model="Froms.ptitle" required ref="from2"></x-input>
      </group>
      <Group v-if='details!=null'>
        <cell title="发票信息"></cell>
        <Group label-width="6em" label-align="right" label-margin-right=".45rem" class="details">
          <cell title="单位名称" value-align="left" :value="details.companyname"></cell>
          <cell title="注册地址" value-align="left" :value="details.address"></cell>
          <cell title="注册电话" value-align="left" :value="details.phone"></cell>
          <cell title="纳税人识别码" value-align="left" :value="details.identicode"></cell>
          <cell title="开户银行" value-align="left" :value="details.bankname"></cell>
          <cell title="银行账户" value-align="left" :value="details.banknum"></cell>
        </Group>
      </Group>
      <p v-else class="ticket">您需要通过增票资质认证才能开具增值税专用
        <router-link to="ticketVali">点击认证></router-link>
      </p>

      <group>
        <x-input title="收件地址" placeholder="请输入收货地址" v-model="Froms.paddress" required ref="from2"></x-input>
        <x-input title="收件人" placeholder="请输入收件人名字" v-model="Froms.pname" required ref="from2"></x-input>
        <x-input title="联系电话" placeholder="请输入联系电话" v-model="Froms.pphone" required ref="from2"></x-input>
      </group>

      <div class="btn">
        <x-button type="primary" @click.native="invoiceMake"  :disabled="details==null">确认开票</x-button>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, XInput, Radio, XButton} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      XInput,
      Radio,
      XButton
    },
    beforeRouteEnter(to, from, next){
      var detail = axios.get('user/getExamine.do', {
        zoneId: $store.state.zone.zoneid
      })
      var invoice = axios.get('user/invoiceLimit.do')
      Promise.all([detail, invoice]).then(values => {
        next(vm => {
          vm.setData(values)
        })
      })
    },
    data (){
      return {
        details: null,
        //发票类型
        Invoices: ['增值税普通发票', '增值税专用发票'],
        value: '增值税普通发票',
        invoice: '',//实际可开票金额
        //开票表单
        Froms: {
          pmoney: '',
          ptitle: '',
          pcode: '',
          paddress: '',
          pname: '',
          pphone: ''
        }
      }
    },
    methods: {
      //获取数据
      setData(values){
        var response = values[0]
        if (response.status == 200 && response.data.status == 1) {
          this.details = response.data.result.result
        }
        var response = values[1]
        if (response.status == 200 && response.data.status == 1) {
          this.invoice = response.data.result.result
        }
      },
      //确认开票
      invoiceMake(){
        if (this.Froms.pmoney > this.invoice || this.Froms.pmoney < 1000) {
          this.$vux.toast.text('开票金额不能少于1000或者多于实际可开金额', 'middle')
        }
        if (this.value == '增值税普通发票') {
          if (this.$refs.from1.valid) {
            axios.post('user/applyInvoice.do', {
              amount: this.Froms.pmoney,//开票金额
              type: 0,//发票类型
              title: this.Froms.ptitle,//发票抬头
              recipients: this.Froms.pname, //收件人
              address: this.Froms.paddress,//收件地址,
              phone: this.Froms.pphone,//电话
            }).then(response => {
              if (response.status == 2 && response.data.status == 1) {
                this.$router.push('invoice')
                this.$vux.toast.text(response.data.message, 'middle')
              } else {
                this.$vux.toast.text(response.data.message, 'middle')
              }
            })
          }

        }
        if (this.value == '增值税专用发票') {
          if (this.$refs.from2.valid) {
            axios.post('user/applyInvoice.do', {
              amount: this.Froms.pmoney,//开票金额
              type: 1,//发票类型
              title: this.Froms.ptitle,//发票抬头
              recipients: this.Froms.pname, //收件人
              address: this.Froms.paddress,//收件地址,
              phone: this.Froms.pphone,//电话
            }).then(response => {
              if (response.status == 2 && response.data.status == 1) {
                this.$router.push('invoice')
                this.$vux.toast.text(response.data.message, 'middle')
              } else {
                this.$vux.toast.text(response.data.message, 'middle')
              }
            })
          }
        }

      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .top {
    display: flex;
    padding: .24rem 0;
    background: #F7FBFF;
    > div {
      p {
        font-size: .24rem;
        color: rgba(125, 161, 217, 1);
        line-height: .36rem;
      }
    }
    img {
      width: .32rem;
      height: .32rem;
      margin: 0 .16rem;
    }
  }

  .money {
    padding: .15rem .3rem 0 .31rem;
    font-size: .26rem;
    color: rgba(178, 178, 178, 1);
    line-height: .33rem;
    span {
      color: #E6001B;
    }
  }

  .middle {
    .ticket {
      padding: .15rem .3rem 0 .31rem;
      font-size: .26rem;
      color: rgba(178, 178, 178, 1);
      line-height: .33rem;
      a {
        float: right;
        color: rgba(74, 144, 226, 1);
      }
    }
  }

  .btn {
    padding: 1.5rem .3rem;
    .weui-btn_primary{
      background: #4A90E2;
    }
    .weui-btn_primary:active{
      background: #4A90E2;
    }
  }
</style>
