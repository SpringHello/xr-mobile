<template>
  <div>
    <x-header>订单管理详情</x-header>
    <div class="content" v-show="details">
      <ul class='top'>
        <p>{{detailsTOP.title}}</p>
        <div v-for="(item,index) in detailsTOP.资源" :key="index">
          <li v-for="(value,key) of item">{{key}}：{{value}}</li>
        </div>
      </ul>
      <ul class="bom">
        <li>订单金额：<span>¥{{details.cost}}</span></li>
        <li>创建时间：<span>{{details.ordercreatetime}}</span></li>
        <li>结束时间：<span>{{details.orderendtime ? details.orderendtime :'--'}}</span></li>
        <li>订单编号：<span>{{details.ordernumber}}</span></li>
      </ul>
    </div>
    <div class="btn" v-show="!details.paymentstatus">
      <x-button type="primary">去支付</x-button>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, XHeader, XButton} from 'vux'
  export default{
    components: {
      Group,
      XHeader,
      XButton
    },
    data(){
      window.scrollTo(0, 0);
      let details = JSON.parse(sessionStorage.getItem('order-item'))
      let detailsTOP = JSON.parse(details.display)
      return {
        details,
        detailsTOP
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .content {
    padding: .25rem .41rem .23rem .3rem;
    background: rgba(255, 255, 255, 1);
    li {
      list-style: none;
    }
    .top {
      p {
        font-size: .32rem;
        color: #000;
        line-height: .45rem;
      }
      li {
        padding-top: .24rem;
        font-size: .28rem;
        color: rgba(51, 51, 51, 1);
        line-height: .4rem;
      }
    }
    .bom {
      margin-top: .24rem;
      border-top: 1px solid #D9D9D9;
      li {
        font-size: .28rem;
        color: rgba(153, 153, 153, 1);
        line-height: .4rem;
        padding-top: .25rem;
      }
    }
  }

  .btn {
    padding: 1.5rem .3rem;
    .weui-btn_primary {
      background: #4A90E2;
    }
    .weui-btn_primary:active {
      background: #4A90E2;
    }
  }
</style>
