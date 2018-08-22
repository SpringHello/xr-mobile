<template>
  <div id="invoice">
    <x-header>增票资质认证</x-header>

    <div class="top">
      <img src="../../assets/img/back/yjfk.png">
      <div>
        <p>我们会在一个工作日内审核完成 </p>
        <p>1、注意有效增值税发票开票资质仅为一个</p>
        <p>2、发票常见问题查看增票资质帮助</p>
      </div>
    </div>

    <div class="middle">
      <Group label-width="6em" label-align="right" label-margin-right=".45rem">
        <x-input title="单位名称" placeholder="请输入单位名称" required v-model="form.title" ref="forms"></x-input>
        <x-input title="注册地址" placeholder="请输注册地址" required v-model="form.address" ref="forms"></x-input>
        <x-input title="注册电话" placeholder="请输入注册电话" required v-model="form.mobile" ref="forms"></x-input>
        <x-input title="纳税人识别码" placeholder="请输入纳税人识别码" required v-model="form.code" ref="forms"></x-input>
        <x-input title="开户银行" placeholder="请输入开户银行" required v-model="form.bank" ref="forms"></x-input>
        <x-input title="银行账户" placeholder="请输入银行账户" required v-model="form.bankNum" ref="forms"></x-input>
      </Group>
    </div>

    <div class="btn">
      <x-button type="primary" @click.native="submit">提交</x-button>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, XInput, XButton} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      XInput,
      XButton
    },
    data(){
      window.scrollTo(0, 0);
      return {
        form: {
          title: '',
          address: '',
          mobile: '',
          code: '',
          bank: '',
          bankNum: ''
        },
      }
    },
    methods: {
      //提交
      submit(){
        if (this.$refs.forms.valid) {
          axios.post('user/invoiceExamine.do', {
            companyName: this.form.title,
            address: this.form.address,
            phone: this.form.mobile,
            bankName: this.form.bank,
            bankNum: this.form.bankNum,
            identicode: this.form.code
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push('applyinvoice')
              this.$vux.toast.text(response.data.message, 'middle')
            } else {
              this.$vux.toast.text(response.data.message, 'middle')
            }
          })
        }
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .top {
    display: flex;
    padding: .3rem .2rem;
    background: #F7FBFF;
    justify-content: space-between;
    margin-bottom: .2rem;
    > div {
      width: 95%;
      p {
        font-size: .24rem;
        color: rgba(125, 161, 217, 1);
        line-height: .36rem;
      }
    }
    img {
      width: .32rem;
      height: .32rem;
    }
  }

  .btn {
    position: fixed;
    bottom: .48rem;
    width: 90%;
    margin: 0 5%;
    .weui-btn_primary {
      background: #4A90E2;
    }
    .weui-btn_primary:active {
      background: #4A90E2;
    }
  }
</style>
