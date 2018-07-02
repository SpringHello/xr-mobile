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
      <group title="发票类型" @on-change="change">
        <radio :options="Invoices" v-model="value"></radio>
      </group>
    </div>


    <div v-if="value=='增值税普通发票'">
      <group :title="money" label-width="6em" label-align="right" label-margin-right=".45rem">
        <x-input title="开票金额" placeholder="请输入开票金额"></x-input>
        <x-input title="发票抬头" placeholder="请输入发票抬头"></x-input>
        <x-input title="纳税人识别码" placeholder="请输入纳税人识别码"></x-input>
        <x-input title="收货地址" placeholder="请输入收货地址"></x-input>
      </group>
    </div>

    <div v-else class="middle">
      <group :title="money">
        <x-input title="开票金额" placeholder="请输入开票金额"></x-input>
        <x-input title="发票抬头" placeholder="请输入发票抬头"></x-input>
      </group>
      <!--v-if="details==null"-->
      <p >您需要通过增票资质认证才能开具增值税专用 <span>点击认证></span></p>
      <Group>
        <cell title="发票信息"></cell>
        <Group label-width="6em" label-align="right" label-margin-right=".45rem" class="details">
          <cell title="单位名称" value-align="left" :value="details.companyname" ></cell>
          <cell title="注册地址" value-align="left" :value="details.address" ></cell>
          <cell title="注册电话" value-align="left" :value="details.phone" ></cell>
          <cell title="纳税人识别码" value-align="left" :value="details.identicode" ></cell>
          <cell title="开户银行" value-align="left" :value="details.bankname" ></cell>
          <cell title="银行账户" value-align="left" :value="details.banknum" ></cell>
        </Group>
      </Group>
      <group>
        <x-input title="收货地址" placeholder="请输入收货地址"></x-input>
      </group>
    </div>


    <button class="btns">确认开票</button>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, XInput, Radio} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      XInput,
      Radio
    },
    beforeRouteEnter(to, from, next){
      axios.get('user/getExamine.do', {
        zoneId: $store.state.zone.zoneid
      }).then(response => {
        next(vm => {
         vm.details=response.data.result.result
        })
      })
    },
    data (){
      return {
        details: null,
        //发票类型
        Invoices: ['增值税普通发票', '增值税专用发票'],
        value: '增值税普通发票',
        money: `实际可开发票金额：<span style="color:#E6001B;">¥10000.35</span>`,
      }
    },
    methods: {
      //发票类型选择
      change(){

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

  .middle {
    p {
      padding: .15rem .3rem 0 .31rem;
      font-size: .24rem;
      color: rgba(178, 178, 178, 1);
      line-height: .33rem;
      span {
        float: right;
        color: rgba(74, 144, 226, 1);
      }
    }
  }

  .btns {
    margin: 15% 5%;
    width: 90%;
    display: block;
    background: rgba(74, 144, 226, 1);
    border-radius: .1rem;
    border: 1px solid rgba(71, 104, 177, 1);
    font-size: .36rem;
    line-height: .5rem;
    color: #FFF;
    padding: .19rem 0;
    text-align: center;
  }
</style>
