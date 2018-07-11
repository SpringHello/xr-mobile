<template>
  <div>
    <x-header :right-options="{showMore: true}">重置密码</x-header>
    <div>
      <form class="sign-form">
        <div class="form-item">
          <!--禁止自动填充-->
          <input type="text" style="height: 0;opacity: 0;position: absolute;padding:0px;">
          <input type="text" v-model="signForm.username" placeholder="已验证邮箱/注册手机号" autocomplete="off"
                 class="main-input">
        </div>
        <div class="form-item" style="position: relative">
          <!--禁止自动填充-->
          <input type="text" style="height: 0;opacity: 0;position: absolute;padding:0px;">
          <input type="text" v-model="signForm.vailCode" placeholder="验证码" autocomplete="off" class="main-input">
          <button class="vailCode-button" @click.prevent="showPictureCode">
            {{sendButtonText}}
          </button>
        </div>
        <div class="form-item">
          <input type="password" style="height: 0;opacity: 0;position: absolute;z-index: -999;padding:0px;"
                 autocomplete="off">
          <input type="text" v-model="signForm.password" placeholder="密码" v-if="signForm.showPassword"
                 class="main-input"
                 autocomplete="off">
          <input type="password" v-model="signForm.password" placeholder="密码" v-else autocomplete="off"
                 class="main-input">
        </div>
        <div class="form-item">
          <input type="password" style="height: 0;opacity: 0;position: absolute;z-index: -999;padding:0px;"
                 autocomplete="off">
          <input type="password" v-model="signForm.passwordConfirm" placeholder="确认密码" autocomplete="off"
                 class="main-input">
        </div>
        <div class="form-item" style="border:none">
          <x-button type="primary" @click.native.prevent="reset">重置密码</x-button>
        </div>
        <div class="form-item" style="border:none;">
          <router-link to="/ruicloud/login" style="font-size: .3rem;float:left;color:#1AAD19">立即登录</router-link>
          <p style="float:right;font-size: .3rem;">还没有帐号?
            <router-link to="/ruicloud/register" style="color:#1AAD19">立即注册</router-link>
          </p>
          <div style="clear:both"></div>
        </div>
      </form>
      <div></div>
    </div>

    <div v-transfer-dom>
      <alert v-model="showAlert" title="请输入图片验证码" @on-hide="sendCode">
        <div style="display: flex">
          <input type="text" v-model="signForm.pictureCode" class="main-input"
                 style="border:1px solid #dfdfdf">
          <img :src="imgSrc" style="height:.8rem;width:30%">
        </div>
      </alert>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, Alert} from 'vux'
  import RegExp from '@/util/RegExp'
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
          vailCode: '',
          password: '',
          passwordConfirm: '',
          showPassword: false
        },
        sendButtonText: '获取验证码',
        showAlert: false,
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`//require('../../assets/logo.png')
      }
    },
    methods: {
      showPictureCode(){
        if (this.sendButtonText != '获取验证码') {
          return
        }
        if (this.signForm.username.trim() == '') {
          this.$vux.toast.text('请输入手机/邮箱')
          return
        }
        // 展现图片验证码前先校验手机/邮箱
        if (!RegExp.phoneRegexp.test(this.signForm.username) && !RegExp.emailRegexp.test(this.signForm.username)) {
          // 既不是手机也不是邮箱
          this.$vux.toast.text('手机/邮箱格式错误')
          return
        }
        this.showAlert = true
      },
      // 发送手机验证码
      sendCode(){
        // 没有输入验证码默认退出
        if (this.signForm.pictureCode == '') {
          return
        }
        // 默认邮箱注册
        let isemail = '1'
        if (RegExp.phoneRegexp.test(this.signForm.username)) {
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
            this.$vux.toast.text(response.data.message, 'middle')
            // 倒计时
            let countDown = 60
            this.sendButtonText = '60s'
            var interval = setInterval(() => {
              countDown--
              this.sendButtonText = countDown + 's'
              if (countDown == 0) {
                this.sendButtonText = '获取验证码'
                clearInterval(interval)
              }
            }, 1000)
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })
      },
      reset(){

      }
    }
  }
</script>
