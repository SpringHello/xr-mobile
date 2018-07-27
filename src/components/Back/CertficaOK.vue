<template>
  <div id="cerOK">
    <div>
      <x-header>身份证号验证</x-header>
      <p class="title">
        <img src="../../assets/img/back/bound.png">
        您已通过实名认证
      </p>
      <group>
        <cell title="姓名" :value="authInfo.name"></cell>
        <cell title="身份证号" :value="authInfo.personalnumber"></cell>
        <cell title="手机号码" :value="authInfo.phone"></cell>
      </group>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, Icon} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      Icon
    },
    data (){
      window.scrollTo(0, 0);
      return {
        //认证信息
        authInfo: $store.state.authInfo,
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .title {
    padding: .56rem 0 .2rem 0;
    text-align: center;
    vertical-align: middle;
    font-size: .36rem;
    color: rgba(51, 51, 51, 1);
    img {
      width: .32rem;
      vertical-align: middle;
    }
  }
</style>
