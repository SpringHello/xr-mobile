<template>
  <div>
    <x-header>身份证号验证</x-header>
    <group>
      <x-input title="真实姓名" placeholder="请输入姓名" placeholder-align="left" v-model="froms.name"></x-input>
      <x-input title="身份证号" placeholder="请输入身份证号" placeholder-align="left" v-model="froms.idCard"></x-input>
      <x-input title="图形验证码" placeholder="请输入图形验证码" placeholder-align="left" v-model="froms.code"></x-input>
      <img :src="imgSrc" style="position: relative;bottom: .6rem;left: 6rem;">
    </group>
    <group>
      <x-input title="+ 86" placeholder="请填写手机号码" placeholder-align="left" v-model="froms.phone"></x-input>
      <x-input title="验证码" placeholder="请输入验证码" placeholder-align="left" v-model="froms.phoneCode"></x-input>
      <button class="button" @click="getPhoneCode">{{message}}</button>
    </group>
    <div class="btn">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {XInput, Group, XHeader, XButton, Box} from 'vux'
  export default{
    components: {
      XInput,
      Group,
      XHeader,
      XButton,
      Box
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    data (){
      window.scrollTo(0, 0);
      return {
        froms: {
          name: '',
          phone: '',
          idCard: '',
          phoneCode: '',
          code: ''
        },
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`,
        message:'获取验证码',
      }
    },
    methods: {
      // 获取手机验证码
      getPhoneCode(){

      },
      // 提交信息
      submit(){

      },
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .button {
    padding: .14rem .1rem;
    background: rgba(74, 144, 226, 1);
    border-radius: .06rem;
    border: 2px solid rgba(74, 144, 226, 1);
    font-size: .24rem;
    color: #FFF;
    line-height: .33rem;
    outline: none;
    position: relative;
    bottom: .6rem;
    left: 5.5rem;
  }

  .btn {
    padding: 0 .3rem;
    button {
      padding: .19rem 0;
      background: rgba(74, 144, 226, 1);
      border-radius: .1rem;
      border: 1px solid rgba(71, 104, 177, 1);
      outline: none;
      color: #FFF;
      width: 100%;
      font-size: .36rem;
      line-height: .5rem;
    }
  }
</style>
