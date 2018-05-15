<template>
  <div>
    <x-header :right-options="{showMore: true}">注册</x-header>
    <div>
      <form class="sign-form">
        <div class="form-item">
          <!--禁止自动填充-->
          <input type="text" style="height: 0;opacity: 0;position: absolute;padding:0px;">
          <input type="text" v-model="signForm.username" placeholder="注册邮箱/手机号" autocomplete="off" class="main-input">
        </div>
        <div class="form-item" style="position: relative">
          <!--禁止自动填充-->
          <input type="text" style="height: 0;opacity: 0;position: absolute;padding:0px;">
          <input type="text" v-model="signForm.vailCode" placeholder="验证码" autocomplete="off" class="main-input">
          <button class="vailCode-button" @click.prevent="showPictureCode">
            获取短信验证码
          </button>
        </div>
        <div class="form-item">
          <input type="password" style="height: 0;opacity: 0;position: absolute;z-index: -999;padding:0px;"
                 autocomplete="off">
          <input type="password" v-model="signForm.password" placeholder="密码" autocomplete="off" class="main-input">
        </div>
        <div class="form-item">
          <input type="password" style="height: 0;opacity: 0;position: absolute;z-index: -999;padding:0px;"
                 autocomplete="off">
          <input type="password" v-model="signForm.passwordConfirm" placeholder="确认密码" autocomplete="off"
                 class="main-input">
        </div>
        <div class="form-item" style="border:none">
          <x-button type="primary" @click.native.prevent="register">同意协议并提交</x-button>
        </div>
      </form>
      <div></div>
    </div>

    <div v-transfer-dom>
      <alert v-model="showAlert" title="请输入图片验证码" @on-hide="sendCode">
        <div style="display: flex">
          <input type="text" v-model="signForm.pictureCode" class="main-input"
                 style="border:1px solid #dfdfdf">
          <img :src="imgSrc" style="height:2rem;width:30%">
        </div>
      </alert>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, Alert} from 'vux'
  import regexp from '@/util/RegExp'
  import axios from '@/util/iaxios'
  export default {
    components: {
      XHeader,
      XButton,
      Alert
    },
    data () {
      return {
        signForm: {
          username: '',
          // 图片验证码
          pictureCode: '',
          vailCode: '',
          password: '',
          passwordConfirm: '',
          showPassword: false
        },
        showAlert: false,
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`//require('../../assets/logo.png')
      }
    },
    methods: {
      // 展示图片验证码
      showPictureCode(){
        if (this.signForm.username.trim() == '') {
          this.$vux.toast.text('请输入手机/邮箱')
          return
        }
        // 展现图片验证码前先校验手机/邮箱
        if (!regexp.phoneRegexp.test(this.signForm.username) && !regexp.emailRegexp.test(this.signForm.username)) {
          // 既不是手机也不是邮箱
          this.$vux.toast.text('手机/邮箱格式错误')
          return
        }
        this.showAlert = true
      },
      // 发送手机验证码
      sendCode(){
        // 默认邮箱注册
        let isemail = '1'
        if (regexp.phoneRegexp.test(this.signForm.username)) {
          // 如果是手机注册
          isemail = '0'
        }
        axios.get('user/code.do', {
          params: {
            aim: this.signForm.username,
            isemail: isemail,
            vailCode: this.signForm.pictureCode,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text(response.data.message)
          }
        })
      },
      register(){
        if (this.signForm.username == '') {
          this.$vux.toast.text('请输入手机/邮箱')
          return
        }
        if (this.signForm.vailCode == '') {
          this.$vux.toast.text('请输入验证码')
          return
        }
        if (this.signForm.password == '') {
          this.$vux.toast.text('请输入密码')
          return
        }
        if (this.signForm.passwordConfirm == '') {
          this.$vux.toast.text('请输入确认密码')
          return
        }
        if (this.signForm.passwordConfirm != this.signForm.password) {
          this.$vux.toast.text('密码与确认密码不一致')
          return
        }
        axios.get('user/register.do', {
          params: {
            username: this.signForm.username,
            password: this.signForm.password,
            code: this.signForm.vailCode
          }
        }).then(response=>{

        })
      }
    }
  }
</script>
