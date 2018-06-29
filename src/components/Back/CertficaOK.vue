<template>
  <div id="cerOK">
    <div>
      <x-header>身份证号验证</x-header>
      <p class="title"> <icon type="success"></icon><span >您已通过实名认证</span></p>
      <group>
        <cell title="姓名" :value="authInfo.name" ></cell>
        <cell title="身份证号" :value="authInfo.personalnumber" ></cell>
        <cell title="手机号码" :value="authInfo.phone" ></cell>
      </group>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell,XHeader,Icon } from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      Icon
    },
      data (){
          return{
            //认证信息
            authInfo: $store.state.authInfo,
          }
      }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .title{
    text-align: center;
    span{
      vertical-align: middle;
      display: inline-block;
      font-size:.36rem;
      color:rgba(51,51,51,1);
      padding-left: .24rem;
    }
  }
</style>
